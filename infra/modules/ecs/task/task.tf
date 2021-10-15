# Creating Json for deployment task

data "template_file" "wwbgame" {
  #template = file("${path.module}/template/microservices.json.tpl")
  template = file("${path.module}/templates/microservices.json.tpl")
  vars = {
    "docker_name"           = var.container_name
    "docker_image"          = var.container_url
    "docker_port"           = var.container_port
    "docker_fargate_cpu"    = 2048
    "docker_fargate_memory" = 4096
    "docker_aws_region"     = var.region
    "environment"           = jsonencode([])
  }
}

resource "aws_ecs_task_definition" "wwbgame" {
  family                   = var.container_name
  execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
  task_role_arn            = aws_iam_role.ecsTaskExecutionRole.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 2048
  memory                   = 4096
  container_definitions    = data.template_file.wwbgame.rendered
  
  lifecycle {
    create_before_destroy = true
  }

  volume {
    name = "service-storage"

    efs_volume_configuration {
      #file_system_id          = aws_efs_file_system.fs.id
      file_system_id          = var.efs_id
      root_directory          = "/"
      transit_encryption      = "ENABLED"
      transit_encryption_port = 2999

      authorization_config {
        access_point_id = var.access_point
        iam             = "ENABLED"
      }
    }
  }
}

resource "aws_ecs_service" "wwbgame" {
  name                   = var.container_name
  cluster                = "cluster-${var.project}"
  task_definition        = aws_ecs_task_definition.wwbgame.arn
  desired_count          = 0
  launch_type            = "FARGATE"
  enable_execute_command = true

  # depends_on = [
  #   aws_lb_target_group.cinco_target_group,
  #   aws_ecs_cluster.ecs,
  #   aws_lb.lb_cinco
  # ]

  network_configuration {
    security_groups = [ aws_security_group.sg_ecs.id ]
    subnets = [
      var.subnet_id_1,
      var.subnet_id_2
    ]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = var.container_name
    container_port   = var.container_port
  }
  # service_registries {
  #   registry_arn = aws_service_discovery_service.webserver.arn
  # }

  lifecycle {
    ignore_changes = [
      desired_count
    ]
    create_before_destroy = true
  }
}


# Scaling microservices develop
resource "aws_appautoscaling_target" "wwbgame" {
  resource_id        = "service/cluster-${var.project}/${var.container_name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
  min_capacity       = var.min_capacity # Cantidad Minima de Microservicios
  max_capacity       = var.max_capacity # Cantidad Maxima de Microservicios
  depends_on = [
    aws_ecs_service.wwbgame
  ]
}

# Request to ALB

resource "aws_appautoscaling_policy" "request-wwbgame" {
  name               = "request-wwbgame"                                    # Nombre de la politica aplica al servicio
  policy_type        = "TargetTrackingScaling"                              # Tipo de politica tambien esta StepScaling pero :S
  resource_id        = aws_appautoscaling_target.wwbgame.resource_id        # El tipo de recurso y la cadena de identificación única
  scalable_dimension = aws_appautoscaling_target.wwbgame.scalable_dimension # La dimensión escalable del objetivo escalable
  service_namespace  = aws_appautoscaling_target.wwbgame.service_namespace  # El espacio de nombres del servicio de AWS del destino escalable
  # depends_on = [
  #   aws_ecs_service.wwbgame, aws_lb.lb_cinco
  # ]
  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ALBRequestCountPerTarget"
      # resource_label         = "${aws_lb.lb_cinco.arn_suffix}/${aws_lb_target_group.cinco_target_group.arn_suffix}"
      resource_label         = "${var.lb_arn_suffix}/${var.target_group_arn_suffix}"
    }

    target_value       = 100
    scale_in_cooldown  = 300
    scale_out_cooldown = 300

  }
}

# Average Memory

resource "aws_appautoscaling_policy" "memory-wwbgame" {
  name               = "memory-wwbgame"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.wwbgame.resource_id
  scalable_dimension = aws_appautoscaling_target.wwbgame.scalable_dimension
  service_namespace  = aws_appautoscaling_target.wwbgame.service_namespace
  # depends_on = [
  #   aws_ecs_service.wwbgame, aws_lb.lb_cinco
  # ]
  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }

    target_value       = 80
    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }
}

# CPU Memory
resource "aws_appautoscaling_policy" "cpu-wwbgame" {
  name               = "cpu-wwbgame"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.wwbgame.resource_id
  scalable_dimension = aws_appautoscaling_target.wwbgame.scalable_dimension
  service_namespace  = aws_appautoscaling_target.wwbgame.service_namespace
  # depends_on = [
  #   aws_ecs_service.wwbgame, aws_lb.lb_cinco
  # ]

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = 80
    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }
}