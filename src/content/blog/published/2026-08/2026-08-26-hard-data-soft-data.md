---
title: "Hard Data, Soft Data: The Layer Your AI Agent Is Missing"
date: 2026-08-26T09:00:00Z
permalink: "2026/08/26/hard-data-soft-data"
description: "Your semantic model is only half your data. Why soft data, the decision logs and business context behind your tables, decides if AI agents work."
featured: /images/2026/07/hard-data-soft-data-banner.png
tags:
  - ai-agents
  - semantic-models
  - claude
  - context-engineering
  - governance
  - microsoft-fabric
source:
  episode: 539
  title: "Self Service Analytics with AI"
  notion: "https://app.notion.com/p/376e74c69c18807faf53e555c51e6545"
  youtube: "https://www.youtube.com/watch?v=5DaaW8Mfom4"
  transcript: "transcripts/ep-539.txt"
---

Picture the cleanest semantic model you've ever shipped. Star schema, documented measures, certified, refreshing on schedule. Wire an agent to it and let a business user ask how the Q2 launch did. The agent sums revenue for calendar Q2. At this company, "the Q2 launch" is the nickname for one specific product, the question is really about that product's first ninety days, and the person is asking because there's a board meeting Thursday. The agent answered the question it was handed. It had no way to know the question that was meant.

Nothing in your semantic model can fix that.

We've spent fifteen years getting very good at **hard data**: the relational, tabular, modeled world that lives in Power BI and Fabric. Whether agentic analytics works at your company gets decided by the other kind, what I call **soft data**. The decision logs, the org structure, the roadmaps, the meeting notes, the pile of context that explains what your hard data means. Almost every team skips it, because it never shows up as a deliverable. It became part of the BI estate anyway.

## Two Kinds of Data

**Hard data** is everything we already treat as our job. Fact tables, dimensions, relationships, measures. Modeled, refreshed, secured, living in a semantic model where every column has a place. When someone says "data," this is what BI professionals picture.

**Soft data** is everything else the business runs on. The metric definitions sitting in a SharePoint doc. The org chart. The product roadmap deck. The decision log from the meeting where two teams finally agreed what counts as an active member. The Teams thread explaining why the west region numbers look weird for March. None of it is tabular, none of it is in your model, and all of it is still data.

![Structured table cards on one path and documents, chat threads, and org chart nodes on another, both feeding a single node that produces one dashboard answer](/images/2026/07/hard-data-soft-data-two-streams.png)

Think about a restaurant. The menu is hard data: structured, versioned, every dish with a price, a description, and an allergen note. Then a regular sits down, doesn't open the menu, and says "I'll have the usual." The menu is now useless. What "the usual" means lives with the waiter who has worked that section for three years, along with the fact that this guy never wants the special and always takes the sauce on the side.

A brand new waiter can memorize every item and every price on that menu and still put the wrong plate on the table. He isn't undertrained on the menu. He's never met the guy. Your agent is the new waiter. It's read every table in your model, and it's never sat in one of your meetings.

## Three Ways an Agent Gets It Wrong

When an analytics agent returns a confidently wrong answer, it's almost always one of three failures, and it helps enormously to name which one you're looking at.

**Ambiguity.** The agent can't map a concept to the right field. "Active members" has four plausible implementations in your model and it picked the one nobody uses. "Revenue" resolves to nine candidate measures with subtly different filters.

**Staleness.** The definition changed, the source system got restated, a table got deprecated, and nothing told the agent. The query is still valid. The answer is quietly wrong.

**Retrieval failure.** The right information genuinely is in your model, properly annotated, and the agent never found it because the search space was too big.

None of that is new, and that's the part that should bother you. Ten years ago I was building Power BI reports for the marketing team, reporting on leads. Sales had a completely different definition of a lead. The whole company stopped what it was doing to work out how it had ended up with three dashboards showing three different numbers for the same word. We did not solve that in 2016, and most companies have not solved it now. Ambiguous concepts, stale data, not being able to find the right thing: same song and dance we've been doing for a decade. The agent didn't introduce these failures. It just stopped being polite about them.

Here's what matters for our purposes: **not one of those three is fixed by better DAX.** Ambiguity gets fixed by writing down which definition wins. Staleness gets fixed by owning documents and reviewing them. Retrieval failure gets fixed by curating a small set of pages instead of pointing a search at everything. All three are soft data problems wearing a hard data costume, which is exactly why they survive so long inside teams that are genuinely excellent at modeling.

![Three diverging dotted paths from a question node, each ending in a broken connection, with a single curated document node redirecting all three back into one clean dashboard answer](/images/2026/07/hard-data-soft-data-failure-modes.png)

## What the User Asked vs. What They Meant

Anthropic published a piece on how they run self-service analytics internally with Claude. Their data team now automates roughly 95% of business analytics queries at about 95% aggregate accuracy, which is a genuinely serious number, and the interesting part is the ranked list of what got them there.

