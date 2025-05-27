terraform {
	required_version = ">= 1.0"
	required_providers {
		aws = {
			source  = "hashicorp/aws"
			version = "~> 5.0"
		}
	}
	
	backend "s3" {
		bucket         = "project-management-app-terraform-state"
		key            = "terraform.tfstate"
		region         = "us-east-1"
		encrypt        = true
		dynamodb_table = "terraform-state-lock"
	}
}

provider "aws" {
	region = var.region
}

locals {
	app_name = var.app_name
	stage    = var.stage
	
	common_tags = {
		Environment = var.stage
		Project     = var.app_name
		ManagedBy   = "terraform"
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
	name        = "/${local.app_name}/${local.stage}/NEXTAUTH_SECRET"
	type        = "SecureString"
	value       = var.nextauth_secret
	overwrite   = true
	
	description = "NextAuth.js secret for ${local.app_name} ${local.stage}"
	
	tags = local.common_tags
}

resource "aws_ssm_parameter" "nextauth_url" {
	name        = "/${local.app_name}/${local.stage}/NEXTAUTH_URL"
	type        = "String"
	value       = var.stage == "prod" ? "https://your-domain.com" : "https://${local.app_name}-${local.stage}.sst.dev"
	overwrite   = true
	
	description = "NextAuth.js URL for ${local.app_name} ${local.stage}"
	
	tags = local.common_tags
}

resource "aws_ssm_parameter" "supabase_url" {
	name        = "/${local.app_name}/${local.stage}/NEXT_PUBLIC_SUPABASE_URL"
	type        = "String"
	value       = var.supabase_url
	overwrite   = true
	
	description = "Supabase URL for ${local.app_name} ${local.stage}"
	
	tags = local.common_tags
}

resource "aws_ssm_parameter" "supabase_anon_key" {
	name        = "/${local.app_name}/${local.stage}/NEXT_PUBLIC_SUPABASE_ANON_KEY"
	type        = "SecureString"
	value       = var.supabase_anon_key
	overwrite   = true
	
	description = "Supabase anonymous key for ${local.app_name} ${local.stage}"
	
	tags = local.common_tags
}

resource "aws_ssm_parameter" "supabase_service_role_key" {
	name        = "/${local.app_name}/${local.stage}/SUPABASE_SERVICE_ROLE_KEY"
	type        = "SecureString"
	value       = var.supabase_service_role_key
	overwrite   = true
	
	description = "Supabase service role key for ${local.app_name} ${local.stage}"
	
	tags = local.common_tags
}

data "aws_ssm_parameters_by_path" "app_config" {
	path = "/${local.app_name}/${local.stage}"
	depends_on = [
		aws_ssm_parameter.database_url,
		aws_ssm_parameter.nextauth_secret,
		aws_ssm_parameter.nextauth_url,
		aws_ssm_parameter.supabase_url,
		aws_ssm_parameter.supabase_anon_key,
		aws_ssm_parameter.supabase_service_role_key,
	]
} 