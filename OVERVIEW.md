# DevDash Overview Page

## What's Built

The Overview page (`app/page.tsx`) has been enhanced with the following features:

### Header Section
- **Heading**: "Your Developer Activity"
- **Subheading**: "A snapshot of your coding life"

### Statistics Cards (3 Cards in Responsive Grid)

1. **Commits This Week Card**
   - Shows: **42 commits**
   - Icon: GitCommit icon from Lucide
   - Additional info: "+12% from last week"
   - Primary color accent on icon

2. **Active Repos Card**
   - Shows: **5 active repositories**
   - Icon: FolderGit2 icon from Lucide
   - Additional info: "2 updated today"
   - Primary color accent on icon

3. **Languages Used Card**
   - Shows: **TypeScript, Python, Go**
   - Icon: Code2 icon from Lucide
   - Visual breakdown with colored dots:
     - TypeScript: 45% (blue)
     - Python: 35% (yellow)
     - Go: 20% (cyan)

### Activity Chart
- **Title**: "Weekly Activity"
- **Description**: "Your commit activity over the past week"
- **Type**: Line chart using Recharts
- **Data**: Weekly commit data (Mon-Sun)
- **Features**:
  - Responsive container (adapts to screen size)
  - Grid background
  - Interactive tooltips
  - Smooth line with animated dots
  - Custom styling matching the minimalist theme

## Layout & Responsiveness

- **Desktop** (md and up): 3 columns for stats cards
- **Mobile**: Single column stacking
- **Chart**: Fully responsive with ResponsiveContainer
- **Spacing**: Balanced padding and margins throughout
- **Hover Effects**: Cards have subtle border color changes on hover

## Design Features

- Uses shadcn/ui Card components for consistency
- Minimalist aesthetic with white backgrounds
- Soft shadows on cards with hover effects
- Grid texture background from parent layout
- Primary blue accent color for interactive elements
- Clean typography with proper hierarchy
- Smooth transitions using the `transition-smooth` utility

## Technical Implementation

- **Client Component**: Uses "use client" directive for interactive features
- **Recharts Library**: Lightweight charting solution
- **shadcn/ui Cards**: Modular, accessible card components
- **Lucide Icons**: Clean, consistent iconography
- **Tailwind CSS**: Utility-first styling approach

## File Structure

```
/app/page.tsx                    # Main overview page
/components/ui/card.tsx          # shadcn Card component
/lib/utils.ts                    # Utility functions (cn helper)
```

## Running the Project

```bash
npm run dev
```

Visit http://localhost:3000 to see the Overview page in action!
