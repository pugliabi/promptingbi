# Ep 575 angles — Don't spend Fable on the schema

Ore file. Draft later from `transcripts/ep-575.txt`. Do not treat this as the article.

- Episode: 575
- Title: Choosing the Right Model In Fabric
- YouTube: https://www.youtube.com/watch?v=oB9GQPX_7Fc
- Notion: https://app.notion.com/p/3dee74c69c1880af80e7d57860f2a402
- Transcript: `transcripts/ep-575.txt`
- Aired: 2026-10-27 (RSS). YouTube uploaded 2026-10-28. Duration 1:05:37. No guest.
- Source: YouTube auto (no speaker labels).

**Mike-only:** Optimization era, and "if I just ran Opus 5 for everything." Tommy never says Opus 5. Hydrofusion as a router that splits one prompt across models. Cache that cannot move to the next model. Jev / a purpose-built classifier cheaper than a frontier model, then Satya's Surface, 128 GB VRAM, the software factory, a $3-5k laptop. Theme Generator since 2017, and the shift from designing the UI to building for the CLI because three or four agents sit behind one person. Cursor usage CSV, three sentences, light and dark, questions written back into the report, "See where your numbers came from." The close of that demo names Tommy. The long setup does not. Treat the panel as his. Claude's license once Slack or Drive is connected: unprotected, not sanctioned. Grokbot per repo, Rifty, computer use, Grok 4.7 as the daily models, output over token price. Wrap: mix of XAI and Claude, "Claude seems to be like Tommy's winner," a little GitHub Copilot, not much M365 Copilot, and most of his agent work is not inside fabric.com. The next turn (fabric.com agent mode is ineffective, VS Code, MCP, Claude desktop or Grokbot, APIs up and down) names nobody. Do not glue it into Tommy's stack. He also puts last week's time split on Tommy: over 60% in an agent, and "95% of your time when Tommy is working on models" in Desktop. Those are his characterizations. The 95% speech itself names nobody.

**Ambiguous (names both, do not assign):** The welcome. The outro song. The hot one: "I personally don't want fabric apps, the fabric experience in Power BI desktop, and Power BI desktop reports" for visualization, centralized place to look, React or npm packages he can still modify. Same turn then says "Tommy" and moves into Claude design and Claude dashboards. A listener will give Tommy the three-surface refusal. The turn is contaminated. Leave the whole thing out.

**Unlabeled (discard):** Dangerous lines a draft will steal:

- Vega/React: "where am I using this?" Power BI, Desktop Bridge, a Fabric app, or the Fabric app inside Desktop. "I like it, but I don't love it." Fabric app is agent-dependent. Power BI is still user-dependent. He did not see the surface in the article.
- "Power BI is a model-based tool." Desktop, "95% of the time," is a semantic model tool. Direct Lake, manual, no save-location worry. Desktop "becoming more and more irrelevant" because it cannot hook the agent you want. "Cloud and VS Code" for the Chicago build.
- Orgs "buy Claude," Claude icon in a customer's Excel, skip M365 Copilot, the call is "how do I build a report with Claude?"
- Leadership has analysts dump a file into Claude. "Why do I need a whole team of BI?" He parking-lots a two-part series. "One of my favorite experiences, too." Chronicles of AGI. None of that names Mike.
- "For me, it was a Fable everything." Fabric Copilot: you cannot pick the model per session. Admin has to enable Claude because of the OpenAI agreement. Grokbot is separate because he is not doing Fabric development there.
- Superpowers brainstorm on the higher model, then notebook execution "go back to Opus" or lower effort. Known unknowns get the higher model. Known knowns get the lower one. He pauses before Desktop. The `>>` that starts this turn is the word "on" after "recommendations." No host name. Do not glue it to the dictionary turn.
- Notion or a GitHub repo as the second brain. "Two context approach" on Prompting BI, from a user group "two months ago." Documented lakehouse schema, location, and purpose, then a much lower model. Superpowers writes "task 14" plus dependencies. Chef: "you don't have to be the best chef in the world," someone writes the recipe, someone follows it. He says that pattern has worked for Desktop Bridge, notebook skills, and a warehouse that talks to multiple systems. That chef sentence is the ep 567 title, and this turn names neither host.
- "Spin up some lower-end agents and go create these." fabric.com agent mode "not doing it for me."
- Warehouse news: the IPv6 example is contrived. Audience is not dashboard-in-a-day. Rayfin apps talking to warehouses. He is building a user-data-function skill. Translytical examples were a thin markdown file. None of that names Mike.

Skip: intro song, strep/syringe open, Mike's cold, outro, PADU song. Warehouse plus user data functions: his only attributed line is that it is like Azure Functions and "pretty powerful" for developers and DBAs, plus Microsoft's scenario list. That is a tour. The complaint is unlabeled. Do not write the news.

