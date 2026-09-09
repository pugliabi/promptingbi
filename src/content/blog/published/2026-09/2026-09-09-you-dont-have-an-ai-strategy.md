---
title: "You Don't Have an AI Strategy. You Have AI Theater."
date: 2026-09-09T09:00:00Z
permalink: "2026/09/09/you-dont-have-an-ai-strategy"
draft: false
description: "AI theater has a personal version, and it's your tool list. The intake test I run on every new skill, MCP server, and harness before it touches client work."
featured: /images/2026/09/you-dont-have-an-ai-strategy-banner.png
tags:
  - ai-agents
  - agent-skills
  - mcp
  - microsoft-fabric
  - power-bi
  - adoption
source:
  episode: 542
  title: "Orgs Slow on AI Adoption"
  notion: "https://app.notion.com/p/53db305e36494a35990f35c5d8e5682c"
  youtube: "https://www.youtube.com/watch?v=8ZJoatBkbAM"
  transcript: "transcripts/ep-542.txt"
---

Try explaining the Copilot situation to a client out loud. There's standalone Copilot. There's Copilot in the reporting layer. There's Copilot in Fabric. Is it the Microsoft 365 one? No. Well, yes, but you need a license. Unless you're using a data agent, and then where do you actually run that?

I've had that conversation more than once and I've watched the client's face while I had it. Microsoft has started consolidating some of it, which I'm genuinely happy about. But the pile existed for a good while, and every single piece of it shipped with an announcement attached.

Microsoft can afford a pile like that. The version worth talking about is the one sitting on your own laptop.

Open your MCP config. Open your skills folder. Count the entries, then write one sentence for each one naming the job it does and the check that proves it did the job. I tried this in July and I couldn't finish the list.

Theater is what you get when a tool arrives before the job does. Companies do it with Copilot licenses and pilot programs. I did it with GitHub.

## I Was the Theater

For a stretch this year my routine was to look at what was trending on GitHub, install it, and try it. Every new skill anybody published, I read and adapted. Anthropic shipped a new capability and I built a custom agent for it, usually inside the same week. I keep a repo specifically for data analysis experiments and vibe coding, and it got a lot of traffic.

Every one of those decisions was defensible on its own. The sum of them cost me something specific.

I had already built the thing I needed. [Two harnesses](/2026/07/20/stop-re-prompting-second-brain-agent-instructions/): my second brain writes the instructions, the agent executes against Power BI and Fabric. I whiteboarded that before I built any of it, and it works. Then I drifted away from it, one interesting new thing at a time. Nothing broke. I just stopped reaching for it.

Count that cost properly. The tokens and the install time came to almost nothing. The expensive part was losing the habit of a workflow I had already proven, and habits take much longer to rebuild than tooling does.

## The Only Question Is What Job It Does

Almost every conversation I have about AI tooling opens on the model. Which one is smartest this month, which IDE wraps it best.

Name the job. An agent working on your Power BI or Fabric project can only be missing four things, so there are only four jobs a tool can hold.

![An agent node at the center connected by four thin lines to a document for knowledge, a plug connector for hands, a linked hub card for memory, and a magnifying glass with a check mark for eyes](/images/2026/09/you-dont-have-an-ai-strategy-four-gaps.png)

**Knowledge** is a skill. Packaged expertise the agent loads so it stops improvising. I converted Microsoft's Fabric skills into skills my hub can use, because I was not going to let a generic model guess at how semantic model objects get built on a client's tenant.

**Hands** is an MCP server. `create table` becomes a tool with defined inputs instead of the agent writing TMDL from memory. The Fabric MCP and the Power BI Modeling MCP are the two I would fight to keep.

**Memory** is the harness. Context that survives the chat window: instruction pages, the project hub, the write-back at the end of a session.

**Eyes** is verification. The Desktop Bridge reloads a report and takes a screenshot of the page. A DAX query returns a row count you compare against a number you knew in advance.

Run your own stack through those four and the duplicates show up fast. Two MCP servers with hands on the same model is one MCP server plus a tax on every prompt. Three note systems is zero memory, because context split three ways is context you'll end up re-providing by hand.

