
variable "project" {
  description = "Project name"
}

variable "region" {
  description = "Region"
}

variable "subnet_cidr_block" {
  description = "Default CIDR block"
}

variable "vpc_id" {
  description = "VPC ID"
}

variable "min_capacity" {
  description = "Min capacity for service size"
}

variable "max_capacity" {
  description = "Max capacity for service size"
}

variable "account_number" {
  description = "User for AIR flow permissions"
}

variable "container_name" {
  description = "Name of container for deploy"
}

variable "container_url" {
  description = "Repository of container"
}

variable "container_port" {
  description = "Port for container"
}

variable "cern_arn" {
  description = "Certificate arn for https"
}

variable "container_name_wp" {

}

variable "container_url_wp" {

}

variable "container_port_wp" {

}
