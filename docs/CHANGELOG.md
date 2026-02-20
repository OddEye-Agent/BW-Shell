# BW-Shell Changelog

## Unreleased

- Cleanup run: removed legacy pre-React scaffolding (old views/styles/adapters/state files) and Jekyll leftovers after React/Vite migration.
- Expanded Admin Tools React migration to include Wix Websites, Wix Roles, Wix Folders, and Calculators tabs.
- Migrated Admin Tools BAS tabs to React (BAS Roles, BAS Users, BAS Accounts) with functional search and status chips.
- Migrated Compliance section to React (tab shell + functional Archive filtering table with status chips).
- Pivoted frontend to React + Tailwind (Vite) while preserving GitHub Pages compatibility via static `dist` deploy.
- Rebuilt app shell/nav and Accounts page as first migration slice with existing visual palette.
- Introduced centralized global state store at `src/state/store.js` and wired runtime access in `index.html`.
- Migrated top-level active page and user-menu open state updates to store-backed flow.
- Extracted `renderAccountsView` and `renderPlaceholderView` from `index.html` into dedicated view modules.
- Added view script includes to preserve global runtime behavior without introducing a build step.
- Extracted large mock datasets/constants from `index.html` into `src/data/mock/portal-data.js` for maintainability.
- Added data-script include to load mock data before app runtime logic.
- Extracted inline CSS from `index.html` into `src/styles/components.css` with visual parity.
- Linked `src/styles/*` stylesheets from `index.html` to establish modular style pipeline.
- Established modular architecture scaffolding (`src/*`) while preserving current runtime behavior.
- Added architecture and UX decision documentation foundations.
