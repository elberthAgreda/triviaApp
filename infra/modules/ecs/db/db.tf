# RDS
resource "aws_db_subnet_group" "subnet-production" {
  name        = "subnet-production"
  description = "Subnet Production"
  subnet_ids = [
    var.subnet_id_1,
    var.subnet_id_2
  ]
  #tags = local.tags_production
}


resource "aws_db_instance" "db" {
  allocated_storage          = 20
  auto_minor_version_upgrade = false
  availability_zone          = "us-east-2a"
  backup_retention_period    = 2
  #backup_window              = "04:53-05:23"
  ca_cert_identifier         = "rds-ca-2019"
  copy_tags_to_snapshot      = true
  db_subnet_group_name       = aws_db_subnet_group.subnet-production.name
  delete_automated_backups   = true
  deletion_protection        = true
  #enabled_cloudwatch_logs_exports       = []
  #endpoint                              = "db-silin-dev.csrir0pirchh.us-east-1.rds.amazonaws.com:5432"
  engine         = "mysql"
  engine_version = "5.7"
  #hosted_zone_id                        = "Z2R2ITUGPM61AM"
  iam_database_authentication_enabled = false
  #id                                    = "db-silin-dev"
  identifier     = "db"
  instance_class = "db.t3.micro"
  iops           = 0
  #latest_restorable_time                = "0001-01-01T00:00:00Z"
  #license_model                         = "postgresql-license"
  maintenance_window                    = "sat:07:02-sat:07:32"
  max_allocated_storage                 = 0
  monitoring_interval                   = 0
  multi_az                              = false
  #option_group_name                     = "default:postgres-13"
  #parameter_group_name                  = "postgres13silinrdp"
  performance_insights_enabled          = false
  performance_insights_retention_period = 0
  port                                  = 3306
  publicly_accessible                   = true
  #replicas                              = []
  #resource_id                           = "db-646AWKNTPGDIBXTZD74VUR7ROI"
  security_group_names = []
  skip_final_snapshot  = true
  #status                                = "available"
  storage_encrypted = false
  storage_type      = "gp2"
  #tags              = local.tags_develop
  #tags_all                              = {}
  username = "triviama"
  password = "Manager2018*15"
  
  vpc_security_group_ids = [
    aws_security_group.sg_database.id
  ]
}
