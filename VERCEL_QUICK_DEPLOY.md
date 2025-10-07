# Deploy to Vercel in 2 Minutes ⚡

Forget Cloudflare's complexity. Vercel is made for Next.js.

## Option 1: Web UI (Easiest - 2 Minutes)

### Step 1: Push your code
```bash
git push origin main
```

### Step 2: Go to Vercel
1. Visit https://vercel.com/
2. Click **"Add New..."** → **"Project"**
3. **Import** your `DevDash` repository from GitHub
4. Vercel auto-detects Next.js - click **"Deploy"**

### Step 3: Add Environment Variables (After First Deploy)
1. Go to your project → **Settings** → **Environment Variables**
2. Add these:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = your Clerk publishable key
   - `CLERK_SECRET_KEY` = your Clerk secret key
3. Click **"Redeploy"** in the Deployments tab

### Step 4: Update Clerk
1. Go to https://dashboard.clerk.com/
2. Add your Vercel URL (e.g., `your-project.vercel.app`)
3. Done! ✅

---

## Option 2: CLI (3 Minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY

# Deploy to production
vercel --prod
```

---

## Why Vercel is Better for This

✅ **Auto-detects Next.js** - no configuration needed  
✅ **No Edge Runtime required** - works with Node.js runtime  
✅ **Built by Next.js team** - perfect compatibility  
✅ **Simple env vars** - add and done  
✅ **Instant deployments** - push to deploy  
✅ **Free tier** - perfect for portfolios  

## What About Cloudflare?

Cloudflare Pages is great but:
- ❌ Requires Edge Runtime for everything
- ❌ Uses adapters (@cloudflare/next-on-pages)
- ❌ More complex setup
- ❌ Not optimized for Next.js specifically

**For a portfolio project with Next.js + Clerk, Vercel is the way to go.**

---

## After Deploying

Your site will be live at: `https://your-project.vercel.app`

### Custom Domain (Optional)
1. Go to project → **Settings** → **Domains**
2. Add your domain
3. Update DNS records
4. Update Clerk with new domain

---

## Troubleshooting

### Build fails?
- Make sure environment variables are added
- Check the deployment logs in Vercel dashboard

### Clerk not working?
- Add your Vercel URL to Clerk dashboard
- Verify environment variables are set correctly

---

**That's it! No Edge Runtime, no adapters, no headaches.** 🎉
