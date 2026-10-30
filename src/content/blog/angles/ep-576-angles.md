# Ep 576 angles — Distributed Wisdom for Fabric

Ore file. Draft later from `transcripts/ep-576.txt`. Do not treat this as the article.

- Episode: 576
- Title: Distributed Wisdom for Fabric
- YouTube: https://www.youtube.com/watch?v=uYlYQdBNCE8
- Notion: https://app.notion.com/p/3e6e74c69c188003a311ded0aaf743ee
- Transcript: `transcripts/ep-576.txt`
- Aired: 2026-10-29. YouTube uploaded 2026-10-30 (was_live). Duration 1:09:39. No guest.
- Source: YouTube auto `en-orig` (no speaker labels). Default fetch script missed the track (no JS runtime); pulled via `transcripts/_fetch_latest.py` with `--js-runtimes node`.

**Mike-only:** "This is becoming less of an issue with AI agents." Company that rolled out Grokbot to every employee. Uncle Bob / Robert Martin clean-code skill and "best practices people used to cut corners on." Different skill stacks can still produce a good report; build a test framework that checks reports independent of skills (font size, labels, tab order). Every visual attached to a theme-file style, never edit visual properties. Ontology as where captured knowledge lands. Arms race / competitor 100x faster / proprietary skills and custom harness as the eventual edge. Microsoft 25% layoff napkin math. "Monthly active agents." Lead engineer's daily vulnerability scan into a Teams channel, then PRs. "Focus on the process rather than the product" (said on air by Mike; also appears in the Notion prep notes, ambiguous, do not use as Tommy's).

