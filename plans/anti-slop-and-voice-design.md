# Anti-slop and voice: approved design

An approved design, not a proposal. Tommy has ruled on the shape below, including rejecting an earlier
version of this document that built the check as a repo script wired into `npm run build`. This version
replaces it. Nothing from the rejected delivery mechanism survives.

| | |
|---|---|
| Written | 2026-08-28 |
| Status | Approved. Ready to build |
| Delivers | One new skill, `.cursor/skills/no-ai-puglia/`, with a bundled script and a bundled corpus, plus two remaining edits to `writing-promptingbi-articles`. A third edit to that skill has already landed, see section 8 |
| Retires | `.cursor/skills/no-ai-slop/`, the generic editor whose rules conflict with the house voice spec |
| Touches no | `package.json`, the repo's `scripts/` directory, the build, or any git hook |
| Read-only | This document created no other file, changed no code, and committed nothing |

## Contents

1. [What this decides](#1-what-this-decides)
2. [The evidence](#2-the-evidence)
3. [Settled decisions and Tommy's rulings](#3-settled-decisions-and-tommys-rulings)
4. [The skill: shape, modes, and self-consistency](#4-the-skill-shape-modes-and-self-consistency)
5. [The boundary: script versus prose](#5-the-boundary-script-versus-prose)
6. [The bundled script and the corpus file](#6-the-bundled-script-and-the-corpus-file)
7. [The voice guidance the skill applies](#7-the-voice-guidance-the-skill-applies)
8. [Edits to `writing-promptingbi-articles`](#8-edits-to-writing-promptingbi-articles)
9. [Canonicalization, the mirror, and the stale third copy](#9-canonicalization-the-mirror-and-the-stale-third-copy)
10. [What simplification cut](#10-what-simplification-cut)
11. [Scope, success, and the non-goal](#11-scope-success-and-the-non-goal)
12. [Sequencing, and hazards left open](#12-sequencing-and-hazards-left-open)

## 1. What this decides

The trigger was running the 2026-08-28 article through Simon Willison's LLM cliché highlighter
(`tools.simonwillison.net/llm-cliche-highlighter`) and getting many matches. The worry was that the
articles read as AI-written.

The research inverted the assumption. On the detector's own measure the article is **less** cliché-dense
than Tommy's pre-workflow human writing. What the detector cannot see, and what corpus comparison found
instead, is a small set of words that appear repeatedly in the article and **zero times** in the
attributed corpus of his own speech. The tell was never the sentence patterns. It was the vocabulary.

So the design targets diction that is not his, and stops chasing cliché patterns.

The delivery is **one skill Tommy invokes, `no-ai-puglia`**, either against a finished article or as the
last thing that happens while drafting. Not a linter, not a build step, not a hook. The mechanical
counting lives in a script bundled inside that skill, and the corpus it counts against ships in the same
directory.

It is a new skill rather than a revision of the generic `no-ai-slop`, which is retired from the repo in
the same change. Section 2.4 is the reason: the two skills disagree about three constructions, and one
personalized skill settles that where two overlapping ones cannot.

## 2. The evidence

### 2.1 Detector density, and why it does not support the alarm

The detector runs **38 patterns with no weighting**, every pattern enabled by default, overlapping
matches deduped. Two facts about its configuration matter. Its own description of the `colon-triple`
pattern says the pattern is "noisy in technical writing, leave it off by default if your corpus is
documentation," and it ships enabled anyway. That pattern is the largest single contributor across
Tommy's archive. Its `ai-vocab` description says "one hit can be coincidence, several is a tell," which
is the one piece of the detector's guidance this design keeps.

Matches per 1,000 words of prose:

| Corpus | Words | Matches | Per 1,000 |
|---|---|---|---|
| The 2026-08-28 article | 2,986 | 15 | 5.02 |
| Tommy's two 2024 posts, pre-workflow human writing | 1,556 | 9 | 5.78 |
| The other 15 published posts, AI-assisted era | 35,053 | 135 | 3.85 |
| Three episode transcripts, contaminated | 36,828 | 131 | 3.56 |

The article ranks 3rd of 17 posts, and sits **below his own most cliché-dense human post**. A design
that treated detector density as the problem would be optimizing a number that is already fine.

### 2.2 The finding that redirected the design

| Term | Article | 2024 posts | Other 2026 posts | Attributed Tommy corpus |
|---|---|---|---|---|
| genuinely | 7 | 0 | 15 | **0** |
| quietly | 4 | 0 | 14 | **0** |
| sit with | 3 | 0 | 3 | **0** |

Verified against the live file today: 7, 4, and 3 respectively, counting `sit with`, `sits with`, and
`sitting with` together. None of the three is a detector pattern. No public list would have caught them.
They were found by comparing the draft against his own corpus, which is the whole argument for the
primary mechanism.

Meanwhile the detector flagged "here's the thing," which appears **8 times in the attributed corpus**,
and the `not just X, but Y` frame, which appears **37 times in attributed speech** and 4 times in his
1,539 words of 2024 writing, making it his densest construction as a human writer. The detector is
flagging him for sounding like himself.

### 2.3 What is soft in this evidence

- A 16th match on the article was an artifact of code-block stripping and is excluded from the 15 above.
- The 2024 baseline is small, between 1,539 and 1,586 words depending on how front matter and code are
  stripped. Two matches either way moves its rate about 1.3 per 1,000.
- The transcript row in the 2.1 table is **contaminated**: it is whole-file text including co-hosts,
  jingle lyrics, news reads, and mailbag segments. Read 3.56 as a corpus figure, never as a Tommy figure.
- Word counts in this document do not reconcile to the decimal across sources, and that is expected.
  The same 2024 posts measure at 1,539, 1,556, and 1,586 words under three different stripping rules.
  Only the script's own tokenizer produces operative numbers.
- Counts taken over raw transcripts and counts taken over the attributed corpus are different measures
  and are labelled as such throughout. "Here's the thing" is 8 in the attributed corpus and 19 across
  all raw transcript text. The larger number includes Mike.

### 2.4 The house-style conflict

Three constructions are prescribed by one skill file and banned by another.

| | `references/voice-and-style.md` | `.cursor/skills/no-ai-slop/SKILL.md` |
|---|---|---|
| Self-answering questions | Line 15 prescribes them: "Can it? Well, of course it can!" | Bans self-answered "Question? Answer." pairs under Rhetorical setups |
| Contrast framing | Line 18 prescribes it and illustrates with `not just a nice to have, but a must have` | Bans "It's not just X but Y" under Binary contrasts |
| Short blunt sentences | Lines 8 and 11 demand them | Bans stacked punchy fragments under Dramatic fragmentation and Robotic rhythm |

The illustrative example on line 18 is a word-for-word instance of the string the detector's `not-just`
regex matches. **The two files are in direct conflict**, and one of them teaches the exact construction
the other flags.

**This table is the evidence for why a new skill exists rather than a patch.** The conflict is not a bug
in either file. It is what happens when a generic editor written for any writer meets a style spec
written for one. Patching `no-ai-slop` would leave a general-purpose skill carrying three
Tommy-specific exceptions, and it would still sit alongside the personalized one, which is the overlap
that caused this.

The conflict is resolved instead by two things landing together: `no-ai-puglia` carries the frequency
budgets from section 7.1 where `no-ai-slop` carried bans, and `voice-and-style.md` takes the
sentence-rule edit in section 8. After that one file prescribes the three constructions and the other
counts them, so they are complementary rather than opposed, and the generic skill that disagreed with
both is retired.

## 3. Settled decisions and Tommy's rulings

Inputs to the design, not open questions.

| # | Ruling |
|---|---|
| 1 | The problem is **80 percent** readers discounting the content as AI-written and **20 percent** it not sounding like him. When the two conflict, perception wins |
| 2 | Enforcement is **advisory**. Nothing blocks, nothing gates a deploy |
| 3 | **Accept the reframe.** Target diction that is not his. Stop chasing cliché patterns |
| 4 | On the three conflicting constructions: **keep them as his, cap the frequency.** They are overused in writing, not wrong |
| 5 | **No repo script, no build integration, no hooks.** This lives in a skill, with any script it needs bundled inside that skill |
| 6 | **The skill is new and is named `no-ai-puglia`.** Tommy named it. The generic `no-ai-slop` is retired from the repo rather than edited, because two overlapping skills with conflicting rules is how this started |
| 7 | **Calibration markers do not carry over to writing.** See below |
| 8 | **The short-sentence rule is harmful and gets rewritten.** See below |
| 9 | The orchestra analogy in the live article **is not to be worried about** |
| 10 | The stale third copy of the voice spec **stays where it is** |

**Ruling 7, calibration markers, in full because it overrules a research recommendation.** The research
in `plans/voice-model-first-pass.md` found that his speech constantly marks its own confidence ("This is
where I'm conflicted, Mike", "I don't know if I'm strong about this, but") and its section 5.3
recommended reintroducing that on the page once per article. **Tommy disagrees.** He draws a distinction
between saying that out loud and wanting it in print, and he explicitly endorsed the flat-prescription
edits that removed hedges from the live article. Hedge removal stays. Do not propose restoring them.

Worth recording that his ruling is the reading the written evidence already supported. The same
document's section 4 cross-check marks hedged confidence **absent** from his 2024 writing and verdicts
it "does not transfer as is." Section 5.3's "deliberate, sparing reintroduction" was the analyst's
judgment call to add something the written corpus does not contain. Section 7 of that document, which
concludes his voice is "calibrated, not confident," is therefore **correct about his speech and
overruled about his prose**, and any future pass over that plan should read it that way.

**Ruling 8, the sentence-length correction, is a measured contradiction of the current spec.**

| Corpus | Sentences | Mean | Median | Under 6 words | 21 words or more |
|---|---|---|---|---|---|
| Tommy written, 2024 posts | 78 | 19.7 | **19** | **7.7%** | **39.8%** |
| Tommy spoken, attributed | 1,792 | 18.1 | 14 | 16.0% | 30.5% |

He gets **longer** when he writes, not shorter. The 2026-08-28 article ran at a mean of 13.5 words with
26.7 percent of sentences at six words or fewer, which is not the same bucket as the table's "under 6"
column and so is quoted separately rather than placed in a row it does not fit. Either way the article
sits far on the short side of his written baseline.

The current rule at `voice-and-style.md` line 8, "if a sentence needs a second breath, split it,"
instructs a writer to do the opposite of what he does, and uniform short sentences are themselves a
machine tell. Section 7.2 carries the replacement text.

## 4. The skill: shape, modes, and self-consistency

### 4.1 Shape on disk

`.cursor/skills/no-ai-puglia/` is a **new** skill, personalized to Tommy. The layout mirrors
`writing-promptingbi-articles`, which is the only bundled-script precedent in the repo, so an agent that
knows one knows the other.

```
.cursor/skills/no-ai-puglia/
  SKILL.md                      # the pass itself: two modes, the judgment rules, the pattern list
  eval.md                       # self-check, structure borrowed from the retired skill
  references/
    voice-profile.md            # carries, drops, and per-article budgets
  scripts/
    voice_check.py              # bundled counter, stdlib only
    voice-corpus.json           # the frequency profile it counts against
```

**Filenames, and why these.** Nothing inside the skill repeats the person's name, because the directory
already carries it and `no-ai-puglia/scripts/puglia-corpus.json` says it twice. `voice_check.py` and
`voice-corpus.json` share a prefix so the script and its data read as a matched pair in any listing.
`voice-profile.md` stays deliberately distinct from `writing-promptingbi-articles/references/voice-and-style.md`,
since those two will often be open together and a shared name would invite editing the wrong one. The
script is snake_case and the data and reference files are kebab-case, which looks inconsistent and is
not: each follows the convention already used for its own file type in this repo, `fetch_youtube_transcript.py`
on one side and every `.md` and `.json` on the other.

The corpus JSON sits beside the script rather than in a third directory because the script is its only
reader, and a sibling path means the script resolves it relative to its own file with no configuration
and no argument. `references/` is for what the agent reads; `scripts/` is for what executes and what
execution consumes.

**What is borrowed from `no-ai-slop` rather than reinvented.** The retired skill got several things
right and they should survive it: the detect-versus-edit split described in 4.2, the `Patterns to cut`
list, the editing principles that protect a writer's vocabulary and cadence, and the `eval.md`
self-check pattern. Copy them into the new skill and change only what section 2.4 shows to be in
conflict, which is the three constructions that become budgets instead of bans.

**What is not carried over is the generic contract.** `no-ai-slop` preserves any writer's voice.
`no-ai-puglia` preserves one writer's voice and counts against one writer's corpus, so its frontmatter
`description` has to say so, or it will trigger on requests it cannot serve. That narrowing is the point
of the rename rather than a side effect of it.

### 4.2 The two modes

Both modes run the same script over the same corpus and read the same report. **They differ only in what
happens next**, which is what keeps the design small.

| | Mode A, revise | Mode B, draft-time |
|---|---|---|
| Invoked by | Tommy, naming an article: "run the voice check on the floor-and-ceiling post" | The drafting skill, as the last action of Step 5, before the draft is shown to anyone |
| Input | A path to a `.md` file on disk | The draft text, which is not a file yet, piped to the script on stdin |
| What the skill returns | A findings report, then an offer to edit. This is the existing "Detect" job | A silently corrected draft. This is the existing "Edit" job |
| Front matter | Present. Stripped by the script before counting | Usually absent. Nothing depends on it |

The script accepts either a path or `-` for stdin, so one invocation shape covers both. That is the
entire difference between the modes at the code level. Everything else is the skill's prose deciding
whether Tommy is asking to be told or asking to be fixed, and that distinction is **borrowed intact from
the retired skill**: `no-ai-slop`'s "Two jobs" section already separates detect from edit cleanly, so
copy it rather than redesigning it.

Mode B matters more than mode A. A finished article gets checked when someone remembers. A draft-time
step runs every time, which is the difference between a rule that exists and a rule that fires.

### 4.3 The skill must not violate the rules it states

A root cause worth naming, because the new skill is unusually exposed to it.
`writing-promptingbi-articles/SKILL.md` says "no em dashes anywhere" and **contains 22 em dashes**,
verified today in both copies. The rule leaked into drafts twice this week and needed sweeping by hand.

The likely mechanism: a model imitates the prose it reads more reliably than it obeys a rule stated in
that prose. An instruction file is not only instructions; it is also a sample of the register the model
is about to write in. A file that bans a construction while demonstrating it 22 times is teaching the
construction louder than it is banning it.

**The principle for `no-ai-puglia`: an instruction file must not violate the rule it states.** This
matters more here than anywhere else in the repo, because the new skill's entire job is to name banned
constructions, so it necessarily contains specimens of every pattern it forbids. The method:

| Do | Do not |
|---|---|
| Put every banned example inside a fenced block or inline code, so it reads as a specimen | Quote a banned construction in running prose, where it reads as a model |
| Describe the pattern in prose and let the fenced block carry the instance | Illustrate mid-sentence, the way `voice-and-style.md` line 18 illustrates contrast framing |
| Check the finished file against its own rules before shipping it | Assume a stated rule protects the file that states it |

This document follows the same rule, which is why every flagged term and construction in it appears in
backticks. It also gives `eval.md` a check worth adding: run the skill against its own `SKILL.md`.

Section 8's edit 3 does not fix `voice-and-style.md` line 18 for this reason, and that is deliberate.
The line is prescribing contrast framing rather than banning it, so demonstrating it is correct there.
The failure mode is only demonstrating what you forbid.

## 5. The boundary: script versus prose

This is the crux of the design, so it is stated as a rule rather than left to be inferred.

**The script counts. It never judges, never edits, and never suppresses.** Everything it reports is a
number and a location.

**The prose in `SKILL.md` judges and edits.** It reads the counts, decides which of them mean anything,
and does the writing.

| Work | Owner | Why |
|---|---|---|
| Counting a word's occurrences in 34,044 corpus words | Script | A language model cannot do arithmetic over a corpus reliably. This is the one thing that actually needs code |
| Computing the sentence-length distribution | Script | Same reason |
| Matching fixed strings: em dashes, co-host names, episode references, filler | Script | Exact, boring, and a model will miss the third instance |
| Deciding whether a flagged word is slop or a product name | Prose | `Fabric` is absent from a 2024-heavy corpus and is obviously not slop. A model knows this instantly and for free |
| Choosing the replacement word | Prose | Requires knowing what he would have said |
| Deciding which of four rhetorical questions to cut | Prose | Requires knowing which one carries the argument |
| Deciding whether short sentences are rhythm or staccato | Prose | The script reports the distribution. Whether a run of three short lines lands is a judgment |
| Everything already in the `Patterns to cut` list | Prose | Unchanged, and it works |

The practical consequence is that **the script needs no allowlist, no exemption file, and no tuned
thresholds.** Those existed in the rejected design to give a build-time script the judgment it did not
have. A skill has judgment available in-context, at zero maintenance cost, so the machinery that
simulated judgment is deleted rather than ported. The cost is that the same product name gets re-judged
on every run, which is a sentence of the agent's attention and no maintenance at all.

The script keeps only the mechanical half of that filtering, because it is free: it tags each flagged
token with whether it appeared capitalized mid-sentence and whether it contains a digit. Those are
facts, not judgments, and they let the agent triage a report at a glance. Code is not on that list
because the tokenizer already strips fenced and inline code before anything is counted, so a token from
a code block never reaches the report to be tagged.

## 6. The bundled script and the corpus file

### 6.1 What `voice_check.py` counts

Python, snake_case, **standard library only**, matching the language and naming of
`scripts/fetch_youtube_transcript.py`. That script needs `yt-dlp`; this one deliberately needs nothing,
so it runs anywhere the skill is loaded, including a Claude Code session with no repo checkout.

Run from the skill directory, matching how `writing-promptingbi-articles` states the working directory
for its own bundled script:

```
python scripts/voice_check.py <path-to-article.md>
python scripts/voice_check.py -            # read the draft from stdin
python scripts/voice_check.py --all        # include the suppressed tail, see 6.2
python scripts/voice_check.py --rebuild    # regenerate voice-corpus.json, needs the repo
```

Five counts, and nothing else:

| # | Count | Reported as |
|---|---|---|
| 1 | **Outsider words.** Draft words absent from the corpus | See 6.2 |
| 2 | **Watchlist hits.** A fixed list of phrases and constructions, each with its corpus count | Count in draft, count in corpus |
| 3 | **Sentence distribution.** Median, mean, share under six words, share at 21 or more | Alongside his written baseline of 19, 7.7%, and 39.8% |
| 4 | **Hard-rule strings.** Em dash `U+2014`, en dash `U+2013`, co-host names (`Mike`, `Seth`, `Carlo`, `Bauer`), episode references ("in this episode", "we discussed", "on the show", "on the podcast") | Count and line number |
| 5 | **Filler.** The speech artifacts from `plans/voice-model-first-pass.md` section 5.2: "you know", "like" as filler, "kind of" as softener, "right?" as a tag, sentence-opening "So" | Count and rate |

Tokenizer, applied identically to drafts and to corpus text: strip front matter, fenced code blocks,
inline code, image syntax, and HTML comments; keep link text and drop URLs; for transcripts also strip
the header through the 72-dash rule described in `transcripts/README.md`, the `>>` turn markers, and
`[HH:MM:SS]` timestamps; lowercase, after recording each token's original casing for the proper-noun tag
in section 5. Tokens are `[a-z0-9'-]+`. Headings count as words and do not count as sentences.

Folding is possessive `'s` and plural `-s` only. **No `-ly` folding**, and this is load-bearing: the
signal lives in the derived form, so folding `quietly` into `quiet` would erase the clearest finding in
the evidence. Watchlist phrases are matched with their own inflections spelled out in the corpus file,
which is how `sit with`, `sits with`, and `sitting with` count as one entry without a stemmer.

### 6.2 The outsider-word method, and why it needs no threshold

The corpus is 34,044 words, not 300,000, because it is the **attributed** corpus rather than raw
transcript text. At that size, "this word is absent" is weak evidence on its own: a word he uses once
per 100,000 words would be expected to appear 0.34 times, so its absence means nothing.

So the script does not apply a threshold. It reports an expectation:

```
genuinely   7 in draft (2.34 per 1,000 words)
            expected in a 34,044-word corpus at that rate: about 80
            actual: 0
```

That line is the entire method. It scales correctly, it needs no tuning, and it degrades honestly: a
word used once in a draft yields an expectation of about 11 against 0, which is weak, and the agent can
see that it is weak. A word used seven times yields 80 against 0, which is not something chance
produces.

To keep the report readable the script emits words with **two or more draft occurrences whose corpus
count is under a tenth of the expected count**, sorted by the size of that gap, capped at 20 lines, with
a tail count of how many were suppressed. The cutoff is a ratio rather than "corpus count is zero"
because a word used seven times in a draft against an expectation of 80 is the same finding whether the
corpus holds it once or not at all. This is a display rule, not a threshold: nothing is being
classified, no flag is being suppressed on the grounds of being unimportant, and `--all` prints the
rest.

### 6.3 The watchlist, and why open-ended phrase discovery was cut

Phrases cannot use the same method. A 34,044-word corpus holds on the order of 30,000 distinct bigrams,
so nearly every bigram in a new draft is absent from it and an open-ended n-gram check would flag most
of every draft. The rejected design solved this with a rule about content words, sized for a 300,000-word
corpus. At this size that rule does not rescue it.

**Replaced with a curated watchlist**, stored in the corpus file, each entry carrying its own corpus
count and its inflected forms. It is short and it earns each line:

| Source of the entry | Examples |
|---|---|
| The multi-word finding | `sit with`. `genuinely` and `quietly` are single words and need no watchlist entry; the unigram check already finds them |
| His constructions under budget | `not just X but Y`, `here's the thing` |
| The filler kill list | `you know`, `kind of`, `right?` as a tag |
| Measured as not his despite sounding like it | `at the end of the day` appears once in 32,505 attributed words, so it is not a habit of his and should not be added to a draft on the assumption that it is |

This is less powerful than discovery and it is the honest trade. Discovery found `sit with`; a watchlist
only finds what is on it. The mitigation is that mode A's outsider-word half still does open-ended
discovery on single words, which is where the finding actually came from, and any new phrase that
research turns up gets one line added to the corpus file.

### 6.4 The corpus file

`scripts/voice-corpus.json`, one object, shipped with the skill and committed with it.

```json
{
  "generated": "2026-08-28",
  "total_words": 34044,
  "sources": {
    "attributed_speech": { "words": 32505, "episodes": 19, "method": "vocative voting" },
    "written_2024": { "words": 1539, "files": ["2024-07-17-...", "2024-09-11-..."] }
  },
  "baseline": { "median_sentence": 19, "under_six_pct": 7.7, "over_twenty_pct": 39.8 },
  "unigrams": { "dax": 412, "harness": 88, "guardrails": 61 },
  "watchlist": [
    { "phrase": "sit with", "forms": ["sit with", "sits with", "sitting with"], "corpus": 0 },
    { "phrase": "here's the thing", "forms": ["here's the thing"], "corpus": 8 }
  ]
}
```

`baseline` is in the file rather than hardcoded in the script so that regenerating the corpus
regenerates the comparison it is measured against, and the two can never drift apart.

### 6.5 Regeneration

`--rebuild` reproduces the file from the repo, which is what makes the corpus auditable rather than a
number someone once produced. It does three things:

1. Read `transcripts/*.txt`, split each into turns on `>>`, and **keep only turns that name Mike and do
   not name Tommy**. That is the vocative-voting rule, and it is roughly thirty lines of code.
2. Read the two 2024 posts from `src/content/blog/published/2024-07/` and `2024-09/`.
3. Count, measure the baseline, and write the JSON with a fresh `generated` date and source block.

Rebuilding needs a repo checkout. **Checking does not**, because the profile ships inside the skill. That
asymmetry is deliberate: the expensive, repo-dependent step happens rarely and on Tommy's machine, and
the common step works anywhere the skill loads.

Staleness has no automated tripwire, and it does not need one. The `sources` block names the episode
count and the generation date, the report header prints both, and an agent reading "19 episodes,
2026-08-28" against a request to check an article about episode 560 can see the gap. Rebuild when
episodes are added and it matters. Nothing breaks if it is stale; the corpus just misses recent
vocabulary, which produces a false flag the agent dismisses in one sentence.

**The 87 percent discard is the method working, not a defect.** Vocative voting claimed 32,505 of
246,113 raw words. The other 87 percent was discarded rather than guessed at, which is why the surviving
corpus can be trusted at the turn level. A larger corpus built by guessing would be worse, because a
misattributed corpus contains Mike's vocabulary as if it were Tommy's, and the entire check rests on
absence meaning something.

## 7. The voice guidance the skill applies

Lives in `references/voice-profile.md`, read by the skill, applied by judgment. Derived from
`plans/voice-model-first-pass.md`, which did the measurement.

### 7.1 The three constructions, and their budgets

Kept as his, capped in frequency, per ruling 4. **Expressed as per-article and per-section guidance, not
as thresholds**, because a skill applies judgment and a per-1,000-word rate is arithmetic nobody will do.

| Construction | Budget | Basis |
|---|---|---|
| Self-answering question | **Two to three per article**, each answered immediately in the next sentence | Measured in both corpora. Unanswered rhetorical questions are the cliché; he does not leave them hanging |
| Contrast framing, `not just X, but Y` | **At most one per section**, never two in the same section | 4 occurrences in 1,539 words of his own writing, so roughly 4 in a typical 1,200 to 1,800 word article. One per section brackets that for a 3 to 6 section piece, and it is a ceiling rather than a target |
| Short blunt one-line opinion | **Keep, never two in a row**, and the prose around it must be full length | Confirmed in both corpora ("I hate redundancy", "I don't know why you're getting paid"). The slop tell is stacking, not shortness |

Three more budgets come straight from the measurement and cost nothing to carry: "here's the thing" once
per article, emphasis caps on a single word two to three times per article, one extended analogy
developed over several beats rather than five throwaway figures.

**Say plainly in the skill: at 5.02 against a 5.78 human baseline, density is not currently a problem.**
These budgets are drift protection. They exist because `voice-and-style.md` pushes toward these
constructions with no counterweight, and an uncounterweighted instruction compounds across a hundred
drafts. The 2026-08-28 article passes all three, and that is the expected result.

### 7.2 The sentence-rhythm correction

The replacement for `voice-and-style.md` line 8, which section 8 installs:

> **Medium to long default sentence, with real subordination.** His written median is 19 words, nearly
> 40 percent of his sentences run 21 words or more, and only 7.7 percent are under six. Two or three
> clauses is his natural unit. Active voice, plain English. A short line is punctuation, not the
> default: drop one where it lands, then go back to full sentences.

Line 11, "short, blunt opinions dropped as their own line," **stays unchanged**. It is confirmed in both
corpora and it is not the same rule. Line 8 says make every sentence short; line 11 says one blunt line
lands hard. The second only works because the first is wrong.

The tiebreaker on line 3, "pick the one a confident practitioner would say out loud," **also stays.**
`voice-model-first-pass.md` section 6.2 objects to it on the grounds that it deletes calibration
markers, and ruling 7 says deleting them is correct for prose, which removes the objection's load. With
line 8 fixed, the combination that section 6.2 actually warned about no longer exists.

### 7.3 What does not carry from speech

The skill needs a strip list, because articles are now drafted from transcripts and speech transcribed
literally is bad prose. Carried from `voice-model-first-pass.md` section 5.2, with rates so an editor
knows what volume to expect: "you know" at 48.6 per 10,000 words, filler "like" at 76, "um" and "uh" at
64.6, immediate word repair at 50.8, "kind of" as a softener at 21.8, "right?" as a tag at 19.1, and
vocatives, which also collide with the existing no-co-host rule.

**And hedged confidence, per ruling 7.** This is the one entry where the skill's instruction differs
from the research document's recommendation, so it says so in place rather than leaving a future reader
to find the contradiction.

One line of positive guidance worth carrying, because it is usable while drafting rather than only while
editing: **his analogies come from things he has physically done.** Making sauce, hitting a baseball,
cycling. Management, machinery, and journey figures are absent from 246,000 words of him. No
recommendation follows about any existing article.

## 8. Edits to `writing-promptingbi-articles`

Three, and only the first is the invocation. The second is a factual correction Tommy asked for, which
**has already landed** in the working tree while this document was being written. The third is where
ruling 8 goes, since the sentence-length rule lives in this skill's reference file.

**Edit 1, one line at the end of Step 5. This is the invocation, and it is one line.**

> Before the draft is done, run the `no-ai-puglia` skill over it.

One line, inside Step 5, not a new step. **The placement is the whole point.** An uninvoked skill has no
effect, and that is the documented reason `no-ai-slop` changed nothing about the article that started
this: it existed, it was correct, and nothing called it. Renaming and personalizing the skill fixes none
of that on its own, which is why this one line is not optional scaffolding around the real work. It is
the difference between the new skill and the retired one. A new Step 11 would sit after image generation,
Notion delivery, and the repo write, which means the article reaches both destinations before anything
checks it, and a step at the end of a ten-step workflow is the step that gets skipped. Inside Step 5 the
check is part of what "draft" means, so an unchecked draft is an incomplete one.

**Edit 2, the transcript route. Already applied, no work remaining.** Step 1 used to end with "YouTube
auto-captions carry no speaker labels; Notion meeting notes usually do." **That was false for this
show.** Zero of the episodes examined carried speaker labels, from either source. The labeled path was
chased first, through `notion-query-meeting-notes` and direct meeting-note fetches with
`include_transcript: true`, including the second deliberate fetch of the `#`-anchored transcript URL that
Step 1 itself described. Meeting notes that did carry a transcript body, ep 550 among them, carried it
without labels.

The fix went further than the false sentence, because Tommy no longer transcribes into Notion at all; he
hands over a YouTube link. **Notion is fully removed as a transcript source.** Verified across all three
files today:

| File | End state, verified |
|---|---|
| `writing-promptingbi-articles/SKILL.md`, repo copy | Zero `include_transcript` references. Two fetch routes, YouTube primary with a paste fallback. The Notion meeting-note hazard block is gone. Step 1 now says no source carries speaker labels and Step 2 documents vocative voting with the 32,505 words, 228 turns, and 87 percent discard figures. The dead "With speaker labels, this is mechanical" branch is removed |
| Same file, global copy | Same end state, verified independently |
| `.cursor/rules/transcripts.mdc` | Zero Notion references of any kind |

**Notion survives as the articles database and as episode metadata**, which is why Step 7 delivery and
the Step 8 `source.notion` field are untouched and correct. Section 11's criterion 5, which expects a
mode B draft to reach Notion and the repo already corrected, refers to that delivery path and is
unaffected by the routing change.

These changes are uncommitted, so confirm they survive to `main` before treating the line as closed.
Nothing here proposes doing any of it again.

The correction is load-bearing for this design rather than incidental. Section 6.5's rebuild implements
the same vocative rule the skill now documents, so the corpus and the drafting workflow describe
attribution identically. It also removes the last reason the corpus could not be rebuilt from the repo
alone: with transcripts arriving as files rather than through a connector, `--rebuild` needs nothing but
a checkout.

**Edit 3, the sentence-rhythm rule in `references/voice-and-style.md` line 8.** Ruling 8. The
replacement text is in section 7.2, along with the two neighbouring lines that deliberately stay as they
are. This is the one edit here that changes how drafts sound rather than how the workflow runs, and it
belongs in this skill because that is where the rule lives.

Nothing else in `voice-and-style.md` changes. The budgets in section 7.1 live in `no-ai-puglia`, not
here, so that the constructions are prescribed in one file and counted in another with no third place to
keep in step. Line 18's illustration of contrast framing stays in running prose for the reason given in
4.3: that line prescribes the construction, and demonstrating what you prescribe is correct.

## 9. Canonicalization, the mirror, and the stale third copy

Settled in `plans/skill-canonicalization-decision.md`, committed as `72b4da1`. This design depends on
its rulings and changes none of them. It does change which skills the mirror carries, which the decision
anticipated by specifying a list rather than a path.

**The repo copy is canonical.** `C:\Users\pugli\.claude\skills\` becomes a generated mirror nobody
hand-edits. The reason is auditability rather than preference: the global copy has no git history, so it
cannot be reviewed, rolled back, or reproduced on a fresh clone.

**Both copies of a live skill must keep existing.** There is no `.claude/skills/` directory in this
repo, verified, so Claude Code running here loads only the global copy. Deleting it would remove the
skill from one of the two tools that use it.

**New evidence for the mirror, found while this document was being written.** The in-flight drift pass
on `writing-promptingbi-articles` is reconciling two items in opposite directions: Step 5's
code-heavy-articles guidance existed only in the global copy and is being added to the repo copy, and
Step 8's fuller source-metadata paragraph existed only in the repo copy and is being brought to the
global one. **Each copy held an improvement the other never received**, which is direct proof that
nothing has ever synced them and that the drift is bidirectional rather than one copy lagging. A one-way
push from a canonical source is exactly the mechanism that prevents this, and it is worth noting that
building it will require a deliberate merge first, since a naive push would have destroyed whichever
improvement lived only on the receiving side.

**The mirror list is now `writing-promptingbi-articles` and `no-ai-puglia`.** The committed decision
already specifies that the sync mechanism take a list of skills rather than one hardcoded path, and that
still holds; only the membership changes. Building that mechanism belongs to the canonicalization work,
not to this design, and this design asks three things of it:

| # | Requirement |
|---|---|
| 1 | The list is `writing-promptingbi-articles` and `no-ai-puglia`. `no-ai-slop` comes off it |
| 2 | It syncs `scripts/` and the corpus JSON, not just `*.md`. A markdown-only copy leaves the global skill invoking a script that is not there, and `no-ai-puglia` is the first skill where the data file is load-bearing |
| 3 | It can **delete**, not only copy. A rename is a create plus a delete, and a copy-only sync would push `no-ai-puglia` out while leaving the retired `no-ai-slop` live in the global directory forever |

**Retirement, and what happens to the global copy.** `no-ai-slop` is dual-copy and byte-identical,
verified today by hash. Retiring it means deleting `.cursor/skills/no-ai-slop/` from this repo. The
global copy at `~/.claude/skills/no-ai-slop/` is **Tommy's call**, and it is worth being exact about the
consequence rather than filing it as harmless.

Because this repo has no `.claude/skills/` directory, global skills load *here*. So keeping the generic
skill globally does not confine it to non-PromptingBI writing; it leaves `no-ai-slop` and
`no-ai-puglia` both loadable while working in this repo, with an agent free to pick either. That is the
same overlap ruling 6 retires the repo copy to end, and it is the same mechanism that made the stale
third copy a hazard below.

The recommendation is therefore to delete both, and to accept that generic slop-editing for other
writing is a capability worth losing. If Tommy would rather keep it, the clean version is to keep it
globally under a name that cannot be confused with the new one and with a `description` scoped to
non-PromptingBI prose, so an agent choosing between them has something to choose on. Either way this is
his decision and the repo-side retirement does not wait on it.

**The third copy stays.** `.cursor/skills/promptingbi-article/reference/editorial-guide.md` is a
git-tracked, unloadable third copy of the voice spec, carrying its own versions of all three
constructions at lines 18, 51, 58, and 60. The committed decision recommended deleting it; Tommy chose
to leave it. Recorded here as a **known stale-guidance hazard**: after section 8's edits land, that file
still says "if a sentence needs a second breath, split it" and still illustrates contrast framing with
the flagged string. Nothing in this design touches it, and no change to it is proposed.

## 10. What simplification cut

Everything below was in the rejected version of this design. It is listed rather than silently dropped,
so nobody rebuilds it by accident.

| Cut | Why |
|---|---|
| `npm run voice-check` and the entry in `package.json` | Ruling 5. Not a repo script |
| Wiring into `npm run build` alongside `scan-prompts --quiet` | Ruling 5. No build integration of any kind |
| The `scan-prompts` parallel and its `--quiet` and exit-code contract | Only meaningful for something that runs in a build. Nothing here runs in a build |
| Git hooks | Never proposed, ruled out explicitly, recorded so it stays that way |
| `data/voice/allowlist.txt` and its review rule | The agent supplies the judgment the allowlist was simulating. Section 5 |
| `voiceExempt` front-matter escape hatch | Existed to silence a script that gated publication. Nothing gates publication now |
| Numeric flag classes, Absent, Rare, and First use | Replaced by the expected-count line in section 6.2, which needs no tuning |
| Open-ended bigram and trigram discovery | The corpus dropped from 300,000 raw words to 34,044 attributed ones, and n-gram sparsity at that size makes discovery useless. Replaced by the watchlist in 6.3 |
| The staleness hash-and-warn mechanism | Existed so a build could notice. A person reading a two-line provenance header notices for free |
| `data/voice/corpus-profile.json` in the repo | Moved inside the skill, where its only consumer lives |
| The two-increment A and B split | An artifact of coordinating a script, a build change, and three file edits. One skill rebuild does not need phasing |
| Acceptance criteria written as CI gates, runtime budgets, and exit-code tests | Not applicable to a skill a person invokes |
| Editing `no-ai-slop` in place | Ruling 6. A generic skill carrying three writer-specific exceptions is worse than two clean skills, and keeping it alongside `no-ai-puglia` recreates the overlap in section 2.4. Its good parts are copied out first, per 4.1, then it is deleted |
| A repair to `plans/host-episodes-and-voice-style.md` section 5.6 | That section specifies `scripts/voice-lint.mjs`, a repo linter this design no longer builds or supersedes. Its "at least one self-answering question per post" floor is now inert rather than harmful. Noted, not repaired |

**Also considered and deferred: audio-based speaker identification.** Tommy asked whether podcast audio
could identify his voice. It could, and `plans/host-episodes-and-voice-style.md` specifies exactly that,
with WhisperX and `pyannote/speaker-diarization-3.1` on a local GPU. **Deferred**, because vocative
voting already produced 32,505 clean attributed words with no audio pipeline, no GPU, no model weights,
and no voiceprint consent question, and that question is the real cost: it is voice biometrics for Tommy
and for a co-host, in a repo backing a public site, and it needs a conversation with Mike before capture
rather than after. Revisit only if the corpus needs to be several times larger.

**Rejected as the primary mechanism: `stop-slop` by hardikpandya.** It catches more flagged items than
`no-ai-slop` did, and three things rule it out. It has no voice-preservation clause, so under ruling 4
it deletes the constructions this design keeps. Its "cut quotables" rule would delete the article's
closing line. Its "kill all adverbs" rule flags 53 `-ly` words to catch the one that matters, and the
outsider-word check finds `quietly` without the other 52. It would also flag "DAX is never wrong," which
is Tommy's verbatim line from episode 549, present in `transcripts/ep-549.txt`. Keep it as a source of
pattern ideas for the watchlist. Do not adopt its rule set.

## 11. Scope, success, and the non-goal

**The non-goal, stated first because it is the one most likely to creep back in: scoring zero on Simon's
tool is not the target.** Optimizing against a fixed public list teaches writing around the list while
still producing slop. The list is 38 patterns; a language model's vocabulary is not. His most human
writing scores 5.78, higher than the article that caused the worry, so a zero target would require
writing less like himself. **The tool is a smoke alarm.** A spike is worth a look. A steady reading is
not a score to drive down.

**No archive retrofit.** The AI-era posts sit at 3.85 per 1,000 against a 5.78 human baseline, so a
retrofit would edit 15 live posts to improve a number already better than his own writing.

**One exception:** the diction fix to
`src/content/blog/published/2026-08/2026-08-28-agents-raise-the-floor-and-lower-the-ceiling.md`. Seven
`genuinely` and four `quietly`, verified present today. Replace each with a word from the corpus or cut
it; most are load-bearing on nothing and read better deleted. The three `sit with` occurrences in the
same file are the same class of fix at the same cost and should go in the same edit. Do not touch the
permalink, the date, or any heading, since headings are anchor targets and the URL is indexed. Do not
restructure, and per ruling 9 do not touch the orchestra analogy.

**That edit is the acceptance test.** Running mode A over that article is the skill's first real use,
and it either surfaces those eleven words plus `sit with` or the build is wrong. Success looks like:

| # | Criterion |
|---|---|
| 1 | Mode A over the unfixed 2026-08-28 article surfaces `genuinely`, `quietly`, and `sit with` near the top of the outsider list, and the same run after the fix does not. **This is the test that proves the mechanism**, because those three were found by corpus comparison and appear on no public list |
| 2 | Mode A over the two 2024 posts produces nothing the agent cannot dismiss in one line. Those are his human baseline, so a flag there is a corpus gap, never a problem with the post |
| 3 | The sentence distribution the script reports for the 2024 posts matches the baseline in the corpus file: median 19, 7.7 percent under six, 39.8 percent at 21 or more. If it does not, the tokenizer disagrees with the one that produced the baseline and one of them is wrong |
| 4 | `voice_check.py` runs on a machine with no `pip install` step and no repo checkout, reading only its sibling JSON |
| 5 | A draft run through mode B during Step 5 arrives at Notion and the repo already corrected, with no separate request from Tommy |

Criterion 5 is the one that matters over time. The other four prove the machinery; that one proves the
placement, which is what the earlier version of this problem got wrong.

## 12. Sequencing, and hazards left open

Build order, and it is short because the design is one skill.

| Order | Step | Note |
|---|---|---|
| 1 | Build the `--rebuild` half of `voice_check.py` and generate `voice-corpus.json` with it | The corpus is the dependency for everything else, and generating it from code proves the numbers reproduce rather than inheriting them |
| 2 | Build the counting half of the script and check it against criterion 3 | The 2024 baseline is the calibration gate |
| 3 | Write `no-ai-puglia`: `SKILL.md`, `eval.md`, `references/voice-profile.md`, borrowing from `no-ai-slop` per 4.1 | The judgment half. Check the finished files against 4.3 before shipping them |
| 4 | Apply section 8's edits 1 and 3 to `writing-promptingbi-articles`. Edit 2 is already done | Mode B does not exist until Step 5 calls it. Edit 3 is ruling 8 and is independent of the rest. Wait for the in-flight dash pass to land before touching either file |
| 5 | Run mode A over the 2026-08-28 article and apply the section 11 fix | First real use, and the acceptance test |
| 6 | Delete `.cursor/skills/no-ai-slop/` | After step 3, never before, so the borrowed material is copied out first. Deleting it earlier loses the `Patterns to cut` list |
| 7 | Mirror `writing-promptingbi-articles` and `no-ai-puglia` to the global directory, and resolve the global `no-ai-slop` per section 9 | Needs the canonicalization sync mechanism to take a skill list, to copy `scripts/`, and to delete. Merge the two copies of `writing-promptingbi-articles` before the first push rather than overwriting one with the other |

Hazards recorded so silence is not read as oversight:

| Hazard | Status |
|---|---|
| The stale third copy at `.cursor/skills/promptingbi-article/` | Left in place per ruling 10. It will still carry the old short-sentence rule and the flagged contrast example after this lands. Not loadable by any tool, so it misleads a human reader rather than an agent |
| The generic `no-ai-slop` survives globally if Tommy keeps it | Global skills load in this repo, so keeping it leaves two overlapping slop skills loadable here, which is the condition ruling 6 exists to end. Section 9 recommends deleting both and names the fallback if he would rather not. His call, and the repo-side deletion does not wait on it |
| Concurrent uncommitted work on `writing-promptingbi-articles/SKILL.md` and `.cursor/rules/transcripts.mdc`, and the two copies are not identical right now | Expected, not a fault. Edit 2 is inside that work and is done; a dash and drift pass is still in flight. Verified today: 22 em dashes in each copy, 3 en dashes in the repo copy against 4 in the global one, differing hashes. Do not edit either file or act on the mismatch until it lands, then re-read Step 5 before adding the invocation line, since its surrounding text moved |
| Everything this design still has to modify is untouched | Verified today: `voice-and-style.md` lines 8, 11, 15, and 18 read exactly as quoted here, and `.cursor/skills/no-ai-slop/` is unmodified and byte-identical across both copies. Edits 1 and 3 and the retirement all start from the state this document describes |
| The watchlist only finds what is on it | Accepted in 6.3. Open-ended discovery survives for single words, which is where the original finding came from |
| A corpus that misses recent episodes produces false flags | Accepted in 6.5. Cost is one sentence of the agent's attention per stale term, against a rebuild that needs the repo |
| `plans/voice-model-first-pass.md` sections 5.3 and 7 recommend reintroducing calibration markers | Overruled by ruling 7. Recorded in section 3 and in `references/voice-profile.md` rather than by editing that document, since it is an evidence record and its measurement is not in dispute |
