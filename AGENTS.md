# Agent instructions — promptingbi.com

Astro 5 static blog → GitHub Pages (repo `pugliabi/promptingbi`, custom domain promptingbi.com). Push to `main` deploys; a daily cron build publishes future-dated posts.

## Commands

- `npm run dev` — local dev at localhost:4321
- `npm run build` — production build to `dist/` + Pagefind search index (always run before claiming work is done)
- `npm run new-post "Title"` — scaffold a new post (created as `draft: true`)

## Content model

Posts: `src/content/blog/*.md`. Schema (`src/content.config.ts`): `title`, `date` (ISO, Z), `permalink` ("YYYY/MM/DD/slug" — must match date; never change on existing posts), `description` (<160 chars), `featured` (optional image path), `draft` (default false). Filtering lives in `src/lib/posts.ts` (`publishedPosts()`): drafts and future-dated posts are excluded everywhere (homepage, RSS, page generation).

Images: `public/images/YYYY/MM/`, referenced as `/images/YYYY/MM/name.png`.

## Layout / pages

- `src/layouts/Base.astro` — header, nav, footer, all global CSS (DM Serif Display + Source Sans 3, minimal white theme)
- `src/pages/index.astro` — post list; `[...permalink].astro` — post pages; `about.astro`; `search.astro` (Pagefind UI, only works on built site); `rss.xml.js`
- `src/components/Comments.astro` — giscus, disabled until repo IDs are filled in (instructions inside the file)

## Guardrails

- Never modify `public/CNAME`, `astro.config.mjs` site URL, or deploy workflow triggers without explicit request
- Never change existing permalinks
- Voice: first-person Tommy Puglia, practical BI/AI content, "Takeaways" list at the end of posts

## Cursor Cloud specific instructions

- No lint or test tooling is configured. "Build" (`npm run build`) is the only automated check; run it before claiming work is done.
- The committed `package-lock.json` is out of sync with `package.json` (missing the `@pagefind/*` platform binaries), so `npm ci` fails. Use `npm install` to set up dependencies. The startup update script already runs `npm install`.
- Dev server: `npm run dev` serves on `http://localhost:4321`. Post edits and `draft`/`date` changes hot-reload; `src/content/blog/*.md` renders at its `permalink` path.
- `search.astro` (Pagefind) only returns results against a built site (`npm run build` + `npm run preview`), not under `npm run dev`.
