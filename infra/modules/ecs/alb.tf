// Application Load Balancer
resource "aws_lb" "lb_cinco" {
  name = "alb-${var.project}"
  depends_on = [
    aws_ecs_cluster.ecs
  ]
  subnets = [
    aws_subnet.cinco_subnet[0].id,
    aws_subnet.cinco_subnet[1].id
  ]
  security_groups = [
    aws_security_group.sg_alb.id
  ]
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.lb_cinco.id
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.cinco_target_group.arn
  }

  depends_on = [
    aws_lb_target_group.cinco_target_group
  ]
}


// Target Group
resource "aws_lb_target_group" "cinco_target_group" {
  name        = "wwbgame-${var.project}"
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "404"
    timeout             = "3"
    path                = "/"
    unhealthy_threshold = "2"
  }

  depends_on = [
    aws_lb.lb_cinco
  ]
}