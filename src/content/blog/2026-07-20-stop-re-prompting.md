---
title: "Stop Re-Prompting: Your Second Brain Should Write Your Agent's Instructions"
date: 2026-07-20T09:00:00Z
permalink: "2026/07/20/stop-re-prompting-second-brain-agent-instructions"
draft: true
description: "Stop re-prompting your AI agent. Build a two-harness workflow where your second brain writes the agent's instructions and MCP executes in Power BI and Fabric."
featured: /images/2026/07/stop-re-prompting-banner.png
---

Every session with an AI agent starts the same way for most people I work with. Open a chat, paste in the background, re-explain the project, re-list the requirements, and hope the model holds it all in its head long enough to do something useful. Then the session ends, the context evaporates, and tomorrow you do it all again. That is not a workflow. That is a tax.

Here is my position: if you are still hand-feeding context to your agent every time you sit down, the problem is not your prompt. It is that your prompt is doing a job your **harness** should be doing. And the fix is not one harness. It is two harnesses that talk to each other: one that organizes your business context, and one that executes against Power BI and Fabric.

## A Better Prompt Won't Save You

We have spent two years telling people to get better at prompting. Fair enough, prompts matter. But the large language model is just text in, text out. Everything that makes an agent actually useful lives around the model, not inside it. The skills you give it. The context it can reach. The tools it can call. The place it reports back to.

Ask me for the one thing that makes AI work on a real Fabric project and I am not going to say a clever prompt. I am going to say the harness, and how you plan it out. A single prompt, even a great one, is a snapshot. It knows what you typed and nothing else. It does not know what the client said in Tuesday's meeting. It does not know the CSV they emailed over with the API schema. It does not know that a missing column is a blocker for your semantic model. You know all of that. The question is whether your agent can know it without you re-typing it.

A harness that works has four elements. It needs **skills**, so the agent knows how to do the work correctly instead of guessing at what a semantic model is. It needs **agents** with intentional, defined roles, not one chatbot asked to do everything. It needs **organized context**, not a pile of notes. And it needs the **ability to talk to other tooling**, because no single environment does all of this well. Those four wheels make up the car. Miss one and you are pushing it uphill.

Here is the whole thing on one page. The left loop organizes your business context around a project hub. That context gets distilled into an instructions page in the middle, which the right loop executes over MCP against Power BI and Fabric. Results loop back to the left. Two harnesses, one continuous cycle.

![Two-harness workflow: an organizing second brain on the left connected through a central instructions page to an execution harness on the right that produces a Power BI dashboard, with a dotted return arc feeding results back](/images/2026/07/stop-re-prompting-banner.png)

## Give Context a Home

The first harness is the second brain. For me that is Notion; the tool matters less than the structure. What matters is that every project has a set area where its context lives, and that the relationships between pieces of context are explicit.

In my setup, the **project is the hub**. Everything hangs off it through relations: the meetings database, the milestones, a resources index with the data diagrams, the statement of work, the reference PDFs, the metrics definitions someone handed me in week one. The system understands that this meeting belongs to this project, that this resource sits under that index, that this milestone blocks that deliverable. That relational structure is the whole point. It is what lets an agent reason about a project instead of just searching it.

![A project hub at the center with explicit relations radiating out to meetings, a statement of work, a resources index, milestones, a data model, and defined agents](/images/2026/07/stop-re-prompting-context-hub.png)

On top of that hub sit agents I was very intentional about. Not one general assistant. Three, with jobs. One is my consultant's consultant: it knows Fabric, knows my consulting practice, knows previous projects, and helps me plan next steps off of any status update. One runs operations: it organizes pages, keeps statuses current, and flags blockers, like when a meeting reveals a column we need does not exist. One handles status updates. They talk to each other, because I instructed them to. The best mental model I have is a department. The second brain is a team I have conversations with, not a form I fill out.

And skills close the loop. I did not want a generic model inventing what a semantic model build looks like. Microsoft already published skills for Fabric, so I converted them into skills my second brain agents can use. Now the agent that plans my work knows the same rules as the agent that will execute it.

