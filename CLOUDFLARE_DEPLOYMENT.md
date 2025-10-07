# Cloudflare Pages Deployment Guide 🚀

Quick guide to deploy DevDash on Cloudflare Pages.

## Prerequisites

1. Clerk account with API keys
2. GitHub account
3. Cloudflare account

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

```bash
git add -A
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** > **Create Application** > **Pages**
3. Connect to your GitHub repository
4. Select your `DevDash` repository

### 3. Configure Build Settings

Use these EXACT settings:

- **Framework preset:** `Next.js`
- **Build command:** `npx @cloudflare/next-on-pages@1`
- **Build output directory:** `.vercel/output/static`
- **Root directory (optional):** (leave empty)
- **Environment variables:** (see below)

### 4. Add Environment Variables

Click **Add environment variable** and add these **ONE BY ONE**:

#### Required Variables:

| Variable Name | Value | Where to Get It |
|--------------|-------|-----------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` | [Clerk Dashboard](https://dashboard.clerk.com/) → API Keys |
| `CLERK_SECRET_KEY` | `sk_test_...` | [Clerk Dashboard](https://dashboard.clerk.com/) → API Keys |

#### Optional but Recommended:

| Variable Name | Value | Where to Get It |
|--------------|-------|-----------------|
| `NEXT_PUBLIC_GITHUB_TOKEN` | `ghp_...` | [GitHub Settings](https://github.com/settings/tokens) → Generate new token |

**IMPORTANT:** 
- Set these for **BOTH** Production and Preview environments
- Click the checkbox for both when adding each variable
- Make sure there are NO extra spaces before or after the keys

### 5. Deploy

Click **Save and Deploy**

The build should complete successfully in 2-3 minutes.

## After Deployment

### Update Clerk Settings

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Navigate to **Paths** or **Domains**
4. Add your Cloudflare Pages URL:
   ```
   https://your-project.pages.dev
   ```
5. Under **Social Connections** → **GitHub**:
   - Ensure GitHub OAuth is enabled
   - Verify redirect URLs include your deployment URL

### Test Your Deployment

Visit your deployed site and verify:

- [ ] Site loads without errors
- [ ] Can sign in with GitHub
- [ ] GitHub stats load properly
- [ ] All pages work (/, /insights, /repositories, /settings)
- [ ] Dark mode toggle works

## Troubleshooting

### Build Fails with "Missing publishableKey"

**Solution:** You forgot to add environment variables!

1. Go to your Pages project → **Settings** → **Environment Variables**
2. Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
3. Make sure to check BOTH "Production" and "Preview" checkboxes
4. Go to **Deployments** → **Retry deployment**

### "Invalid redirect URL" after sign in

**Solution:** Update Clerk dashboard with your deployment URL

1. Go to Clerk Dashboard
2. Add your Cloudflare Pages URL to allowed domains
3. Check GitHub OAuth settings

### Build Succeeds but Pages Don't Load

**Solution:** Check the Functions logs

1. Go to your Pages project → **Functions** → **Logs**
2. Look for error messages
3. Common issues:
   - Environment variables not set
   - Clerk keys are wrong
   - Need to redeploy after adding variables

### Still Getting Errors?

See the full [Deployment Troubleshooting Guide](./DEPLOYMENT_TROUBLESHOOTING.md)

## Important Notes

### About the Deprecation Warning

You'll see this warning during build:
```
npm warn deprecated @cloudflare/next-on-pages@1.13.16: 
Please use the OpenNext adapter instead
```

**This is fine!** The warning is expected. The build will still work perfectly. You can migrate to OpenNext later if needed, but it's not required.

### About Dynamic Rendering

This app uses **dynamic rendering** (server-side rendering on each request) rather than static site generation. This is required for:
- Clerk authentication
- Real-time GitHub data
- User-specific content

All pages are marked with `export const dynamic = 'force-dynamic'` to ensure they render correctly at runtime.

## Custom Domain Setup

### Add a Custom Domain

1. Go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `devdash.yourdomain.com`)
4. Follow Cloudflare's DNS instructions
5. Wait for DNS propagation (usually 5-15 minutes)

### Update Clerk After Adding Domain

1. Go to Clerk Dashboard
2. Add your custom domain to allowed domains
3. Test sign-in with the new domain

## Redeploying

### Manual Redeploy

1. Go to your Pages project → **Deployments**
2. Click on the latest deployment
3. Click **Retry deployment**

### Auto Redeploy on Push

Cloudflare Pages automatically redeploys when you push to GitHub:

```bash
git add -A
git commit -m "Update feature"
git push origin main
```

The deployment starts automatically within seconds.

## Environment Variables Checklist

Before deploying, make sure you have:

- [x] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - starts with `pk_test_` or `pk_live_`
- [x] `CLERK_SECRET_KEY` - starts with `sk_test_` or `sk_live_`
- [ ] `NEXT_PUBLIC_GITHUB_TOKEN` - (optional) starts with `ghp_`
- [x] Variables set for BOTH Production AND Preview
- [x] No extra spaces in the values
- [x] Saved and deployment triggered

## Quick Commands

```bash
# Clone and setup locally
git clone https://github.com/YOUR_USERNAME/DevDash.git
cd DevDash
npm install

# Copy environment example
cp .env.example .env.local
# Edit .env.local with your real keys

# Test locally
npm run dev

# Test production build
npm run build

# Push to trigger deployment
git push origin main
```

## Performance Tips

### Optimize for Cloudflare Pages

1. **Enable Caching** in Cloudflare Dashboard (automatic for static assets)
2. **Add GitHub Token** to increase API rate limits
3. **Monitor Usage** in Functions → Analytics
4. **Use Cloudflare Analytics** for visitor insights

### Monitoring

- **Build logs:** Pages project → Deployments → View details
- **Function logs:** Pages project → Functions → Logs
- **Analytics:** Pages project → Web Analytics

## Getting Help

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **Clerk Docs:** https://clerk.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Troubleshooting Guide:** [DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md)

## Success! 🎉

Once deployed, your DevDash portfolio is live and accessible at:
```
https://your-project.pages.dev
```

Share it on LinkedIn, Twitter, and add it to your resume!

---

**Pro Tip:** Screenshot your deployed app in both light and dark mode, and add the images to `docs/images/` to complete your portfolio README!
