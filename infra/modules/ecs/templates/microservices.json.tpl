[
  {
    "name": "${docker_name}",
    "image": "${docker_image}",
    "cpu": ${docker_fargate_cpu},
    "memory": ${docker_fargate_memory},
    "networkMode": "awsvpc",
    "entryPoint": [],
    "environment": ${environment},
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/cluster-airflow",
        "awslogs-region": "${docker_aws_region}",
        "awslogs-stream-prefix": "ecs"
      }
    },
    "portMappings": [
      {
        "containerPort": ${docker_port},
        "hostPort": ${docker_port}
      }
    ]
  }
]