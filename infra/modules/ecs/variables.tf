
variable "project" {
  description = "Project name"
}

variable "region" {
  description = "Region"
}

variable "subnet_cidr_block" {
  description = "Default CIDR block"
  default     = "172.31.128.0/17"
}

variable "vpc_id" {
  description = "VPC ID"
}

variable "min_capacity" {
  description = ""
}

variable "max_capacity" {
  description = ""
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

variable "cern_arn" {
  description = "Certificate arn for https"
}
