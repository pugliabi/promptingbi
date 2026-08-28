# Plan: Tommy-attributed episode index + speech-grounded writing voice

Status: **approved in design, not in flight.** Tommy has ruled on the method, the scope, the index's
visibility, and the reconciliation process (§1.1). Nothing here has been executed. No package has been
installed, no `data/` directory exists, no script has been written. Start only on his go.

Author: planning agent. Original investigation 2026-08-28; rewritten 2026-08-28 after Tommy's decisions,
with the corpus, linkage, volume, and environment numbers re-measured against the live repo. Read-only:
the only file this rewrite touched is this one.

Two goals, in dependency order:

- **Goal 1** — a durable, queryable index of Explicit Measures episodes, recording which ones Tommy
  actually spoke on, with canonical links and turn-level attribution for the episodes that matter.
- **Goal 2** — evolve the article-writing skill's voice reference so drafts are grounded in how Tommy
  actually talks, using the Tommy-attributed corpus Goal 1 produces.

Goal 2 depends on Goal 1 Phase 1.3. Goal 1 Phases 1.0 and 1.1, and Goal 2 Phase 2.0, are independently
useful and shippable.

---

## 1. Decisions and open items

### 1.1 Locked decisions

| # | Question | Ruling | Consequence |
| --- | --- | --- | --- |
| D1 | Attribution method | **Local.** WhisperX + `pyannote/speaker-diarization-3.1` on the RTX 4070. Hosted diarization APIs rejected. | Voice enrollment is mandatory, so Q1 and Q2 in §10 become hard blockers. Audio never leaves the machine. |
| D2 | Scope | **Demand-driven, not a fixed episode range.** An episode enters the attributed corpus when a repo artifact references it. | Replaces the old "eps 466–557" recommendation. Formalized as a computable rule in §3. Current membership: **25 episodes** (§3.3). |
| D3 | Index visibility | **Internal only.** Git-tracked JSON at `data/` in the repo root. Not an Astro collection, nothing rendered, no public "episodes I hosted" page. | No entry in `src/content.config.ts`. No route. Closes the old Q2 and Q10. |
| D4 | Skill-drift reconciliation | **Adjudicate file by file.** No blanket "port global additions into repo." | Phase 2.0's first deliverable becomes a side-by-side diff report with a per-file recommendation, presented for Tommy's ruling. Only then the merge. |
| D5 | Start date | **Hold.** | This document is build-ready. It is not a work order. |

**D4 has a destructive-order hazard that the plan must enforce mechanically.** The global copy of
`references/voice-and-style.md` is 6,174 B against the in-repo 4,523 B and carries five substantive
bullets the repo lacks (§2.8). A `sync-skill --push` (repo → global) run before those bullets are ported
overwrites them with no recovery path, because the global copy is not version-controlled. `sync-skill.mjs`
therefore refuses `--push` until a ledger file records that the reconciliation ruling has been applied
(§6.5).

### 1.2 What is still open

Six items, in §10, in blocking order. Two are hard blockers on Phase 1.2: the Tommy enrollment audio and
the voice-biometrics commit policy. Both exist only because of D1.

The Phase 2.0a drift ruling is not among them, because D4 settled the process and the report itself has
since been produced: **`plans/skill-drift-reconciliation.md` is complete and awaiting his ruling.** It is
tracked as a scheduled review step in §5.5, not as an open question.

---

## 2. Current state

Section 2 separates two kinds of claim. **Freshly measured** means I ran the measurement myself during
this rewrite, against the live repo or the local machine. **Inherited** means it comes from the
2026-08-28 investigation that produced the first draft of this plan and I did not re-run it. Appendix A
lists every claim with its status and method. Numbers nobody has measured are marked **UNVERIFIED**.

### 2.1 Transcript cache: 25 files, and zero of them have speaker labels

Freshly measured. `transcripts/` holds 25 episode files:

**338, 411, 484, 494, 501, 502, 504, 508, 522, 528, 529, 530, 531, 538, 539, 540, 541, 542, 544, 545,
546, 548, 549, 550, 553.**

| Metric | Value |
| --- | --- |
| Files | 25 (was 23; `ep-541.txt` and `ep-544.txt` were fetched 2026-08-28) |
| Body words, excluding headers | **300,266** |
| Mean body words per file | 12,011 |
| File size range | 31,883 B (`ep-553`) to 75,878 B (`ep-528`) |
| By `Source:` header | **21 YouTube auto-caption**, **4 Notion meeting note** (546, 548, 550, 553) |
| Files carrying speaker labels | **0 of 25** |

**No cached transcript, from any source, carries speaker attribution.** All four Notion-sourced files
carry `Captions: notion-meeting-note  [no speaker labels in this meeting note]`. `SKILL.md` line 32 and
`transcripts/README.md` line 39 both prefer Notion notes on the grounds that they have labels; against
the current cache that is 0 for 4. Attribution is a from-scratch problem, not a coverage gap.

**The four Notion-sourced files are condensed automation prose and must never enter the speech corpus.**
Freshly measured: they average **8,344 body words** against **12,709** for the 21 auto-caption files, on
episodes of comparable length. That 34% shortfall is not a shorter episode, it is a summary. See §2.3 for
why this matters more than it looks.

### 2.2 The two newly cached transcripts

Freshly measured from the file headers.

| | ep 541 | ep 544 |
| --- | --- | --- |
| Title | Helping Leaders Speak Data | Using Harnesses for Fabric Projects |
| Bytes | 71,890 | 75,533 |
| Body words | 13,572 | 14,582 |
| Uploaded | 2026-07-01 | 2026-07-10 |
| Duration | 1:09:03 | 1:13:21 |
| Source | YouTube auto (en) | YouTube auto (en) |
| Video id | `CecofYc2Ih0` | `8JefOiSox1w` |
| Speaker labels | none | none |
| `>>` markers | 260 | 257 |
| "Tommy" / "Mike" / "Seth" mentions | 39 / 21 / 0 | 73 / 20 / 0 |

Ep 544's video id `8JefOiSox1w` appeared **nowhere in the repo** before the 2026-08-28 fetch. It is now
recorded only in the `URL:` line of `transcripts/ep-544.txt`, which is fragile; Phase 1.1 puts it in
`data/episodes.json` where it belongs.

**No Notion meeting note exists for either episode.** Inherited: both EMP pages were fetched with
`include_transcript: true`, using ep 546 as a positive control. The meeting-note automation appears to
begin around **ep 546 (2026-07-16)**, so earlier episodes are YouTube-only. Coverage after that boundary
is not complete either: `src/content/blog/angles/ep-549-angles.md:9` records "Empty Notion meeting note
on the episode page. YouTube fallback." Treat 546 as the earliest note, not as the start of reliable
coverage.

### 2.3 Warning: a Notion meeting note's `<summary>` is not speech

This trap has already caused a misattribution problem in this project, so it gets its own section.

1. A Notion EMP meeting note's `<summary>` block is a **finished first-person article written by
   automation.** It reads like Tommy because it was generated in a blog-adjacent register. It contains
   sentences nobody said out loud. Mining it for voice teaches the blog to imitate a summarizer.
2. The note's `<transcript>` block comes back as a **placeholder** on the first fetch. Getting the real
   transcript requires a second, deliberate fetch with `include_transcript: true`. An agent that reads
   the first response and moves on will silently substitute the summary for the transcript.
3. Neither block carries speaker labels (§2.1), so even the real transcript does not solve attribution.

**Rules that follow, both non-negotiable:**

- The Tommy corpus (`transcripts/tommy/ep-{N}.txt`) is sourced **only** from WhisperX output on real
  audio. Never from a Notion note, never from a YouTube auto-caption.
- Notion notes stay useful as drafting aids and as a source of episode metadata. They are not evidence
  of who said what, and they are not speech.

### 2.4 The `>>` marker heuristic, and why it is rejected

Freshly measured: **19 of 25** files contain `>>` turn markers, **4,087 markers total**. The 6 files
without them are 338, 411, and all four Notion files. The old plan's figures (17 files, 3,583 turns) were
taken before 541 and 544 were cached.

Freshly measured and important: **zero of the 4,087 markers is a named label.** A search for
`>>\s*(Tommy|Mike|Seth)\s*:` across all 19 files returns 0 hits. The markers signal *that* the speaker
changed, never *who* the speaker is.

Hosts address each other by name constantly, which is a real anchor. `transcripts/ep-531.txt:13` opens
`>> Tommy, good morning. How are you doing today? >> Happy Memorial Day, dude.` The speaker who says
"Tommy," is by definition not Tommy. Vocative counts run 13–73 per episode for "Tommy" and 3–33 for
"Mike".

Inherited, not re-run: a prototype that split on `>>`, anchored turns containing exactly one unambiguous
vocative, and propagated identity by strict alternation measured **15.4% anchor density** and **62.7%
consecutive-anchor agreement** (336 agree, 200 conflict) across the then-17 files.

**62.7% is barely above a coin flip, so strict alternation is rejected as a primary method** (§4.4).
YouTube's `>>` insertion is not a faithful turn-change signal: it appears mid-turn and is omitted across
real changes. The vocative signal itself is strong; the `>>`-alternation mechanism for exploiting it is
not. The markers remain useful as **independent boundary hints for cross-checking diarization output**,
which is a different and much weaker demand on them.

### 2.5 Attribution is currently solved by hand, and that work is now most of the corpus

Freshly measured. `src/content/blog/angles/` holds **16 `ep-{N}-angles.md` files** (501, 502, 504, 508,
522, 528, 530, 531, 538, 540, 545, 546, 548, 549, 550, 553) plus a README. Every one of the 16 is a
member of the demand-driven corpus, and the corpus has 25 members, so:

> **The labelled validation set covers 64.0% of the corpus (16 of 25).**

That is the single most consequential number in this rewrite. Under the old eps 466–557 scope it was
16 of 92, or 17.4%; against the full archive it would have been 2.9%. Validating the highest-rated risk
(cluster→identity swap, §9 risk 1) on a supermajority of the corpus is a categorically stronger
mitigation than validating it on a sixth.

Freshly measured annotation density: **15 of the 16 files carry at least one `**Attribution:**` line**
(ep 540 is the exception), for **23 attribution assertions** plus **3 explicit `Mike-only` blocks**.
Examples:

- `ep-549-angles.md:13` — `**Mike-only (do not write as Tommy):** intern/CS-stack architecture layer;
  Power Designer DAX hardcoded week-6 vs week-5; ... "maybe stop hiring juniors."`
- `ep-553-angles.md:37` — `**Attribution:** Tommy. Do not write Mike's 70-80% harness stat as Tommy's.`
- `ep-550-angles.md:25` — `- Analogy (UNCERTAIN speaker, fits Tommy): iPad mini with no touchscreen...`

**Be honest about what this set can and cannot measure.** Roughly 26 claim-level assertions over 15
episodes is not a turn-level gold standard, so it **cannot produce a diarization error rate**. What it
can do, decisively, is catch a cluster→identity swap: a swapped episode flips the polarity of nearly
every assertion at once, which is a loud and unmistakable signal. It also catches systematic
misattribution of specific known-Mike claims. Design the Phase 1.2 scorer around those two questions and
do not overclaim precision.

Also confirmed: `angles/` is a sibling of `published/` and `drafts/` inside `src/content/blog/`, and the
loader glob at `src/content.config.ts:8` is `{published,drafts}/**/*.md`. Siblings genuinely are safe
from the site build; `backlog/` and `angles/` are live proof.

### 2.6 Post to episode linkage, corrected

Freshly measured from the filesystem. **This section corrects a false claim in the previous draft.**

| Metric | Value |
| --- | --- |
| Markdown files under `src/content/blog/` | 42 total: 17 `published/**`, 1 `drafts/`, 7 `backlog/`, 17 `angles/` |
| Files carrying `source.episode` | **20** |
| Distinct episodes referenced | **9**: 529, 538, 539, 541, 542, 544, 545, 546, 549 |
| Files carrying `source.transcript` | **2**, for eps 549 and 539. Both target files exist. |

**The previous draft claimed "episodes 541 and 544 are referenced by five published posts and
`source.transcript` on those posts points at files that do not exist." That is wrong on both halves.**
Only two files anywhere set `source.transcript`, and neither is dangling. The real linkage is via
`source.episode` across **nine files**:

| Episode | Referencing files |
| --- | --- |
| **541** | `published/2026-07/2026-07-27-step-zero-before-the-fabric-adoption-roadmap.md`<br>`published/2026-08/2026-08-10-what-keeps-you-up-at-night.md`<br>`published/2026-08/2026-08-19-design-the-report-from-the-meeting-you-already-had.md`<br>`backlog/2026-08-02-your-semantic-model-needs-a-dot-ai-folder.md` |
| **544** | `published/2026-07/2026-07-20-stop-re-prompting.md`<br>`published/2026-07/2026-07-29-anatomy-of-a-project-hub.md`<br>`published/2026-08/2026-08-03-meet-my-assistants.md`<br>`published/2026-08/2026-08-05-inside-an-mcp-execution-session.md`<br>`backlog/2026-08-13-your-fabric-project-needs-a-harness-not-a-better-prompt.md` |

Those nine files lack a `source.transcript` line. So do nine others. The field is optional in the schema
at `src/content.config.ts:27`, and **all nine referenced episodes now have a cached transcript**, so the
correct fix is broader than 541 and 544:

> **Phase 1.0 task: add `source.transcript: "transcripts/ep-{N}.txt"` to the 18 of 20 `source.episode`
> files that lack it.** Mechanical, zero-risk (editor-only field, never rendered), and it closes the
> agent contract in `transcripts/README.md:38`.

The two files that already have it are `published/2026-08/2026-08-28-agents-raise-the-floor-and-lower-the-ceiling.md`
and `published/2026-08/2026-08-26-hard-data-soft-data.md`. Leave them alone.

### 2.7 Enumeration sources

Inherited in full. Not re-measured during this rewrite; every figure below is from the 2026-08-28
investigation. Retained because Phase 1.1 depends on it and because the parser defects it catalogues are
real and expensive to rediscover.

| Source | Entries | Episode range | Verdict |
| --- | --- | --- | --- |
| YouTube playlist `PLn1m_aBmgsbHr83c1P6uqaWF5PLdFzOjj` | 559 raw → **557 unique episode numbers** | **1..557, zero gaps** | **Authoritative for `EpNum` ↔ YouTube video id** |
| Podcast RSS `https://anchor.fm/s/5bb46378/podcast/rss` | **557 items** | `itunes:episode` 1..558, 25 holes; 557/557 after title fallback | **Authoritative for publish date, audio URL, description** |
| YouTube `/@powerbitips/videos` tab | 263 | only ~440..557 | **Unusable.** Truncated; 146 of 263 are "No Ads" duplicate re-uploads |
| Notion EMP `collection://3bb02401-3320-4eb7-92fe-d5197943f569` | 253 rows, **199 with `EpNum` > 0** | `EpNum` 223..567, dates 2025-12-11..2026-09-29 | **Not authoritative.** Forward-looking planning database |

