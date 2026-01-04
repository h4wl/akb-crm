# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Context

- **Stack**: Vite + React + TypeScript, TanStack Router (file-based routing), Drizzle ORM, Base UI components, and Vite build tooling.
- Avoid introducing new major dependencies unless requested.
- Keep changes minimal and scoped; preserve existing patterns and conventions.

## Common Commands

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Production build
npm run preview      # Preview production build

# Linting & Formatting
npm run lint         # Run ESLint
npx prettier --write . # Format code with Prettier
```

## Style and Formatting

- Follow existing TypeScript/React patterns; prefer function components and hooks.
- Favor explicit types at module boundaries; keep internal inference when clear.
- Use Prettier defaults; no custom formatting. Use ASCII unless the file already uses otherwise.
- Keep comments concise and only where they add clarity for non-obvious code.

## React Specifics

- Keep components small and focused; lift shared logic to utilities when reused.
- Prefer controlled inputs and explicit state; avoid unnecessary re-renders.
- Handle loading/error/empty states for UI that hits async data.

## TanStack Router

- This project uses **file-based routing** with the TanStack Router Vite plugin.
- Routes are defined in `src/routes/` - the file structure determines the route hierarchy.
- Use `createFileRoute` for route definitions.
- Route configuration is auto-generated in `routeTree.gen.ts` - this file is committed to git.
- Leverage TypeScript inference for type-safe navigation with `<Link>` and `useNavigate`.
- Search params are first-class citizens - use them for shareable/bookmarkable state.

For detailed TanStack Router documentation, see:
- `.github/instructions/tanstack-react-router_setup-and-architecture.instructions.md` - Setup, architecture, and design decisions
- `.github/instructions/tanstack-react-router_routing.instructions.md` - Routing concepts and patterns
- `.github/instructions/tanstack-react-router_guide.instructions.md` - Comprehensive usage guide
- `.github/instructions/tanstack-react-router_api.instructions.md` - API reference
- `.github/instructions/tanstack-react-router_installation.instructions.md` - Installation and configuration

## Base UI Components

- Base UI (`@base-ui/react`) provides unstyled, accessible components.
- Components are composable and styling-agnostic - apply styles via CSS/Tailwind.
- Key components: Accordion, Dialog, Menu, Popover, Select, Tabs, Toast, Tooltip, Form fields (Input, Checkbox, Radio, Switch, etc.).

For detailed Base UI documentation, see `.github/instructions/base-ui.instructions.md`.

## UI Prototypes

HTML prototypes for the CRM interface are located in `.prototypes/`:
- `crmudgeon-desktop-tailwind.html` - Desktop layout prototype with Tailwind CSS
- `crmudgeon-mobile-tailwind.html` - Mobile layout prototype with Tailwind CSS
- `crmudgeon-schedule-edit.html` - Schedule editing interface prototype

Reference these prototypes when implementing UI components to match the intended design and layout.

## Data and API

- Keep Drizzle schema changes backwards compatible when possible.
- Validate inputs on the server and client; avoid trusting route params blindly.

## Testing and Safety

- Add or update tests when behavior changes; avoid breaking existing tests.
- Be cautious with migrations or schema changes; call them out clearly.

## Review Mindset

- When asked for a review, lead with findings (bugs, risks, regressions, missing tests) before summaries.
- Provide next steps or verification guidance after code changes.
