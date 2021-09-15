resource "aws_security_group" "sg_alb" {
  name        = "Allow trafic"
  description = "Allow http and https inbound traffic"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP from VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    #ipv6_cidr_blocks = [data.aws_vpc.selected.ipv6_cidr_block]
    #   prefix_list_ids  = []
    #   security_groups  = []
    #   self             = false
  }

  ingress {
    description = "HTTPS from VPC"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    #ipv6_cidr_blocks = [data.aws_vpc.selected.ipv6_cidr_block]
    #   prefix_list_ids  = []
    #   security_groups  = []
    #   self             = false

  }

  ingress {
    description = "HTTPS from VPC"
    from_port   = 8084
    to_port     = 8084
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    #ipv6_cidr_blocks = [data.aws_vpc.selected.ipv6_cidr_block]
    #   prefix_list_ids  = []
    #   security_groups  = []
    #   self             = false

  }

  egress {
    description = "Egress rule"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    # ipv6_cidr_blocks = ["::/0"]
  }

}