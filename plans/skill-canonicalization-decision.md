# Skill canonicalization: the decision sheet

One question to settle before the anti-slop rules get written: **which copy of
`writing-promptingbi-articles` is authoritative, and how does the other one stay in step?**
Everything else here is a short ruling you can accept in bulk.

Full per-file forensics: [`plans/skill-drift-reconciliation.md`](skill-drift-reconciliation.md).
Register entry: [`plans/open-decisions.md`](open-decisions.md) items 2 and 4. Nothing is repeated
from either; this sheet only carries what you need to decide.

| | |
|---|---|
| Written | 2026-08-28 |
| Verified against | Live files on disk, re-hashed at write time, not the drift plan's tables |
| Read-only | This file is the only thing created. Neither skill copy was touched. Nothing committed. |
| Quote convention | Source text contains em and en dashes. Quotes here mark them `[...]` and `[to]` so this file stays dash-free. The originals are unchanged. |
| Decisions | 15 total. **13 safe to bulk-accept, 2 genuinely yours.** |

## 0. Is the drift plan still accurate?

**Mostly. Four of its findings are now stale because they were fixed, and one has flipped direction.**

| Drift plan claim | Status today |
|---|---|
| §2 Notion `<summary>` warning is global-only, highest priority | **Fixed.** Present verbatim in both copies at line 28. |
| §5.1 Global forbids `tags`, contradicting the live schema | **Fixed, and reversed.** Global now documents `tags` correctly and explains the silent-failure mode better than the repo copy does. The repo copy is now the thinner side of that paragraph. |
| §6 `image-style.md` differs by line endings only | **Fixed.** Byte-identical, hash `57CCB7A39A85F6BD`. |
| §7 Repo `SKILL.md` has a duplicated paragraph | **Fixed.** Appears once. |
| §8.3 Neither copy mentions `/prompts/`, `scan-prompts`, or `promptsExempt` | **Stale.** Both copies now carry a full Step 9. Not a gap any more. |
| §8.2 Both copies spell the path `C:\Github\prompting-bi` | **Still true.** Real directory is `C:\Github\Prompting-BI`. |
| §10 In-repo should be source of truth | **Still the right call, for a reason §10 did not have.** See section 1. |

Current hashes, all six files:

| File | Repo | Global | |
|---|---|---|---|
| `SKILL.md` | `A386D7EC9FCC624C` | `762F91D5612375F7` | differs |
| `references/voice-and-style.md` | `B16124F6600E6656` | `BFA528DF6DE75725` | differs |
| `references/publishing-targets.md` | `067B029A9A2D99CA` | `24AA83B0F1DBBEDA` | differs |
| `references/article-structure.md` | `F3ACEA4C0281EEF8` | same | identical |
| `references/image-style.md` | `57CCB7A39A85F6BD` | same | identical |
| `scripts/fetch_youtube_transcript.py` | `D98B9647704BC418` | same | identical |

## 1. C1. Canonical copy

**Repo copy is canonical. The global copy becomes a generated mirror that nobody edits by hand.**

### Both copies have to exist, and that is not a preference

| Tool | Loads | Consequence |
|---|---|---|
| Cursor agents, this workspace | **Both.** `.cursor/skills/` and `~/.claude/skills/` are both in the skill list of this very session, two entries with the identical frontmatter `name: writing-promptingbi-articles` | Which one an agent reads is not something either of us controls |
| Claude Code, inside this repo | **Global only.** The repo has no `.claude/skills/` directory | The repo copy reaches no Claude Code session at all |
| Claude Code, any other project | Global only | The skill is loaded 157 skills deep in a directory shared across every project you have |
| Fresh clone of this repo | Repo copy arrives with the clone. Global copy does not exist | Global is unreproducible by definition |

So deleting either one breaks a real workflow. The question is not which one survives, it is which one is
**written to**.

### Why the repo copy is the one written to

Three reasons, in order of weight.

1. **The global copy has no history, so it can never be audited or rolled back.** `~/.claude` is not a git
   repo. Every provenance question the drift analysis answered was only answerable on the repo side: which
   copy changed, when, and whether a difference was a deliberate simplification or a missed update. An
   authority you cannot diff against yesterday is not an authority. This is also the reason the five voice
   rules are currently at risk: they exist in exactly one unversioned directory.
2. **A fresh clone reconstitutes the repo copy and cannot reconstitute the global one.** New machine, new
   laptop, or a contractor. The repo copy travels with the site it documents.
3. **It sits next to the code it documents.** The `tags` error existed because a change to
   `src/content.config.ts` and the file documenting it could not land in one reviewable commit. Co-location
   is what closes that loop.

