---
title: "Agent Skills Are the New Theme Files"
date: 2026-07-30T09:00:00Z
permalink: "2026/07/30/agent-skills-are-the-new-theme-files"
draft: true
description: "Everything BI teams learned governing Power BI theme files and PBITs over SharePoint is the playbook for governing agent skills. One rule decides what gets standardized and what stays personal."
---

Every BI team I've ever worked with has a theme file story. Somebody built the perfect JSON, dropped it on SharePoint next to a PBIT template, and declared the design problem solved. Then the copies started drifting, one quiet local edit at a time, until nobody could tell you which version was the truth.

Watching teams adopt **agent skills** right now feels eerily familiar, because it's the same movie with a new file format. Everything we learned, and everything we botched, governing Power BI templates, theme files, and PBITs is the exact playbook for governing skills: distribution, drift, versioning, and deciding what gets standardized versus what stays personal. This isn't a brand new problem. It's a continuation of one we already lived through. An evolution of it.

## The Same Problem, Evolved

Quick level set. When I say a skill, I don't mean "I'm skilled at cooking." A **skill** is a specialized package you hand to an agent inside a harness like Claude, VS Code, or Fabric: instructions, resources, even scripts. My statement of work skill knows my past projects, carries my reference documents, and converts markdown to PDF exactly the way I like it. That's a skill.

And skills are awesome. You need to be using them. Running an agent without skills is running a diet version of AI.

But here's the catch. Skills live locally on your machine, which is perfect for an individual and quietly dangerous for a team. If I'm using our custom Power BI skill and you're not, we get discrepancies. Sound familiar? A reporting team should already have a template and a theme file everyone starts from; skip that and you get discrepancies there too.

Think about what a theme file rollout required. Someone created it. Then you had to share it, distribute it, make sure everyone was actually using it, and handle modifications without spawning five unofficial versions. Every one of those steps exists for skills, and almost nobody is talking about how a team governs them. We're still in the honeymoon phase where a skill on one laptop feels like a win.

## The Decision Rule: Consistent Standard, Governed Skill

So which skills does a team govern and which stay personal? My rule: **anytime something requires a consistent standard, that needs to be a governed skill.**

It works exactly like the report template. The template says the banner goes on top and the background is that grayish tone everyone agreed on. Outside of that, it's kind of up to you. The template governs what must be consistent and stays quiet about the rest.

Run your deliverables through that filter. Discovery documents? Everyone's discovery needs the same format and structure, so the discovery skill is governed. Statements of work? I don't want someone on my team producing an SOW with a completely different structure and cost structure than mine. Governed. Report design and the way we develop models? If it ships with our name on it, governed.

Back-end code is where it gets interesting. Some developers would argue that should be a standard output too. I think it can stay a little more personal. How you write your helper scripts, how you prompt, how you like to work through a problem... that's craft, not standard. Personal stays personal.

One warning. A standard that only half the team follows isn't a standard. If I'm the only person running a custom report design skill, my output will be drastically different from everyone else's. Rolling out governed skills is a process change, not a file drop. People, process, technology; it still comes true.

## Drift: It's Just a Markdown File

Now the uncomfortable part. Once you distribute a skill, it's just text. A markdown file sitting on somebody's machine. Can they edit their local copy? Of course they can. Will they? Absolutely. Every "official" theme file that ever touched a shared drive already taught us this.

Here's the twist: with skills, some of that drift is improvement. Someone adjusts a script inside your knowledge center skill and suddenly it produces better how-tos. You WANT that. What you need is a way to see the change, vet it, and merge it back for everyone instead of losing it to a private fork.

That's a version control problem, so I'm treating it like one. I've been building something I call **Skill Vault**: one central repository that acts as the source of truth for every skill, with symbolic links and junctions pointing from the vault into each harness's skill location. Claude, Copilot, Codex; the harness thinks the skill lives in its own folder, but it's actually reading from the vault. It works across devices, so I can see which skills another machine is missing and push them out. Everyone works from a forked repo, so when someone adjusts a governed skill, the commit shows the exact line-level difference. I noticed you changed a section of the knowledge center skill; let's talk about it. If the change is good, it gets pushed into the main vault and everyone pulls the latest. Just like we did with SharePoint and the PBIT, except with a real diff instead of "Copy of theme_FINAL_v3."

