# Complete Docker Deployment Guide

This guide walks through setting up your server for Docker deployments and configuring GitHub Actions for automated continuous deployment.

## Server Setup

### 1. Prepare Your Server

First, SSH into your server:

```bash
ssh your-username@your-server-ip
```

### 2. Install Docker and Docker Compose

Upload the `server-setup.sh` script to your server and run it:

```bash
# Make the script executable
chmod +x server-setup.sh

# Run the script
./server-setup.sh

# Log out and log back in for group changes to take effect
logout
```

After logging back in, verify Docker works:

```bash
docker run hello-world
```

### 3. Prepare Directory Structure

Create the necessary directory for your application:

```bash
sudo mkdir -p /var/www/periculumai
sudo chown $USER:www-data /var/www/periculumai
sudo chmod 775 /var/www/periculumai
```

## GitHub Actions Configuration

### 1. Configure GitHub Repository Secrets

In your GitHub repository, go to Settings > Secrets and variables > Actions and add the following secrets:

- `DEPLOY_HOST`: Your server's IP address or domain name
- `DEPLOY_USER`: Your SSH username
- `DEPLOY_PASSWORD`: Your SSH password (for production, consider using SSH keys instead)

### 2. Push Changes to Trigger Deployment

The GitHub Actions workflow will automatically run whenever you push to the main branch. It will:

1. Build your Next.js application
2. Package it with Docker
3. Deploy it to your server
4. Start the Docker containers

## Domain Configuration

### 1. Configure DNS Records

Set up DNS records for your domains:

- Point `fehirde.no` and `www.fehirde.no` to your server's IP address
- Point `fe-hirde.no` and `www.fe-hirde.no` to your server's IP address

### 2. Update Traefik Email Address

Before deploying, update the email address in `traefik/traefik.yml`:

```yaml
certificatesResolvers:
  letsencrypt:
    acme:
      email: "your-actual-email@example.com"  # Replace with your email
```

## Troubleshooting

### 1. Check Container Logs

```bash
# SSH into your server
ssh your-username@your-server-ip

# Navigate to project directory
cd /var/www/periculumai

# Check container status
docker-compose ps

# View container logs
docker-compose logs nextjs
docker-compose logs traefik
```

### 2. Check Domain Redirection

```bash
curl -I https://fe-hirde.no
```

Should return a 301 redirect to `https://fehirde.no`.

### 3. Manual Deployment

If needed, you can manually deploy:

```bash
cd /var/www/periculumai
./deploy.sh
```

## Maintenance and Updates

### 1. Updating the Application

Simply push changes to the main branch in GitHub, and GitHub Actions will handle the deployment.

### 2. Backing Up Certificates

Periodically back up your Let's Encrypt certificates:

```bash
sudo cp -r /var/www/periculumai/traefik/acme /backup/path
``` 