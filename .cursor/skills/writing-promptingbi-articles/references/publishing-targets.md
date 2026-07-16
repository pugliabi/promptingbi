# Publishing Targets

Two destinations, always in this order: Notion first (working copy Tommy reviews), repo second (what actually deploys).

## Target 1 — Notion: ✍️ Prompting BI Articles

- Data source: `collection://5706cb84-26cc-4c1a-82f3-022b0909cd91`
- Database: `9767b9dd-e40e-442b-bbb8-537e66dfa127`
- Episode relation points at the EMP episodes data source: `collection://3bb02401-3320-4eb7-92fe-d5197943f569` (episode pages have EpNum, Date, Status, Description, and the GPT/Google/Claude agenda columns)

Fetch the data source before writing to confirm current schema and select options; don't assume this file is newer than reality. Known property map:

| Property | Type | How to fill |
|---|---|---|
| Title | title | Article title |
| Status | select | `"Drafting"` for new articles; early-stage option (e.g. `"Idea"`) for filed leftover angles — prefer existing options over inventing new ones |
| Episode | relation | EMP episode page URL/ID when the source was an episode; omit for YouTube-only or original posts |
| Topics | multi-select | 5–8 tags. The select is CLOSED: values must come from the existing option set (currently: Power BI, Microsoft Fabric, Data Governance, Prompting, Agentic AI, Semantic Models, Data Culture, Adoption). Map synonyms onto these (AI Agents → Agentic AI); never invent new options in a create call |
| Meta Description | text | The one-line meta description |
| Banner Concept | text | One-sentence version of the banner idea (full prompts live in the Image Ideas toggle) |
| Published URL | url | Empty at draft; `https://promptingbi.com/<permalink>/` once live |
| Publish Date | date | Empty at draft; set when live (`date:Publish Date:start`) |

Page content follows the pattern in `article-structure.md` (body + Image Ideas toggle + SEO Notes toggle). Icon: ✍️ to match existing entries.

## Target 2 — Astro repo: prompting-bi (promptingbi.com)

- Local path: `C:\Github\prompting-bi` (Claude Desktop / Windows) or `/mnt/c/Github/prompting-bi` (WSL). It's a static Astro site rebuilt after the old WordPress install was hacked; pushing `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
- **Before writing, read the repo's `CLAUDE.md` and `src/content.config.ts`.** Front matter is schema-enforced at build; a missing required field fails the deploy.

Post file: `src/content/blog/<YYYY-MM-DD>-<kebab-slug>.md` — the date prefix is the post's front-matter date (today for new posts) and the rest is the kebab slug. Example: `2026-07-20-post-slug.md`. Every post in the folder follows this pattern.

```markdown
---
title: "Post Title"
date: 2026-07-20T09:00:00Z          # ISO 8601 with time, UTC
permalink: "2026/07/20/post-slug"    # REQUIRED; no leading/trailing slash
draft: true                          # ALWAYS on new posts; flip to false at publish
description: "Teaser for homepage + RSS."   # optional but always provide it
featured: "/images/2026/07/banner.png"      # optional; set once a banner exists
---

Article body in plain markdown...
```

The schema also defines `draft` (boolean, default `false`; `true` = never built or listed). Write every new post with `draft: true` so an unrelated push to `main` can never publish an unreviewed article; flipping it to `false` happens at the publish step, when Tommy approves.

Why `permalink` matters: it is the routing mechanism (`src/pages/[...permalink].astro`) and it preserves the URL structure from the WordPress era so old inbound links keep working. Never route by filename; never omit it. Use today's date for new posts unless Tommy says otherwise, and keep one slug everywhere: the SEO Notes slug, the permalink's final segment, and the filename after its `YYYY-MM-DD-` prefix must all match. Renaming a file never changes a URL (only `permalink` does), but keep them aligned anyway.

Use ONLY the schema fields shown above. Do not invent frontmatter keys (no `tags`, no `author`, no `category`): the schema in `src/content.config.ts` is enforced at build and unknown or missing fields break the deploy. Tags, keywords, and banner prompts live on the Notion page, not in frontmatter. This repo write happens on EVERY article run; it is not optional.

Images: files go in `public/images/YYYY/MM/`, referenced as `/images/YYYY/MM/name.png` in `featured` or the body. Banners start as prompts; when Tommy generates one, that's where it lands.

Preview and ship: `npm run dev` → http://localhost:4321. **Never commit or push without Tommy's explicit go** — a push to `main` is a production deploy. Writing the file is fine; shipping is his call. The repo also has `npm run new-post` (scripts/new-post.mjs) if scaffolding interactively; it already emits `YYYY-MM-DD-slug.md` filenames, and writing the file directly with correct front matter and the same filename pattern is equally valid.

## When a destination is unreachable

Deliver to whichever target you can reach, produce the other artifact as pasteable/downloadable output, and state clearly which half still needs doing. A finished article stuck in chat is a failure; a finished article delivered to one target with the other prepped is a good outcome.