Defects the parser must handle, all observed:

- The 559 playlist entries resolve to 557 unique episode numbers, 1 non-episode (`QejIXrDE1t4`, "Explicit
  Measures Theme Song"), and **1 genuine duplicate upload** (ep 539 appears twice, identical title,
  different video ids).
- **37 titles use lowercase `ep.NNN`.** A case-sensitive `Ep\.?\s*(\d+)` regex silently drops all 37. The
  existing `EP_RE` in `.cursor/skills/writing-promptingbi-articles/scripts/fetch_youtube_transcript.py`
  uses `re.I` and is fine; a new parser must match that.
- Title conventions drift across eras: `"... - Ep.549 - Power BI tips"`, `"... - Episode 1 - Power BI
  Tips from the Real World"`, and in RSS `"549 - Training Staff on Agents for DAX - No Ads"` /
  `"558: Has Your Medallion Patterns Changed?"`.
- RSS carries a structured `<itunes:episode>` element, so RSS needs almost no title parsing. YouTube does.
- **RSS is ahead of YouTube by one episode**: RSS newest is ep 558 (pubDate Thu, 27 Aug 2026), playlist
  max is 557. The index must tolerate an episode existing in one source and not the other.
- RSS `<enclosure>` URLs are present on **557/557** and directly downloadable. A `HEAD` against ep 558's
  enclosure returned `HTTP 200`, `audio/mpeg`, **67,894,200 bytes** for a 66-minute episode. **No yt-dlp
  needed for audio.** That measured rate, 58.9 MB/hr, drives §4.5.

### 2.8 Notion EMP is a planning tool, not an archive

Inherited. 253 rows, 199 with a usable `EpNum` (52 NULL, one at 0), covering `EpNum` 223..567 and dates
2025-12-11..2026-09-29 including future scheduled episodes.

Property coverage is thin exactly where it would matter:

- `Guest` checkbox: `__YES__` on **6 of 253**.
- `Recorded` checkbox: `__YES__` on **10 of 253**.
- `userDefined:URL`: populated on **1 of 253**.

Available properties: `Name`, `EpNum`, `Description`, `AI Description`, `Date`, `Status`, `Tags`, `Guest`,
`Recorded`, `RecScheduled`, `Scheduled`, `UPL`, `RSS Entry`, `userDefined:URL`, and the agent-agenda
checkboxes `GPT` / `Gemini` / `Claude`. **There is no host or speaker property.**

Notion also rate-limited the investigation (`429 rate_limited`, `collection_router_upstream_429`,
`retry_after: 30`), so any sync script needs backoff and must treat the Notion leg as optional.

### 2.9 Roster is not a stable two-host duo, and the demand-driven scope pulls the three-host era in

- **Seth Bauer was a third co-host.** Inherited: external sources list Mike Carlo, Tommy Puglia, and Seth
  Bauer as hosts.
- Inherited: RSS descriptions mention Seth in **459 of 557** items, but only for episodes **1..465**;
  "Mike & Tommy" phrasing appears only in **479..558** (57 items). That is a boilerplate footer change,
  so it marks an **era boundary around ep 465–479**, not per-episode presence.
- Inherited: **RSS descriptions are useless as a presence signal.** Mike and Tommy both appear in 555/557.
  Template text.
- Freshly measured, and this changes the plan: **two corpus members are pre-465.** `ep-338.txt`
  (2024-07-19) has **13 "Seth" mentions**, 13 "Tommy", 6 "Mike". `ep-411.txt` (2025-04-02) has **0 "Seth"**,
  15 "Tommy", 3 "Mike". Under the old 466–557 scope the three-host problem was scoped away. Under D2 it
  is in scope for 338 at minimum, and 411 demonstrates that a name-mention count is not presence evidence
  either way.

  **This does not make Seth enrollment a blocker, because identifying Tommy does not require identifying
  everyone.** Run 338 and 411 with `max_speakers=4`, identify the Tommy cluster by enrollment plus
  vocative agreement, and leave the other clusters as `unknown-a`, `unknown-b`. An unnamed cluster costs
  nothing: the corpus only ever consumes the Tommy cluster. Seth enrollment becomes worthwhile only if
  the vocative cross-check cannot separate Tommy from Seth, and it can, because "Tommy," and "Seth," are
  distinct vocatives. Q5 in §10 stays open but drops from blocking to informational.
- Inherited: the **Agentic Thinking Podcast** (`PLn1m_aBmgsbE0CSYy9zMiwkSgCjKeR6gq`, **34 videos**) is
  Mike's solo show. From `transcripts/ep-538.txt`: *"...Tommy, I was doing... I'm doing the same thing for
  agentic thinking where we do an episode, I transcribe it and it goes on our website."* The speaker
  addresses Tommy, so the speaker is Mike, and Mike owns that show. Two consequences: **exclude** it from
  Tommy's corpus, and it is a **free source of clean single-speaker Mike audio** for enrollment. Confirm
  with Tommy before relying on it (§10 Q3).

### 2.10 The skill exists in two copies and they have already diverged

Freshly measured by `Get-FileHash` on both trees.

| File | In-repo `.cursor/skills/writing-promptingbi-articles/` | Global `~/.claude/skills/writing-promptingbi-articles/` | State |
| --- | --- | --- | --- |
| `SKILL.md` | 13,644 B | **14,641 B** | **DIFFER** |
| `references/voice-and-style.md` | 4,523 B | **6,174 B** | **DIFFER** |
| `references/image-style.md` | **6,414 B** | 6,347 B | **DIFFER** |
| `references/publishing-targets.md` | **6,236 B** | 5,630 B | **DIFFER** |
| `references/article-structure.md` | 3,113 B | 3,113 B | same |
| `scripts/fetch_youtube_transcript.py` | 8,978 B | 8,978 B | same |

Two of the six sizes moved since the previous draft recorded them (`SKILL.md` global 14,275 → 14,641;
`publishing-targets.md` global 5,314 → 5,630), which is direct evidence that **the global copy is being
edited while this plan sits unexecuted.** Re-measure at the start of Phase 2.0a; do not trust this table
when you get there.

Inherited: **the global copy of `voice-and-style.md` is ahead**, with five substantive bullets the
in-repo copy lacks:

1. "Instruction-based beats opinion-based"
2. "Pull real code out of the tenant instead of writing plausible code"
3. "Validation cells are the other signature code block"
4. "Agent deviations documented in comments are gold"
5. "One extended analogy, and prefer the one he actually told"

Freshly verified against the in-repo file: those five are absent, and the in-repo hard rules that Goal 2
must never break sit at `references/voice-and-style.md:26` (no em dashes, ever) and `:27` (never name
co-hosts, quote "the show", or narrate that a conversation happened). Line 3 is the provenance sentence
that Phase 2.2 amends.

This drift must be resolved **before** Goal 2 adds anything, or the new reference forks on day one.

**A full file-by-file adjudication now exists at `plans/skill-drift-reconciliation.md`**, produced
independently on 2026-08-28. It supersedes this section's summary: it carries SHA-256 hashes, line-level
`Compare-Object` output, and a per-file verdict, and it confirms both that four of six files differ and
that the byte sizes above were already stale when measured (both `SKILL.md` copies and both
`publishing-targets.md` copies were written on 2026-08-28). §5.5 defers to it. **Nothing in it has been
applied**; neither copy has been edited.

### 2.11 Local machine

Freshly re-verified 2026-08-28.

| Component | Status |
| --- | --- |
| OS | Windows 10.0.26200, PowerShell |
| Python | 3.12.10 |
| yt-dlp | 2026.07.04 |
| ffmpeg | 8.0-full_build (gyan.dev) |
| Node | **v24.16.0** |
| GPU | **NVIDIA GeForce RTX 4070, 12,282 MiB VRAM, driver 610.88** |
| `HF_TOKEN` | **set** |
| torch / torchaudio | **not installed** |
| `pyannote.audio` | **not installed** (`pyannote-core` 6.0.1 present as a stray transitive dep, unusable alone) |
| whisperx / faster-whisper / ctranslate2 | **not installed** |

12 GB VRAM comfortably runs `faster-whisper large-v3` and `pyannote/speaker-diarization-3.1` together.
Node 24 gives `fetch`, `node:fs/promises`, `node:path`, and `node:child_process` as built-ins, which is
the entire dependency surface the `.mjs` scripts need.

`package.json` currently has four custom scripts (`new-post`, `new-prompt`, `scan-prompts`, `auto-tag`),
all `node scripts/*.mjs`, and `build` is `node scripts/scan-prompts.mjs --quiet && astro build && pagefind
--site dist`. Runtime dependencies are `@astrojs/rss`, `@astrojs/sitemap`, `astro`, plus `pagefind` in
dev. **No new npm dependency is required or permitted** (`AGENTS.md`: do not add npm dependencies without
asking).

---

## 3. The corpus membership rule (D2, formalized)

### 3.1 The rule

An episode `N` is a member of the **attributed corpus** if and only if at least one of these is true:

| Predicate | Test | Rationale |
| --- | --- | --- |
| **P1** Transcript cached | `transcripts/ep-{N}.txt` exists | A cached transcript means somebody already spent effort on this episode |
| **P2** Angles file exists | `src/content/blog/angles/ep-{N}-angles.md` exists | Ore has been mined from it |
| **P3** Referenced by a post artifact | any `*.md` under `src/content/blog/{published,drafts,backlog}/**` has `source.episode: N` | It has fed, or is queued to feed, an article |
| **P4** Manually pinned | `N` appears in `data/corpus-pins.json` | Escape hatch for "diarize this one, I have a reason" without inventing a fake artifact |
| **P5** Already attributed | the record's `corpus_sticky` is `true` | See §3.2 |

`angles/` is deliberately excluded from the P3 scan even though it lives under `src/content/blog/`,
because P2 already covers it by filename and the ore files carry `- Episode: N` in prose rather than
front matter.

### 3.2 Membership is sticky once attributed

Membership can be revoked by ordinary editorial work, and it already has been. Freshly verified:
`src/content/blog/angles/ep-549-angles.md:18` records the decision to *"Merge in
`backlog/2026-08-08-reviewing-is-the-new-writing.md` (ep 537) and retire that draft."* That file is gone
from disk. **Ep 537 was a corpus member until today and is not one now**, and it never had a cached
transcript, so nothing was lost. Had it been diarized first, an eviction would have thrown away GPU work
and a committed attribution file for no benefit.

So: once an episode has been diarized and `data/speakers/ep-{N}.jsonl` is committed, the sync script sets
`corpus_sticky: true` and membership never lapses. The cost is sunk and the attributed turns stay useful
to Goal 2 regardless of whether the post that motivated them survived.

### 3.3 Current membership: 25 episodes

Freshly computed by listing the directories and scanning front matter on disk.

| Predicate | Episodes matched | Count |
| --- | --- | --- |
| P1 `transcripts/ep-{N}.txt` | 338, 411, 484, 494, 501, 502, 504, 508, 522, 528, 529, 530, 531, 538, 539, 540, 541, 542, 544, 545, 546, 548, 549, 550, 553 | **25** |
| P2 `angles/ep-{N}-angles.md` | 501, 502, 504, 508, 522, 528, 530, 531, 538, 540, 545, 546, 548, 549, 550, 553 | 16 (all ⊆ P1) |
| P3 `source.episode` | 529, 538, 539, 541, 542, 544, 545, 546, 549 | 9 (all ⊆ P1) |
| P4 pins | none, file does not exist yet | 0 |
| **Union** | | **25** |

**Tommy's count of 25 is confirmed.** P1 currently subsumes P2 and P3 entirely, which is expected: the
workflow is fetch-transcript, then mine angles, then write a post, so the transcript always lands first.

One methodological warning, learned the hard way during this rewrite: **a cached code-search index
reported two `source.episode` files that do not exist on disk** (a retired backlog file for ep 537 and a
draft named `2026-08-19-stop-handing-agents-a-measure-list.md`). Both would have inflated the count.
`episodes-sync.mjs` must `stat` and read real files, never consult a search index or a cached manifest
(§6.1 defect 9).

Episodes in the corpus **without** an angles file, and therefore outside the validation set: 338, 411,
484, 494, 529, 539, 541, 542, 544. Nine of them.

### 3.4 The trigger: on-demand per episode, not a batch backfill

There is no backfill of 557. There is no overnight run over the two-host era. The pipeline is a queue.

1. `npm run episodes:sync` recomputes membership from the filesystem on every invocation, and it is
   idempotent.
2. A newly qualified episode is written with `corpus: true`, `corpus_reason: ["P1"]` (or whichever
   predicates fired), `presence_source: "unanalysed"`, `tommy_present: null`.
3. `npm run episodes:diarize -- --queue` processes every `corpus: true` record whose
   `presence_source` is `"unanalysed"`, one episode at a time.
4. At **10–20 minutes of GPU time per episode** (§4.5, UNVERIFIED), a single newly referenced episode is
   a coffee break, not a scheduling event. That is the whole argument for demand-driven: the marginal
   cost of the next episode is small enough that nobody has to plan for it.
5. Non-members stay in `data/episodes.json` as metadata-only records with `corpus: false` and
   `tommy_present: null`. They are enumerated, not analysed.

**Enumeration scope and attribution scope are different, deliberately.** Phase 1.1 enumerates all 557
episodes because RSS and the playlist come as single cheap fetches and because `audio_url` for a
non-member costs nothing to store and is required the moment it becomes a member. Only the 25 members get
audio downloaded, transcribed, and diarized.

**Rejected: a fixed episode range (the old eps 466–557 recommendation).** It processes ~67 episodes that
no repo artifact has ever referenced, on the speculation that they might be useful, and it *excludes*
338 and 411 which are genuinely in demand today. The demand-driven rule is both cheaper and more
complete for the actual use case.

**Rejected: full-archive backfill (all 557).** ~604 hours of audio, ~3.2 million estimated Tommy words,
150–200 GPU hours, and the 2021-era content is off-topic for a blog about agentic Fabric work. See §4.5
for the numbers.

---

## 4. Goal 1 — Tommy-attributed episode index

### 4.1 Enumeration and reconciliation

**Recommended: YouTube playlist for identity, RSS for time and audio, Notion for editorial intent.
Reconcile on integer `EpNum`.**

| Field | Authority | Why |
| --- | --- | --- |
| `episode` (EpNum) | YouTube playlist title, case-insensitive `[Ee]p\.?\s*(\d+)` \| `Episode\s+(\d+)` | Only source measured at **1..557 with zero gaps** |
| `youtube_id`, `youtube_url` | YouTube playlist | Only source with the canonical video id |
| `published`, `duration_seconds`, `audio_url`, `rss_guid`, `rss_link` | RSS | Only source with a real publish date and a direct MP3 |
| `title` | RSS `<title>` with suffixes stripped, YouTube fallback | RSS titles are cleaner (no " - Power BI tips" tail) |
| `notion_page`, `guests`, agenda flags | Notion EMP | Editorial intent lives only there |
| `corpus`, `corpus_reason`, `corpus_sticky` | **Derived from the filesystem** (§3) | The membership rule |
| `hosts_present`, `tommy_present` | **Derived from audio** (§4.4) | No metadata source can answer this |

