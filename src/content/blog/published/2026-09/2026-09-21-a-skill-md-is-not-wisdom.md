---
title: "A skill.md Is Not Wisdom. So Make the Agent Grill You."
date: 2026-09-21T09:00:00Z
permalink: "2026/09/21/a-skill-md-is-not-wisdom"
description: "Your skill file carries instructions, never the judgment that says this is six hours not two. Matt Pocock's grill-me is how I get the judgment back in."
featured: /images/2026/09/a-skill-md-is-not-wisdom-banner.png
draft: false
tags:
  - agent-skills
  - ai-agents
  - microsoft-fabric
  - prompt-engineering
  - dax
  - business-intelligence
source:
  episode: 528
  title: "Importance of Skills for the Fabric Developer"
  notion: "https://app.notion.com/p/352e74c69c188086966dffb4b6cb866b"
  youtube: "https://www.youtube.com/watch?v=wrMb6tu5Pwg"
  transcript: "transcripts/ep-528.txt"
---

I hand a discovery call transcript to my statement of work skill and a statement of work comes back. Sections in the right order, scope written in our language, deliverables listed, hours against each line. Fast, formatted, confident.

It's also wrong in the two places that decide whether the document is any good. That's not a deliverable. And that's not two hours, that's six.

Nothing broke. The skill did exactly what a skill does. It carried my format, my section order, my vocabulary, my references, and it filled them in. What it can't carry is the years that tell me which line item a client will push back on, which one quietly eats a Thursday, and which one is a conversation somebody mislabeled as a deliverable.

**A `skill.md` holds instructions and context. It does not hold wisdom.** Those are two different objects, and if you can't say out loud which is which, you're going to ship slop with your name on it. I couldn't do my job without skills now. The open question is where your judgment enters the process, because it has to enter somewhere, and hoping it shows up during review isn't a plan.

The one skill I've found that holds that boundary isn't even mine. I'll get to who wrote it.

![A structured document card on the left flowing right along connector lines through a solid human silhouette node that injects into the stream, continuing into a lakehouse cylinder and a bar chart on the right](/images/2026/09/a-skill-md-is-not-wisdom-banner.png)

## Skill Is What You Can Do. Wisdom Is What You Have Watched Break.

The confusion starts on the human side.

A technical skill is a single implementation. I'm writing a DAX measure, in this context, against this model, and I know the functions and I know evaluation context. That took real work to get. It's also narrow. It describes one thing I can do once.

Wisdom is what many years and many models leave behind, and it sounds like this in my head while I'm typing: that's going to cause bloat. If I put a FILTER there, over a dimension that size, we're going to have a conversation about performance in three weeks. And that thing the stakeholder asked for is three measures, not one, and cramming it into one is how the next person inherits something nobody can debug.

Here's the version an agent hands me when I ask for one measure, because I asked for one measure.

```dax
-- One measure, exactly as requested
Active Member Revenue =
CALCULATE (
    SUM ( Sales[Amount] ),
    FILTER (
        Members,
        Members[Status] = "Active"
            && Members[TenureMonths] >= 12
    )
)
```

It returns the right number. It also iterates that member table row by row every time the visual renders, and it buries two business definitions inside a measure nobody will think to open. Here's what I write instead.

```dax
Revenue = SUM ( Sales[Amount] )

Tenured Active Members =
CALCULATE (
    COUNTROWS ( Members ),
    KEEPFILTERS ( Members[Status] = "Active" ),
    KEEPFILTERS ( Members[TenureMonths] >= 12 )
)

Active Member Revenue =
CALCULATE (
    [Revenue],
    KEEPFILTERS ( Members[Status] = "Active" ),
    KEEPFILTERS ( Members[TenureMonths] >= 12 )
)
```

Three measures. Predicates the engine can push down instead of a row-by-row scan. A base measure two other measures reuse. Nothing in the first version is a syntax error, and no amount of DAX documentation in a skill file produces the second version, because the reason for it isn't a DAX fact. It's a memory of a model that got slow.

