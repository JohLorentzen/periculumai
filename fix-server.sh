#!/bin/bash

# Script to check and install Docker Compose on the server
# Run this script on your server

set -e  # Exit immediately if a command exits with a non-zero status

echo "=== Checking Docker installation ==="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Running server-setup.sh..."
    ./server-setup.sh
else
    echo "Docker is already installed: $(docker --version)"
    
    # Check if Docker Compose is installed as a standalone binary
    if ! command -v docker-compose &> /dev/null; then
        echo "Docker Compose standalone binary not found. Installing Docker Compose..."
        
        # Get latest Docker Compose version
        LATEST_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
        
        # Install Docker Compose
        sudo curl -L "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        
        # Check installation
        docker-compose --version
    else
        echo "Docker Compose standalone binary already installed: $(docker-compose --version)"
    fi
    
    # Also check if Docker Compose plugin is installed (newer method)
    if ! docker compose version &> /dev/null; then
        echo "Docker Compose plugin not found. Installing Docker Compose plugin..."
        sudo apt-get update
        sudo apt-get install -y docker-compose-plugin
        
        # Check installation
        docker compose version
    else
        echo "Docker Compose plugin already installed: $(docker compose version)"
    fi
fi

# Update aliases for both docker-compose methods
echo "Adding aliases for both docker-compose methods..."
cat << 'EOF' >> ~/.bashrc

# Docker Compose aliases - use both binary and plugin format
alias docker-compose='docker compose'
EOF

echo "Reload your shell or run 'source ~/.bashrc' to apply the changes"

echo "=== Docker environment check completed ==="

# Now try to deploy
echo "Running deployment..."
cd /var/www/periculumai
./deploy.sh 