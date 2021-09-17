resource "aws_route53_record" "web_app_record" {
  name    = local.web_app_domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.root_zone.id
  alias {
    evaluate_target_health = true
    name                   = aws_cloudfront_distribution.web_app_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.web_app_distribution.hosted_zone_id
  }
}

resource "aws_route53_record" "web_app_record_a" {
  name    = var.root_domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.root_zone.id
  alias {
    evaluate_target_health = true
    name                   = aws_cloudfront_distribution.web_app_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.web_app_distribution.hosted_zone_id
  }
}