I've made the [narrower version of this argument before](/2026/08/28/agents-raise-the-floor-and-lower-the-ceiling/): hand a DAX agent to someone who never learned filter context and you make them productive while capping how far they can go. Same idea, pointed at the tooling instead of at the person. The cap lives in what the file can hold.

![A single large DAX code bracket block on the left passing through a small circular node and emerging on the right as three smaller stacked bracket blocks connected by thin lines](/images/2026/09/a-skill-md-is-not-wisdom-measures.png)

## A skill.md Is Instructions. That Is the Whole Job.

When people in our world say "skill" now, they usually mean the file. A `skill.md` plus its resources: instructions, scripts, output formats, references, the things you read first. It's context handed to an agent so the conversation starts further along than zero.

That's valuable and I lean on it hard. My skills are why I can walk into a project and start the same week instead of spending it rebuilding scaffolding. I've written about [governing them like theme files](/2026/07/23/agent-skills-are-the-new-theme-files/) and about [building the thing that generates them](/2026/09/16/build-the-thing-that-creates-the-thing/), and both of those still hold.

Look at what's actually inside one, though. Every line is one of four things. A rule. A format. A pointer to something to read. A script to run. All four are instructions. None of them is the sentence I need most, which is "the number this client quotes in every meeting is the one with the exclusion in it, not the one with the nice name." That sentence isn't procedural. It's a fact about a business that I learned by sitting in the room, and no skill file develops it on its own.

So the file will always be missing the same ingredient, and there are only two ways that goes. Either you supply the judgment on purpose, at a moment you picked, or you supply it accidentally during review, after the agent has already written two thousand confident words on top of the wrong assumption. The second one is where slop comes from: judgment that arrives too late to change anything.

## The Skill I Did Not Write

