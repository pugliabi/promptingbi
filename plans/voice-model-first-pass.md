# Tommy Puglia writing voice model, first pass

Evidence gathering only. Derived from how he actually speaks, cross checked against the two posts he wrote before the AI assisted workflow existed. No skill file changes proposed here.

## 1. Evidence base and confidence

| Source | Words of Tommy | Confidence | Why |
| --- | --- | --- | --- |
| 19 EMP episode transcripts, vocative anchored turns | 32,505 | Moderate to high | Rule based attribution, see below |
| Ep 549 read in full (source episode for the flagged article) | included above | Moderate to high | Also read whole file for continuity |
| Recruiter call, 2026-08-26, two party | ~2,400 | High | Two speakers, one is a recruiter, role makes identity unambiguous |
| `2024-07-17` and `2024-09-11` posts | 1,539 | Certain | He wrote them |

**Zero episodes had speaker labels.** I chased the labeled path first: `notion-query-meeting-notes` and direct meeting note fetches with `include_transcript: true`, including the second deliberate fetch of the `#` anchored transcript URL described in the skill. The meeting notes that do carry a transcript body, for example ep 550, carry it **without speaker labels**. So the labeled source the task assumed exists does not exist for this show.

Fallback method, and it is stronger than raw monologue picking. The transcripts segment turns with `>>`. Tommy and Mike address each other constantly by name. A turn containing "Mike" and not "Tommy" is Tommy speaking; the reverse is Mike. That produced 228 Tommy turns and 486 Mike turns, and the two corpora come out with visibly different fingerprints, which is the sanity check that the rule works.

**Proportion resting on inference: essentially all of the episode evidence.** 32,505 of 246,113 raw words, about 13 percent of the corpus, is what the vocative rule could safely claim. The other 87 percent was discarded rather than guessed at. Every episode quote below sits in a turn that names the other person, so treat it as high confidence at the turn level and moderate confidence that no adjacent sentence bled in from a caption error.

### How Notion AI summaries were kept out

Nothing from a `<summary>` block reached this document. Concretely:

1. Meeting note fetches return summary content and transcript content as separate blocks. I read the summary once, on ep 548, recognized it as AI composed first person prose, and pulled no phrasing from it.
2. All quantitative work ran against `transcripts/ep-*.txt` files only. Those files are caption or transcript text under a header, and the extraction scripts strip the header and split on `>>`. A summary has no `>>` markers and is not in those files.
3. Cross check: the summary voice and the transcript voice are separable by disfluency. Everything quoted below contains repairs, stutters, or vocatives. Clean first person prose was treated as suspect by default.

## 2. Sentence shapes, measured

| Corpus | Sentences | Mean | Median | 1 to 5 | 6 to 10 | 11 to 20 | 21 to 35 | 36+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tommy spoken | 1,792 | 18.1 | 14 | 16.0% | 23.2% | 30.3% | 20.5% | 10.0% |
| Mike spoken | 4,808 | 15.2 | 11 | 20.6% | 26.4% | 29.3% | 16.5% | 7.1% |
| Tommy written 2024 | 78 | 19.7 | 19 | 7.7% | 15.4% | 37.2% | 30.8% | 9.0% |

Two things fall out.

**He is the long one in the room.** Against his co-host he runs 19 percent longer per sentence and produces 40 percent more sentences over 21 words. He builds, he does not clip.

**When he writes, he gets longer still, not shorter.** His written median is 19 words. Only 7.7 percent of his written sentences are five words or under. Nearly 40 percent are 21 or more. His natural written unit is a medium to long sentence with two or three clauses, punctuated occasionally by a very short line for emphasis.

This directly contradicts the current spec, see section 6.

## 3. The patterns

Quotes are verbatim from auto captions. Ellipsis marks elision. Disfluency is left in because it is evidence of attribution. Episode number in brackets.

### 3.1 Concede fully, then pivot on "but" or "however"

His single most characteristic argumentative move. He does not concede a token point. He over concedes, often twice, then turns.

> "I agree with you what you said, but I'm going to take this to the extreme because I think there's another side of this, Mike, because I agree. I I everything you said I have no notes on. However, when you look at this whole spectrum of using AI for the fabric developer, there is this extreme part..." [528]

> "And here's the thing. This is where I'm conflicted, Mike, because I really do I completely agree with you with what you said about the senior's role... But this is where I'm and so I completely agree with you actually..." [549]

> "there's really like 10 good ones you need to know I'm not saying that's the only thing you need to know but often more often than not what calculate filter the time intelligence ones... However, I think it really just starts to me with..." [549]

