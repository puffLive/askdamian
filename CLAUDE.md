# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with hot reload
- `npm run dev:host` - Start dev server accessible on network
- `npm start` - Preview production build locally

### Build
- `npm run build` - Create production build for deployment
- `npm run re:build` - Clean install dependencies and build

### Code Quality
- `npm run lint` - Run ESLint on src directory
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run prettier` - Format code with Prettier

**Note**: No test commands are configured. This project does not have a testing framework set up.

## Architecture

This is a React-based marketing website for Legacy Wealth Advisory, built using the "Zone Kit" commercial template. The codebase follows a section-based architecture optimized for marketing/landing pages.

### Key Technologies
- **React 18** with React Router DOM for single-page application routing
- **Vite** as the build tool with path alias `src` → `/src`
- **Material-UI (MUI) v5** with Emotion for component styling and theming
- **Framer Motion** for animations
- **React Hook Form** for form handling
- **Vercel** deployment configuration

### Directory Structure
```
src/
├── sections/        # Page-specific content sections
│   ├── _home/      # Homepage sections (hero, services, testimonials, etc.)
│   └── _marketing/ # Marketing page sections
├── pages/          # Route components that compose sections
├── components/     # Reusable UI components (carousel, logo, settings, etc.)
├── layouts/        # Page layout templates (main, auth, etc.)
├── theme/          # MUI theme configuration and overrides
├── routes/         # Route definitions and lazy loading
└── assets/         # Static data and illustrations
```

### Important Patterns

1. **Section-Based Pages**: Pages are composed of section components. For example, the homepage (`pages/home.jsx`) imports sections from `sections/_home/`.

2. **Theme System**: The app uses MUI's theme system with custom configurations in `theme/`. Theme settings are persisted and manageable through the settings drawer.

3. **Lazy Route Loading**: Routes use React.lazy() for code splitting. See `routes/sections/index.js` for the pattern.

4. **Mock Data**: Development data is stored in `_mock/` directory, useful for prototyping without backend integration.

5. **Path Aliases**: Use `src/` prefix for imports (e.g., `import Logo from 'src/components/logo'`).

### Deployment

The site is configured for Vercel deployment with SPA routing (see `vercel.json`). All routes are rewritten to the root for client-side routing.

### Environment Variables

The codebase references `VITE_MAP_API` for Google Maps integration. Create a `.env` file with:
```
VITE_MAP_API=your_google_maps_api_key
```

### Common Modifications

- **Update company info**: Edit `src/components/logo/logo.jsx` and related branding
- **Modify homepage**: Edit sections in `src/sections/_home/`
- **Add new pages**: Create in `src/pages/`, add route in `src/routes/sections/`
- **Theme customization**: Modify `src/theme/` files
- **Partner logos**: Located in `public/assets/partnerLogos/`