They describe four layers: data foundations, sources of truth, skills, and validation. Inside sources of truth sits the semantic layer, lineage, the query corpus, and last, business context. Their words on that final one stopped me cold. Business context is "the layer most teams skip, and the one we underrated the longest." An agent that doesn't understand your business answers what the user asked, not what they meant. It won't know that "the Q2 launch" is a product. It won't know that two teams define the same term differently. It won't know that Thursday's board meeting is the reason the question exists at all.

So they piped in a company knowledge graph: indexed docs, roadmaps, decision logs, and their organizational structure.

Documentation, roadmaps, decision logs, org structure. Not one item on that list is a table. The most agent-forward company on the planet went looking for what makes analytics answers trustworthy and came back with a corpus of soft data.

![Documents, an org chart, and a decision log feeding a central knowledge hub, which passes to an agent that resolves an ambiguous question into one dashboard answer](/images/2026/07/hard-data-soft-data-context-graph.png)

The number attached to this is the part I'd put on a slide. Without skills, which in their setup are folders of markdown holding procedural business knowledge, Claude's accuracy on their own evaluations never got above 21%. With them, consistently above 95%, and around 99% in some domains. Same models. Same warehouse. Same data foundations. The entire jump came from writing down what a senior analyst knows.

Most organizations already have this information. It's scattered across SharePoint, Teams, someone's OneDrive, and the heads of four senior people. It exists. It's not curated, not owned, and not reachable by anything, human or agent, at the moment a question gets asked.

## The Result That Should Change Your Instinct

Now for the finding that I think is the most useful thing in that entire write-up, and the one nobody is quoting.

They had a query corpus: thousands of historical SQL queries from dashboards, notebooks, and prior analyses. A record of every question the company had already answered correctly. Intuitively that should be the richest soft data asset in the building. Give the agent retrieval access to all of it and watch accuracy climb.

It moved accuracy by **less than one point.**

Read that again, because it's the whole argument. Unstructured retrieval over a big pile of true, relevant, correct material did essentially nothing. What worked was distilling that corpus down into structured per-domain reference docs. Their conclusion: treat query history as raw material for curation, not as a source of truth the agent reads directly.

This is the empirical answer to the plan every organization reaches for first, which is "point the AI at SharePoint and let it figure it out." I've sat in the meeting where that gets proposed as the entire soft data strategy. It's an appealing idea because it requires nobody to make a decision about anything. It also does not work, and now there's a number on it.

Volume is not the asset. **Curation is the asset.** And curation is OUR job.

Think about what we have for the other side. If you're going to build a SQL database for a company, there are books. There's a best practice guide, there's a shape everyone agrees on, there are fifteen years of arguments about normalization that got settled. For soft data we have nothing like that. What an agent needs is a shelf of information organized well enough that it can go "someone is asking about this, I'll open drawer two, take the context I need, and act on it." Almost nobody has the shelf. Everybody has a pile.

## Why Nobody Builds This Layer

So why does everyone skip it? Because it's invisible. Nobody gets promoted for a decision log. You can demo a dashboard; you cannot demo a well-maintained glossary. Soft data work doesn't generate revenue on its own, it isn't a deliverable you can hold up in a steering committee, and you don't see the flowers from doing it. It loses the prioritization fight every single quarter. I get it. I've watched it happen at client after client. **It's not important until it's the most important thing.**

There's a harder version of the question too, and it's the one that actually matters: how do you incorporate the CULTURE of a business into an agent? Think about what culture even is. It's a common language and a common place. There's a lingo, everybody uses the same words, and I know where the good pizza is. That's not a metaphor for your company, that IS your company, and none of it is written down either. That's not a data engineering problem, and there's no connector for it.

I've also been beating this drum for years, so I'm going to allow myself a small told-you-so. When automated insights first showed up in Power BI, the feature that scanned a page and surfaced anomalies and trends, I said on day one it would disappoint people. It looked at everything equally. What it needed was the ability to weight, something as dumb as "when somebody asks about revenue or members, lean on the customer table, not the location table." There was no way to say that. No steering, no guidance, no way to tell it which tables mattered for which questions. It had all the hard data in the world and none of the soft data, and it produced insights nobody asked for. That's the same gap being described a full generation of technology later. The models got dramatically better and the missing layer stayed missing.

This was never a model problem.

## AI Writes the Docs. Humans Own the Definitions.

The most common failure across every layer of an agentic analytics stack is poor or stale documentation, and we finally have tools that are good at producing documentation. Claude and Copilot will draft table descriptions, summarize a decision thread, and turn a rambling meeting into a clean decision log entry in seconds. I run this on my own project work out of [a single project hub](/2026/07/29/anatomy-of-a-project-hub/), where meeting notes become logged decisions and the agents read those decisions before they touch anything.

