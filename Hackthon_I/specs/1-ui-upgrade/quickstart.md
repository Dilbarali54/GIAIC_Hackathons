# Quickstart Guide: UI Upgrade for Docusaurus-based book_frontend

## Overview
This guide provides the essential steps to set up, develop, and deploy the upgraded UI for the Docusaurus-based book_frontend project.

## Prerequisites
- Node.js v18+ installed
- npm or yarn package manager
- Git for version control
- A modern web browser for testing

## Setup Instructions

### 1. Clone and Navigate to Project
```bash
git clone <repository-url>
cd book_frontend  # or your project directory name
```

### 2. Install Dependencies
```bash
npm install
# OR if using yarn
yarn install
```

### 3. Verify Current Setup
```bash
npm run start
# OR with yarn
yarn start
```
This should start the Docusaurus development server at http://localhost:3000

## Development Workflow

### 1. Start Development Server
```bash
npm run start
# OR
yarn start
```

### 2. Create Custom Styles
- Add custom CSS/SCSS files in `src/css/`
- Update theme configuration in `docusaurus.config.js`

### 3. Create Custom Components (if needed)
- Add React components in `src/components/`
- Override theme components by swizzling: `npm run swizzle @docusaurus/theme-classic [component-name]`

### 4. Test Responsive Design
- Use browser developer tools to test different screen sizes
- Test on actual devices when possible

### 5. Build and Test
```bash
npm run build
npm run serve  # Serves the built site locally
# OR
yarn build
yarn serve
```

## Key Configuration Files
- `docusaurus.config.js` - Main Docusaurus configuration including theme settings
- `src/css/custom.css` - Custom styles for the upgraded UI
- `src/theme/` - Custom theme components (if swizzled)
- `package.json` - Project dependencies and scripts

## Deployment
```bash
# Build the site
npm run build

# The built site will be in the build/ directory
# Deploy this directory to your hosting service (GitHub Pages, Vercel, etc.)
```

## Testing
- Verify all pages render correctly with new styles
- Test navigation on desktop and mobile
- Check accessibility with automated tools (e.g., axe-core)
- Validate responsive behavior across different screen sizes

## Troubleshooting
- If custom styles don't appear, ensure they're properly imported in `docusaurus.config.js`
- If swizzled components don't update, restart the development server
- For build errors, check that all paths in configuration files are correct