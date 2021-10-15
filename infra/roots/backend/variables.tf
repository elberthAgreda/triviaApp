variable "region" {
  description = "Set correct region"
  default     = "us-east-2"
}

variable "subnet_cidr_block" {
  description = "Default CIDR block"
  default     = "172.31.128.0/17"
}

variable "project" {
  default     = "unogame"
  description = "Project name"
}

variable "account_number" {
  default     = "381830857098"
  description = "User for Policy"
}

variable "vpc_id" {
  default     = "vpc-85234cee"
  description = "VPC ID"
}

variable "container_name" {
  default     = "wwbgame"
  description = "Name of the container"
}

variable "container_url" {
  default     = "381830857098.dkr.ecr.us-east-2.amazonaws.com/uno-repository:latest"
  description = "Repository URL"
}

variable "container_port" {
  default = 8084
  description = "Port for container"
}

variable "min_capacity" {
  default     = 1
  description = "Min capacity of containers"
}

variable "max_capacity" {
  default     = 5
  description = "Max capacity of containers"
}

variable "cern_arn" {
  default     = "arn:aws:acm:us-east-2:381830857098:certificate/54847077-e7b7-48d5-bc06-f7324c1361ea"
  description = "Certificate ARN for https"
}


variable "container_name_wp" {
  description = "Values for wordpress"
  default = "wordpress"
}

variable "container_url_wp" {
  description = "Values for wordpress"
  default = "wordpress:latest"
}

variable "container_port_wp" {
  description = "Values for wordpress"
  default = 80
}