So can AI just close the soft data gap by itself? Well, of course it can't. And there's a lovely piece of evidence for that, because Anthropic tried exactly that shortcut and published the result.

They attempted to bootstrap their semantic layer by having an LLM auto-generate metric definitions from raw tables and query logs. What came back was plausible-looking definitions that **encoded the very ambiguities they were trying to eliminate**, and the whole thing scored net-negative on their evaluations against a smaller, human-curated layer. The machine looked at four inconsistent implementations of "active user" and confidently wrote a definition that averaged them into something nobody meant.

Their recommendation lands in one sentence: generate the documentation with Claude, have a human own the definition.

And this is where I'd put a hand up before anybody points an agent at a wiki and lets it run. An agent will happily produce a thousand pages of definitions. Just because it created content does not mean it created impact, and the only question worth asking of the result is whether your context layer [got better or just got bigger](/2026/08/24/ai-coe-better-not-bigger/).

Generation is cheap now. Ownership is the scarce thing. An agent can write a beautiful definition of "active member," and it will be beautifully wrong if nobody accountable signs off on it. The arbitration between two teams who define a term differently, the call on which document is the current one, the sign-off: that stays human. That is the job of [data governance](/2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee/), ownership and accountability over what things mean.

![A loop between a person and an agent: the agent drafts document cards, the person reviews and stamps them, and the approved documents flow into a governed library the agent reads from on the next question](/images/2026/07/hard-data-soft-data-ownership-loop.png)

## Soft Data Rots Faster Than Hard Data

Your fact table gets refreshed nightly by a pipeline. Your metric glossary gets refreshed never, by nobody.

Put a number on that decay: Anthropic watched their offline accuracy fall from about 95% at launch to about 65% over a single month, purely because the docs describing the models went stale while the models kept changing. Thirty points in thirty days, and nothing about the agent changed. A context layer describing the business as it existed eighteen months ago is worse than no context layer at all, because the agent will use it at full confidence.

Their fix is the most directly transferable idea in the whole piece, and it's an engineering fix rather than a policy one. They colocated the context docs in the same repository as the transformation models, so **the pull request that changes a model is the same pull request that updates the doc describing it.** A review hook flags any reporting-model change that doesn't touch a doc. Roughly 90% of their data model PRs now carry a doc change in the same diff.

If you're running Fabric git integration, you already have the container for this. Your TMDL sits in a repo. Put the domain context page next to it, in the same folder as the model it describes, and make "did the context page change?" a line on your PR checklist. Not a quarterly review, not a governance committee agenda item that gets bumped. A checkbox in the workflow that already exists. Staleness is the failure mode, and the only fix that survives contact with a busy quarter is one that lives inside the work.

![Two file cards, a model definition and a context document, bound together by a connector line into a single commit node flowing into a governed library](/images/2026/07/hard-data-soft-data-same-pr.png)

## Write One Page Per Domain

Let's take a project. We'll call it Northside Baseball, an independent league club with a ticketing model in Fabric and an ops team that asks questions in their own private dialect.

The single highest-leverage artifact you can build for that engagement is one page per domain, written for an agent to read. Not a wiki. Not a data dictionary that lists every column. One page, per domain, that answers what a new senior analyst would need to be told on day one.

```markdown
# Ticket Sales: Business Context

## Quick reference
- **Covers:** tickets sold, revenue, and attendance by game and section.
  Not concessions, not merchandise, not sponsorship.
- **Grain:** one row per ticket per game in FactTicketSales.
- **Standard filter:** every count excludes comp tickets unless the
  question is explicitly about comps.

## What people here actually say
| They say         | They mean                        | Resolves to               |
| "the opener"     | first home game of the season    | DimGame, game 1, home     |
| "a sellout"      | paid plus comp >= capacity       | not [Tickets Sold] alone  |
| "walk-up"        | sold at the gate on game day     | gate channel, not "Other" |
| "season holders" | full and half season plans       | excludes flex packs       |

## Decisions this domain runs on
- 2026-04-02: Attendance means scanned, not sold. Marketing reported
  sold for two seasons. Both numbers stay; scanned is the one on the
  dashboard. Approved by the ops director.
- 2026-05-19: The rained-out June 6 game is excluded from all trailing
  averages. The ticketing system kept the sales rows anyway.

## Questions this data cannot answer
- Why a season holder didn't renew. We have the lapse, never the reason.
- Anything before the 2024 season. The migration left it behind.
- Per-person spend across ticketing and concessions. There is no shared
  customer key. Do NOT join on name.

## Owner
Ops director. Reviewed at the end of each season. Last review: 2026-07-22.
```

Four sections carry almost all the weight, and only one of them is about the data.

