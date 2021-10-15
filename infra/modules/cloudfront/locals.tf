locals {
  s3_origin_id        = "S3Origin"
  web_app_domain_name = "${var.web_app_subdomain}.${var.root_domain_name}"
}
