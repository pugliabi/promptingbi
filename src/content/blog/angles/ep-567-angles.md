# Ep 567 angles — The right model for the task

Ore file. Draft later from `transcripts/ep-567.txt`. Do not treat this as the article.

- Episode: 567
- YouTube: https://www.youtube.com/watch?v=caiTPz9yaVI
- Notion: https://app.notion.com/p/3c7e74c69c188052bc8fec23195115e8
- Transcript: `transcripts/ep-567.txt`
- Source: YouTube auto (no speaker labels). No guest. Kurt/Eugene article is the text they argue with; Kurt is not in the room.

**Mike-only:** monthly active agents as the next software metric (he rejects Tommy’s monthly-active-tokens counter); models-are-org-roles analogy; Cerebras wafer / 1,000 tokens per second / Jevons-and-light-pollution tangent; “desktop needs to die, Power Apps style”; Fabric Apps connectors, TypeScript backend, secret store as the revolutionary FabCon item; OpenAI Dev Day shrug. Don’t steal.

**Kurt-owned (article, not this room):** purpose / capability / config / cost model matrix on the Tabular Editor blog (with Eugene, dated Aug 25). Cite the article. Do not write Kurt’s routing recipe as Tommy’s scores.

Skip as the article: FabCon Barcelona highlight reel (database hub, Postgres-in-Fabric confusion, database agents). That news is the ramp. Ep 568 is the feature draft. Rune-on-episode-1000 bucket list. End-credit song.