**Do not rewrite:** [The Context Harness and the Execution Harness](/2026/09/25/context-harness-execution-harness/); [Same Prompt, Two Reports](/2026/10/02/same-prompt-two-reports/); [Stop Re-Prompting](/2026/07/20/stop-re-prompting/); [A skill.md Is Not Wisdom](/2026/09/21/a-skill-md-is-not-wisdom/); [Don't Hire a Senior to QA the Agent](/2026/09/14/dont-hire-a-senior-to-qa-the-agent/); [Agents Raise the Floor and Lower the Ceiling](/2026/08/28/agents-raise-the-floor-and-lower-the-ceiling/); [Agent Skills Give the Power BI Pro Room to Think](/2026/10/07/agent-skills-give-the-power-bi-pro-room-to-think/). Ep 567 already holds plan versus execute, the six-job card, DAX high through the write, and Bridge medium. Ep 571 already holds the notebook toolkit in a sandbox.

Adjacent: 567 (this episode does not rescore that card); 571 (Mike's CLI and toolkit riff, do not restage).

## Best plots

- **Write first:** opinion. Fable does not get the schema. Pull a data dictionary first. The higher model starts only after the schema is known, and only for suggestions. The highest model thinks too much.
- How-to: no. He does not show a dictionary, a session handoff, or a notebook.
- Artifact: none. Do not rebuild the six-job card. He did not rescore it.
- Honest: plan versus execute is the frame he repeats, and the chef line is unlabeled. If the dictionary is only "plan first," this collapses into ep 567. It does not collapse while the high model is banned from the schema read. That is the opposite of ep 567, where the high model is the one that takes the raw situation and writes the plan.

## ★ Write first: Don't Spend Fable on the Schema

**Thesis:** The expensive model is the suggestion pass, not the discovery pass. People hear a complicated Fabric job, especially notebooks, and reach for the highest model at the highest effort. He will not do that with a schema. He pulls a data dictionary before Fable looks at the warehouse, reasons, and writes back. That pass takes too long and thinks too much, even on 2+2, even if money is unlimited. Notebooks, in the map he reads out, are probably a medium-effort session. A higher model waits until the schema is known, and only if he needs recommendations.

**Plot:** opinion. One scene: several systems, API calls into notebooks, how the tables relate, split across sessions. No routing card. No chef.

**Material (Tommy):**
- The false rule, addressed to Mike. Fabric work is not one default prompt. Workstreams he names: execute a notebook, find data, analyze data, plan the architecture, design with Desktop Bridge or the new npm packages. Conductor's era is a reference, not this post. "Most people they're like well I'm doing notebooks that's complicated. I should use the highest effort, the highest model. That's not always the case." He then asks Mike about Copilot, Grok, Claude, or OpenAI, from planning through execution and validating. He does not answer the menu. He does not describe validating. Do not add Gemini. Do not score Bridge. Naming Bridge is not a repeat of the ep 567 medium.
- Not one session. New project: discovery for API calls into Fabric notebooks, multiple systems, how they relate. Pulling the data, reasoning, and the discovery are not one session. Split what needs time from what is execution. He does not describe the handoff. Notion, GitHub, and "two context" are the unlabeled continuation. Do not import them.
- Haiku and Sonnet, pushed back at Mike. "They're actually good for a lot of things, but they're just not most of your situations." Concrete case, addressed to Mike: a Claude session names itself. That is Haiku, not Fable. The caption spells the example "hi who." Quick, does not need to be perfect. Ep 567 already said Haiku and Sonnet are fine once the job is defined. This is the example. One beat. He does not say he quit Haiku. That quitting line is Mike's. Same turn, still him: a pipeline across systems into a semantic model "sounds like all Fable." The listening part, "for me," is "an opus test," medium effort, basic coding, and it does not need to reason about the data. He tells Mike to read the provider docs. That medium is the listen, not the dictionary. He names Opus there. He does not name Opus 5, Sonnet 5, or Grok 4.7.
- The cut, next turn, and it names Mike ("I write this out, Mike"). "Rather than having Fable or the highest model with the highest effort look at the data and do the scheme, I'm going to pull that into a data dictionary first." Consumption is the reason he states. He will not connect the highest model at the highest effort to Fabric, look at all the data, reason, and push it back. You can. It takes a long time. "It may think too much for the job." All the money in the world does not change it. Test he offers, not a lab log: highest max effort, Fable, 2+2. It still gets 4, and it overthinks. Engineer dad, three pages on two plus two. Do not write that he timed a run. Do not price it. This turn names Fable. It does not repeat Opus.
- The map is the same turn. Notebooks: "I'll probably do it in this session. Medium effort." Once he knows the schema, "I'll probably use a higher model" for suggestions and recommendations. Three moves, all hedged. Do not merge them into ep 567's single "notebooks = medium." Do not score the dictionary pass medium. The "opus test" medium is the listen, one turn earlier. The notebook medium is this turn, and it is a session, not a score for the dictionary. The turn ends at "recommendations." Superpowers, "go back to Opus," and known-unknowns start at the next `>>` and name nobody.
- No score delta against ep 567. Notebooks stay a probable medium, and he does not repeat "low if good examples already exist." Silence is not a change. He does not mention DAX. He does not score Bridge. Leave the card where 567 put it.

**Attribution:** Tommy on the notebook-equals-max-model false rule, the split across sessions, Haiku for a session name, the listen-as-an-Opus-test at medium, the dictionary before Fable, the 2+2 overthink, and the probable medium notebook session plus a higher model for suggestions. Mike owns Opus 5, Hydrofusion, the Cursor provenance panel, the CLI shift, Grok as the daily driver, and "Claude is Tommy's winner."
**Freshness:** Plan versus execute is a retread. Demote it. Ep 567 sends the high model at the raw job to write the plan, then a cheaper model follows the recipe, with DAX kept high and Bridge kept medium. The chef sentence shows up here only in a turn that names neither host. What survives is the opposite assignment inside discovery: Fable does not read the schema. The failure he adds is overthinking, not the bill and not an over-decorated page.

## Other angles

### The Chef Card Is Already Published
**Thesis:** Plan on the expensive model, follow the recipe on the cheap one. He frames the hour that way and then does not rescore the jobs.
- Powers a drafter will grab, all unlabeled: Superpowers, task documents, "go back to Opus," known unknowns versus known knowns, the chef, and "this works for Bridge too."
- Attributed remainder: not one session, time versus execution, Haiku for a tag. That is a sentence inside the dictionary post.
**Plot:** demote. Thin against ep 567. Do not write it again.

### Haiku Names the Chat. It Does Not Run the Notebook.
**Thesis:** A session title is a small defined job. Haiku is enough. Fable is the wrong tool for it, and Haiku is still the wrong default for most of the work.
- He names Haiku and Sonnet as "good for a lot of things, but they're just not most of your situations."
- Do not import Mike's "I walked away from Haiku," Sonnet 5, or a price.
**Plot:** one paragraph in the dictionary post. Not its own article.

### Vega Is a Threshold. The Surface Is Not His Yet.
**Thesis:** He thinks Fabric is crossing into agentic analytics: Vega-Lite, React packages on npm, a data grid, Power BI styling, reusable components plus generated specs. "More than just Power BI desktop bridge or even those skills." He and Mike wanted the natural-language version in 2019. He names Daniel Marsh. Do not finish the surname from the unlabeled turn.
- The postable half is the doubt: which product runs this, and he does not want three visualization surfaces. That doubt is unlabeled, and the three-surface refusal is the both-names turn. Blocked.
- "Crossing a threshold" without the doubt is a news recap. Ep 567 already spent the natural-language-app argument.
**Plot:** do not ship until he claims the "where am I using this" turn.

### Not Even Close to Half
**Thesis:** The agent trend is real among believers. Asked of Mike: how many client orgs allow Power BI development to be purely agents? "We're not even close to half."
- The Claude-license, Excel-add-in, and "how do I build a report with Claude" stories name nobody. Do not give them to him.
- Drifts into floor-and-ceiling if it becomes an industry essay.
**Plot:** leftover. One line at most.

### Thirteen Tables, Tool Unnamed
**Thesis:** Chicago user group: 13 unrelated tables, about 28 relationships, about 35 measures, inside about 20 minutes.
- The previous turn says MCPs and simple instructions, and it names nobody. Later unlabeled turns say Claude and VS Code, and that Desktop cannot hook an arbitrary agent. Mike's 60% and 95% lines are Mike talking about Tommy.
- Do not write an MCP speed post from a number whose tool he did not claim.
**Plot:** blocked on the tool.

## Locked (2026-10-28)

- Draft: `src/content/blog/drafts/2026-10-28-dont-spend-fable-on-the-schema.md` (`draft: true`), permalink `2026/10/28/dont-spend-fable-on-the-schema`.
- Notion: https://app.notion.com/p/407e74c69c1881049719df195e9897ea (Drafting, Episode = 575 + 567).
- Artifact: `src/content/prompts/fabric-session-map.md` (`draft: true`, agent-briefs).
- Images: `public/images/2026/10/dont-spend-fable-on-the-schema-{banner,sessions,known-unknowns}.jpg`.
- Scope override: Tommy asked for the cross-transcript version, so the ep 567 six-job card is folded in as a table (not rescored), and the chef is used. This file's "no routing card, no chef" plot is superseded for this post.
- Attribution calls, pending Tommy's confirm: unlabeled continuation turns used as his. These are the Superpowers and task documents, "go back to Opus," known unknowns vs known knowns, the chef, Notion or GitHub as the second brain, "Fable for everything," and the Copilot-in-Fabric caveat. Mike's "does that resonate... same pattern I'm finding" reply is the structural tell.
- Mike-only material kept out: Opus 5, Hydrofusion, the Cursor provenance panel, the CLI shift, Grok, and "Claude is Tommy's winner."
- Leftovers: Chef Card and Haiku are consumed by the post. Thirteen Tables was filed as an Idea (https://app.notion.com/p/407e74c69c18812699b0c9ab1010d599) and Not Even Close to Half was filed as an Idea (https://app.notion.com/p/407e74c69c1881c5894ffc54f7a4feac). Vega was not filed because it collides with the existing "Pick a Visual Library. You Currently Have Two" row.
