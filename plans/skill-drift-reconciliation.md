# Skill drift reconciliation: `writing-promptingbi-articles`

Two copies of the skill have diverged. This report adjudicates the differences file by file so Tommy can rule on each one. **Nothing has been reconciled. Neither copy has been edited.** Applying the ruling is a separate job.

| | |
|---|---|
| Report date | 2026-08-28 |
| Repo copy | `.cursor/skills/writing-promptingbi-articles/` (git-tracked, clean at HEAD `392bf06`) |
| Global copy | `C:\Users\pugli\.claude\skills\writing-promptingbi-articles\` (not version-controlled) |
| Method | SHA-256 per file, then full read of both sides of every differing file, then line-level `Compare-Object` to catch anything the read missed |
| Verdict counts | 10 editorial divergences, 3 mechanical divergences, 1 repo defect, 3 shared gaps |

---

## 1. Summary table

| File | Hash differs | Editorial | Mechanical | One-line recommendation |
|---|---|---|---|---|
| `SKILL.md` | **yes** | 5 | 1 | Port global's three missing blocks into repo, keep repo's `source` contract, fix the duplicate paragraph, decide the transcript-path question. |
| `references/voice-and-style.md` | **yes** | 1 | 0 | Take global wholesale. Repo has lost five hard-won rules and gained nothing. |
| `references/publishing-targets.md` | **yes** | 4 | 1 | Take repo wholesale. Global actively forbids a field the live schema requires. |
| `references/image-style.md` | **yes** | 0 | 1 | No content difference at all. Line endings only (repo CRLF, global LF). |
| `references/article-structure.md` | no | 0 | 0 | Identical. Nothing to do. |
| `scripts/fetch_youtube_transcript.py` | no | 0 | 0 | Identical. Nothing to do. |

### 1.1 Verified hashes (SHA-256, first 16 hex)

| File | Repo | Global | Bytes (repo / global) | Lines (repo / global) |
|---|---|---|---|---|
| `SKILL.md` | `6AF5CA1D615A3C34` | `24341035D4405C58` | 13,644 / 14,641 | 101 / 103 |
| `references/voice-and-style.md` | `B16124F6600E6656` | `BFA528DF6DE75725` | 4,523 / 6,174 | 44 / 48 |
| `references/image-style.md` | `57CCB7A39A85F6BD` | `252406768AD18DFD` | 6,414 / 6,347 | 67 / 67 |
| `references/publishing-targets.md` | `067B029A9A2D99CA` | `68ED08F62E3E65D9` | 6,236 / 5,630 | 67 / 60 |
| `references/article-structure.md` | `F3ACEA4C0281EEF8` | `F3ACEA4C0281EEF8` | 3,113 / 3,113 | 42 / 42 |
| `scripts/fetch_youtube_transcript.py` | `D98B9647704BC418` | `D98B9647704BC418` | 8,978 / 8,978 | 235 / 235 |

Four of six differ, confirming the prior finding. The prior pass's byte sizes were indeed stale: both `SKILL.md` copies and both `publishing-targets.md` copies were written today (repo 10:20, global 10:32).

### 1.2 Corrections to the prior investigation

Three claims from the prior pass did not survive verification. They matter because they change how much of Tommy's attention this needs.

| Prior claim | Reality |
|---|---|
| Path/restructure changes were applied to global only, producing mechanical divergences in Step 1, Step 3, Step 8, and `publishing-targets.md` | **False.** Every one of those lines is now byte-identical in both copies. The restructure edit landed in both. There are **zero** restructure-related content divergences left. |
| The duplicated paragraph was "introduced by the recent restructure edit" | **False.** It is present in every commit that touches the file going back to `8588ec8` (2026-07-16), the file's earliest history. It is a long-standing defect, not a fresh regression. |
| `publishing-targets.md` divergence is only about the richer `source` contract and a `tags` example | **Incomplete.** The global copy does not merely omit `tags`; it contains an explicit prohibition on it that contradicts the live schema. That is a bug, not an omission. |

---

## 2. Highest-priority gap

**The Notion `<summary>` misattribution warning, present in global `SKILL.md` line 28, absent from the repo copy.**

This is the single most consequential gap in the set. It is a correctness guardrail against a failure mode that has already fired in this project, and it was independently reconfirmed today when a Notion note's `<summary>` turned out to be a finished first-person article. Its absence from the version-controlled copy means the guardrail is currently one uncommitted, unbacked-up directory away from being lost permanently.

Global-only, quoted in full:

> **Critical:** a Notion meeting note usually contains BOTH a `<transcript>` and an AI-written `<summary>`, and that summary is composed in Tommy's first-person voice. It reads exactly like him and it is not him. Polished lines that appear only in the summary were written by an automation, not spoken on the recording. Mine the transcript for what Tommy actually argued; treat summary-only phrasing as a theme you may develop, never as a quote or as evidence of what he said.

The repo copy has nothing equivalent. It carries only the weaker, easily-missed clause at the end of Step 1A, which both copies share: `After fetching, save the meeting-note transcript (not the AI summary) to transcripts/ep-{N}.txt.` That tells an agent which file to save. It does not tell the agent that the summary will read exactly like Tommy and must never be quoted, which is the part that actually prevents the error.

**Recommendation: port to repo verbatim. No judgement call needed.** This is the first thing to do and it should not wait on any other decision in this report.

---

## 3. `SKILL.md`

Five editorial divergences, one mechanical, one defect. The defect is in section 7 below.

### 3.1 Notion `<summary>` trap warning — editorial, global ahead

Covered in section 2. Global-only block at line 28. **Recommendation: port to repo.**

### 3.2 "Mine adjacent episodes too" — editorial, global ahead

Global `SKILL.md` line 40, inside Step 2. Global-only, quoted in full:

> **Mine adjacent episodes too, not just the source one.** Once the angle is set, query the EMP data source for earlier episodes on the same theme and pull their transcripts for supplementary Tommy material: a better analogy, a sharper one-liner, a client story, the same argument he made more clearly six weeks earlier. Dispatch a subagent per transcript (they are 50-80 KB each) and ask it to return only angle-relevant material with per-item attribution — confidently Tommy, confidently co-host, or uncertain. This is what separates an article from a single-episode recap, and Tommy asks for it by name.

The repo copy ends Step 2 at the co-host attribution paragraph and never mentions cross-episode mining.

**Which side is richer:** global, unambiguously. This paragraph encodes three separate operational facts the repo copy lacks: that adjacent episodes should be mined at all, the subagent-per-transcript dispatch pattern with the size rationale, and the three-way attribution taxonomy the subagent should return.

**Recommendation: port to repo.** Low risk. It adds a capability rather than changing an existing instruction, and the closing clause ("Tommy asks for it by name") suggests it was written from observed practice.

### 3.3 Step 5 code-heavy word-count carve-out — editorial, global ahead

Both copies open Step 5 with `Write 1,200–1,800 words following references/voice-and-style.md (how it sounds) and references/article-structure.md (how it's shaped).` Global then inserts, before `Hard rules worth repeating`:

> **Code-heavy articles run longer, and that is what Tommy wants:** when a post walks a worked example with several real code blocks, 2,500–3,000+ words is correct, and cutting code to hit a word target is the wrong trade every time. The word range governs prose padding, not worked examples.

Repo has nothing between the word range and the hard rules.

**Which side is richer:** global. The repo copy states a word range with no carve-out, which reads as a hard ceiling. An agent following it literally would trim code blocks out of a worked-example article to hit 1,800 words, and the global text says in as many words that this is "the wrong trade every time."

**Recommendation: port to repo.** This one interacts directly with the `voice-and-style.md` gap in section 4: the five missing rules push articles toward more real code, and this carve-out is what stops the word limit from cancelling them out. Porting one without the other leaves an internal conflict.

### 3.4 Step 8 `source` front-matter contract — editorial, repo ahead

The only place the repo copy is ahead in `SKILL.md`.

Repo line 88:

> **Source metadata (when from an EMP episode):** set frontmatter `source.episode` (EpNum), `source.title` (episode Name), `source.notion` (EMP page URL), and `source.transcript` (`transcripts/ep-{N}.txt`). Later edits read that file first; Notion/YouTube only on a miss or refresh. Omit `source` for original / non-episode posts. This is editor-only and must never appear in the published article body.

Global line 90:

> **Source metadata (when from an EMP episode):** set `source.episode`, `source.title`, `source.notion`, and `source.transcript: "transcripts/ep-{N}.txt"`. Later edits read that file first.

**Which side is richer:** repo, on four counts. It names what each field takes (EpNum, episode Name, EMP page URL) rather than just listing keys; it states the refresh policy; it says to omit `source` entirely for non-episode posts; and it carries the editor-only warning that the block must never reach the published body. The last two are the load-bearing ones. `.cursor/rules/transcripts.mdc` line 22 independently requires the editor-only rule (`editor-only, never rendered`), so the global copy is missing something the authoritative rules mandate.

**Recommendation: keep repo, port to global.** No merge needed; repo's text is a strict superset in meaning.

### 3.5 Step 1 transcript path, relative vs absolute — genuine either/or, needs his call

Repo line 18:

> **Local cache first.** Transcripts live in the prompting-bi repo at `transcripts/ep-{N}.txt`. Before Notion or YouTube:

Global line 18:

> **Local cache first.** Transcripts live in the prompting-bi repo at `C:\Github\prompting-bi\transcripts\ep-{N}.txt`. Before Notion or YouTube:

Everything downstream in both copies uses the relative form. The numbered list immediately below this line reads `read transcripts/ep-{N}.txt if it exists` in both, as does step 3's `Set source.transcript: "transcripts/ep-{N}.txt"`. So the global copy is internally inconsistent within its own paragraph: absolute in the prose, relative two lines later.

**This is a real either/or, not a defect.** The absolute path is arguably correct for a global skill, which can be invoked from Claude Desktop or any working directory outside the repo, where a bare `transcripts/` resolves to nothing. The relative path is correct for the in-repo copy, which only ever runs with the repo as the workspace root, and it matches `.cursor/rules/transcripts.mdc`, which uses the relative form throughout.

**Recommendation: needs his call, but there is a third option worth considering.** Rather than picking one, state both: `transcripts/ep-{N}.txt` in the repo root (`C:\Github\Prompting-BI\transcripts\` when the skill is invoked from outside the repo). That resolves the internal inconsistency and works from either invocation context, at the cost of one clause.

**Casing note.** The global absolute path is written `C:\Github\prompting-bi\`. The real directory is `C:\Github\Prompting-BI`. Harmless on Windows, which is case-insensitive, but sloppy. Note that this same lowercase spelling already appears in **both** copies in three other places (`SKILL.md` line 12, `SKILL.md` Step 8, and `publishing-targets.md` line 28), so fixing it is a whole-file sweep, not a one-line change. See section 8.2.

### 3.6 Step 1B "from the repo" vs "from the prompting-bi repo" — mechanical

Repo line 28: `Run scripts/fetch_youtube_transcript.py <url> from the repo.`
Global line 30: `Run scripts/fetch_youtube_transcript.py <url> from the prompting-bi repo.`

Pure wording. Global is marginally clearer when the skill is invoked outside the repo, which is the same concern driving 3.5. **Recommendation: take global's phrasing if 3.5 resolves toward absolute paths, otherwise irrelevant.** Do not spend attention on this one.

---

## 4. `references/voice-and-style.md`

**One divergence, and it is the largest single content gap in the set.** Repo has one summary line where global has five detailed rules. The repo copy is not a different opinion; it is a lossy compression of the global copy.

Repo line 40, the entire content on this subject:

> - DAX blocks earn their place when they demonstrate a point, especially agent deviations documented in comments.

Global lines 40 through 44, quoted in full:

> - **Instruction-based beats opinion-based.** Tommy's repeated edit note: an article that only takes positions is half an article. Every major section of a worked example should leave the reader something they can go execute, and the code block is usually what does that. If a section is pure argument, ask what artifact belongs under it.
>
> - **Pull real code out of the tenant instead of writing plausible code.** DAX and PySpark blocks earn their place when they demonstrate a point, and they are strongest verbatim (lightly trimmed) from Tommy's actual assets. Use the `pugliabi-fabric-api` skill to fetch real notebook definitions from the Northside workspace, or the Power BI modeling MCP for real measures. Invented-but-realistic code is the fallback, never the first move.
>
> - **Validation cells are the other signature code block.** Tommy's real Fabric notebooks all end with `# ---- Validation ----` and hard `assert` statements: referential integrity via `left_anti` joins, expected value sets, distribution bands, coverage checks, and regression asserts whose failure message names the bug they guard. These land better than any prose about "making sure it's right." Show the assert, not the intention.
>
> - **Agent deviations documented in comments are gold.** Notebook header comments like `# FIXES SHIPPED HERE: (1) event P&L uses the corrected TotalCost (no labor double-count)` are the agent declaring what it changed and why. Quote them.
>
> - **One extended analogy, and prefer the one he actually told.** When a transcript contains a personal analogy (the interior designer wife seeing a room he couldn't see), use it and drop the invented one, even if the invented one is more polished. Two competing extended analogies in one article is one too many.

Everything else in the file is byte-identical. The repo's single line is a partial paraphrase of only the second and fourth global rules, and it drops PySpark, the tenant-sourcing directive, and the named tooling entirely.

**Which side is richer:** global, by roughly 1,650 bytes of specific, operational, non-reconstructible content. Three of the five rules name concrete assets that cannot be inferred from the summary line: the `pugliabi-fabric-api` skill and the Northside workspace, the `# ---- Validation ----` / `left_anti` notebook convention, and the interior-designer analogy. The first rule ("instruction-based beats opinion-based") is described as "Tommy's repeated edit note," meaning it was distilled from his own review feedback.

**Timestamps corroborate.** Repo copy last modified 2026-07-29; global copy 2026-08-19. Global is three weeks newer and the rules were added in that window. There is no evidence of a deliberate decision to simplify the repo copy; this looks like the global copy being edited in place and the repo copy simply never receiving the update.

**Recommendation: keep global, port wholesale into repo.** Replace repo line 40 with global lines 40 through 44. No merge is required because there is no repo-side content to preserve. This is the item that creates the ordering constraint in section 9.

---

## 5. `references/publishing-targets.md`

Four editorial divergences and one mechanical. **The repo copy is correct and the global copy contains a factual error that would produce broken posts.**

### 5.1 The `tags` prohibition — editorial, and a hard bug in global

Global line 52:

> Use ONLY the schema fields shown above. Do not invent frontmatter keys (no `tags`, no `author`, no `category`): the schema in `src/content.config.ts` is enforced at build and unknown or missing fields break the deploy. Tags, keywords, and banner prompts live on the Notion page, not in frontmatter. This repo write happens on EVERY article run; it is not optional.

Repo line 59:

> Use ONLY schema fields from `src/content.config.ts` (`title`, `date`, `permalink`, `description`, `featured`, `tags`, `draft`, `source`). When the source was an EMP episode, always set `source.episode`, `source.title`, `source.notion` (EMP page URL), and `source.transcript` (`transcripts/ep-{N}.txt`). Later edits read that local file first; Notion/YouTube only on a miss or refresh. Omit `source` for original / non-episode posts. This repo write happens on EVERY article run; it is not optional.

**The global copy is wrong.** Verified against the live code and content:

| Evidence | Finding |
|---|---|
| `src/content.config.ts` line 15 | `tags: z.array(z.string()).default([]), // lowercase kebab-case slugs, see src/lib/tags.mjs` |
| `src/lib/tags.mjs` | Exists, 5,042 bytes |
| `scripts/auto-tag.mjs` + `npm run auto-tag` | Exist |
| `src/pages/tags/index.astro`, `src/pages/tags/[tag].astro` | Live routes |
| Posts in `published/` + `drafts/` carrying `tags:` | **18 of 18** |

Global's claim that tags "live on the Notion page, not in frontmatter" describes a state of the repo that has not been true for some time. An agent following the global copy would omit `tags` from every new post. That does not fail the build (the field defaults to `[]`), which makes it worse: the post ships silently untagged and simply never appears on any tag page.

**Recommendation: keep repo. Delete global's paragraph outright.** This is not a judgement call; it is a correction. It is the second-highest-priority item in this report after section 2, and it runs in the opposite direction, which is precisely why a blanket sync in either direction would have destroyed something.

### 5.2 `tags: []` in the front-matter example — editorial, repo ahead

Repo line 43, inside the fenced example block, absent from global:

```
tags: []                             # optional; kebab-case slugs from src/lib/tags.mjs
```

Same issue as 5.1, in the worked example rather than the prose. **Recommendation: keep repo.**

### 5.3 The `source` block in the front-matter example — editorial, repo ahead

Repo lines 44 through 49, absent from global:

```
# Editor/agent-only — required when the article came from an EMP episode. Not rendered on site.
source:
  episode: 544
  title: "Using Harnesses for Fabric Projects"
  notion: "https://app.notion.com/p/36de74c69c1880fdbbfbef7c346cd3b1"
  transcript: "transcripts/ep-544.txt"
```

Global's example block ends at `featured:`. Since 16 of 18 posts carry `source`, and `.cursor/rules/blog.mdc` shows this exact block in its own front-matter example, the repo version matches both practice and the authoritative rules. **Recommendation: keep repo.**

### 5.4 "The schema also defines" sentence — editorial, repo ahead

Repo line 55 opens:

> The schema also defines `draft` (boolean, default `false`; `true` = never built or listed) and optional `source` (episode number, title, Notion URL; optional `youtube` / `transcript` path).

Global line 48 opens:

> The schema also defines `draft` (boolean, default `false`; `true` = never built or listed).

Repo adds the `source` description including the `youtube` variant, which is real (`src/content.config.ts` line 26). **Recommendation: keep repo.**

### 5.5 `draft: true` inline comment — mechanical

Repo line 40: `draft: true                          # ALWAYS on new posts; keep true while in drafts/`
Global line 40: `draft: true                          # ALWAYS on new posts; flip to false at publish`

Both are true and neither contradicts anything. Repo's phrasing pairs better with the folder-stage model; global's states the eventual action. **Recommendation: merge, or just take repo.** Either is fine; not worth attention. If merging, `# ALWAYS on new posts; keep true while in drafts/, flip at publish` covers both.

---

## 6. `references/image-style.md`

**Zero content divergences.** The hashes differ, the byte counts differ by exactly 67, and the line counts are identical at 67. The cause is line endings, nothing else.

| | Repo | Global |
|---|---|---|
| CRLF line endings | 67 | 0 |
| Lone LF line endings | 0 | 67 |
| BOM | none | none |
| Bytes | 6,414 | 6,347 |
| Characters after newline normalization | 6,335 | 6,335 |

Normalizing `\r\n` to `\n` on both sides produces byte-identical text. Confirmed programmatically.

**Recommendation: no editorial action.** Whoever applies the ruling should normalize to CRLF to match the other five files in the global copy (which are all CRLF), purely so this file stops showing up as drift in future comparisons. This is the only genuinely mechanical, zero-risk item in the report.

---

## 7. Repo defect: duplicated paragraph in `SKILL.md`

**Confirmed.** Repo `SKILL.md` contains the same paragraph twice, verbatim, at **lines 44 and 46**, separated by blank line 45. Context, lines 42 through 48:

```
 42| In the repo, the whole mapping lives in one ore file per episode: `src/content/blog/angles/ep-{N}-angles.md` (source links, mined Tommy material, attribution landmines, locked decisions once he picks, leftover angles). Not loaded by Astro. See `src/content/blog/angles/README.md`.
 43|
 44| If Tommy grants batch autonomy ("don't ask, take the best topic"), pick the strongest fresh angle yourself, still checking the database for angle collisions first, and still filing the leftovers as Ideas.
 45|
 46| If Tommy grants batch autonomy ("don't ask, take the best topic"), pick the strongest fresh angle yourself, still checking the database for angle collisions first, and still filing the leftovers as Ideas.
 47|
 48| ## Step 4 - Walk the areas (this is what makes it his)
```

The global copy has this paragraph exactly once, at line 48.

**Provenance correction.** This was **not** introduced by the recent restructure edit. Walking every commit that touches the file shows two occurrences in all of them, back to `8588ec8` (2026-07-16), which is effectively the file's first commit. It has been duplicated for six weeks and is committed to `main`.

**Fix:** delete repo `SKILL.md` lines 45 and 46. One-line cleanup, no judgement required. **Not fixed here, per instructions.**

---

## 8. Cross-check against the authoritative rule files

Read `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/blog.mdc`, `.cursor/rules/transcripts.mdc`, and the live `src/content.config.ts`. One outright contradiction, one shared inaccuracy, one shared gap.

### 8.1 Contradiction: global forbids `tags`, the schema requires it

Covered in 5.1. Global `publishing-targets.md` line 52 contradicts `src/content.config.ts` line 15, `src/lib/tags.mjs`, `scripts/auto-tag.mjs`, both `/tags/` routes, and 18 of 18 existing posts. **The global copy is a bug regardless of which copy wins the rest of the file.**

Worth noting for accuracy: `AGENTS.md` and `.cursor/rules/blog.mdc` also omit `tags` from their documented front-matter schemas. They are silent, not wrong, but the repo skill copy is currently **ahead of the rule files** on this point. If the ruling keeps repo's `tags` documentation, `AGENTS.md` and `blog.mdc` deserve a matching update in the same pass.

### 8.2 Shared inaccuracy: repo path casing

Both copies spell the repo path `C:\Github\prompting-bi`. The real directory is `C:\Github\Prompting-BI`. Occurrences:

| Location | Present in |
|---|---|
| `SKILL.md` line 12 (`C:\Github\prompting-bi\src\content\blog\drafts\`) | both |
| `SKILL.md` Step 8 (`C:\Github\prompting-bi`, `/mnt/c/Github/prompting-bi`) | both |
| `publishing-targets.md` line 28 (same pair) | both |
| `SKILL.md` line 18 (`C:\Github\prompting-bi\transcripts\ep-{N}.txt`) | global only |

Harmless on Windows and under the default case-insensitive `/mnt/c` mount. Sloppy, and it makes any future path-matching automation brittle. **Fix in the same pass as 3.5, or explicitly decide to leave it.**

### 8.3 Shared gap: the `/prompts/` library and the build pipeline are invisible to both copies

Neither copy mentions `prompts/`, `scan-prompts`, `auto-tag`, `promptsExempt`, or `prompt-categories` anywhere. Zero hits in either. Meanwhile:

- `npm run build` is `node scripts/scan-prompts.mjs --quiet && astro build && pagefind --site dist`. Every build runs the prompts scanner first.
- `AGENTS.md`, `CLAUDE.md`, and `blog.mdc` all document the `prompts` collection at length, including that a post's code blocks are expected to have a corresponding `/prompts/` artifact.
- `src/content.config.ts` line 19 defines `promptsExempt`, the escape hatch for a post whose code blocks do not belong in the library.

The skill's Step 8 and Step 9 walk an agent through writing a post and closing the loop without ever mentioning that a code-heavy post will be flagged by the scanner, or that `promptsExempt` exists to silence it. This is a gap in **both** copies, so it is not drift and not part of the ruling, but it is the most likely source of the next round of confusion, and it interacts directly with the section 4 rules that push articles toward more real code.

**Recommendation: file separately.** Do not fold it into this reconciliation.

---

## 9. Ordered application checklist

> ### Ordering constraint, stated plainly
>
> **The global copy's extra `references/voice-and-style.md` content must be ported into the repo copy BEFORE any repo→global sync runs, or it is destroyed.**
>
> The same applies to the three global-only blocks in `SKILL.md`: the `<summary>` warning (line 28), the adjacent-episodes paragraph (line 40), and the code-heavy word carve-out (line 56). The global copy is not version-controlled. There is no backup and no undo. A repo→global copy executed first is unrecoverable.
>
> Symmetrically, a global→repo sync executed first would overwrite the repo's correct `tags` and `source` documentation with global's incorrect prohibition. **Neither direction is safe as a blanket operation.** That is the whole reason this report exists.

Execute in this order.

**Phase 1 — rescue global-only content into the repo (do this first, nothing else before it)**

1. Copy global `voice-and-style.md` lines 40 through 44 into repo `voice-and-style.md`, replacing repo line 40. (Section 4.)
2. Copy global `SKILL.md` line 28, the `<summary>` warning, into repo `SKILL.md` after Step 1A. (Section 2. Highest priority.)
3. Copy global `SKILL.md` line 40, the adjacent-episodes paragraph, into repo `SKILL.md` at the end of Step 2. (Section 3.2.)
4. Copy global `SKILL.md` Step 5 code-heavy carve-out into repo Step 5, between the word range and `Hard rules worth repeating`. (Section 3.3.)
5. **Commit.** The rescue is now version-controlled and the destructive risk is gone.

**Phase 2 — repo-side cleanups (safe, no judgement)**

6. Delete repo `SKILL.md` lines 45 and 46, removing the duplicated paragraph. (Section 7.)
7. Normalize repo `image-style.md` to the global copy's content, or simply leave it; either way settle on CRLF so it stops registering as drift. (Section 6.)
8. **Commit.**

**Phase 3 — Tommy's outstanding decisions (blockers for Phase 4)**

9. Rule on the transcript path: relative, absolute, or the both-forms option in section 3.5.
10. Rule on whether to fix the `prompting-bi` / `Prompting-BI` casing across both copies. (Section 8.2.)
11. Rule on the `draft: true` inline comment wording, if he cares. (Section 5.5. He probably does not.)
12. Apply whatever he decides to the repo copy. **Commit.**

**Phase 4 — repo→global sync (only now is this safe)**

13. Copy all six files from `.cursor/skills/writing-promptingbi-articles/` to `C:\Users\pugli\.claude\skills\writing-promptingbi-articles\`. The repo copy is now a strict superset. This is the step that carries repo's correct `tags` and `source` documentation into global and deletes global's incorrect prohibition. (Sections 3.4, 5.1 through 5.4.)
14. Re-run the hash comparison. All six pairs should match.

**Phase 5 — follow-ups, separate work**

15. Update `AGENTS.md` and `.cursor/rules/blog.mdc` to document `tags`, so the rule files stop trailing the schema. (Section 8.1.)
16. File the `/prompts/` library and `scan-prompts` gap as its own task. (Section 8.3.)

---

## 10. Preventing recurrence

**A `scripts/sync-skill.mjs --check` would have caught this in a day instead of six weeks.** The comparison in this report is six SHA-256 hashes; it took one command. Wired into `npm run build` alongside the existing `scan-prompts --quiet` step, it would print a one-line warning naming any file whose two copies disagree, on every single build. The drift documented here accumulated between 2026-07-29 and 2026-08-28 and was found by accident. A check step turns that into a notification on the next build after the first divergent edit, which is when the person who made the edit still remembers why.

Worth building it to warn rather than fail. Deliberate divergence is legitimate (section 3.5 may well resolve that way), and a hard failure would just get bypassed. A `--check` that exits non-zero only when explicitly asked, plus a `--sync` that applies repo→global after the operator confirms, covers both the daily case and the reconciliation case.

**In-repo should be the source of truth.** Three reasons, in order of weight:

1. **It is version-controlled and the global copy is not.** Every argument in this report about "destroyed, unrecoverable" content applies only to the global side. Git makes the repo copy's history inspectable, which is exactly how section 7's provenance and section 4's timestamp corroboration were established. Neither was possible on the global side.
2. **`.cursor/rules/transcripts.mdc` already points at it.** Line 13 names `.cursor/skills/writing-promptingbi-articles/scripts/fetch_youtube_transcript.py` explicitly. An authoritative rule file already treats the in-repo copy as the real one.
3. **It sits next to the code it documents.** The `tags` error in section 5.1 is exactly the failure mode a co-located copy resists: a change to `src/content.config.ts` and a change to the skill that documents it can land in the same commit and be reviewed together. The global copy has no such coupling, which is how it ended up forbidding a field the schema had already adopted.

The consequence for the sync direction is that repo→global is the normal flow, and global→repo is the exception that only runs after a manual review like this one.
