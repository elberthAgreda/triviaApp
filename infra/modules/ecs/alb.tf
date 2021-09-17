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

# resource "aws_lb_listener" "http" {
#   load_balancer_arn = aws_lb.lb_cinco.id
#   port              = 80
#   protocol          = "HTTP"

#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.cinco_target_group.arn
#   }

#   depends_on = [
#     aws_lb_target_group.cinco_target_group
#   ]
# }

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.lb_cinco.id
  port              = 80
  protocol          = "HTTP"
  
  default_action {
    type = "redirect"
    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }

  depends_on = [
    aws_lb_target_group.cinco_target_group,
    aws_lb_target_group.cinco_target_group_wordpress
  ]
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.lb_cinco.id
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.cern_arn


  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = var.project
      status_code  = "200"
    }
  }

  depends_on = [
    aws_lb_target_group.cinco_target_group,
    aws_lb_target_group.cinco_target_group_wordpress
  ]

}


resource "aws_lb_listener_rule" "static" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 100
    
  condition {
    host_header {
      values = ["api.cincobmm.com"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.cinco_target_group.arn
  }

}


resource "aws_lb_listener_rule" "static_wordpress" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 110
    
  condition {
    host_header {
      values = ["wordpress.cincobmm.com"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.cinco_target_group_wordpress.arn
  }

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


resource "aws_lb_target_group" "cinco_target_group_wordpress" {
  name        = "wwbgame-${var.container_name_wp}"
  port        = var.container_port_wp
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "302"
    timeout             = "3"
    path                = "/wp-load.php"
    unhealthy_threshold = "2"
  }

  depends_on = [
    aws_lb.lb_cinco
  ]
}
