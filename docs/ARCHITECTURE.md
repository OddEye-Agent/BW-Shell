# BW-Shell Architecture (PR1 Baseline)

## Current State

BW-Shell is currently a **single-file static prototype** (`index.html`) containing:
- page markup
- all styling
- all rendering and interaction logic
- mock datasets for multiple portal sections

This supports rapid iteration but increases scale risk for collaboration, testing, and long-term maintainability.

## Refactor Objective

Migrate incrementally to a modular architecture **without breaking existing behavior**.

## Target Module Map

- `src/app.js`
  - Application bootstrap and section routing.
- `src/state/store.js`
  - Shared UI state (active page, active sub-tab, filters, transient UI state).
- `src/views/*`
  - Section-level rendering logic:
    - `accounts`
    - `compliance`
    - `admin-tools`
    - `placeholders`
- `src/components/*`
  - Reusable UI behavior and rendering helpers:
    - top nav
    - data table primitives
    - row action menu behavior
- `src/data/mock/*`
  - Mock datasets for local/static rendering.
- `src/data/adapters/*`
  - Stable data contract layer (`getAccounts`, etc.) to allow backend migration with minimal UI rewrites.
- `src/styles/*`
  - Token/base/layout/component CSS split.

## Migration Principles

1. **Non-breaking increments**: preserve user-visible behavior at each step.
2. **Parity-first extraction**: move code before redesigning it.
3. **Adapter seam early**: isolate data source to support future backend API.
4. **Small PRs**: minimize risk and simplify review.

## Planned Sequence

1. PR1: scaffold + architecture baseline (this change)
2. PR2: extract styles from inline `<style>` to `src/styles/*`
3. PR3: extract mock datasets to `src/data/mock/*`
4. PR4: extract section renderers to `src/views/*`
5. PR5: introduce centralized state store
6. PR6: formalize adapter seam and backend-ready contracts
7. PR7: add lint/format checks and smoke tests

## Backend Readiness Path (Thin Seam)

Planned interface contracts:
- `getAccounts()`
- `getComplianceArchive(filters)`
- `getAdminToolTabData(tab, filters)`

Default provider remains mock/static initially. Later, adapters can switch to HTTP endpoints with no view-level rewrites.
