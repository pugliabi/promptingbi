---
title: "AI Tool Intake Test"
description: "Five questions and a removal trigger that decide whether a new skill, MCP server, or harness gets near client work."
category: playbooks
date: 2026-09-09T09:00:00Z
format: markdown
source:
  permalink: "2026/09/09/you-dont-have-an-ai-strategy"
draft: false
---

I keep this as a checklist file next to my project notes and fill one out per tool. It takes about four minutes, and the point of writing it down rather than deciding in my head is question 5: a removal trigger you never wrote down is a removal trigger you'll never enforce.

The four gaps in question 1 are the only jobs a tool can hold on a Power BI or Fabric project. Knowledge is a skill, hands is an MCP server, memory is the harness, eyes is verification.

```markdown
# Tool intake: <name of tool / skill / MCP server>

Date evaluated: <YYYY-MM-DD>
Source: <repo URL, vendor doc, or announcement>

## 1. Which gap does it fill?

- [ ] Knowledge (a skill: packaged expertise so the model stops improvising)
- [ ] Hands (an MCP server: defined tools instead of invented TMDL/code)
- [ ] Memory (the harness: context that survives the chat window)
- [ ] Eyes (verification: a check that produces an artifact)

If none of the four fit, or the honest answer is "it looks interesting,"
stop here. It goes in the weekend lane.

## 2. What does it displace?

Replaces: <existing tool, script, or manual step>

If nothing, you are accumulating rather than choosing. A second tool with
hands on the same model is duplication plus a cost on every prompt.

## 3. What is the check?

The artifact that proves it did the job:

- [ ] Row count compared against a known value
- [ ] Screenshot of the rendered result
- [ ] A validate command that exits clean
- [ ] Other: <name it>

No check available = weekend lane, permanently. A demo is not a check.

## 4. Which lane?

- [ ] Weekend (side projects, experiments, vibe coding; failure is free)
- [ ] Client (someone's name is on the invoice)

Client requires: gap named in 1, displacement named in 2, check named in 3.

## 5. Removal trigger

This gets uninstalled when: <pick at least one>

- [ ] Unused for 30 days
- [ ] Failed its check twice
- [ ] The thing it displaced comes back into use
- [ ] Other: <name it>

## First session (before any write operation)

Ask the tool what it is, not what to do:

    What do you see, and what can you do?

A tool that cannot describe its own surface honestly does not touch a model.

## Two-shot rule

If the task is not right within one or two shots, kill the session and open
a new one. The instructions were the problem, not the tool. Ask the agent to
write the prompt for the fresh window before closing the old one.

## Quarterly cut

Walk every entry in the MCP config and the skills folder. Write one sentence
per entry naming its job and its check. Anything without a sentence comes out.
```

## Adapting it

- **Question 1 is the whole filter.** Four gaps, one slot each. The line that does the work is the instruction to stop when none of them fit, because "it looks interesting" is a real and valid reason to try something, just not in the lane where a client is paying.
- **Question 2 prevents accumulation.** Most tool decisions feel like choices and are actually additions. Forcing yourself to name what gets removed is what turns one into the other.
- **Question 3 is the admission gate.** Verification comes before adoption, not after. A tool you can't check will eventually produce something confidently wrong and you'll find out from a stakeholder.
- **Question 5 has to be written before install, not after.** Nobody uninstalls a tool they're mildly disappointed by. A pre-committed trigger removes the judgment call at the moment you're least likely to make it.
- **The interrogation line replaces a task with a question.** Sending "what do you see, and what can you do" as the first message surfaces scope, permissions, and version gaps in one turn, and it costs one cheap round trip instead of a bad write.
- **The two-shot rule is about context, not patience.** Continuing in a session that already went sideways compounds bad instructions and burns tokens. A fresh window with a rewritten prompt is almost always faster.
