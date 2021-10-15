variable "root_domain_name" {
  description = "root domain for the app"
}

variable "region" {
  description = "AWS region to deploy"
}

variable "min_ttl" {
  description = "Min time to life cloud front"
}

variable "default_ttl" {
  description = "Default time to life cloud front"
}

variable "max_ttl" {
  description = "Max time to file cloud front"
}

variable "viewer_protocol_policy" {
  description = "Policy to redirect to https"
}

variable "web_app_subdomain" {
  description = "Subdomain to deploy the webapp"
}

variable "code_store_bucket" {
  description = "S3 Bucket for code webapp storage"
}

variable "cert_arn" {
  
}

