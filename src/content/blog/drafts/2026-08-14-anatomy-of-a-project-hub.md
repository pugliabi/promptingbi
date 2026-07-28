---
title: "Anatomy of a Project Hub: Where Your Agent's Context Actually Lives"
date: 2026-08-14T09:00:00Z
permalink: "2026/08/14/anatomy-of-a-project-hub"
description: "A page-by-page tour of the Notion project hub that feeds my AI agents context, so every session starts informed instead of from zero."
featured: /images/2026/08/anatomy-of-a-project-hub-banner.png
draft: true
tags:
  - ai-agents
  - context-engineering
  - microsoft-fabric
  - power-bi
  - business-intelligence
---

When I wrote [Stop Re-Prompting](/2026/07/20/stop-re-prompting-second-brain-agent-instructions/), the idea that got the most questions wasn't the agents or the MCP servers. It was the hub. People wanted to see it. What does "the project is the hub" actually look like on the page? What databases? What relations? What does an agent actually read when it walks in?

Fair. So this post is the tour. It kicks off a three-part series that goes deeper into each stage of the two-harness loop: this one covers the **organized context**, the next covers the **MCP execution session**, and the third covers the **department audit** that keeps the whole thing honest.

To show you real pages without showing you client data, I'm using a demo project I keep for exactly this purpose: **Northside Baseball Club (NBC)**, a fictional independent league baseball franchise out of the Chicago north suburbs. The data is fake. The structure is identical to every real client project I run. That's the point of the demo: same hub, same relations, same agents, nothing sensitive on screen.

![A central project hub node connected by relation lines to milestone cards, meeting notes, deliverable checklists, and agent badges, flowing right into a Power BI dashboard](/images/2026/08/anatomy-of-a-project-hub-banner.png)

## The Project Is the Hub, Everything Else Is a Relation

The single most important design decision, the one I whiteboarded before building anything, is that **the project page is the center and everything else relates to it**. Not folders. Not a pile of notes with good titles. Actual database relations.

In the NBC setup:

- **Projects database.** NBC is one page in it. Every client engagement, every internal build, every side project is a page in the same database.
- **Milestones database**, related to the project. NBC has seven: the semantic model and Power BI reporting, the Fabric data platform, the BI modernization roadmap, the operations P&L, the MCP integration, the season ticket holder CRM analytics, and the medallion architecture notebooks.
- **Meetings database**, related to the project. Every meeting note knows which project it belongs to, automatically, forever.
- **Deliverables database**, related to milestones. Each deliverable is a checkbox with a status, not a sentence buried in a doc.
- **Time entries**, related to deliverables, because hours against scope is a question clients ask and agents can answer.

<!-- SCREENSHOT: NBC project hub page in Notion, full page view showing the two callouts and the Milestones + Meetings databases -->

Why does this beat a folder of markdown files? Because relations are what let an agent **reason** instead of just search. When I ask "does anything from today's call block the Ticket Sales dashboard," the agent doesn't grep for keywords. It walks the graph: today's meeting relates to NBC, NBC relates to the semantic model milestone, that milestone owns the dashboard deliverable, and the deliverable has a status. That's a chain of joins, and if you've spent your career in star schemas, you already know why joins beat string matching.

And I mean joins literally. The Notion MCP exposes these databases as queryable tables, so when an agent needs the state of every NBC milestone, it runs something like this:

```sql
SELECT "Milestone /  Phase" AS milestone, Status, MilestonePrioirty
FROM milestones
WHERE "⚾ Projects" LIKE '%northside-baseball-club%'
ORDER BY MilestonePrioirty
```

Two things about that query. Yes, the priority column is misspelled in my workspace, and yes, the title column has two spaces after the slash. It's been that way forever, the agents handle it fine, and I stopped caring. But look at what the query IS: a structured question against structured records. No prompt engineering, no "please find the relevant notes." Your data modeling instincts transfer directly to context engineering. That's the thesis of this whole post.

![A project hub at the center with labeled relation lines radiating to a milestones database, a meetings database, a deliverables checklist, and a resources index](/images/2026/08/anatomy-of-a-project-hub-relations.png)

## What's Actually on the Hub Page

Open the NBC project page and the top of it is two callouts, side by side. Neither one is written by me.

The first is **Latest News & Review**, a dated snapshot of every milestone in one place. As of this writing it says things like: star schema foundation complete, 18 tables and 63 relationships with the data dictionary done; Ticket Sales dashboard in sandbox; AXS bronze ingestion done with Salesforce notebooks in sprint; MCP server build active with 6 tools in flight. Seven milestones, one paragraph each, current.

The second is **Suggested Next Steps**, a prioritized list of what to act on, verify, or review, with each item linking straight to the milestone page it came from. Right now the top item is the BI modernization roadmap, because it's the active sprint and the stakeholder interviews are what unblock everything downstream.

Both callouts are maintained by my agents on a schedule and after meaningful events. This matters more than it looks. The hub isn't a filing cabinet I keep tidy out of discipline. It's a briefing that stays current whether or not I touched it this week. When I open the project Monday morning, or when an agent opens it mid-session, the first screen answers "where are we and what matters right now."

