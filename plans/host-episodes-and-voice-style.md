# Plan: Tommy-attributed episode index + speech-grounded writing voice

Status: **proposal, awaiting Tommy's approval.** Nothing in this document has been executed.
Author: planning agent, 2026-08-28. Read-only investigation; no repo files were modified.

Two goals, in dependency order:

- **Goal 1** — a durable, queryable index of every Explicit Measures episode, recording which ones Tommy actually spoke on, with canonical links.
- **Goal 2** — evolve the article-writing skill's voice reference so drafts are grounded in how Tommy actually talks, using the Tommy-attributed corpus Goal 1 produces.

Goal 2 depends on Goal 1 Phase 3. Goal 1 Phases 1 and 2 are independently useful and shippable.

---

## 1. Current state (verified)

Everything in this section was measured on 2026-08-28 against the live repo, the live YouTube channel, the live podcast RSS feed, and the Notion EMP database. Numbers I could not verify are marked **UNVERIFIED**.

### 1.1 Enumeration sources, measured

| Source | Entries | Episode range | Verdict |
| --- | --- | --- | --- |
| YouTube playlist `PLn1m_aBmgsbHr83c1P6uqaWF5PLdFzOjj` ("Explicit Measures - Podcast") | 559 raw → **557 unique episode numbers** | **1..557, zero gaps** | **Authoritative for `EpNum` ↔ YouTube video id** |
| Podcast RSS `https://anchor.fm/s/5bb46378/podcast/rss` | **557 items** | `itunes:episode` 1..558, 25 holes; 557/557 after title fallback | **Authoritative for publish date, audio URL, description** |
| YouTube `/@powerbitips/videos` tab | 263 | only ~440..557 | **Unusable.** Truncated, and 146 of 263 are "No Ads" duplicate re-uploads |
| Notion EMP `collection://3bb02401-3320-4eb7-92fe-d5197943f569` | 253 rows, **199 with `EpNum` > 0** | `EpNum` 223..567, dates 2025-12-11..2026-09-29 | **Not authoritative.** Forward-looking planning database |

Details that the parser must handle, all observed:

- The 559 playlist entries resolve to 557 unique episode numbers + 1 non-episode (`QejIXrDE1t4`, "Explicit Measures Theme Song") + **1 genuine duplicate upload** (ep 539 appears twice with an identical title, video ids differ).
- **37 titles use lowercase `ep.NNN`** (e.g. "It Depends - ep.203- Power BI Tips from the Real World"). A case-sensitive `Ep\.?\s*(\d+)` regex silently drops all 37. The existing `EP_RE` in `.cursor/skills/writing-promptingbi-articles/scripts/fetch_youtube_transcript.py` uses `re.I`, so it is fine; a new parser must match that.
- Title conventions drift across eras: `"... - Ep.549 - Power BI tips"`, `"... - Episode 1 - Power BI Tips from the Real World"`, and in RSS `"549 - Training Staff on Agents for DAX - No Ads"` / `"558: Has Your Medallion Patterns Changed?"`.
- RSS carries a structured `<itunes:episode>` element (present on 549/557), so RSS needs almost no title parsing. YouTube requires it.
- RSS is **ahead of YouTube by one episode** right now: RSS newest is ep 558 (pubDate Thu, 27 Aug 2026), YouTube playlist max is 557. Audio publishes on a different cadence than the video. The index must tolerate an episode existing in one source and not the other.
- RSS `<enclosure>` URLs are present on **557/557** and are directly downloadable: a `HEAD` against ep 558's enclosure returned `HTTP 200`, `audio/mpeg`, `67,894,200` bytes for a 66-minute episode. **No yt-dlp needed for audio.** That is ~60 MB/hr, so the full archive is roughly **33 GB**.

### 1.2 The Notion EMP database is a planning tool, not an archive

Measured: 253 rows, 199 with a usable `EpNum` (52 rows have `EpNum` NULL, plus one at 0), covering `EpNum` 223..567 and dates 2025-12-11..2026-09-29 (includes future scheduled episodes).

Property coverage is thin where it would matter most:

- `Guest` checkbox: `__YES__` on **6 of 253** rows.
- `Recorded` checkbox: `__YES__` on **10 of 253** rows.
- `userDefined:URL`: populated on **1 of 253** rows.

Available properties: `Name`, `EpNum`, `Description`, `AI Description`, `Date`, `Status`, `Tags`, `Guest`, `Recorded`, `RecScheduled`, `Scheduled`, `UPL`, `RSS Entry`, `userDefined:URL`, and the agent-agenda checkboxes `GPT` / `Gemini` / `Claude`. **There is no host or speaker property.**

Notion also rate-limited me mid-investigation (`429 rate_limited`, `collection_router_upstream_429`, `retry_after: 30`), so any sync script needs backoff.

### 1.3 Transcript cache: 23 files, and **zero** of them have speaker labels

`transcripts/` holds 23 episode files: **338, 411, 484, 494, 501, 502, 504, 508, 522, 528, 529, 530, 531, 538, 539, 540, 542, 545, 546, 548, 549, 550, 553**. Totals: **272,189 words, 11,834 words/episode average**, 31–76 KB per file.

By `Source:` header: **19 YouTube auto-caption**, **4 Notion meeting note** (546, 548, 550, 553).

**This corrects a stated premise.** The brief assumed some cached transcripts are Notion meeting notes *with* speaker labels. They are not. All four Notion-sourced files carry the header `Captions: notion-meeting-note  [no speaker labels in this meeting note]`. Reading the body of `transcripts/ep-553.txt` confirms it: continuous prose, speaker changes only inferable from content. `SKILL.md` line 32 and `transcripts/README.md` line 29 both claim Notion notes "usually" have labels; against the current cache that is **0 for 4**.

So: **no cached transcript, from any source, carries speaker attribution.** Attribution is a from-scratch problem, not a coverage-gap problem.

### 1.4 The `>>` marker heuristic measured, and it fails

17 of the 23 files contain `>>` turn markers (all YouTube-sourced); 6 do not (338, 411, and all four Notion files). Across those 17: **3,583 turns, 217,321 words**.

Hosts address each other by name constantly, which is a real anchor. `transcripts/ep-531.txt` line 13 opens `>> Tommy, good morning. How are you doing today? >> Happy Memorial Day, dude.` The speaker who says "Tommy," is by definition not Tommy. Vocative counts per episode run 13–54 for "Tommy" and 3–33 for "Mike".

I prototyped the obvious approach: split on `>>`, anchor turns containing exactly one unambiguous vocative (excluding brand phrases like "with Tommy and Mike"), then propagate speaker identity by strict alternation between anchors. Measured:

- Anchor density: **553 anchored turns / 3,583 = 15.4%**
- Consecutive-anchor alternation agreement: **336 agree / 200 conflict = 62.7%**

