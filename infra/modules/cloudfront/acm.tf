data "aws_route53_zone" "root_zone" {
  name         = var.root_domain_name
  private_zone = false
}


# resource "aws_acm_certificate" "web_app_cert" {
#   domain_name       = local.web_app_domain_name
#   validation_method = "DNS"

# }

# resource "aws_route53_record" "web_app_cert_validation" {
#   name    = aws_acm_certificate.web_app_cert.domain_validation_options.0.resource_record_name
#   type    = aws_acm_certificate.web_app_cert.domain_validation_options.0.resource_record_type
#   zone_id = data.aws_route53_zone.root_zone.zone_id
#   records = [aws_acm_certificate.web_app_cert.domain_validation_options.0.resource_record_value]
#   ttl     = 300
# }
# resource "aws_acm_certificate_validation" "web_app_cert" {
#   certificate_arn         = aws_acm_certificate.web_app_cert.arn
#   validation_record_fqdns = [aws_route53_record.web_app_cert_validation.fqdn]
# }