Below the callouts: the milestones database view, the meetings database view, a running notes column, and a **Project Updates** toggle, which is an automated changelog. Every time statuses flip or pages change, a dated entry lands there. More on who writes those entries in part three of this series.

## Every Milestone Page Has the Same Skeleton

Here's a detail that took me too long to appreciate: **consistency of structure is context engineering**. My operations agent built out all seven NBC milestone pages with one canonical shape:

- **Latest News & Review** callout, the status snapshot for just this milestone
- **Suggested Next Steps**, scoped to this milestone
- **Scope**, as collapsed toggles, one per phase or topic
- **Deliverables**, a checklist with done and open items
- **Overview** callout with the objective, success criteria, and a definition of done
- **Resources & Links** and a notes section
- **Milestone Updates**, the automated log

<!-- SCREENSHOT: NBC MCP Integration milestone page showing the canonical structure, scope toggles, and deliverables checklist -->

Take the MCP integration milestone. Its scope toggles name the six tools being built (ticket lookup, section availability, revenue query, game schedule, attendance, refunds), the three agent workflows on top of them, and the natural-language-to-DAX layer that's pending. Its deliverables checklist shows exactly which of those are done. Its definition of done is one sentence a client could read.

Why does uniformity matter to an agent? For the same reason a star schema matters to a report author. If every milestone page has the same shape, the agent never wonders where the deliverables live or which callout is current. It reads position, not prose. An agent parsing seven differently-organized pages burns tokens and makes mistakes. An agent parsing seven identical skeletons is fast and boringly reliable. Boring is what you WANT from infrastructure.

![Three identical milestone page skeletons side by side, each with the same stacked sections, feeding into a single agent node that reads them in one pass](/images/2026/08/anatomy-of-a-project-hub-skeleton.png)

## The Hub Is What Makes the Rest of the Loop Possible

Everything I'll show in the next two posts depends on this structure existing first.

The **Claude instruction pages** that my second brain writes for the execution harness? There's a whole library of them on a real project, one per tool and job, and every one is assembled from the hub: the milestone scope, the deliverable statuses, the blockers surfaced in meetings, the decisions logged in updates. An instructions page written from a well-related hub scrolls for pages and is accurate. An instructions page written from a folder of notes is a guess.

The **department audit** that catches drift between what we said and what we did? It works by comparing the deliverables database against meeting notes and news items, which is only possible because both sides of that comparison are structured and related.

And the loop closes back here. When an execution session finishes semantic model work, the recap files into the hub, statuses flip, the news callout updates, and tomorrow's briefing already knows. The hub is both the source and the destination. That's what makes it a harness and not a diary.

## Build Your Own Hub This Week

You don't need seven milestones and three agents on day one. You need the shape:

1. **Create a projects database** and make one page per active engagement. Resist making the page a document. It's a hub.
2. **Relate a milestones database and a meetings database to it.** Two relations. That's the minimum graph.
3. **Give milestones a deliverables checklist** with real statuses, because "done" needs to be a field an agent can flip, not a vibe.
4. **Standardize the milestone page layout** and apply it everywhere. Same sections, same order, every page.
5. **Add the two callouts** to the project page: a dated status snapshot and a prioritized next-steps list. Write them by hand for the first week if you have to. Then hand them to an agent.

If it helps, here's the milestone skeleton stripped to the studs. Paste it, fill it, duplicate it:

```markdown
# NBC — MCP Integration & AI Tooling

## 📰 Latest News & Review
> (as of 2026-08-12) One dated paragraph on where this milestone
> stands. Maintained by the agents, not by discipline.

## 🎯 Suggested Next Steps
1. Highest-leverage action first, linked to the page it lives on

## Scope
▸ Phase 1 — Core MCP tools        (collapsed toggle per phase)
▸ Phase 2 — Agent workflows
▸ Phase 3 — NLQ to DAX layer

## Deliverables
- [x] Ticket lookup tool (Done)
- [ ] Revenue query tool (In progress — ETA next sprint)

## Overview
> Objective, success criteria, and a one-sentence definition of done
> a client could read.

## Resources & Links

## Milestone Updates
▸ Automated log — dated entries land here when statuses flip
```

Do that for ONE project and run it for two weeks. The first time you ask an agent a cross-cutting question and it answers by walking your relations instead of asking you to paste context, you'll feel the difference.

## Takeaways

- The project page is the hub; milestones, meetings, deliverables, and time entries connect to it through database relations, not folders.
- Relations let agents reason with joins instead of searching text, exactly like a star schema beats a flat file.
- The top of the hub is a briefing, not a filing cabinet: a dated status snapshot and a prioritized next-steps list, maintained by agents.
- Identical milestone page skeletons are context engineering; agents read structure faster and more reliably than prose.
- The hub is both source and destination: instructions pages are written from it, and execution recaps file back into it.

Next in this series: the MCP execution session, where the instructions page my hub writes gets picked up by Claude and turned into real semantic model work over the Power BI Modeling MCP. If this sparked something, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
