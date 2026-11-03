# Ep 571 angles — Alpha does not leave the sandbox

Ore file. Draft later from `transcripts/ep-571.txt`. Do not treat this as the article.

- Episode: 571
- Title: Fabric Notebook Toolkit - Measuring the Impact
- YouTube: https://www.youtube.com/watch?v=eH2NZRZHBuY
- Notion: https://app.notion.com/p/3f2e74c69c1880eb8be4c90e42024e23
- Transcript: `transcripts/ep-571.txt`
- Aired: 2026-10-13. No guest.
- Source: YouTube auto (no speaker labels). Toolkit is the Fabric Notebook Toolkit Python library (he hates saying FNTK). PyPI: https://pypi.org/project/fabric-notebook-toolkit/

**Mike-only:** Fabric Copilot cannot read the notebook or explain a failed cell, so do not spend extra CUs; bring the agent you already pay for. Build the CLI and one markdown of tools first, UI later. He uses Skill Vault as Tommy's example of that. Tommy never says it here. Alpha is a toy. Do not depend on it. The new loop is prompt, read the cell, edit, run, diagnose, fix. Impact wrench, not a first drill: notebook, cluster, and Spark fundamentals come first. Prompting is there to democratize notebooks to business users. Agents build the machine that makes the machine. They should not be the thing that answers the data question. Old path: app registration, download the notebook, edit locally, publish. Docs are a blog post that dumps you on PyPI. His agent tried to wrap the toolkit in a notebook. He calls today's execution poor. Tommy's "I love it" is agreement, not this critique. Kurt's three C's, bronze/silver/gold opinions, data contracts, Databricks Genie. "Execution is poor" starts after Tommy hands him the close ("Mike, where do you want to end us?").

Skip: Chicago meetup, the Skill Vault tour (already [Why I Built Skill Vault](/2026/10/08/why-i-built-skill-vault/)), the IDE argument, Pokemon / token-FOMO skill collecting. Agenda items that never became a Tommy claim: measuring the toolkit's impact, agent identity, notebook sprawl. The "why pay more CUs when I already pay for an agent" line is not in a Tommy turn.

**Do not rewrite:** [Don't Let Your Agent Touch Fabric](/2026/08/17/dont-let-your-agent-touch-fabric/); [The Context Harness and the Execution Harness](/2026/09/25/context-harness-execution-harness/); [Build the Thing That Creates the Thing](/2026/09/16/build-the-thing-that-creates-the-thing/); [Don't Hire a Senior to QA the Agent](/2026/09/14/dont-hire-a-senior-to-qa-the-agent/); [Agents Raise the Floor and Lower the Ceiling](/2026/08/28/agents-raise-the-floor-and-lower-the-ceiling/); [Agent Skills Give the Power BI Pro Room to Think](/2026/10/07/agent-skills-give-the-power-bi-pro-room-to-think/); [A Data Agent Should Be a Sub-Agent](/2026/09/23/a-data-agent-should-be-a-sub-agent/); [Inside an MCP Execution Session](/2026/08/05/inside-an-mcp-execution-session/).

Adjacent: 566 agentic dev of PBI reports; 556 Desktop Bridge; 544 harnesses.

## Best plots

- **Write first:** opinion. A preview this capable stays in a sandbox with a human watching it, because the day you allow it is the day you cannot put it back.
- How-to: the install-then-write-a-skill move is real, and he did not show the skill. Do not invent CLI flags.
- Artifact: none from this episode.
- Honest: the episode never measures impact, cost, identity, or sprawl in his mouth. The decision he does make is the sandbox.

## ★ Write first: Alpha Does Not Leave the Sandbox

**Thesis:** The Fabric Notebook Toolkit is strong, and it is alpha. A CTO, CIO, or BI lead does not release it into the tenant. They monitor it and they sandbox it. Once the org is allowed to work this way, you will not get the old way back. He still loves the tool.

**Plot:** opinion. One scare: if MCP access to Fabric disappeared tomorrow, the relearning would be ugly. No sandbox design, no identity model, no CU math.

