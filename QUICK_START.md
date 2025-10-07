# Quick Start - DevDash Authentication

## 🚀 Get Started in 5 Minutes

### 1. Get Clerk API Keys
- Sign up at [clerk.com](https://clerk.com)
- Create a new application
- Copy your API keys from the dashboard

### 2. Create `.env.local`
```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your keys:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

### 3. Run the App
```bash
npm install  # If you haven't already
npm run dev
```

### 4. Sign Up & Configure
1. Open [http://localhost:3000](http://localhost:3000)
2. Create an account
3. Go to Settings and enter your GitHub username
4. Return to Overview to see your stats!

## ⚡ That's It!

For detailed instructions, see [AUTH_SETUP.md](./AUTH_SETUP.md)

---

## 📁 New Files Added

- `middleware.ts` - Route protection
- `app/sign-in/[[...sign-in]]/page.tsx` - Sign-in page
- `app/sign-up/[[...sign-up]]/page.tsx` - Sign-up page
- `app/settings/page.tsx` - User settings
- `app/api/github/stats/route.ts` - GitHub API endpoint
- `.env.local.example` - Environment variables template

## 🎯 Key Features

- ✅ Secure authentication with Clerk
- ✅ Real GitHub stats (commits, repos, languages)
- ✅ Weekly activity charts
- ✅ User profile with settings
- ✅ Protected routes
