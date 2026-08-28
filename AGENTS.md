# Agent instructions — promptingbi.com

Astro 5 static blog → GitHub Pages (repo `pugliabi/promptingbi`, custom domain promptingbi.com). Push to `main` deploys; a daily cron build publishes future-dated posts.

## Commands

- `npm run dev` — local dev at localhost:4321
- `npm run build` — runs `scan-prompts --quiet`, then the production build to `dist/` + Pagefind search index (always run before claiming work is done)
- `npm run new-post "Title"` — scaffold a new post (created as `draft: true`)
- `npm run new-prompt "Title" [category-id]` — scaffold a `/prompts/` artifact (created as `draft: true`)
- `npm run scan-prompts` — report published posts whose code blocks aren't in the library yet; `-- --write` scaffolds drafts, `-- --all` also lists blocks it judged incidental

## Content model

Posts live in stage folders under `src/content/blog/`:
- `angles/` — per-episode ore files, `ep-{N}-angles.md`; **not** in the Astro collection (never on site)
- `backlog/` — freeform ideas/outlines not tied to one episode; **not** in the Astro collection (never on site)
- `drafts/` — WIP; collection-loaded, keep `draft: true` (filtered out of site)
- `published/YYYY-MM/` — live / scheduled; `draft: false`. Month folder is from the post date (e.g. `published/2026-08/`). Filename stays `YYYY-MM-DD-slug.md`.

Transcripts live outside the collection entirely, at `transcripts/ep-{N}.txt` in the repo root.

Loader only picks `{published,drafts}/**/*.md`, so `angles/` and `backlog/` are invisible to the build. Schema (`src/content.config.ts`): `title`, `date` (ISO, Z), `permalink` ("YYYY/MM/DD/slug" — must match date; never change on existing posts), `description` (<160 chars), `featured` (optional image path), `draft` (default false). Filtering lives in `src/lib/posts.ts` (`publishedPosts()`): drafts and future-dated posts are excluded everywhere (homepage, RSS, page generation). Promote: move file into `published/YYYY-MM/` + flip `draft`. Images stay in `public/images/YYYY/MM/`.

Images: `public/images/YYYY/MM/`, referenced as `/images/YYYY/MM/name.png`.

Transcripts (local cache, never on site): `transcripts/ep-{N}.txt`. Fetching a transcript writes there. Creating or editing a post reads from there first; Notion/YouTube only on a miss or refresh. Set `source.transcript` on the post.

## Prompts library (`prompts` collection)

The `/prompts/` section holds the **full** copy-paste artifacts (instruction pages, agent briefs, validation cells). Posts show a teaching slice; the library page holds the complete thing, so some duplication between a post and its artifact is expected and fine.

Flat folder, no staging: `src/content/prompts/<slug>.md`, URL `/prompts/<slug>/`. `draft: true` is the only gate. Schema (`src/content.config.ts`): `title`, `description` (index one-liner), `category` (one of the ids in `src/lib/prompt-categories.mjs`), `date`, `updated` (optional), `format` (badge text: markdown / dax / python), `source.permalink` (must match an existing post's permalink), `draft`.

- Categories live in `src/lib/prompt-categories.mjs` — array order = section order on `/prompts/`, and each id is that section's anchor, so **ids are permanent**. The zod enum reads from the same file.
- Helpers in `src/lib/prompts.ts`: `publishedPrompts()`, `groupByCategory()`, `promptsForPost()`, `sourceLink()`.
- Linking is two-way and automatic: the artifact page renders a "From the post" callout, and `[...permalink].astro` renders a "Prompts and code from this post" box for any artifact whose `source.permalink` matches. Never hand-maintain those links.
- A bad `source.permalink` logs `[prompts] <id>: ... matches no published post` at build and renders unlinked. Watch for it.
- Don't link from a published artifact to a draft one — it builds a dead link.

## Layout / pages

- `src/layouts/Base.astro` — header, nav, footer, all global CSS (DM Serif Display + Source Sans 3, minimal white theme)
- `src/pages/index.astro` — post list; `[...permalink].astro` — post pages; `prompts/index.astro` + `prompts/[...slug].astro` — prompts library; `about.astro`; `search.astro` (Pagefind UI, only works on built site); `rss.xml.js`
- `src/components/Comments.astro` — giscus, disabled until repo IDs are filled in (instructions inside the file)
- `src/components/CodeCopy.astro` — injects a Copy button on every `pre:not(.mermaid)`; included once in `Base.astro`, styles live in the global block (`.code-wrap` / `.copy-btn`)

## Guardrails

- Never modify `public/CNAME`, `astro.config.mjs` site URL, or deploy workflow triggers without explicit request
- Never change existing permalinks
- Voice: first-person Tommy Puglia, practical BI/AI content, "Takeaways" list at the end of posts
