---
title: "AI Made Your Center of Excellence Bigger. Did It Get Better?"
date: 2026-08-24T09:00:00Z
permalink: "2026/08/24/ai-coe-better-not-bigger"
description: "AI can flood your Power BI Center of Excellence with content overnight. Here's the maturity ladder for making it measurably better, not just bigger."
featured: /images/2026/08/ai-coe-better-not-bigger-banner.png
tags:
  - ai-agents
  - agent-skills
  - adoption
  - mcp
  - microsoft-fabric
  - semantic-models
  - governance
source:
  episode: 529
  title: "AI Driving Your CoE"
  notion: "https://app.notion.com/p/353e74c69c18807fb7d6ddfaa3124948"
---

Ask a leadership team how they plan to make their Center of Excellence better this year and watch the room go quiet. It's not a question anyone prepares for, because almost nobody asks it. In most organizations I work with, the honest position on the CoE is this: we're happy we have one at all, even if it's not perfect.

I get why. A Center of Excellence is hard to build and harder to keep up. It demands dedicated time, dedicated resources, and dedicated talent, and it is almost never the urgent thing on anyone's plate. Nobody's quarterly bonus depends on the knowledge center being great. So it limps along, half-maintained, and everyone quietly agrees not to look at it too closely.

Then AI showed up, and suddenly the CoE has a shortcut. An agent can write your documentation, draft your standards, fill your knowledge base, and generate more content in a weekend than your team produced in two years. Tempting, right?

My position: AI can absolutely help your Center of Excellence. That part isn't even a debate worth having. The debate is whether you can prove it made your CoE **better** and not just **bigger**. Those are two very different outcomes, and the second one is the default.

## Content Is Not Impact

Just because AI is creating content does not mean it is creating impact.

![A machine on the left producing an oversized pile of documents while a small, lean rising bar chart stands apart on the right, illustrating the difference between generating content and generating impact](/images/2026/08/ai-coe-better-not-bigger-content.png)

An agent will happily generate every document you ask for. Standards, onboarding guides, glossaries, process docs, all of it, endlessly. And if you point a single, isolated, generic agent at your CoE and say "build it," that is exactly what you'll get: a lot of fluff and a lot of bloat that has nothing to do with the culture of your business.

Even accurate documentation fails if there's too much of it. Hand a new Power BI user a 40-page model guide and you haven't onboarded them, you've overwhelmed them, and now they're skeptical of the whole library. Agents are very good at complete and very bad at knowing when to stop. Concise is a requirement you have to write down, because your agent will never volunteer it.

So a pile of documents that nobody reads is not a Center of Excellence. It's a landfill with a table of contents. And I'd go further: if the content isn't helpful, you're better off not having it at all. Documentation that means nothing to anyone actively erodes trust in the knowledge center, because the one time someone opens it and finds generic nonsense, they never come back. Bigger is basically free now, which is exactly why bigger is worth nothing on its own.

## The Cycling Rule: Spend Where the Gains Are

So where DOES the investment pay off? I think about this the way I think about cycling.

When I started riding, I was on an old aluminum bike, and my times were what they were. I knew that if I invested in a real bike, I'd see a genuine, measurable jump. And I did. But now that I'm riding decent equipment, spending the same money again on an even better bike buys me almost nothing. The huge gains live at the bottom of the curve, not the top.

Your Center of Excellence works the same way. If your CoE is at the bare first step, barely stood up, thin on documentation, no real project management around it, then agentic solutions are the carbon fiber upgrade. You will see the impact immediately, and you'll see it in two places specifically: the documentation itself, and the project management of the CoE, tracking what exists, what's stale, and what's next. That early-stage investment is where AI earns its keep.

Which also means you have to ask the uncomfortable investment questions before you start. How much is this actually going to cost? And what marginal impact will it make? If the answer is a five-figure agentic platform to shave a rounding error off a CoE that's already functioning, that's not a strategy. That's buying a second carbon bike.

