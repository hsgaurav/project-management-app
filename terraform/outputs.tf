output "ssm_parameter_path" {
	description = "Base path for SSM parameters"
	value       = "/${local.app_name}/${local.stage}"
}

output "ssm_parameter_names" {
	description = "Names of created SSM parameters"
	value = [
		aws_ssm_parameter.nextauth_secret.name,
		aws_ssm_parameter.nextauth_url.name,
		aws_ssm_parameter.supabase_url.name,
		aws_ssm_parameter.supabase_anon_key.name,
		aws_ssm_parameter.supabase_service_role_key.name,
	]
}

output "aws_region" {
	description = "AWS region where resources are deployed"
	value       = var.aws_region
}

output "stage" {
	description = "Deployment stage"
	value       = local.stage
}

output "app_name" {
	description = "Application name"
	value       = local.app_name
} 