Rhetorically: it buys the right to disagree. The reader cannot dismiss the objection as not having understood the other side, because he just stated the other side better than the other side did.

Frequency: "agree ... but" fires 20 times in 32.5k words. "However" is his preferred written pivot.

### 3.2 Naming his own conflict instead of resolving it

Adjacent to the above but distinct, and it is the thing the current spec would delete.

> "This is where I'm conflicted, Mike" [549]

> "I don't know if I'm strong about this, but..." [530]

> "I don't know if that's a true statement, but I think..." [545]

He states the position and marks his confidence in the same breath. This is not corporate hedging. It is a practitioner telling you how much weight to put on the claim.

### 3.3 Pre flagging a contentious opinion

He announces the temperature of a take before delivering it, then delivers it hard.

> "I'm gonna say something that may sound like a bit of a hot take" [501]

> "I know that's a super hot take and kind of mean, but..." [531]

> "and I know that sounds like a hot take, but try to argue with me otherwise" [540]

> "I don't know why you're getting paid." [549]

The flag is not softening. It is a drumroll. Note the closer on the third one: he invites the fight rather than trailing off.

### 3.4 "It's funny, because" plus a dated first person anecdote

His default evidence is not an abstraction. It is something that happened to him recently, and he flags it as coincidence.

> "It's funny, Mike, because I was just talking to a client about this yesterday..." [545]

> "It's funny because I I just went through this..." [539]

Nine instances of the "It's funny" opener. The rhetorical work: it makes the argument feel discovered rather than prepared.

### 3.5 Numbered doctrine

When he has a settled position he counts it out and announces the count first.

> "For me, Mike, there's four pillars and I and I preached this from the rooftops when I when I work with clients around this. There's four pillars that really make up data governance. So, I'm just going to run through them in no particular order." [545]

> "And and I think really there's two things here. It's, you know, what to do when you're new to agents and kind of like when you're a DAX noob and when you're an agent noob, right?" [549]

> "two things that I don't think you mentioned and I apologize if you did but from the onset when you are starting any of these types of projects..." [508]

Note "in no particular order," which is his tell that the count is real and the ranking is not. It is an honesty marker.

### 3.6 Analogies, and where they come from

Three live source domains, in this order of frequency: **Italian food and cooking**, **sports**, **physical craft and everyday objects**. Abstract or corporate analogies are absent.

The food one is so established that his co-host predicts it mid sentence:

> Mike: "pasta or or Italian food." Tommy: "You better believe it." Mike: "Your model's like a cannoli." Tommy: "No. So, your agent..." Mike: "Tommy likes it." Tommy: "Another Another way to think about this, to me, is if you had an an agent for cooking, your skills are your in a sense your recipes. Like, I had a sauce recipe... when it's too sweet, add salt... Never add celery. That's only for northern Italian Italians." [540]

Sports:

> "There is an education Mike just like getting better at hitting a baseball that you need to do when you are going to do anything AI now" [549]

> "I equate it to cycling..." [529]

**On the orchestra and conductor figure: not his.** Zero hits for conductor, orchestra, symphony, maestro, or baton across the full 246k word corpus and both 2024 posts. It was invented for the article. Whoever added it reached for a generic management metaphor, which is exactly the class of figure he never uses. His metaphors are always things he has personally done: cooked, ridden, played.

### 3.7 Diction that is his and not generic

| Term or phrase | Count in 32.5k | Notes |
| --- | --- | --- |
| "man" as vocative or intensifier | 60 | "What gives, man?" / "I'm picking up what you're putting down, man." Mike uses it far less |
| "not just X, but Y" contrast frame | 37 | Strongest single structural habit |
| "100%" as full agreement | 27 | Used as a complete sentence |
| "guess what" | 4 | Always sets up a consequence he considers obvious |
| "mind shift" | present | His term for the DAX learning curve, not "learning curve" |
| "second brain" | present | For the accumulated agent context |
| "in the trenches" | present | Self positioning against vendor voice |
| "preached this from the rooftops" | present | For a position he repeats to clients |
| "you don't know what you don't know" | present | Also "we don't know what we don't know" [538] |
| "harness", "skills", "guardrails", "semantic model" | high | Technical shorthand, used without definition |

He also coins and then owns terms rather than borrowing them. "Garage skills" [538] appears as a live coinage inside a sentence: "we're calling it garage skills."

### 3.8 Self indictment as the proof of the argument

He does not use himself as a success story. He uses himself as the counterexample.

> "I don't know JavaScript and Typescript even though all my applications are being built on that right now." [549]

> "Mike, we don't know what we don't know." [538]

> "not that there's a lot of them" (immediately after mentioning having the number one Power BI and Fabric podcast) [various]