## Leveling Up Means More People, Not More Tech

Here's where I'll plant a flag, because I think most people have this backwards.

When a Fabric developer climbs the AI maturity curve, the climb is technical. More comfort with agents, more MCP servers, more sophisticated harnesses. The higher they go, the deeper the tooling gets.

A Center of Excellence does not mature that way. The maturity curve of an agentic CoE is measured in **effectiveness**, and the higher you climb, the MORE human it gets, not less. More governance. More culture. More input from actual people across the organization. The technology stays roughly the same; the ingredients change.

![Multiple department nodes, represented as document and folder cards, feeding along flowing connector lines into one central agent node that produces a single focused output document](/images/2026/08/ai-coe-better-not-bigger-culture.png)

Practically, that looks like building skills for your agent out of the business itself. Go to operations: we want your process in the CoE, hand us the SharePoint page or the Confluence space where your team actually works, and we'll build a skill from it. Go to sales: walk us through what an opportunity is, give us your definitions, and we'll feed that in. Your agent cannot invent this. An AI alone will never understand your business, your people, or your lingo, and BI teams are isolated enough already. If the only input is a BI person typing "write a description of our process" into a chat window, the output is generic by definition.

And generic content cannot build culture. A culture, any culture, is a common language and common places. I know good Italian culture when I see it because everyone knows where the good pizza places are and everyone speaks the same lingo. A data culture is no different: shared definitions, shared vocabulary, shared places people trust. If your CoE is full of general content that could have been written for any company on earth, people will not rely on it. I don't care who wrote it, human or agent. General doesn't get trusted.

## There Are Levels to This

The Fabric adoption roadmap gives maturity levels for governance, mentoring, content delivery, all of it. Applying AI to your Center of Excellence deserves the same treatment, because "we're using AI in our CoE" means absolutely nothing on its own. Nobody should be allowed to say that sentence in a status meeting. Here's how I break down the levels.

![An ascending staircase of levels moving left to right, starting from a single chat bubble node and building up to an interconnected network of people nodes and an agent working together](/images/2026/08/ai-coe-better-not-bigger-levels.png)

### Level One: The Mechanical Layer

Connect an agent to your semantic models through an MCP server and put it to work on the boring stuff: does every column have a description, does every measure have a description, can you trace lineage from the gold layer through the model into the report. This is the baseline for a reason. It's a general staple you can apply to ANY semantic model in any organization, it's slow and miserable to do by hand, and an agent chews through it without complaint. If you do nothing else, do this.

The reason level one still goes wrong is that people run it as a prompt instead of a brief. Here's the shape I'd actually give it, and notice how much of it is restraint rather than instruction.

```markdown
# Agent Instructions: Semantic Model Documentation Sweep

You are a documentation agent for the Center of Excellence. Work
over the Power BI modeling MCP server, one semantic model at a
time. Your output is read by report authors, not by the BI team.

## 🚨 #1 Priority (only focus until shipped)
The Finance Reporting model. Every column and measure gets a
description, every measure gets a lineage note. Do NOT start
another model until this one passes the checks below.

## Hard rules
- Never invent business meaning. If you cannot trace what a column
  means, write `UNKNOWN - needs owner review` and add it to the
  open questions list.
- One or two sentences per description. If it takes a paragraph,
  the model is the problem, not the description.
- Use the vocabulary in the department skills, not your own. If the
  business calls it an opportunity, do not call it a deal.
- Anything you judge deprecated stays in the model. You propose,
  a human deletes.

## Read before starting
| Source                 | What to look for                    |
| Department skills      | approved names, definitions, owners |
| Gold layer table docs  | source column, grain, refresh       |
| Existing model docs     | what was reviewed, and when        |

## Lineage note format (every measure)
report field -> measure -> column(s) -> gold table -> source system

## Report back (required)
Post a recap: models touched, descriptions written, items marked
UNKNOWN with the owner each one needs, and what's left. A sweep
without a recap is not done.
```