The skill is **grill-me**, and it's by **Matt Pocock**. If you've written TypeScript in the last five years you already know the name, because he built Total TypeScript. He was on the XState core team, spent time as a developer advocate at Vercel, and now teaches AI engineering full time at [AI Hero](https://www.aihero.dev/). His skills repo is at [github.com/mattpocock/skills](https://github.com/mattpocock/skills), and the repo description tells you what it is: skills for real engineers, straight from his `.agents` directory. Not a demo. The actual working set.

Go get it. It's in Claude Code's official marketplace, so `claude plugins install mattpocock-skills` is the whole install, and `npx skills@latest add mattpocock/skills` drops editable copies into your repo for any other agent. Read the [docs](https://www.aihero.dev/skills) too. They're better than most product documentation I pay for.

Here's what it said the morning I found it, and I remember thinking this is the thing I wanted yesterday while I was writing that statement of work.

```markdown
Interview me relentlessly about every aspect of this plan until we reach a
shared understanding. Walk down each branch of a design tree, resolving
dependencies between decisions one by one. For each question, provide your
recommended answer. Ask the question one at a time. If a question can be
answered by exploring the code base, explore the code base instead.
```

That is the skill. Not four hundred lines with a folder of references. Five sentences, and every one of them is load bearing. **Interview me** puts the agent on the asking side of the table, which is the reversal that does the work. **Design tree** stops it from asking forty flat questions and makes it resolve what depends on what. **Provide your recommended answer** means I'm reacting instead of composing, and reacting is where judgment is fastest. **One at a time** keeps me honest. And **explore the code base instead** separates a useful interview from an interrogation about things the agent could have looked up.

His own stated argument for why any of this matters lines up with everything above: faster code generation makes engineering judgment more valuable, because ambiguous requirements break an agent exactly the way they break a team of humans.

## Then It Got Shorter, and the Short Version Says the Quiet Part

The skill looks different today, and the direction it moved is the argument.

`grill-me` is now one line. The entire body of the file is an instruction to call a shared `grilling` skill, plus a flag that stops the agent from ever invoking it on its own. All the substance moved down into that primitive, which `grill-with-docs` and his triage and mapping skills also call, so the technique lives in exactly one place. The front door got shorter. Sit with that one if your instinct when output disappoints is to add another hundred lines to the file.

The primitive works in **rounds** instead of strictly one question at a time. Each round asks the **frontier**, meaning every decision whose prerequisites are already settled and nothing else. Your answers settle those, the frontier moves outward, and the next round asks what that unblocked. His docs put it at thirteen questions landing in roughly three rounds, and a normal session running forty-plus questions across four. You answer by number. If you prefer the original rhythm, one line in your global instructions file puts it back to one at a time, and a large part of his audience runs it that way.

Then there's the sentence I'd frame.

```markdown
Finding facts is your job, never the user's. When a frontier question needs a
fact from the environment (filesystem, tools, etc.), dispatch a sub-agent to
find it; don't ask the user for anything you could look up yourself. The
decisions are the user's: put each to them and wait.
```

**Facts are the agent's job. Decisions are mine.** That's the instructions and wisdom boundary, written as an instruction, inside the skill. His docs go further and call an agent that answers its own questions a bug in the run rather than a liberal interpretation. Somebody drew the exact line I have been arguing about and then made a machine enforce it.

![A branching tree diagram whose left nodes are solid filled circles and whose rightmost nodes are hollow outlined circles, with a dotted boundary line running vertically between the settled and unsettled nodes](/images/2026/09/a-skill-md-is-not-wisdom-frontier.png)

## How I Use It

Three places, in order of how much they've changed my week.

**Before a statement of work.** This is the one I wanted it for. I paste in the discovery notes and I don't ask for a document. I ask to be grilled. What comes back are the questions I would have answered eventually, in the wrong order, after writing the wrong draft: is this a deliverable or an outcome, who signs off on it, is the source system in scope or are we consuming what they give us, what happens to the timeline if their API pages. Then I write the document, and the document carries no assumptions I never examined.

**Before a Fabric build.** Same move, bigger tree. I've got a project whose entire purpose is getting a client's data into a shape that can serve agentic solutions rather than reports, which isn't a thing a Power BI developer was being asked five years ago. Every piece of that is a decision. Where the landing zone sits. Which layer owns conformance. What the fact grain is. Whether the dimension is slowly changing, and how we know. Whether the semantic model is one model or several. An agent will happily assume all of it. Getting grilled means I say it, in the order the decisions actually depend on each other, before anything gets built. Same instinct as [asking what the agent can see in the tenant](/2026/08/17/dont-let-your-agent-touch-fabric/) before letting it touch anything, moved one step earlier: from what exists to what we decided.

**Out loud.** I'm typing maybe ten percent of the time now. Windows dictation, the microphone in Claude, the microphone in Notion, whichever one I'm in. It lets me think instead of type, and I talk to it the way I talk to a person. No, scratch that, section two, let's revise it. That matters here specifically, because forty questions is a chore to type and a conversation to speak. Especially if you have ADD. The interrogation survives a real work day because answering it costs me almost nothing.

What comes out the other end is the shared understanding, and that's the raw material. His pattern is to hand the same conversation straight into writing the detailed delivery instructions, then into issues, and that carries over cleanly to our work: the grilling session becomes the instructions page a build session runs on, the same handoff I described in [Stop Re-Prompting](/2026/07/20/stop-re-prompting-second-brain-agent-instructions/). Don't start a fresh chat to write the spec. The context you just built by being grilled is the entire value.

## Stack It on Top of Your Fabric Skills

The objection I hear every time I show this is fair. That's great for a code base, but how does it know anything about Fabric?

It doesn't, and it doesn't need to. You can run more than one skill in the same conversation, and I don't think enough people have internalized that. Load Microsoft's first-party [Skills for Fabric](https://github.com/microsoft/skills-for-fabric) bundle, load [Kurt Buhler's agentic development marketplace](https://github.com/data-goblin/power-bi-agentic-development) for the Power BI and semantic model side, load your own house skills for lakehouse layout and naming, and then run the grilling on top of all of it. The grilling supplies the technique. The Fabric skills supply the domain. Neither one is trying to be the other.

That combination is new. Six months ago I couldn't have told you to do this, because the Fabric-specific skills worth loading didn't exist yet in any quantity. Now Microsoft ships a bundle covering Spark and lakehouse, warehouse, KQL, Dataflows, and medallion workflows, Kurt is cutting releases weekly on the Power BI side, and between those and what I've written for notebooks and architecture, there's enough context on the table that the questions coming back at me are about my project instead of about data engineering in general. That's the difference that matters.

One caveat from his docs that saves you an afternoon: `grill-me` does nothing on its own, because it's a one-line wrapper that needs the `grilling` primitive installed alongside it. Install the set. And give this one your best model, since the quality of the questions leans on the model's own sense of how systems break rather than on context you supplied.

![Three separate document cards docked into a single central circular node on the left, with flowing connector lines continuing right into a lakehouse cylinder, an ERD table card, and a dashboard panel](/images/2026/09/a-skill-md-is-not-wisdom-stack.png)

## The Version I Point at a Fabric Project

His docs make one recommendation worth underlining, because it's the opposite of what most of us do. If you have a skill of your own that needs an interview, invoke the grilling primitive from it rather than writing another interview. Don't copy his five sentences into your file and start editing them.

So my Fabric version contains no interview at all. It names the design tree for a Fabric build, states which branches are mine to decide, and hands the technique back to the skill that owns it. It's short for the same reason his is short.

```markdown
---
name: grill-the-fabric-plan
description: Interrogate a Fabric build plan before anything gets created.
disable-model-invocation: true
---

Run a `grilling` session over this Fabric plan. Do not write the plan, do not
create items, and do not open a notebook until I confirm shared understanding.

## Read before the first round
- Any project brief, meeting notes, or statement of work in context
- The house skills already loaded: lakehouse layout, naming, notebook patterns
- The tenant itself, read only: what workspaces, lakehouses, and models exist

## The design tree, roughly in dependency order
1. **Purpose.** Analytical, operational, agentic, or feeding an application.
   Everything downstream changes based on this answer, so settle it first.
2. **Sources and landing.** What lands raw, who owns it upstream, whether we
   ingest or consume what they hand us, and what happens when their API pages.
3. **Layer boundaries.** What each medallion layer is responsible for, and
   which layer owns conformance. Name the layer a given fix belongs in.
4. **Grain.** One row per what, for every fact in scope. Ask it per table.
5. **Keys and history.** Reliable business keys or not. Slowly changing or
   not, and how we would KNOW rather than what we assume.
6. **Semantic model shape.** One model or several, direct lake or import,
   what stays out of it on purpose.
7. **Orchestration.** What triggers what, what is allowed to fail, and who
   finds out when it does.
8. **Definitions and ownership.** Which numbers already have an owner and
   which ones two people in the same meeting used differently.
9. **Capacity and cost.** What this is expected to cost to run, and what we
   would turn off first.

## Rules
- Facts are yours to find. Read the tenant, read the notes, read the skills.
  Never ask me something the environment can answer.
- Decisions are mine. Recommend an answer to every question, then wait.
- Anything about how a report should look or feel is not grillable. Say so and
  move on; we prototype that instead of discussing it.
- When I override your recommendation, note it. Those go into the house skills
  when the session ends.
- End by listing what is still assumed. Silence is not agreement.
```

The load-bearing line is the first one in the rules, and it's his, not mine. An agent that asks me what the fact grain is when the notebook is sitting right there has wasted a question I was going to have to think about.

## The Failure Mode Is You Nodding

Here's the part I'd have missed if I had only skimmed the skill, and it's in his documentation, not mine.

The failure mode is passivity. Answering agreed, agreed, agreed for forty questions and coming out with a plan the agent wrote and you nodded at. It feels productive because it was long. And his test for whether a session was worth running is the one I keep coming back to: **you disagreed with something.** A session with no pushback from you is a session you didn't need.

That's my statement of work moment turned into an acceptance criterion. That's not a deliverable. That's six hours, not two. If a grilling session ends and I never said a version of those sentences, I didn't bring any wisdom to it. I brought availability.

One habit makes this compound. **The answers where you overrode the recommendation are the wisdom, so write them down.** Not in the session, in the skill file afterward. If I correct the same assumption in three sessions, that correction was never judgment. It was context I'd been too lazy to write down, and it belongs in the file where the agent reads it for free next time. Your skill file gets better in exactly one way: by absorbing the overrides. What's left after that, the part you keep having to decide fresh, is the real boundary, and now you know where it sits instead of guessing.

That's also how this stays honest as a review practice. A grilling session in front of the work is cheaper than [a senior reviewing behind it](/2026/09/14/dont-hire-a-senior-to-qa-the-agent/), and the two aren't alternatives. One decides what to build, the other checks what came out. Skip the first and the second becomes the only place your experience ever gets applied, which is the most expensive possible place to apply it.

## Run One This Week

- **Install the set, not the one skill.** Marketplace plugin for Claude Code, `npx skills@latest add mattpocock/skills` for anything else, and make sure the grilling primitive comes with it.
- **Pick something with real money or real weeks attached.** A statement of work you're dreading, a medallion layout you've been arguing about, a model consolidation somebody keeps deferring. Grilling a decision you already made is theater.
- **Start in a fresh conversation, with no plan pre-written.** A grilling session on top of a plan an agent already wrote mostly validates that plan back to you.
- **Load your domain skills first, then invoke the grilling.** Fabric skills, notebook and architecture skills, your naming and lakehouse conventions. The technique is domain-blind on purpose.
- **Answer by number and disagree at least twice.** If you reach the end having agreed with everything, stop and ask what you failed to bring.
- **Notice the ungrillable questions.** How the page should feel, one long form or three, isn't settled by talking. Build the throwaway version, look at it, come back and answer in a line. Talking your way around those is how a session balloons to two hundred questions.
- **Speak it.** Dictation turns a forty question interview from a chore into a conversation, and it's the only reason this fits in a working day.
- **Harvest the overrides.** Every place you corrected the recommendation goes into the skill file the same afternoon. That's the loop.
- **Then hand the same conversation forward.** Turn the shared understanding into the delivery instructions and the issues. Don't start over in a clean window.

## Takeaways

- A technical skill is one implementation done once. Wisdom is the years that tell you this will bloat, that FILTER will not survive a model this size, and that is three measures not one. A file can hold the first. It has never held the second.
- Everything in a `skill.md` is a rule, a format, a pointer, or a script. All four are instructions, and all four leave out the ingredient that makes output correct instead of plausible.
- Slop is a timing problem. Judgment that arrives during review arrives after the agent has built confidently on the wrong assumption.
- Credit where it's due: grill-me is Matt Pocock's, it lives at [github.com/mattpocock/skills](https://github.com/mattpocock/skills), and it's five sentences that outperform most four hundred line skill files I've read.
- The good skills get shorter. `grill-me` is now a one-line front door over a shared grilling primitive, and the technique lives in one place instead of being reinvented per skill.
- Facts are the agent's job and decisions are yours. That line is in the skill itself, which makes it the cleanest statement of this boundary I've seen anywhere.
- Skills stack. Grilling supplies the technique, your Fabric skills supply the domain, and running them in one conversation is what makes the questions about your project instead of about data engineering in general.
- A session where you never disagreed is a session you didn't need. Write every override back into the skill file, and what's left is your actual boundary.

**Key takeaway:** this week, take the next Fabric build or statement of work you're dreading, load your Fabric skills, and open with "grill me" instead of with what you want built. Then write every answer where you overrode the recommendation into the skill file, because that's the wisdom the file was missing.

My prediction: the skills that survive the next year are the ones that ask questions, and they'll keep getting shorter while the files that try to encode your judgment keep getting longer and staying wrong. If you're a serious Fabric developer, you should have played with this by now. And if I ever sit across from someone who tells me they're a Fabric developer who loves AI, I'm going to ask to see the repo. No skills in it and I'm not going to believe you. Keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
