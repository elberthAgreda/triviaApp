
terraform {
  backend "s3" {
    # Replace this with your bucket name!
    bucket = "terraform-cinco"
    key    = "terraform.tfstate"
    region = "us-east-2" # Replace this with your DynamoDB table name!
    #dynamodb_table = "terraform-up-and-running-locks"
    #encrypt        = true
  }
}

provider "aws" {
  region = var.region
  #version = "~> 3.37"
  #   access_key = "my-access-key"
  #   secret_key = "my-secret-key"
}

# Module for create Container repository
module "ecr" {

  source = "../../modules/ecr"

  name = "uno-repository"
}


module "ecs" {

  source = "../../modules/ecs"

  project        = var.project
  region         = var.region
  account_number = var.account_number
  vpc_id         = var.vpc_id
  container_name = var.container_name
  container_url  = var.container_url
  cern_arn       = var.cern_arn
  min_capacity   = var.min_capacity
  max_capacity   = var.max_capacity
}