**62.7% is barely above a coin flip.** YouTube's `>>` insertion is not a faithful turn-change signal: it is inserted inconsistently, sometimes mid-turn, sometimes omitted across a real change. Strict alternation is therefore **rejected as a primary method** (see §2.4). The vocative signal itself is strong; the `>>`-alternation mechanism for exploiting it is not.

### 1.5 Attribution is currently solved by hand, and that work is a validation set

`src/content/blog/angles/` holds **16 `ep-{N}-angles.md` files** (501, 502, 504, 508, 522, 528, 530, 531, 538, 540, 545, 546, 548, 549, 550, 553) plus a README. Each carries hand-curated attribution, e.g.:

- `ep-549-angles.md:13` — `**Mike-only (do not write as Tommy):** intern/CS-stack architecture layer; Power Designer DAX hardcoded week-6 vs week-5; ...`
- `ep-553-angles.md:37` — `**Attribution:** Tommy. Do not write Mike's 70-80% harness stat as Tommy's.`
- `ep-550-angles.md:25` — `- Analogy (UNCERTAIN speaker, fits Tommy): iPad mini with no touchscreen...`

This is **existing labelled ground truth for 16 episodes**, produced by agents reading transcripts, and it is the single most valuable asset for validating any automated attribution. Nothing else in the repo comes close.

Also confirmed: `angles/` is a sibling of `published/` and `drafts/` inside `src/content/blog/`, and the loader glob in `src/content.config.ts:8` is `{published,drafts}/**/*.md`. So siblings genuinely are safe from the site build. `backlog/` and `angles/` are live proof.

### 1.6 Roster is not a stable two-host duo

- **Seth Bauer was a third co-host.** External sources list Mike Carlo, Tommy Puglia, and Seth Bauer as hosts. In the cached set, `transcripts/ep-338.txt` (2024-07-19) has **13 "Seth" mentions**.
- RSS descriptions mention Seth in **459 of 557** items, but only for episodes **1..465**; "Mike & Tommy" phrasing appears only in episodes **479..558** (57 items). That is a boilerplate footer change, so it marks an **era boundary around ep 465–479**, not per-episode presence.
- **RSS descriptions are useless as a presence signal.** Mike and Tommy both appear in 555/557 descriptions. It is template text.
- The **Agentic Thinking Podcast** (`PLn1m_aBmgsbE0CSYy9zMiwkSgCjKeR6gq`, **34 videos**) is **Mike's solo show, not Tommy's.** Confirmed from `transcripts/ep-538.txt`: `"...Tommy, I was doing... I'm doing the same thing for agentic thinking where we do an episode, I transcribe it and it goes on our website."` The speaker addresses Tommy, so the speaker is Mike, and Mike owns that show. Two consequences: it must be **excluded** from Tommy's corpus, and it is a **free source of clean, single-speaker Mike audio** for enrollment (see §2.4).

### 1.7 Post ↔ episode linkage

42 markdown files under `src/content/blog/`: 17 `angles/`, 7 `backlog/`, 1 `drafts/`, 17 `published/**`. **20 posts carry `source.episode`**, referencing episodes 529, 538, 539, 541, 542, 544, 545, 546, 549.

**Episodes 541 and 544 are referenced by five published posts but are not in the transcript cache.** `source.transcript` on those posts points at files that do not exist. Worth fixing while building the index.

### 1.8 The skill exists in two copies and they have already diverged

| File | In-repo `.cursor/skills/...` | Global `~/.claude/skills/...` | State |
| --- | --- | --- | --- |
| `SKILL.md` | 13,644 B | 14,275 B | **DIFFER** |
| `references/voice-and-style.md` | 4,523 B | **6,174 B** | **DIFFER** |
| `references/image-style.md` | 6,414 B | 6,347 B | **DIFFER** |
| `references/publishing-targets.md` | 6,236 B | 5,314 B | **DIFFER** |
| `references/article-structure.md` | 3,113 B | 3,113 B | same |
| `scripts/fetch_youtube_transcript.py` | 8,978 B | 8,978 B | same |

**The global copy of `voice-and-style.md` is ahead**, with five substantive bullets the in-repo copy lacks: "Instruction-based beats opinion-based", "Pull real code out of the tenant instead of writing plausible code", "Validation cells are the other signature code block", "Agent deviations documented in comments are gold", "One extended analogy, and prefer the one he actually told".

This drift must be resolved **before** Goal 2 adds anything, or the new reference forks on day one.

### 1.9 Local machine, verified

| Component | Status |
| --- | --- |
| OS | Windows 10.0.26200 |
| Python | 3.12.10 at `C:\Users\pugli\AppData\Local\Programs\Python\Python312\python.exe` |
| yt-dlp | 2026.07.04 |
| ffmpeg | 8.0-full_build (gyan.dev) |
| Node | v24.16.0 |
| GPU | **NVIDIA GeForce RTX 4070, 12,282 MiB VRAM, driver 610.88** |
| `HF_TOKEN` | **set** |
| torch | **not installed** |
| `pyannote.audio` | **not installed** (`pyannote-core` 6.0.1 present as a stray transitive dep, unusable alone) |
| whisperx | **not installed** |

12 GB VRAM comfortably runs `faster-whisper large-v3` and `pyannote/speaker-diarization-3.1` together. This machine is well suited to the recommended approach.

---

## 2. Goal 1 — Tommy-attributed episode index

### 2.1 Decision: enumeration source (Goal 1 problem 1)

**Recommended: YouTube playlist for identity, RSS for time and audio, Notion for editorial intent. Reconcile on integer `EpNum`.**

| Field | Authority | Why |
| --- | --- | --- |
| `episode` (EpNum) | YouTube playlist title, case-insensitive `[Ee]p\.?\s*(\d+)` \| `Episode\s+(\d+)` | Only source measured at **1..557 with zero gaps** |
| `youtube_id`, `youtube_url` | YouTube playlist | Only source with the canonical video id |
| `published`, `duration_seconds`, `audio_url`, `rss_guid`, `rss_link` | RSS | Only source with a real publish date and a direct MP3 |
| `title` | RSS `<title>` with suffixes stripped, YouTube fallback | RSS titles are cleaner (no " - Power BI tips" tail) |
| `notion_page`, `guests`, agenda flags | Notion EMP | Editorial intent lives only there |
| `hosts_present`, `tommy_present` | **Derived from audio** (§2.4) | No metadata source can answer this |

Reconciliation rules, each written to handle a defect I actually observed:

