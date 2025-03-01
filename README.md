# Periculumai - Next.js Docker Deployment

This repository contains a Next.js application configured for Docker deployment with Traefik as a reverse proxy.

## Repository Structure

```
/
├── .github/workflows/       # GitHub Actions workflows
├── app/                     # Next.js application
├── components/              # React components
├── public/                  # Static assets
├── traefik/                 # Traefik configuration
│   ├── acme/                # Let's Encrypt certificates
│   ├── config/              # Domain configurations
│   └── traefik.yml          # Main Traefik configuration
├── Dockerfile               # Docker container definition
├── docker-compose.yml       # Docker Compose configuration
├── deploy.sh                # Manual deployment script
├── server-setup.sh          # Script to install Docker on server
└── DEPLOYMENT.md            # Detailed deployment guide
```

## Features

- Dockerized Next.js application
- Automatic SSL certificates with Let's Encrypt
- Traefik reverse proxy with domain routing
- CI/CD with GitHub Actions
- Domain redirection (fe-hirde.no → fehirde.no)

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The application is automatically deployed to the production server when changes are pushed to the main branch.

For manual deployment or server setup, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Environment Variables

- `NEXT_PUBLIC_BASE_URL`: The base URL of the application (set in docker-compose.yml)

## Domain Configuration

The application supports multiple domains:
- Primary: fehirde.no and www.fehirde.no
- Redirects: fe-hirde.no and www.fe-hirde.no redirect to fehirde.no

## Health Check

The application provides a health check endpoint at `/api/health` that returns a 200 status code when the application is running correctly.
