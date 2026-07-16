---
name: writing-promptingbi-articles
description: "Turn a podcast transcript into a standalone, publish-ready PromptingBI blog article in Tommy Puglia's voice, delivered to BOTH the ✍️ Prompting BI Articles database in Notion AND the prompting-bi Astro repo (promptingbi.com). Sources: an Explicit Measures / EMP episode page or its Notion meeting-note transcript, a YouTube URL (bundled yt-dlp script pulls and cleans the captions), or a pasted transcript file. Use whenever Tommy wants to blog an episode, convert a transcript or recording into an article, draft a PromptingBI post, grab a YouTube transcript, or says things like 'blog this episode', 'turn ep 504 into an article', 'write this up for Prompting BI', 'get the transcript from this YouTube link', 'add this to the articles database'. Also use to file leftover episode topics as Idea entries in the articles database."
---

# Writing PromptingBI Articles

Convert what Tommy said on a recording into an original article on promptingbi.com. One rule governs everything: **the reader must never be able to tell this came from a podcast.** No "in this episode", no "we discussed", no mailbag framing, no host names. The transcript is raw ore; the article is Tommy sitting down today to write about the idea. He is a Microsoft MVP writing for Power BI / Fabric / data governance / AI-agentic practitioners, so the post teaches and takes positions; it does not recap.

Every article ships to BOTH places, every run, in this order:
1. A page in the **✍️ Prompting BI Articles** Notion database (working copy, Episode relation, SEO + image toggles).
2. A markdown post written into the **prompting-bi** Astro repo at `C:\Github\prompting-bi\src\content\blog\` in the repo's schema-enforced format, ready to commit. This is not an optional handoff and never something to merely offer; writing this file is part of every article run. If the repo is unreachable from the current environment, produce the exact finished `.md` as a download so Tommy can drop it in unchanged. promptingbi.com deploys from `main`.

Read `references/voice-and-style.md` and `references/article-structure.md` before drafting a single sentence, and `references/publishing-targets.md` before writing to Notion or the repo. They are short and they are the spec.

## Step 1 — Get the transcript

Three routes. Pick whichever matches what Tommy gave you; ask only if none apply.

**A. EMP episode (Notion).** Find the episode page in the EMP data source (`collection://3bb02401-3320-4eb7-92fe-d5197943f569`) by name or EpNum. The transcript is usually a Notion AI meeting note on or linked from the episode page: fetch it with `include_transcript: true`. The episode page also carries the agent agenda columns (GPT / Google / Claude) and the Description — useful for framing, but the transcript is the source of truth for what Tommy actually argued.

**B. YouTube URL.** Run `scripts/fetch_youtube_transcript.py <url>`. It pulls the manual or auto captions with yt-dlp, cleans the rolling-caption duplication, and writes a readable transcript file (no video download). Requires `pip install yt-dlp`. Episodes stream at youtube.com/powerbitips, so any published episode is reachable this way even before a Notion transcript exists.

**C. Pasted or uploaded transcript.** Use as-is.

YouTube auto-captions carry no speaker labels; Notion meeting notes usually do. Note which situation you are in — it changes how you do Step 2.

## Step 2 — Mine Tommy's points

Extract the ideas, arguments, opinions, examples, and analogies **Tommy** raised. With speaker labels, this is mechanical. Without them, infer from context: Tommy is the consultant/MVP voice talking governance, semantic models, prompting, agentic workflows, client stories; when attribution is genuinely uncertain, treat the idea as shared material and only build on it if it fits his known positions — never put a co-host's hot take in his mouth. Skip mailbag questions, news/product-update segments, and co-host tangents unless one directly sharpens a point of his.

## Step 3 — Map the angles, then Tommy picks ONE

Don't pick for him. Lay out the distinct angles the transcript supports — usually 3 to 6 — each as a one-line thesis with a title direction, the transcript material that powers it, and how fresh it is against articles already in the database (check for existing rows tied to the same episode first; the meeting-note automation may have already claimed the top angle). Recommend one, but the choice is his. Once he picks, the whole post is built around that single angle. Leftover angles become new rows in the articles database with an early-stage Status ("Idea" if the option exists) and a one-paragraph note — the backlog builds itself.