Reconciliation rules, each written against a defect actually observed in §2.7:

1. Parse `EpNum` case-insensitively. **37 lowercase `ep.` titles depend on this.**
2. Dedupe playlist entries by `EpNum`, keeping the longest `duration`. **Ep 539 has two uploads.**
3. Prefer RSS `<itunes:episode>`; fall back to `^(\d{1,3})\s*[-:]` then `Ep\.?\s*(\d+)` on the title.
   Covers the items missing the element.
4. Skip playlist entries with no parseable number and log them. Currently exactly one: the theme song.
5. **Outer join, never inner.** RSS is one episode ahead today; older episodes may be video-only. Record
   `sources_seen` per record so gaps are visible rather than silent.
6. Strip `" - No Ads"`, `" - Power BI tips"`, `" - Power BI Tips from the Real World"` from titles.

**Rejected: Notion as the enumeration spine.** 199 usable EpNums over 223..567, missing roughly 60% of
the archive, and 52 rows have no EpNum at all. Forward-looking agenda tool.

**Rejected: the `/videos` tab.** Truncates at 263 and is 55% "No Ads" duplicates.

**Rejected: RSS alone.** 25 holes in `itunes:episode` and no YouTube video id, which is the link Tommy
actually shares.

### 4.2 Index location and shape (D3)

**Git-tracked JSON at the repo root, `data/episodes.json`, single source of truth. Internal only.**

- `data/` at the **repo root**, not under `src/content/`. `angles/` proves siblings inside
  `src/content/blog/` are safe from the `{published,drafts}/**/*.md` glob, but root `data/` removes the
  question entirely and cannot be caught by a future glob widening.
- **Not an Astro content collection.** No entry in `src/content.config.ts`, no schema registration,
  nothing renders, no route. D3.
- **JSON over CSV/YAML**: nested `hosts_present`, `corpus_reason`, and `posts` arrays; CSV cannot hold
  them. YAML invites hand-editing of a generated file.
- **Pretty-printed, 2-space, stable key order, one record per array element, trailing newline**, so a
  re-sync touching one episode produces a one-episode git diff.

| Path | Contents | Git |
| --- | --- | --- |
| `data/episodes.json` | 557 records. **Source of truth.** 25 with `corpus: true` today. | tracked |
| `data/episodes.schema.json` | JSON Schema for the above, so a malformed write is catchable | tracked |
| `data/hosts.json` | Host roster: id, display name, era, enrollment reference | tracked |
| `data/corpus-pins.json` | Manual P4 membership pins, `{ "pins": [] }` initially | tracked |
| `data/speakers/ep-{N}.jsonl` | Turn-level attribution, one JSON object per turn | tracked (per-episode files keep diffs local) |
| `transcripts/tommy/ep-{N}.txt` | Tommy-only text, the Goal 2 corpus | tracked |
| `data/voice/profile.json` | Goal 2 output (§5.2) | tracked |
| `data/skill-sync.json` | Reconciliation ledger gating `sync-skill --push` (§6.5) | tracked |
| `data/enrollment/{host-id}.wav` | Voice enrollment references | **gitignored pending §10 Q2** |
| `data/audio/` | Downloaded MP3 / WAV, transient | **gitignored** |

#### `data/episodes.json` schema

| Field | Type | Source | Notes |
| --- | --- | --- | --- |
| `episode` | int | YouTube title | primary key |
| `title` | string | RSS, cleaned | suffixes stripped |
| `youtube_title` | string | YouTube | raw, for auditing the parser |
| `youtube_id` | string \| null | YouTube | |
| `youtube_url` | string \| null | derived | |
| `rss_guid` | string \| null | RSS | stable id for RSS-side dedupe |
| `rss_link` | string \| null | RSS | Spotify-for-Creators episode page |
| `audio_url` | string \| null | RSS `<enclosure url>` | direct MP3, required before diarization |
| `published` | date `YYYY-MM-DD` | RSS `pubDate` | |
| `duration_seconds` | int \| null | RSS `itunes:duration` \| YouTube | |
| `era` | enum | derived from `episode` | `real-world` \| `three-host` \| `mike-tommy` |
| `corpus` | bool | §3 rule | `true` for the 25 members |
| `corpus_reason` | string[] | §3 rule | which predicates fired, e.g. `["P1","P3"]` |
| `corpus_sticky` | bool | pipeline | `true` once diarized; membership never lapses (§3.2) |
| `hosts_present` | string[] | **derived from audio** | ids from `data/hosts.json`, plus `unknown-a`.. |
| `guests` | string[] | Notion `Guest` + manual | free text names |
| `tommy_present` | bool \| null | derived | `null` = not yet analysed |
| `tommy_speaking_seconds` | int \| null | diarization | |
| `tommy_share` | float \| null | diarization | fraction of total speech. **Measures the §4.5 assumption.** |
| `presence_source` | enum | pipeline | `diarization+enrollment` \| `diarization+vocative` \| `manual` \| `quarantined` \| `unanalysed` |
| `presence_confidence` | float \| null | pipeline | 0..1, see §4.4 |
| `presence_verified_by` | string \| null | human | `"tommy"` when he has eyeballed it; **wins over everything** |
| `notion_page` | string \| null | Notion | |
| `transcript` | string \| null | filesystem | `transcripts/ep-{N}.txt` |
| `transcript_source` | enum \| null | header | `youtube-auto` \| `notion` \| `whisperx` \| `paste` |
| `speaker_turns` | string \| null | filesystem | `data/speakers/ep-{N}.jsonl` |
| `tommy_corpus` | string \| null | filesystem | `transcripts/tommy/ep-{N}.txt` |
| `angles` | string \| null | filesystem | `src/content/blog/angles/ep-{N}-angles.md` |
| `posts` | string[] | scan of `source.episode` | permalinks for `published/`, repo paths for `drafts/`+`backlog/` |
| `sources_seen` | string[] | pipeline | which feeds contributed |
| `pipeline_version` | string | pipeline | e.g. `"diarize-1"`; bump on any model or threshold change |
| `updated` | ISO datetime | pipeline | |

Sample record. Metadata values are real as of 2026-08-28; the six diarization fields are **illustrative
placeholders**, explicitly not measured.

```json
{
  "episode": 549,
  "title": "Training Staff on Agents for DAX",
  "youtube_title": "Training Staff on Agents for DAX - Ep.549 - Power BI tips",
  "youtube_id": "C68t4grCD6Y",
  "youtube_url": "https://www.youtube.com/watch?v=C68t4grCD6Y",
  "rss_guid": null,
  "rss_link": null,
  "audio_url": null,
  "published": "2026-07-29",
  "duration_seconds": 2835,
  "era": "mike-tommy",
  "corpus": true,
  "corpus_reason": ["P1", "P2", "P3"],
  "corpus_sticky": false,
  "hosts_present": ["tommy-puglia", "mike-carlo"],
  "guests": [],
  "tommy_present": true,
  "tommy_speaking_seconds": 1290,
  "tommy_share": 0.47,
  "presence_source": "diarization+enrollment",
  "presence_confidence": 0.94,
  "presence_verified_by": null,
  "notion_page": "https://app.notion.com/p/397e74c69c1880d58dd6fcbb00a36ed8",
  "transcript": "transcripts/ep-549.txt",
  "transcript_source": "youtube-auto",
  "speaker_turns": "data/speakers/ep-549.jsonl",
  "tommy_corpus": "transcripts/tommy/ep-549.txt",
  "angles": "src/content/blog/angles/ep-549-angles.md",
  "posts": ["2026/08/28/agents-raise-the-floor-and-lower-the-ceiling"],
  "sources_seen": ["youtube"],
  "pipeline_version": "diarize-1",
  "updated": "2026-08-28T15:00:00Z"
}
```

`rss_guid`, `rss_link`, and `audio_url` are `null` because the investigation only had the playlist for
this episode; Phase 1.1 fills them and `sources_seen` becomes `["youtube","rss"]`. The permalink is the
current one after the 2026-08-28 date move; the stale `2026/08/31/...` value that appeared in an earlier
draft of this plan is wrong.

#### `data/speakers/ep-{N}.jsonl`, one object per turn

| Field | Type | Notes |
| --- | --- | --- |
| `i` | int | turn index, 0-based, ascending by `start` |
| `start`, `end` | float | seconds from episode start |
| `speaker` | string | host id, or `unknown-a` / `unknown-b` for an unidentified cluster |
| `cluster` | string | raw pyannote label, e.g. `SPEAKER_01`. Kept so a relabel does not require a re-run |
| `conf` | float | 0..1 cluster-identity confidence, episode-level, copied onto every turn |
| `overlap` | bool | pyannote flagged overlapping speech. **Excluded from the corpus** |
| `segment_role` | enum | `body` \| `intro` \| `outro` \| `news-read` \| `mailbag` \| `sponsor`. Only `body` enters the corpus (§5.1) |
| `words` | int | word count |
| `text` | string | WhisperX text for the turn |

```json
{"i":42,"start":812.4,"end":848.9,"speaker":"tommy-puglia","cluster":"SPEAKER_01","conf":0.91,"overlap":false,"segment_role":"body","words":118,"text":"..."}
```

#### `data/hosts.json`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | `tommy-puglia`, `mike-carlo`, `seth-bauer` |
| `display` | string | "Tommy Puglia" |
| `era_from`, `era_to` | int \| null | inclusive episode bounds, `null` for open-ended |
| `enrollment_wav` | string \| null | `data/enrollment/{id}.wav`, gitignored pending Q2 |
| `enrollment_embedding` | number[] \| null | committed vector, the Q2-safe alternative to the WAV |
| `enrollment_source` | string | provenance note, e.g. "solo recording 2026-09-01" |
| `vocatives` | string[] | `["Tommy","Tom"]`. Used by the §4.4 cross-check |

**Notion mirror, explicitly derived.** Add two properties to the EMP database, `Tommy Present`
(checkbox) and `YouTube URL` (url), written by the sync script from `data/episodes.json`. Never read back.
Rationale: Tommy and Mike work agendas in Notion, so the flag should be visible there, but a Notion
property is a poor source of truth for something regenerable, it has no diff history, and the
investigation hit a `429` on it during read-only use. Gated on §10 Q4.

**Rejected: Notion as source of truth.** No reviewable version history, rate-limited, no schema
enforcement, and the existing `Guest` / `Recorded` / `URL` coverage (6/253, 10/253, 1/253) is direct
evidence that manual Notion properties do not stay maintained.

**Rejected: SQLite.** Binary, unreviewable in a PR, and 557 records do not need indexes.

**Rejected: an Astro content collection.** D3. It would put the data one glob change away from the
public site and add a zod schema that has to be kept in sync with the generator for no benefit.

### 4.3 Determining whether Tommy actually spoke

**Derive presence from the §4.4 diarization output, gate it on a speaking-time floor, and never infer it
from metadata.**

`tommy_present = true` requires an enrolled Tommy cluster holding **≥ 5% of total speech and ≥ 120
seconds**. The floor matters because a one-line cameo or an intro read is not "Tommy spoke on this
episode" for corpus purposes.

Why nothing else works, measured:

| Candidate signal | Measurement | Verdict |
| --- | --- | --- |
| RSS descriptions | Mike and Tommy in 555/557, Seth in 459/557 | Template text. Zero signal |
| Notion `Guest` checkbox | 6/253 rows | Unmaintained |
| Episode titles | never name hosts | No signal |
| Vocative presence in a transcript | ep 411 has 15 "Tommy" and 0 "Seth"; ep 338 has 13 of each | Proves he was *addressed*, not that he *spoke*. Also fails on the 6 files with no `>>` markers |

Interim honesty mechanism: `presence_source: "unanalysed"` with `tommy_present: null` is a valid and
expected state. Under D2 most of the 557 records stay that way forever. A `null` is an accurate "we do
not know"; a defaulted `true` is a lie that ends up in the corpus.

`presence_verified_by: "tommy"` overrides the pipeline permanently. He is the cheapest oracle available
for the ambiguous handful, and the sync script must never clobber a record that carries it.

### 4.4 Speaker attribution: the local pipeline (D1)

Options, honestly costed against the verified machine in §2.11. **D1 locks option A.** The table stays
because the rejections are load-bearing and because a future reader will want to know why the obvious
cheap paths were not taken.

| Option | Setup | Accuracy | Hardware | Licensing | Verdict |
| --- | --- | --- | --- | --- | --- |
| **A. WhisperX ASR + pyannote 3.1 diarization + speaker enrollment** | 1–2 days | High. Published DER for `speaker-diarization-3.1` on clean 2-speaker audio runs low single digits to ~10% depending on corpus (**UNVERIFIED for this audio**) | RTX 4070 12 GB sufficient | pyannote code MIT; **models gated on HF, terms must be accepted**; `HF_TOKEN` already set | **LOCKED (D1)** |
| **B. Diarization + aggregate vocative voting, no enrollment** | ~4 h on top of A | Good at episode level; per-cluster naming from 20–70 anchor votes | Same as A | Same as A | **Required cross-check inside A, step 6** |
| C. `>>` split + strict alternation | ~2 h | **Measured 62.7%.** Near chance | None | n/a | **Rejected** (§2.4) |
| D. Notion AI meeting notes | Zero | n/a | None | n/a | **Rejected: 0 of 4 cached notes carry labels, and the `<summary>` trap in §2.3** |
| E. Hosted diarization API (AssemblyAI, Deepgram, ElevenLabs Scribe) | ~2 h | High, vendor-managed | None | Per-minute billing; **audio leaves the machine**; pricing **UNVERIFIED** | **Rejected by D1.** Tommy explicitly declined. Retained as a spot-check option only if the local pipeline scores badly in Phase 1.2, and then only with his say-so, because it exports Mike's voice to a third party |
| F. Voice-fingerprint enrollment alone, no diarization | ~1 day | Poor standalone. Needs segments to score | GPU | Same as A | Folded into A as step 5 |

#### Per-episode pipeline

1. **Acquire audio.** Stream `audio_url` from RSS through ffmpeg:
   `ffmpeg -nostdin -i "<url>" -vn -ac 1 -ar 16000 -c:a pcm_s16le data/audio/ep-{N}.wav`. Delete in a
   `finally` block. Fall back to `yt-dlp -x` from `youtube_url` only when `audio_url` is null.
