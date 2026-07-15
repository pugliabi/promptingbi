# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static rebuild of **promptingbi.com** — Tommy Puglia's BI/AI blog. Recovered from Wayback Machine snapshots (July 15, 2026) after the original WordPress install was hacked. Astro + markdown, no database or server. See `README.md` for full deploy/DNS/domain-hygiene details.

## Commands

```powershell
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the built dist/ locally

# One-time: pull the 8 original images from the Wayback Machine into public/images/
powershell -ExecutionPolicy Bypass -File .\download-images.ps1
```

There are no tests, linter, or formatter configured.

## Architecture

Standard Astro static-site layout. Everything renders at build time to `dist/`.

- **Content is a git-tracked collection, not a CMS.** Posts live as markdown in `src/content/blog/`. The schema is defined in `src/content.config.ts` and is enforced at build — a post missing a required front-matter field fails the build.
- **`permalink` front-matter preserves the old WordPress URLs.** Each post declares its original path (e.g. `2024/07/17/slug`, no leading/trailing slash). `src/pages/[...permalink].astro` reads the collection and generates one page per post at exactly that path via `getStaticPaths`. This is the mechanism that keeps inbound links from the old site alive — do not route posts by filename or slug.
- **`src/layouts/Base.astro` is the whole design system.** It holds the entire page shell (header nav, footer contact block, meta/OG tags, RSS `<link>`, Google Fonts) and *all* global CSS in one `<style is:global>` block with CSS-variable theming (`--ink`, `--accent`, etc.). There is no separate stylesheet. Every page wraps its content in `<Base>`.
- **Pages** (`src/pages/`): `index.astro` (homepage post list, sorted newest-first), `[...permalink].astro` (post template), `about.astro`, `404.astro`, and `rss.xml.js` (feed built from the same collection). Index and RSS both re-sort by `date` descending — keep the two consistent if you change ordering.
- **Images** live in `public/images/YYYY/MM/...` mirroring the old WordPress upload paths, referenced in markdown as `/images/...`. They are populated by `download-images.ps1`, not committed as originals.

## Adding a post

Create `src/content/blog/<name>.md` with front matter matching `content.config.ts`:

```markdown
---
title: "My New Post"
date: 2026-07-20T09:00:00Z
permalink: "2026/07/20/my-new-post"   # required; no leading/trailing slash
description: "Teaser shown on homepage and in RSS."   # optional
featured: "/images/..."   # optional; used as OG image
---
```

Push to `main`; `.github/workflows/deploy.yml` builds with `withastro/action` and deploys to GitHub Pages automatically.

## Site config

`astro.config.mjs` sets `site: 'https://promptingbi.com'` (used for canonical URLs, OG images, sitemap, and RSS) and `trailingSlash: 'ignore'`. Note internal links append a trailing slash (`/${permalink}/`) while the generated route does not include one — this is intentional and works under `ignore`.