**Material (Tommy):**
- Preview versus GA is a leadership job. Data czar, CTO, CIO, or the person who owns BI has to know which is which. The toolkit is powerful and early. AI, including Fabric, is moving faster than most people want.
- He would not release this in the wild. Monitor it. Sandbox it. Kurt's responsibility point, as Tommy applies it: be careful what you allow, because you cannot put it back in the box. If MCPs went away, "holy crap," a lot of relearning. He loves the tool and expects a large impact. The turn ends by handing the close to Mike. The "execution is poor / docs are a PyPI dump" verdict is the next turn. That is Mike.
- What the toolkit is, so the post has a subject. A Python library you run from a terminal on any machine that can reach a capacity. It does not have to run inside Fabric. The old notebook helper only ran in the Fabric notebook UI or in VS Code with the extension. Three claims he states: run outside Fabric, manage and run notebooks and also execute capacity code in its own environment, and support end-to-end agentic notebook development from GitHub Copilot, Codex, and Claude Code. Model-agnostic and harness-agnostic is the part he cares about.
- Copilot is no longer the door. Last year everything was the Copilot pane. He wanted his own harness. Desktop Bridge, skills for Fabric, and this toolkit are the shift. "99% of the time" it is used with an agent. "That's the intention."
- Not for Joe Schmo. Toolkit access is his BI team and notebook developers, not a random person. He clocks Mike's face. Mike's rebuttal is the democratization point. Do not give Tommy the impact-wrench line.

**Attribution:** Tommy on preview-vs-GA, the sandbox, the irreversibility scare, the outside-Fabric CLI, and "not Joe Schmo." Mike owns "it's a toy," the cell-repair loop, the bad docs, the CU argument, and "fundamentals first."
**Freshness:** adjacent to Don't Let Your Agent Touch Fabric, which is a report-back gate before a write. This is irreversibility: once the pattern is allowed, the org does not go back to downloading notebooks by hand.

## Other angles

### FNTK Is the Spice
**Thesis:** Skills, MCPs, and the toolkit are one meal. The toolkit is not the entrée, and it is not optional seasoning.
- He names the next article on air: the Fabric agentic meal. Hefty dose of skills, large meat of MCPs, FNTK as sauces, bases, and spices. Alone it does not change who he hires. He would still seriously interview a novice who knows MCPs, medallion theory, FNTK, and harnesses, has never executed it, and can explain medallion. "Not yet" on hiring, agreeing with Mike's "not yet," is his. The turn names Mike ("If Mike I know my next article").
- "Machine that makes the machine" is Mike's this episode.
**Plot:** opinion. He queued it himself. It mostly restacks the harness posts. Leftover until he wants that recipe post.

### It's a Neighbor, Not a Better Drill
**Thesis:** The toolkit does not upgrade people who already build notebooks. It lets someone who has never opened one produce lakehouse artifacts they cannot validate.
- Neighbor who can build anything: "I want a wall downstairs," then "sliding door, not a normal door," and you watch, asking why the frame is there. Someone who has never touched a notebook, who needs an API landed in a semantic model, could be handed the toolkit and get a semblance of artifacts and data in a lakehouse. "Not necessarily validated."
- That claim is in tension with "not for Joe Schmo" a few minutes earlier. Write the tension if this ships. Do not smooth it.
**Plot:** opinion. Same neighborhood as Agents Raise the Floor and Lower the Ceiling. Mike owns the impact wrench.

### Make the Agent Write the Skill the Vendor Didn't Ship
**Thesis:** A naked PyPI CLI becomes usable once the harness installs it, pokes at it, and writes the skill that maps intent to commands.
- Docs on Microsoft Learn were not there. His move, in Claude, Codex, or VS Code: tell the harness to install the Python CLI, ask what it can do and how to log in, let it try, then tell it to write a skill. He did that with the toolkit.
- Commands are the action list. Domain names are ASR-fuzzy. Do not print flags. Intent he actually stated: "run a notebook" goes to the notebook command; "what's in this lakehouse?" goes to the code command. The feature he loves most: execute code on a Fabric Spark runtime without being attached to a notebook, and it does not need the MCP. The workspace-id / poll / JSON syntax is the next turns and names nobody. Drop the syntax.
**Plot:** how-to, only if he pastes the skill. No skill text in the episode. Mike owns "the docs are bad."

### The Notebook UI Is the Beginner Path
**Thesis:** The Fabric notebook editor is now what you open when you do not know the agent tooling.
- Hot take, labeled as an initial take. He asks Mike. He does not concede. Mike's answer is "CLI first, UI later," which is a different article.
**Plot:** thin. One claim, no session.

### "The Most of a Lot" Is Not a Metric
**Thesis:** Capacity health has to be readable by someone who is not a capacity expert, and that report belongs in the weekly BI meeting.
- Clients see a CU visual and he can only say it "has the most of a lot." He wants the OneLake catalog report (data freshness, item curation) on the screen in the weekly meeting. On the new capacity metrics app he is mostly reading the blog: 14-day lookback, percent of time throttled, CUs by seconds instead of percentages. The "you can't just build whatever" speech between those turns names nobody.
**Plot:** thin. One paragraph inside a later capacity post.
