#!/bin/bash

# This script performs a complete clean and redeploy
# Use it when you need to clear caches and rebuild from scratch

echo "=== Starting clean Docker deployment ==="

# Stop and remove containers
echo "Stopping and removing containers..."
docker-compose down

# Remove node_modules and build directories
echo "Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules

# Prune Docker resources
echo "Cleaning Docker system..."
docker system prune -f

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm ci

# Build the application
echo "Building Next.js application..."
npm run build

# Run the deployment script
echo "Running deployment..."
./deploy.sh

echo "=== Clean deployment completed ==="
echo "Your site should now be available at https://fe-hirde.no" 