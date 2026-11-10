# Ep 583 angles — When Leadership Builds, Part 1

Ore file. Draft later from `transcripts/ep-583.txt`. Do not treat this as the article.

- Episode: 583
- Title: When Leadership Builds - Part 1
- Air date: 2026-11-24
- Notion: https://app.notion.com/p/406e74c69c1880aca144ee6da9dbe4c6
- Transcript: `transcripts/ep-583.txt`
- Source: Notion meeting note (Emp record 583, 2026-11-09), not the MP3. Speakers are letters. After the open, **B addresses Mike, so B is Tommy. D addresses Tommy, so D is Mike.** A/C/E/F/H are booth, music, and the open. **G is unattributed** (drops in mid-argument; do not assign).
- Part 2 is episode 584 (When Leadership Builds - Part 2, airs 2026-11-26). He tees it as Fabric having the keys, drift between Claude dashboards and current reporting, and the BI team as app builders. Do not write 584's half into this post.

**Mike-only (D), do not put in Tommy's mouth:** The barrier from idea to a usable app got very small if you can articulate the solution; you no longer need TypeScript, React, or Rust. Two leadership stories, including a fervent "if the team doesn't get on board they likely don't have a position." Power BI democratized reports, agents democratize app building. He disagrees that the old data/leadership relationship was disconnected. His own Cursor token-usage export into a Claude dashboard, with each visual exposing a JavaScript formula and a data table. MCP permissions feel "on the wrong side of the fence" because the user turns capabilities off, not the workspace admin. Claude team plans, as he understands them, cannot disable dashboards for one user. Self-service vs certified already exists; agents just create more, and the artifacts are bidirectional. The trust path (standard to certified, owner, support) existed before AI; AI accelerates creation and not the testing. He has been building games with agents and doesn't trust them until he is inside them. Swiss-army list: shape the semantic model, build reports with PBIR and Fabric skills, custom visuals (cites NJ Park; he has not built one himself), or go full Rayfin / Claude / Genie. The decision tree between a custom visual and a full Rayfin app. The vision has to come from leadership actually using the tools, not lip service; give them the model, let them export Excel, let them build a Claude dashboard, then talk governance. "This problem existed before AI."

**Contested, do not flatten:** Tommy called the old leadership/data relationship an acquaintance unless BI ran a campaign to prove its value, and said it was not intimate unless you were the CTO. Mike said he "very much disagree[s]." Write Tommy's version only if the post is explicitly his read, and do not pretend they landed it.

