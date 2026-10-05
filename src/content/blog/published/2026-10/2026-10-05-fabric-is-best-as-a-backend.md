---
title: "Fabric Is Best as a Backend"
date: 2026-10-05T09:00:00Z
permalink: "2026/10/05/fabric-is-best-as-a-backend"
description: "Fabric as a Backend passes Steve Jobs' iPad test on the wiring: workspace identity, Git, and 700+ REST APIs Microsoft is building for agents."
featured: /images/2026/10/fabric-is-best-as-a-backend-banner.png
draft: false
tags:
  - microsoft-fabric
  - ai-agents
  - agent-skills
  - mcp
  - governance
  - business-intelligence
source:
  episode: 554
  title: "Fabric as a Backend"
  notion: "https://app.notion.com/p/397e74c69c1880adb1fbf3f072774533"
  youtube: "https://www.youtube.com/watch?v=K6_PwhIoAEU"
  transcript: "transcripts/ep-554.txt"
---

In January 2010, before Steve Jobs showed anyone the iPad, he spent a minute explaining why it probably shouldn't exist. Everybody already owned a laptop and a smartphone. A third device in the middle had to be far better at some key tasks: browsing the web, email, photos, video, music. "Otherwise, it has no reason for being." Then he took a shot at netbooks. Their problem, he said, is that they aren't better at anything.