The pattern: any boast is undercut within one clause. Any general warning about skill decay is illustrated with his own gap first.

### 3.9 Direct address, imperatives, and apostrophe

> "But Microsoft, if you're listening, that's the dream that needs to become a reality." [539]

> "So, if you are going to go to Build, make sure you say hello." [529]

> "buckle up." [541]

> "I would encourage my team 3 hours a week or 4 hours a week to experiment with skills." [538]

He addresses absent third parties directly. He gives instructions with a number attached, not vague ones.

### 3.10 Self answering questions

> "Why am I saying that? It's not just off the top of my head. The skill docs describe data models that changes daily..." [540]

> "What gives, man? and then going through the forms and then you understand a little more concepts..." [549]

> "So what good is a brain if you can't use it, right? So and here's the thing." [544]

Confirmed in speech, and confirmed in his 2024 writing ("Can it? Well, of course it can!"). Genuine.

### 3.11 Pivot markers

"Here's the thing" (8), "Here's my problem though", "Let me take a step back", "I'll say that again". These do structural work in speech. Two of them survive on the page, two do not, see section 5.

## 4. Cross check against the 2024 posts

The highest confidence transfers are the patterns he chose himself on the page with no assistance.

| Pattern | In speech | In 2024 writing | Verdict |
| --- | --- | --- | --- |
| Long clause heavy default sentence | Yes, median 14 | Yes, median 19 | **Confirmed, and stronger in writing** |
| "not just X, but Y" contrast | 37 hits | "not just a nice to have, but a must have" | **Confirmed** |
| Self answering question | Yes | "Can it? Well, of course it can!" | **Confirmed** |
| Personal credibility anecdote | Yes | "I have been lucky enough to be in the BI space for the past 9 years" | **Confirmed** |
| Caps on one word | Untestable in captions | WHAT, DATA, HOW, YOUR, WANT, INCREDIBLE. About 3 per post | **Confirmed, writing only** |
| Food and sports analogy | Yes, heavily | "run like a horse at the races", the vague pasta order | **Confirmed** |
| Bold closing prediction | "I almost want to make a bet with you on when that's going to happen" | "English is going to become the most potent programming language." | **Confirmed** |
| Playful parenthetical | Yes | "our future AI overlords" | **Confirmed** |
| Zero em dashes and en dashes | n/a | 0 and 0 across both posts. Uses ellipsis instead | **Confirmed** |
| Blunt one line opinion | "I don't know why you're getting paid." | "I hate redundancy." | **Confirmed** |
| Concede then pivot | Very strong | Weak. Present as "However" but not the full over concession | **Present, underused. Biggest available upgrade** |
| Hedged confidence, "I'm conflicted" | Very strong | **Absent** | **Does not transfer as is, see section 5** |
| Vocative "man", "Mike" | 60 and 273 | **Absent** | **Does not transfer** |
| Handing the question back to the other person | Almost every long turn ends this way | **Absent** | **Does not transfer** |
| Naming and linking the podcast in the body | n/a | Post 1, first sentence: "On a conversation on the podcast I host with 2 fine gentlemen" | See section 6 |

## 5. The transfer judgment

### 5.1 Carries over

Lift this list into the style reference more or less as is.

| Pattern | Written form | Anchor quote |
| --- | --- | --- |
| **Concede fully, then pivot** | State the opposing case in its strongest form, at least a full sentence, then turn on "But" or "However" | "everything you said I have no notes on. However..." [528] |
| **Pre flag the hot take, then land it** | "I know how this sounds, but" followed by the unhedged claim. Do not soften after the flag | "I know that sounds like a hot take, but try to argue with me otherwise" [540] |
| **Dated first person anecdote as evidence** | Specific, recent, client or personal. Never a hypothetical persona | "I was just talking to a client about this yesterday" [545] |
| **Self indictment before the general claim** | Name his own gap first, then generalize | "I don't know JavaScript and Typescript even though all my applications are being built on that right now" [549] |
| **Numbered doctrine, count announced** | "There are four pillars here, in no particular order" | [545] |
| **"not just X, but Y" contrast** | The sharpening move for stakes | "not just a nice to have, but a must have" (2024 post) |
| **Food, sports, and craft analogies only** | One extended figure, from something he has physically done | the sauce recipe [540], the baseball swing [549] |
| **Self answering question** | Question, then immediate answer in the next sentence | "Can it? Well, of course it can!" (2024 post) |
| **Blunt one line opinion as its own paragraph** | Short line, no qualifier, surrounded by longer prose | "I hate redundancy." (2024 post) |
| **Undercut the boast in the same clause** | Any credential immediately deflated | "not that there's a lot of them" |
| **Bold closing prediction** | End a section on a claim someone could disagree with | "English is going to become the most potent programming language." (2024 post) |
| **Direct address to an absent party** | Aimed at a vendor or the reader by role | "Microsoft, if you're listening" [539] |
| **Imperative with a number in it** | Not "experiment more" but "three hours a week" | "I would encourage my team 3 hours a week" [538] |
| **Medium to long default sentence** | Median around 19 words, two or three clauses, short line only for punctuation | measured, section 2 |
| **Coined term, named and owned** | "mind shift", "second brain", "garage skills". Introduce it, name it, reuse it | [538], [various] |

