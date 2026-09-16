---
title: "Skill Converter: Rewrite a Claude Skill as a Notion AI Skill"
description: "The converter I actually run. Turns a Claude skill into one Notion page that works as an AI Skill and as a context page Claude reads back later."
category: agent-skills
date: 2026-09-16T09:00:00Z
format: markdown
source:
  permalink: "2026/09/16/build-the-thing-that-creates-the-thing"
draft: false
---

This is the converter that moved my Fabric skills out of a coding harness and into a Notion advisor. Notion Custom Skills are pages you mark "Use as AI Skill," so the conversion target is a single page, and the whole job is deciding what survives the trip. Notion cannot execute scripts, so the mechanics cannot travel. The knowledge, the conventions, and the decision logic can.

The converted page has two readers, and both matter. Notion Agent uses it as a skill to draft, answer, and plan inside Notion. Claude reads the same page back over the Notion MCP to pick up project context before it executes anything locally. Write for both.

```markdown
# Skill: Convert a Claude Skill into a Notion AI Skill

Trigger: "convert <skill> for Notion"

## The constraint that shapes everything
Notion cannot execute scripts. Convert the knowledge, the context, and the
decision logic. Never convert the mechanics. Any step that only exists at
execution time becomes reasoning or a named hand-off back to Claude.

## What this produces
One page under the AI Skills parent, marked as an AI Skill by a human after
you write it. Never edit the source skill. Every conversion writes a new page
and names the source it came from, so it can be regenerated later instead of
maintained by hand.

## Read first, every run
| Source | Why |
|---|---|
| SKILL.md, every reference file, every script | You cannot describe a script you did not read |
| Two skill pages already living in the target | Match their shape and headings |
| The parent page, in full | Duplicate check before you create anything |

## Step 1: Classify the skill
The profile decides what the page optimizes for. Pick one before writing a line.
- **Workflow skill** (interview processes, drafting wizards, review loops): the
  procedure is the value. Preserve the steps, the interaction contract, and the
  output format faithfully. The page is a runnable prompt.
- **Technical skill** (semantic models, DAX, TMDL, notebooks, anything
  script-heavy): the knowledge is the value, because the target can never run
  the mechanics. The page is a domain brief: what the system is, the
  vocabulary, the house conventions, the design rules, the gotchas, and how the
  work connects to the rest of the stack. Compress the workflow down to a short
  "how work proceeds" section.
- **Hybrid**: give each half its own weight. Do not average them into mush.

## Step 2: Compress on purpose
- Keep: purpose, when to use it, core concepts and vocabulary, decision logic,
  output formats, hard constraints, and business facts copied exactly. Rates,
  hour estimates, naming conventions, and brand colors are the highest-value
  lines on the page.
- Compress: long examples down to one, several reference docs down to their
  takeaways.
- Drop: local paths, CLI flags, install steps, code listings, and anything that
  only means something at execution time.

## Step 3: Convert scripts without converting code
Every script becomes one entry in a "What the executor automates" section:
what it accomplishes, what inputs it needs, what it produces, and the decision
logic baked into it. Never paste script code onto the page. The reader needs to
know the capability exists and that the run happens somewhere else.

## Step 4: Put the rules where attention is
Load-bearing rules go at the very top and the very bottom of the page.
Attention is strongest at both ends, so a rule buried mid-page is a rule the
agent skips.

## Step 5: Write it
One page per skill. No reference sub-pages and no appendices: everything
distilled into the one page, 1,200 to 1,500 words. Second person imperative,
because this is a prompt and not documentation. Where the source names a page
or database that already exists in the workspace, link it natively instead of
describing it. Title the page in plain human-readable form and give it a
fitting icon.

## Never
- Never carry a key, token, or credential found in the source. Stop and report
  it instead.
- Never invent a convention the source skill does not state.
- Never create the page before checking the parent for one with the same title.
  If it exists, ask whether to replace it in place or write a new one alongside.
- Never claim the conversion is live. Marking a page as an AI Skill is a human
  click that no API performs for you.

## Report back (required)
- What was kept, what was compressed, and what was dropped, one line each
- The URL of the page written, and the source skill it came from
- The activation step, spelled out: open the page, ••• menu, Use with AI,
  Use as AI Skill
- Any secret found in the source and refused
```

## Adapting it

- **The constraint at the top is doing the work.** "Notion cannot execute scripts" is the one fact that decides every other line. Swap in a different target and the first thing you write is that target's version of the same sentence, because that is what the whole conversion bends around.
- **Classification before writing is what keeps technical skills useful.** Convert a DAX or TMDL skill as a procedure and you get a page describing steps the target can never run. Convert it as a domain brief and the agent can discuss, plan, and recognize the moment to hand execution back.
- **Business facts get copied, never paraphrased.** Rates, hour estimates, and naming conventions are the lines a Notion agent quotes to a client. A rephrased rate is a wrong rate.
- **The "what the executor automates" section replaces the code, not the capability.** A reader still needs to know the script exists and what it produces, otherwise the converted skill quietly loses a third of its abilities.
- **Rules at both ends is not formatting advice.** Attention falls off in the middle of a long page, so the guardrail you care most about goes first or last.
- **The human click is part of the workflow, not a footnote.** No API marks a page as an AI Skill, so a conversion that does not end by naming the activation step ends with a page nobody activated.
- **Never carrying secrets applies to whole skills.** Some source skills have a token inline in an example. Flag it and keep going; the converted page is going somewhere more people can read it.
