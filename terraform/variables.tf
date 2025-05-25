variable "stage" {
	description = "Deployment stage"
	type        = string
	default     = "dev"
}

variable "app_name" {
	description = "Application name"
	type        = string
	default     = "project-management-app"
}

variable "region" {
	description = "AWS region"
	type        = string
	default     = "us-east-1"
}

variable "database_url" {
	description = "PostgreSQL database connection URL"
	type        = string
	sensitive   = true
}

variable "nextauth_secret" {
	description = "NextAuth.js secret key"
	type        = string
	sensitive   = true
}

variable "nextauth_url" {
	description = "NextAuth.js base URL for authentication callbacks"
	type        = string
}

variable "supabase_url" {
	description = "Supabase project URL"
	type        = string
}

variable "supabase_anon_key" {
	description = "Supabase anonymous key"
	type        = string
	sensitive   = true
}

variable "supabase_service_role_key" {
	description = "Supabase service role key"
	type        = string
	sensitive   = true
} 