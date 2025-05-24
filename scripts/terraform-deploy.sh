#!/bin/bash

set -e

STAGE=${1:-dev}

if [[ "$STAGE" != "dev" && "$STAGE" != "prod" ]]; then
    echo "Usage: $0 [dev|prod]"
    echo "Stage must be either 'dev' or 'prod'"
    exit 1
fi

echo "🚀 Deploying Terraform infrastructure for stage: $STAGE"

cd terraform

if [[ ! -f "${STAGE}.tfvars" ]]; then
    echo "❌ Error: ${STAGE}.tfvars file not found!"
    echo "Please copy ${STAGE}.tfvars.example to ${STAGE}.tfvars and configure your values."
    exit 1
fi

echo "📋 Initializing Terraform..."
terraform init

echo "📝 Planning Terraform deployment..."
terraform plan -var-file="${STAGE}.tfvars" -out=tfplan

echo "🎯 Applying Terraform configuration..."
terraform apply -auto-approve tfplan

echo "✅ Terraform deployment completed successfully!"
echo ""
echo "🔍 Outputs:"
terraform output

echo ""
echo "💡 Environment variables are now stored in AWS Parameter Store at:"
echo "   /project-management-app/${STAGE}/*"
echo ""
echo "🚀 You can now deploy your application with:"
echo "   source scripts/fetch-env.sh ${STAGE}"
echo "   pnpm dlx sst deploy --stage ${STAGE}" 