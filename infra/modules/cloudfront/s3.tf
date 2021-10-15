
resource "aws_s3_bucket" "code_store_bucket" {
  bucket = var.root_domain_name
  acl    = "private"

  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket_policy" "code_store_bucket_policy" {
  bucket = aws_s3_bucket.code_store_bucket.id

  policy = jsonencode({
    Id      = "cinco_cdn_bucket_policy"
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "bucket_policy_site_root"
        Action   = ["s3:ListBucket"]
        Effect   = "Allow"
        Resource = "arn:aws:s3:::${var.root_domain_name}"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.origin_acces_identity.iam_arn
        }
      },
      {
        Sid      = "bucket_policy_site_all"
        Action   = ["s3:GetObject"]
        Effect   = "Allow"
        Resource = "arn:aws:s3:::${var.root_domain_name}/*"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.origin_acces_identity.iam_arn
        }
      }
    ]
  })

  depends_on = [
    aws_cloudfront_origin_access_identity.origin_acces_identity,
    aws_s3_bucket.code_store_bucket
  ]

}
