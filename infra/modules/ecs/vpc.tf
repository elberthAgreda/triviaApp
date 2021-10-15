
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_vpc" "selected" {
  id = var.vpc_id
}

locals {
  subnet_count = 2
}

resource "aws_subnet" "cinco_subnet" {
  count                   = local.subnet_count
  vpc_id                  = var.vpc_id
  map_public_ip_on_launch = true
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  cidr_block              = cidrsubnet(var.subnet_cidr_block, 7, count.index)
}
