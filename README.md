# Agents Explained

A sweet educational site that explains how AI agents work, with a component-driven architecture and centralized theme/content registries.

## Highlights

- React + Vite + TypeScript frontend.
- Long-form guide with sticky sidebar navigation and mobile drawer menu.
- Single source of truth for theme tokens and reusable copy.
- GitLab Releases feed rendered in-page.

## Architecture

- `src/theme/tokens.ts`: raw design tokens (colors, type, spacing, radius, shadows, motion)
- `src/theme/semantic.ts`: semantic alias mapping
- `src/theme/global.css`: CSS variable usage and global styles
- `src/content/copy.ts`: shared text content
- `src/content/sections.ts`: sidebar and section metadata
- `src/components/*`: typed, variant-based reusable UI components
- `planning/ui-tweakability-plan.md`: implementation note + checklist

## Local development

```bash
npm install
npm run dev
```

## Guardrails

```bash
npm run lint:tokens
```

Fails if raw color literals appear in component files.

## Build

```bash
npm run build
```

## Deployment

- GitHub Pages workflow: `.github/workflows/deploy-pages.yml`
- GitLab Pages pipeline: `.gitlab-ci.yml`

Both deploy from tags (`v*` on GitHub, `$CI_COMMIT_TAG` on GitLab).
