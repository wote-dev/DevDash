# DevDash Design System

## ✨ Design Philosophy

**Clean, Minimal, Professional** - A sleek developer dashboard with zero gradients, subtle animations, and a refined black & white color scheme.

## 🎨 Color Palette

### Light Mode
- Background: `#FFFFFF` (Pure White)
- Cards: `#FFFFFF` with `border-gray-200`
- Text Primary: `gray-900`
- Text Secondary: `gray-500` / `gray-600`
- Borders: `gray-200` → `gray-300` on hover
- Accent: `#3B82F6` (Primary Blue)

### Dark Mode
- Background: `#000000` (True Black)
- Cards: `#000000` with `border-gray-900`
- Text Primary: `gray-100`
- Text Secondary: `gray-500`
- Borders: `gray-900` → `gray-800` on hover
- Accent: `#3B82F6` (Primary Blue)

## 📏 Typography

- **Page Titles**: `text-3xl font-semibold` 
- **Card Titles**: `text-base font-semibold`
- **Stat Numbers**: `text-2xl font-semibold`
- **Labels**: `text-sm font-medium text-gray-500`
- **Body Text**: `text-xs` or `text-sm text-gray-500`

## 📦 Components

### Navbar
- Height: `h-14` (56px)
- Background: `bg-white/90` with `backdrop-blur-xl`
- Dark: `bg-black/90`
- Border: Subtle bottom border
- No shadows or elevation

### Cards
- Border: `1px solid` (gray-200/gray-900)
- No shadows by default
- Hover: Border color change only
- No scale transforms
- No shadow elevations
- Padding: `p-5` or `p-6`

### Profile Card
- Compact design (`px-3 py-1.5`)
- Icon: Simple primary blue circle background (10% opacity)
- No gradients
- Hidden details on small screens

### Theme Toggle
- Small button (`p-1.5`)
- Icon size: `h-4 w-4`
- Simple border
- Minimal hover effect

## 🎯 Spacing

- Page padding: `py-8`
- Section margins: `mb-8`
- Card gaps: `gap-4`
- Element gaps: `gap-2` or `gap-3`

## 🌐 Grid Pattern

### Light Mode
- Opacity: `40%`
- Color: `rgb(229 231 235)`
- Size: `40px 40px`

### Dark Mode
- Opacity: `2%` (barely visible)
- Color: `rgb(255 255 255)`
- Size: `40px 40px`

## ⚡ Animations

**Minimal & Subtle**
- All transitions: `transition-colors` only
- Duration: Default browser timing
- No scale transforms
- No shadow animations
- No slide/fade effects
- No staggered delays

## 🚫 What We DON'T Use

- ❌ Gradients (anywhere)
- ❌ Box shadows (except subtle borders)
- ❌ Scale transforms on hover
- ❌ Complex animations
- ❌ Bright/saturated colors
- ❌ Multiple font weights per section

## 📱 Responsive

- Mobile: Single column, compact spacing
- Tablet: 2-column grids
- Desktop: 3-column grids where appropriate
- Max width: `max-w-7xl`

## 🎨 Status Colors

- Success/Positive: `green-600` (text only)
- Warning: `yellow-500` (minimal use)
- Error: `red-600` (minimal use)
- Info: Primary blue

## 🔧 Technical

- Framework: Next.js 15.5.0
- React: 19.2.0
- Styling: Tailwind CSS
- Icons: Lucide React (size: h-4 w-4)
- Charts: Recharts with minimal styling

---

**Result**: A professional, modern dashboard that looks expensive and clean without being flashy or overdone.
