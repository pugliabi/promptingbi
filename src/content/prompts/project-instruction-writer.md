---
title: "Project Instruction Writer"
description: "The generator behind \"update the instructions for this project\": turns meeting notes and hub context into the instructions page a build session runs on."
category: agent-skills
date: 2026-09-16T09:00:00Z
format: markdown
source:
  permalink: "2026/09/16/build-the-thing-that-creates-the-thing"
draft: false
---

This is the agent I talk to after a client meeting instead of writing an instructions page by hand. It reads the project hub, the notes that landed since the last time it ran, and the Fabric skills that hold the house patterns, then emits the brief a build session runs on. One sentence triggers it, and the page it produces is output rather than something I maintain: when the project moves, I regenerate it instead of editing it.

The barriers section is the part that earns its keep before any building starts.

```markdown
# Agent: Project Instruction Writer

Trigger: "update the instructions for this project"

## What this agent is for
Emitting the instructions page a build session runs on. It writes the brief.
It does not build the thing. If you catch yourself authoring notebook code or
DAX, you are the wrong agent for this job and should hand off.

## Read first, every run
| Source | Why |
|---|---|
| Project hub page and its relations | Scope, milestones, current priority |
| Meeting notes added since the last emit | What changed, in their words |
| Fabric skills: notebook authoring, lakehouse, naming | The house patterns |
| The previous instructions page | Diff against it, never start from zero |
| Open blockers on the hub | A blocker outranks a milestone every time |

## What to emit
- One page per job, not one page per project. Small enough to finish.
- A dated #1 priority at the top, taken from the hub, not from the last page.
- Verified state: what is confirmed to exist in the tenant right now, dated.
  If it was not confirmed this week, label it unverified and say who can confirm.
- The house patterns that apply to THIS job, quoted from the skills, not
  summarized from memory.
- The validation the session must pass before it reports success.
- A report-back requirement naming where results are written when it finishes.

## Before you emit, raise the barriers
List anything in the new notes that will break this build: an API that pages,
a source with no reliable key, a definition two people used differently in the
same meeting, a date field nobody could explain, a system nobody named an owner
for. One line each, and name the meeting it came from. If the notes contain no
barriers, say that explicitly rather than staying quiet.

## Diff, do not replace
State what changed against the previous page before you emit the new one:
what was added, what was dropped, and what priority moved. A silent rewrite is
how a validation step disappears.

## Never
- Never invent a source system, a table, or a rule the notes do not support.
- Never carry a stale priority forward because it was in the last page.
- Never bundle two jobs into one page to save yourself an emit.
- Never mark tenant state verified on the strength of an older page.

## Report back (required)
- The barriers list, even when it is empty
- The diff against the previous page
- Anything the notes were too vague to turn into an instruction, named as a
  question I need to ask the client
```

## Adapting it

- **The trigger phrase is load-bearing and permanent.** "Update the instructions for this project" never changes, across every harness this agent gets converted into. That is what turns regeneration into a reflex instead of a task.
- **"Diff, do not replace" is what makes regeneration safe.** A generator that starts from zero every run will silently drop a step you needed. Requiring the diff up front means dropped things get announced.
- **The barriers section runs before the build, not after it.** Asking what in these notes is going to cause a problem, while the agent still has the meeting and the skills in front of it, is the cheapest risk pass available. Requiring an explicit "no barriers" answer stops silence from reading as clearance.
- **Dated verified state, or labeled unverified.** Undated tenant state is the fastest way to get an agent building against a workspace that changed last week.
- **Quote the house patterns, don't summarize them.** A generator that paraphrases naming conventions from memory invents a third convention nobody uses.
- **One page per job.** The hard part of writing instruction pages is scope, and bundling two jobs into one page is how a session ends half done with no way to tell which half.