There's a test underneath the four that decides whether a tool should exist at all, and I've been calling it the **creator agent**. Point AI at uncertainty: the thing you haven't done before, the API you've never seen, the discovery work. Once the behavior is known, capture it in deterministic code. A script, a command, a validated report.

That's what a new tool is for. It converts an unknown into a known, once. If you're paying an agent to answer the same question every Tuesday, you're renting an answer you already own, and Microsoft will sell you that all day long.

## Two Lanes

None of this means stop trying new things. I try new things constantly. I run two lanes, and the admission standards are nothing alike.

![A wandering dotted upper path with several dead-end branches ending in a loose sketch, above a single straight lower path passing through one gate marker into a dashboard with a bar chart](/images/2026/09/you-dont-have-an-ai-strategy-two-lanes.png)

The **weekend lane** is side projects, vibe coding, that experiments repo. The admission standard is whether it looks interesting. That's the entire standard. Failure is free there, and it's the only place you learn what a tool is actually for, because reading the launch post tells you what the vendor wants you to think it does.

The **client lane** is Fabric and Power BI work with somebody's name on the invoice. Admission runs through a test, and I'll give you the whole thing further down.

Tools do graduate between the two. The remote Fabric MCP is my clearest example. I was skeptical of it for a while and left it in the weekend lane on purpose. What moved it across was pairing it with the Fabric skills and my own instruction pages, and then opening with a question instead of a task: what do you see, and what can you do? Once it answered that honestly, it earned real work.

Promotion happens at the intake test, and nowhere else.

The failure I actually see, including in my own July, is running one policy across both lanes. Weekend rules on a client model is how you end up with an agent roaming a production workspace. Client rules on your weekend is how you learn nothing all year.

## Microsoft Already Published the Answer for Power BI

