# Ep 528 angles — Importance of Skills for the Fabric Developer

Ore file. Draft later from `transcripts/ep-528.txt`. Do not treat this as the article.

- Episode: 528
- YouTube: https://www.youtube.com/watch?v=wrMb6tu5Pwg
- Notion: https://app.notion.com/p/352e74c69c188086966dffb4b6cb866b
- Transcript: `transcripts/ep-528.txt`
- Source: YouTube auto (no speaker labels)

No published/draft post from this episode. Prequel to published “Agent Skills Are the New Theme Files” (ep 538). Do not write-first the team-governance thesis.

## ★ Write first: A skill.md Is Not Wisdom

**Thesis:** An agentic skill is extra instructions. A human skill includes years of “this will bloat / this FILTER will die / that is not a two-hour deliverable.” Collapse those and you get slop.

**Material (Tommy):**
- He insists on defining technical skill vs agentic skill first, or “we run into a lot of slop.”
- Technical: can write the DAX *and* the scar tissue (bloat, FILTER on a big model, three measures instead of one).
- Agentic skill = `skill.md` + resources: instructions, scripts, format, references. Context, not judgment.
- SOW example: dump a transcript into the skill with no him in the loop → it invents deliverables and hours. His job is “that is not a deliverable” and “not 2 hours, 6.”
- Human skill has to include experience. Agentic skill is additional context. Different objects.
- Mike: agent skill is the human skill bundled for reuse. Tommy does not concede the ontology.

**Freshness:** fresh. Distinct from theme-file governance (538) and from “reviewing is the new writing.”

## LOCKED (2026-09-21)

Tommy merged the two lead angles into ONE article: "A skill.md Is Not Wisdom" (the problem) + "Grill the Plan, Then Combine Fabric Skills" (the mechanism). Thesis: a `skill.md` carries instructions and context, never the judgment that says this FILTER dies on that model or that is 6 hours not 2. So the workflow has to pull the judgment out of you before the agent builds: a short interrogation skill stacked on top of the Fabric skills, in one conversation.

Collision guard: do NOT re-argue "skills are recipes, recipes are not cooks" (published 2026-09-16 "Build the Thing That Creates the Thing") or "you can direct the orchestra because you played in it" (2026-08-28). The differentiator here is the extraction ritual, not the skill/cook distinction.

Leftover angles below stay leftover. The hiring jab ("let me see your repo") gets one closing line, not a section.

**Shipped 2026-09-21 (published, `draft: false`, awaiting push):**
- Post: `published/2026-09/2026-09-21-a-skill-md-is-not-wisdom.md`, permalink `2026/09/21/a-skill-md-is-not-wisdom`
- Artifact: `src/content/prompts/grill-the-fabric-plan.md`, category `agent-skills`
- delete-ai-words + humanizer passes run on the final copy; see the Editing Notes toggle on the Notion page for what was cut
- Contraction density: measured the whole `published/2026-09/` folder rather than eyeballing one post. Four of five September posts run 1.8% to 2.8% contractions per word; `build-the-thing` at 0.3% is the outlier. This post shipped at 2.55%. If a future post reads stiff, measure the folder before deciding the house voice is contraction-light.
- Images: `public/images/2026/09/a-skill-md-is-not-wisdom-{banner,measures,frontier,stack}.png`
- Notion: https://app.notion.com/p/3e2e74c69c188117bc7deb1eb27b0c6c (Status Drafting, Episode relation set)

**Open with Tommy:**
- The two community Fabric skill authors the captions mangled as "Kerp Buller or Alex Miller" are written around as "the architecture and notebook skills the community has published." Names needed to credit them properly.
- The DAX pair in section 2 is illustrative, not pulled from a real model. Swap in a real Northside measure via the modeling MCP if he wants it verbatim.
- The SOW hook uses the generic "not two hours, six." A real invented-deliverable specific would sharpen it.
- `mattpocock/skills` star count (API reports ~267k) deliberately left out of the post as a single-source number.

## Other angles

### Grill the Plan, Then Combine Fabric Skills
**Thesis:** Short interrogation skills beat 400-line skill files, and Fabric work only gets good when you stack Grill Me on top of Fabric/architecture skills in one conversation.
- Matt Pocock “Grill Me”: interview until shared understanding. One question at a time. Search the repo instead of asking.
- Tiny skill. Pocock: 30–45 questions sometimes. Tommy wished he had it the day before on an SOW.
- Combine: Fabric skills + Grill Me. People ask “does it know Fabric?” Stack the skills.
- Pattern after grill: turn the shared understanding into delivery instructions / issues.
**Freshness:** adjacent to skills posts, not the theme-file thesis.

### No Skills in the Repo Means You Are Not Using AI
**Thesis:** ChatGPT in a browser is not an AI practice. If you hire a “Fabric + AI” developer and there are no skills in the codebase, they are not using AI.
- Screen: show me the repo. No skills → disappointed.
- Chatbot-only does not count. Skills are not a nice-to-have for architects, sales, or Fabric people.
**Freshness:** collision with theme-file / skills-as-standard. Leftover.

### Skills That Live on One Laptop Are a Governance Problem
**Thesis:** You and I can live in a skill-only workflow. An employee cannot, because the next person cannot inherit “go clone my GitHub” when the pipeline breaks.
- Extreme hire: “95% agents, I don’t write DAX.” Where is the cutoff.
- Org version: he cannot be the only one building lakehouses agentically.
**Freshness:** collision / prequel to ep 538 published post. Do not write first.

### Bad Output Is Usually Bad Requirements
**Thesis:** If you have to read the generated code to figure out what to type next, you under-specified the work. Prompting is a technical skill.
**Attribution:** mixed (Mike’s “you’re thinking about AI wrong”).
**Freshness:** collision with Stop Re-Prompting.
