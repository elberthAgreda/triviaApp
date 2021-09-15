variable "region" {
  description = "Set correct region"
  default     = "us-east-2"
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

variable "min_capacity" {
  default     = 1
  description = "Min capacity of containers"
}

variable "max_capacity" {
  default     = 5
  description = "Max capacity of containers"
}

variable "cern_arn" {
  default     = ""
  description = "Certificate ARN for https"
}