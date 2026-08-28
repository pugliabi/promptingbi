# Ep 549 angles — Training Staff on Agents for DAX

Ore file. Draft later from `transcripts/ep-549.txt`. Do not treat this as the article.

- Episode: 549
- YouTube: https://www.youtube.com/watch?v=C68t4grCD6Y
- Notion: https://app.notion.com/p/397e74c69c1880d58dd6fcbb00a36ed8
- Transcript: `transcripts/ep-549.txt`
- Source: YouTube auto (no speaker labels). Empty Notion meeting note on the episode page. YouTube fallback.

Mailbag (Lee, insurance) is the prompt, not the article. Skip vacation banter.

**Mike-only (do not write as Tommy):** intern/CS-stack architecture layer; Power Designer DAX hardcoded week-6 vs week-5; CALCULATE ALL catch as his experiment; Copilot DAX is garbage; Joe Zuneth token-fleece post; 60/20/20 senior split; “maybe stop hiring juniors.”

## Locked decisions (2026-08-28, from Tommy)

- **Title:** Agents Raise the Floor and Lower the Ceiling.
- **Merge in `backlog/2026-08-08-reviewing-is-the-new-writing.md` (ep 537)** and retire that draft. Take: "my MCP server is my junior developer", reading-vs-writing as separate skills, the question bank, trust as the final differentiator. Drop its "looks Italian to me" analogy (same job as the orchestra).
- **Extended analogy: "you can direct the orchestra because you played in it"** (ep 541). Keep the ep-541 Notion Idea row alive; Tommy wants a dedicated orchestra post later.
- **No JavaScript.** The self-own is C#: ships apps in it, is not a C# senior.
- **Punch level:** recommend proving the fundamentals, framed as sequencing rather than gatekeeping, and stay honest that nobody knows how this plays out yet.
- **Scope:** ~2,300–2,600 words. Two code blocks (YTD-with-no-calendar trap, the explain-this-DAX eval). Banner + 3 diagrams. One `/prompts/` artifact under `playbooks`: the DAX readiness gate.

**Verified adjacent Tommy lines (quotes confirmed in transcripts):**
- Ep 522: "utilizing AI's not just so you don't have to do the work. It frees up your own time as long as you have the expertise and the background knowledge."
- Ep 528: "if I were to hire someone to say, 'Yeah, 95% of what I do is agents and I have workflows and AI and I don't write DAX anymore.' Are you hiring that person?"
- Ep 530: "If I was writing a math test for AI, and I stunk at math, how would I validate that?"
- Ep 494: an MCP against a semantic model "almost screams beginner... an intern could do that." (Tommy's own bull case for the raised floor.)

**Not a real quote:** "a skill.md is extra markdown, not scar tissue" — paraphrase, never said. Do not use.

## ★ Write first: Agents Raise the Floor and Lower the Ceiling

**Thesis:** Give DAX agents to juniors who have not had the filter-context mind shift and you make them productive while capping how far they can go. Prove the fundamentals first. Then the agent is leverage instead of a token furnace.

**Material (Tommy):**
- Mailbag fork: insist on SQLBI / DAX courses, or let them drive straight into LLMs. Tommy: insist. First months of DAX with no agentic tooling, then an eval that they can actually see what to look for.
- Three gates before tools: how Power BI wants calculations to run, filter/eval context, semantic modeling. Reading Russo’s filter-context chapter seven times is not the shift. Doing it is.
- Study-guide analogy: he did not learn it until he wrote it down. Knows JS/TS conceptually because he ships apps with agents writing the code, not because he is a JS senior. Same trap for a DAX junior.
- With skills already baked in, juniors can do a lot. That is the raised floor. Without time in the work, they will not shine when they have to, and you have lowered the ceiling.
- Then agents become an org asset: less senior QA, fewer tokens, and you did not kneecap their career.

**Attribution:** Tommy (mic-drop close). Mike: walk them into a smaller shallow end, weeks not months. Do not adopt Mike’s “stop hiring juniors.”
**Freshness:** fresh. Distinct from You’re AI Ready (org definition / delivery). Distinct from 548’s pipeline-QA take if this stays on career + DAX gates.

## Other angles

### You Can’t Prompt Filter Context You Don’t Have
**Thesis:** DAX is not a syntax language. Until someone can explain why a measure works in a table and goes blank on a card, they cannot describe the output an agent should produce.
- Unlike Python, you do not need the whole function zoo. CALCULATE, FILTER, time intel cover most of the work. The hard part is the result.
- Classic aha: works on a row, blank on a card, totals lie. You do not get that from generating code.
- DAX is never “wrong.” It does exactly what the formula asked. Wrong number means you asked wrong.
- Prompting without filter context is extremely hard even with a modeling MCP and Fabric skills. Most “confidently wrong” case in this stack is DAX: the card looks fine.

### Better DAX Is a Better Model
**Thesis:** Year-to-date without a date table will look right and still be wrong per product. A junior with an agent will ship that unless they can see the model, not just the number on the card.
- DAX is the model: measures + relationships are the business logic. Want better DAX, fix the model, or push the calc upstream.
- Mailbag junior is probably also building the model. Skip the calendar, ask for YTD, DAX uses whatever is on the fact.
- Training demo he always shows: totals look fine, one product shows YTD, the date table’s YTD is empty, because each product’s latest date is the “year.”

### Talking to an Agent Is Not Google
**Thesis:** Untrained chat against a DAX agent is the same failure as writing bad DAX by hand, except you are paying rent on a problem you already solved.
- Cannot treat Claude Desktop / CLI / VS Code like search and “go crazy.” There is a proven approach. Same as swinging at a baseball.
- Junior cannot QA eval context they do not have, so the mess lands on the senior. QAing DAX is not a fun job.
- Agrees with Mike that seniors should get head-knowledge into skills/custom agents. Still stuck on: if they only prompt, how do they become the senior?
**Freshness:** adjacent to Don’t Let Agent Touch Fabric and 548 QA-architect. Keep this one on DAX QA + chat discipline.
