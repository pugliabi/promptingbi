---
title: "Skill Converter: Rewrite a Skill for a Different Harness"
description: "Takes a skill written for one harness and emits it for another, preserving procedural knowledge and turning what the target cannot do into named hand-offs."
category: agent-skills
date: 2026-09-16T09:00:00Z
format: markdown
source:
  permalink: "2026/09/16/build-the-thing-that-creates-the-thing"
draft: false
---

I keep the same skills running in a coding harness, a second brain that cannot execute anything, and an agent sitting on top of Fabric. Retyping a skill per tool does not scale, and the copies drift the second one of them gets edited. This converter is what I run instead: the source skill is never touched, and each target gets a rewrite that keeps the procedural knowledge and is honest about what that target cannot do.

The capability block is the part people skip and the part that decides everything. Answer it before writing a line of the converted skill.

```markdown
# Skill: Skill Converter (target-harness rewrite)

Trigger: "convert <skill> for <target harness>"

## What this does
Takes a skill written for one harness and emits the same skill for another.
Same procedural knowledge, different execution assumptions. Never edit the
source skill. Conversion always writes a new file and names its source, so a
converted skill can be regenerated instead of maintained.

## Read first, every run
| Source | Why |
|---|---|
| The source skill, in full | The procedural knowledge being preserved |
| Target capability block (below), answered | What the target can actually do |
| Two existing skills already living in the target | Match their shape |
| The last conversion report for this target | Known gaps, do not rediscover them |

## Target capability block
Answer all five before writing a line of the converted skill. If an answer is
"I don't know," stop and go find out. Guessing here corrupts everything below.
- Can it execute code? If no, every script step becomes a reasoning step.
- Can it reach MCP servers or APIs? Name them. If none, that step is a hand-off.
- Where does it read context from? Name the database, folder, or repo exactly.
- Can it write back? If no, the skill ends in a report, not an update.
- What is this harness actually best at? Say it in one line, and let that line
  decide which steps belong here at all.

## Rewrite rules
1. A script the target cannot run becomes the reasoning that script encoded:
   the steps, the inputs, and the shape of the expected output.
2. Never drop a step because the target cannot perform it. Convert it into a
   hand-off that names the harness that can, and what it needs handed over.
3. Preserve every guardrail verbatim. The guardrails are the part that cost
   someone a bad afternoon to learn.
4. Keep the trigger phrase identical across every target, so muscle memory
   works no matter which harness I am sitting in.
5. Rewrite context paths to the target's actual location. Never carry over a
   path from the source harness and hope it resolves.
6. Resolve nothing by guessing. If the source skill assumes a tool the target
   lacks and there is no hand-off available, say so and stop.
7. Match the target's own conventions for headings, front matter, and file
   naming. A converted skill that looks foreign gets ignored.

## Never
- Never merge two source skills into one converted skill to save an emit.
- Never soften a hard stop into a suggestion because the target is chattier.
- Never convert a skill that is already stale. Refresh the source first.

## Report back (required)
- Which steps converted cleanly, which became hand-offs, which were blocked
- Every assumption you had to make about the target
- What the target is best at, in the one line from the capability block
- Where the converted file was written, and which source skill it came from
```

## Adapting it

- **The five capability questions are the whole design.** Code execution, MCP reach, context location, write-back, and what the harness is best at. Those answers determine the shape of the output, which is why they get answered before any writing happens.
- **Rule 2 is the one that keeps conversions honest.** The temptation when a target cannot do something is to quietly drop the step. Six weeks later a validation pass is missing and nobody remembers deciding to skip it. A named hand-off leaves the step visible and assigns an owner.
- **Rule 3 exists because guardrails are the expensive part.** Steps can be rephrased. A hard stop that came from a real incident gets copied word for word or it stops working.
- **Rule 4 is why this becomes a reflex.** One trigger phrase across every harness means you never think about which tool you are in before you can start.
- **The "what is this harness best at" line prevents the worst outcome**, which is converting a skill into a harness that has no business running it. If the one-liner does not cover the job, the answer is a hand-off, not a conversion.
- **The report-back is what makes the converted skill disposable.** With the assumptions and gaps written down, the next conversion is a regeneration rather than an archaeology project.