I've never shaken that line. ([Here's the full keynote](https://www.youtube.com/watch?v=zZtWlSDvb_k) if you've never seen it.) I run that test on every new piece of technology somebody wants me to adopt. Lately I've been running it on an idea I was skeptical of at first: using Microsoft Fabric as the backend for your applications.

My verdict: as a **backend**, the place your apps write to and your agents build against, Fabric passes. And it passes on the wiring. The SQL database gets the headlines, but identity, Git, and the API surface are what earn the pass.

![On the left, five disconnected service tiles (a database, a web page, a key, a gear, a function block) joined by broken dotted lines, flowing right into a single workspace frame that neatly holds a database, a code block, and a bar chart on one connected line](/images/2026/10/fabric-is-best-as-a-backend-banner.png)

## Credit where it's due: FaaB

I didn't name this. My friend [Mike Carlo](https://www.linkedin.com/in/michaelcarlo/) did. He calls it **Fabric as a Backend**, FaaB, and after some debate over pronunciation we settled on "fab." Microsoft doesn't brand it that way yet. Mike has been building on the pattern since January, a little before Microsoft started talking publicly about Rayfin. He has apps in production for customers today that use nothing but Fabric as the backend.

His light-bulb moment was **SQL database in Fabric**. For most of Fabric's life, everything was a lakehouse or a warehouse, built for batch loads and analytics. A SQL database is always on and transactional, so an app can read and write it row by row. Mike wired one to an app he built to track content performance across YouTube, X, and LinkedIn. He budgeted a weekend for it. It took under an hour. Then he put a GraphQL API on top of the database, so the app calls an endpoint instead of holding a connection string.

Microsoft has since turned the pattern into a product. In **Fabric Apps**, built on the Rayfin SDK, you define data models as TypeScript classes. Fabric generates the SQL database schema and the GraphQL endpoints, handles Entra sign-in, and hosts the app. User data functions can run on a schedule now, with no pipeline or notebook needed to trigger them. And the Fabric REST API specs include an item type called `appBackend`, in preview, listed right next to lakehouses and semantic models.

Microsoft is saying it out loud now.

## The iPad rule

When Mike first walked me through his setup, I asked him the Jobs question. What is Fabric as a backend actually **better** at than Azure SQL, Azure Functions, and an App Service? That stack is mature. People have shipped on it for a decade.

I was suspicious at first. It sounded like forcing an analytics platform into an operational job because Power BI is great, so why not build apps on it too. That's the netbook version of FaaB. "It's convenient because you already bought Fabric" isn't better at anything. It's a cheaper laptop.

So I made the question harder. **Can FaaB stand alone?** Take a company running Salesforce and Tableau, with no Power BI, no semantic models, and no notebooks. Would you still recommend Fabric as their application layer? If you wouldn't, FaaB only works for people who are already Fabric customers, and it fails the test.

I've come around to yes. Three things the Azure stack makes you assemble by hand come built in.

![A laptop outline on the left and a phone outline on the right, with a solid filled tablet between them; task icons above connect to the tablet with solid lines and to the laptop and phone with faint dotted lines](/images/2026/10/fabric-is-best-as-a-backend-ipad-test.png)

## Identity, Git, and a separate analytics workspace

Everything here is possible in the Azure portal. You can build functions, host a web app, and stand up a SQL database. You also have to wire them so they authenticate to each other and deploy together. Most people have never done that. The ones who have spend real hours on it every time.

**Workspace identity** is the biggest difference. In Fabric the workspace is the security boundary, the way a resource group is in Azure. A workspace can carry its own identity, and the items inside it can use that identity to authenticate. The app registration route gives you client secrets that expire, a calendar reminder somebody owns, and an outage when that person is on vacation. Fabric handles that for you. Provisioning a workspace identity is a single API call.

Git and deployment pipelines give apps release management with no extra tooling. Most Fabric items sync to Git, and deployment pipelines already exist, so a set of app workspaces gets the same dev, test, and prod promotion path analytics teams use today. `fabric-cicd`, the Python deployment library, is now officially supported by Microsoft too.

Then build a separate analytics workspace that reads the app's data through shortcuts or mirroring. Reports never point at the production database, and you don't need a pipeline to pull data out of a system you own. The app's data is already in OneLake. This is the part a non-BI shop ends up caring about eventually.

It has a quieter benefit, too. A one-time form submission lands in the same place as the rest of the data you trust. If you're going to centralize some of your data in Fabric, you might as well put all of it there so it can all be queried together.

![On the left, a tangle of key and hourglass icons attached by crossing dotted lines; on the right, four item cards inside one workspace frame, each connected by a clean line to a single filled identity node in the center](/images/2026/10/fabric-is-best-as-a-backend-identity.png)

## Fabric was built for agents. Look at the API surface.

This is what sold me, and you won't find it in a keynote.

I went through Microsoft's public Fabric REST API specifications. As of this week they document about **729 operations across 55 spec areas**. The core platform has more than 160 of them: 35 for workspaces, 17 for deployment pipelines, 12 for Git, and 9 for the job scheduler. Every item type has its own spec on top of that, including `sqlDatabase`, `userDataFunction`, `graphQLApi`, `appBackend`, `orgApp`, and `variableLibrary`. Every `appBackend` endpoint accepts service principals and managed identities as well as users.

Nobody is going to click through 729 endpoints, and nobody has to. An agent will make those calls for you, and Microsoft has shipped the tooling to make that work:

- **Fabric CLI** (`fab`) is open source and written in Python. Microsoft's v1.5 release notes say AI agents have become one of the fastest-growing groups using the CLI. The repo ships agent instructions and skills so an assistant writes real commands instead of making up flags.
- **`fabric-cicd`**, the Python deployment library, is officially supported, and the CLI wraps it as a single deploy command.
- **Two Fabric MCP servers.** The remote Core server exposes the public APIs as typed tools. The local open-source server carries the API specs and best practices and works offline.
- **[Skills for Fabric](https://github.com/microsoft/skills-for-fabric)** is Microsoft's open-source skill library for Claude Code, Copilot CLI, Cursor, and similar tools. It includes an experimental agent for app development. Microsoft's own docs say why it exists: AI coding tools have no built-in knowledge of Fabric-specific APIs.
- **Semantic Link Labs** adds hundreds of Python functions over the same items, from the semantic model side.

I've run into that knowledge gap myself. A general coding agent doesn't know Fabric's APIs for authentication or item discovery, so without skills it guesses. Load the skills and it builds the right thing. Microsoft is building a lot of Fabric for agents to use first, and honestly, that's what makes it a backend.

Report building opened up to business users years ago. App building is opening up the same way, through agents. With [Fabric Task Flow Studio](/2026/08/21/fabric-task-flow-studio/), the CLI, and the MCP servers, you describe the infrastructure and an agent stands it up. Can you script an Azure stack? Of course you can. Nobody has packaged six Azure services, one identity model, and a skill library into one surface that agents already know how to read.

![A filled agent node on the left fanning out through dozens of thin lines into a dense grid of small endpoint dots, which converge on the right into a code block, a database, and a dashboard panel](/images/2026/10/fabric-is-best-as-a-backend-api-surface.png)

## Agents aren't for ambiguous one-time queries

Mike has a rule I mostly agree with: don't use agents for things that are already known. Use them on the unknowns, like designing the schema for a new time card app or working out relationships nobody has modeled yet. Once you know the requirements, build deterministic systems and run them on cheap compute.

I'd tighten it. **Agents are for clear, repeatable jobs.** "Show me sales for last month" is a one-time, ambiguous question. Ask it once if you want. Make it the daily job, though, and an agent re-derives the same answer every morning, a little differently each time, and nobody can test it. Ask instead for the report that shows last month's sales by region and product, every month. Give it clear instructions and a clear workflow, and make **code the output**.

Code can be tested and rerun. A report, a user data function, a schema migration, or a notebook runs the same way next Tuesday. People can review it, and a second agent can test what the first one built. The higher that output goes in the organization, the more people look at it, and the more that review matters.

That's why the backend matters for agent work. If the agent's output is code, the code needs somewhere to run with identity, Git, scheduling, and a deployment path. FaaB gives it that. It's the same reason I argued [a data agent should be a sub-agent](/2026/09/23/a-data-agent-should-be-a-sub-agent/), and why I'd rather [build the thing that creates the thing](/2026/09/16/build-the-thing-that-creates-the-thing/).

Here's the brief I hand an agent when the job is standing up a backend. Most of it is about refusing to answer questions and insisting on code.

```markdown
# Agent: Fabric Backend Builder

Trigger: "stand up the backend for this app"

## What this agent is for
Building the backend an app runs on, in Fabric, as code. You emit schemas,
functions, and deployment config. You do not answer data questions. If
someone asks you for last month's numbers, offer to build the thing that
returns them every month instead.

## Read first, every run
| Source                         | Why                                           |
|--------------------------------|-----------------------------------------------|
| App requirements page          | Entities, who writes, who reads, volumes      |
| Workspace plan                 | Which workspaces are app, which are analytics |
| Skills for Fabric: SQL DB, Git | The house patterns                            |
| Verified tenant state          | What exists right now, dated                  |

## What to emit
- One Git-connected workspace per stage: dev, test, prod.
- The SQL database schema as code, with keys and constraints. No portal edits.
- Workspace identity for authentication wherever the path supports it.
- User data functions for scheduled or callable logic, each with a test.
- A separate analytics workspace that reads app data through shortcuts or
  mirroring. Reports never query the production database directly.

## Never
- Never create an app registration or client secret when workspace identity
  covers the path. If it doesn't, say so and name the secret's owner.
- Never hand-edit an item in prod. Change it in Git and promote it.
- Never leave a step as "do this in the portal." If it can't be scripted
  through the API or CLI, report it as a gap.

## Report back
Every item you created, its workspace, how it authenticates, and the test
that proves it works. List anything you could not do through the API.
```

Three lines do most of the work. "Offer to build the thing that returns them every month" turns a one-time question into an artifact before asking becomes a habit. "Name the secret's owner" puts a person on every secret you can't avoid, so an expiring client secret is somebody's job and nobody gets surprised. "Report it as a gap" tells you which parts of the backend still need someone clicking in the portal. You want that list before you call anything production.

![Top row: a chat bubble looping around repeated dotted circles of fading copies of itself; bottom row: a single chat bubble feeding one solid code block that produces a steady row of identical bar charts](/images/2026/10/fabric-is-best-as-a-backend-code-not-answers.png)

## Where I'm still skeptical

My open question is **cost at public scale**. Put a big retailer's customer-facing catalog on FaaB, at thousands of requests a minute, and what happens to your capacity units? I haven't seen that tested, and I wouldn't promise a client a number.

Mike's answer is that developer time is the bigger cost of a backend, and compute is the smaller one. He rebuilt one overbuilt app that was costing a client thousands of dollars a month and got it down to about $50 a month. He also points out that most companies already paying for a Fabric capacity have room left on it, because they pay for compute they don't use all day, and autoscale handles the bursts.

I think we're both right. For internal apps, departmental tools, and anything whose data has to end up in Fabric anyway, I'd pick FaaB today. If the job is a one-shot survey nobody will ever analyze, Microsoft Forms is fine and uses zero CUs. For a high-traffic public app, load-test it before you design around it.

## Run the iPad test on your next app

Before the next app request turns into a new Azure resource group, check it against this list:

- Name the one thing Fabric must do better here. If the only answer is "we already pay for Fabric," you're buying a netbook.
- Ask whether you'd pick this backend if the company had no Power BI at all. If you wouldn't, be honest about why you're picking it.
- List every app registration and client secret the Azure version would need. Each one workspace identity removes is one less outage.
- Connect Git before you create the first table, so dev, test, and prod exist from day one.
- Put analytics in its own workspace, reading through shortcuts or mirroring, with no reports on the production database.
- Install Skills for Fabric and the CLI or an MCP server before you prompt. A generic agent guessing at Fabric's auth will cost you an afternoon.
- Make the agent hand back code. If the deliverable is an answer, send it back.
- Keep it internal until a load test proves the CU math for public traffic.

## Takeaways

- Steve Jobs' rule still applies: a new category has to be better at something, or it has no reason for being. "We already own Fabric" doesn't count.
- FaaB passes on the wiring: workspace identity in place of expiring secrets, Git and deployment pipelines for app releases, and a separate analytics workspace that never touches production.
- Fabric documents roughly 729 REST operations, and the CLI, `fabric-cicd`, two MCP servers, and Skills for Fabric show Microsoft expects agents to be the ones calling them.
- Agents are for clear, repeatable jobs. Ask for the report, the function, or the schema, and make code the output so it can be tested and rerun.
- Cost at public scale is still unproven. Build internal apps today and public ones after a load test.

**Key takeaway:** this week, take one app request from your backlog and write down the single thing Fabric would do better than your usual stack. If you can't name it, build it somewhere else. If you can, hand an agent the brief above and count how many portal clicks it takes to stand up the backend. Ideally zero.

My prediction: within a year, Fabric as a Backend goes from a community nickname to a box on Microsoft's own architecture diagrams, and BI teams will be shipping the apps their reports used to sit downstream of. Mike will tell you he called it. He did. If you're sizing up your first FaaB project, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