### 5.2 Does not carry over

Name these so a writer knows what to strip. Speech transcribed literally is bad prose, and this is why.

| Drop | Rate in speech | Why it dies on the page |
| --- | --- | --- |
| "you know" | 48.6 per 10k | Pure filler, no reader function |
| "like" as filler | 76 per 10k | Same |
| "um", "uh" | 64.6 per 10k | Same |
| Immediate word repair, "I I", "the the" | 50.8 per 10k | Repair is a speech artifact, prose gets to be right the first time |
| "kind of" as a softener | 21.8 per 10k | Reads as timidity in writing, which he is not |
| Vocatives, "Mike", "man" | 273 and 60 | The page has no interlocutor. Also collides with the no co host rule |
| "right?" as a tag | 19.1 per 10k | Begging for a nod. Prose cannot get one |
| Handing the question back, "So, Mike, what's your opinion on that? Do you agree?" | ends most long turns | The single most common way his spoken structure ends, and it has no written equivalent. He never does it in his own writing |
| Circling back to restate the same point three times | throughout | Speech needs redundancy for retention, prose does not |
| "I'll say that again" | occasional | In writing it just means say it once, well |
| "So" as a sentence opener on autopilot | very high | Keep at most one or two per article, as a genuine consequence marker |
| "at the end of the day" | 1 hit only | Not actually his. Do not add it thinking it is |
| False starts and abandoned clauses | throughout | Obviously |

### 5.3 Carries over only in moderation

Genuinely his, grating at speech frequency.

| Pattern | Speech rate | Written budget |
| --- | --- | --- |
| "Here's the thing" as a pivot | 8 in 32.5k, clustered | **Once per article.** It is a real move, but two uses makes it a verbal tic on the page |
| "100%" as agreement | 27 | **Zero to one.** In writing it reads as chat register. Prefer a full sentence of agreement, which is the concession move anyway |
| Hedged confidence, "I'm conflicted", "I don't know if I'm strong about this" | frequent | **Once per article, on the genuinely contested claim.** This is the pattern most worth rescuing, but at speech frequency it undermines every claim. Use it exactly where he actually is uncertain, and nowhere else. Absent entirely from his 2024 writing, so it needs deliberate, sparing reintroduction rather than mimicry |
| Caps emphasis on one word | untestable | **Two to three per article.** Matches his own measured rate |
| "man" as intensifier | 60 | **Zero, with one exception.** Inside a quoted question to himself, "What gives?" works. As address, never |
| Hot take pre flag | 3 clear instances | **Once per article.** It is a drumroll, and a second drumroll is noise |
| Extended analogy | frequent | **One per article, developed.** He develops the sauce recipe over several beats. Five throwaway figures is the AI pattern, one developed figure is his |
| Rhetorical question | high | **Two to three per article, each answered immediately.** Unanswered rhetorical questions are the AI cliché, and he does not leave them hanging in speech either |
| "So I'll say that again" style repetition | occasional | **Once, at the single most important claim in the piece**, and only with different words the second time |

## 6. Audit of the current spec

`.cursor/skills/writing-promptingbi-articles/references/voice-and-style.md`

### 6.1 Rules that correctly capture a real pattern

| Spec line | Evidence |
| --- | --- |
| Self answering questions, "Can it? Well, of course it can!" | Confirmed in speech, "Why am I saying that? It's not just off the top of my head" [540] |
| Emphasis caps, one word, occasionally | Confirmed, about 3 per post, WHAT, DATA, HOW, YOUR, WANT, INCREDIBLE |
| Everyday analogies leaning Italian food and sports | Strongly confirmed. Mike literally predicts the food analogy mid sentence [540] |
| Contrast framing, "not just a nice to have, but a must have" | 37 instances of the frame in speech |
| Bold quotable predictions to close big ideas | Confirmed both corpora |
| Playful parentheticals | Confirmed in writing |
| Personal and reflective when establishing credibility | Confirmed, though see 6.3 for what it misses |
| Short blunt opinions as their own line | Confirmed, "I hate redundancy." and "I don't know why you're getting paid." [549] |
| No em dashes ever | Confirmed empirically. Zero em dashes and zero en dashes across both 2024 posts |
| One extended analogy beats five throwaways | Confirmed by how he develops the sauce recipe over multiple beats |

