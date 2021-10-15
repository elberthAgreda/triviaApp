
module "wwbgame" {
  source = "./task"

  region            = var.region        
  container_name    = var.container_name
  container_url     = var.container_url 
  container_port    = var.container_port
  project           = var.project       
  vpc_id            = var.vpc_id    
  min_capacity      = var.min_capacity
  max_capacity      = var.max_capacity
      

  lb_arn_suffix               = aws_lb.lb_cinco.arn_suffix
  target_group_arn_suffix     = aws_lb_target_group.cinco_target_group.arn_suffix
  target_group_arn            = aws_lb_target_group.cinco_target_group.arn
  subnet_id_1                 = aws_subnet.cinco_subnet[0].id
  subnet_id_2                 = aws_subnet.cinco_subnet[1].id

  # EFS
  efs_id                      = aws_efs_file_system.efs_cinco.id
  access_point                = aws_efs_access_point.access_point_cinco.id

  depends_on = [
    aws_lb.lb_cinco,
    aws_lb_target_group.cinco_target_group,
    aws_subnet.cinco_subnet
  ]
  
}


module "wordpress" {
  source = "./task"

  region            = var.region        
  container_name    = var.container_name_wp
  container_url     = var.container_url_wp
  container_port    = var.container_port_wp
  project           = var.project       
  vpc_id            = var.vpc_id    
  min_capacity      = var.min_capacity
  max_capacity      = var.max_capacity
      

  lb_arn_suffix               = aws_lb.lb_cinco.arn_suffix
  target_group_arn_suffix     = aws_lb_target_group.cinco_target_group_wordpress.arn_suffix
  target_group_arn            = aws_lb_target_group.cinco_target_group_wordpress.arn
  subnet_id_1                 = aws_subnet.cinco_subnet[0].id
  subnet_id_2                 = aws_subnet.cinco_subnet[1].id
  
  # EFS
  efs_id                      = aws_efs_file_system.efs_cinco.id
  access_point                = aws_efs_access_point.access_point_cinco.id

  depends_on = [
    aws_lb.lb_cinco,
    aws_lb_target_group.cinco_target_group_wordpress,
    aws_subnet.cinco_subnet
  ]
  
}

module "database" {
  source = "./db"

  vpc_id            = var.vpc_id   

  subnet_id_1                 = aws_subnet.cinco_subnet[0].id
  subnet_id_2                 = aws_subnet.cinco_subnet[1].id
}
