# Ep 557 angles — LLMs: What Data Viz Teaches Us

Ore file. Draft later from `transcripts/ep-557.txt`. Do not treat this as the article.

- Episode: 557
- YouTube: https://www.youtube.com/watch?v=dRNI_7u9TVE
- Notion: https://app.notion.com/p/397e74c69c1880fcba05de6af52e95e4
- Transcript: `transcripts/ep-557.txt`
- Source: YouTube auto (no speaker labels)

**Mike-only:** custom viz harness doesn’t exist yet; low→medium→high fidelity turn counts; on-object editing rant; “you described slop to the agent”; Obsidian-vault-gone-wrong caution (someone else’s). Don’t steal.

Skip August feature-summary podium (date picker, doughnut comments, SharePoint embed). Theme of the month is “should have shipped years ago,” not an article.

Foil: Eva / Nightingale, *Critically evaluating LLMs*. Same as 546/561: she is the foil, not the co-author.

Adjacent: 556 Bridge A/B; 561 iteration vs bar chart; published [Don’t Let Your Agent Touch Fabric](/2026/08/17/dont-let-your-agent-touch-fabric/); [Don’t Hire a Senior to QA the Agent](/2026/09/14/dont-hire-a-senior-to-qa-the-agent/).

## Best plots

- **Write first:** opinion + validation-as-last-step. Closest to the blog’s QA spine.
- How-to: three pillars (skills, MCP, second-brain context) as a table-legs piece. Risk of repeating Stop Re-Prompting / harness series.
- Artifact candidate: viz validation gate under `playbooks` (click paths that must not break, totals that must match the card, “sycophancy check”). Sibling to `pipeline-interrogation-gate` and `dax-readiness-gate`.
- Series: report-authoring with 556 + 561.

## ★ Write first: The Last Step Is Validation, Not Design

**Thesis:** An LLM will hand you a pixel-perfect page and a cheerful “I did your work.” The last execution in a viz session is not layout. It is clicking the thing and proving the number can exist.

**Plot:** opinion. Bilbo/sycophancy as the short analogy, not a new extended metaphor (orchestra is already spent on 549).

**Material (Tommy):**
- Eva’s two problems: hallucination is inherent (even on public data); the tools are **products**, not neutral. Helpful tone over accurate. “I did your work.”
- Pushback on Mike: TMDL + a model is not new, and it is a different skill than “build a visual from a CSV.” Eva’s example is compile public data, invent test data, draw charts, ship slop. Power BI is filter context + a model + a page of related visuals.
- Three pillars he will not drop, any harness: **skills** (you are asking for trouble without them), **MCP if one exists** (worth the setup), **context + validation tied in before it explores** (he cannot imagine typing the giant prompt). Second brain writes that block.
- Sycophancy: Bilbo/ChatGPT meme. “You’re absolutely right, keep the Ring.” Same trap as human error on filter context, except the model is designed to please you.
- Last point of execution is validation. It will look aligned. Seth would be proud of the pixels. You click something and it is screwy. You will not see it from the screenshot.
- Close: most direct road right now is Desktop Bridge, which Microsoft already paid for. Do not stop there. MCP + skills + context. Three legs. He knows a table has four.

**Attribution:** Tommy. Do not write Mike’s custom-harness manifesto or the fidelity-graph as Tommy.
**Freshness:** leftover vs Don’t Let Agent Touch Fabric (survey the data before write) and Don’t Hire a Senior (interrogation). This is **viz + sycophancy + the click**.

## Other angles

### Skills, MCP, Context. In That Order
**Thesis:** Hallucination is not a model-vendor problem you out-prompt. It is a missing skill, a missing MCP, and a prompt that never named the test.
- Challenge to Mike: “you haven’t said anything new about how you use AI.” The new part is viz is not a single chart.
- Warehouse MCP news: dedicated T-SQL execute, Entra, authoring/consumption/ops skills. He wanted this so the warehouse MCP is not bloated into the modeling server.
**Plot:** how-to. Collision with Stop Re-Prompting / Anatomy of a Project Hub if it stays general. Keep it on viz or warehouse MCP.

### These Things Are Products. They Will Try to Make You Happy
**Thesis:** Cheerful completion is a design choice. Treat it like a visual that uses red: it is already a verdict.
- Eva: lack of transparency, products not tools.
- Filter/eval context is the BI version of the Ring meme.
**Plot:** opinion, short. Can fold into write-first. Do not ship as a second post unless the sycophancy examples get bigger than this episode.