**What people here actually say** is the section that kills the Q2 launch failure. Nicknames, deprecated product names that still sit in the data as frozen values, the words this company refuses to use. Write with the new names, filter with the old.

**Decisions this domain runs on** is your decision log, scoped to one domain so it stays short enough to be read. Append-only, dated, with a name attached to each entry. Every restated month and every arbitration between two teams lands here.

**Questions this data cannot answer** is the one nobody writes and the one I'd fight for hardest. An agent with no stated boundary will answer anything you ask it. Telling it "we have the lapse, never the reason" converts a confident fabrication into an honest "we don't capture that," which is the single biggest trust win available to you.

**Owner** with a review date, or don't ship the page. A context page nobody owns decays into exactly the confusion you built it to prevent.

Here's the workstream, and every step is doable this quarter.

- **Inventory where meaning lives.** For your highest-traffic domain, list where the definitions, caveats, and tribal knowledge sit today. You can't curate what you haven't located.
- **Write the page above for that one domain.** One domain, done properly, beats six scraped off a wiki.
- **Harvest corrections as source material.** Every time someone tells the agent "no, that's not what we mean by active," that correction is a missing line in the page. Anthropic treats each one as a candidate test case; at minimum, treat it as a bug report against your context.
- **Make the org structure machine-readable.** Who owns which metric, and which team asks which questions. When an agent knows who's asking, it answers better. So do your analysts, by the way.
- **Colocate and gate.** Page lives with the model, PR checklist enforces it, named owner reviews it on a cadence.
- **Point your agents at the curated set, not the wilderness.** Aim them at the small, owned, current corpus you just built, not at all of SharePoint. The ablation already told you how that second version ends.

## Microsoft Is Building the Container. You Still Have to Fill It.

None of this is happening in a vacuum, and the platform is moving toward it faster than most teams have noticed.

Fabric IQ and the ontology artifact are Microsoft's attempt at a foundation for hard AND soft data together: how the organization speaks, how it conceptualizes things, and how all of that relates. Not just what's in SQL, but the PDFs, the decks, the material that never touched our department before. What's notable is where they put it. The ontology sits at the same level as the semantic model in their own tooling tables. If you've spent your career looking at two-dimensional paintings, they just hung a three-dimensional one on the wall.

On the access side, the gap that made all of this theoretical is closing too. For most of this year the honest problem was that I had a pile of capable agents and none of them could reach a single piece of my Microsoft information. No email, no Loop, no SharePoint, zero story. That's changing, and the moment agents can actually read the org's documents is the moment the quality of those documents becomes everyone's problem.

Which brings the same warning back around. A container for soft data is not a soft data strategy. If you pour an unowned, uncurated, undated pile into an ontology, you have built a faster path to a confident wrong answer. Owners and stewards get assigned BEFORE the ingestion, not after somebody makes a headcount decision on a number nobody can defend.

## The Semantic Model Was Never the Whole Model

For years the semantic model has been the heart and soul of what we do, and it still is. The name always promised more than the tables delivered. The semantics of your business were never fully in there. They were in hallway conversations, onboarding decks, and the argument about what counts as a lead. Agents are the first consumer that refuses to work around the gap, so we're finally going to write all of it down.

## Takeaways

- Your agent fails on nicknames, restatements, and disputed definitions long before it fails on DAX. Debug the context, not the measure.
- Name the failure mode before you fix it: ambiguity, staleness, or retrieval. All three are soft data problems.
- Dumping everything at an agent doesn't work. Thousands of correct historical queries moved accuracy less than a point; curated per-domain docs moved it from 21% to over 95%.
- Let AI draft the documentation and make a named human approve it. Auto-generated definitions encode the exact ambiguity you're trying to remove.
- Stale context is worse than none. Thirty points of accuracy disappeared in thirty days when the docs stopped tracking the models.
- Colocate the context page with the model and put it on the PR checklist. Cadences that live outside the work get skipped.
- Write down what your data CANNOT answer. It's the fastest way to stop confident fabrication.

**Key takeaway:** this week, pick your busiest domain and write the four sections above on one page. Nicknames, decisions, limits, owner. That single page will do more for your agent's accuracy than another month of modeling.

Give it a few years and the BI team's estate won't stop at the semantic model. A governed context corpus will sit right next to it, with owners, review cadences, and the same rigor we give a fact table today, maintained by the same team that maintains the tables. Job postings will ask for it. Until that exists at your company, every page you write is one more thing your agent doesn't have to guess about.

If the line between hard data and soft data sparked something, stick around PromptingBI. And if you'd rather hear these arguments happen out loud, the Explicit Measures podcast is where they start.

<!--
Meta description: Your semantic model is only half your data. Why soft data, the decision logs and business context behind your tables, decides if AI agents work.

Topic tags: AI Agents, Semantic Models, Claude, Context Engineering, Governance, Microsoft Fabric
-->
