---
title: "Your Fabric Project Doesn't Need a Better Prompt. It Needs a Harness"
date: 2026-08-20T13:00:00Z
permalink: "2026/08/20/your-fabric-project-needs-a-harness-not-a-better-prompt"
draft: true
description: "The model is fine, and your prompt is probably fine too. What your Fabric project is missing is the harness: skills, agents, organized context, and tools that talk to each other."
---

A few mornings ago, Claude worked through roughly 25 discovery API calls in Postman for one of my Fabric projects while I drank my coffee and played catch with my son. I never opened Postman. I never wrote some genius prompt to kick it off, either; my agents wrote the instructions, Claude did the work, and every finding landed back in the hub that runs the project.

If you asked me for the one thing you have to get right to make AI actually work on a Fabric project, my answer would disappoint the prompt-template crowd. It's not about the prompt. It's all about the **harness**, and how you plan it out yourself.

## Stop Shopping for Engines

Everybody is still shopping for engines. Which model is smartest this month, which magic phrasing unlocks it, which prompt library to bookmark. Meanwhile, the thing that decides whether AI survives contact with a real Fabric project is everything wrapped AROUND the model: the skills it loads, the agents with defined jobs, the context it reads before it types a word, and the connections that let it act inside your other tools.

I think of it as a car. The model is the engine, and the engines are getting genuinely great; that part is handled for you. But an engine on blocks moves nothing. What runs my consulting business and my Fabric projects is the whole car, and that car has four wheels: **skills**, **agents**, **organized context**, and **the ability to talk to other harnesses**. Lose any one of them and it doesn't matter how much horsepower you bought. You're going nowhere, loudly.

One more thing before we get to the wheels, because it might be the most important sentence in this post: I whiteboarded all of this before I built any of it. I sat down and planned out how I wanted agents to work, where information would live, and how it would flow back. The realization that made everything click was simple. The project is the hub of whatever I'm working on. Not the chat window. Not the model. The project.

## Wheel One: Skills That Actually Know Fabric

Will a random, out-of-the-box agent create things for semantic models correctly? It will not. It doesn't know what it doesn't know, and I wasn't about to let it improvise on a client's model.

So the first wheel is **skills**: packaged expertise an agent loads before it touches anything. Microsoft has already published skills for Fabric, and I converted them into skills my hub can use. Now when an agent picks up semantic model work, it isn't freestyling; it's carrying real knowledge about how Fabric items should be built.

That's all a skill is. Expertise you write down once so the model stops improvising forever.

## Wheel Two: Agents With Actual Job Descriptions

I run three main agents around my projects, and every one of them existed on the whiteboard before it existed anywhere else. I was very intentional about what each one does.

**Polpette** (yes, named after the meatball) is my consultant's consultant. It holds resources on Fabric, on my consulting practice, and on previous projects. Its job is to look at status updates, semantic model work, and meeting notes, tie them back to the project, and help me plan: what's next, what's blocked, what to prep before the client call.

My **operations agent** keeps the project honest. Here's my favorite example of why it earns its keep. Someone mentions in a meeting that a column we expected doesn't exist. That's a throwaway line in a meeting note. My operations agent reads it and flags it: that's a blocker for building your semantic model. A stray comment became project intelligence, and I never had to connect the dots myself.

The third is a **status update agent** that keeps deliverables current, so the state of the project is never a mystery.

And here's the part that matters most: they talk to each other, because I instructed them to. This stopped feeling like using a chatbot a long time ago. It feels like running a small department. I'm having conversations with a team, not barking commands at a text box.

## Wheel Three: Organized Context Is the Hub

This is the wheel people underestimate, so let me plant a flag: **context engineering** beats prompt engineering, and it isn't close. A prompt is what you say in the moment. Context is everything your agents already know before you say anything at all.

