#!/bin/bash

# Make sure directories exist
mkdir -p traefik/acme
mkdir -p traefik/config

# Create empty acme.json file with correct permissions
touch traefik/acme/acme.json
chmod 600 traefik/acme/acme.json

# Build and start the containers
echo "Starting Docker deployment..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo "Deployment completed!"
echo "Your site should be available at https://fe-hirde.no"
echo "It may take a few minutes for the SSL certificates to be issued."

# Check if containers are running
echo -e "\nChecking container status:"
docker-compose ps 