## The Instructions Page Is the Handoff

Here is where most setups stop, and where the interesting part actually starts. A second brain that only updates itself is a diary. The value shows up when it starts writing for another harness.

For every project, I have the second brain generate a **Claude instructions page**. Not a paragraph. A long, structured document, built by agents that have read every meeting note, every resource, every status. It states what we are building, which measures to create, what the known blockers are, what to check before starting, which MCP servers to use, and, critically, what to report back when the work is done. The business context from months of meetings gets distilled into an operational brief.

This is the handoff between the two harnesses, and it runs in both directions. The organizing harness writes instructions for the executing harness. The executing harness sends its results back to the organizing harness. Back and forth, every cycle. Neither side is the whole system; the conversation between them is the system.

![The organizing loop and the execution loop linked by a central instructions page, with one arrow carrying instructions out and a dotted arrow carrying results back](/images/2026/07/stop-re-prompting-handoff.png)

## Execution: MCP Against Power BI and Fabric

The second harness is where work actually happens: Claude Desktop, or Claude Code, or an IDE like Cursor or VS Code. I open a session and say one thing: read the Claude instructions for this project's semantic model work, and start there.

The agent pulls the instructions page over the Notion MCP server. It sees where we left off, because the last session's recap is in the page. Then it goes to work over the **Fabric MCP**: creating and validating notebooks, building out the semantic model, editing measures, checking the model against the blockers the instructions warned about. I am not pasting context into the chat. I am not re-explaining the project. The instructions already told the agent which tools to use and what done looks like. I do not have to touch fabric.com for most of it.

![An IDE and an agent chat window on the left routing through a central MCP connector node into Power BI outputs on the right: a bar chart, a gauge, and a data table](/images/2026/07/stop-re-prompting-mcp-powerbi.png)

MCP is the bridge that makes this real. Fabric is becoming a backend you talk to through APIs and MCP servers, and that is a good thing. I do not need my data platform to also be my note-taking app. I need it to expose the right hooks so my harnesses can reach it.

One concrete example. A discovery phase handed me somewhere north of 25 API calls to evaluate against an existing model, different endpoints, different equipment data, first time seeing any of it. The old me opens Postman and grinds through it. Instead, my agents wrote instructions for Claude's Chrome extension: work through the API calls in Postman, capture each schema, and map how each response relates to the current model. It ran the whole discovery while I did other work. And the purpose of that run was never just the output in Postman. The purpose was the report.

## The Report Files Itself

This is the part people miss, and it is the part I push hardest. Every agent task ends the same way: **update the second brain**. Tell it what you did.

When the execution harness finishes the semantic model edits, the instructions require a recap back to Notion. That recap triggers the operations agent, which flips the deliverable status, which updates the project, which means tomorrow's instructions page already knows the measures exist. The Postman discovery filed its schema findings back into the project the same way. Output without a filed report is work your system never learns from.

That is why the central repository is non-negotiable. I do not care whether it is Notion, a git repo, or an Azure DevOps wiki. Your harness needs one place where context is stored and organized, that both the humans and the agents can read and write. Without it, every agent run starts from zero, and you are back to re-prompting.

## Build This Week

You can stand up a small version of this in a few days. Pick your central repository: Notion, a repo of markdown files, or the ADO wiki if that is where your team lives. Create one project hub and relate your real context to it: meeting notes, the SOW, the data contract, the metric definitions. Define two or three agents with narrow jobs and write down what each one owns. Give them real skills for Fabric and Power BI work instead of letting the model improvise. Then have the system generate one instructions page for one deliverable, open your IDE or Claude Desktop, point the agent at it over MCP, and require a written recap back to the hub when it finishes.

Run that loop once and you will feel the difference immediately. The second run is better than the first, because the system remembered.

**Key takeaway:** stop optimizing the prompt and start building the loop. Give your context a home, let that home write your agent's instructions, execute over MCP, and make the agent file its report back. Do it for one deliverable this week.

The prompt was never the product. The harness is, and English is quickly becoming the interface to the whole thing. If this sparked something, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.