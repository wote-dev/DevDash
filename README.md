# DevDash 🚀

<div align="center">
  <h3>A Modern Developer Portfolio Dashboard</h3>
  <p>Track your GitHub activity, visualize your coding patterns, and showcase your work in style.</p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#deployment">Deployment</a>
  </p>
</div>

---

## ✨ Features

### 🎨 **Beautiful Dark/Light Mode**
- True black dark mode with subtle grid pattern
- Seamless theme switching with system preference detection
- Consistent design across all pages

### 📊 **Real GitHub Integration**
- Connect via GitHub OAuth or manual username
- Live statistics: commits, active repos, language distribution
- Weekly and historical commit activity charts
- Repository listing with stars, forks, and update tracking

### 🎯 **Insights & Analytics**
- Language distribution pie chart
- 12-week commit activity visualization
- Top languages and repository statistics
- Real-time data from GitHub API

### 💫 **Premium User Experience**
- Smooth animations and transitions with Framer Motion
- Skeleton loading states
- Responsive design (mobile, tablet, desktop)
- Clean, minimalist interface
- Hover effects and micro-interactions

### 🔐 **Authentication**
- Powered by Clerk for secure authentication
- GitHub OAuth integration
- Protected routes and user management

---

## 🎬 Demo

> **Live Demo**: [Add your deployment URL here]

### Screenshots

**Light Mode**
![Light Mode Dashboard](./docs/images/light-mode.png)

**Dark Mode**
![Dark Mode Dashboard](./docs/images/dark-mode.png)

**Insights Page**
![Insights](./docs/images/insights.png)

---

## 🛠 Tech Stack

### **Core**
- **[Next.js 15.5](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### **Styling & UI**
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality components
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icons
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations

### **Data Visualization**
- **[Recharts](https://recharts.org/)** - Chart library

### **Authentication**
- **[Clerk](https://clerk.com/)** - Complete user management

### **Integrations**
- **GitHub API** - Real developer statistics
- **GitHub OAuth** - Seamless authentication

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A GitHub account
- A Clerk account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dev:dash.git
   cd dev:dash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   
   # GitHub (Optional - for higher API rate limits)
   NEXT_PUBLIC_GITHUB_TOKEN=ghp_...
   ```

4. **Configure Clerk**
   - Create a new application at [clerk.com](https://clerk.com)
   - Enable GitHub OAuth in Clerk dashboard
   - Copy your API keys to `.env.local`
   - See [CLERK_GITHUB_SETUP.md](./CLERK_GITHUB_SETUP.md) for detailed instructions

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### First-Time Setup

1. Sign in with GitHub through Clerk
2. Your GitHub username will be automatically detected
3. Or manually configure it in Settings
4. Enjoy your personalized dashboard!

---

## 📁 Project Structure

```
dev:dash/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── github/           # GitHub integration
│   ├── insights/             # Analytics page
│   ├── repositories/         # Repositories page
│   ├── settings/             # User settings
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── Navbar.tsx            # Navigation
│   ├── ProfileCard.tsx       # User profile
│   └── theme-toggle.tsx      # Dark mode toggle
├── lib/                      # Utilities
│   └── utils.ts              # Helper functions
├── data/                     # Mock data
│   └── github-insights.ts    # Sample data
└── docs/                     # Documentation
    └── images/               # Screenshots
```

---

## 🎨 Customization

### Theme Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --background: 0 0% 100%;        /* White */
  --foreground: 0 0% 10%;         /* Near black */
  --primary: 217 91% 60%;         /* Blue accent */
  /* ... */
}

.dark {
  --background: 0 0% 0%;          /* True black */
  --foreground: 0 0% 95%;         /* Near white */
  /* ... */
}
```

### Adding Your Own Data

The dashboard uses the GitHub API. To add custom data sources:

1. Create a new API route in `app/api/`
2. Update the components to fetch from your endpoint
3. Follow the existing patterns in `app/page.tsx`

---

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:

- **Vercel** (Recommended)
- **Netlify**
- **Docker**
- **Self-hosted**

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/dev:dash)

1. Click the button above
2. Configure environment variables
3. Deploy!

---

## 📝 Documentation

- [Quick Start Guide](./QUICK_START.md)
- [Clerk & GitHub OAuth Setup](./CLERK_GITHUB_SETUP.md)
- [Dark Mode Implementation](./DARK_MODE_IMPROVEMENTS.md)
- [Features Overview](./FEATURES.md)
- [Design Notes](./DESIGN_NOTES.md)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vercel](https://vercel.com/) for the amazing deployment platform
- [Clerk](https://clerk.com/) for authentication infrastructure
- [GitHub API](https://docs.github.com/en/rest) for developer data

---

## 📧 Contact

**Daniel Zverev**

- GitHub: [@danielzverev](https://github.com/danielzverev)
- Portfolio: [Add your portfolio URL]
- LinkedIn: [Add your LinkedIn]

---

<div align="center">
  <p>Built with ❤️ using Next.js and TypeScript</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
