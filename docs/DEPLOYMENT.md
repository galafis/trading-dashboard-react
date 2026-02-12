# Deployment Guide

This guide covers deploying the Trading Strategy Dashboard to various platforms.

## Table of Contents

1. [Vercel Deployment](#vercel-deployment)
2. [Netlify Deployment](#netlify-deployment)
3. [Docker Deployment](#docker-deployment)
4. [AWS Deployment](#aws-deployment)
5. [Environment Variables](#environment-variables)
6. [Production Checklist](#production-checklist)

## Vercel Deployment

### Quick Deploy

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

### GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add environment variables (if needed)
7. Click "Deploy"

### Vercel Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "@api-url"
  }
}
```

## Netlify Deployment

### Quick Deploy

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### GitHub Integration

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Choose GitHub and select your repository
5. Configure build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
6. Add environment variables
7. Click "Deploy site"

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if needed)
    location /api/ {
        proxy_pass http://backend:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  backend:
    image: your-backend-image
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
    restart: unless-stopped

volumes:
  nginx_cache:
```

### Build and Run

```bash
# Build image
docker build -t trading-dashboard .

# Run container
docker run -d -p 80:80 trading-dashboard

# Using docker-compose
docker-compose up -d
```

## AWS Deployment

### AWS S3 + CloudFront

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Create S3 bucket:**
   ```bash
   aws s3 mb s3://trading-dashboard-bucket
   ```

3. **Enable static website hosting:**
   ```bash
   aws s3 website s3://trading-dashboard-bucket \
     --index-document index.html \
     --error-document index.html
   ```

4. **Upload files:**
   ```bash
   aws s3 sync dist/ s3://trading-dashboard-bucket --delete
   ```

5. **Set bucket policy:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::trading-dashboard-bucket/*"
       }
     ]
   }
   ```

6. **Create CloudFront distribution:**
   ```bash
   aws cloudfront create-distribution \
     --origin-domain-name trading-dashboard-bucket.s3.amazonaws.com \
     --default-root-object index.html
   ```

### AWS Amplify

1. **Install Amplify CLI:**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Initialize Amplify:**
   ```bash
   amplify init
   ```

3. **Add hosting:**
   ```bash
   amplify add hosting
   ```

4. **Deploy:**
   ```bash
   amplify publish
   ```

## Environment Variables

### Development (.env.local)

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
VITE_ENV=development
```

### Production (.env.production)

```env
VITE_API_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com/ws
VITE_ENV=production
```

### Using Environment Variables

```typescript
// src/config.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws',
  environment: import.meta.env.VITE_ENV || 'development',
};
```

## Production Checklist

### Before Deployment

- [ ] Run all tests: `npm test`
- [ ] Build successfully: `npm run build`
- [ ] Check bundle size
- [ ] Test production build locally: `npm run preview`
- [ ] Update environment variables
- [ ] Review security headers
- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Set up logging
- [ ] Configure CDN
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Review performance with Lighthouse

### Security

- [ ] Use HTTPS everywhere
- [ ] Implement Content Security Policy
- [ ] Configure security headers
- [ ] Validate all environment variables
- [ ] Never commit secrets
- [ ] Use secure WebSocket (WSS)
- [ ] Implement rate limiting
- [ ] Set up authentication
- [ ] Configure CORS properly
- [ ] Keep dependencies updated

### Performance

- [ ] Enable gzip compression
- [ ] Configure caching headers
- [ ] Use CDN for static assets
- [ ] Optimize images
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Minimize bundle size
- [ ] Use production build
- [ ] Configure service worker (if needed)

### Monitoring

- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Set up performance monitoring
- [ ] Configure alerts
- [ ] Set up logging
- [ ] Monitor API usage
- [ ] Track user analytics

## Rollback Strategy

### Vercel
```bash
# List deployments
vercel ls

# Promote a specific deployment
vercel promote [deployment-url]
```

### Netlify
```bash
# List deployments
netlify deploys:list

# Restore a deployment
netlify api restoreDeployment --deploy-id [deploy-id]
```

### Docker
```bash
# Tag stable version
docker tag trading-dashboard:latest trading-dashboard:stable

# Rollback to stable
docker stop trading-dashboard
docker run -d --name trading-dashboard trading-dashboard:stable
```

## Troubleshooting

### Build Fails
- Check Node.js version (requires 18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### 404 on Refresh
- Configure server to serve index.html for all routes
- Add redirect rules (see Netlify/Vercel config above)

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Restart dev server after changing .env
- Check that .env file is in project root

### CORS Errors
- Configure backend CORS headers
- Check API URL in environment variables
- Ensure proper origin configuration

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Netlify Documentation](https://docs.netlify.com)
- Check [Docker Documentation](https://docs.docker.com)
- Open an issue on GitHub