### 6.2 Rules the evidence does not support

Blunt, as requested.

**"Short, impactful sentences. If a sentence needs a second breath, split it."** This is wrong and it is probably doing active damage. His written median is 19 words. Nearly 40 percent of his written sentences run 21 words or more. Only 7.7 percent are under six words. He is the longer talker in his own podcast by a clear margin. A rule that instructs a writer to chop everything short produces staccato prose that is not his, and uniform short sentences are themselves a recognized machine tell. The accurate rule is: medium to long default with real subordination, and a short line only where it lands.

**"Corporate hedging is not [fine]" as written, combined with "confident practitioner."** The intent is right, the effect is not. His actual signature is confident content delivered with an explicit confidence marker: "I don't know if I'm strong about this, but", "This is where I'm conflicted." That is not corporate hedging, it is calibration, and it is one of the most human things in the corpus. A spec that says confident and nothing else pushes a writer to delete it. Worth noting: the flagged article's orchestra line reads as a flat assertion, and the underlying spoken material in that register is hedged.

**"Warm sign off that ties back to PromptingBI and the Explicit Measures podcast as brands."** Not evidenced. Neither 2024 post has a sign off. Post 1 ends on the prediction. Post 2 ends on a takeaways list. This is an invented convention. It may be a fine editorial decision, but it should not be presented as his voice.

**"Never name co hosts, quote the show, or narrate that a conversation happened."** This is a defensible editorial rule that directly contradicts his own writing. The first sentence of the 2024-07-17 post is "On a conversation on the podcast I host with 2 fine gentlemen." Keep the rule if it is wanted, but it belongs under editorial policy, not under voice, because as a voice claim it is false.

**"When a sentence could go two ways, pick the one a confident practitioner would say out loud."** As a tiebreaker this quietly selects for the assertive variant every time, which is how the calibration markers disappear. Combined with the short sentence rule it is a recipe for exactly the flat, over asserted register that triggers cliché detectors.

### 6.3 Real patterns the spec fails to mention

This is where the wins are.

1. **The concede then pivot structure.** His single most characteristic argumentative move, and the spec is silent. He grants the opposing case fully, sometimes twice, then turns. Nothing else in his repertoire does as much work for credibility.
2. **Pre flagged hot takes.** The spec says "opinionated practitioner" but never says how he marks an opinion as contested, which is with an announcement and then no softening. "Try to argue with me otherwise" is the register.
3. **Calibration markers.** See 6.2. The absence is not neutral, it is being overwritten by the confidence rule.
4. **Self indictment as the argument's proof.** The spec has "personal and reflective when establishing credibility," which points at the wrong use of self. His actual move is to name his own gap and then generalize from it.
5. **Numbered doctrine with the count announced up front**, plus the "in no particular order" honesty marker.
6. **Dated, specific anecdote as the default unit of evidence.** "Yesterday," "this morning," a named client situation. Not a persona, not a hypothetical.
7. **Coined and owned terminology.** "mind shift", "second brain", "garage skills", "in the trenches", "preached this from the rooftops." The spec never tells a writer that inventing and naming a term is in character.
8. **The boast undercut in the same clause.**
9. **Direct address to an absent third party**, "Microsoft, if you're listening."
10. **Imperatives with numbers attached**, "three hours a week," not "spend more time experimenting."
11. **A negative analogy list.** The spec says which analogies to use but not which are forbidden. Management, orchestra, machinery, and journey metaphors are absent from 246k words of him. The orchestra and conductor figure in the flagged article is the clearest case: zero hits for conductor, orchestra, symphony, maestro, or baton anywhere in the corpus or his writing. It was invented, and it is precisely the class of figure a language model reaches for.
12. **An explicit filler kill list.** Section 5.2 above. The spec describes what to add and never what speech artifacts to strip, which matters now that articles are being drafted from transcripts.

## 7. The one thing to take away

The strongest single finding is that **his voice is calibrated, not confident.** He concedes more than he needs to, he tells you when he is unsure, he leads with his own ignorance, and then he says the hard thing anyway. The current spec captures the "says the hard thing" half and instructs a writer to delete the rest. Flattening a calibrated voice into a uniformly assertive one, in short punchy sentences, with generic management metaphors, is a fair description of what a cliché detector is built to catch.