That `UNKNOWN - needs owner review` line does more for your CoE than the descriptions do. An agent guessing at what `CUST_STAT_CD` means is how wrong guidance gets published with your team's name on it. An agent producing a list of 30 columns nobody in the building can explain is a governance finding, and it's the most useful thing you'll get out of week one.

### Level Two: Build Your Own Agent

Level one is where most teams stop, and writing descriptions while scooting around your tenant is a foundation for something, not the something. A Center of Excellence is impactful because it knows the business and knows the culture. A generic chatbot will never do that.

So level two is where you stop borrowing someone else's agent and build your own. I've started calling it the CA, the custom agent: a harness with your standards, your vocabulary, and your business context loaded in. The tooling barely changes from level one. What changes is what the agent is allowed to know.

The unit of work at this level is a **department skill**, and it's the artifact I'd fight for hardest. One per business function, sourced from that function, owned by a name.

```markdown
# Skill: Operations Vocabulary and Process

Use this skill for any CoE content that touches operations. It
comes from the operations team, not from BI.

## Owner
Dana R., Operations Manager. Reviewed quarterly.

## Source material (read these, don't summarize from memory)
- Operations SharePoint: work order intake, escalation paths
- The Confluence space the team actually keeps current
- The two spreadsheets they run the Monday meeting from

## Words this team uses
| They say        | It means                              | Never call it |
| Work order      | Committed job with a scheduled crew   | Ticket, task  |
| Open            | Scheduled, not yet dispatched         | Pending       |
| Closed complete | Signed off by the site supervisor     | Done          |

## Process, in their words
1. Intake arrives by phone or the portal, never by email.
2. A job is not a work order until a crew is assigned.
3. Month end closes on the second business day, not the last day.

## Never invent
- Any threshold, SLA, or approval step not written above.
- Any metric definition. If it isn't here, ask the owner and add
  it to this file before you use it.
```

The "Never call it" column is the part that surprises people. That's not pedantry, that's culture encoded as a file. When a CoE page calls a work order a ticket, operations reads one sentence and decides the page was written by someone who doesn't work here. Every field in that skill exists to prevent a specific flavor of generic.

### Level Three: Agents Inside the Daily Loop

Level three stops being about documents. Look at what your CoE team actually does all week (fielding questions, running intake, turning requirements conversations into model changes) and split those tasks deliberately between people and agents.

That split is the whole skill at this level:

| Work | Who does it |
|---|---|
| Sitting with the business and asking the awkward follow-up | Person |
| Summarizing an hour of that conversation into notes | Agent |
| Deciding which of those notes becomes a measure | Person |
| Writing the measure description and the lineage note | Agent |
| Telling a department its definition contradicts finance's | Person |
| Finding the contradiction in the first place | Agent |

Agents are genuinely good at reasoning across a long, messy conversation and telling you what was said. They are not good at deciding what it means for your model. Take the notes, turn them into requirements, push the requirements into the semantic model, and keep a person in the middle of that chain making the calls. I walked through that exact loop in [design the report from the meeting you already had](/2026/08/19/design-the-report-from-the-meeting-you-already-had/).

One rule for this level: the agent gets access to where the business already writes things down, or it can't play. Teams meetings, the SharePoint sites, the intake mailbox, the DevOps backlog. An agent with no reach into your actual work is a very expensive autocomplete.

### Level Four: The Business Signs Its Own Pages

The top of the ladder is not a better model or a bigger harness. It's the point where every page in your knowledge center has a business name on it, and that name isn't yours. Governance shows up here, culture shows up here, and the technology looks almost identical to level two. What changed is who is accountable for the words.

Accountability is easy to say and hard to enforce, so give it a mechanic.

## Get Them to Sign It

Every summer I write a contract with my kids. Daily projects, summer projects, what happens before they get to play, and what they earn if they exceed it. I borrowed the idea from a story about Derek Jeter's parents, and it works for a reason that has nothing to do with the chores.