**Do not rewrite:** [Agentic Distributed Wisdom](/2026/09/30/distribute-the-wisdom/) (ep 562: the one-head exit, agentic IP ownership, Nonaka/Hutchins origin, skill library playbook, seed skills, measure register, 30/60/90). [Agent Skills Are the New Theme Files](/2026/07/23/agent-skills-are-the-new-theme-files/) (governed vs personal). [Context Harness, Execution Harness](/2026/09/25/context-harness-execution-harness/) (master sequence, recon, write-back). [AI CoE: Better, Not Bigger](/2026/08/24/ai-coe-better-not-bigger/) (skills built from the business's SharePoint pages). [A skill.md Is Not Wisdom](/2026/09/21/a-skill-md-is-not-wisdom/).

Adjacent: 568 (Tommy pitches the name for a future episode: "How do we make sure the wisdom across the company, both from my skills or the context of the business, is in every place as you move along with a project? It's all well and good to chat, but it has to come with a back end."); 562 (exit version); 538 (team vs individual skills).

## Mined Tommy material (vocative-attributed)

- **Origin:** Roddy Boyd, *Fatal Risk: A Cautionary Tale of AIG's Corporate Suicide*. Exact quote from his Notion prep: "An offshoot of the peer-review process during Sosin's career as an academic, it was an attempt to apply common sense, or 'distributed wisdom' in the words of sociology, in the vetting of a risky, arcane proposition."
- **Definition (his):** an organization's ability to connect the expertise, experience, and judgment spread across its people and teams, so that knowledge can inform decisions beyond the place where it originated. Also known as collective intelligence: a group solving problems by combining different people's information and perspectives.
- **Sicily test:** "If they were going to move to Sicily today" (he says you can buy a farm there for a dollar; the real thing is the one-euro houses). What happens to your BI program and your data culture if one or two people go? Things crumble before governance matures. Even if I gave them an agent to replace the person, what's lost isn't DAX; it's the understanding of the metrics, the measures, the process. Says he does this on every client project.
- **Two-fold framing:** culture side and agentic side. "Especially if I'm building with agents and I leave, that's even worse."
- **"Clean code is not clean data."** Wisdom is the benchmark around our numbers, how we verify them, shared context.
- **Two-on-one-project scenario:** you and I, semantic model + pipeline, I know the KPIs, I disappear; without shared memory/context of what was worked on AND what the numbers should be, you fail. Different skills for design/DAX on the same project "interrupts itself each time." Not a guaranteed failure, "you are not setting yourself up for the best success." More important on a continuous project than at exit.
- **Pre-AI drift:** different themes/templates, different understanding of dims and facts, each report a drastically different layout. Not a failure, a bad experience for users. Intake/discovery questions drift if not one process.
- **Three areas, ranked:** skills, context, tools. Skills: config file for notebooks one skill always uses, different workspaces, agent knows where to go instead of a full search. Context: project state, what we're validating, silver row counts and structure, no first-time discovery every session, "I guess this is what I just built." Tools: least important; MCP, Power BI Desktop Bridge enabled, things installed. "We need to use the same brain, especially when it comes to agents."
- **Early Power BI person parallel:** "you felt like you were indispensable." The solo agentic builder now: (1) speed leaves with you and it had become the expectation, (2) discrepancy in volume, quality, look between you and everyone else, (3) no common thread, "continuous integration of our work."
- **His Notion pattern:** any task more than two or three checklist items becomes agent instructions; master sequence, "17 things to do but focus on item one first"; every item has a recon and a write-back. If he's the only one using it, nobody else, agentic or not, knows where we are or what the benchmarks are.
- **I vs we (hook):** X/blog posts, "look what I did in agent tools," operative word is I. "This is why AI hasn't taken off at companies, because I can work great with Grokbot, but when I need to make it a we, that's where we have problems." Self-flagged hot take.
- **Agents are part of the distributed wisdom, not a tool:** wherever I share knowledge with the team, the agent has access. First setup step is connecting it to the collective knowledge, not the download. Users and agents on the same memory/brain/context.
- **Expendable?:** creating skills from how the org works (even "how we deal with Excel files") shows you can work with agents, "probably the number one skill." Greatest skill is no longer DAX or Power Query. Converting mundane/complicated work into a skill an agent can run proves you can do it elsewhere. Old frustrations and barriers become skills. "It's not enough to create a SharePoint page and say this is how we build our DAX measures or this is how we do data governance. We've tried that. Doesn't work."
- **Governance committee (news segment):** ideal world, the OneLake catalog governance view is part of the data governance committee meeting, not just for the BI team. Customization is the missing piece.
- **Govern Skills (Microsoft article, verified):** "Govern Skills turn governance expertise from something each model has to reconstruct into reusable knowledge provided by Fabric." Govern experience GA in OneLake catalog; insights report in Admin monitoring workspace on a semantic model curated for customization.

## Locked (2026-10-30)

Tommy named the angle: distributed wisdom for Fabric, two-fold. Team/org side (how we share Fabric wisdom, data culture) and agentic side, as one system. Built around "make it a we" + "same brain" so it doesn't re-run 562's exit/handoff post.

- Post: `published/2026-10/2026-10-30-distributed-wisdom-for-fabric.md` (published 2026-10-30 after a humanizer + delete-ai-words pass), permalink `2026/10/30/distributed-wisdom-for-fabric`
- Title: "Distributed Wisdom for Fabric: Your Team and Your Agents Need the Same Brain"
- Images: `public/images/2026/10/distributed-wisdom-for-fabric-{banner,sicily-test,skills-context-tools,page-to-skill}.png`
- No code block, no `/prompts/` artifact (the playbook artifact already exists from 562).
- Walk-the-areas pass offered after the draft, not before.

## Other angles

### Bring Your Own Agent: Microsoft Is Opening Fabric Up
**Thesis:** Govern Skills ship for GitHub Copilot CLI "or other compatible AI coding agents," not only Copilot in Fabric. Tommy gives Microsoft credit for not forcing its own chatbot; Copilot in Fabric is still a chatbot that won't produce artifacts. Agent-agnostic is the right call.
**Plot:** short opinion. Thin alone; pairs with a skills-for-fabric how-to.

### Single-Shot DAX Benchmarks Measure the Model, Not Your Setup
**Thesis:** SQLBI's DAX LLM benchmark v2 is single-shot, no retries, no MCP, no skills. Useful, but Tommy wants the same tasks run with skills and MCP, because that's how anyone actually builds. His threshold is 90%. Opus leads on complex tasks in his experience; Fable can overthink.
**Plot:** news-reaction. Leftover Idea; stale fast.
