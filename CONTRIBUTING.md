# Contributing to DevDash 🤝

Thank you for your interest in contributing to DevDash! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A GitHub account
- A Clerk account (free tier)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dev:dash.git
   cd dev:dash
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/dev:dash.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

6. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Creating a Feature Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes in your feature branch
2. Test your changes thoroughly
3. Ensure code follows the style guide
4. Write or update tests if applicable
5. Update documentation if needed

### Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Build the project
npm run build

# Run the production build locally
npm start
```

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Avoid `any` type - use `unknown` if type is truly unknown

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use meaningful component and prop names

Example:
```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

### File Organization

```
app/
  [feature]/
    page.tsx          # Page component
    layout.tsx        # Layout for the feature
    loading.tsx       # Loading state
    error.tsx         # Error boundary

components/
  [feature]/
    FeatureComponent.tsx
    FeatureComponent.test.tsx
  ui/
    [component].tsx   # Reusable UI components

lib/
  utils.ts           # Utility functions
  hooks.ts           # Custom hooks
  types.ts           # Shared types
```

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Keep custom CSS minimal
- Use CSS variables for theme colors
- Ensure dark mode support for all components

### Naming Conventions

- **Files**: PascalCase for components (`Button.tsx`), camelCase for utilities (`utils.ts`)
- **Components**: PascalCase (`ProfileCard`)
- **Functions**: camelCase (`fetchUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Interfaces/Types**: PascalCase (`UserProfile`)

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
# Simple commit
git commit -m "feat: add repository search functionality"

# Detailed commit
git commit -m "feat(insights): add language distribution chart

- Added pie chart component for language stats
- Integrated with GitHub API data
- Added responsive design for mobile
- Updated documentation

Closes #123"
```

---

## Pull Request Process

### Before Submitting

1. ✅ Code follows the style guide
2. ✅ All tests pass
3. ✅ Build succeeds (`npm run build`)
4. ✅ No linting errors (`npm run lint`)
5. ✅ Documentation updated if needed
6. ✅ Commits follow conventional commits format

### Submitting a PR

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub

3. **Fill out the PR template** with:
   - Description of changes
   - Related issue number(s)
   - Screenshots (if UI changes)
   - Testing steps
   - Checklist completion

4. **Request review** from maintainers

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Related Issue
Fixes #(issue number)

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Screenshots
(if applicable)

## Testing
Describe how you tested your changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests pass
```

### Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged

---

## Reporting Bugs

### Before Reporting

- Check if the bug has already been reported
- Verify you're using the latest version
- Try to reproduce the bug

### Bug Report Template

```markdown
## Bug Description
Clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
(if applicable)

## Environment
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 118]
- Node Version: [e.g., 18.17.0]
- npm Version: [e.g., 9.8.1]

## Additional Context
Any other relevant information.
```

---

## Feature Requests

### Before Requesting

- Check if the feature has already been requested
- Consider if it aligns with the project's goals
- Think about implementation details

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature.

## Problem It Solves
What problem does this feature address?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other solutions you've thought about.

## Additional Context
Mockups, examples, or other relevant information.
```

---

## Development Tips

### Hot Reload Issues

If hot reload stops working:
```bash
# Kill the dev server and restart
# Clear Next.js cache
rm -rf .next
npm run dev
```

### TypeScript Errors

```bash
# Check for type errors
npm run type-check
```

### Debugging

Use the built-in Next.js debugger:
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    }
  ]
}
```

---

## Questions?

- Open a [GitHub Discussion](https://github.com/YOUR_USERNAME/dev:dash/discussions)
- Check existing [Issues](https://github.com/YOUR_USERNAME/dev:dash/issues)
- Review the [Documentation](./README.md)

---

## Recognition

Contributors will be recognized in the project README. Thank you for making DevDash better! 🎉

---

**Happy Contributing!** ❤️
