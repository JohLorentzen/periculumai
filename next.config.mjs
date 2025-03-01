/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use assetPrefix in production, use relative paths in development
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? (process.env.NEXT_PUBLIC_BASE_URL || 'https://fe-hirde.no')
    : undefined,
  // Add crossOrigin for proper loading of assets
  crossOrigin: 'anonymous',
  output: 'standalone', // Enable standalone output for Docker
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        // Specific headers for static assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
