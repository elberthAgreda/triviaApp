
terraform {
  #required_version = "~> 0.12"
  backend "s3" {
    bucket  = "terraform-cinco"
    key     = "cinco-frontend.tfstate"    
    region  = "us-east-2"
    #encrypt = true
  }
}

provider "aws" {
  region  = var.region
}

module "frontend" {
  source                 = "../../modules/cloudfront"
  region                 = var.region
  root_domain_name       = var.root_domain_name
  min_ttl                = var.min_ttl
  default_ttl            = var.default_ttl
  max_ttl                = var.max_ttl
  viewer_protocol_policy = var.viewer_protocol_policy
  web_app_subdomain      = var.web_app_subdomain
  code_store_bucket      = var.code_store_bucket
  cert_arn               = var.cert_arn
}

# output "bitbucket_pipeline_user" {
#   value = module.frontend.bitbucket_pipeline_user
# }
# output "bitbucket_pipeline_id" {
#   value = module.frontend.bitbucket_pipeline_id
# }
# output "bitbucket_pipeline_secret" {
#   value = module.frontend.bitbucket_pipeline_secret
# }