I don't hand them the contract and walk away. I give it to them for a day and tell them to write down what they want revised, what they disagree with, what they want added. I have the final say, and I'm genuinely open to negotiation. Then we both sign it and we both keep a copy. Because once you sign it, you own it.

![One drafted document on the left becoming two identical signed copies on the right, with a dotted revision loop running back from the signed copy to the original draft](/images/2026/08/ai-coe-better-not-bigger-signoff.png)

That's the missing step in every AI-generated knowledge center I've seen. An agent drafts the operations page, the BI team publishes it, and operations was never in the room. Nobody signed anything, so nobody owns it, so when it's wrong it's the BI team's fault and when it's stale it's nobody's problem.

So make the signature structural. Every CoE page ends with a block like this, and no page publishes without one:

```markdown
<!-- Ownership block. No block, no publish. -->

## Ownership
| Field               | Value                                    |
| Business owner      | Dana R., Operations                      |
| Drafted by          | Documentation agent, 2026-08-04          |
| Built from          | Operations skill, work order intake docs |
| Reviewed and signed | Dana R., 2026-08-11                      |
| Revisions requested | 3, all accepted (see history)            |
| Next review         | 2026-11-11                               |

If anything on this page is wrong, it's Dana's page to fix. Send
corrections to her, not to the BI team.
```

The "revisions requested" row is the one I care about. Zero revisions means nobody read it. Three revisions means a human with actual knowledge of the process pushed back on a machine's first draft, and the page is now better than either party would have produced alone. That's the whole game at level four, and it's why the ladder gets more human as it climbs.

## Somebody Has to Delete Things

We already know how this movie ends, because we've all lived it with reports. Easy to create, easy to update, and nobody ever deletes one. Ten years later the workspace is a graveyard and everyone is afraid to touch anything in case someone somewhere still opens it.

Agentic content generation puts that problem on a much faster clock. You can produce in a weekend what used to take two years, which means you can produce two years of dead weight in a weekend. Some of what you generate this quarter is junk, and you'll have to put a bullet in it.

So build the retirement pass at the same time you build the generation pass. This one runs as a plain prompt against the library:

```markdown
Audit the Center of Excellence library. For every page, return one
row: title, business owner, last edited, last opened, and the
department skill or source document it was built from.

Then sort every page into exactly one bucket, with a one-line reason:
- KEEP: opened in the last 90 days and has a signed owner
- REFRESH: has an owner, but the source material changed since the
  last review
- RETIRE: no owner, no opens in 180 days, or it describes a process
  that no longer exists

Do not delete anything. Output RETIRE as a proposal, and name the
owner I need to confirm with for each one.
```

Notice that "no owner" alone is grounds for retirement. A page nobody signed is a page nobody will defend, and a knowledge center is only trustworthy if the stale stuff leaves.

## Prove Better, Not Bigger

Which brings me back to the question I'd make every team answer before a single agent gets deployed: if we apply AI to our Center of Excellence, how will we prove it got better and not just bigger?

![A dotted running track moving left to right with a starting baseline marker and a next milestone flag ahead, with a small gauge showing measured progress](/images/2026/08/ai-coe-better-not-bigger-baseline.png)

You can't answer that without a baseline. You need to know how fast you're running the race today before you can claim you improved the time. That means an honest, introspective look: where is your CoE strong, where is it weak, what are its existing goals? The Fabric adoption roadmap is genuinely useful here, because it hands you the maturity levels to grade yourself against, section by section.

Here's the one place I'll point an agent at the problem before you have any strategy at all, and only because grading is exactly the kind of tedious reading work it's good at:

```markdown
Grade our Center of Excellence against the Fabric adoption roadmap,
one section at a time: content ownership, content delivery scope,
center of excellence, governance, mentoring and user enablement,
community of practice, user support.

For each section return: the maturity level you think we're at, the
evidence you used, the single gap keeping us off the next level, and
whether that gap is a content problem, a process problem, or a
people problem.

Rules:
- Use only what you can find in our tenant and our documentation.
  If there's no evidence, say "no evidence" instead of guessing.
- Do not propose solutions. This pass is the baseline, nothing else.
```