I need a place that becomes the central hub of my brain, and Fabric is not going to be that. Fabric is meant for the data, the tasks, the projects; the hub lives alongside it. Mine happens to be Notion, and I don't go a day without it, but the tool isn't the point. The shape is the point. Every project is a page, and everything related hangs off that page: milestones in one related database, meetings in another, a resources index holding the data diagrams, the metric definitions, the statement of work. The hub knows how all of it relates.

Then comes my favorite trick: living instruction pages. For every project, I have the hub generate Claude instructions: use the Fabric MCP, here are the known blockers, here's what to check, here are the measures to create, here's the business context pulled from every meeting we've had. These pages are not short. They scroll.

When it's time to build, I open Claude Desktop or an IDE like Cursor or VS Code and say: read the Claude instructions for the semantic model. It reads the page, sees where the work left off, and picks it right up. That handoff is where the magic is for me. I'm not pasting context into a chat window, because the context already exists, organized, in the hub. And the instructions end with a standing order: when you finish, update the hub with what you did. The status flips, and that flip triggers whatever comes next.

Context that dies in a chat window is context you'll pay for twice.

## Wheel Four: Harnesses That Talk to Each Other

A harness sitting by itself is a very nice filing cabinet. Harnesses work best when they talk to one another, and this is where the pile of parts becomes a car.

Back to that Postman morning. A discovery phase landed on my plate: two dozen and change API calls against equipment data I'd never seen, all of it eventually headed for Fabric. The old version of me blocks out an afternoon and grinds through Postman by hand. Instead, two of my agents worked together to write Claude instructions for the Chrome extension: go to Postman, run every call we collected from the meetings and the emails, check how each response relates to the existing model, and capture the table information along the way.

Claude ran the browser. I had my coffee. My son and I played catch.

But the point isn't the party trick. The entire purpose of the exercise was to report the findings BACK to the hub. That discovery didn't evaporate into a chat transcript; it updated the organization my project already lives in, where Polpette and the others could act on it.

The same thing happens on the build side. With the Fabric MCP in the harness, Claude builds my notebooks and validates them while the coffee is still hot. I don't have to touch fabric.com. Interop is the wheel that turns four separate tools into one vehicle.

## How to Build Your First Harness

You don't need my exact stack. You need the four wheels. Here's the version a Power BI or Fabric professional can start this week:

1. **Pick one hub.** A single place where project context lives: Notion, a wiki, a repo. The tool matters far less than the fact that there is exactly ONE of them and that it's organized.
2. **Whiteboard before you build.** Put the project in the middle. Hang milestones, meetings, and resources off it. Mark where agents should act and where information must flow back. Ten minutes of drawing beats a month of untangling.
3. **Write job descriptions for two agents.** One advisor that knows Fabric and your project history and proposes next steps. One operations agent that turns meeting notes into statuses and blockers. Be intentional about what each one does, and instruct them to talk to each other.
4. **Load real skills.** Start with the skills Microsoft has published for Fabric and convert them into whatever format your hub understands. Don't let a generic model wing it on semantic models.
5. **Create a living instructions page.** For your next task, generate a page that names the MCP to use, the blockers, the checks, and where the work left off. Point Claude or your IDE at that page instead of pasting context into a chat.
6. **Close the loop.** Every session and every external action ends the same way: update the hub with what you did. If the findings never land back in the hub, the work might as well not have happened.

## The Question Is Changing

Here's my opinion, plainly: the people getting real leverage out of AI on Fabric projects are not the best prompters. They're the best planners. The gap between playing with AI and running your practice on it is a harness with four good wheels.

And a prediction to go with it: within a couple of years, asking someone for their best prompt is going to sound as dated as asking for their favorite search engine. **The question that separates data teams will be: what does your harness look like?** Prompt libraries won't compound. Harnesses will.

If this is the kind of thing you want to get better at, subscribe to PromptingBI and keep building alongside me.

## Key Takeaway

Don't start with all four wheels. Start with the hub. This week, create one page for ONE active Fabric project, hang your milestones, meetings, and resources off it, and end your next AI session with a single instruction: update the hub with what you did. That's the first wheel on the car.
