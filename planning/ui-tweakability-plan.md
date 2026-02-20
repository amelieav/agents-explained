# UI Tweakability + Single Source of Truth

## Objective

Keep global theme and copy centralized while making individual UI components easy to tweak in isolation.

## Architecture commitments

- `src/theme/tokens.ts` contains raw design tokens.
- `src/theme/semantic.ts` maps semantic aliases to raw tokens.
- `src/theme/global.css` contains CSS variable usage and layout primitives.
- `src/content/copy.ts` contains reusable copy/content.
- `src/content/sections.ts` contains section order + navigation metadata.
- Components are prop-driven and do not embed long-form page copy.
- `/lab` route previews components in isolation.

## Checklist

- [x] Create token + semantic theme registry.
- [x] Apply tokens via shared CSS variables.
- [x] Centralize copy and navigation data.
- [x] Implement reusable typed components with `variant` + `className`.
- [x] Implement `Component Lab` route (`/lab`).
- [x] Add color-literal guardrail script for components.
- [ ] Add full test automation once Node tooling is available locally.

## Guardrail

`npm run lint:tokens` fails if raw color literals appear inside `src/components` files.
