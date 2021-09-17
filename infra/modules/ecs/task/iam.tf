resource "aws_iam_role" "ecsTaskExecutionRole" {
  name = "${var.container_name}_test_role"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "",
          "Effect" : "Allow",
          "Principal" : {
            "Service" : "ecs-tasks.amazonaws.com"
          },
          "Action" : "sts:AssumeRole"
        }
      ]
    }
  )
}


resource "aws_iam_role_policy" "ecsTaskExecutionPolicy" {
  name = "${var.container_name}_ecsTaskExecutionPolicy"
  role = aws_iam_role.ecsTaskExecutionRole.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "VisualEditor0",
          "Effect" : "Allow",
          "Action" : [
            "autoscaling:SetInstanceProtection",
            "autoscaling:PutScalingPolicy",
            "autoscaling:UpdateAutoScalingGroup",
            "autoscaling:DeletePolicy"
          ],
          "Resource" : "*",
          "Condition" : {
            "Null" : {
              "autoscaling:ResourceTag/AmazonECSManaged" : "false"
            }
          }
        },
        {
          "Sid" : "VisualEditor1",
          "Effect" : "Allow",
          "Action" : [
            "cloudwatch:PutMetricAlarm",
            "logs:CreateLogStream",
            "cloudwatch:DeleteAlarms",
            "logs:DescribeLogStreams",
            "ec2:CreateTags",
            "cloudwatch:DescribeAlarms",
            "logs:PutLogEvents"
          ],
          "Resource" : [
            "arn:aws:logs:::log-group:/aws/ecs/:log-stream:",
            "arn:aws:ec2:::network-interface/*",
            "arn:aws:cloudwatch:::alarm:*"
          ]
        },
        {
          "Sid" : "VisualEditor2",
          "Effect" : "Allow",
          "Action" : [
            "autoscaling:Describe*",
            "elasticloadbalancing:RegisterTargets",
            "logs:*",
            "servicediscovery:List*",
            "ecr:ListTagsForResource",
            "route53:UpdateHealthCheck",
            "route53:DeleteHealthCheck",
            "ecr:ListImages",
            "route53:Get*",
            "route53:CreateHealthCheck",
            "ec2:DeleteNetworkInterfacePermission",
            "ec2:CreateNetworkInterfacePermission",
            "route53:List*",
            "elasticloadbalancing:Describe*",
            "ecr:DescribeRepositories",
            "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
            "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
            "ecr:BatchCheckLayerAvailability",
            "ecr:GetLifecyclePolicy",
            "ecr:GetRegistryPolicy",
            "ec2:DetachNetworkInterface",
            "ecr:DescribeImageScanFindings",
            "ssm:DescribeSessions",
            "ecr:GetLifecyclePolicyPreview",
            "ecr:GetDownloadUrlForLayer",
            "ecr:DescribeRegistry",
            "route53:ChangeResourceRecordSets",
            "ec2:DeleteNetworkInterface",
            "ecr:GetAuthorizationToken",
            "elasticloadbalancing:DeregisterTargets",
            "autoscaling-plans:DeleteScalingPlan",
            "servicediscovery:RegisterInstance",
            "servicediscovery:DeregisterInstance",
            "ec2:CreateNetworkInterface",
            "ec2:Describe*",
            "servicediscovery:Get*",
            "autoscaling-plans:DescribeScalingPlans",
            "ecr:BatchGetImage",
            "ecr:DescribeImages",
            "servicediscovery:UpdateInstanceCustomHealthStatus",
            "ec2:AttachNetworkInterface",
            "autoscaling-plans:CreateScalingPlan",
            "ecr:GetRepositoryPolicy"
          ],
          "Resource" : "*"
        },
        {
          "Sid" : "VisualEditor3",
          "Effect" : "Allow",
          "Action" : "ssm:StartSession",
          "Resource" : [
            "arn:aws:ssm:::document/AmazonECS-ExecuteInteractiveCommand",
            "arn:aws:ecs:::task/*"
          ]
        }
      ]
    }
  )
}