1. Parse `EpNum` case-insensitively. **37 lowercase `ep.` titles depend on this.**
2. Dedupe playlist entries by `EpNum`, keeping the longest `duration`. **Ep 539 has two uploads.**
3. Prefer RSS `<itunes:episode>`; fall back to `^(\d{1,3})\s*[-:]` then `Ep\.?\s*(\d+)` on the title. Covers the 8 items missing the element.
4. Skip playlist entries with no parseable number and log them. Currently exactly one: the theme song.
5. **Outer join, never inner.** RSS is one episode ahead today; older episodes may be video-only. Record `sources_seen: ["youtube","rss","notion"]` per record so gaps are visible rather than silent.
6. Strip `" - No Ads"`, `" - Power BI tips"`, `" - Power BI Tips from the Real World"` from titles.

**Rejected: Notion as the enumeration spine.** It holds 199 usable EpNums over 223..567, missing roughly 60% of the archive, and 52 rows have no EpNum at all. It is a forward-looking agenda tool.

**Rejected: the `/videos` tab.** Truncates at 263 and is 55% "No Ads" duplicates.

**Rejected: RSS alone.** 25 holes in `itunes:episode` and no YouTube video id, which is the link Tommy actually shares.

### 2.2 Decision: index location and shape (Goal 1 problem 4)

**Recommended: a git-tracked JSON file at the repo root, `data/episodes.json`, as the single source of truth. Notion gets a derived mirror.**

- `data/` at the **repo root**, not under `src/content/`. `angles/` proves siblings inside `src/content/blog/` are safe from the `{published,drafts}/**/*.md` glob, but root `data/` removes the question entirely and cannot be caught by a future glob widening.
- **Not an Astro content collection.** No entry in `src/content.config.ts`, no schema registration, nothing renders. If Tommy later wants a public "episodes I was on" page, that is a deliberate second step reading this file.
- **JSON over CSV/YAML**: nested `hosts_present` and `posts` arrays; CSV cannot hold them. YAML invites hand-editing of a generated file.
- **One record per line-block, pretty-printed with stable key order**, so a re-sync touching one episode produces a one-episode git diff.

Companion files:

| Path | Contents | Git |
| --- | --- | --- |
| `data/episodes.json` | 557 records, the index. **Source of truth.** | tracked |
| `data/hosts.json` | Host roster: id, display name, era, enrollment sample path | tracked |
| `data/speakers/ep-{N}.jsonl` | Turn-level attribution: one JSON object per turn | tracked (per-episode files keep diffs local) |
| `transcripts/tommy/ep-{N}.txt` | Tommy-only text, the Goal 2 corpus | tracked |
| `data/audio/` | Downloaded MP3s, transient | **`.gitignore`d** |

Proposed schema, field by field:

| Field | Type | Source | Notes |
| --- | --- | --- | --- |
| `episode` | int | YouTube title | primary key |
| `title` | string | RSS, cleaned | suffixes stripped |
| `youtube_title` | string | YouTube | raw, for auditing the parser |
| `youtube_id` | string \| null | YouTube | |
| `youtube_url` | string \| null | derived | |
| `rss_guid` | string \| null | RSS | stable id for RSS-side dedupe |
| `rss_link` | string \| null | RSS | Spotify-for-Creators episode page |
| `audio_url` | string \| null | RSS `<enclosure url>` | direct MP3 |
| `published` | date `YYYY-MM-DD` | RSS `pubDate` | |
| `duration_seconds` | int \| null | RSS `itunes:duration` \| YouTube | |
| `era` | enum | derived from `episode` | `real-world` \| `three-host` \| `mike-tommy` |
| `hosts_present` | string[] | **derived from audio** | ids from `data/hosts.json` |
| `guests` | string[] | Notion `Guest` + manual | free text names |
| `tommy_present` | bool \| null | derived | `null` = not yet analysed |
| `tommy_speaking_seconds` | int \| null | diarization | |
| `tommy_share` | float \| null | diarization | fraction of total speech |
| `presence_source` | enum | pipeline | `diarization+enrollment` \| `diarization+vocative` \| `manual` \| `unanalysed` |
| `presence_confidence` | float \| null | pipeline | 0..1, see §2.4 |
| `presence_verified_by` | string \| null | human | `"tommy"` when he has eyeballed it; **wins over everything** |
| `notion_page` | string \| null | Notion | |
| `transcript` | string \| null | filesystem | `transcripts/ep-{N}.txt` |
| `transcript_source` | enum \| null | header | `youtube-auto` \| `notion` \| `whisperx` \| `paste` |
| `speaker_turns` | string \| null | filesystem | `data/speakers/ep-{N}.jsonl` |
| `tommy_corpus` | string \| null | filesystem | `transcripts/tommy/ep-{N}.txt` |
| `angles` | string \| null | filesystem | existing `angles/ep-{N}-angles.md` |
| `posts` | string[] | scan of `source.episode` | post permalinks |
| `sources_seen` | string[] | pipeline | which feeds contributed |
| `updated` | ISO datetime | pipeline | |

