---
title: "The Creator Agent"
date: 2026-09-09T09:00:00Z
permalink: "TBD"
description: "Point AI at the unknown, then capture the known behavior in deterministic code. The distinction Microsoft's ask-your-data marketing gets backwards."
draft: true
tags:
  - ai-agents
  - microsoft-fabric
  - power-bi
  - mcp
  - reporting
source:
  episode: 549
  transcript: "transcripts/ep-549.txt"
---

**IDEA, not an outline.** Filed 2026-09-09 while writing
[You Don't Have an AI Strategy. You Have AI Theater.](/2026/09/09/you-dont-have-an-ai-strategy/), which spends one
paragraph of this and leaves the rest intact.

## Angle

Tommy's own term, vocative-attributed in ep 549: "We think about AI is stepping into the uncertainty, exploration,
creating new things... once that behavior is known... capture that in deterministic code. That's my term, the
creator agent."

The foil is the ask-your-data marketing push. On Microsoft's "what were my sales last month" Copilot messaging:
"you're being fleeced... go ask a question of the same thing over and over again." Paying per token to re-derive an
answer you already derived is the opposite of what agents are good at.

## Why it's its own post

The theater post uses the creator agent only as the test for whether a tool should exist. The full argument is
bigger and has its own worked examples:

- Discovery is the right job: the API you've never seen, the tenant you just got access to, the model nobody
  documented. That's where tokens buy something.
- The moment the behavior repeats, it should stop being an agent call. It becomes a script, a command, a certified
  report, a validated notebook. The command layer in
  [Design the Report From the Meeting You Already Had](/2026/08/19/design-the-report-from-the-meeting-you-already-had/)
  is this pattern already: the agent stopped hand-writing PBIR and started calling deterministic commands.
- Cost angle is real and underused. An agent answering the same question weekly is a recurring bill for a
  one-time problem.

## Supporting material

- Ep 550 (Mike-led, Tommy affirmed): AI belongs in unknown/discovery, then you hard-code the report/script/tool.
  Careful with attribution; the sharpest version is Tommy's in ep 549.
- Ep 546: the pipeline ops agent as "a purpose of an agent" versus Microsoft bundling ops agents into unrelated
  orchestration announcements.
- Ep 548: Mike's CU burn number (four data-agent requests consumed roughly 43 minutes of F2 capacity in under five
  minutes). Verify before using; it's Mike's, and it's a strong cost anchor if it holds up.

## Do not reuse

The four-gap frame, the two-lane model, the intake test, and "specify, bound, validate" all belong to the theater
post. This one needs its own spine.
