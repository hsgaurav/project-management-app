terraform {
	required_version = ">= 1.0"
	required_providers {
		aws = {
			source  = "hashicorp/aws"
			version = "~> 5.0"
		}
	}
}

provider "aws" {
	region = var.aws_region
}

locals {
	stage = var.stage
	app_name = "project-management-app"
	
	common_tags = {
		Project     = local.app_name
		Stage       = local.stage
		ManagedBy   = "terraform"
		Environment = local.stage
	}
}

resource "aws_ssm_parameter" "database_url" {
	name      = "/${local.app_name}/${local.stage}/DATABASE_URL"
	type      = "SecureString"
	value     = var.database_url
	overwrite = true
	tags      = local.common_tags

	description = "Database URL for ${local.app_name} ${local.stage}"
}

resource "aws_ssm_parameter" "nextauth_secret" {
	name      = "/${local.app_name}/${local.stage}/NEXTAUTH_SECRET"
	type      = "SecureString"
	value     = var.nextauth_secret
	overwrite = true
	tags      = local.common_tags

	description = "NextAuth secret for ${local.app_name} ${local.stage}"
}

resource "aws_ssm_parameter" "nextauth_url" {
	name      = "/${local.app_name}/${local.stage}/NEXTAUTH_URL"
	type      = "String"
	value     = var.nextauth_url
	overwrite = true
	tags      = local.common_tags

	description = "NextAuth URL for ${local.app_name} ${local.stage}"
}

resource "aws_ssm_parameter" "discord_client_id" {
	name      = "/${local.app_name}/${local.stage}/DISCORD_CLIENT_ID"
	type      = "SecureString"
	value     = var.discord_client_id
	overwrite = true
	tags      = local.common_tags

	description = "Discord OAuth client ID for ${local.app_name} ${local.stage}"
}

resource "aws_ssm_parameter" "discord_client_secret" {
	name      = "/${local.app_name}/${local.stage}/DISCORD_CLIENT_SECRET"
	type      = "SecureString"
	value     = var.discord_client_secret
	overwrite = true
	tags      = local.common_tags

	description = "Discord OAuth client secret for ${local.app_name} ${local.stage}"
}

resource "aws_ssm_parameter" "supabase_url" {
	name      = "/${local.app_name}/${local.stage}/NEXT_PUBLIC_SUPABASE_URL"
	type      = "String"
	value     = var.supabase_url
	overwrite = true
	tags      = local.common_tags

	description = "Supabase URL for ${local.app_name} ${local.stage}"
}

resource "aws_ssm_parameter" "supabase_anon_key" {
	name      = "/${local.app_name}/${local.stage}/NEXT_PUBLIC_SUPABASE_ANON_KEY"
	type      = "SecureString"
	value     = var.supabase_anon_key
	overwrite = true
	tags      = local.common_tags

	description = "Supabase anonymous key for ${local.app_name} ${local.stage}"
}

resource "aws_ssm_parameter" "supabase_service_role_key" {
	name      = "/${local.app_name}/${local.stage}/SUPABASE_SERVICE_ROLE_KEY"
	type      = "SecureString"
	value     = var.supabase_service_role_key
	overwrite = true
	tags      = local.common_tags

	description = "Supabase service role key for ${local.app_name} ${local.stage}"
}

data "aws_ssm_parameters_by_path" "app_config" {
	path = "/${local.app_name}/${local.stage}"
	depends_on = [
		aws_ssm_parameter.database_url,
		aws_ssm_parameter.nextauth_secret,
		aws_ssm_parameter.nextauth_url,
		aws_ssm_parameter.discord_client_id,
		aws_ssm_parameter.discord_client_secret,
		aws_ssm_parameter.supabase_url,
		aws_ssm_parameter.supabase_anon_key,
		aws_ssm_parameter.supabase_service_role_key,
	]
} 