### The sync mechanism

`plans/host-episodes-and-voice-style.md` §6.5 already specifies `scripts/sync-skill.mjs` with
`--check` / `--report` / `--push`, a `data/skill-sync.json` ledger that refuses a push until the
reconciliation ruling is recorded, and deliberately **no `--pull`**. That spec is sound and should be
built as written. Three additions:

- **Take a list of skills, not one hardcoded path.** `no-ai-slop` is also dual-copy
  (`.cursor/skills/no-ai-slop/` and `~/.claude/skills/no-ai-slop/`, currently byte-identical, hashes
  `16719EFD6DC6FE59` and `D0625B5AB63AEF35`). The anti-slop work will edit it, so it will drift next
  unless the script covers it from day one. Same for anything else you dual-copy later.
- **Staleness signal:** wire `skill:check` into the `npm run build` pre-step next to
  `scan-prompts --quiet`, warning only, never able to fail a deploy. You build before every push, so the
  warning fires on the next build after the first divergent edit, while whoever made it still remembers why.
- **Delete `.cursor/skills/promptingbi-article/`.** It is a third, git-tracked copy of the voice spec
  (`reference/editorial-guide.md`, 2026-07-16) carrying its own versions of the contrast-framing,
  self-answering-question, and quotable-prediction rules. It has no `SKILL.md`, so no tool loads it, which
  is exactly why it will rot silently and confuse the next person who greps for a voice rule.

**Contrarian option worth five seconds.** On Windows you can make drift structurally impossible:
delete the global directory and replace it with a junction, `mklink /J
"%USERPROFILE%\.claude\skills\writing-promptingbi-articles" "C:\Github\Prompting-BI\.cursor\skills\writing-promptingbi-articles"`.
One set of bytes, no script, no ledger, no staleness. The tradeoffs are real though: the global skill
silently changes when you switch git branches, it breaks entirely on a machine without the repo cloned,
and it is invisible in a directory listing. **Recommend the script over the junction**, because the
branch-switch behaviour is the kind of surprise that costs an hour six months from now. Take the junction
only if you would rather have zero maintenance than zero surprises.

## 2. The six remaining editorial divergences

Two are consequential enough to read. Four are consequential but have only one defensible answer, so they
read as coin flips even though they are not. Nothing here is a genuine tossup.

| # | Where | Recommend | Read closely? |
|---|---|---|---|
| D1 | `SKILL.md` Step 1, transcript path | State both forms | No, forced by C1 |
| D2 | `SKILL.md` Step 2, adjacent-episode mining | Port global into repo | **Yes** |
| D3 | `SKILL.md` Step 5, code-heavy word carve-out | Port global into repo | **Yes** |
| D4 | `SKILL.md` Step 8, `source` contract | Keep repo | No |
| D5 | `publishing-targets.md`, front-matter example | Keep repo | No |
| D6 | `publishing-targets.md`, the "Use ONLY" paragraph | Merge both | No |

### D1. Transcript path, relative or absolute

Repo: `Transcripts live in the prompting-bi repo at `transcripts/ep-{N}.txt`.`
Global: `Transcripts live in the prompting-bi repo at `C:\Github\prompting-bi\transcripts\ep-{N}.txt`.`