**Do not rewrite:** [The Agent Builds the App Faster](/2026/11/04/the-agent-builds-the-app-faster/) (ep 566: when an app earns it vs a report). [Fabric Is Best as a Backend](/2026/10/05/fabric-is-best-as-a-backend/) (ep 554). [Don't Let Your Agent Touch Fabric Until It Reports Back](/2026/08/17/dont-let-your-agent-touch-fabric/). [Same Prompt, Two Reports](/2026/10/02/same-prompt-two-reports/) (Desktop Bridge needs a spec). [Design the Report From the Meeting You Already Had](/2026/08/19/design-the-report-from-the-meeting-you-already-had/). [You're AI Ready. Your Organization Isn't.](/2026/08/12/youre-ai-ready-your-organization-isnt/). Governance pillar posts. Name "Rayfin" the way he says it; the agenda notes spell it Raythin.

## Mined Tommy material (speaker B, post-open)

- **Frame:** two-parter. Today is leadership building prototypes with and without BI, then handing them off. Thursday (584) is the drift between what a Claude dashboard can do and what reporting already needs. He calls the current phase "leadership optimization" and "informal adoption," not a formal AI program.
- **The new design:** a leader can open Claude or ChatGPT, say they want X, Y, and Z, and get a working app. No VS Code, no Cursor. Historically leadership described a concept and BI translated design and functionality. Now they can hand over a prototype and say "do that." He calls that "a very odd design" for careers, teams, and the leadership relationship. Not universal. It depends on whether that person will test AI themselves. He is seeing both "use your own subscriptions" and leaders who grab their own Excel and build the app.
- **The good path is a wireframe, finally.** If the relationship exists, the leader exports Excel, builds a wireframe, and asks "can we replicate this?" He has wanted wireframes for years. The workflow stops being "here's a bird's-eye view, you translate it."
- **Client story:** leadership sent images that were obviously ChatGPT or Claude. Features in the pictures that Power BI cannot do natively. They had already done the prompting and refinement. Desktop Bridge, "doing a lot more than bar charts," replicated the functionality and still landed it in Power BI. He flags the world as "kind of weird" that the spec now arrives as generated screenshots.
- **Hot or cold.** If they are not bringing you those prototypes, they are building dashboards and not asking whether it can live in Power BI. That is when drift starts. Either an intimate loop (they feed you wireframes, you build) or drift. He wants the data-consumption workflow named.
- **Where the data comes from is the concern, not the prototype.** Self-service might live in the agent rather than in Power BI. The semantic model is still "the heartbeat of Microsoft Fabric." He wants leadership, whenever they build, connected to that model. Copilot exists and he waves it off ("a little bit"). His claim: Microsoft is getting agent-agnostic, and he can connect to a semantic model from the agent tools. He and Mike then tangle XMLA, Build permission, and Rayfin needing XMLA "just to consume." Do not upgrade that tangle into a precise permissions how-to. The point he is pushing is read access for agents without handing them the model editor.
- **The prototype cannot be the end of the road.** His ideal path: build as many as you want, but a skill on every team talks to the ticketing system. The agent says a report already exists on that model and offers to file a ticket with the prototype attached, so BI builds from it instead of beside it. Otherwise everyone shares random artifacts, someone says "just create that again in Claude for this week," and the way people consume data moves off the governed stack. He wants the prototype to enter the certified / promoted track so the number is verifiable.
- **He will encourage prototypes and he will not be passive about distribution.** Especially an executive sharing an artifact with their team. He calls it a time bomb: either people stop caring about the reports already in the ecosystem, or a Power BI / Fabric number and a leadership-built number conflict and trust goes. "What is truth?" Leadership will eventually push the number they built. He says that "flies in the face of everything that we've been doing for 10 years." Claude, ChatGPT, and Copilot analytics are "amoral." The missing piece is a path that "complete[s] the cycle" back into the normal workflow.
- **The Monday conversation, said out loud:** if you have the relationship, ask whether they are using AI. Most will say yes. If they are building dashboards, tell them you can build faster off the prototypes. Do not open with "stop, you'll break governance." The line is that this helps the BI team and everyone else, and it has to happen now rather than later.
- **He names it.** "AI P2P. AI prototype to production." He wants it on the data governance track. He invites a better name. The job is taking "the prototypes and the random things people are building to try to get and understand their data" and putting them on a track that scales with the data you already have. Early. The conversations can start now.
- **Close:** patterns are starting to show, "solid footing," not slower, just finally some common ground. He agrees you do not blanket-deploy this with no thought for how the org uses the trust models you already have.

## Recommendation

**AI P2P: the prototype is not the deliverable, the path is.** Title direction: "AI Prototype to Production" or "The Prototype Is Not the End of the Road." Plot: the client screenshot story, the hot/cold fork, the ticket-plus-skill loop back onto the certified model, and the sentence he will actually say to a leader on Monday. Leaves 566's "when do you build the app" alone, and leaves 584's Fabric-as-platform half for the next episode.

## Other angles

### Leadership Finally Sent the Wireframe
**Thesis:** The spec now arrives as a Claude or ChatGPT screenshot, and Desktop Bridge is how he lands it in a real Power BI report. The win is the refinement they already did, not the picture.
**Plot:** short, worked. Collides with the Desktop Bridge post and "Design the Report From the Meeting You Already Had" if it becomes another Bridge tutorial. Use the story inside AI P2P instead.

### Self-Service Moved Into the Agent
**Thesis:** If the semantic model is the heartbeat, self-service does not have to be a Power BI report. It can be an agent with read access. Build permission and XMLA are the wrong door for a leader who only wants to ask a question.
**Plot:** technical opinion. Thin on a settled mechanism (he and Mike do not agree where read ends and edit begins). Overlaps "Don't Let Your Agent Touch Fabric" and "Fabric Is Best as a Backend."

### Ask Them If They're Using AI Before You Preach Governance
**Thesis:** The first move is not a policy. It is the question. Most leaders will say yes. Then you offer to build off what they already prototyped.
**Plot:** culture piece, probably a section of AI P2P rather than its own post.
