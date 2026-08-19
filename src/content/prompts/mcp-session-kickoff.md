---
title: "MCP Session Kickoff and the DAX Autonomy Directive"
description: "The one line I type to start a modeling session, and the standing directive that turns the agent from a template-follower into a modeler."
category: session-prompts
date: 2026-08-05T09:00:00Z
format: markdown
source:
  permalink: "2026/08/05/inside-an-mcp-execution-session"
---

Here's the entire kickoff, typed into Claude Desktop or Cursor:

```markdown
Read the Claude instructions for the Northside semantic model work.
Let's start there.
```

That's the prompt. If you're still hunting for the perfect one, you're optimizing the wrong layer. One boring line is enough when the context engineering already happened somewhere else.

What it sets in motion: the agent pulls the instructions page over the Notion MCP and reads it clean. It sees the priority callout, so it knows this session is Ticket Sales measures and nothing else. It sees the read-first table, so it fetches the milestone page and the data dictionary itself. It sees last session's recap, so it knows where the measure work left off. Then it connects to the model in Power BI Desktop, exactly the way the tools section told it to.

## The directive worth stealing verbatim

This one lives in the standing directives section of every modeling brief I write.

```markdown
## 🧠 DAX Autonomy Directive (standing)
The DAX patterns on this page are starting points, not templates.
Use your own expert judgment on function choice and structure.
You have full authority to write better DAX than I sketched, so
long as you document your reasoning in code comments wherever
you deviate.
```

I want an expert modeler, not a copy machine. [What a documented deviation actually looks like](/prompts/dax-acceptance-tests/) is the proof that it works.

## The closing line

Every instructions page in the library ends the same way, and it's the line that makes this a loop instead of a one-off:

```markdown
Write a recap to the project hub when the session ends: what was
built, validated, flagged, and what's next. A session without a
recap is not done.
```

Skip the recap and you're back where everyone starts: a pile of good work your system never learned from, and a next session that opens with re-explaining. The recap is cheap. Amnesia is expensive.

The anatomy of the page this kickoff points at: [Inside an MCP Execution Session](/2026/08/05/inside-an-mcp-execution-session/).
