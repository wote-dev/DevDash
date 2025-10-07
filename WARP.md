# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

DevDash is a modern developer dashboard built with Next.js 15 that displays GitHub statistics, repository insights, and coding activity. It features Clerk authentication, real-time GitHub API integration, and a minimalist dark/light theme design.

## Development Commands

### Running the Application
```bash
# Development server (default: http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Setup
```bash
# Copy the environment template
cp .env.local.example .env.local

# Edit .env.local and add your Clerk API keys from https://dashboard.clerk.com
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
# CLERK_SECRET_KEY=sk_test_...
# GITHUB_TOKEN=... (optional, for higher API rate limits)
```

## Architecture

### Authentication Flow
- **Provider**: Clerk (`@clerk/nextjs`)
- **Route Protection**: `middleware.ts` protects all routes except `/sign-in` and `/sign-up`
- **User Metadata**: GitHub username stored in `user.unsafeMetadata.githubUsername`
- **OAuth Support**: Automatic GitHub username detection from OAuth connections (`user.externalAccounts`)

### Data Flow
1. User authenticates via Clerk
2. GitHub username is retrieved from:
   - User metadata (saved in Settings)
   - OAuth connection (auto-detected if signed in with GitHub)
3. Pages call `/api/github/stats` API route with username parameter
4. API route fetches data from GitHub REST API v3
5. Response is cached (5 min for stats, 1 hour for user profile)

### API Route Structure
**`/app/api/github/stats/route.ts`**
- Requires authentication (checks `userId` from Clerk)
- Fetches: repos, events, user profile from GitHub API
- Calculates: commits this week, weekly activity, language distribution, active repos
- Returns: `{ stats: {...}, weeklyActivity: [...] }`

### Page Components

**Home (`/app/page.tsx`)**
- Displays overview stats (commits, active repos, top languages)
- Weekly activity line chart (Recharts)
- Shows setup prompt if no GitHub username configured

**Insights (`/app/insights/page.tsx`)**
- Language distribution pie chart
- 12-week commit activity line chart
- Fetches data from same API endpoint as Home

**Repositories (`/app/repositories/page.tsx`)**
- Lists user's repositories directly from GitHub API (client-side)
- Shows stars, forks, language, last updated
- Sorted by most recently updated

**Settings (`/app/settings/page.tsx`)**
- Save/update GitHub username in Clerk user metadata
- Auto-detects OAuth GitHub username if available

### Theme System
- **Provider**: `next-themes` with `ThemeProvider` wrapper
- **Modes**: light, dark, system (respects OS preference)
- **Toggle**: `ThemeToggle` component in Navbar
- **Design Philosophy**: 
  - Light mode: white background, gray borders
  - Dark mode: true black (#000000) background, zinc-950 cards
  - HSL-based color system via CSS custom properties in `globals.css`

### Component Architecture

**shadcn/ui Components** (`/components/ui/`)
- `Card`, `Button`, `Input`, `Label`, `Skeleton`
- All use `cn()` utility from `lib/utils.ts` for conditional classes

**Custom Components** (`/components/`)
- `Navbar.tsx`: Sticky nav with theme toggle and profile card
- `ProfileCard.tsx`: User avatar and contribution count
- `theme-provider.tsx`: Next-themes wrapper
- `theme-toggle.tsx`: Sun/moon icon toggle button

### Styling System
- **Framework**: Tailwind CSS
- **Config**: `tailwind.config.ts` with HSL color tokens
- **Custom Utilities**: `transition-smooth`, `text-lite`, `border-lite`
- **Color Scheme**: HSL-based with CSS custom properties for theme switching
- **Path Aliases**: `@/*` resolves to project root

### Type Safety
- Full TypeScript with strict mode enabled
- Interfaces defined inline in components for API responses
- No separate types directory (types co-located with usage)

## Key Implementation Details

### GitHub API Integration
- Uses GitHub REST API v3 (not GraphQL)
- Authentication via `GITHUB_TOKEN` env var (optional, increases rate limits)
- Rate limiting: 60 req/hr unauthenticated, 5000 req/hr authenticated
- Caching: Next.js `fetch()` with `next.revalidate` option

### State Management
- No global state library (Redux, Zustand, etc.)
- Component-level state with React hooks
- Clerk handles auth state automatically

### Data Caching Strategy
- Server-side API routes cache GitHub API responses
- Client-side: no persistent cache, refetch on mount
- Skeleton loaders shown during data fetch (~800ms simulated delay)

### Language Color Mapping
Language colors are hardcoded in components (consistent across Home, Insights, Repositories):
```typescript
const languageColors: { [key: string]: string } = {
  TypeScript: "#3178c6" / "bg-blue-500",
  JavaScript: "#f1e05a" / "bg-yellow-500",
  Python: "#3572A5" / "bg-green-500",
  Go: "#00ADD8" / "bg-cyan-500",
  // ... more languages
};
```

### Responsive Design Breakpoints
- Mobile: `< 640px` - single column, compact nav
- Tablet: `640px - 1024px` - 2-column grids
- Desktop: `> 1024px` - 3-column layouts, full features

## Common Tasks

### Adding a New Page
1. Create `app/new-page/page.tsx`
2. Add link to `navLinks` array in `components/Navbar.tsx`
3. Follow existing patterns: client component, Clerk auth, loading states

### Adding a New API Route
1. Create `app/api/route-name/route.ts`
2. Import `auth` from `@clerk/nextjs/server` for authentication
3. Use `NextResponse.json()` for responses
4. Add caching with `next.revalidate` in fetch options

### Modifying Theme Colors
Edit CSS custom properties in `app/globals.css`:
```css
:root { /* Light mode */ }
.dark { /* Dark mode */ }
```

### Testing GitHub API Calls
Use the GitHub API route directly:
```bash
# Get stats for a user
curl http://localhost:3000/api/github/stats?username=USERNAME
```

## Important Files

- `middleware.ts` - Route protection, must be at project root
- `app/layout.tsx` - Wraps app with ClerkProvider and ThemeProvider
- `components.json` - shadcn/ui configuration
- `.env.local` - Environment variables (not committed)
- `next.config.mjs` - Allows Clerk images from `img.clerk.com`

## Documentation References

For detailed setup instructions, see:
- `QUICK_START.md` - Quick start guide for authentication setup
- `FEATURES.md` - Comprehensive feature list with design details
- `AUTH_SETUP.md` - Detailed Clerk authentication setup
- `CLERK_GITHUB_SETUP.md` - GitHub OAuth configuration

## Development Notes

### Clerk User Metadata Pattern
Access GitHub username with fallback:
```typescript
const savedGithubUsername = user?.unsafeMetadata?.githubUsername as string;
const githubAccount = user?.externalAccounts?.find(
  (account) => account.provider === "github"
);
const githubUsername = savedGithubUsername || githubAccount?.username;
```

### Chart Implementation
Uses Recharts library for all charts:
- `ResponsiveContainer` for responsive sizing
- `LineChart` for weekly activity and commit trends
- `PieChart` for language distribution
- Custom tooltips and styling to match theme

### Loading States
All pages implement skeleton loading:
- `Skeleton` component from shadcn/ui
- Shown during initial data fetch
- Dark mode compatible (zinc-900 backgrounds)

### Error Handling
Pages handle three states:
1. Loading - show skeletons
2. No GitHub username - prompt to configure in Settings
3. Error fetching data - show error message with retry option