Is it perfect? No. I'm not claiming I've solved team skill management. But two principles underneath it are non-negotiable. First, **this is not emailing skills back and forth**. That never worked for theme files and it won't work here. Second, govern the skill, not the tool. My statement of work skill should work in VS Code, in Cursor, in whatever harness someone plugs it into. The moment your standard only exists inside one tool, you've governed the tool instead of the standard.

## A Skill Needs the Same Onboarding as a New Hire

Here's what teams miss when they think the skill file is the whole job. Whether I hand a deliverable to a person or to a skill, both need two critical things: the exact same context and more or less the exact same instructions.

A new hire writing their first statement of work can't hit our standard without seeing my previous work, my milestone structure, my cost structures, and the difference between an implementation project and a training project. Neither can a skill. Without that reference library, neither one produces a standard output. The writing will differ, one draft will run longer than another, and that's fine. The structure, the deliverables, the way we do things? That comes from the references.

So skill governance is really context governance. The markdown file is the smallest part of the asset. The library it points at is what makes the output standard. Govern them together or don't bother.

## Don't Govern the Craft Out of People

Now the tension nobody wants to name. If every deliverable becomes "invoke the governed skill, don't touch it," what is your team actually contributing? No personal input, no creative touch. And when someone finds a more optimized way and the answer is "nope, we governed it," you lose your best people first. Me? I would be storming the gates, because then what am I doing here?

Two release valves keep governance from curdling into that.

First, the **stand-up skill pitch**. Picture a weekly stand-up where pitching skills is normal: I built a skill that helps with ticket vetting, it actually reads our tickets, and I'd like to pitch that we all use it. The team weighs in, the manager makes the call, and creativity becomes an input to governance instead of a violation of it.

Second, **garage skills**. Give your team three or four hours a week to experiment with skills. No assigned project, just play. We're still at the cusp of what skills can do, and we don't know what we don't know. Protected tinkering time is the oldest trick in computing; it's the culture that gave us the Macintosh and the graphical user interface work at Xerox.

## The Playbook for Your First Quarter

Moving from skills-on-laptops to skills-as-governed-assets looks like this.

1. **Inventory what exists.** Have every person list the skills in their local skill folders, in every harness they use. You can't govern what you can't see.
2. **Sort with the rule.** Does this output require a consistent standard? Discovery docs, SOWs, and report design standards go in the governed column. Personal helpers and working style stay personal.
3. **Build the reference library.** Past work, milestone structures, cost structures, examples of the standard output. Attach it to every governed skill, because a skill without context misses your standard the same way a new hire would.
4. **Stand up a central vault.** One version-controlled source of truth, linked into each harness's skill location. Forks, line-level diffs, pull the latest. If your distribution plan is email attachments, you don't have one.
5. **Make the pitch a ritual.** New skill? Pitch it at stand-up. Improvement to a governed skill? Pitch the diff, vet it, merge it, everyone pulls.
6. **Protect garage time.** Three or four hours a week, no deliverable attached.
7. **Close the loop.** I keep skills alongside my Claude Projects and go back through past chats that used a skill to ask what we should optimize. Use a skill-creator skill to formalize what you learn, and make your heavyweight skills interview you before they generate anything. My SOW skill runs through questions first: what type of project is this, how do I want to approach it. That interview is where my judgment stays in the deliverable.

## Where This Is Headed

Are we at the point where every team needs a full skill governance program? Maybe not completely. Is it something you need to be thinking about? Absolutely. My prediction: within a couple of years, skill stewardship is a named responsibility on data teams, the way theme and template ownership quietly became one. Teams that treat skills as governed, versioned assets will ship consistent work faster; everyone else will be doing archaeology on their own laptops.

The theme file already taught us the lesson: standards don't survive on good intentions. They survive on distribution, versioning, and a clear line between what's standard and what's yours. Skills deserve at least that much respect... they're doing far more work than a background color ever did.

If you're thinking through this with your own team, subscribe to PromptingBI and keep the conversation going.

**Key Takeaway:** Run the inventory this week. Ask every person on your team to list the skills sitting in their local skill folders, in one shared doc. The consistent-standard rule can't sort skills you can't see.