**Do not rewrite:** [The Context Harness and the Execution Harness](/2026/09/25/context-harness-execution-harness/); [Stop Re-Prompting](/2026/07/20/stop-re-prompting/); [A skill.md Is Not Wisdom](/2026/09/21/a-skill-md-is-not-wisdom/); [Same Prompt, Two Reports](/2026/10/02/same-prompt-two-reports/); [Don't Hire a Senior to QA the Agent](/2026/09/14/dont-hire-a-senior-to-qa-the-agent/).

Adjacent: 566 agentic report hours go to context; 565 effort graph; 564 literacy leftovers.

## Best plots

- **Write first:** opinion + a routing card. Plan on a high model, execute the written plan on a cheaper one, with two Fabric exceptions he will not route the way Mike does.
- Pushback: “bigger model for a harder task” is a slogan until someone defines the hard task.
- Artifact: low / medium / high card for six Fabric jobs, scores labeled Tommy vs Mike so a draft cannot blend them. `/prompts/` only if he ships the card.
- Honest: Mike owns the org-chart model analogy and the token-economics close. Tommy owns the plan-vs-execute split, the verification story, and the two score disagreements.

## ★ Write first: Plan on the Expensive Model. Follow the Recipe on the Cheap One.

**Thesis:** “Use a bigger model for a harder task” sends the whole job to Opus. The split that changes the bill and the result is plan versus execute. A high model takes the requirements, asks the clarifying questions, and writes the step-by-step plan, including the test and what done looks like. A cheaper model follows that recipe the way a cook follows a written method. Two jobs do not get that split. DAX stays high through the write, because a measure that parses and still has the wrong context is the loop that costs the afternoon. Report design on Desktop Bridge stays medium, because a high model over-decorates the page.

**Plot:** opinion, then the six-job card. Do not tour provider docs, Fable’s prompting page, or Cerebras.

**Material (Tommy):**
- Main text is Kurt and Eugene, “How to pick the right AI model for agentic development” (Tabular Editor, Aug 25). He wants angles that do not rerun the prior four Kurt episodes. Two months is already legacy in this market; he still treats the patterns as usable.
- Verification beat: a published report with nobody checking alignment. Lower-effort models (Haiku, Sonnet, older GPTs) are fine when the job is already defined (organize these files, search the tenant). Point them at something fuzzier and you get more hallucination and more of his time. He does not have a tracker of prompt, refine-count, and cost, so a lot of routing is still feel. Provider docs are good. People do not read them.
- He has moved toward Mike on this: model and provider matter less than the harness and the effort. He is an Anthropic user for most work. Put the model in the wrong job and the brand does not save you.
- He stops the slogan: define the harder task. People say “complex” and reach for the big model.
- Plan mode (Cursor; he assumes VS Code has it; Claude Code brainstorming skill as the same move): gather requirements in context, ask a few clarifying questions, write a detailed plan you can save as markdown and re-read. He will generate multiple plans from the same prompt before he trusts one. Planning a long or branching job belongs on a higher model, including Desktop Bridge report design when the design itself is the hard part. Execution of a written plan does not have to be Opus. Meal analogy: boil water, add tomatoes, sauté. You do not need a chef to follow the card.
- The game, his scores, lowest model he thinks gets by (not his favorite):
  - Tenant inventory, list artifacts, no descriptions: **low** (simple search). Mike opened at high, then walked toward medium.
  - Relationships on a ~10-table model with ample requirements: **medium**. Matched Mike.
  - DAX measures, bare model, ample requirements: **high for the plan and high for the write.** He does not want the refine loop when the context is wrong. Mike splits high-plan / medium-write, then adds a separate high pass for data-quality tests. Do not merge those into one score.
  - Report design via skills or Desktop Bridge: **medium.** More model is not better; it overcomplicates the report. Mike said high.
  - Notebook to a lakehouse, transformations: **medium** (low if good examples already exist). Agents copy patterns. Point them at a sample connection instead of buying a smarter model.
  - “Build a medallion architecture,” his deliberately vague closer: he does not score it. Mike does high plan, medium create, Fabric MCP for the items. Leave Mike’s score attributed.
- Close he parks for another episode: instructions dictate the outcome regardless of model. That episode already shipped as the harness posts. Do not redraft it here. Use one sentence as the reason the routing card exists.

**Attribution:** Tommy on plan-vs-execute, the chef card, Anthropic-but-harness-wins, the verification story, and the six scores above. Mike owns monthly active agents, the people-in-an-org model analogy, “code writer should not reason,” DAX test-page workflow, Cerebras, and Jevons. Kurt owns the August article’s matrix.
**Freshness:** leftover vs context-harness / Stop Re-Prompting (instructions beat the model) and Same Prompt, Two Reports (give Bridge a spec). This is **which model runs which Fabric job**, not another harness essay and not another Bridge-spec essay.

## Other angles

### Define “Hard” Before You Buy the Big Model
**Thesis:** Complex is not a model tier. Reasoning through alternatives (architecture, a report, an email with a position) is a different job from search, file moves, or a function with a specified input and output.
- His interrupt of the slogan. Thin alone. Fold into write-first as the lede.
**Plot:** opinion. One section, not a post.

### Natural Language Builds a Fabric App, Not a Power BI Report
**Thesis:** Microsoft’s self-service holy grail (describe it, get the insight) showed up at FabCon as a Fabric App generated from a semantic model, with writeback, shared state, and operational workflow. The best path for natural-language visuals is an app (HTML / TypeScript), not the Power BI framework, because the framework is intricate by design. He flags the governance parking lot: this will feel like managed self-service and it will sprawl.
- He also clocks the semantic-views image as a YAML file in OneLake and hopes it is Snowflake’s OSI schema. That thread pays off in 569. Do not write the OSI post from this episode.
- Mike owns “start on the web, Desktop is a miss.” Tommy explicitly tables the Desktop fight to stay on the app-vs-report point.
**Plot:** opinion. Overlaps 563 / 566 app-vs-report. Leftover unless a client has already shipped the NL app and hit the governance wall.

### Database Agents That Can Wear Your Skills
Two sentences in the FabCon post: database-agent capabilities exposed through MCP and skills, on operational data in OneLake. He reads that as “I can install my own skills and MCPs,” and he is not sure he read it right. Mike thinks it will look like today’s data agents (instructions, not a refined skill upload).
**Plot:** skip until the docs confirm whose skills they run.

### Don’t Write Monthly Active Agents as His Metric
He floated monthly active tokens. Mike shot it down (optimize tokens, don’t count them, or everyone sits on the most expensive model). The agent-count metric is Mike’s. Tommy only picks it back up as a callback in 569.
