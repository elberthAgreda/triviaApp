# resource "aws_iam_user" "bitbucket_pipeline_user" {
#   name = "bitbucket-pipeline-agent"
# }


# resource "aws_iam_access_key" "bitbucket_pipeline_access_key" {
#   user = aws_iam_user.bitbucket_pipeline_user.name
# }

# resource "aws_iam_user_policy" "bitbucket_pipeline_policy" {
#   name = "BitbucketPipelineUserPolicy"
#   user = aws_iam_user.bitbucket_pipeline_user.name

#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [{
#       Action = [
#         "ecr:*",
#       ]
#       Effect   = "Allow"
#       Resource = "*"
#       }, {
#       Action = [
#         "s3:*",
#       ]
#       Effect = "Allow"
#       Resource = [
#         "arn:aws:s3:::${var.code_store_bucket}",
#         "arn:aws:s3:::${var.code_store_bucket}/*",
#       ]
#     }]
#   })
# }