If you want to see a real tool strategy written down, read the [Power BI MCP and agentic docs](https://learn.microsoft.com/en-us/power-bi/developer/mcp/mcp-servers-overview). Microsoft assigned one tool per layer, and that table is the most useful thing in the entire stack.

![Four stacked layer bands, each holding one icon and exactly one tool node: linked table cards, a report page, code brackets, and a camera aperture](/images/2026/09/you-dont-have-an-ai-strategy-layers.png)

| Layer | Tool | Job |
|---|---|---|
| Semantic model: tables, columns, measures, DAX | Power BI Modeling MCP server | create and update the model |
| Data queries and insights | remote Power BI MCP server | generate and run DAX |
| Report layer (PBIR / PBIP files) | Power BI Report Authoring skill | pages, visuals, filters, formatting, themes |
| Live verification | Power BI Desktop CLI (Desktop Bridge) | open, reload, status, screenshot |
| Greenfield planning and design | Report Planner and Report Design skills | requirements, archetypes, layout, color |

One layer, one tool, one job. The [Desktop Bridge](https://learn.microsoft.com/en-us/power-bi/developer/agentic/power-bi-desktop-bridge-overview) authors nothing at all; it reloads and takes a picture, which makes it eyes and only eyes. The Modeling MCP never designs a page. Nothing on that list overlaps with anything else on it, which is precisely why it works.

Now watch what people do with it. They install all five, then ask which one they're supposed to use. The docs answered that before anybody asked.

Order matters as much as the list does. Someone who has been asking a chatbot for a rolling 12-month measure does not need VS Code, PBIP, and an introduction to TMDL handed to them on the same afternoon. That's four new things to learn before the first win, and it breaks the motion they already had. Right tools, wrong sequence, and they quit.

## Specify, Bound, Validate

A tool with no verification path stays a weekend tool permanently. I'd rather say that plainly than pretend a demo counts as evidence.

Three words carry my whole approach here.

**Specify.** The more you put in up front, the better the requirements get. My Fabric instruction pages aren't a page. They scroll, and they reference other pages. I won't run a Fabric project without them.

**Bound.** Don't let an agent roam freely across your workspace. Scope it to the items it needs and nothing past that.

**Validate.** Ruthlessly, and never by reading. Reading an agent's output tells you the output is plausible, which is a different fact from the output being right. Validate by integrating the data.

I've gotten pushy with clients about handing over a starter kit of data, and this is the reason. I want known values in hand BEFORE anything runs. Country has seven values. Order status has four. Then the agent runs, and when it comes back holding nine countries I stop it right there: the spec says seven, you found nine, we pause before we go any further. Two seconds of checking catches a whole class of silent join problems.

Better than remembering to check is writing the check into the instruction:

```text
This is the table we're starting with. After the join, the row count
should be identical. Make a test for this and report the before and
after counts.

Known values for testing:
  country       = 7 distinct
  order_status  = 4 distinct

If any count disagrees, stop and report. Do not continue the build.
```

On the report side the equivalent is the [reload and screenshot loop](/2026/08/19/design-the-report-from-the-meeting-you-already-had/), because an agent that can only write files to disk will cheerfully tell you it built the page. "The agent said it built it" and "the agent built it" are two different claims, and only one of them has a PNG attached. For anything touching a tenant, the [read-only survey](/2026/08/17/dont-let-your-agent-touch-fabric/) comes first.

## The Intake Test

Five questions. Nothing gets near client work until I can answer all five.

1. **Which gap does it fill?** Knowledge, hands, memory, or eyes. If the honest answer is "it looks cool," it goes to the weekend lane.
2. **What does it displace?** Naming the thing it replaces is the only proof you made a choice. Displacing nothing means you're accumulating.
3. **What's the check?** The specific artifact that proves it worked. A row count, a screenshot, a validate command that exits clean.
4. **Which lane?** Write it down. The honest answer is usually weekend and the tempting answer is always client.
5. **What's the removal trigger?** Decide on the way in what would make you uninstall it. Unused for 30 days. Failed its check twice. No trigger and it lives forever.

Two habits do most of the remaining work. The first is to interrogate a tool before trusting it. My opening message is a question, not a task: what do you see, and what can you do? A tool that can't describe its own surface honestly has no business touching a model.

The second is a two-shot limit. If I don't get what I want out of an agent in one or two shots, I kill the session and start a fresh one. The tool is almost never the problem; my instructions were, and grinding forward just burns context and tokens against a bad setup. I'll ask Claude to write the prompt for the new window before I close the old one.

Then once a quarter, walk the list and cut. Anything you can't write a one-sentence job for comes out. Doing exactly this got me back the two-harness workflow I had designed and stopped using, which was worth more than anything I removed.

## Takeaways

- Theater has a personal version, and it's a tool that arrived before the job did. Organizations do it with licenses and pilots; practitioners do it with trending repos.
- Four gaps, and every tool fills one: knowledge (skills), hands (MCP servers), memory (the harness), eyes (verification). Two tools in one slot is duplication with a running cost.
- A tool earns its place by turning an unknown into a known. Once the behavior is known, put it in deterministic code instead of paying an agent to rediscover it weekly.
- Run two lanes with different doors. Chase everything you want in the weekend lane. Nothing reaches client work without passing the intake test.
- Microsoft already assigned one tool per Power BI layer. Read that table before you install all five and then ask which to use.
- Specify, bound, validate. Never validate by reading; validate by integrating the data, and write the test into the instruction so running it isn't optional.
- Give every tool a removal trigger on the way in, and hold a quarterly cut.

**Key takeaway:** open your MCP config today and write one sentence per entry naming the job it does and the check that proves it. Whatever you can't write a sentence for, uninstall this week.

My prediction: a year or two from now, the people who look strongest at this won't be the ones with the longest tool list. They'll be the ones who can say what each tool is for in a sentence, and who noticed the moment a new one made their existing workflow worse. Tool lists are cheap to grow and expensive to keep. Naming the job is the part that compounds.

If you're auditing your own stack this week, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.

<!--
Meta description: AI theater has a personal version, and it's your tool list. The intake test I run on every new skill, MCP server, and harness before it touches client work.

Topic tags: AI Agents, Agent Skills, MCP, Microsoft Fabric, Power BI, Adoption
-->
