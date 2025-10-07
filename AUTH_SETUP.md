# Authentication Setup Guide

DevDash now has full user authentication and personalized GitHub stats! Here's how to set it up:

## 🎉 What's New

- ✅ User authentication with Clerk
- ✅ Protected routes (requires login)
- ✅ Personalized GitHub statistics per user
- ✅ Real-time data from GitHub API
- ✅ User profile with settings
- ✅ Sign in/Sign up pages

## 📋 Setup Instructions

### Step 1: Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com) and sign up for a free account
2. Create a new application in the Clerk Dashboard
3. Choose your sign-in options (Email, Google, GitHub, etc.)

### Step 2: Get Your API Keys

1. In your Clerk Dashboard, go to **API Keys**
2. Copy your **Publishable Key** and **Secret Key**

### Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root of your project:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your Clerk keys to `.env.local`:
   ```bash
   # Clerk Authentication Keys
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
   CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx

   # Clerk URLs (these should work as-is)
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

3. **(Optional)** Add a GitHub Personal Access Token for higher API rate limits:
   ```bash
   # GitHub API (Optional - for higher rate limits)
   GITHUB_TOKEN=ghp_xxxxxxxxxxxx
   ```

   To create a GitHub token:
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a name like "DevDash"
   - Select scopes: `public_repo` (for public repository access)
   - Click "Generate token" and copy it

### Step 4: Run the Development Server

```bash
npm run dev
```

### Step 5: Test the Authentication

1. Open [http://localhost:3000](http://localhost:3000)
2. You'll be redirected to the sign-in page
3. Sign up for a new account or sign in
4. You'll be redirected back to the dashboard

### Step 6: Configure Your GitHub Username

1. After signing in, click on your profile in the top-right corner
2. Click **Settings**
3. Enter your GitHub username (e.g., "danielzverev")
4. Click **Save Settings**
5. Go back to the Overview page to see your real GitHub stats!

## 🔒 Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local.example` file is for reference only
- Keep your Clerk Secret Key private
- The GitHub token is optional but recommended for production

## 🚀 Features

### Authentication
- Email/password sign-in
- OAuth providers (Google, GitHub, etc.)
- Secure session management
- Protected routes

### User Profile
- Profile picture display
- Email address
- GitHub username configuration
- Sign out functionality

### GitHub Stats
- Real-time commit counting
- Weekly activity chart
- Active repository tracking
- Programming language breakdown
- Percentage change from previous week

## 📖 How It Works

1. **Authentication**: Clerk handles all user authentication and session management
2. **User Metadata**: GitHub usernames are stored in Clerk's user metadata
3. **API Route**: `/api/github/stats` fetches real data from GitHub API
4. **Protected Routes**: Middleware ensures users must be logged in to access the dashboard
5. **Real-time Updates**: Stats are fetched fresh on each page load (with caching)

## 🎨 Customization

You can customize the sign-in/sign-up experience in the Clerk Dashboard:
- Add/remove OAuth providers
- Customize email templates
- Configure multi-factor authentication
- Set up webhooks for user events

## 🐛 Troubleshooting

### "Unauthorized" Error
- Check that your Clerk API keys are correct in `.env.local`
- Restart your development server after adding environment variables

### No GitHub Stats Showing
- Make sure you've configured your GitHub username in Settings
- Check that the username is spelled correctly
- Verify the GitHub API is accessible (not rate-limited)

### Sign-in Page Not Showing
- Verify the Clerk keys are in `.env.local`
- Check that the middleware is properly configured
- Make sure you restarted the dev server

## 🔄 Rate Limits

- **Without GitHub Token**: 60 requests per hour
- **With GitHub Token**: 5,000 requests per hour

Stats are cached for 5 minutes to reduce API calls.

## 📚 Next Steps

- Add more detailed repository views
- Implement contribution calendar
- Add pull request statistics
- Create team/organization support
- Add data export functionality

Enjoy your personalized DevDash! 🎉
