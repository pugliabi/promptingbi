# Open decisions awaiting Tommy

Every decision currently blocked on you, collected so you can rule on them in one sitting. This is a
decision register, not a plan of work. Where a full plan already exists it is linked rather than
restated, and the entry carries only the call you have to make.

| | |
|---|---|
| Written | 2026-08-28 |
| Contents | Eleven open items, ordered by consequence rather than by when they arose. The numbers are stable ids assigned when an item arrived, which is why 10 and 11 sit second and third. |
| Read-only | Writing this file created and changed nothing else. Entry 10 records changes that earlier passes made outside it. |
| Every entry ends with | "If you do nothing." Several of these are genuinely fine to leave alone and you should be able to see which at a glance. |

## Triage table

| # | Decision | In one line | Effort if you act |
|---|---|---|---|
| 1 | [Cursor auto-commit and the `Co-authored-by` trailer](#1-cursor-auto-commit-and-the-co-authored-by-trailer) | Unrequested commits have been pushed to `main`, and one of them briefly put two files on the same permalink. | Minutes to rule, once the settings findings land |
| 10 | [How the skills are actually stored](#10-how-the-skills-are-actually-stored-and-the-unversioned-copy-of-the-voice-rules) | Nearly every skill is one file behind several names. The one exception is the article skill's `.claude` directory, which is real, unversioned, and holds the only copy of five voice rules. | 10 minutes to rule, 15 minutes to apply |
| 11 | [The uncommitted anti-slop plan contradicts itself](#11-the-uncommitted-anti-slop-plan-contradicts-itself-in-one-section) | Its working copy is half-converted to the corrected model, so section 12 now tells you to do things section 9 says not to. | 30 to 45 minutes to finish section 12 |
| 2 | [Which copy of the article skill is canonical](#2-which-copy-of-the-article-skill-is-canonical) | Superseded by entry 10. The premise of two independent copies was wrong, but the five-rule gap it describes is real and still needs your ruling. | 15 minutes to rule, 15 minutes to apply |
| 3 | [Voice enrollment and the voiceprint policy](#3-voice-enrollment-and-the-voiceprint-policy) | The episode-index build cannot start until you record 60 seconds of your own voice and decide what may be stored for co-hosts and guests. | 2 minutes of recording, then 9 to 10.5 working days of build |
| 4 | [Whether the real-tenant-code rule applies to teaching posts](#4-whether-the-real-tenant-code-rule-applies-to-teaching-posts) | A style rule says pull code from the tenant, but constructed teaching traps are often the better artifact. | 5 minutes to rule, no code change needed if you scope it |
| 5 | [Astro 5 to 7 upgrade timing](#5-astro-5-to-7-upgrade-timing) | The only way to clear the last three audit entries, none of which is reachable on a static site. | 5 to 7 hours in one sitting |
| 6 | [Line-ending normalization](#6-line-ending-normalization) | About 60 tracked files sit CRLF in the working tree, three of them blog markdown. The committed content is already uniformly LF, so this is cosmetic. | 15 minutes, as its own commit |
| 7 | [Document the scratch-file naming convention](#7-document-the-scratch-file-naming-convention) | The `*_tmp.*` convention exists only as a comment in `.gitignore`, so agents do not see it. Concrete action, not a judgement call. | 5 minutes |
| 8 | [Section count on the live 2026-08-28 article](#8-section-count-on-the-live-2026-08-28-article) | Seven body sections against a spec range of three to six. | Zero to leave it, 30 minutes to merge two sections |
| 9 | [Em dashes in non-rendering source](#9-em-dashes-in-non-rendering-source) | Dashes survive in places no site visitor reaches. One of those places writes a dash into new content files. | Zero to leave it, 10 minutes for the one that matters |

## 1. Cursor auto-commit and the `Co-authored-by` trailer

**Findings pending.** A lookup of the relevant Cursor settings is in flight and will be filled in here.
The entry is recorded now so the evidence does not get lost, and it sits first because it is the only
item on this list that can change the live site without anyone asking.

**The decision.** Two related calls. Whether to turn off whatever is producing commits nobody
requested, and whether the `Co-authored-by: Cursor <cursoragent@cursor.com>` trailer should stay on
commits you wrote by hand.

**Why it is open.** The mechanism has not been identified yet, so there is nothing to switch off with
confidence.

**What is established, and verified today.** Commits have appeared and been pushed to `main` without
anyone asking, sometimes in rapid succession describing the same change. `0d018ed` at 10:37 and
`a382891` at 10:40 both describe publishing the same DAX post. `a382891` is the damaging one: it added
`published/2026-08/2026-08-28-agents-raise-the-floor-and-lower-the-ceiling.md` while leaving the older
`2026-08-31-` file in place, repointed that older file's `date` and `permalink` to 2026-08-28, and
deleted its `draft: false` line. That left two collection entries claiming
`2026/08/28/agents-raise-the-floor-and-lower-the-ceiling`. `c8619a6` at 10:45 deleted the duplicate and
restored the field.

Two corrections to how that incident has been described. The stripped `draft: false` was not the
breaking part: `src/content.config.ts` declares `draft: z.boolean().default(false)`, so removing the
line changes nothing. The duplicate file sharing one permalink is the real defect. And the trailer is
not on every commit. It is on the six most recent, starting at `c8619a6` (10:45 today), and absent from
`a382891` and everything before it.

**Local git mechanisms are ruled out.** No `commit.template` is set at any scope. `core.hooksPath` is
unset. `.git/hooks` contains only the fourteen stock `.sample` files. The trailer is therefore applied
by Cursor at the tool layer, not by this repository.

**Options.** Wait for the settings findings and then rule. Or, independently of the findings, add a
cheap guard: a build-time or pre-push check that no two posts share a permalink, which is the specific
failure that actually fired.

**Recommendation.** Hold the settings decision until the findings land, but treat the permalink guard as
worth doing on its own merits. It is a few lines, it catches the exact failure that has already
happened once, and it does not depend on understanding the cause.

**If you do nothing.** The trailer is cosmetic and harmless. The unrequested commits are not: the
failure mode is silent, it reached `main`, and nothing currently prevents a repeat.

## 10. How the skills are actually stored, and the unversioned copy of the voice rules

**Supersedes the two-copies model.** Entry 2, entry 4, and three plan documents were all built on the
belief that `writing-promptingbi-articles` exists as two independent copies that a mirror script has to
reconcile. That is not how the skills are stored. Read this entry before ruling on 2 or 4, and treat the
canonicalization sections of [`plans/skill-drift-reconciliation.md`](skill-drift-reconciliation.md),
[`plans/skill-canonicalization-decision.md`](skill-canonicalization-decision.md), and the committed
version of [`plans/anti-slop-and-voice-design.md`](anti-slop-and-voice-design.md) as unreliable. It sits
second on this list because one finding is a live data-loss exposure and another is a hook that commits
and pushes without being asked.

**The decision.** Whether to replace the one real `.claude` directory with a link into the vault. That
collapses three paths onto one file and ends the drift structurally, rather than papering over it with a
synchronizing process that has to keep running correctly forever. Two smaller calls ride along: whether
to push the vault's two unpushed commits, and whether the `no-ai-slop` retirement planned elsewhere still
makes sense now that its real blast radius is known.

**Why it is open.** Because the correct model was only established today, after the plans that depend on
it were written, and because one of its consequences (the five voice rules living in a single
unversioned directory) is the kind of exposure that should be closed on a deliberate decision rather than
by whichever agent next happens to touch the file.

**Verified by direct observation.** Raw paths and results are kept here so you can confirm without
re-deriving any of it.

1. **This repo links out, it does not store.** `dir /AL C:\Github\Prompting-BI\.cursor\skills` returns
   five junctions and no real directories among them: `mcp-builder`, `memory-manager`, `no-ai-slop`,
   `northside-demo-project`, and `writing-promptingbi-articles`, each targeting
   `C:\Github\agent-skills\skills\skills\<name>`. Three unrelated real directories also sit in that
   folder, `promptingbi-article`, `pugliabi-fabric-api`, and `ste`, and this repo tracks files in all
   three.
2. **The vault.** `C:\Github\agent-skills` is its own git repository, remote
   `https://github.com/pugliabi/agent-skills.git`. Under the doubled `skills\skills\` path it holds 246
   skill directories. Call it the vault. Every junction above resolves into it.
3. **The global Claude directory points into the same vault.** Of the 156 directories now in
   `C:\Users\pugli\.claude\skills`, 153 are reparse points, 135 `SymbolicLink` and 18 `Junction`. So
   most skills are one file reachable under several names, and an edit through any name is an edit to
   all of them.
4. **`no-ai-slop` is one file, not two.** It is a junction in both `.cursor\skills` and `.claude\skills`,
   both pointing at the vault. The two copies previously described as byte-identical are the same bytes.
5. **Exactly three directories in `.claude\skills` are real**, and one of them matters: `commands`
   (which contains no `SKILL.md`), `executing-plans`, and `writing-promptingbi-articles`. For the last
   of these, `Get-Item` returns `Attributes : Directory` with an empty `LinkType` and an empty `Target`,
   where every linked sibling returns a reparse point and a vault target. This was the load-bearing
   inference of the first pass and it is now confirmed: the one skill that drifts is the one skill that
   is copied rather than linked.
6. **That real directory has diverged from the vault in three of its six files.**
   `git diff --no-index --numstat` against the vault copy gives `SKILL.md` 2 insertions and 2 deletions,
   `references/publishing-targets.md` 3 and 10, and `references/voice-and-style.md` 5 and 1.
   `references/article-structure.md`, `references/image-style.md`, and
   `scripts/fetch_youtube_transcript.py` are identical.
7. **The five voice rules exist in exactly one unversioned place.** The `voice-and-style.md` difference
   is rules V1 through V5. The vault, and therefore every path this repo or Cursor can reach, holds one
   summary line where the real `.claude` directory holds five detailed rules. That directory is not
   inside any git repository: no history, no remote, no backup, one accidental overwrite from gone. The
   anti-slop work depends on that file. This is a live data-loss exposure, not a tidiness problem, and
   it is the single most important line in this entry.
8. **The two git histories had already diverged, so double-tracking is not a theoretical worry.** Before
   the vault commit noted next, `HEAD:.cursor/skills/writing-promptingbi-articles/SKILL.md` in this repo
   was blob `1bf40b9` while `HEAD:skills/skills/writing-promptingbi-articles/SKILL.md` in the vault was
   `9f51be9`. One set of bytes on disk, two repositories tracking it, two different recorded states.
   Both now read `1bf40b9`.
9. **Vault state.** The 33 changed lines that were sitting uncommitted during the first pass are now
   commit `f992eca`, held back from the remote on purpose so the Stop hook below could not sweep them
   into a mislabelled adopt commit. `git status -sb` in the vault now reports
   `## main...origin/main [ahead 2]` with a clean tree.
10. **What `sv-sync` is.** `C:\Github\agent-skills\hooks\session-stop.ps1`, registered in
    `~\.claude\settings.json` as a Claude Code `Stop` hook, so it fires at the end of every Claude Code
    session with no confirmation. It scans `~\.claude\skills` for real directories containing a
    `SKILL.md`, runs `sv adopt --from claude --yes --push` on any it finds, then runs `git add -A`,
    commit, and push against the vault. `git log --oneline --grep='\[sv-sync\]'` returns 52 commits, the
    most recent two today at 10:42 and 11:37.
11. **The adopt inside it has never run.** In PowerShell, `sv` is a built-in alias for `Set-Variable`,
    and aliases take precedence over external executables, so no process is ever launched. Under
    `powershell.exe -NoProfile`, `Get-Command sv` returns the alias and `$LASTEXITCODE` is empty
    afterward. The decisive independent check is a timestamp: the `.claude` copy of
    `publishing-targets.md` was modified at 11:01 today, and the 11:37 hook run committed only
    `SKILL.md`. A working adopt would have carried both files.
12. **A case-sensitivity bug in the skill text.** It spells the repo `C:\Github\prompting-bi` where the
    real directory is `C:\Github\Prompting-BI`. It resolves only because Windows is case-insensitive,
    and it would break on any other filesystem.

**What is still unverified.** Everything above was observed directly. These three are not, and the
distinction matters here because the first pass drew a confident wrong conclusion from exactly this kind
of gap:

- Whether the same file being tracked by two git repositories has caused a divergence beyond the
  `1bf40b9` against `9f51be9` case, for instance in the five files not compared by hash.
- Whether other machines or checkouts of the vault exist, which determines what pushing `f992eca`
  actually exposes.
- The current internal state of `plans/anti-slop-and-voice-design.md`, which is entry 11 and is
  reported second-hand there rather than inspected.

**The correction to the earlier account.** The first pass concluded that nothing had ever synced the
copies, then reversed and concluded that `sv-sync` was a one-way destructive copy from `.claude` into the
vault that overwrote repo-side edits. Both are wrong, and the second one is wrong in a way that is
written into the committed spec, so it is worth stating the replacement plainly.

**No special mechanism is needed to explain the drift.** `.claude` holds a real directory that nothing
syncs. Agents edit whichever path they were pointed at. Each side keeps its own edits. That is the entire
explanation, and the bidirectional drift, where each side held an improvement the other lacked, is
exactly what that predicts. There was never an overwriting process, so there is no need to reason about
which edits survived an adopt and which did not.

**What does run every session is the git block.** The adopt is a silent no-op, but the `git add -A`,
commit, and push that follow it are not conditional on the adopt succeeding. So at the end of every
Claude Code session, whatever happens to be dirty anywhere in the vault gets committed under a message
describing an adoption that did not occur. 52 commits carry that message. This is a real hazard on its
own terms: unrelated work in a 246-skill repository gets swept into misleading commits automatically,
and the commit log is now an unreliable record of why the vault changed.

**What this changes.** Five consequences, in rough order of how much each one alters an existing plan.

**The mirror script becomes unnecessary.** Replacing the real `.claude` directory with a symlink to the
vault collapses three paths onto one file and ends the drift structurally. A synchronizing process
prevents drift only while it keeps running and keeps being correct; a single file cannot drift from
itself. This retires `sync-skill.mjs` as specified in
[`plans/host-episodes-and-voice-style.md`](host-episodes-and-voice-style.md) section 6.5, along with the
ledger gate described there, because the failure it guards against stops being reachable.

**`executing-plans` has to be linked too, or the hook stays armed.** It is the other real directory with
a `SKILL.md`, and it is byte-identical to its vault copy, so linking it is free. Leaving it real means
the Stop hook keeps finding a directory to adopt and keeps generating `[sv-sync]` commits even after the
article skill is linked. Two links, not one.

**Retiring `no-ai-slop` is much larger than the spec assumed, and that may change the answer.** It is
not a directory local to this repo. It is a vault directory shared with every project that links to it,
plus a junction here, plus a junction in `.claude`, plus two files tracked by this repo. The
retirement was scoped as deleting something local. It is not, and the wider blast radius is a reason to
re-examine the decision rather than execute it.

**`no-ai-puglia` should be created in the vault and linked out**, matching the pattern every other
shared skill follows, rather than as a real directory inside this repo. A real directory here would
reproduce the exact condition that caused the only drift on the machine.

**The five-rule gap in entry 2 survives the correction, but its urgency inverts.** The gap is real and
still needs your ruling. What changes is the risk profile: the unique content is not in a copy that a
sync process might overwrite, it is in the only directory on the machine that no repository is watching.

**Options.** Link the `.claude` directory to the vault and rule on the five rules in the same sitting.
Or link it and postpone the rules, accepting that linking overwrites or discards one side and therefore
forces the ruling anyway. Or leave the layout alone and build `sync-skill.mjs` as specified, which means
writing and then maintaining a process to solve a problem that a symlink removes.

**Recommendation.** Link both real directories to the vault, but copy the five rules into the vault copy
first, in that order. The ordering is the whole point: linking is destructive to whichever side loses,
and the losing side currently holds the only copy of V1 through V5. So port first, verify the vault copy
holds them, then replace the directory with a link. Do the two environment-specific lines in `SKILL.md`
at the same time, and see the open question below on why rewording beats choosing. Disarm or remove the
Stop hook as part of the same change rather than relying on it finding nothing to do, because a hook
that unconditionally commits and pushes a shared repository is worth removing on its own merits.

**Open questions to leave for later.** Four, none of them blocking the recommendation above.

- **What to do about the two environment-specific lines.** One file cannot hold both an absolute Windows
  path and a repo-relative one. Before choosing which environment wins, check whether the text can be
  reworded to be true from either location. If it can, that beats choosing, because choosing leaves the
  other environment permanently slightly wrong and reintroduces a reason for someone to edit one side.
- **Whether to push the vault's two commits.** They are deliberately unpushed. Pushing settles the
  divergence in item 8 for good; not pushing keeps them local and leaves the exposure that a future hook
  run could bundle them with unrelated work under a wrong message.
- **Whether the double-tracked file has diverged anywhere else**, and whether one repository should stop
  tracking those six files rather than both continuing to.
- **Whether the same pattern exists on other machines.** The hook message names `PUGLIA-DESKTOP`, which
  implies the design anticipated more than one.

**Live hazard, now defused but worth knowing.** During the first pass the vault held 33 uncommitted lines
in `SKILL.md`. Because the Stop hook commits and pushes whatever is dirty, an end-of-session run would
have swept them into a commit claiming to be an adopt. That specific exposure is closed, they are
`f992eca` now, but the mechanism is unchanged and will do the same to the next dirty file.

**Small cleanup, not decisions.** Both authorized `brainstorming` links have been removed, from this
repo's `.cursor\skills` and from `~\.claude\skills`, after confirming the vault target was absent and no
tracked files existed on either side. Cursor was loading a working `brainstorming` from the superpowers
plugin cache the whole time, so nothing changed functionally. Three links still dangle in
`~\.claude\skills`: `grok-imagine-prompting`, `xai-media`, and `xai-skill`. A fourth dangles at
`~\.cursor\skills\brainstorming` and was left alone as outside the authorized scope. None of these needs
a ruling.

**If you do nothing.** The five voice rules stay in an unversioned directory that no backup covers, and
that is the one consequence here that is not safe to leave. Everything else degrades slowly rather than
breaking: the drift continues, the plans keep describing a layout that does not exist, and the Stop hook
keeps adding commits to the vault with messages that misdescribe what changed.

## 11. The uncommitted anti-slop plan contradicts itself in one section

**Reported, not verified here.** `plans/anti-slop-and-voice-design.md` was deliberately not opened while
writing this entry, because a pass was interrupted mid-edit and its state was being reported separately.
Everything below comes from that report. Confirm it when you open the file.

**The situation.** The file is modified and uncommitted at 905 lines, up from 721 committed. Seven
sections were updated to the corrected model described in entry 10 before the pause, but section 12 was
not finished, and it now contradicts section 9. Its sequencing still says to wait for the dash pass, to
delete `.cursor/skills/no-ai-slop/`, and to mirror to the global directory. Its hazards table still
claims 22 em dashes per copy and byte-identical `no-ai-slop` copies. Entry 10 shows all three of those
instructions to be wrong, and the two copies to be one file.

**So there are two bad versions, in different ways.** The committed version is internally consistent and
describes the wrong model throughout. The working copy is much closer to correct but contradicts itself
in one section, which is arguably worse to hand to an agent, because a consistent wrong document
produces one predictable wrong outcome while an inconsistent one produces whichever outcome the reader
happens to reach first.

**The action.** Finish section 12. This is the first task on resuming, ahead of anything in entry 10,
because entry 10's recommendations cannot be executed from a document that still instructs the opposite
in its sequencing section.

**If you do nothing.** The contradiction sits in an uncommitted working copy, so nothing propagates on
its own. The risk is entirely that someone, or some agent, reads section 12 and acts on it, and the
`no-ai-slop` deletion it prescribes has the blast radius described in entry 10.

## 2. Which copy of the article skill is canonical

**Corrected by entry 10, read that first.** This entry originally described two independent copies of the
skill needing reconciliation. That premise was wrong. `.cursor/skills/writing-promptingbi-articles/` in
this repo is a junction into the vault at `C:\Github\agent-skills\skills\skills\`, not a copy, so what
this entry called "the repo copy" is the vault copy seen under another name. The
`C:\Users\pugli\.claude\skills\writing-promptingbi-articles\` directory is the only real second copy on
the machine, and it is the only skill directory of its kind. The five-rule gap below is real and still
needs your ruling; only the storage model and the mechanics of applying it have changed.

Full detail was [`plans/skill-drift-reconciliation.md`](skill-drift-reconciliation.md), and the gap below
is its section 4. Be careful with the rest of it: that document mentions junctions, symlinks, and the
vault nowhere at all, so it is built end to end on the superseded model and its section 9 application
sequence should not be followed. Entry 10 replaces it.

**The decision.** Whether the five voice rules that exist only in the real `.claude` directory should be
adopted into the vault copy, which is the copy this repo and Cursor both see. Canonicality itself is no
longer in question: entry 10 recommends collapsing the paths onto the vault file, which makes the vault
copy canonical by construction. What is left is purely editorial, which of the five rules you want.

**Why it is open.** Right now the rules that govern a draft depend on which tool loaded the skill. The
plan's section 4 is the sharpest case: the vault copy has one summary line where the real `.claude`
directory has five detailed rules, roughly 1,650 bytes of operational content the summary cannot
reconstruct. Three of the five name concrete assets (the `pugliabi-fabric-api` skill and the Northside
workspace, the `# ---- Validation ----` and `left_anti` notebook convention, the interior-designer
analogy). That directory sits inside no git repository, so the content exists in exactly one unversioned
place, which entry 10 records as the most serious finding on this list.

**Progress since the plan was written.** I re-hashed both copies. Four of the plan's objective fixes
have landed: the `tags` prohibition is gone from the global `publishing-targets.md`, the repo `SKILL.md`
has a `/prompts/` section at Step 9, and `references/image-style.md` and `references/article-structure.md`
are now byte-identical across both copies. The voice-and-style gap is untouched: the repo hash is still
`B16124F6600E6656`, exactly as the plan recorded it, and `Pull real code out of the tenant` appears in
the global copy and nowhere in the repo copy. `SKILL.md` and `publishing-targets.md` still differ.

Entry 10 puts exact numbers on what is left: of the six files, three are identical and three differ, by
2 changed lines in `SKILL.md` (both of them environment-specific paths), 13 in `publishing-targets.md`,
and 5 in `voice-and-style.md`, which are the five rules.

**Options.** Port all five rules into the vault copy, then link, which is entry 10's sequence. Or port
some and reject others, which is the same sequence with an editorial pass first. Or link without porting
and lose the five rules, which is the outcome to avoid and is what happens by accident if anyone links
the directories without reading this. The plan's section 9 rule-by-rule structure is still usable as a
checklist even though its surrounding mechanics are superseded.

**Recommendation.** Port all five rules in as written, with one carve-out handled separately as entry 4
below, then link. The reasoning is asymmetric risk rather than editorial preference: the real `.claude`
directory has no version history and no backup, so every day it holds unique content is a day those five
rules can be lost to a single overwrite. There is also no evidence the vault copy's single line was a
deliberate simplification; the timestamps show the `.claude` copy being edited three weeks later and the
vault copy simply never receiving the update. Porting before linking is not optional, because linking
discards whichever side loses.

**If you do nothing.** The drift persists and drafts stay non-deterministic depending on which tool ran.
More importantly, the five rules stay in an unversioned directory. One correction here too:
[`plans/host-episodes-and-voice-style.md`](host-episodes-and-voice-style.md) section 6.5 specifies
`sync-skill.mjs` to refuse a repo-to-global push until a ledger records that this ruling has been
applied, which reads as a guard against the loss scenario. It is not one. The exposure is not a sync
process overwriting a copy, it is a directory no repository is watching, and entry 10 retires that script
rather than implementing it.

## 3. Voice enrollment and the voiceprint policy

Full detail: [`plans/host-episodes-and-voice-style.md`](host-episodes-and-voice-style.md), decisions in
section 1.1, open questions in section 10, effort in section 8.

**The decision.** Two questions, both hard blockers on the diarization phase, and neither is technical.
Q1: will you record 60 seconds of clean solo audio for enrollment? Q2: what may be stored for the
voiceprints, samples or only derived embeddings, and does that differ for co-hosts and guests?

**Why it is open.** Q1 exists because you ruled the attribution method local (WhisperX plus
`pyannote/speaker-diarization-3.1` on the 4070) and rejected hosted APIs. A local pipeline identifies
speaker clusters by comparing them against a reference recording, so there is no path around the
enrollment step. Q2 is a consent question, not an engineering one: the references are voice biometrics
for you and for Mike, held in a repo that backs a public site. It needs your call and, for anyone other
than you, a conversation before capture.

**Options.** Q1: record two minutes yourself, or name a talk or webinar where you are the only speaker
for 30 continuous seconds, or point at a monologue stretch in a cached episode for me to clip by ear.
Q2: commit the WAVs, or gitignore the WAVs and commit only the `enrollment_embedding` vector in
`data/hosts.json`, or keep both out of git and accept a non-reproducible pipeline.

**Recommendation.** Record it yourself. It is two minutes of your time against the highest-quality
reference the pipeline can get, and the clip-by-ear fallback is circular: it uses the corpus to
bootstrap the tool that is supposed to segment the corpus. On Q2, gitignore the WAVs and commit only
the embedding vector: the pipeline stays reproducible, no raw biometric sample enters a repo that backs
a public site, and the same treatment extends cleanly to Mike. Talk to Mike before capturing his
sample rather than after.

**Scope note, and a correction.** The 25-episode figure was not assumed. Section 1.1 records it as your
locked ruling D2, demand-driven rather than a fixed range: an episode joins the corpus when a repo
artifact references it, and 25 is the measured current membership of that rule as of today. So the count
floats by design and needs no confirmation. What is genuinely soft is the roughly 45 percent Tommy
speech share, which the plan flags as unmeasured and resolves per episode during the run.

**Also still open, lower stakes.** Four more questions sit behind Q1 and Q2. Q3 asks whether Agentic
Thinking is Mike's solo show, which blocks his enrollment source. Q4 asks whether an agent may write
derived fields back to the shared Notion EMP database, which blocks only the optional last phase. Q5
(Seth's co-hosting era) and Q6 (which two posts to use for the A/B validation) block nothing yet.

**If you do nothing.** Nothing happens, and nothing degrades. The plan is explicitly build-ready rather
than in flight, D5 records the start date as held, and three increments are shippable without touching
enrollment at all: the corpus rule and linkage hygiene (half a day), the 557-episode metadata index
(one to 1.5 days, no GPU and no enrollment), and the skill reconciliation from entry 2. If you want
movement without answering the consent question, those are the three to green-light.

## 4. Whether the real-tenant-code rule applies to teaching posts

**The decision.** One of the five global-only voice rules says to pull real DAX and PySpark out of the
tenant rather than writing plausible code, with invented-but-realistic code as the fallback rather than
the first move. The call is whether that rule applies to every post or should be scoped to walkthrough
and case-study posts.

**Why it is open.** Both DAX blocks in the live 2026-08-28 article are constructed teaching traps, not
tenant assets. The first pairs a `TOTALYTD` against a fact column with the same measure against a marked
date table. The second is a `SUMX` over `FILTER ( Sales, [Total Sales] > 5000 )` that quietly filters
line items instead of orders through context transition. Both exist to be wrong in a specific,
instructive way. A real tenant measure that happens to be wrong in exactly that way is not something you
can go fetch, and the working ones do not teach the trap.

**Options.** Apply the rule everywhere, which means tenant access and rewriting code you already
approved. Scope it to walkthrough and case-study posts, leaving teaching posts free to construct traps.
Or leave the rule as written and treat it as a default that a post can note it is departing from.

**Recommendation.** Scope it. Add a clause to the rule saying that posts whose argument depends on a
specific failure mode may construct the minimal example that produces it, and that the tenant-first
directive governs posts demonstrating real work. This costs nothing, changes no published code, and
keeps the rule's actual intent, which is to stop plausible-looking filler from standing in for real
assets. A constructed trap is not filler; it is the artifact.

**Interaction with entry 2.** The rule currently exists only in the global copy, so this is a decision
about text you have not yet adopted. Rule on this at the same time as entry 2 and the carve-out lands in
the same edit rather than as a later amendment.

**If you do nothing.** Nothing breaks and the live article does not change. The cost is that the next
agent to load the global skill reads an unqualified instruction to fetch tenant code, and on a teaching
post will either burn time trying or produce a weaker example. That is a recurring small tax rather than
a defect.

## 5. Astro 5 to 7 upgrade timing

Full detail: [`plans/astro-7-upgrade.md`](astro-7-upgrade.md). The exposure analysis is section 1, the
sequencing argument is section 10.1, the effort table is 10.2.

**The decision.** Timing only. The plan is scoped, the target is settled (5.18.2 to 7.2.9, sequenced 5
to 6 to 7 across two commits on one branch and a single deploy), and the method is not in question.

**Why it is open.** You deferred it deliberately on 2026-08-28 when the `npm audit fix` pass ran, which
took the four patch-level transitive advisories and declined `--force` precisely because `--force`
would have pulled this major.

**What it buys.** `npm audit` now reports three entries, one low and two high, against `astro`,
`esbuild`, and `sharp`. This upgrade is the only thing that clears them: the advisory range on the Astro
entry is `<=7.0.9` and there is no patch on the 5.x line, and per the plan's section 1.3, Astro 6
clears none of the transitive advisories and only five of the eight Astro ones, so 6 is a waypoint and
not a destination.

**What it does not buy.** Every one of those advisories is close to theoretical here. This is a fully
prerendered static site on GitHub Pages with no adapter, no SSR, no server islands, no middleware, and
no user input reaching a render path. Every rendered value comes from git-tracked front matter you wrote.
The plan checked each advisory against the actual code and found the sinks absent: zero `define:vars`,
no spread attributes, no View Transitions, no hydrated islands, one unnamed static `<slot />`. The
`sharp` one cannot fire because nothing in the build hands it an image; every image is a raw `<img>`
against a `public/images/` path. The only advisory with a plausible path to you is the `esbuild`
dev-server file read, which needs `npm run dev` running and something else on your network reaching it.

**Options.** Do it next, do it opportunistically alongside the `tsconfig.json` work the plan recommends
as a de-risker, or leave it until a real reason arrives.

**Recommendation.** Not next, but do not let it drift indefinitely. Do the `tsconfig.json` plus
`astro check` addition first as its own small task: the plan calls it the single highest-leverage
de-risker, because it converts most of the verification checklist from manual output inspection into a
compile-time check. Then schedule the upgrade as a deliberate 5 to 7 hour sitting rather than squeezing
it between posts. The honest framing is currency, not security: staying on 5.18.2 means these three sit
on the report permanently and the 5.x line stops receiving fixes.

**If you do nothing.** Nothing is exploitable, and the site keeps building. The audit report stays dirty
and the eventual jump gets larger. One prerequisite has already cleared itself: the plan's section 10.3
asked for the Node 24 changes to be committed and deployed first, and they landed in `f3d61cd`.

## 6. Line-ending normalization

**The decision.** Whether to run a normalization pass so the working tree stops producing Git warnings.

**Why it is open, and where reality differs from the brief.** I checked before writing this, and the
situation is milder than described in two ways and broader in one.

`.gitattributes` already exists, is tracked, and contains `* text=auto`. There is nothing to add.
`core.autocrlf` is `true`, set in the system config at `C:/Program Files/Git/etc/gitconfig`, not in this
repo. Every tracked file shows `i/lf` in the index, so the committed content is already uniformly LF and
there is no normalization debt in history.

The CRLF files are a working-tree artifact only, and there are far more than two. Roughly 60 tracked
files show `w/crlf`, including all of `.cursor/skills/mcp-builder/`, all of
`.cursor/skills/memory-manager/`, the whole `writing-promptingbi-articles` skill, all 25 transcripts,
`src/components/PostListItem.astro`, and `src/pages/page/[page].astro`. Among the 42 files in
`src/content/blog/`, three are CRLF rather than two: `published/2026-07/2026-07-20-stop-re-prompting.md`,
`drafts/2026-08-21-four-pillars-of-data-governance-agents.md`, and `backlog/README.md`.

**Options.** Run `git add --renormalize .` as its own commit and let it settle everything at once. Or
re-save just the three blog markdown files, which are the ones a content diff could ever touch. Or leave
it.

**Recommendation.** Leave the 60, fix the three. The full renormalize touches 60 files for a cosmetic
gain and produces exactly the kind of enormous, unreviewable commit that makes the next content diff
harder to read, which is the problem it was meant to solve. The three blog files are the only ones where
a stray whole-file diff would land in the middle of prose you are trying to review. Do those three, as
their own commit, so it never mixes into a content change.

**If you do nothing.** Git keeps printing `LF will be replaced by CRLF` and diffs stay slightly noisy.
Since the index is already uniformly LF, the whole-file-diff risk is limited to a file being re-saved
with the opposite ending by an editor, which is annoying rather than damaging. This is safe to ignore
indefinitely.

## 7. Document the scratch-file naming convention

Marked as a concrete action rather than a judgement call.

**The action.** Add the scratch-file convention to `AGENTS.md` so agents name throwaway files
`*_tmp.*` without being told.

**Why it is open.** `.gitignore` deliberately uses narrow patterns, `*_tmp.txt`, `*_tmp.json`, and
`*_tmp.md`, and the comment above them explains why: `transcripts/*.txt` are real tracked content, so a
broad `*.txt` rule would hide them. Verified, and the file also already says `Name throwaway files
<thing>_tmp.<ext>`. The problem is where that sentence lives. It is a comment in `.gitignore`, which is
not a file agents read for instructions, and it is documented nowhere in `AGENTS.md`, `CLAUDE.md`, or
`.cursor/rules/blog.mdc`. An agent recently created `.diff-src.txt` in the repo root, which matched
nothing and showed up as untracked clutter.

**Options.** Add a line to `AGENTS.md`, most naturally under Guardrails. Or add one-off filenames to
`.gitignore` as they appear.

**Recommendation.** Add the line to `AGENTS.md`. Chasing filenames in `.gitignore` treats each instance
as a new problem, and the narrow patterns are load-bearing, so broadening them is not an option. One
sentence in the file agents actually read fixes the class.

**If you do nothing.** Occasional untracked clutter in `git status`, cleaned by hand. Note that
`.diff-src.txt` never entered history and is already gone from the working tree, so there is nothing to
clean up right now.

## 8. Section count on the live 2026-08-28 article

**The decision.** Whether to restructure
`src/content/blog/published/2026-08/2026-08-28-agents-raise-the-floor-and-lower-the-ceiling.md` to fit
the article-structure spec's section range.

**Why it is open.** Verified: the post has seven body H2 sections plus Takeaways, against
`references/article-structure.md` step 5, which specifies three to six body sections. It was left as-is
deliberately, because each section develops a distinct idea, none of them is padding, and the piece is
long and code-heavy by design.

**Options.** Leave it. Or fold "Then the Agent Stops Being a Token Furnace" into "How to Navigate This"
as the payoff framing ahead of the numbered list, which brings it to six and is the only merge in the
piece that does not damage an argument.

**Recommendation.** Leave it. Restructuring a live post carries real cost, headings are anchor targets
for inbound links and the URL is already indexed, against a benefit no reader experiences. The spec
range is a default for a typical post, and this one is explicitly not typical. If the count ever needs
to come down, the merge above is the one to make, but do it as part of a real edit rather than for its
own sake.

**If you do nothing.** Nothing. The post is live, correct, and reads well. This is the safest item on
the list to leave permanently.

## 9. Em dashes in non-rendering source

**The decision.** Whether the zero-em-dash house rule extends past rendered prose into source comments,
editor-only content, and build scripts.

**Why it is open, and where reality differs from the brief.** I swept the whole repo rather than
checking the three named files, and the picture is wider.

The good news first: no published post, draft, or `/prompts/` artifact contains an em or en dash. The
sweep of rendered content held.

The three named files check out, with one qualification. `src/pages/page/[page].astro` has exactly one,
in a frontmatter comment the compiler strips. `src/components/Comments.astro` has exactly one, in a
frontmatter block comment, likewise stripped. `src/pages/preview/[...slug].astro` has exactly five, and
the dev-only claim holds: line 28 is `if (!import.meta.env.DEV) return [];` inside `getStaticPaths`, so
the route emits nothing in a production build. But those five are not comments. They are in rendered
template strings and JSX text, in the preview page title and its ribbon and its post list. They never
reach a site visitor, but you see them every time you use `/preview/`.

Beyond the three: `scripts/scan-prompts.mjs` has four and `scripts/new-prompt.mjs` has one. Three of
those are console output, but one is not. The scaffold template in `scan-prompts.mjs` writes
`category: ${category}  # TODO: confirm - guessed from the code` into the front matter of every draft
artifact it generates, with a real em dash where that hyphen is. That is a script seeding a dash into new
content files.

There are also 45 or so across the editor-only folders, `src/content/blog/angles/` and
`src/content/blog/backlog/`, which Astro never loads, plus dashes in `AGENTS.md`, `CLAUDE.md`,
`README.md`, `.cursor/rules/blog.mdc`, two unrelated skills, and all three existing plan documents.

**Options.** Extend the rule to all source and sweep everything. Keep the rule scoped to rendered prose.
Or scope it to rendered prose and fix only the scaffold template.

**Recommendation.** Scope it to rendered prose, and fix the one line in `scan-prompts.mjs`. The comments
and the editor-only folders are genuinely not worth touching: nobody is reading them as your prose, and
sweeping them means a large diff across files including the plan documents that describe the sweep. The
scaffold is different in kind, because it is not a dash sitting in a file, it is a dash-generating
machine pointed at the content directory. One character.

**If you do nothing.** No reader ever sees any of it. The only live consequence is that every artifact
scaffolded by `npm run scan-prompts -- --write` arrives with an em dash in its front matter comment,
which someone then has to catch or carry.