**Recommend: state both, one clause.** `transcripts/ep-{N}.txt` in the repo root
(`C:\Github\Prompting-BI\transcripts\` when the skill runs outside the repo). The drift plan called this
your call. It stops being your call the moment C1 lands: one file feeds both a workspace-rooted Cursor
session and a Claude Code session that may be running anywhere, so the text has to work from either.
Fix the `prompting-bi` to `Prompting-BI` casing in the same sweep, both copies, all four occurrences.
**Not a coin flip, but no judgement needed.**

### D2. Adjacent-episode mining

Global-only, end of Step 2. Repo has nothing equivalent:

> **Mine adjacent episodes too, not just the source one.** Once the angle is set, query the EMP data
> source for earlier episodes on the same theme and pull their transcripts for supplementary Tommy
> material: a better analogy, a sharper one-liner, a client story, the same argument he made more clearly
> six weeks earlier. Dispatch a subagent per transcript (they are 50-80 KB each) and ask it to return only
> angle-relevant material with per-item attribution [...] confidently Tommy, confidently co-host, or
> uncertain. This is what separates an article from a single-episode recap, and Tommy asks for it by name.

**Recommend: port to repo.** It adds a capability rather than overriding an instruction, and it encodes
three things the repo copy cannot infer: that cross-episode mining happens at all, the subagent dispatch
pattern with its size rationale, and the three-way attribution taxonomy. **Consequential.**

### D3. Code-heavy word carve-out

Global Step 5 inserts this between the word range and the hard rules. Repo has nothing:

> **Code-heavy articles run longer, and that is what Tommy wants:** when a post walks a worked example
> with several real code blocks, 2,500[to]3,000+ words is correct, and cutting code to hit a word target
> is the wrong trade every time. The word range governs prose padding, not worked examples.

**Recommend: port to repo.** Without it, `Write 1,200[to]1,800 words` reads as a ceiling and an agent
will trim code blocks to meet it. This one is load-bearing for section 3: four of the five voice rules push
toward more real code, and this carve-out is the only thing stopping the word limit from cancelling them.
Port them separately and you ship an internal contradiction. **Consequential.**

### D4. `source` front-matter contract

Repo: `set frontmatter source.episode (EpNum), source.title (episode Name), source.notion (EMP page URL),
and source.transcript [...] Later edits read that file first; Notion/YouTube only on a miss or refresh.
Omit source for original / non-episode posts. This is editor-only and must never appear in the published
article body.`

Global: `set source.episode, source.title, source.notion, and source.transcript: "transcripts/ep-{N}.txt".
Later edits read that file first.`

**Recommend: keep repo.** Strict superset in meaning, and the editor-only clause is independently required
by `.cursor/rules/transcripts.mdc`. **Not a coin flip, but nothing to weigh.**

### D5. Front-matter example block

Repo's fenced example carries seven lines global lacks: `tags: []` with its pointer to `src/lib/tags.mjs`,
and the full six-line `source:` block with real values. Global's example stops at `featured:`.

**Recommend: keep repo.** Both fields are declared in the live schema and appear in nearly every existing
post. **Nothing to weigh.**

### D6. The "Use ONLY" paragraph

Both sides are now factually correct and each says something the other does not. This is the only place a
real merge is needed.

Repo names the fields and the `source` contract:

> Use ONLY schema fields from `src/content.config.ts` (`title`, `date`, `permalink`, `description`,
> `featured`, `tags`, `draft`, `source`). When the source was an EMP episode, always set [...]

Global explains why omitting `tags` is dangerous:

> **`tags` is one of those declared fields** [...] Because `tags` defaults to `[]`, omitting it fails
> silently [...] the build passes, the post deploys, and it simply never appears on any tag page.

**Recommend: repo's paragraph plus global's silent-failure sentence.** The failure mode sentence is the
only part of that paragraph an agent cannot derive from the schema, so it earns its place.
**Nothing to weigh.**

### Two mechanical items, accept without reading

| # | Divergence | Recommend |
|---|---|---|
| M1 | Repo `from the repo` vs global `from the prompting-bi repo` (Step 1B) | Take global's phrasing. Same concern as D1, resolved the same way |
| M2 | `draft: true` comment: repo `keep true while in drafts/` vs global `flip to false at publish` | Merge: `ALWAYS on new posts; keep true while in drafts/, flip at publish` |

## 3. The five global-only rules in `voice-and-style.md`

Repo has one line where global has five. The repo line is a lossy paraphrase of two of them:

> - DAX blocks earn their place when they demonstrate a point, especially agent deviations documented in
>   comments.

**Adopt all five.** Four unconditionally, one with a scope clause that is already open as
[`open-decisions.md`](open-decisions.md) item 4.

### V1. Instruction-based beats opinion-based. **Adopt.**

> - **Instruction-based beats opinion-based.** Tommy's repeated edit note: an article that only takes
>   positions is half an article. Every major section of a worked example should leave the reader something
>   they can go execute, and the code block is usually what does that. If a section is pure argument, ask
>   what artifact belongs under it.

Enforceable and it improves the writing. "If a section is pure argument, ask what artifact belongs under
it" is a check an agent can run on a finished draft. It is also described as distilled from your own review
notes, which makes it observed practice rather than aspiration.

### V2. Pull real code out of the tenant. **Adopt with a scope clause. This one is yours.**

> - **Pull real code out of the tenant instead of writing plausible code.** DAX and PySpark blocks earn
>   their place when they demonstrate a point, and they are strongest verbatim (lightly trimmed) from
>   Tommy's actual assets. Use the `pugliabi-fabric-api` skill to fetch real notebook definitions from the
>   Northside workspace, or the Power BI modeling MCP for real measures. Invented-but-realistic code is the
>   fallback, never the first move.

**This is the unsatisfiable one.** Most drafting sessions have no tenant access, and both DAX blocks in the
live 2026-08-28 article are constructed teaching traps that no tenant could supply: a real measure that is
wrong in exactly the instructive way does not exist to be fetched. As written the rule is unenforceable
in the majority case, which is how rules get quietly ignored along with the rules around them.

**Recommend adopting it with the scoping clause from `open-decisions.md` item 4:** the tenant-first
directive governs posts demonstrating real work; a post whose argument depends on a specific failure mode
may construct the minimal example that produces it. That preserves the rule's actual intent, which is
stopping plausible filler from standing in for real assets, without asking for something that cannot be
delivered. Adopt-as-written or scope-it is your call, but do not drop it.

### V3. Validation cells. **Adopt.**

> - **Validation cells are the other signature code block.** Tommy's real Fabric notebooks all end with
>   `# ---- Validation ----` and hard `assert` statements: referential integrity via `left_anti` joins,
>   expected value sets, distribution bands, coverage checks, and regression asserts whose failure message
>   names the bug they guard. These land better than any prose about "making sure it's right." Show the
>   assert, not the intention.

Names a concrete convention nothing else in the repo records. **See section 4: the closing line is already
an anti-slop rule.**

### V4. Agent deviations in comments. **Adopt.**

> - **Agent deviations documented in comments are gold.** Notebook header comments like
>   `# FIXES SHIPPED HERE: (1) event P&L uses the corrected TotalCost (no labor double-count)` are the
>   agent declaring what it changed and why. Quote them.

Cheap, specific, and the worked example makes it self-explaining.

### V5. One extended analogy, prefer the one he actually told. **Adopt.**

> - **One extended analogy, and prefer the one he actually told.** When a transcript contains a personal
>   analogy (the interior designer wife seeing a room he couldn't see), use it and drop the invented one,
>   even if the invented one is more polished. Two competing extended analogies in one article is one too
>   many.

**See section 4: this is already an anti-slop rule and it is the best one in the file.**

### Which of the five already address AI slop

**Three do, and the anti-slop work should extend them rather than restate them.**

| Rule | What it already covers |
|---|---|
| **V5** | The strongest anti-slop rule anywhere in the skill. `use it and drop the invented one, even if the invented one is more polished` targets the exact LLM behaviour of preferring a slicker fabrication over a real specific, and `Two competing extended analogies in one article is one too many` caps metaphor density. The new rules should point at V5 for analogies, not write a second analogy rule. |
| **V3** | `Show the assert, not the intention` and `These land better than any prose about "making sure it's right."` is show-don't-tell, scoped to code. It maps directly onto the `no-ai-slop` principle **Always show, don't tell the reader what to think.** Extend, do not duplicate. |
| **V2** | `Invented-but-realistic code is the fallback, never the first move` is the same real-over-plausible instinct as V5, applied to code. Plausible-but-invented detail is a primary slop tell. |

V1 and V4 are craft rules with no slop content.

## 4. Interaction check with the incoming anti-slop rules

**Yes. Four existing rules conflict, two of them head-on.** They are all in the `Signature moves` and
`The core sound` sections of `voice-and-style.md`, identical in both copies, so canonicalization does not
resolve them.

The counterparty already exists in this repo: `.cursor/skills/no-ai-slop/SKILL.md`, git-tracked, with a
`Patterns to cut` list. The collisions are verbatim, not thematic.

| | `voice-and-style.md` says | `no-ai-slop/SKILL.md` says |
|---|---|---|
| **A1** | **Contrast framing** to sharpen stakes: "not just a nice to have, but a must have." | **Binary contrasts.** "This is not X. It's Y." / "The question isn't X, it's Y." / **"It's not just X but Y."** State Y directly. |
| **A2** | **Self-answering questions** to drive rhythm: "Can it? Well, of course it can!" | **Rhetorical setups.** [...] and **self-answered "Question? Answer." pairs.** Drop them and make the point. |
| **A3** | **Bold, quotable predictions** to close big ideas: "English is going to become the most potent programming language." | **Fake-profound kickers.** Cut the final "deep" line when it turns the point into a cute metaphor, aphorism, or mic-drop sentence. |
| **A4** | **Short, impactful sentences.** [...] If a sentence needs a second breath, split it. / **Short, blunt opinions dropped as their own line.** "I hate redundancy." | **Robotic rhythm.** Avoid repeated sentence shapes [...] and stacked punchy fragments. / **Dramatic fragmentation.** "X. And Y. And Z." [...] Use complete sentences. |

**A1 and A2 are direct.** The voice file's illustrative example for contrast framing, `not just a nice to
have, but a must have`, is a word-for-word instance of the construction `no-ai-slop` names and bans. Same
for the self-answering question: `Can it? Well, of course it can!` is precisely the `Question? Answer.`
pair. These are not two rules that happen to point different directions. One file teaches the exact string
the other file flags.

**A3 and A4 are pressure, not contradiction.** A quotable prediction that is a real claim about the world
is not a fake-profound kicker; one that exists to sound deep is. Short blunt sentences are Tommy's actual
cadence; the slop tell is *stacking* them into uniform staccato. Both can be reconciled with a frequency
cap rather than a ban.

### What to do about it

**Do not resolve A1 through A4 inside the anti-slop rules.** If the new rules ban a construction that
`Signature moves` still lists with a worked example, an agent will do whichever it read last, and the
output becomes non-deterministic in the same way the two copies are today.

**Recommend, and this one is genuinely yours:** rewrite `Signature moves` at the same time as the
anti-slop rules land, in one edit to one canonical file.

- **A1 and A2:** these are load-bearing for whether the blog still sounds like you. Two options. Keep them
  and add an explicit precedence line saying `voice-and-style.md` wins over `no-ai-slop` for these two
  patterns, capped at once per article. Or retire them and let `no-ai-slop` govern. My read is keep them,
  capped: they are in your published posts, they predate any LLM, and a detector flagging a construction
  you have used for years is the detector's problem. But it is your voice, not a mechanical question, and
  the honest answer is that a reader who does not know you cannot tell your contrast framing from a
  machine's.
- **A3 and A4:** cap without asking. One quotable prediction per article, and no more than two consecutive
  fragment sentences. Safe to bulk-accept.

**Also worth knowing:** the same three patterns appear a third time in
`.cursor/skills/promptingbi-article/reference/editorial-guide.md`. Deleting that directory (section 1)
removes a copy you would otherwise have to keep in step.

## 5. The default set

### Accept in bulk, 13 items

| # | Decision |
|---|---|
| C1 | Repo copy canonical. Global becomes a generated mirror. Build `scripts/sync-skill.mjs` per `host-episodes-and-voice-style.md` §6.5, extended to take a skill list so `no-ai-slop` is covered. Wire `skill:check` into the build pre-step, warning only. Delete `.cursor/skills/promptingbi-article/`. |
| D1 | Transcript path: state both forms in one clause. Fix `prompting-bi` to `Prompting-BI` casing, all occurrences, both copies. |
| D2 | Port the adjacent-episode mining paragraph into the repo copy. |
| D3 | Port the code-heavy word carve-out into the repo copy. |
| D4 | Keep the repo copy's `source` contract in Step 8. |
| D5 | Keep the repo copy's front-matter example, `tags: []` and the `source:` block. |
| D6 | Merge: repo's "Use ONLY" paragraph plus global's silent-failure sentence about `tags`. |
| M1 | Take global's `from the prompting-bi repo` phrasing. |
| M2 | Merge the `draft: true` comment. |
| V1 | Adopt: instruction-based beats opinion-based. |
| V3 | Adopt: validation cells. |
| V4 | Adopt: agent deviations in comments. |
| V5 | Adopt: one extended analogy, prefer the one he actually told. |

### Yours to call, 2 items

| # | Decision | Why it is yours |
|---|---|---|
| **V2** | Does the tenant-code rule apply everywhere, or is it scoped to posts demonstrating real work with constructed traps allowed for teaching posts? | Already open as `open-decisions.md` item 4. It sets what you are willing to be blocked on before a draft can ship, and it decides whether two live DAX blocks are compliant or exceptions. Recommend scoping. |
| **A1 + A2** | Do contrast framing and self-answering questions survive the anti-slop rules? Keep with a precedence line and a once-per-article cap, or retire them. | This is your voice against a cliché detector, and both readings are defensible. Recommend keeping, capped. Whichever way it goes, it must be one edit to one file at the same time the new rules land. |

### Order of operations

Unchanged from the drift plan's §9 in principle, shortened by the four fixes:

1. Port D2, D3, and all five V rules from global into the repo copy. **Commit.** The unversioned content
   is now safe and every later step is reversible.
2. Apply D1, D4, D5, D6, M1, M2, and the casing sweep to the repo copy. **Commit.**
3. Write the anti-slop rules and the `Signature moves` rewrite (A1 through A4) into the repo copy, one
   edit. **Commit.**
4. Write `data/skill-sync.json`, build `sync-skill.mjs`, then push repo to global. Re-hash: all six pairs
   match.

Steps 1 and 2 are safe to run before you rule on V2 and A1/A2, because both of those decisions are edits
to the repo copy, which is versioned. **A repo to global push before step 1 destroys the five voice rules
with no recovery path.** That is still the only irreversible move in this whole sequence.
