---
title: "Stop Hand-Writing Your Semantic Model's AI Prep. Let an Agent Do It"
date: 2026-08-26T09:00:00Z
permalink: "2026/08/26/agent-writes-your-semantic-model-ai-prep"
draft: true
description: "Power BI semantic models already have a Prep for AI box for instructions. Writing it by hand is the wrong job for a human. An agent should generate it from the model."
tags:
  - ai-agents
  - semantic-models
  - power-bi
  - microsoft-fabric
  - copilot
  - business-intelligence
# Editor-only. No transcript yet — this is a raw idea to flesh out later.
# Supporting material already in the local cache is listed under "Transcript support" below.
source:
  episode: null
  title: "TBD — no episode captured yet"
---

> **Backlog idea, not a draft.** No episode/transcript captured for this one yet. Notes below are the raw thesis plus the transcript passages already in `transcripts/` that back it up. Promote to `drafts/` once an episode lands (or write it as an original).

## The idea (the why)

Power BI semantic models now have a **Prep for AI** experience (inside the PBIP format) with a dialogue box where you type instructions that get saved *inside the model* — the exact "put context in the model" thing I've been asking Microsoft for. Great. But the default assumption is that a human sits down and hand-writes those AI-prep instructions. That's the wrong job for a person.

The model already contains most of what the AI prep needs: tables, relationships, measures, and (if you're disciplined) descriptions. So an **agent** should read the model and *write the Prep-for-AI instructions for you* — draft the instructions, the synonyms, the "here's what a correct answer looks like" guidance — instead of you starting from a blank box. You review and edit. You don't author from scratch.

This is "reviewing is the new writing" applied to the one place Microsoft just gave us to store AI context.

## Why it matters

- The Prep-for-AI box is real but rough today: **character limit, not markdown, unclear file format** (see ep-542). Hand-authoring into a cramped text box is exactly the kind of tedious, low-leverage work agents are good at drafting.
- Every model has the raw material for its own instructions already sitting in the definition. Making a human transcribe that into an instructions box is redundant — and I hate redundancy.
- It closes the loop on the `.ai` folder argument: context belongs *in* the model, and the agent that reads the model should also be the one that populates that context.

## Angles to pick from later

1. **"The AI prep writes itself."** An agent reads the semantic model + descriptions + a sample stakeholder question set and drafts the Prep-for-AI instructions. Human reviews. (Strongest / most concrete.)
2. **Reviewing, not writing.** Frame it as the semantic-model instance of the reviewing-is-the-new-writing thesis.
3. **The box is the beachhead.** Microsoft shipped the storage location (Prep for AI). The next move is generation, not manual entry — and that's where a skill/agent comes in.
4. **From `.ai` folder to `.ai` *content*.** The prior post argued for a home for AI context; this one argues an agent should fill that home.

## Transcript support (already cached)

- **ep-542** — the anchor. Mike corrects the show: the semantic model *already* has a place for agent instructions, "inside the PBIP format, specifically inside the ... prep data / prep for AI experience, there is a dialogue box that allows us to ... enter in instructions ... saved directly inside the model." Also flags the limits: "character limits and it's not markdown ... there's a character limit ... it's not TMDL." Perfect setup — the box exists, it's clunky, so don't hand-author it.
- **ep-484** — Copilot AI instructions to control how it answers, plus Tommy ribbing Microsoft that the guidance is "rather than just write what you want it to do" a giant manual. Reinforces: humans shouldn't be hand-writing dense instruction blobs.
- **ep-539** — "if you don't have a good semantic model ... truly planned out, you're going to [struggle]." The model quality is the substrate the agent draws the prep from.
- **ep-545 / ep-544** — harness + skills framing (agents write the instructions, you review) to reuse for the mechanism.

## Related published/backlog posts

- Builds directly on **"Your Semantic Model Needs a .ai Folder"** (`2026/08/02/...`) — that post argues *where* AI context should live; this one argues *who writes it* (an agent, from the model).
- Pairs with **"Reviewing Is the New Writing"** backlog idea.

## Open questions before drafting

- Get hands on the Prep-for-AI box: actual character limit, file format, whether it round-trips in the PBIP/TMDL so an agent can write it programmatically vs. only via the UI.
- Is there an MCP/modeling-server path to set the AI-prep instructions (ep-542 mentions the Power BI modeling MCP server + Copilot in modeling for the web)? If yes, that's the "agent writes it" mechanism — name it.
- What's the minimum input the agent needs beyond the model itself (a few stakeholder questions? a report screenshot?) to draft good prep.