Keep that last rule. The instant an agent starts proposing fixes, you'll start implementing them, and you'll have skipped the only measurement you were ever going to get.

Two gates before you spend a dollar. First, goals that exist independently of AI: tickets resolved faster, users migrated off the legacy system, self-service adoption up. If you don't have a baseline and you don't have goals, don't do AI yet. You won't be able to see anything impactful. You'll make the thing bigger, congratulate yourself, and blow the investment. Second, an executive sponsor who actually backs the CoE. No amount of AI solves a missing sponsor, because that's an internal politics problem, and you've got other fish to fry first. I made the longer version of that argument in [step zero before the Fabric adoption roadmap](/2026/07/27/step-zero-before-the-fabric-adoption-roadmap/).

I keep coming back to something Steve Jobs said: focus is about saying no. Never more relevant than right now. You could throw AI at everything in your Center of Excellence and you would absolutely get results, in the sense that stuff would get produced. Whether any of it matters is a different question. Pick the pain points. Pick the processes that map to your company and your culture. Say no to the rest.

## Where to Start This Quarter

If I were standing up an agentic CoE effort from scratch, here's the order of operations:

1. **Baseline first.** Grade your CoE against the Fabric adoption roadmap, section by section, with the audit prompt above. Write down where you're weak. No fixes yet.
2. **Confirm the goals and the sponsor already exist.** Tickets resolved faster, users migrated, self-service adoption, whatever your CoE was already supposed to achieve, plus a leader who owns it. If either is missing, stop and fix that instead.
3. **Run level one.** Documentation sweep against your weakest semantic model: descriptions, lineage, and an UNKNOWN list. Immediate, visible, cheap.
4. **Build one department skill.** Pick the function that complains most about reporting. Get their real docs, their vocabulary, their process, and a named owner. One skill done properly beats five scraped from a wiki.
5. **Regenerate the same page with the skill loaded.** Put both versions in front of that department. This is your proof that level two is worth funding, and it takes an afternoon.
6. **Add the ownership block and get a signature.** With revisions. Zero revisions means try again.
7. **Split the weekly work.** List what your CoE team does all week and assign each task to a person or an agent, on purpose.
8. **Measure against the baseline.** Same roadmap sections, same KPIs, one quarter later. Better, or just bigger? Now you can actually answer.

## Takeaways

- AI creating content is not AI creating impact. A pile of documents nobody reads is a landfill with a table of contents, and unhelpful documentation is worse than none.
- The gains live at the bottom of the curve. A thin, barely-stood-up CoE gets a carbon fiber upgrade from agents. A functioning one gets a rounding error.
- The developer maturity curve is technical. The CoE maturity curve is effectiveness, and it gets more human as it climbs.
- Level one is the mechanical layer: descriptions and lineage over MCP, with `UNKNOWN` as a first-class output. Level two is your own custom agent, fed by department skills. Level three splits the weekly work between people and agents. Level four is the business signing its own pages.
- The "Never call it" column in a department skill is culture encoded as a file. Generic content doesn't get trusted, no matter who wrote it.
- No ownership block, no publish. Zero revisions requested means nobody read it.
- Build the retirement pass with the generation pass, because you can now produce two years of dead weight in a weekend.
- No baseline, no goals, no executive sponsor? Don't do AI yet. You'll just make it bigger.

My prediction: within a couple of years every Center of Excellence pitch deck will lead with AI, and most of those CoEs will be enormous and useless, because generating content was the easy 10% and nobody budgeted for the signature at the bottom of the page. The teams that win will be the ones who treated "did it get better?" as a measurable question instead of a vibe. So before you point one more agent at your knowledge center, write down your baseline this week, pick the ONE weakest area, and aim your first agentic investment there. One level up is the whole goal. If you're working through this with your own team, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
