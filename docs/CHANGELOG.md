# BW-Shell Changelog

## Unreleased

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
