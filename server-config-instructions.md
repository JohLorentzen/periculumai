# Server Configuration Instructions to Fix 400 Bad Request Errors

## The Problem

Your Next.js application is experiencing 400 Bad Request errors for JavaScript files in Firefox and Safari. The main issues are:

1. The domain name mismatch: Requests are going to `fe-hirde.no` (with a hyphen) instead of `fehirde.no`
2. The Nginx server is not properly configured to serve the Next.js static files from the `.next` directory

## Solution

### 1. Domain Configuration

First, ensure that DNS settings are properly configured. The domain `fe-hirde.no` should redirect to `fehirde.no`.

### 2. Nginx Configuration

Copy the `nginx.conf` file we created to your server and place it at:
```
/etc/nginx/sites-available/fehirde.no.conf
```

Then enable it:
```bash
sudo ln -s /etc/nginx/sites-available/fehirde.no.conf /etc/nginx/sites-enabled/
sudo nginx -t # Test the configuration
sudo systemctl reload nginx # Apply the changes
```

### 3. Key Configuration Details

The most important parts of the Nginx configuration are:

- The redirect from `fe-hirde.no` to `fehirde.no`
- The correct path for serving static files:
  ```nginx
  location /_next/static/ {
      alias /var/www/periculumai/.next/static/;
      expires 365d;
      access_log off;
      add_header Cache-Control "public, max-age=31536000, immutable";
  }
  ```

### 4. Alternative Fix (if you can't modify Nginx config)

If you don't have access to the Nginx configuration, you can also fix this by modifying your Next.js configuration:

```javascript
// next.config.mjs
const nextConfig = {
  assetPrefix: 'https://fehirde.no',
  // ... other config
};

export default nextConfig;
```

This will ensure that all assets are loaded from the correct domain.

### 5. Testing

After applying these changes:

1. Clear browser caches in Firefox and Safari
2. Verify all JavaScript files load correctly by checking the Network tab
3. Test both the `fehirde.no` and `fe-hirde.no` domains to ensure proper redirection 