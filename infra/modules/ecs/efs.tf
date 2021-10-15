resource "aws_efs_file_system" "efs_cinco" {
  creation_token = "cinco-${var.project}"

  tags = {
    Name = "MyProduct"
  }
}

resource "aws_efs_access_point" "access_point_cinco" {
  file_system_id = aws_efs_file_system.efs_cinco.id
}
