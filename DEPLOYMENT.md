# Deployment Guide 🚀

This guide covers deploying DevDash to various platforms.

## Table of Contents

- [Vercel Deployment (Recommended)](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Environment Variables](#environment-variables)
- [Post-Deployment Setup](#post-deployment-setup)
- [Troubleshooting](#troubleshooting)

---

## Vercel Deployment

Vercel is the recommended platform for deploying Next.js applications.

### Method 1: Deploy with Vercel Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/dev:dash)

### Method 2: Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   vercel env add CLERK_SECRET_KEY
   vercel env add NEXT_PUBLIC_GITHUB_TOKEN
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 3: GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel will auto-detect Next.js
5. Add environment variables (see below)
6. Click "Deploy"

---

## Netlify Deployment

### Prerequisites

Install the Netlify CLI:
```bash
npm install -g netlify-cli
```

### Deployment Steps

1. **Create a `netlify.toml` file** (already included)
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify**
   ```bash
   netlify init
   ```

4. **Set Environment Variables**
   ```bash
   netlify env:set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY "pk_test_..."
   netlify env:set CLERK_SECRET_KEY "sk_test_..."
   netlify env:set NEXT_PUBLIC_GITHUB_TOKEN "ghp_..."
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

---

## Environment Variables

### Required Variables

```env
# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXX
```

### Optional Variables

```env
# GitHub Personal Access Token (Optional but recommended)
# Increases API rate limits from 60 to 5,000 requests/hour
NEXT_PUBLIC_GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXX

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### How to Get These Values

#### Clerk Keys
1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Go to "API Keys" in the dashboard
4. Copy the publishable key and secret key

#### GitHub Token
1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select these scopes:
   - `public_repo` (or `repo` for private repos)
   - `read:user`
4. Copy the generated token

---

## Post-Deployment Setup

### 1. Update Clerk Settings

After deployment, update your Clerk application:

1. Go to your Clerk Dashboard
2. Navigate to "Paths" or "Domains"
3. Add your deployment URL:
   ```
   https://your-app.vercel.app
   ```

4. **Update OAuth Redirect URIs**:
   - Allowed redirect URLs: `https://your-app.vercel.app/*`
   - Sign-in URL: `https://your-app.vercel.app/sign-in`
   - Sign-up URL: `https://your-app.vercel.app/sign-up`

### 2. Configure GitHub OAuth

1. In Clerk Dashboard, go to "Social Connections"
2. Enable GitHub
3. Follow the setup wizard
4. GitHub OAuth should work automatically with your deployment URL

### 3. Test Your Deployment

1. Visit your deployed URL
2. Sign in with GitHub
3. Verify that:
   - Authentication works
   - GitHub data loads correctly
   - All pages render properly
   - Dark mode toggles work

---

## Custom Domain Setup

### Vercel

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update your DNS records as instructed
5. Update Clerk settings with the new domain

### Netlify

1. Go to "Domain settings" in Netlify
2. Click "Add custom domain"
3. Follow the DNS configuration steps
4. Enable HTTPS (automatic with Let's Encrypt)
5. Update Clerk settings with the new domain

---

## Docker Deployment (Advanced)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t devdash .
docker run -p 3000:3000 --env-file .env.local devdash
```

---

## Troubleshooting

### Build Fails

**Error: Cannot find module**
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

**Error: Environment variables not found**
- Ensure all required environment variables are set
- Check for typos in variable names
- Verify variables are prefixed with `NEXT_PUBLIC_` for client-side access

### Authentication Issues

**Clerk redirect errors**
- Update allowed redirect URLs in Clerk dashboard
- Ensure deployment URL matches exactly
- Check that environment variables are set correctly

**GitHub OAuth not working**
- Verify GitHub OAuth is enabled in Clerk
- Check that Clerk has the correct callback URLs
- Ensure GitHub app settings in Clerk are configured

### API Rate Limiting

**Error: API rate limit exceeded**
- Add `NEXT_PUBLIC_GITHUB_TOKEN` to increase rate limits
- Consider implementing caching for GitHub API responses
- Use Vercel's Edge Caching for better performance

### Performance Issues

**Slow initial load**
- Enable static generation where possible
- Implement ISR (Incremental Static Regeneration)
- Use Vercel's Edge Network for better global performance

---

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. Get your GA4 Measurement ID
2. Add to environment variables:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. Add to `app/layout.tsx`:
   ```tsx
   import Script from 'next/script'
   
   // In the <head> section
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
     strategy="afterInteractive"
   />
   ```

### Vercel Analytics

Vercel provides built-in analytics:

1. Go to your project dashboard
2. Click "Analytics" tab
3. Enable Web Analytics
4. Install the package:
   ```bash
   npm install @vercel/analytics
   ```

5. Add to your app:
   ```tsx
   import { Analytics } from '@vercel/analytics/react'
   
   // In layout.tsx
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     )
   }
   ```

---

## CI/CD Setup

### GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Rotate secrets regularly** - Especially GitHub tokens
3. **Use environment-specific keys** - Different keys for development/production
4. **Enable Clerk's security features** - 2FA, email verification, etc.
5. **Set up CORS properly** - Configure allowed origins in API routes
6. **Use HTTPS** - Always (automatic on Vercel/Netlify)

---

## Support

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/YOUR_USERNAME/dev:dash/issues)
2. Review [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
3. Check [Vercel Documentation](https://vercel.com/docs)
4. Contact [Clerk Support](https://clerk.com/support)

---

**Happy Deploying! 🎉**
