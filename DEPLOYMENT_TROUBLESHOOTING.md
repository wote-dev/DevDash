# Deployment Troubleshooting Guide 🔧

This guide helps you resolve common deployment issues with DevDash.

## Common Issues & Solutions

### 1. Missing Clerk Publishable Key Error

**Error Message:**
```
Error: @clerk/clerk-react: Missing publishableKey
```

**Cause:** Environment variables are not configured for the deployment.

**Solution:**

#### For Cloudflare Pages:
1. Go to your Cloudflare Pages dashboard
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add these variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = `pk_test_XXXXXXXX` (from Clerk dashboard)
   - `CLERK_SECRET_KEY` = `sk_test_XXXXXXXX` (from Clerk dashboard)
   - `NEXT_PUBLIC_GITHUB_TOKEN` = `ghp_XXXXXXXX` (optional, from GitHub)
5. **Important:** Set variables for both **Production** and **Preview** environments
6. Redeploy your project

#### For Vercel:
```bash
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel --prod
```

Or in Vercel dashboard:
1. Go to **Settings** > **Environment Variables**
2. Add the required variables
3. Trigger a new deployment

---

### 2. Build Fails During Static Generation

**Error Message:**
```
Error occurred prerendering page "/settings"
```

**Cause:** Pages using Clerk authentication are being statically rendered at build time.

**Solution:** Already fixed in the code by adding `export const dynamic = 'force-dynamic'` to pages using Clerk.

If you still encounter this:
1. Make sure all pages using `useUser()` from Clerk have:
   ```tsx
   export const dynamic = 'force-dynamic';
   ```
2. Check that environment variables are set correctly

---

### 3. GitHub API Rate Limiting

**Error Message:**
```
API rate limit exceeded for xxx.xxx.xxx.xxx
```

**Cause:** GitHub API has a limit of 60 requests/hour for unauthenticated requests.

**Solution:**
1. Generate a GitHub Personal Access Token at https://github.com/settings/tokens
2. Select scopes: `public_repo`, `read:user`
3. Add to environment variables:
   ```
   NEXT_PUBLIC_GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXX
   ```
4. This increases your rate limit to 5,000 requests/hour

---

### 4. Clerk OAuth Redirect Errors

**Error Message:**
```
Invalid redirect URL
```

**Cause:** Clerk dashboard not configured with your deployment URL.

**Solution:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Go to **Paths** or **Domains**
4. Add your deployment URL (e.g., `https://your-app.pages.dev`)
5. Under **Social Connections** > **GitHub**:
   - Ensure GitHub is enabled
   - Verify redirect URLs match your deployment

---

### 5. Environment Variables Not Working

**Symptoms:**
- Variables work locally but not in deployment
- Getting `undefined` for environment variables

**Solution:**

**Client-side variables must have `NEXT_PUBLIC_` prefix:**
```env
# ✅ Correct - accessible in browser
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx

# ❌ Wrong - only available server-side
CLERK_PUBLISHABLE_KEY=pk_test_xxx
```

**Redeploy after adding variables:**
- Cloudflare: Trigger new deployment from dashboard
- Vercel: `vercel --prod`
- Netlify: `netlify deploy --prod`

---

### 6. Module Not Found Errors

**Error Message:**
```
Module not found: Can't resolve '@/components/...'
```

**Cause:** Path aliases not configured properly or missing dependencies.

**Solution:**
1. Check `tsconfig.json` has:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```
2. Clear cache and reinstall:
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   npm run build
   ```

---

### 7. Deployment Timeout

**Symptoms:**
- Build takes too long
- Deployment fails with timeout error

**Solution:**
1. Check your build logs for the slowest steps
2. Optimize dependencies:
   ```bash
   # Remove unused dependencies
   npm prune
   
   # Check bundle size
   npm run build
   ```
3. Consider increasing timeout in platform settings (if available)

---

## Platform-Specific Setup

### Cloudflare Pages

1. **Framework Preset:** Select "Next.js"
2. **Build Command:** `npx @cloudflare/next-on-pages@1`
3. **Build Output Directory:** `.vercel/output/static`
4. **Node Version:** 18 or higher

**Note:** Cloudflare Pages requires the `@cloudflare/next-on-pages` adapter. The warning about deprecation is expected - follow the OpenNext documentation if you want to migrate later.

**Environment Variables in Cloudflare:**
- Set in: **Settings > Environment Variables**
- Required for: Production AND Preview branches
- Click "Save and Deploy" after adding

### Vercel (Recommended)

1. **Framework Preset:** Auto-detected (Next.js)
2. **Build Command:** `next build`
3. **Output Directory:** `.next`
4. **Install Command:** `npm install`

**Environment Variables in Vercel:**
```bash
# Via CLI
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
vercel env add CLERK_SECRET_KEY production

# Or in dashboard under Settings > Environment Variables
```

### Netlify

1. **Build Command:** `npm run build`
2. **Publish Directory:** `.next`
3. **Required Plugin:** `@netlify/plugin-nextjs`

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## Verification Checklist

After deployment, verify:

- [ ] Site loads without errors
- [ ] Sign in with GitHub works
- [ ] GitHub stats display correctly
- [ ] All pages render properly (/, /insights, /repositories, /settings)
- [ ] Dark/light mode toggle works
- [ ] Responsive design works on mobile
- [ ] No console errors in browser dev tools

---

## Still Having Issues?

### Debug Steps:

1. **Check Logs:**
   - Cloudflare: Functions > Logs
   - Vercel: Deployment > View Logs
   - Netlify: Deploys > Deploy Log

2. **Test Locally:**
   ```bash
   # Install dependencies
   npm install
   
   # Copy environment example
   cp .env.example .env.local
   
   # Add your real keys to .env.local
   
   # Test production build
   npm run build
   npm start
   ```

3. **Verify Environment Variables:**
   - Check they're set for the correct environment (production/preview)
   - Verify no typos in variable names
   - Ensure `NEXT_PUBLIC_` prefix for client-side variables
   - Check for spaces or quotes that shouldn't be there

4. **Clear Cache:**
   - Most platforms have a "Clear cache and redeploy" option
   - Use this if you're seeing stale builds

---

## Getting Help

If you're still stuck:

1. Check the [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
2. Review [Clerk Deployment Guide](https://clerk.com/docs/deployments/overview)
3. Check platform-specific docs:
   - [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
   - [Vercel Docs](https://vercel.com/docs)
   - [Netlify Docs](https://docs.netlify.com/)
4. Open an issue on [GitHub](https://github.com/YOUR_USERNAME/dev:dash/issues)

---

## Quick Fix Commands

```bash
# Clean everything and rebuild
rm -rf node_modules package-lock.json .next
npm install
npm run build

# Test production build locally
npm start

# Check for TypeScript errors
npm run type-check

# Check for linting issues
npm run lint

# Verify environment variables are loaded
# Add to a test page:
console.log('Clerk Key:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 10))
```

---

**Remember:** Environment variables are the #1 cause of deployment issues. Always double-check they're set correctly! ✅
