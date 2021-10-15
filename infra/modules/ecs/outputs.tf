output "lb_arn_suffix" {
  value = aws_lb.lb_cinco.arn_suffix
}

output "target_group_arn_suffix" {
  value = aws_lb_target_group.cinco_target_group.arn_suffix
}

output "subnet1" {
  value = aws_subnet.cinco_subnet[0].id
}

output "subnet2" {
  value = aws_subnet.cinco_subnet[1].id
}
