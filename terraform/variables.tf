variable "aws_region" {
	description = "AWS region for resource deployment"
	type        = string
	default     = "us-east-1"
}

variable "stage" {
	description = "Deployment stage (dev/prod)"
	type        = string
	validation {
		condition     = contains(["dev", "prod"], var.stage)
		error_message = "Stage must be either 'dev' or 'prod'."
	}
}

variable "database_url" {
	description = "PostgreSQL database connection URL"
	type        = string
	sensitive   = true
}

variable "nextauth_secret" {
	description = "NextAuth.js secret key for JWT encryption"
	type        = string
	sensitive   = true
}

variable "nextauth_url" {
	description = "NextAuth.js base URL for authentication callbacks"
	type        = string
}

variable "discord_client_id" {
	description = "Discord OAuth application client ID"
	type        = string
	sensitive   = true
}

variable "discord_client_secret" {
	description = "Discord OAuth application client secret"
	type        = string
	sensitive   = true
}

variable "supabase_url" {
	description = "Supabase project URL (public)"
	type        = string
}

variable "supabase_anon_key" {
	description = "Supabase anonymous/public API key"
	type        = string
	sensitive   = true
}

variable "supabase_service_role_key" {
	description = "Supabase service role key for server-side operations"
	type        = string
	sensitive   = true
} 