Sample record (values are real, except the four diarization fields which are illustrative and flagged):

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
  "hosts_present": ["tommy-puglia", "mike-carlo"],
  "guests": [],
  "tommy_present": true,
  "tommy_speaking_seconds": 1290,
  "tommy_share": 0.47,
  "presence_source": "diarization+enrollment",
  "presence_confidence": 0.94,
  "presence_verified_by": null,
  "notion_page": null,
  "transcript": "transcripts/ep-549.txt",
  "transcript_source": "youtube-auto",
  "speaker_turns": "data/speakers/ep-549.jsonl",
  "tommy_corpus": "transcripts/tommy/ep-549.txt",
  "angles": "src/content/blog/angles/ep-549-angles.md",
  "posts": ["2026/08/31/agents-raise-the-floor-and-lower-the-ceiling"],
  "sources_seen": ["youtube"],
  "updated": "2026-08-28T15:00:00Z"
}
```

`data/speakers/ep-{N}.jsonl`, one object per turn:

```json
{"i":42,"start":812.4,"end":848.9,"speaker":"tommy-puglia","cluster":"SPEAKER_01","conf":0.91,"words":118,"text":"..."}
```

**Notion mirror, explicitly derived.** Add two properties to the EMP database, `Tommy Present` (checkbox) and `YouTube URL` (url), written by the sync script from `data/episodes.json`. Never read back into the JSON. Rationale: Tommy and Mike work agendas in Notion, so the flag should be visible there, but a Notion property is a poor source of truth for something regenerable, it has no diff history, and I hit a `429` on it during a read-only investigation.

**Rejected: Notion as source of truth.** No version history worth reviewing, rate-limited, no schema enforcement, and the existing `Guest`/`Recorded`/`URL` coverage (6/253, 10/253, 1/253) is direct evidence that manual Notion properties do not stay maintained.

**Rejected: SQLite.** Binary, unreviewable in a PR, and 557 records do not need indexes.

### 2.3 Decision: determining whether Tommy actually spoke (Goal 1 problem 2)

**Recommended: derive presence from the diarization output in §2.4, gate it on a speaking-time floor, and never infer it from metadata.**

Concretely, `tommy_present = true` requires an enrolled Tommy cluster holding **≥ 5% of total speech and ≥ 120 seconds**. The floor matters because a one-line cameo or an intro read is not "Tommy spoke on this episode" for corpus purposes.

Why nothing else works, measured:

- **RSS descriptions**: template text. Mike and Tommy in 555/557, Seth in 459/557. Zero signal.
- **Notion `Guest`**: 6/253 rows. Unmaintained.
- **Titles**: never name hosts.
- **Vocative presence in a transcript**: proves he was *addressed*, not that he *spoke*. Also fails on the 6 files with no `>>` markers.

Interim honesty mechanism: `presence_source: "unanalysed"` with `tommy_present: null` is a valid state, and it must be, because analysing all 557 episodes is not a first sprint. A `null` is an accurate "we do not know yet"; a defaulted `true` is a lie that will end up in the corpus.

`presence_verified_by: "tommy"` overrides the pipeline permanently. He is the cheapest oracle available for the ambiguous handful.

### 2.4 Decision: speaker attribution (Goal 1 problem 3, the hard part)

Options, honestly costed. All were assessed against the verified machine in §1.9.

| Option | Setup | Accuracy | Hardware | Licensing | Windows | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| **A. WhisperX ASR + pyannote 3.1 diarization + speaker enrollment** | 1–2 days | High. Published DER for `speaker-diarization-3.1` on clean 2-speaker audio is in the low single digits to ~10% depending on corpus (**UNVERIFIED for this audio**) | RTX 4070 12 GB is sufficient | pyannote code MIT; **models gated on HF, terms must be accepted**; `HF_TOKEN` already set | Yes. torch cu12x wheels + ffmpeg 8.0 present | **PRIMARY** |
| **B. Diarization + aggregate vocative voting (no enrollment)** | ~4 hours on top of A | Good at episode level; per-cluster naming from 20–50 anchor votes | Same as A | Same as A | Yes | **FALLBACK / cross-check** |
| C. `>>` split + strict alternation | ~2 hours | **Measured 62.7%.** Near chance | None | n/a | Yes | **Rejected** |
| D. Notion AI meeting notes | Zero | n/a | None | n/a | Yes | **Rejected: 0 of 4 cached notes carry labels** |
| E. Hosted diarization API (AssemblyAI, Deepgram, ElevenLabs Scribe) | ~2 hours | High, vendor-managed | None | Per-minute billing; **audio leaves the machine**; pricing **UNVERIFIED** | Yes | **Rejected as primary, viable as spot-check** |
| F. Voice-fingerprint enrollment alone, no diarization | ~1 day | Poor standalone. Needs segments to score | GPU | Same as A | Yes | Folded into A |

**Recommended primary (A):** transcribe and diarize from the RSS MP3, then map clusters to real identities by speaker-embedding enrollment.

Pipeline per episode:

1. Stream `audio_url` from RSS. `ffmpeg -i - -ac 1 -ar 16000 -c:a pcm_s16le ep-{N}.wav`. Delete after.
2. `faster-whisper large-v3` via WhisperX for word-level timestamps. Pass a domain hotword prompt ("Microsoft Fabric, Power BI, DAX, semantic model, MCP, Copilot, OneLake, Direct Lake, medallion, Tabular Editor") to cut the ASR errors visible in the current cache.
3. `pyannote/speaker-diarization-3.1`. Do **not** pin `num_speakers`; pass `min_speakers=1, max_speakers=4` so the 3-host era and guest episodes are not forced into two clusters.
4. Assign words to speaker turns via WhisperX alignment.
5. **Identify each cluster.** Compute an ECAPA/pyannote embedding per cluster centroid; cosine-compare against enrolled references in `data/hosts.json`.
6. **Cross-check with aggregate vocative voting, and require agreement.** For each cluster, count utterances containing a vocative "Tommy" / "Mike" / "Seth". The cluster that says "Tommy," most is *not* Tommy. Over 20–50 anchors per episode this is a strong episode-level vote.
7. If enrollment and vocative voting **disagree**, set `presence_source: "unanalysed"`, write `presence_confidence`, and **quarantine the episode** for manual review. Do not guess.
8. Emit `data/speakers/ep-{N}.jsonl`, `transcripts/tommy/ep-{N}.txt`, and update the index record.

**Why the vocative signal works here but failed in §1.4.** The 62.7% result came from *strict per-turn alternation*, which compounds every `>>` insertion error along the chain. Aggregate voting over already-diarized clusters uses the same vocative evidence for a single episode-level decision with 20–50 independent votes, and never propagates a local error. Same signal, structurally different exposure to noise.

**Enrollment samples, and this is the elegant part.** Enrollment needs clean single-speaker audio per host:

- **Mike: free and abundant.** The Agentic Thinking Podcast (34 videos, `PLn1m_aBmgsbE0CSYy9zMiwkSgCjKeR6gq`) is Mike solo, confirmed in §1.6. Pull 60 seconds.
- **Tommy: needs one asset.** Best options, in order: (a) a conference talk or webinar recording where he is the only speaker; (b) 60 seconds he records deliberately, which takes two minutes and is the highest-quality option; (c) a manually clipped monologue from an episode. **Open question for Tommy (§7 Q4).**
- **Seth: needed only if pre-465 episodes are in scope.** **Open question (§7 Q3).**

Store references as `data/enrollment/{host-id}.wav`, 16 kHz mono, ≥30 s. **Flag:** these are voice biometrics of third parties. Committing Mike's and Seth's voice samples to a public repo is a decision, not a detail (§7 Q9).

**Validation against existing ground truth.** Before trusting the pipeline on 557 episodes, run it on the **16 episodes that have hand-curated `angles/` files** and score the automated attribution against the `**Mike-only**` and `**Attribution:**` annotations. This is a real, already-paid-for labelled set. If the pipeline contradicts `ep-549-angles.md:13`, the pipeline is wrong.

**Scope recommendation:** start with the **~92 episodes from 466 to 557** (the two-host era). That is where the AI/Fabric/agentic material Tommy actually blogs lives, it avoids the three-speaker problem entirely, and at ~60 MB and ~15 min/episode it is one overnight run.

### 2.5 Decision: automation and refresh (Goal 1 problem 5)

**Recommended: two scripts, both manual, plus a metadata-only CI check later. Do not put diarization in the daily GitHub Actions build.**

| Script | Language | Runtime | Cost |
| --- | --- | --- | --- |
| `scripts/episodes-sync.mjs` | Node (matches existing `.mjs` convention: `new-post.mjs`, `scan-prompts.mjs`, `auto-tag.mjs`) | ~30 s for all 557 | Network only |
| `scripts/diarize_episode.py` | Python (matches `fetch_youtube_transcript.py`) | ~10–20 min/episode | GPU + ~60 MB transient |

`package.json` additions: `"episodes:sync"`, `"episodes:sync:check"`, `"episodes:diarize"`.

`episodes-sync.mjs` responsibilities: pull the playlist via `yt-dlp --flat-playlist`, parse the RSS feed, query Notion with backoff, outer-join on `EpNum`, scan `src/content/blog/**` for `source.episode` to fill `posts`, scan `transcripts/` and `angles/` for file links, and **never overwrite** `hosts_present`, `tommy_present`, `presence_*`, or `guests` when `presence_verified_by` is set.

**Reusing the daily GitHub Actions build for this is a bad idea.** Reasons, in order of severity:

1. **No GPU on GitHub-hosted runners.** Diarization is the whole point and it cannot run there.
2. **YouTube blocks datacenter IPs.** The existing script's own docstring says so: *"If YouTube blocks the current network (common from datacenter IPs), run this on your own machine instead"*, and it has explicit `"Sign in"` error handling for exactly this. A CI job would fail intermittently and noisily.
3. **The daily build's job is to publish future-dated posts.** Coupling a 33 GB media pipeline to the thing that deploys promptingbi.com means a yt-dlp breakage can block a publish. Bad blast radius.
4. Notion rate-limits (observed `429`) would make a scheduled job flaky.

**Acceptable CI scope, as a later step:** a separate workflow, on its own schedule, running `episodes:sync:check` metadata-only against RSS (no YouTube, no audio) and opening an issue when a new `itunes:episode` appears that is missing from `data/episodes.json`. Cheap, decoupled, and it cannot break a deploy. New episodes then get diarized locally in batches.

### 2.6 Goal 1 phases

| Phase | Deliverable | Depends on | Effort |
| --- | --- | --- | --- |
| **1.1** | `data/episodes.json` for all 557 episodes, metadata only. `hosts_present: []`, `tommy_present: null`. `scripts/episodes-sync.mjs`, `data/hosts.json`, `data/episodes.schema.json`, `.gitignore` for `data/audio/`. Fixes the 541/544 dangling `source.transcript`. | none | **1–1.5 days** |
| **1.2** | Diarization pipeline built and **validated against the 16 `angles/` files**. Windows env installed. Enrollment samples captured. | 1.1, Q3/Q4 answered | **2–3 days** |
| **1.3** | Batch-run eps 466–557 (~92). Populate `hosts_present`, `tommy_present`, `tommy_share`, `data/speakers/*.jsonl`, `transcripts/tommy/*.txt`. Quarantine list for review. | 1.2 | **1 day work + 1 overnight run** |
| **1.4** | Notion mirror properties. Optional metadata-only CI check. Optionally backfill pre-466 (needs Seth enrollment). | 1.3 | **0.5 day** + 2–3 days if backfilling |

---

## 3. Goal 2 — ground the writing voice in how Tommy talks

### 3.1 Corpus construction and volume (Goal 2 problem 1)

Input is `transcripts/tommy/ep-{N}.txt`, written by Phase 1.3, one file per episode where `tommy_present` is true, containing only turns attributed to Tommy with `conf` above threshold.

Volume, from measured numbers:

| Scope | Episodes | Total words | Tommy words @ ~45% |
| --- | --- | --- | --- |
| Current cache | 23 | **272,189** (measured) | ~**122,000** (~740 KB) |
| Two-host era, eps 466–557 | ~92 | ~1,090,000 | ~**490,000** |
| Full archive | 557 | ~6,590,000 | ~**2,970,000** |

**The 23-episode cache alone yields roughly 122,000 Tommy words**, which is already ample for phrase-frequency and rhythm statistics. The Phase 1.3 batch takes it to ~490,000. Full-archive backfill is unnecessary for Goal 2 and arguably harmful, since 2021-era Tommy talking about Power BI Scorecards is off-topic for a blog about agentic Fabric work.

Two quality gates on the corpus, both non-negotiable:

1. **Only high-confidence turns.** A misattributed Mike turn is worse than a missing Tommy turn, because it teaches the blog to write as Mike.
2. **Exclude non-Tommy-authored content even when Tommy speaks it**: news-segment article read-alouds, mailbag question reading, sponsor reads, the intro/outro boilerplate. Detect by position (first/last 90 s) and by cue phrases ("our first article", "head over to our website", "wherever you get your podcasts"). Corpus is for *how he argues*, not *what he reads aloud*.

### 3.2 What to extract (Goal 2 problem 2)

A script, `scripts/voice_profile.py`, emitting counted evidence to `data/voice/profile.json`. No feature enters the skill without a number behind it.

| # | Feature | Method | Output |
| --- | --- | --- | --- |
| 1 | **Distinctive phrases** | 2–6-grams, scored by **log-odds ratio with an informative Dirichlet prior** (Monroe/Colaresi/Quinn "Fightin' Words") **against Mike's corpus** as the contrast set | Ranked phrase bank with counts + episode spread |
| 2 | **Verbal tics** | Same, restricted to discourse markers | Explicit **DROP** list |
| 3 | **Self-answering rhythm** | Turn-internal `?` followed within 15 tokens by a short declarative from the same speaker | Rate per 1,000 words + 20 real examples |
| 4 | **Analogy domains** | Seeded lexicons: food/Italian, sports, family, cars, construction, restaurants, music | Hits per 10,000 words per domain. **Tests the existing spec's Italian/food + sports claim against data** |
| 5 | **Sentence length** | Segment on `.?!`, report mean / median / p10 / p90 / % under 8 words | Target band for the linter (§3.5) |
| 6 | **Opening a take** | First 2 sentences of each Tommy turn following a Mike turn ending in `?` | Bucketed opener constructions |
| 7 | **Signalling disagreement** | Turns matching `I disagree`, `I don't think`, `yeah, but`, `here's where I`, `I push back`, `I'd argue` | Real constructions, ranked |
| 8 | **Hedging** | Rate of `kind of`, `sort of`, `I think`, `probably`, `maybe`, `I would say` | Rate vs Mike's rate |
| 9 | **Emphasis** | Lexical intensifiers + immediate lexical repetition (ASR caps are unreliable, so do not mine caps) | Which words he actually leans on |
| 10 | **Spoken-only filler** | Fixed blacklist calibrated on measured rates: `you know`, `right?`, `like`, `I mean`, `so`, `anyways`, `to your point`, `100%`, `dude`, `totally`, `absolutely` | **DROP** list for the linter |
| 11 | **Vocabulary skew** | Top content words by log-odds vs Mike | The domain nouns he reaches for |

The contrast-against-Mike design is the load-bearing choice. Raw frequency on a single corpus returns podcast-generic filler. Log-odds against a co-host recorded on the same mic, on the same topics, in the same room isolates **what is Tommy** rather than what is podcast.

### 3.3 The speech-to-prose translation layer (Goal 2 problem 3)

This is where a naive implementation makes the blog worse, so the plan is prescriptive.

**Every mined feature is assigned exactly one of three buckets before it can influence a draft.**

| Bucket | Meaning | Examples from the current evidence |
| --- | --- | --- |
| **CARRY** | Durable voice. Reproduce in prose. | Self-answering question rhythm; contrast framing; short blunt verdict sentences; analogy domains; the specific domain nouns; willingness to state a flat disagreement |
| **TRANSLATE** | Real signal, wrong form. Convert per a stated rule. | Spoken triple repetition → **one bolded word**. Three false starts then the landed sentence → **keep only the landed sentence**. Addressing a co-host ("Mike, here's the thing") → **address the reader or drop the vocative**. Spoken hedge stack ("I think it's kind of maybe") → **one hedge or none** |
| **DROP** | Artifact of the medium. Never appears in prose. | Fillers (§3.2 #10); interruption repair; ASR errors; co-host names; news-read and mailbag passages; "we said this on the podcast before" |

Three mechanical rules that keep noise out:

1. **Minimum-3-episodes rule.** No phrase enters the bank unless it appears in **≥3 distinct episodes**. This single rule kills ASR garbage. The current cache contains `"aentic thinking"`, `"Symbol single destination"`, `"parlia.tips"`, and `"VVT"` (for VTT) as real transcription errors. Any one of them could otherwise be mined as "his voice".
2. **Bucket is mandatory metadata.** A phrase-bank entry without a bucket is invalid. This is what stops the drafting agent from reading the bank as "write like this".
3. **The prose corpus is the arbiter of form.** The 17 published posts under `src/content/blog/published/**` are the only existing examples of *written* Tommy. Where speech and prose conflict on **form**, prose wins. Where they conflict on **stance or vocabulary**, speech wins, because speech is the unfiltered signal and the posts were partly agent-written.

Rule 3 also protects the existing hard rules. The spoken corpus contains co-host names in nearly every turn; a naive pipeline would learn to name Mike, directly violating `voice-and-style.md:27`. The bucket table makes that a DROP by construction rather than by hope.

There is a nice piece of corroborating evidence for the anti-em-dash rule sitting in `transcripts/ep-553.txt`: an extended riff on spotting an em dash in someone's post as a tell that an agent wrote it. The hard rule at `voice-and-style.md:26` is Tommy's own on-air position, not a style preference. It stays absolute.

### 3.4 How the skill actually changes (Goal 2 problem 4)

**Recommended: keep `voice-and-style.md` as the hand-curated normative spec, and add one new sibling reference. Do not rewrite `voice-and-style.md`.**

Rationale: that file is Tommy-edited and encodes hard-won corrections ("Tommy's repeated edit note", the Northside Baseball framing rule, the em-dash prohibition). Regenerating it from a statistical profile would destroy curated knowledge and risk contradicting the hard rules. The evidence belongs in a separate, regenerable file.

Proposed edits, exhaustively:

1. **NEW** `references/voice-from-speech.md` (~150–200 lines), regenerable from `data/voice/profile.json`:
   - provenance header: episode count, word count, date, pipeline version
   - the **CARRY / TRANSLATE / DROP** table from §3.3, which is the most important content in the file
   - phrase bank: phrase, count, episode spread, bucket
   - measured sentence-length band
   - opener constructions and disagreement constructions, with real examples
   - analogy-domain rates, confirming or correcting the Italian/food + sports claim
   - the DROP filler list, verbatim, as a checklist
   - a "this file is evidence, `voice-and-style.md` is the spec" precedence note
2. **EDIT** `references/voice-and-style.md`: add **one** line under "The core sound" pointing at the new file and stating precedence. Nothing else. Line 3's provenance sentence gets ", and on a measured corpus of his speech (see voice-from-speech.md)".
3. **EDIT** `SKILL.md` Step 5: add `references/voice-from-speech.md` to the read-before-drafting list, with one clause noting it is evidence subordinate to the spec.
4. **NEW** `scripts/voice_profile.py` — generates the profile.
5. **NEW** `scripts/voice-lint.mjs` — §3.5.

**Rejected: rewriting `voice-and-style.md` from the corpus.** Destroys curated edit notes; risks the agent "learning" to name co-hosts and use spoken filler; and mixes a hand-tuned normative document with a regenerable artifact so neither can be updated safely.

**Rejected: putting the phrase bank inline in `voice-and-style.md`.** It would triple the file's length with tabular data, burying the hard rules the drafting agent most needs to see.

**Resolving the two-copy drift.** The copies already differ on 4 of 6 files (§1.8) and the **global copy is ahead** on `voice-and-style.md`. Plan:

1. **Reconcile first, before adding anything.** Diff all four divergent files, port the five extra global bullets into the in-repo `voice-and-style.md`, and adjudicate `SKILL.md`, `image-style.md`, `publishing-targets.md`. This is a Tommy-review step, not an automated merge, since it is genuine editorial content. **~2 hours.**
2. **Declare in-repo `.cursor/skills/writing-promptingbi-articles/` the single source of truth.** It is version-controlled; the global copy is not.
3. **Add `scripts/sync-skill.mjs`** with `--check` (hash-compare, print a table like §1.8, non-zero exit on drift) and `--push` (copy repo → global, never the reverse).
4. Wire `sync-skill --check` into `npm run build`'s pre-step alongside `scan-prompts --quiet`, warning only. Drift becomes visible on every build instead of discovered months later.

### 3.5 Validation and rollback (Goal 2 problem 5)

Three layers.

**(a) Blind A/B regeneration diff.** Pick two published posts whose episodes are cached: `published/2026-08/2026-08-24-ai-coe-better-not-bigger.md` (ep 529) and `published/2026-08/2026-08-26-hard-data-soft-data.md` (ep 539). For each, regenerate **one middle section** twice from the same transcript and angle file, once with the current skill and once with the new profile loaded. Present both to Tommy unlabelled alongside the published original. Success is Tommy preferring the new-profile version on at least 3 of 4 pairs. This is subjective, and it should be, because the target is his ear.

**(b) `scripts/voice-lint.mjs`, calibrated on his own published posts.** Mechanical checks:

| Check | Threshold |
| --- | --- |
| em dash count | **exactly 0** (hard rule, `voice-and-style.md:26`) |
| co-host names (`Mike`, `Seth`, `Carlo`, `Bauer`) | **exactly 0** (hard rule, line 27) |
| episode-reference phrases ("in this episode", "we discussed", "on the show") | **0** |
| DROP-list filler | 0, excluding inside code blocks and quotes |
| mean sentence length | inside the measured band from §3.2 #5 |
| self-answering questions | ≥1 per post |
| analogy-domain hits | ≥1 from a seeded domain |
| ALL-CAPS emphasis | ≤3 occurrences, single words only |

**Calibration is the critical step and must come first: run the linter against all 17 existing published posts and tune thresholds until they pass.** If the linter fails Tommy's own published work, the thresholds are wrong, not the posts. Skipping this produces a linter that fights the house style. This also gives a free regression suite: any future change to the profile can be re-run against 17 known-good documents.

**(c) Corpus spot-check.** Sample 30 random attributed turns from `transcripts/tommy/*.txt` and have Tommy confirm they sound like him. Cheap, and it catches systematic cluster-swap errors that every automated check would miss because a swapped corpus is internally consistent.

**Rollback path.** Every change is additive or one-line:

1. `git tag pre-voice-profile` before starting.
2. Revert = delete `references/voice-from-speech.md`, revert the one line in `voice-and-style.md` and the one clause in `SKILL.md`, run `sync-skill --push`. Two file reverts and one deletion.
3. `data/`, `transcripts/tommy/`, and the scripts are inert if the skill does not reference them. They can stay for Goal 1's sake even if Goal 2 is rolled back entirely.
4. The linter ships as a **warning-only** `npm run voice-lint`, never wired into `npm run build` as a failure. A voice heuristic must not be able to block a deploy.

### 3.6 Goal 2 phases

| Phase | Deliverable | Depends on | Effort |
| --- | --- | --- | --- |
| **2.0** | **Skill drift reconciled**; `scripts/sync-skill.mjs` with `--check`/`--push` | none (can start immediately) | **0.5 day** |
| **2.1** | `scripts/voice_profile.py` + `data/voice/profile.json` from available corpus | 1.3 (or 1.2 on the 16 validated episodes) | **1.5 days** |
| **2.2** | `references/voice-from-speech.md` drafted, CARRY/TRANSLATE/DROP table filled, **Tommy reviews the phrase bank** | 2.1 | **1 day** + his review |
| **2.3** | `scripts/voice-lint.mjs`, calibrated against the 17 published posts | 2.2 | **1 day** |
| **2.4** | A/B regeneration test, corpus spot-check, go/no-go | 2.2, 2.3 | **0.5 day** + his review |

---

## 4. Tooling and Windows install steps

Verified present: Python 3.12.10, yt-dlp 2026.07.04, ffmpeg 8.0-full, Node v24.16.0, RTX 4070 (12,282 MiB), `HF_TOKEN` set.

To install. **Use an isolated venv** so the diarization stack cannot disturb the global Python that `fetch_youtube_transcript.py` uses:

```powershell
cd C:\Github\Prompting-BI
python -m venv .venv-audio
.\.venv-audio\Scripts\Activate.ps1

# PyTorch with CUDA. VERIFY the current index URL at pytorch.org/get-started/locally
# before running; the cu-suffix moves with each release.
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu128

pip install whisperx pyannote.audio ctranslate2 faster-whisper
pip install requests feedparser

python -c "import torch; print(torch.__version__, torch.cuda.is_available())"   # expect True
```

Manual, one-time, cannot be scripted: sign in to huggingface.co and **accept the gated model terms** for `pyannote/speaker-diarization-3.1` and `pyannote/segmentation-3.0`. Downloads 401 without this even with a valid token. `HF_TOKEN` is already set in the environment.

Node side: **no new npm dependencies.** `episodes-sync.mjs`, `sync-skill.mjs`, and `voice-lint.mjs` can run on Node 24 built-ins (`fetch`, `node:fs`, `child_process` for yt-dlp) plus the Notion MCP for the Notion leg. `AGENTS.md` says do not add npm dependencies without asking, and this plan does not need to.

Add to `.gitignore`: `data/audio/`, `.venv-audio/`.

**Version pins I could not verify** (not installed, and I did not want to install into Tommy's environment during a read-only investigation): current `whisperx`, `pyannote.audio`, `torch`, and `faster-whisper` releases, and the correct CUDA wheel suffix. Resolve at install time and pin in a new `scripts/requirements-audio.txt`.

**Also UNVERIFIED:** real-world diarization accuracy on this specific audio. Published DER figures for `speaker-diarization-3.1` do not transfer cleanly to a two-host remote-recorded podcast with crosstalk. Phase 1.2's validation against the 16 `angles/` files exists precisely to measure it rather than assume it.

---

## 5. Effort summary

| Phase | Work | Elapsed |
| --- | --- | --- |
| 1.1 Metadata index | 1–1.5 days | 1–2 days |
| 2.0 Skill drift (parallel) | 0.5 day | 0.5 day |
| 1.2 Diarization + validation | 2–3 days | 3–4 days |
| 1.3 Batch 92 episodes | 1 day | 1 day + overnight |
| 1.4 Notion mirror + optional CI | 0.5 day | 0.5 day |
| 2.1 Voice profile script | 1.5 days | 1.5 days |
| 2.2 New reference file | 1 day | + Tommy review |
| 2.3 Voice linter | 1 day | 1 day |
| 2.4 Validation + go/no-go | 0.5 day | + Tommy review |
| **Total** | **~9.5–11 days** | **~2.5–3 calendar weeks** with review cycles |

Shippable increments: **Phase 1.1 alone** gives a complete 557-episode index with links, which is most of Goal 1's stated value. **Phase 1.1 + 2.0** is a genuinely useful half-day-plus-a-day outcome if the audio pipeline gets deferred.

---

## 6. Risks and mitigations

| # | Risk | Severity | Mitigation |
| --- | --- | --- | --- |
| **1** | **Cluster→identity swap silently poisons the corpus.** A swapped episode is internally consistent, so no downstream check notices, and the blog learns to write in Mike's voice. | **Highest** | Require enrollment **and** aggregate vocative voting to agree; quarantine on disagreement. Validate against the 16 hand-curated `angles/` files. Store `presence_confidence` per episode. Minimum-3-episodes rule on the phrase bank. Human spot-check of 30 turns (§3.5c) |
| 2 | Three-host era (pre-~465) and guest episodes break 2-speaker assumptions | High | Scope v1 to eps 466–557. Never pin `num_speakers`. Seth enrollment only if backfilling |
| 3 | ASR errors contaminate the phrase bank (`aentic thinking`, `VVT`, `parlia.tips` all present today) | High | WhisperX `large-v3` instead of YouTube auto-captions; domain hotword prompt; minimum-3-episodes rule |
| 4 | 33 GB audio and long GPU runtime | Medium | Stream → convert → delete, never store. `data/audio/` gitignored. Scope to 92 episodes. Overnight batch |
| 5 | Enumeration parser breaks on title drift (37 lowercase `ep.`, ep 539 duplicate, "No Ads" variants, three title eras) | Medium | Case-insensitive regex; dedupe by EpNum keeping longest duration; retain `youtube_title` raw for auditing; log unparsed entries |
| 6 | Skill drift worsens once a fifth reference file exists | Medium | Phase 2.0 **first**; `sync-skill --check` in the build pre-step |
| 7 | Naive "write like the transcript" degrades the blog | Medium | The whole of §3.3. Buckets are mandatory metadata; prose wins on form |
| 8 | Voice linter fights the house style | Medium | Calibrate on the 17 published posts before use. Warning-only, never a build gate |
| 9 | **Voice biometrics of third parties committed to a public repo** | Medium | Keep `data/enrollment/*.wav` gitignored and local; commit only embedding vectors, or nothing. Needs Tommy's decision (Q9) |
| 10 | Notion rate limits (observed `429`) | Low | Exponential backoff; Notion leg is optional and skippable |
| 11 | YouTube blocks or yt-dlp breaks | Low | Never in CI (§2.5). RSS is an independent path for everything except the video id |
| 12 | Index drifts from reality as episodes ship | Low | `episodes:sync` is idempotent; optional metadata-only CI check opens an issue on new episodes |

---

## 7. Open questions for Tommy, in the order they block work

1. **Scope: how far back?** Recommend eps **466–557** (~92, the two-host era) for v1. Full 557-episode backfill adds ~2–3 days, needs Seth enrollment, and yields 2021-era Power BI content that is off-topic for the blog. Approve the narrow scope, or ask for everything? *(Blocks 1.2)*
2. **Is the index for you, or for the site?** Plan assumes **internal only**: a git-tracked JSON, nothing rendered. If you eventually want a public "episodes I hosted" page, say so now, because it changes where the file lives and whether it becomes an Astro collection. *(Blocks 1.1)*
3. **Which episodes did Seth co-host, roughly?** Even "he was on through about ep 465" is enough to set the `era` boundary. The RSS boilerplate suggests ~465 but that is a footer change, not evidence. *(Blocks 1.2 if backfilling)*
4. **Can you record 60 seconds of clean solo audio for enrollment?** Fastest and highest-quality option. Alternative: name a conference talk or webinar where you are the only speaker. *(Blocks 1.2, hard blocker)*
5. **Am I right that Agentic Thinking is Mike's solo show?** I inferred it from `transcripts/ep-538.txt`. If you appear on some of those 34 episodes, they are not a clean Mike enrollment source and I need a different one. *(Blocks 1.2)*
6. **Write `Tommy Present` and `YouTube URL` back to the Notion EMP database?** Useful for you and Mike in the agenda, but it means an agent writing to a shared database you do not solely own. Yes / no / ask Mike first. *(Blocks 1.4)*
7. **Reconciling the skill drift needs your call on four files.** The global `voice-and-style.md` has five bullets the in-repo copy lacks, and `SKILL.md`, `image-style.md`, `publishing-targets.md` also differ. Should in-repo become the source of truth and absorb the global additions? Are there global edits you made deliberately and want to keep? *(Blocks 2.0, which blocks everything in Goal 2)*
8. **`transcripts/ep-541.txt` and `ep-544.txt` do not exist**, but five published posts set `source.transcript` pointing at them. Fetch and cache them, clear the field, or leave it? *(Cosmetic, but it is a broken agent contract)*
9. **Commit voice-enrollment samples?** These are voice biometrics for you, Mike, and possibly Seth, in a repo that backs a public site. Recommend gitignoring the WAVs and committing at most embedding vectors. Your call, and worth a word to Mike. *(Blocks 1.2)*
10. **Where should `data/` live?** Recommend repo root. Alternative is `src/content/blog/data/`, which is provably safe under the `{published,drafts}/**/*.md` glob (`angles/` and `backlog/` prove it) but relies on that glob never widening. *(Blocks 1.1, low stakes)*
11. **Is ~45% the right assumption for your share of speech?** It drives the corpus volume estimate (~122,000 words from the current cache). Phase 1.3 measures it properly; this only affects planning. *(Non-blocking)*
12. **A/B validation: two posts enough?** Plan uses `ai-coe-better-not-bigger` (ep 529) and `hard-data-soft-data` (ep 539) because both have cached transcripts. Prefer different ones? *(Blocks 2.4)*

---

## Appendix: verification log

Everything asserted as measured, and how.

| Claim | Method |
| --- | --- |
| 557 unique episodes, 1..557, zero gaps | `yt-dlp --flat-playlist` on `PLn1m_aBmgsbHr83c1P6uqaWF5PLdFzOjj`; 559 raw entries; Python case-insensitive regex + gap analysis |
| 1 duplicate (ep 539), 1 non-episode (theme song) | Same, grouped by episode number |
| 37 lowercase `ep.` titles | Case-sensitive vs case-insensitive regex differential |
| RSS: 557 items, 2021-05-19..2026-08-27, `itunes:episode` 1..558 with 25 holes | `Invoke-WebRequest` + `ElementTree` on `https://anchor.fm/s/5bb46378/podcast/rss` |
| Audio enclosures on 557/557, downloadable | `HEAD` on ep 558 enclosure → `HTTP 200`, `audio/mpeg`, 67,894,200 B |
| Seth in descriptions eps 1..465; "Mike & Tommy" eps 479..558 | Regex over all 557 RSS descriptions |
| Notion EMP: 253 rows, 199 with EpNum>0 (223..567), Guest 6, Recorded 10, URL 1 | Two aggregate SQL queries via Notion MCP |
| 23 transcripts, 272,189 words, 11,834 avg | Header read + word count over `transcripts/ep-*.txt` |
| Zero transcripts have speaker labels | All 23 headers read; body of `ep-553.txt` inspected directly |
| 17 files with `>>`, 3,583 turns, 15.4% anchor density, **62.7% alternation agreement** | Python prototype: `>>` split, vocative anchoring with brand-phrase exclusion, alternation consistency scoring |
| Agentic Thinking is Mike's solo show (34 videos) | Playlist enumeration + vocative analysis of `transcripts/ep-538.txt` |
| 16 `angles/` files with hand-curated attribution | Directory listing + grep for `Mike-only` / `Attribution:` |
| 20 posts with `source.episode`; 541 and 544 uncached | Grep `^\s+episode:` across `src/content/blog/**` vs `transcripts/` listing |
| Skill copies differ on 4 of 6 files; global `voice-and-style.md` ahead by 5 bullets | `Get-FileHash` comparison + full read of both copies |
| RTX 4070 12,282 MiB, driver 610.88, `HF_TOKEN` set, torch/pyannote.audio/whisperx absent | `nvidia-smi`, `pip list`, import probes, env check |
| Loader glob `{published,drafts}/**/*.md` | `src/content.config.ts:8` |
