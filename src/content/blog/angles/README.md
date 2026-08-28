# Angles

One ore file per episode: `ep-{N}-angles.md`. Raw material for a post, never the post itself. This folder is **not** loaded by Astro — nothing here can appear on the site.

An ore file holds:

- **Source links** — episode number, YouTube URL, Notion page, and the local transcript path (`transcripts/ep-{N}.txt`)
- **Mined Tommy material** — the takes, analogies, and verified quotes the episode actually supports
- **Attribution landmines** — Mike-only lines, paraphrases that were never said, anything that must not be written as Tommy
- **Locked decisions** — title, thesis, scope, word count, images, artifacts, once Tommy has picked the angle
- **Leftover angles** — the other theses the transcript supports, kept for later episodes to collide with

When Tommy picks an angle, draft from the ore file plus `transcripts/ep-{N}.txt` into `drafts/` (`npm run new-post` scaffolds there). The ore file stays here afterwards — it is the record of what the episode contained and what was deliberately left on the table.

Freeform article ideas that aren't tied to one episode go in `backlog/`, not here.
