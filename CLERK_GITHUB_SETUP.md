# Setting Up GitHub OAuth in Clerk

Your `.env.local` file is already configured with your Clerk API keys! Now you just need to enable GitHub OAuth in the Clerk Dashboard.

## 🔐 Configure GitHub OAuth (5 minutes)

### Step 1: Go to Clerk Dashboard
1. Open [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Log in to your account
3. Select your **DevDash** application

### Step 2: Enable GitHub OAuth
1. In the left sidebar, click **"User & Authentication"** → **"Social Connections"**
2. Find **GitHub** in the list of providers
3. Toggle it **ON** (enable it)

### Step 3: Configure GitHub Settings
You have two options:

#### Option A: Use Clerk's Development Keys (Fastest - Recommended for Testing)
- Just toggle GitHub ON
- Clerk provides development OAuth credentials automatically
- **This works immediately for testing!**

#### Option B: Use Your Own GitHub OAuth App (For Production)
If you want to use your own GitHub OAuth app:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name**: DevDash
   - **Homepage URL**: `http://localhost:3000` (or your production URL)
   - **Authorization callback URL**: Get this from Clerk Dashboard (it's shown when you click on GitHub)
4. Click **"Register application"**
5. Copy your **Client ID** and **Client Secret**
6. Paste them into the Clerk Dashboard GitHub settings

### Step 4: Disable Other Login Methods (Optional but Recommended)
Since users only need GitHub to view their stats:

1. In Clerk Dashboard, go to **"User & Authentication"** → **"Email, Phone, Username"**
2. **Disable** email/password login (or keep it if you want)
3. In **"Social Connections"**, make sure only **GitHub** is enabled
4. Disable Google, Facebook, etc.

This ensures users **only** sign in with GitHub!

---

## ✅ That's It!

Now when users visit your app:
1. They'll see a **"Continue with GitHub"** button
2. They click it and authorize via GitHub
3. Their GitHub username is **automatically detected**
4. They can immediately see their stats - no manual setup needed!

---

## 🎯 Smart Features Added

- **Auto-Detection**: GitHub username is automatically pulled from OAuth connection
- **No Manual Entry**: Users don't need to type their username if they log in with GitHub
- **Seamless Experience**: One click to sign in and see stats

---

## 🧪 Test It Now

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. You'll be redirected to sign-in

4. Click **"Continue with GitHub"**

5. Authorize the app

6. You'll see your dashboard with **your real GitHub stats automatically!**

---

## 🔄 First-Time Users Flow

1. User clicks "Continue with GitHub"
2. GitHub OAuth authorization
3. User is logged in
4. Dashboard loads
5. If no GitHub username detected → Redirect to Settings
6. If GitHub username IS detected → Show stats immediately! ✨

The GitHub username from OAuth is saved automatically in the Settings page, so users don't have to do anything!

---

## 🐛 Troubleshooting

### "Sign in with GitHub" button not showing
- Check that GitHub is enabled in Clerk Dashboard under Social Connections
- Restart your dev server after making changes in Clerk

### GitHub username not detected
- The username is pulled from the OAuth connection
- Check in Settings page - it should auto-fill
- If not, users can manually enter it

### Still seeing other login options
- Go to Clerk Dashboard → Social Connections
- Disable all providers except GitHub
- Also check Email, Phone, Username settings

---

Enjoy your streamlined GitHub-only authentication! 🚀
