---
title: "Fabric Reconnaissance Brief and Verified Tenant State"
description: "The read-only survey an agent runs before it touches a Fabric workspace, plus the dated state block that tells it how your tenant is misleading."
category: fabric-guardrails
date: 2026-08-17T09:00:00Z
format: markdown
source:
  permalink: "2026/08/17/dont-let-your-agent-touch-fabric"
---

Typing "what do you see?" into a chat window is improvisation, and you get a different answer every time. If a step matters enough to run at the start of every session, it matters enough to write down. Both blocks below live next to my notebook standards, and the agent reads them over the Notion MCP server before it touches Fabric.

## The reconnaissance pass

```markdown
## Reconnaissance Pass: Northside Fabric Workspace

You are performing a read-only survey. Create nothing. Modify nothing.
Run nothing. If a tool call would write, stop and report instead.

### Read these first
| Source                    | What to look for                           |
| Notebook standards        | naming conventions, validation rules       |
| Fabric data platform plan | which layers are signed off vs. in sprint  |
| Latest project recap      | anything that moved since this was written |

### Report back in this shape
1. Lakehouses you can reach, and which you CANNOT
2. Per lakehouse: physical tables and shortcuts, counted separately
3. Items whose name, description, and contents disagree
4. Operations you have, and operations you expected but do not have
5. Per layer: what you believe is complete, and the evidence you used
6. Your open questions, before any build

### Rules
- A shortcut is a pointer, not data. Never sum row counts across lakehouses.
- Names beat descriptions. Flag the conflict, do not resolve it yourself.
- Existence is not completion. A notebook that runs is not one I trust.
- Cite the source for every status claim. No inference stated as fact.
- End with what you would need in order to be wrong.
```

Four lines do most of the work. **"Which you CANNOT"** turns a missing permission into a reported finding instead of a silent failure two hours later. **Counting shortcuts separately** is the highest-value line on the page. **"Names beat descriptions, flag the conflict"** stops the agent from quietly picking a side in your metadata's argument with itself. And asking what it would take to be wrong is the difference between a status report and a conversation.

## The verified state block

Survey findings and the starter-kit profile go at the top of the standards page as a dated block. Replace every value with your own, and keep the date honest.

```markdown
## Verified Tenant State

Counts read from the Fabric REST API, not carried forward from this page's
history. Verified 2026-08-17. If you are running later, re-verify first.

| Fact                       | Value                                     |
| Lakehouses                 | 7 (bronze, silver, gold + 4 dept marts)   |
| Tables reported by the API | 113                                       |
| Physical Delta tables      | 71                                        |
| OneLake shortcuts          | 42                                        |
| Notebooks                  | 9 items, 8 of which do actual work        |

**Rules that follow from this:**
- A shortcut is a pointer, not data. NEVER sum row counts across lakehouses.
  `dim_date` resolves 5 times, `dim_event` 3 times, every gold table twice.
- The four department marts hold zero physical tables. Writing to a mart
  means writing to silver or gold.
- Trust item names and contents over descriptions. `silver_lakehouse` is
  described as "Delta Lake storage for Gold layer" and that is wrong.
- `notebook`, `report`, and `semantic_model` are scaffolding placeholders,
  not work. Do not count them and do not build on them.
```

That block takes ten minutes to write and it does more work than any other page on the project, because it converts "the agent might misunderstand my workspace" into "the agent has been told the specific ways this workspace is misleading."

## Adapting it

- **Note the verification date.** A reference point with no date is a future trap.
- **Read the survey like a code review, then fix what it caught** in your own documentation, not just the tenant. Stale standards are more dangerous than stale metadata, because the agent trusts them more.
- **Re-run it every session.** Agents don't carry yesterday's understanding of your workspace into this morning's chat, which is why the brief has to be cheap enough to run that often.

What the agent does after recon clears: [the notebook test harness](/prompts/fabric-notebook-test-harness/).
