#!/bin/bash

# Script to install Docker and Docker Compose on the server
# Run this script as a user with sudo privileges

set -e  # Exit immediately if a command exits with a non-zero status

echo "=== Starting server setup for Docker deployment ==="

# Update package lists
echo "Updating package lists..."
sudo apt-get update

# Install required packages
echo "Installing required packages..."
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
echo "Adding Docker's GPG key..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up the stable Docker repository
echo "Setting up Docker repository..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package lists again with the new repository
echo "Updating package lists with Docker repository..."
sudo apt-get update

# Install Docker
echo "Installing Docker..."
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Add your user to the docker group to run Docker without sudo
echo "Adding current user to docker group..."
sudo usermod -aG docker $USER

# Install Docker Compose
echo "Installing Docker Compose..."
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
echo "Verifying Docker installation..."
docker --version
docker-compose --version

# Start Docker and enable it to start on boot
echo "Enabling Docker to start on boot..."
sudo systemctl start docker
sudo systemctl enable docker

echo "=== Server setup complete! ==="
echo "NOTE: You may need to log out and log back in for the docker group changes to take effect."
echo "After logging back in, you can verify with: docker run hello-world" 