2. **Transcribe.** `faster-whisper large-v3` via WhisperX for word-level timestamps. Pass a domain
   hotword prompt ("Microsoft Fabric, Power BI, DAX, semantic model, MCP, Copilot, OneLake, Direct Lake,
   medallion, Tabular Editor, Explicit Measures") to cut the ASR error class visible in the current
   cache.
3. **Diarize.** `pyannote/speaker-diarization-3.1`. Do **not** pin `num_speakers`; pass
   `min_speakers=1, max_speakers=4` so the three-host era (338 is in the corpus) and guest episodes are
   not forced into two clusters.
4. **Align.** Assign words to speaker turns via WhisperX alignment. Flag overlapping regions.
5. **Identify each cluster by enrollment.** Compute a speaker embedding per cluster centroid; cosine
   compare against `data/hosts.json` references.
6. **Cross-check by aggregate vocative voting, and require agreement.** For each cluster, count
   utterances containing a vocative "Tommy" / "Mike" / "Seth". **The cluster that says "Tommy," most is
   not Tommy.** Ep 544 alone offers 73 "Tommy" mentions and 20 "Mike"; even after discarding brand
   phrases like "with Tommy and Mike" that is a strong episode-level vote.
7. **Quarantine on disagreement.** If enrollment and vocative voting disagree, set
   `presence_source: "quarantined"`, write `presence_confidence`, leave `tommy_present: null`, and stop.
   **Do not guess.** A quarantined episode contributes nothing to the corpus until a human rules.
8. **Emit.** `data/speakers/ep-{N}.jsonl`, `transcripts/tommy/ep-{N}.txt`, and a patched index record.
   Also re-save the full transcript as `transcripts/ep-{N}.txt` with
   `Captions: whisperx-large-v3 [speaker labels]` **only** when `--replace-transcript` is passed, since
   overwriting a cached transcript changes an artifact other agents read.

**Why the vocative signal works in step 6 but failed in §2.4.** The 62.7% result came from *strict
per-turn alternation*, which compounds every `>>` insertion error along the chain. Aggregate voting over
already-diarized clusters uses the same evidence for a single episode-level decision with dozens of
independent votes, and never propagates a local error. Same signal, structurally different exposure to
noise. The `>>` markers themselves are demoted to an optional third check: compare pyannote's turn
boundaries against `>>` positions and log the agreement rate as diagnostics, not as a decision input.

#### Enrollment samples

Enrollment needs clean single-speaker audio per host, 16 kHz mono, ≥ 30 s.

- **Mike: free and abundant, pending Q3.** The Agentic Thinking Podcast (34 videos) is Mike solo per
  §2.9. Pull 60 seconds from the middle of one episode.
- **Tommy: needs one asset. Hard blocker, §10 Q1.** In order of preference: (a) 60 seconds he records
  deliberately, which takes two minutes and is the highest-quality option; (b) a conference talk or
  webinar recording where he is the only speaker; (c) a manually clipped monologue from a cached episode,
  which is circular but workable if the clip is chosen by ear.
- **Seth: not required.** §2.9 explains why an unidentified cluster is acceptable.

**These are voice biometrics of third parties.** Committing Mike's WAV to a repo that backs a public site
is a decision, not a detail. §10 Q2. The `enrollment_embedding` field in `data/hosts.json` exists so the
pipeline can be reproducible from a committed vector without committing the audio.

#### Validation against existing ground truth

Before trusting the pipeline, run it on the **16 corpus episodes that have hand-curated `angles/` files**
and score the automated attribution against the `**Attribution:**` and `**Mike-only**` annotations. That
is **64.0% of the corpus** (§2.5), validated against labels somebody already paid for.

Scoring procedure, and note what it does and does not measure:

1. For each of the 23 `**Attribution:**` assertions and 3 `Mike-only` blocks, locate the claim in the
   episode's `data/speakers/ep-{N}.jsonl` by text search against the quoted or paraphrased material.
2. Record agree / disagree / not-locatable. Not-locatable is common and not a failure, because the ore
   files paraphrase.
3. **Pass condition: zero polarity inversions.** A single episode where the pipeline says Tommy for a
   claim the ore file marks `Mike-only`, or vice versa, is a cluster-swap signal and blocks Phase 1.3
   until diagnosed. Partial disagreements on paraphrased claims are expected and tolerated.
4. **This does not yield a DER.** ~26 claim-level assertions over 15 episodes is a swap detector, not a
   turn-level gold standard. Do not report it as an accuracy figure.

If the pipeline contradicts `ep-549-angles.md:13`, the pipeline is wrong.

### 4.5 Volume, runtime, and disk, recomputed for the demand-driven scope

All figures recomputed for this rewrite. The old plan's table assumed 92 episodes; the numbers below are
for the actual 25-episode corpus, with the rejected scopes retained for contrast.

**Measured basis:**

| Input | Value | How |
| --- | --- | --- |
| Corpus size | 25 episodes | §3.3, freshly computed |
| Duration, measured | **81,945 s = 22.76 h** over 21 files | `Duration:` header. The 4 Notion-sourced files carry none |
| Mean episode duration | **3,902 s = 65.0 min** | 81,945 / 21 |
| Body words, 21 YouTube files | 266,892 | freshly measured |
| Speaking rate | **3.257 words/s = 195 wpm** | 266,892 / 81,945. Realistic for two-host conversation |
| MP3 bitrate | **58.9 MB/hr** (17,145 B/s) | inherited: 67,894,200 B / 3,960 s on ep 558's enclosure |
| 16 kHz mono s16le WAV | 32,000 B/s | format arithmetic |

**Corpus volume:**

| Scope | Episodes | Audio hours | Spoken words | Tommy words @ ~45% |
| --- | --- | --- | --- | --- |
| **Demand-driven corpus (current)** | **25** | **27.1** | **~317,700** | **~143,000** |
| Cached transcript text, for reference | 25 | n/a | 300,266 measured | ~135,000 |
| Two-host era 466–557 (**rejected scope**) | ~92 | ~99.7 | ~1,169,000 | ~526,000 |
| Full archive (**rejected scope**) | 557 | ~603.7 | ~7,079,000 | ~3,185,000 |

The 27.1 h figure estimates the 4 unmeasured episodes (546, 548, 550, 553) at the 65-minute mean, which
is why the estimated spoken-word total (317,700) exceeds the measured cached text (300,266): those four
episodes are cached as condensed Notion notes at 8,344 words average rather than as full transcripts
(§2.1). WhisperX will produce more text for them than the cache holds.

**The ~45% Tommy speech share is UNVERIFIED and remains the largest unmeasured input to Goal 2's
planning.** It is a plausible two-host split, nothing more. Phase 1.3 measures it directly and writes
the real value to `tommy_share` per episode; recompute the corpus estimate from the observed mean at
that point. Nothing downstream depends on the estimate being right, only on the corpus being large
enough, and at any share above ~25% it is.

**Runtime and disk:**

| Quantity | Per episode (65 min mean) | 25-episode corpus |
| --- | --- | --- |
| MP3 transferred | ~64 MB | ~1.56 GB cumulative |
| 16 kHz mono WAV | ~119 MB | ~2.91 GB if retained |
| **Peak transient disk, streaming (recommended)** | **~119 MB** (WAV only, MP3 never lands) | **~119 MB** |
| Peak transient disk, download-then-convert | ~183 MB | ~183 MB |
| **GPU wall time (UNVERIFIED, 10–20 min/ep)** | **10–20 min** | **4.2–8.3 h** |
| VRAM | large-v3 + pyannote 3.1 fit inside 12 GB | n/a |

Compare the rejected scopes: 92 episodes is 15–31 GPU hours; 557 is 93–186 GPU hours plus ~35 GB of
cumulative transfer. **The 25-episode corpus is a single evening, and each subsequent episode is 10–20
minutes.** That is what makes on-demand processing (§3.4) viable rather than aspirational.

The 10–20 min/episode envelope is inherited planning arithmetic, not a measurement. Measure it on the
first episode in Phase 1.2 and correct this table.

### 4.6 Automation and refresh

**Two scripts, both manual, plus a metadata-only CI check later. Diarization never goes in the daily
GitHub Actions build.**

| Script | Language | Runtime | Cost |
| --- | --- | --- | --- |
| `scripts/episodes-sync.mjs` | Node 24, built-ins only (matches `new-post.mjs`, `scan-prompts.mjs`, `auto-tag.mjs`) | ~2 s local-only; ~30 s with network legs | Network only |
| `scripts/diarize_episode.py` | Python 3.12 in `.venv-audio` (matches `fetch_youtube_transcript.py`) | 10–20 min/episode | GPU + ~119 MB transient |

`package.json` additions, all `node scripts/*.mjs` or a venv Python call, no new dependencies:

```
"episodes:sync":        "node scripts/episodes-sync.mjs",
"episodes:sync:check":  "node scripts/episodes-sync.mjs --check",
"episodes:diarize":     "node scripts/episodes-sync.mjs --print-queue",
"voice:lint":           "node scripts/voice-lint.mjs",
"skill:check":          "node scripts/sync-skill.mjs --check",
"skill:report":         "node scripts/sync-skill.mjs --report",
"skill:push":           "node scripts/sync-skill.mjs --push"
```

`episodes:diarize` prints the queue rather than invoking Python, because the venv activation and the GPU
run belong in an explicit shell session, not behind an npm alias that might get run by accident.

**Reusing the daily GitHub Actions build for any of this is a bad idea**, in order of severity:

1. **No GPU on GitHub-hosted runners.** Diarization is the whole point and cannot run there.
2. **YouTube blocks datacenter IPs.** The existing script's own docstring says so: *"If YouTube blocks
   the current network (common from datacenter IPs), run this on your own machine instead"*, and it has
   explicit `"Sign in"` error handling for exactly this. A CI job would fail intermittently and noisily.
3. **The daily build's job is to publish future-dated posts.** Coupling a media pipeline to the thing
   that deploys promptingbi.com means a yt-dlp breakage can block a publish. Bad blast radius.
4. Notion rate limits (observed `429`) would make a scheduled job flaky.

**Acceptable CI scope, as a later step:** a separate workflow, on its own schedule, running
`episodes:sync:check` metadata-only against RSS (no YouTube, no audio, no Notion) and opening an issue
when a new `itunes:episode` appears that is missing from `data/episodes.json`. Cheap, decoupled, cannot
break a deploy.

### 4.7 Goal 1 phases

#### Phase 1.0 — Corpus membership rule and linkage hygiene

Local only. No network, no GPU, no new packages. Shippable on its own.

**Deliverables**

- `scripts/episodes-sync.mjs`, filesystem legs only (`--no-youtube --no-rss --no-notion` path working)
- `data/episodes.json` seeded with the 25 corpus members, metadata fields `null` pending Phase 1.1
- `data/episodes.schema.json`, `data/hosts.json` (roster, no enrollment yet), `data/corpus-pins.json`
- `.gitignore`: `data/audio/`, `data/enrollment/*.wav`, `.venv-audio/`
- `source.transcript` added to the 18 `source.episode` files that lack it (§2.6)
- `package.json`: `episodes:sync`, `episodes:sync:check`

**Steps**

1. Write the front-matter line scanner (bounded by `---` fences, no YAML dependency, §6.1).
2. Implement `computeCorpus()` against P1–P5, reading the filesystem directly.
3. Emit `data/episodes.json` with stable key order; write `data/episodes.schema.json` to match.
4. Add the 18 `source.transcript` lines. Verify each target file exists before writing the line.
5. Run `npm run build` to confirm nothing changed on the site side.

**Acceptance criteria**

- `npm run episodes:sync` twice in a row produces a byte-identical file (idempotent).
- `data/episodes.json` contains exactly 25 records with `corpus: true`, and their `episode` values equal
  the §3.3 list exactly.
- Every `corpus_reason` array is non-empty and every listed predicate independently re-verifies.
- All 20 files with `source.episode` now also have `source.transcript`, and all 20 targets exist on disk.
- `npm run build` succeeds with no new warnings, and `git status` shows no change under `dist/` semantics
  (no site output difference).
- No file under `src/` other than the 18 front-matter blocks was modified.

**Depends on:** nothing. **Effort: 0.5 day.**

#### Phase 1.1 — Full metadata enumeration

**Deliverables**

- `episodes-sync.mjs` YouTube, RSS, and Notion legs
- `data/episodes.json` grown to 557 records, `corpus: false` on the 532 non-members
- Parser audit log listing every unparsed or deduped entry

**Steps**

1. YouTube leg: spawn `yt-dlp --flat-playlist --dump-json`, parse titles case-insensitively, dedupe ep
   539 by longest duration, log the theme song as unparsed.
2. RSS leg: `fetch` the feed, walk the XML without a parser dependency, prefer `<itunes:episode>` with
   the two title fallbacks.
3. Notion leg: query the EMP collection with exponential backoff; skip cleanly on `429` and record
   `sources_seen` without `"notion"`.
4. Outer-join on `EpNum`. Never drop a record present in only one feed.
5. Merge into existing records without touching `corpus*`, `hosts_present`, `tommy_present`,
   `presence_*`, or `guests` when `presence_verified_by` is set.
6. Validate the output against `data/episodes.schema.json` before writing.

**Acceptance criteria**

- 557 records, `episode` values forming 1..557 with zero gaps.
- Exactly one entry in the unparsed log (the theme song), and exactly one dedupe (ep 539).
- 557 records carry a non-null `audio_url`, or the shortfall is enumerated and explained in the log.
- `youtube_id` non-null on 557 records.
- All 25 corpus members from Phase 1.0 still have `corpus: true` and unchanged `corpus_reason`.
- Re-running is idempotent apart from `updated` timestamps; a single new episode produces a single-record
  diff.
- Schema validation passes.

**Depends on:** 1.0. **Effort: 1–1.5 days.**

#### Phase 1.2 — Diarization pipeline, built and validated

**Deliverables**

- `.venv-audio` with pinned `scripts/requirements-audio.txt`
- `scripts/diarize_episode.py`
- `data/enrollment/` populated for Tommy and Mike; `data/hosts.json` enrollment fields filled
- Validation report: the §4.4 scoring run over the 16 angles episodes
- A measured GPU-time-per-episode figure replacing the UNVERIFIED 10–20 min envelope

**Steps**

1. Install the stack per §7. Accept the gated HF model terms manually.
2. Capture enrollment audio (blocked on Q1 and Q3) and write `data/hosts.json`.
3. Build the pipeline steps 1–8 from §4.4 with `--dry-run` support at each stage.
4. Run one episode end to end. Pick **ep 549**: shortest at 47:15, has an angles file with both a
   `Mike-only` block and an `Attribution:` line, and has a published post. Measure wall time.
5. Run the remaining 15 angles episodes. Score per §4.4.
6. Tune only the cluster-identity confidence threshold and the quarantine rule. Do not tune the
   presence floor to make numbers look better.

**Acceptance criteria**

- One command diarizes one episode from `audio_url` to committed outputs, and deletes its WAV even on
  failure.
- **Zero polarity inversions** against the 26 hand-curated assertions across the 16 episodes.
- Enrollment and vocative voting agree on ≥ 14 of the 16 episodes; the remainder land in
  `presence_source: "quarantined"` rather than guessing.
- Ep 338 (three-host) produces ≥ 3 clusters and still identifies a Tommy cluster, or is quarantined.
  Either outcome passes; a confidently wrong two-cluster answer does not.
- Every emitted turn carries `segment_role`, and intro/outro classification is spot-checked on two
  episodes.
- `data/audio/` is empty after the run.
- Measured GPU minutes per episode recorded and §4.5 corrected.

**Depends on:** 1.1; **§10 Q1 and Q2 answered**; Q3 answered or an alternative Mike source found.
**Effort: 2–3 days.**

#### Phase 1.3 — Run the corpus queue

**Deliverables**

- The remaining 9 corpus episodes diarized (338, 411, 484, 494, 529, 539, 541, 542, 544)
- 25 files in `data/speakers/`, and `transcripts/tommy/` populated for every episode where
  `tommy_present` is true
- `tommy_share` measured on 25 episodes, replacing the ~45% assumption
- Quarantine list for manual review

**Steps**

1. `npm run episodes:diarize` to print the queue; confirm it holds exactly the 9 unprocessed members.
2. Run them sequentially. 9 × 10–20 min is 1.5–3 h.
3. Set `corpus_sticky: true` on all 25.
4. Compute the mean and per-episode `tommy_share`; update §4.5.
5. Triage quarantines: listen, rule, set `presence_verified_by: "tommy"`.

**Acceptance criteria**

- 25 of 25 corpus records have `presence_source` other than `"unanalysed"`.
- Every `tommy_present: true` record has a `transcripts/tommy/ep-{N}.txt` that exists and is non-empty.
- No `transcripts/tommy/*.txt` contains a turn with `overlap: true` or `segment_role != "body"`.
- Total Tommy corpus word count is within a factor of 1.5 of the ~143,000 estimate, or the divergence is
  explained (most likely by the real `tommy_share`).
- Quarantine count ≤ 3, each with a written reason.

**Depends on:** 1.2. **Effort: 0.5 day work + 1.5–3 h GPU.**

#### Phase 1.4 — Notion mirror and optional CI check

**Deliverables**

- `Tommy Present` and `YouTube URL` properties written to the EMP database from `data/episodes.json`
- `.github/workflows/episodes-check.yml`, metadata-only, separate from the deploy workflow

**Acceptance criteria**

- The Notion leg is write-only; a subsequent `episodes:sync` produces no diff traceable to Notion.
- The workflow does not touch `.github/workflows/deploy.yml` and cannot fail a deploy.
- A deliberately removed record causes the check job to open an issue, verified once.

**Depends on:** 1.3; **§10 Q4 answered**. **Effort: 0.5 day.**

---

## 5. Goal 2 — ground the writing voice in how Tommy talks

### 5.1 Corpus construction

Input is `transcripts/tommy/ep-{N}.txt`, written by Phase 1.3, one file per episode where
`tommy_present` is true, containing only turns attributed to Tommy above the confidence threshold.

Expected size: **~143,000 words from 25 episodes** at the UNVERIFIED ~45% share (§4.5). Even at a 25%
share that is ~79,000 words, which is ample for phrase-frequency and rhythm statistics. Corpus size is
not a risk; corpus purity is.

Four quality gates, all non-negotiable:

1. **Only high-confidence turns.** A misattributed Mike turn is worse than a missing Tommy turn, because
   it teaches the blog to write as Mike.
2. **Only `segment_role: "body"`.** Excludes news-segment article read-alouds, mailbag question reading,
   sponsor reads, and intro/outro boilerplate. Detect by position (first and last 90 s) and by cue
   phrases ("our first article", "head over to our website", "wherever you get your podcasts",
   "this week's mailbag"). The corpus is for *how he argues*, not *what he reads aloud*.
3. **Only `overlap: false`.** Crosstalk regions are where diarization is least reliable and where the
   text is least likely to be a coherent sentence anyway.
4. **Never from a Notion note or a YouTube auto-caption.** §2.3. WhisperX output on real audio only.

### 5.2 What to extract

`scripts/voice_profile.py` emits counted evidence to `data/voice/profile.json`. **No feature enters the
skill without a number behind it.**

| # | Feature | Method | Output |
| --- | --- | --- | --- |
| 1 | **Distinctive phrases** | 2–6-grams scored by **log-odds ratio with an informative Dirichlet prior** (Monroe/Colaresi/Quinn, "Fightin' Words") **against Mike's corpus** as the contrast set | Ranked phrase bank with counts + episode spread |
| 2 | **Verbal tics** | Same, restricted to discourse markers | Explicit **DROP** list |
| 3 | **Self-answering rhythm** | Turn-internal `?` followed within 15 tokens by a short declarative from the same speaker | Rate per 1,000 words + 20 real examples |
| 4 | **Analogy domains** | Seeded lexicons: food/Italian, sports, family, cars, construction, restaurants, music | Hits per 10,000 words per domain. **Tests `voice-and-style.md:17`'s Italian/food + sports claim against data** |
| 5 | **Sentence length** | Segment on `.?!`, report mean / median / p10 / p90 / % under 8 words | Target band for the linter (§5.6b) |
| 6 | **Opening a take** | First 2 sentences of each Tommy turn following a Mike turn ending in `?` | Bucketed opener constructions |
| 7 | **Signalling disagreement** | Turns matching `I disagree`, `I don't think`, `yeah, but`, `here's where I`, `I push back`, `I'd argue` | Real constructions, ranked |
| 8 | **Hedging** | Rate of `kind of`, `sort of`, `I think`, `probably`, `maybe`, `I would say` | Rate vs Mike's rate |
| 9 | **Emphasis** | Lexical intensifiers + immediate lexical repetition. **Do not mine caps**; ASR capitalization is unreliable | Which words he actually leans on |
| 10 | **Spoken-only filler** | Fixed blacklist calibrated on measured rates: `you know`, `right?`, `like`, `I mean`, `so`, `anyways`, `to your point`, `100%`, `dude`, `totally`, `absolutely` | **DROP** list for the linter |
| 11 | **Vocabulary skew** | Top content words by log-odds vs Mike | The domain nouns he reaches for |

**The contrast-against-Mike design is the load-bearing choice.** Raw frequency on a single corpus returns
podcast-generic filler. Log-odds against a co-host recorded on the same mic, on the same topics, in the
same conversation isolates **what is Tommy** rather than what is podcast.

This requires a Mike corpus, which Phase 1.3 produces as a by-product: the non-Tommy clusters. Write
`transcripts/mike/ep-{N}.txt` alongside `transcripts/tommy/`. Same gates apply. If Q2's ruling forbids
storing Mike's attributed text, fall back to holding the contrast corpus only in memory during the
profile run and committing nothing but the resulting log-odds scores; the script must support that mode.

### 5.3 The speech-to-prose translation layer

This is where a naive implementation makes the blog worse, so the plan is prescriptive.

**Every mined feature is assigned exactly one of three buckets before it can influence a draft.**

| Bucket | Meaning | Examples from the current evidence |
| --- | --- | --- |
| **CARRY** | Durable voice. Reproduce in prose. | Self-answering question rhythm; contrast framing; short blunt verdict sentences; analogy domains; the specific domain nouns; willingness to state a flat disagreement |
| **TRANSLATE** | Real signal, wrong form. Convert per a stated rule. | Spoken triple repetition → **one bolded word**. Three false starts then the landed sentence → **keep only the landed sentence**. Addressing a co-host ("Mike, here's the thing") → **address the reader or drop the vocative**. Spoken hedge stack ("I think it's kind of maybe") → **one hedge or none** |
| **DROP** | Artifact of the medium. Never appears in prose. | Fillers (§5.2 #10); interruption repair; ASR errors; co-host names; news-read and mailbag passages; "we said this on the podcast before" |

Three mechanical rules that keep noise out:

1. **Minimum-3-episodes rule.** No phrase enters the bank unless it appears in **≥ 3 distinct episodes**.
   This single rule kills ASR garbage. The current cache contains `"aentic thinking"`, `"Symbol single
   destination"`, `"parlia.tips"`, and `"VVT"` (for VTT) as real transcription errors. Any one of them
   could otherwise be mined as "his voice". With a 25-episode corpus, 3 episodes is 12% support, which
   is a meaningful bar.
2. **Bucket is mandatory metadata.** A phrase-bank entry without a bucket is invalid, and the
   `voice-from-speech.md` generator refuses to render one. This is what stops the drafting agent from
   reading the bank as "write like this".
3. **The prose corpus is the arbiter of form.** The 17 published posts under
   `src/content/blog/published/**` are the only existing examples of *written* Tommy. Where speech and
   prose conflict on **form**, prose wins. Where they conflict on **stance or vocabulary**, speech wins,
   because speech is the unfiltered signal and the posts were partly agent-written.

Rule 3 also protects the existing hard rules. The spoken corpus contains co-host names in nearly every
turn (ep 544 alone has 73 "Tommy" and 20 "Mike" mentions); a naive pipeline would learn to name Mike,
directly violating `voice-and-style.md:27`. The bucket table makes that a DROP by construction rather
than by hope.

There is corroborating evidence for the anti-em-dash rule sitting in `transcripts/ep-553.txt`: an
extended riff on spotting an em dash in someone's post as a tell that an agent wrote it. The hard rule at
`voice-and-style.md:26` is Tommy's own on-air position, not a style preference. It stays absolute.

### 5.4 How the skill actually changes

**Keep `voice-and-style.md` as the hand-curated normative spec. Add one new sibling reference. Do not
rewrite `voice-and-style.md`.**

Rationale: that file is Tommy-edited and encodes hard-won corrections (the Northside Baseball framing
rule at line 36, the "instruction pages ARE the code worth showing" rule at line 38, the em-dash
prohibition at line 26). Regenerating it from a statistical profile would destroy curated knowledge and
risk contradicting the hard rules. The evidence belongs in a separate, regenerable file.

Proposed edits, exhaustively:

1. **NEW** `references/voice-from-speech.md` (~150–200 lines), regenerable from `data/voice/profile.json`:
   - provenance header: episode count, corpus word count, generation date, `pipeline_version`
   - the **CARRY / TRANSLATE / DROP** table from §5.3, which is the most important content in the file
   - phrase bank: phrase, count, episode spread, bucket
   - measured sentence-length band
   - opener constructions and disagreement constructions, with real examples
   - analogy-domain rates, confirming or correcting the Italian/food + sports claim at line 17
   - the DROP filler list, verbatim, as a checklist
   - a "this file is evidence, `voice-and-style.md` is the spec" precedence note
2. **EDIT** `references/voice-and-style.md`: add **one** line under "The core sound" pointing at the new
   file and stating precedence. Amend line 3's provenance sentence with ", and on a measured corpus of
   his speech (see voice-from-speech.md)". Nothing else.
3. **EDIT** `SKILL.md` Step 5: add `references/voice-from-speech.md` to the read-before-drafting list,
   with one clause noting it is evidence subordinate to the spec.
4. **NEW** `scripts/voice_profile.py` (§6.3).
5. **NEW** `scripts/voice-lint.mjs` (§6.4).

**Rejected: rewriting `voice-and-style.md` from the corpus.** Destroys curated edit notes; risks the
agent "learning" to name co-hosts and use spoken filler; and mixes a hand-tuned normative document with
a regenerable artifact so neither can be updated safely.

**Rejected: putting the phrase bank inline in `voice-and-style.md`.** It would triple the file's length
with tabular data, burying the hard rules the drafting agent most needs to see. The file is 45 lines
today and its brevity is a feature.

### 5.5 Skill-drift reconciliation (D4)

Tommy adjudicates file by file. No blanket port.

**Phase 2.0a is delivered.** `plans/skill-drift-reconciliation.md` is the diff report this plan called
for: hashes, full reads of both sides, line-level `Compare-Object`, and a per-file verdict with
reasoning, awaiting his ruling. Nothing has been merged. Read that document, not this section, for the
detail. Its verdicts, for orientation:

| File | Verdict in the report | Note |
| --- | --- | --- |
| `references/voice-and-style.md` | **Take global wholesale.** Repo has lost five hard-won rules and gained nothing | Confirms the destructive-order hazard in §1.1 is real and live |
| `SKILL.md` | **Merge.** Port global's three missing blocks into repo, keep repo's `source` contract, fix a duplicate paragraph, and one transcript-path question needs Tommy | The only file with an open question |
| `references/publishing-targets.md` | **Take repo wholesale.** Global actively forbids a field the live schema requires | Reverses this plan's earlier "needs Tommy" guess |
| `references/image-style.md` | **No content difference at all.** Line endings only, repo CRLF vs global LF | Reclassified from editorial to mechanical |
| `references/article-structure.md`, `scripts/fetch_youtube_transcript.py` | Identical | Nothing to do |

So Phase 2.0a's remaining work is Tommy reading that report and ruling, plus one narrow decision on the
`SKILL.md` transcript path. `scripts/sync-skill.mjs --report` still gets built, but as a **regenerator**
for the next time the copies drift, not to produce a report that already exists. It should emit the same
shape: per-file hashes re-measured at run time, a unified diff with repo as the "before" side, a
plain-language summary of what each side has that the other lacks, a recommendation of `repo wins` /
`global wins` / `merge both` / `needs Tommy`, and a ruling checkbox.

**Phase 2.0b: apply the ruling, then build the guard.**

1. Apply Tommy's per-file ruling to the in-repo tree. Commit.
2. **Declare in-repo `.cursor/skills/writing-promptingbi-articles/` the single source of truth.** It is
   version-controlled; the global copy is not.
3. Write `data/skill-sync.json` recording the ruling: date, per-file decision, and the repo-side hash
   after the merge.
4. Only now is `sync-skill --push` (repo → global) permitted. The script refuses until the ledger's
   recorded hashes match the current repo files (§6.5).
5. Wire `skill:check` into `npm run build`'s pre-step alongside `scan-prompts --quiet`, **warning only**.
   Drift becomes visible on every build instead of discovered months later.

**The destructive-order rule, restated because it is the one thing in this plan that can lose work:** a
repo → global push before step 1 overwrites the five extra `voice-and-style.md` bullets, and the global
copy has no version history. Never run `--push` before the ledger exists.

### 5.6 Validation and rollback

Three layers.

**(a) Blind A/B regeneration diff.** Pick two published posts whose episodes are corpus members with
angles files. Default: `published/2026-08/2026-08-24-ai-coe-better-not-bigger.md` (ep 529) and
`published/2026-08/2026-08-26-hard-data-soft-data.md` (ep 539). Note that neither has an angles file
(both are in the 9 without one, §3.3), so if a labelled ore file is wanted for the regeneration input,
substitute two of the 16 that do. That is §10 Q6.

For each, regenerate **one middle section** twice from the same transcript and angle file, once with the
current skill and once with the new profile loaded. Present both to Tommy unlabelled alongside the
published original. Success is Tommy preferring the new-profile version on at least 3 of 4 pairs. This is
subjective, and it should be, because the target is his ear.

**(b) `scripts/voice-lint.mjs`, calibrated on his own published posts.**

| Check | Threshold |
| --- | --- |
| em dash (U+2014) count | **exactly 0** (hard rule, `voice-and-style.md:26`) |
| co-host names (`Mike`, `Seth`, `Carlo`, `Bauer`), word-boundary matched | **exactly 0** (hard rule, line 27) |
| episode-reference phrases ("in this episode", "we discussed", "on the show") | 0 |
| DROP-list filler | 0, excluding code blocks, inline code, and quotes |
| mean sentence length | inside the measured band from §5.2 #5 |
| self-answering questions | ≥ 1 per post |
| analogy-domain hits | ≥ 1 from a seeded domain |
| ALL-CAPS emphasis | ≤ 3 occurrences, single words only |

**Calibration is the critical step and must come first: run the linter against all 17 existing published
posts and tune thresholds until they pass.** If the linter fails Tommy's own published work, the
thresholds are wrong, not the posts. Skipping this produces a linter that fights the house style. It
also gives a free regression suite: any future change to the profile can be re-run against 17 known-good
documents.

**(c) Corpus spot-check.** Sample 30 random attributed turns from `transcripts/tommy/*.txt` and have
Tommy confirm they sound like him. Cheap, and it catches systematic cluster-swap errors that every
automated check would miss, because a swapped corpus is internally consistent.

**Rollback path.** Every change is additive or one line.

1. `git tag pre-voice-profile` before starting Phase 2.1.
2. Revert = delete `references/voice-from-speech.md`, revert the one line plus the provenance clause in
   `voice-and-style.md` and the one clause in `SKILL.md`, run `sync-skill --push`. Two file reverts and
   one deletion.
3. `data/`, `transcripts/tommy/`, and the scripts are inert if the skill does not reference them. They
   can stay for Goal 1's sake even if Goal 2 is rolled back entirely.
4. The linter ships as a **warning-only** `npm run voice:lint`, **never wired into `npm run build` as a
   failure**. A voice heuristic must not be able to block a deploy. `--strict` exists for local use and
   is never referenced from `package.json`'s `build`.
5. The Phase 2.0 reconciliation is *not* rollback-safe on the global side and never will be, which is why
   it is gated by a ledger rather than by a revert path.

### 5.7 Goal 2 phases

#### Phase 2.0 — Skill drift reconciled

**Deliverables:** `plans/skill-drift-reconciliation.md` (2.0a, **already delivered**); Tommy's ruling
applied, `data/skill-sync.json`, `scripts/sync-skill.mjs` with `--check` / `--report` / `--push` (2.0b);
`skill:check` in the build pre-step, warning-only.

**Acceptance criteria**

- Tommy has ruled on all four divergent files, including the `SKILL.md` transcript-path question.
- `sync-skill --report` re-measures both trees at run time and never cites a table from a plan document.
- Every divergent file in a regenerated report has a recommendation with reasoning and a ruling checkbox.
- After 2.0b, `skill:check` reports zero drift, and re-running `--push` is a no-op.
- `--push` refuses with a non-zero exit when `data/skill-sync.json` is absent or its hashes are stale.
  **Test this deliberately before the first real push.**
- `npm run build` still succeeds; `skill:check` cannot fail it.
- The five global `voice-and-style.md` bullets are present in the in-repo file, or Tommy explicitly
  ruled otherwise and the ruling is recorded.

**Depends on:** nothing. Can start immediately, independent of all of Goal 1.
**Effort: 0.25 day (2.0a) + 0.5 day (2.0b) + his review.**

#### Phase 2.1 — Voice profile

**Deliverables:** `scripts/voice_profile.py`, `data/voice/profile.json`, `transcripts/mike/` (or the
in-memory contrast mode, per Q2).

**Acceptance criteria**

- Runs against `transcripts/tommy/` and produces all 11 features from §5.2.
- Every phrase-bank entry carries `count`, `episodes` (≥ 3), and `bucket: null` awaiting the 2.2 pass.
- Zero entries containing a known ASR error from the `aentic thinking` / `VVT` / `parlia.tips` class.
  Grep for them explicitly as a test.
- The analogy-domain table either confirms or contradicts `voice-and-style.md:17`, and the result is
  stated either way.
- Sentence-length band is reported with p10/p90, not just a mean.
- Re-running on unchanged input produces an identical file apart from the generation timestamp.

**Depends on:** 1.3, or 1.2 if the 16 validated episodes alone are enough to start.
**Effort: 1.5 days.**

#### Phase 2.2 — The new reference file

**Deliverables:** `references/voice-from-speech.md`; the one-line edit to `voice-and-style.md`; the one
clause in `SKILL.md` Step 5.

**Acceptance criteria**

- Every phrase-bank entry has a non-null bucket. The generator errors out on a null.
- The file states its provenance (episode count, word count, date, `pipeline_version`) in the first five
  lines.
- The precedence note is present and unambiguous.
- **Tommy has reviewed the phrase bank and the bucket assignments.** This is a human gate, not a check.
- `voice-and-style.md` diff is exactly two lines: the new pointer and the amended provenance sentence.
- `SKILL.md` diff is one line.
- `skill:check` reports drift, and `skill:push` propagates cleanly.

**Depends on:** 2.0b, 2.1. **Effort: 1 day + his review.**

#### Phase 2.3 — Voice linter

**Deliverables:** `scripts/voice-lint.mjs`, `voice:lint` in `package.json`, calibration output.

**Acceptance criteria**

- **All 17 existing published posts pass with zero errors.** This is the gate; if they do not, tune the
  thresholds, not the posts.
- Code blocks, inline code, blockquotes, front matter, and image alt text are excluded from every check.
  Test with a post containing `Mike` inside a code block.
- U+2014 is reported as an error; U+2013 is reported as info, not an error.
- Exit code is 0 without `--strict` even when checks fail.
- `voice:lint` is not referenced anywhere in `npm run build`.

**Depends on:** 2.2. **Effort: 1 day.**

#### Phase 2.4 — Validation and go/no-go

**Deliverables:** the A/B pack, the 30-turn spot-check, a written go/no-go.

**Acceptance criteria**

- Four unlabelled pairs presented; Tommy prefers the new-profile version on ≥ 3.
- 30-turn spot-check returns no systematic misattribution.
- A written decision recorded in this file's status header.

**Depends on:** 2.2, 2.3; **§10 Q6 answered**. **Effort: 0.5 day + his review.**

---

## 6. Script skeletons

Real signatures, flags, I/O, and the specific defects each must handle. **Node scripts use Node 24
built-ins only.** `AGENTS.md` forbids adding npm dependencies without asking, and nothing here needs one:
`fetch` is global, XML and front matter are parsed with bounded line scanners rather than a library, and
`yt-dlp` is invoked through `node:child_process`.

### 6.1 `scripts/episodes-sync.mjs`

```
node scripts/episodes-sync.mjs
    [--check]              # compute, diff against the committed file, exit 1 on drift, write nothing
    [--print-queue]        # list corpus members with presence_source "unanalysed", then exit
    [--only 541,544]       # restrict merging to these episode numbers
    [--no-youtube] [--no-rss] [--no-notion]
    [--quiet]
```

```js
// ---- I/O ----
// reads:  transcripts/*.txt, src/content/blog/{published,drafts,backlog}/**/*.md,
//         src/content/blog/angles/ep-*-angles.md, data/corpus-pins.json,
//         data/episodes.json (existing), data/episodes.schema.json
// writes: data/episodes.json  (unless --check or --print-queue)
// network: yt-dlp playlist dump, RSS fetch, Notion query. All three optional.

const PLAYLIST_ID = 'PLn1m_aBmgsbHr83c1P6uqaWF5PLdFzOjj';
const RSS_URL = 'https://anchor.fm/s/5bb46378/podcast/rss';

/** yt-dlp --flat-playlist --dump-json, one JSON object per line. */
async function fetchPlaylist(playlistId) {}            // -> Promise<RawVideo[]>

/** Case-insensitive, three patterns, in priority order. Returns null on no match. */
function parseEpNum(title) {}                          // -> number | null

/** Fetch + bounded XML walk. No parser dependency. */
async function fetchRss(url) {}                        // -> Promise<RssItem[]>

/** Notion EMP collection with exponential backoff; resolves [] on 429 exhaustion. */
async function fetchNotion() {}                        // -> Promise<NotionRow[]>

/** Reads only the front-matter block between the first two '---' fences. */
function readFrontMatterEpisode(filePath) {}           // -> number | null

/** Walk published/ + drafts/ + backlog/. angles/ excluded: P2 covers it by filename. */
async function scanPostReferences() {}                 // -> Map<number, string[]>

/** stat()s real files. Never reads a cached index or manifest. */
async function scanFilesystemArtifacts() {}            // -> { transcripts:Set, angles:Set }

/** Applies P1..P5 from §3.1. */
function computeCorpus({ transcripts, angles, posts, pins, existing }) {}
                                                       // -> Map<number, string[]>  (episode -> reasons)

/** Field-level merge. Human and derived fields are protected; see defect 7. */
function mergeRecord(existing, incoming) {}            // -> Record

/** Stable key order, 2-space indent, trailing newline. */
async function writeIndex(records) {}

/** Structural validation against data/episodes.schema.json, hand-rolled. */
function validate(records) {}                          // -> string[] of errors
```

Defects it must handle, each observed:

| # | Defect | Handling |
| --- | --- | --- |
| 1 | 37 titles use lowercase `ep.` | `/\bep\.?\s*(\d{1,3})\b/i` first, then `/\bepisode\s+(\d{1,3})\b/i`, then `/^(\d{1,3})\s*[-:]/` |
| 2 | Ep 539 has two uploads with identical titles | Dedupe by `EpNum`, keep the longest `duration`, log the discard |
| 3 | Theme song `QejIXrDE1t4` has no episode number | Log to the unparsed list and skip. Never guess |
| 4 | RSS is one episode ahead of YouTube | Outer join. Record `sources_seen`; never inner-join |
| 5 | 25 holes in `itunes:episode` | Title fallbacks per defect 1 |
| 6 | Notion returns `429 rate_limited` with `retry_after` | Exponential backoff, honour `retry_after`, then give up and omit `"notion"` from `sources_seen`. Never fail the run |
| 7 | A human has verified a record | When `presence_verified_by` is truthy, never write `hosts_present`, `tommy_present`, `tommy_share`, `presence_source`, `presence_confidence`, or `guests` |
| 8 | Membership churn evicts an attributed episode | `corpus_sticky: true` pins membership permanently (§3.2). Ep 537 is the worked example |
| 9 | **A cached code-search index reported two files that do not exist on disk** | Always `stat` and read. Never consult a search index, a glob cache, or a manifest. This defect was hit during this rewrite and would have inflated the corpus count |
| 10 | No YAML dependency permitted | Front-matter reader scans lines between the first two `---` fences for `/^\s+episode:\s*(\d+)/`. Nested one level under `source:` is the only shape in use; assert it and error loudly on anything else |
| 11 | A malformed write corrupts the source of truth | Validate before writing; write to `data/episodes.json.tmp` and rename |

Exit codes: `0` success or no drift; `1` drift under `--check`; `2` fetch or validation failure.

### 6.2 `scripts/diarize_episode.py`

```
python scripts/diarize_episode.py --episode 541
    [--audio-url URL]            # default: read from data/episodes.json
    [--local-file PATH]          # skip download entirely
    [--model large-v3]
    [--min-speakers 1] [--max-speakers 4]
    [--device cuda]
    [--keep-wav]                 # debugging only
    [--replace-transcript]       # overwrite transcripts/ep-{N}.txt; off by default
    [--dry-run]                  # run stages, write nothing
    [--force]                    # overwrite an existing data/speakers/ep-{N}.jsonl
```

```python
# ---- I/O ----
# reads:  data/episodes.json, data/hosts.json, data/enrollment/*.wav
# writes: data/speakers/ep-{N}.jsonl, transcripts/tommy/ep-{N}.txt,
#         transcripts/mike/ep-{N}.txt, patched record in data/episodes.json
# transient: data/audio/ep-{N}.wav, deleted in a finally block

HOTWORDS = ("Microsoft Fabric, Power BI, DAX, semantic model, MCP, Copilot, "
            "OneLake, Direct Lake, medallion, Tabular Editor, Explicit Measures")

def fetch_audio(url: str, out_wav: Path) -> Path: ...
    # ffmpeg -nostdin -i <url> -vn -ac 1 -ar 16000 -c:a pcm_s16le <out>
    # streams; the mp3 never lands on disk

def transcribe(wav: Path, model: str, hotwords: str) -> dict: ...
    # WhisperX / faster-whisper, word-level timestamps

def diarize(wav: Path, min_speakers: int, max_speakers: int) -> "Annotation": ...
    # pyannote/speaker-diarization-3.1. num_speakers is NEVER pinned

def assign_words(asr: dict, diar: "Annotation") -> list[Turn]: ...
    # also sets Turn.overlap from pyannote's overlap regions

def classify_segment_roles(turns: list[Turn]) -> list[Turn]: ...
    # body | intro | outro | news-read | mailbag | sponsor
    # position rule: first/last 90 s. cue phrases per §5.1 gate 2

def cluster_embeddings(wav: Path, turns: list[Turn]) -> dict[str, "np.ndarray"]: ...

def identify_by_enrollment(centroids, hosts) -> dict[str, tuple[str, float]]: ...
    # cosine similarity against data/hosts.json references

def identify_by_vocative(turns: list[Turn], hosts) -> dict[str, tuple[str, float]]: ...
    # the cluster that says "Tommy," most is NOT Tommy.
    # exclude brand phrases: "with Tommy and Mike", "Tommy and Mike here"

def cross_check_turn_boundaries(turns, cached_transcript_path) -> float: ...
    # optional diagnostics only: agreement rate against '>>' positions.
    # NEVER a decision input (§2.4)

def reconcile(enroll, vocative) -> tuple[dict, float, bool]: ...
    # -> (cluster->host mapping, confidence, quarantined)
    # disagreement => quarantined=True, mapping left partial

def write_turns(episode: int, turns: list[Turn]) -> Path: ...
def write_host_corpus(episode: int, turns: list[Turn], host_id: str) -> Path | None: ...
    # only segment_role == "body" and overlap == False and conf >= threshold

def patch_index(episode: int, stats: dict) -> None: ...
    # tommy_present, tommy_speaking_seconds, tommy_share, presence_*, pipeline_version
```

Defects it must handle:

| # | Defect | Handling |
| --- | --- | --- |
| 1 | pyannote models are gated on HF; downloads 401 even with a valid token until terms are accepted | Probe at startup; on 401 print the exact model names and the accept URL, then exit 3 |
| 2 | Forcing two speakers breaks the three-host era and guest episodes | `max_speakers=4`. Ep 338 (13 "Seth" mentions) is in the corpus |
| 3 | Crosstalk | Mark `overlap: true` and exclude those turns from every corpus |
| 4 | Enrollment and vocative voting disagree | `presence_source: "quarantined"`, `tommy_present: null`, exit 0 with a warning. Never guess |
| 5 | Only some clusters are identifiable | Label the rest `unknown-a`, `unknown-b`. Identifying Tommy does not require identifying everyone (§2.9) |
| 6 | ASR errors of the `aentic thinking` / `VVT` / `parlia.tips` class | `large-v3` instead of auto-captions, plus `HOTWORDS`. Residual errors are caught by the min-3-episodes rule downstream |
| 7 | Re-running destroys reviewed output | Refuse to overwrite an existing `data/speakers/ep-{N}.jsonl` without `--force` |
| 8 | 119 MB WAV per episode | Delete in `finally` unless `--keep-wav`. Assert `data/audio/` is empty at exit |
| 9 | CUDA OOM on a long episode | Catch, retry with a smaller batch, then `large-v2`. Record the downgrade in `pipeline_version` so the record is honest about it |
| 10 | Overwriting a cached transcript changes an artifact other agents read | `--replace-transcript` is opt-in and rewrites the header per `transcripts/README.md` |
| 11 | Notion notes and auto-captions look like usable input | The script reads audio only. It has no code path that ingests a cached transcript as corpus text (§2.3) |

### 6.3 `scripts/voice_profile.py`

```
python scripts/voice_profile.py
    [--corpus transcripts/tommy]
    [--contrast transcripts/mike]      # or --contrast-from-turns to build in memory (Q2)
    [--min-episodes 3]
    [--top 200]
    [--out data/voice/profile.json]
```

```python
def load_corpus(d: Path) -> dict[int, str]: ...              # episode -> text
def ngrams(text: str, lo: int = 2, hi: int = 6) -> Counter: ...

def log_odds_dirichlet(target: Counter, contrast: Counter,
                       prior: Counter) -> dict[str, float]: ...
    # Monroe/Colaresi/Quinn "Fightin' Words". prior = target + contrast

def episode_spread(term: str, per_episode: dict[int, Counter]) -> int: ...
def self_answer_rate(turns) -> tuple[float, list[str]]: ...   # ? then short declarative <=15 tokens
def analogy_domains(text: str, lexicons: dict) -> dict[str, float]: ...   # hits / 10k words
def sentence_stats(text: str) -> dict: ...                    # mean, median, p10, p90, pct_under_8
def openers(turns) -> Counter: ...                            # first 2 sentences after a Mike '?'
def disagreement_constructions(turns) -> list[str]: ...
def hedge_rates(target: str, contrast: str) -> dict: ...
def filler_rates(text: str) -> dict: ...
def emit(profile: dict, out: Path) -> None: ...               # bucket: null on every phrase entry
```

Defects it must handle:

| # | Defect | Handling |
| --- | --- | --- |
| 1 | ASR garbage mined as voice | `--min-episodes 3` gate, applied before ranking, not after |
| 2 | No contrast corpus on the first run | Degrade to raw frequency, tag every entry `contrast: "none"`, and **refuse to emit any CARRY suggestion**. Raw frequency finds podcast-generic filler, not Tommy |
| 3 | Q2 forbids storing Mike's attributed text | `--contrast-from-turns` reads `data/speakers/*.jsonl`, builds the contrast counter in memory, commits only scores |
| 4 | ASR capitalization is unreliable | Never mine caps for emphasis. §5.2 #9 uses lexical signals only |
| 5 | Intro/outro and mailbag text leaks in | Assert every input file was written under the §5.1 gates; error if a turn with a non-`body` role is present |
| 6 | A bucket-less entry reaches the skill | Emit `bucket: null`; the 2.2 generator refuses to render nulls |
| 7 | Non-determinism | Sort every output collection; no dict-iteration-order dependence |

### 6.4 `scripts/voice-lint.mjs`

```
node scripts/voice-lint.mjs <path...>
    [--calibrate]                       # run over all published posts, print distributions
    [--profile data/voice/profile.json]  # source of the sentence-length band
    [--json]
    [--strict]                          # exit 1 on failure. NEVER used from npm run build
```

```js
/** Strips front matter, fenced code, inline code, blockquotes, and image alt text. */
function proseOnly(markdown) {}                        // -> string

function checkEmDash(prose) {}      // U+2014 => error; U+2013 => info
function checkCohostNames(prose) {} // word-boundary /\b(Mike|Seth|Carlo|Bauer)\b/
function checkEpisodeRefs(prose) {}
function checkFiller(prose, dropList) {}
function checkSentenceBand(prose, band) {}
function checkSelfAnswering(prose) {}
function checkAnalogyDomains(prose, lexicons) {}
function checkCapsEmphasis(prose) {}

/** Runs every check, returns findings. Exit code is 0 unless --strict. */
async function lint(paths, opts) {}
```

Defects it must handle:

| # | Defect | Handling |
| --- | --- | --- |
| 1 | "Mike" legitimately inside a code block or a quoted transcript line | `proseOnly()` strips those regions before any check |
| 2 | Substring false positives ("Mikey", "microphone") | Word-boundary matching, case-sensitive on proper nouns |
| 3 | En dash confused with em dash | U+2014 is the error; U+2013 is reported as info. The hard rule names em dashes |
| 4 | Thresholds fight the house style | `--calibrate` prints the distribution across all 17 published posts; thresholds are set from that, not invented |
| 5 | A voice heuristic blocking a deploy | Default exit 0. `--strict` is never referenced from `package.json`'s `build` (§5.6 rollback item 4) |
| 6 | Profile absent | Fall back to skipping the sentence-band check with a warning, not a crash |

### 6.5 `scripts/sync-skill.mjs`

```
node scripts/sync-skill.mjs
    --check          # hash table, exit 0 (build pre-step); exit 1 with --strict
    --report         # write plans/skill-drift-report.md, change nothing
    --push           # repo -> global. GATED. Never the reverse
    [--file references/voice-and-style.md]
    [--dry-run] [--strict]
```

```js
const REPO   = '.cursor/skills/writing-promptingbi-articles';
const GLOBAL = path.join(os.homedir(), '.claude/skills/writing-promptingbi-articles');
const LEDGER = 'data/skill-sync.json';

async function inventory(root) {}          // -> Map<relPath, {bytes, sha256}>
function compare(a, b) {}                  // -> {same[], differ[], repoOnly[], globalOnly[]}
async function writeReport(diffs, out) {}   // unified diff + per-file recommendation + ruling checkbox
async function readLedger() {}              // -> {ruledAt, decisions, repoHashes} | null

/** Refuses unless the ledger exists AND its repoHashes match the current repo files. */
async function assertPushAllowed() {}       // throws with an explanatory message otherwise

async function push({ dryRun }) {}          // repo -> global, only after assertPushAllowed()
```

Defects it must handle:

| # | Defect | Handling |
| --- | --- | --- |
| 1 | **A push before reconciliation destroys the five global `voice-and-style.md` bullets, unrecoverably** | `assertPushAllowed()` gates every write. Test the refusal path before the first real push |
| 2 | The ledger goes stale after further repo edits | Compare recorded `repoHashes` against current files; refuse on mismatch and tell the user to re-run `--report` |
| 3 | A pull direction gets added later "for convenience" | There is no `--pull`. Do not add one. The global copy has no version history, so it can never be an authority |
| 4 | Drift check failing a build | `--check` exits 0 by default and prints a table. `--strict` exists for local use only |
| 5 | The global directory does not exist on a different machine | `--check` reports "global copy absent" and exits 0; `--push` creates it |
| 6 | Reference tables in this plan go stale | `--report` always re-measures; it never reads §2.10 |

---

## 7. Tooling and Windows install steps

Verified present 2026-08-28 (§2.11): Python 3.12.10, yt-dlp 2026.07.04, ffmpeg 8.0-full, Node v24.16.0,
RTX 4070 (12,282 MiB, driver 610.88), `HF_TOKEN` set.

To install. **Use an isolated venv** so the diarization stack cannot disturb the global Python that
`fetch_youtube_transcript.py` uses.

```powershell
cd C:\Github\Prompting-BI
python -m venv .venv-audio
.\.venv-audio\Scripts\Activate.ps1

# PyTorch with CUDA. VERIFY the current index URL at pytorch.org/get-started/locally
# before running; the cu-suffix moves with each release.
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu128

pip install whisperx pyannote.audio ctranslate2 faster-whisper
pip install requests feedparser

pip freeze > scripts\requirements-audio.txt

python -c "import torch; print(torch.__version__, torch.cuda.is_available())"   # expect True
```

Manual, one-time, cannot be scripted: sign in to huggingface.co and **accept the gated model terms** for
`pyannote/speaker-diarization-3.1` and `pyannote/segmentation-3.0`. Downloads return 401 without this
even with a valid token.

Node side: **no new npm dependencies.** `episodes-sync.mjs`, `sync-skill.mjs`, and `voice-lint.mjs` run
on Node 24 built-ins (`fetch`, `node:fs/promises`, `node:path`, `node:crypto`, `node:child_process` for
yt-dlp) plus the Notion MCP for the Notion leg. `AGENTS.md` forbids adding npm dependencies without
asking, and this plan does not need to.

Add to `.gitignore`: `data/audio/`, `data/enrollment/*.wav`, `.venv-audio/`.

**Version pins that remain unverified** (nothing is installed, and installing into Tommy's environment
was out of scope for a read-only investigation): current `whisperx`, `pyannote.audio`, `torch`, and
`faster-whisper` releases, and the correct CUDA wheel suffix. Resolve at install time and pin via the
`pip freeze` above.

**Also UNVERIFIED:** real-world diarization accuracy on this specific audio. Published DER figures for
`speaker-diarization-3.1` do not transfer cleanly to a two-host remote-recorded podcast with crosstalk.
Phase 1.2's validation against the 16 `angles/` files exists precisely to bound it rather than assume it,
and §2.5 is explicit that it bounds swaps rather than measuring DER.

---

## 8. Effort summary

| Phase | Work | Elapsed | Blocked by |
| --- | --- | --- | --- |
| 1.0 Corpus rule + linkage hygiene | 0.5 day | 0.5 day | nothing |
| 2.0a Skill drift report | **done** (`plans/skill-drift-reconciliation.md`) | + his ruling | nothing |
| 2.0b Apply ruling + `sync-skill.mjs` | 0.5 day | 0.5 day | 2.0a ruling |
| 1.1 Metadata enumeration, 557 records | 1–1.5 days | 1–2 days | 1.0 |
| 1.2 Diarization pipeline + validation | 2–3 days | 3–4 days | 1.1, **Q1**, **Q2**, Q3 |
| 1.3 Run the 25-episode queue | 0.5 day | 0.5 day + 1.5–3 h GPU | 1.2 |
| 1.4 Notion mirror + optional CI | 0.5 day | 0.5 day | 1.3, Q4 |
| 2.1 Voice profile script | 1.5 days | 1.5 days | 1.3 (or 1.2) |
| 2.2 New reference file | 1 day | + his review | 2.0b, 2.1 |
| 2.3 Voice linter | 1 day | 1 day | 2.2 |
| 2.4 Validation + go/no-go | 0.5 day | + his review | 2.2, 2.3, Q6 |
| **Total** | **~9–10.5 days** | **~2.5–3 calendar weeks** with review cycles | |

The demand-driven scope does not shrink the total much, because the savings on the batch run (92
episodes to 25, roughly 15–31 GPU hours down to 1.5–3) are offset by the new Phase 1.0 and the split
Phase 2.0. What it does change is the **marginal** cost: after Phase 1.3, each newly referenced episode
costs 10–20 minutes of GPU and no human time.

**Shippable increments:**

- **Phase 1.0 alone** (0.5 day) closes the `source.transcript` gap on 18 files and gives a computable
  corpus definition. Useful even if nothing else happens.
- **Phase 1.0 + 1.1** gives a complete 557-episode index with canonical links, which is most of Goal 1's
  stated value, with no GPU and no enrollment.
- **Phase 2.0 alone** resolves a live drift problem and installs the guard against it recurring.
  Independent of everything in Goal 1.

---

## 9. Risks and mitigations

Re-rated for the demand-driven scope. Changes from the previous draft are marked.

| # | Risk | Severity | Mitigation |
| --- | --- | --- | --- |
| **1** | **Cluster→identity swap silently poisons the corpus.** A swapped episode is internally consistent, so no downstream check notices, and the blog learns to write in Mike's voice. | **Highest** | Require enrollment **and** aggregate vocative voting to agree; quarantine on disagreement. **Validate against 16 of 25 episodes, 64.0% coverage, up from 17.4% under the old scope.** Store `presence_confidence`. Min-3-episodes rule on the phrase bank. Human spot-check of 30 turns (§5.6c) |
| **2** | **A Notion meeting-note `<summary>` is mistaken for speech.** It is an automation-written article; the `<transcript>` block is a placeholder until a second deliberate fetch. This has already caused a misattribution problem here. | **High (new row)** | §2.3. The corpus is sourced only from WhisperX on real audio. `diarize_episode.py` has no code path that ingests a cached transcript as corpus text (§6.2 defect 11) |
| 3 | ASR errors contaminate the phrase bank (`aentic thinking`, `VVT`, `parlia.tips`, `Symbol single destination` all present today) | High | WhisperX `large-v3` instead of auto-captions; domain hotword prompt; min-3-episodes rule; explicit grep test in Phase 2.1's acceptance criteria |
| 4 | **Three-host era is now in scope**, not scoped away: ep 338 is a corpus member with 13 "Seth" mentions | **High (raised from the old "scoped away" framing)** | Never pin `num_speakers`; `max_speakers=4`; label unidentified clusters `unknown-*`. Identifying Tommy does not require identifying everyone (§2.9). Seth enrollment optional |
| 5 | Enumeration parser breaks on title drift (37 lowercase `ep.`, ep 539 duplicate, "No Ads" variants, three title eras) | Medium | §4.1 rules 1–6; retain `youtube_title` raw for auditing; log unparsed entries |
| 6 | **Reading a stale search index instead of the filesystem inflates the corpus.** Hit during this rewrite: two reported `source.episode` files did not exist. | **Medium (new row)** | §6.1 defect 9. `stat` and read real files; never consult an index, glob cache, or manifest |
| 7 | Skill drift worsens once a fifth reference file exists, and the global copy is being edited right now (two of six sizes moved during this plan's lifetime) | Medium | Phase 2.0 **first**; `skill:check` in the build pre-step; `--push` ledger-gated (§6.5) |
| 8 | **A `sync-skill --push` before reconciliation destroys the five global `voice-and-style.md` bullets with no recovery path** | **Medium, but irreversible** | `assertPushAllowed()` (§6.5 defect 1). Test the refusal path before the first real push. There is deliberately no `--pull` |
| 9 | Naive "write like the transcript" degrades the blog | Medium | The whole of §5.3. Buckets are mandatory metadata; prose wins on form |
| 10 | Voice linter fights the house style | Medium | Calibrate on the 17 published posts before use. Warning-only, never a build gate |
| 11 | **Voice biometrics of third parties committed to a public repo** | Medium | `data/enrollment/*.wav` gitignored; commit at most an `enrollment_embedding` vector, or nothing. Needs Tommy's ruling (§10 Q2) |
| 12 | Audio volume and GPU runtime | **Low (down from Medium: 33 GB → ~1.56 GB cumulative, ~119 MB transient, 4.2–8.3 GPU hours)** | Stream → convert → delete, never store. `data/audio/` gitignored. Assert the directory is empty at exit |
| 13 | Notion rate limits (observed `429`) | Low | Exponential backoff; the Notion leg is optional and skippable |
| 14 | YouTube blocks or yt-dlp breaks | Low | Never in CI (§4.6). RSS is an independent path for everything except the video id |
| 15 | Corpus membership churns as editorial work moves files (ep 537 is a live example) | Low | `corpus_sticky` (§3.2). Attributed episodes never lapse |
| 16 | Index drifts from reality as episodes ship | Low | `episodes:sync` is idempotent; the optional metadata-only CI check opens an issue on new episodes |

---

## 10. Open questions, in blocking order

Reduced to what is genuinely unanswered. D1–D5 in §1.1 settled scope, method, index visibility,
reconciliation process, and start timing. The Phase 2.0a drift ruling is a scheduled review deliverable
(§5.5), not an open question.

**Q1. Can you record 60 seconds of clean solo audio for enrollment?**
Hard blocker on Phase 1.2, and therefore on 1.3, 2.1, 2.2, 2.3, 2.4. D1's local pipeline identifies
clusters by comparing them against a reference recording of your voice, so there is no path around this.
Fastest and highest-quality option is two minutes of your time. Alternative: name a conference talk or
webinar where you are the only speaker for at least 30 continuous seconds. Third option, workable but
circular: point at a monologue stretch in a cached episode and I clip it by ear.

**Q2. Commit voice-enrollment samples, or only derived embeddings?**
Hard blocker on Phase 1.2, and it couples to Q1's answer. The references are voice biometrics for you and
Mike, in a repo that backs a public site. Recommendation: gitignore the WAVs, commit only the
`enrollment_embedding` vector in `data/hosts.json` so the pipeline stays reproducible, and mention it to
Mike before capturing his sample. The same question applies to `transcripts/mike/ep-{N}.txt`, which Goal
2 needs as the log-odds contrast corpus (§5.2); `--contrast-from-turns` exists so that text can stay
uncommitted if you prefer.

**Q3. Am I right that Agentic Thinking is Mike's solo show?**
Blocks Phase 1.2's Mike enrollment. Inferred from `transcripts/ep-538.txt`, where the speaker addresses
you by name while describing the show as his own workflow. If you appear on some of those 34 episodes,
the playlist is not a clean single-speaker source and Phase 1.2 needs a different one.

**Q4. Write `Tommy Present` and `YouTube URL` back to the shared Notion EMP database?**
Blocks Phase 1.4 only, which is optional and last. Useful for you and Mike in the agenda, but it means an
agent writing to a database you do not solely own, and the property would be derived data with no version
history. Yes / no / ask Mike first.

**Q5. Roughly which episodes did Seth co-host?**
Blocks nothing now. It sets the `era` boundary in `data/episodes.json` and would matter if you ever
backfill pre-465 episodes. RSS boilerplate suggests the change happened around ep 465–479 but that is a
footer edit, not evidence: ep 411 is pre-465 and mentions Seth zero times while mentioning you fifteen
times. Ep 338 is already in the corpus and does have 13 Seth mentions; §2.9 explains why that does not
require Seth enrollment.

**Q6. A/B validation: which posts?**
Blocks Phase 2.4. The default pair is `ai-coe-better-not-bigger` (ep 529) and `hard-data-soft-data`
(ep 539) because both episodes are cached. Note that **neither has an angles file**, so the regeneration
would run without a hand-curated ore file as input. If you want the A/B to test the realistic drafting
path, pick two from the 16 that do have angles: ep 545, 546, 549, 553 all have both an angles file and a
published or drafted post.

**Non-blocking, tracked as a measurement rather than a question:** the ~45% Tommy speech share (§4.5) is
unmeasured and only affects the corpus-size estimate. Phase 1.3 measures it per episode and writes it to
`tommy_share`.

---

## Appendix A: verification log

Every asserted measurement, its status, and how it was obtained. **Fresh** means measured during this
rewrite on 2026-08-28. **Inherited** means it comes from the earlier investigation on the same date and
was not re-run; treat it as a prior investigation's finding, not as newly confirmed.

| Claim | Status | Method |
| --- | --- | --- |
| 25 transcripts; the exact episode list | **Fresh** | Directory listing of `transcripts/*.txt` |
| 300,266 body words over 25 files; 12,011 mean | **Fresh** | Split each file on the 72-dash rule, word-count the body |
| 21 YouTube-auto, 4 Notion-sourced; zero with speaker labels | **Fresh** | `Source:` and `Captions:` header lines on all 25 |
| Notion-sourced files average 8,344 body words vs 12,709 for auto-captions | **Fresh** | Same word counts, grouped by source |
| ep 541: 71,890 B, 13,572 words, 1:09:03, video id `CecofYc2Ih0` | **Fresh** | File size + header read |
| ep 544: 75,533 B, 14,582 words, 1:13:21, video id `8JefOiSox1w` | **Fresh** | File size + header read |
| 22.76 h measured duration over 21 files; 3,902 s mean | **Fresh** | `Duration:` header parse |
| 3.257 words/s = 195 wpm speaking rate | **Fresh** | 266,892 YouTube body words / 81,945 s |
| 27.1 h total audio, ~317,700 spoken words, ~143,000 Tommy words @45% | **Fresh (derived)** | Measured rate and mean applied to 25 episodes. The 45% share is **UNVERIFIED** |
| 19 of 25 files carry `>>`; 4,087 markers | **Fresh** | Regex count per file |
| **Zero `>>` markers are named labels** | **Fresh** | `>>\s*(Tommy\|Mike\|Seth)\s*:` across all 19 files returns 0 |
| Vocative counts: ep 541 39/21/0, ep 544 73/20/0, ep 338 13/13/6, ep 411 15/3/0 (Tommy/Mike/Seth) | **Fresh** | Word-boundary regex counts |
| 15.4% anchor density, **62.7% alternation agreement** | **Inherited** | Prior prototype over the then-17 `>>` files. Not re-run |
| 16 `angles/` files; the exact episode list | **Fresh** | Directory listing |
| 15 of 16 carry `**Attribution:**`; 23 assertions + 3 `Mike-only` blocks | **Fresh** | Per-file `Select-String` counts |
| **Validation coverage 16/25 = 64.0%** | **Fresh (derived)** | angles set ∩ corpus set |
| 42 blog markdown files: 17 published, 1 draft, 7 backlog, 17 angles | **Fresh** | Recursive directory listing |
| **20 files carry `source.episode`, 9 distinct episodes (529, 538, 539, 541, 542, 544, 545, 546, 549)** | **Fresh** | Front-matter line scan over every real file on disk |
| **Only 2 files carry `source.transcript` (eps 549, 539); both targets exist** | **Fresh** | Front-matter scan + `stat`. **Corrects the previous draft's dangling-path claim** |
| 541 referenced by 4 files, 544 by 5 files; the nine paths | **Fresh** | Same scan |
| Corpus membership = 25 episodes under P1–P5 | **Fresh (derived)** | Union of the three filesystem scans above |
| A cached search index reported 2 non-existent `source.episode` files | **Fresh** | Index result compared against `Get-ChildItem` |
| Ep 537 lost membership when its backlog file was retired | **Fresh** | `angles/ep-549-angles.md:18` records the retirement; the file is absent from disk |
| Skill copies differ on 4 of 6 files; the current sizes | **Fresh** | `Get-FileHash` + `Get-Item` on both trees |
| Two global sizes moved since the previous draft (`SKILL.md` 14,275→14,641; `publishing-targets.md` 5,314→5,630) | **Fresh** | Comparison against the previous draft's table |
| Per-file drift verdicts: voice-and-style take global, publishing-targets take repo, image-style is line endings only, SKILL.md merge with one open question | **External** | `plans/skill-drift-reconciliation.md`, produced independently 2026-08-28 by SHA-256 + full read + line-level `Compare-Object`. Not re-derived here |
| Global `voice-and-style.md` is ahead by five specific bullets | **Inherited** | Prior full read of both copies. The **absence** of those five from the in-repo file is **Fresh** |
| Hard rules at `voice-and-style.md:26` (em dashes) and `:27` (co-host names); provenance sentence at `:3`; file is 45 lines | **Fresh** | Full read of the in-repo file |
| Loader glob `{published,drafts}/**/*.md` at `src/content.config.ts:8`; `source.transcript` optional at `:27` | **Fresh** | Full read |
| `publishedPosts()` filters drafts and future dates | **Fresh** | Full read of `src/lib/posts.ts` |
| RTX 4070 12,282 MiB, driver 610.88; Node v24.16.0; Python 3.12.10; yt-dlp 2026.07.04; ffmpeg 8.0-full; `HF_TOKEN` set | **Fresh** | `nvidia-smi`, `node -v`, `python --version`, `yt-dlp --version`, `ffmpeg -version`, env check |
| torch / torchaudio / whisperx / faster-whisper / ctranslate2 / pyannote.audio absent; `pyannote-core` 6.0.1 present | **Fresh** | `pip list` filtered |
| `package.json` has 4 custom scripts, 3 runtime deps, 1 dev dep | **Fresh** | Full read |
| 557 unique episodes, 1..557 zero gaps; 1 duplicate (539); 1 non-episode | **Inherited** | `yt-dlp --flat-playlist` on the playlist, 559 raw entries, regex + gap analysis |
| 37 lowercase `ep.` titles | **Inherited** | Case-sensitive vs case-insensitive regex differential |
| RSS: 557 items, `itunes:episode` 1..558 with 25 holes, ahead of YouTube by one | **Inherited** | `Invoke-WebRequest` + `ElementTree` on the feed |
| Audio enclosures 557/557; ep 558 = `HTTP 200`, `audio/mpeg`, 67,894,200 B for 66 min | **Inherited** | `HEAD` request. Basis for the 58.9 MB/hr figure |
| Seth in descriptions eps 1..465; "Mike & Tommy" 479..558; both hosts in 555/557 | **Inherited** | Regex over all 557 RSS descriptions |
| Notion EMP: 253 rows, 199 with EpNum>0 (223..567), Guest 6, Recorded 10, URL 1, no host property, observed `429` | **Inherited** | Aggregate queries via Notion MCP |
| No Notion meeting note for 541 or 544; automation appears to start ~ep 546 (2026-07-16) | **Inherited** | Both EMP pages fetched with `include_transcript: true`, ep 546 as positive control |
| Ep 549's Notion meeting note is empty | **Fresh** | `angles/ep-549-angles.md:9` |
| Agentic Thinking is Mike's solo show (34 videos) | **Inherited** | Playlist enumeration + vocative analysis of `transcripts/ep-538.txt`. Still pending Tommy's confirmation (Q3) |
| ASR error examples `aentic thinking`, `VVT`, `parlia.tips`, `Symbol single destination` | **Inherited** | Prior reading of cached transcripts |
| Published DER for `speaker-diarization-3.1`; per-episode GPU time 10–20 min | **UNVERIFIED** | Neither measured on this audio nor on this machine. Phase 1.2 measures both |
| ~45% Tommy speech share | **UNVERIFIED** | Planning assumption only. Phase 1.3 measures it |

---

## Appendix B: the 25-episode corpus

Freshly measured. `A` = has an angles file (validation set). `P` = referenced by a post artifact.
`N` = cached transcript is a Notion meeting note, so its cached text is condensed summary prose and must
not be used as corpus input (§2.3).

| Ep | Flags | Uploaded | Duration | Cached body words | `>>` markers | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 338 | | 2024-07-19 | 1:03:54 | 11,742 | 0 | **Three-host era**, 13 "Seth" mentions |
| 411 | | 2025-04-02 | 49:00 | 9,820 | 0 | Pre-465 but 0 "Seth" mentions |
| 484 | | 2025-12-12 | 1:07:25 | 12,909 | 184 | |
| 494 | | 2026-01-16 | 1:10:23 | 14,065 | 260 | |
| 501 | A | 2026-02-11 | 1:01:22 | 11,734 | 135 | |
| 502 | A | 2026-02-13 | 56:59 | 10,955 | 183 | |
| 504 | A | 2026-02-20 | 1:06:05 | 13,246 | 253 | |
| 508 | A | 2026-03-06 | 1:06:48 | 13,442 | 213 | |
| 522 | A | 2026-04-24 | 1:03:06 | 12,632 | 98 | |
| 528 | A | 2026-05-15 | 1:12:47 | 14,418 | 290 | |
| 529 | P | 2026-05-20 | 1:09:06 | 13,729 | 76 | A/B candidate, no angles file |
| 530 | A | 2026-05-22 | 1:05:29 | 12,932 | 314 | |
| 531 | A | 2026-05-27 | 1:09:53 | 13,852 | 348 | |
| 538 | A P | 2026-06-19 | 1:03:20 | 12,482 | 185 | Source of the Agentic Thinking inference |
| 539 | P | 2026-06-24 | 1:08:51 | 13,156 | 208 | Duplicate YouTube upload; has `source.transcript` |
| 540 | A | 2026-06-26 | 1:03:06 | 12,610 | 247 | Only angles file with no `**Attribution:**` line |
| 541 | P | 2026-07-01 | 1:09:03 | 13,572 | 260 | Fetched 2026-08-28; 4 referencing files |
| 542 | P | 2026-07-03 | 1:07:34 | 13,087 | 217 | |
| 544 | P | 2026-07-10 | 1:13:21 | 14,582 | 257 | Fetched 2026-08-28; 5 referencing files; video id was unrecorded |
| 545 | A P | 2026-07-15 | 1:10:58 | 13,919 | 196 | |
| 546 | A P N | | | 9,629 | 0 | Earliest known Notion meeting note |
| 548 | A N | | | 10,839 | 0 | |
| 549 | A P | 2026-07-29 | 47:15 | 8,791 | 163 | Shortest; Phase 1.2 pilot; has `source.transcript` |
| 550 | A N | | | 7,023 | 0 | |
| 553 | A N | | | 6,014 | 0 | Contains the em-dash-as-agent-tell riff |
| **25** | **16 A, 9 P, 4 N** | | **22.76 h over 21** | **300,266** | **4,087** | |
