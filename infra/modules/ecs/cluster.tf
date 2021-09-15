// ECS
resource "aws_ecs_cluster" "ecs" {
  name = "cluster-${var.project}"
  depends_on = [
    aws_kms_key.airflow, aws_cloudwatch_log_group.app_log_group
  ]

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  configuration {
    execute_command_configuration {
      kms_key_id = aws_kms_key.airflow.arn
      logging    = "OVERRIDE"

      log_configuration {
        cloud_watch_encryption_enabled = true
        cloud_watch_log_group_name     = aws_cloudwatch_log_group.app_log_group.name
      }
    }
  }
}


// KMS
resource "aws_kms_key" "airflow" {
  description             = "airflow"
  deletion_window_in_days = 7
  policy                  = <<EOF
{
  "Version" : "2012-10-17",
  "Id" : "key-default-1",
  "Statement" : [ {
      "Sid" : "Enable IAM User Permissions",
      "Effect" : "Allow",
      "Principal" : {
                "AWS": "arn:aws:iam::${var.account_number}:root"
      },
      "Action" : "kms:*",
      "Resource" : "*"
    },
    {
      "Effect": "Allow",
      "Principal": { "Service": "logs.${var.region}.amazonaws.com" },
      "Action": [ 
        "kms:Encrypt*",
        "kms:Decrypt*",
        "kms:ReEncrypt*",
        "kms:GenerateDataKey*",
        "kms:Describe*"
      ],
      "Resource": "*"
    }  
  ]
}
EOF
}

// Logs
resource "aws_cloudwatch_log_group" "app_log_group" {
  name              = "/ecs/cluster-airflow"
  retention_in_days = 30
  depends_on = [
    aws_kms_key.airflow
  ]
  kms_key_id = aws_kms_key.airflow.arn
  tags = {
    Name = "cb-log-group"
  }
}
resource "aws_cloudwatch_log_stream" "app_log_stream" {
  name = "log-stream"
  depends_on = [
    aws_kms_key.airflow
  ]
  log_group_name = aws_cloudwatch_log_group.app_log_group.name
}