If Tommy grants batch autonomy ("don't ask, take the best topic"), pick the strongest fresh angle yourself, still checking the database for angle collisions first, and still filing the leftovers as Ideas.

If Tommy grants batch autonomy ("don't ask, take the best topic"), pick the strongest fresh angle yourself, still checking the database for angle collisions first, and still filing the leftovers as Ideas.

## Step 4 — Walk the areas (this is what makes it his)

Before drafting, go through the planned areas with Tommy, one quick pass: for each area, ask for his take in a sentence — a client story, a contrarian position, the analogy he'd reach for, what people get wrong. Keep it fast and conversational; one message with the areas listed is enough, and "just draft it" is always an acceptable answer. Anything he gives you here outranks the transcript. This pass is the difference between an AI summary of a show and Tommy's article, so don't skip offering it — unless he has explicitly waived it for a batch run.

## Step 5 — Draft

Write 1,200–1,800 words following `references/voice-and-style.md` (how it sounds) and `references/article-structure.md` (how it's shaped). Hard rules worth repeating because they get violated: first person, no em dashes anywhere, no episode references, no invented facts/features/stats not supported by the transcript or by Tommy in Step 4, end with the meta description and 5–8 topic tags.

## Step 6 — Banner and image prompts

Produce 2–3 **ready-to-run image-generation prompts**: one banner concept plus supporting diagram ideas, each with alt text. Write them as complete standalone prompts (subject, setting, style, composition) that Tommy can paste straight into Grok Imagine or any generator. Nothing gets generated here; prompts only.

## Step 7 — Deliver to Notion

Create the page in the ✍️ Prompting BI Articles data source using the property map and page-content pattern in `references/publishing-targets.md` (article body, then collapsible Image Ideas and SEO Notes toggles, matching existing entries). Fill the Episode relation when the source was an EMP episode. Status starts at "Drafting".

## Step 8 — Deliver to the repo

The repo is `prompting-bi` (locally `C:\Github\prompting-bi`, or `/mnt/c/Github/prompting-bi` under WSL). Before writing anything, read the repo's `CLAUDE.md` and `src/content.config.ts` — the front-matter schema is enforced at build time and a bad post fails the deploy. Write the post per the contract in `references/publishing-targets.md`, including the required `permalink` in `YYYY/MM/DD/slug` form (this preserves URL structure from the WordPress era; never route by filename).

**Filename rule (always):** name the file `src/content/blog/YYYY-MM-DD-<slug>.md`, where `YYYY-MM-DD` is the post's `date` and `<slug>` is the kebab-case title slug (the same slug used in the `permalink`). Example: date `2026-07-20` + slug `my-post` -> `2026-07-20-my-post.md`. The filename does not affect the URL (routing is by `permalink`), but the date prefix keeps `src/content/blog/` chronological and unambiguous. The repo's `npm run new-post "Title"` produces exactly this name automatically.

**Never commit or push without Tommy's explicit go.** Pushing `main` deploys the live site via GitHub Actions. Offer: preview with `npm run dev`, then he says push, or he pushes himself. If the repo isn't reachable from the current environment, produce the finished `.md` file (correct name, correct front matter) as a download and say exactly where to drop it.

## Step 9 — Close the loop

When Tommy approves a post: flip `draft: true` to `false` in the repo frontmatter (every post is written as a draft so a stray push can't leak it), then he commits and pushes. Once live: set Published URL (`https://promptingbi.com/<permalink>/`), Publish Date, and Status on the Notion page. If he generated a banner, remind him it goes in `public/images/YYYY/MM/` and gets referenced via the `featured` front-matter field.

## Environment fallbacks

- **No Notion MCP** (e.g., Claude Code without the connector): still draft and write the repo post; output the would-be Notion page as markdown for manual paste, and say which properties to set.
- **No repo access** (claude.ai container): still create the Notion page; deliver the Astro `.md` as a downloadable file.
- **No yt-dlp / offline**: ask for a pasted transcript or the Notion meeting note instead.
- Never block the whole workflow because one destination is unreachable; deliver what you can and name what's missing.
