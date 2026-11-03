# Ep 573 angles — The table does not arrive with the item

Ore file. Draft later from `transcripts/ep-573.txt`. Do not treat this as the article.

- Episode: 573
- Title: Fabric Deployment Plan
- YouTube: https://www.youtube.com/watch?v=9_ssMBFK9GE
- Notion: https://app.notion.com/p/3f2e74c69c18808cb800ee70e55e66c8
- Transcript: `transcripts/ep-573.txt`
- Aired: 2026-10-20 (RSS pub Tue 20 Oct 2026). No guest.
- Source: YouTube auto (no speaker labels). Learn docs they unpack: https://learn.microsoft.com/en-us/fabric/cicd/deployment-plan/how-to-create-deployment-plan and https://learn.microsoft.com/en-us/fabric/cicd/deployment-plan/deployment-plan-sample-plans
- Notion agenda topic: Filling a Gap with Fabric Deployment Plan. GPT and Claude agendas exist. Gemini was off.

**Mike-only:** A plan is not a pipeline. It executes items in an order. Reporting teams he knows are dev and prod: build models, push a report. PBIR and TMDL (caption: "Tim Dale") make smaller diffs. Getting data into the items is a different problem from deploying them. Three environments, three data sets. A parent pipeline cannot deploy until the child pipelines exist. He has failed that deploy. If the team already understands git integration, he does not think they need deployment plans. GitHub Actions can sequence the API calls, run the notebooks, and take information back. Plans are the help when you are stuck on pipelines and data loading. Shortcut landmine: Snowflake or Databricks, table missing upstream, pipeline deploy fails and reverts to the dev shortcut instead of staying broken. His example is "Tommy's baseball data." Do not give Tommy the revert. His triad, in the turn that names Tommy: infrastructure, code, and data. "There is no data deployment." Pipelines cover the item. They do not cover the data. Redeploying code into the same notebook ("Tommy's amazing notebook") is not an infrastructure change. He thinks plans can use variable libraries and he has not checked. He writes deployment actions with an agent. An org that blocks the model leaves you writing the action alone. Fabric as a backend, in his telling, needs agents on the deployment. GitHub Pages was intimidating until an agent made the Action a one-liner. Consulting pay compresses. A 15-year engineer with AI beats a novice with AI. Tipping point, no going back. Release engineer touches test and prod. Developers only touch development. A little pipeline experience is required before a plan. Semantic model plus report was the old pipeline job. Deplavity spot, the 94%, the four-hour refresh. Joke. Do not cite it.

**Unlabeled, so out of his mouth:** The sharpest lines name neither host. Do not assign them. "It wasn't a bug in the pipeline, it's a bug in lineage." "Lineage is good for metadata, but not good for the developer." That turn repeats "the table doesn't arrive," which he already said while addressing Mike. The repeat is not a second claim. Variable-library GUIDs and dev, test, prod parameters are the next turn, and that one names Tommy, so they are Mike's. So is the triad. The sales-lineage narration where every item copies at once and you only get two of the three. "Deploying simultaneously." Happy medium between pipelines and full GitHub Actions. "You don't have to have GitHub Actions experience." The plan is the UI so you do not need an agent. No agent is a barrier to entry. The October 20, 2026 timeout: pretty canvas, and are we already refusing anything that has no agent. The pay-cut bit. "Well, it would not be built." Ratings took about a week. A public site that reads Fabric on every hit is too expensive. `plan.yml` is not meant for a user to write, logical IDs, still preview. "I will not recommend anything in preview until GA" for production. Culture, git chops, deployment team versus a team that only wants the UI. One plan cannot deploy to more than one workspace in a single run. One plan per deployment operation. File size and group length ("pretty large"). "Wait for GA, but I'm going to be very antsy." Fabric policies opinion: he will not hand out Fabric while dataflows cannot be turned off, the center of excellence has more to govern, real-time is not for everyone, he has not played with policies. Dataflows Gen1 rated above Gen2. "Yeah, I think so, too" on variable libraries. Both names, so unassigned: the welcome only. No claim.

Skip: intro song, outro, the lyric that names Mike, Chicago meetup, deplavity. Data-agent news is him reading a changelog (schema exploration, markdown guidance, accuracy "they said" 89 to 92 and 78 to 90, rollout November 2 to 10). The only opinion in that turn is that enterprise definitions live outside the database. Thin, and it is not this post. Fabric policies in his mouth are a feature list: tenant and capacity, item creation, security groups, dataflows Gen2, external sharing coming soon. No stance until the unlabeled paragraph above. Ratings launch is already published. Do not re-mine it.

**Do not rewrite:** [Why I Built Fabric Credit Ratings](/2026/10/26/why-i-built-fabric-credit-ratings/) already merged this episode's ratings news with ep 570. Letter grades, the anonymous-access admin flow, and GitHub Pages in front of Fabric are that post. Also [Anonymous Access Lets Fabric Apps Leave the Tenant](/2026/10/14/anonymous-access-fabric-apps/); [Fabric Is Best as a Backend](/2026/10/05/fabric-is-best-as-a-backend/); [Don't Let Your Agent Touch Fabric Until It Reports Back](/2026/08/17/dont-let-your-agent-touch-fabric/); [Fabric Task Flow Studio](/2026/08/21/fabric-task-flow-studio/) (he never says task flows); [Before the Fabric Adoption Roadmap](/2026/07/27/step-zero-before-the-fabric-adoption-roadmap/); [You Don't Have an AI Strategy](/2026/09/09/you-dont-have-an-ai-strategy/); [Central BI Is a Tiger Team Now](/2026/09/18/central-bi-is-a-tiger-team-now/).

Adjacent: ep 570 PADU. There, git preferred, pipelines and plans accepted, and publish-direct unacceptable are Mike. Tommy asked where git and pipelines land and did not answer. Do not paste that card in here. This episode is him placing pipelines, not a second PADU post. Ep 568 is the FabCon feature draft and does not mine plans. Ep 563's lineage REST graph is a different claim.

## Best plots

- **Write first:** opinion. Lineage deploys the lakehouse before the warehouse view, and the table is still empty because the notebooks have not run. The plan is that sequence. He would only bring pipelines back with the plan. Git stays essential.
- How-to: no. He names groups, steps, actions, dependencies, post-deploy notebooks, YAML, and a canvas. He does not state schema, action syntax, or the doc limits.
- Artifact: none. `plan.yml` is unlabeled.
- Honest: the GA verdict, the limitation list, the "bug in lineage" slogan, and the infrastructure/code/data triad do not name him. Leave them out until he claims them.

## ★ Write first: The Table Does Not Arrive with the Item

**Thesis:** Lineage can order the lakehouse before the warehouse view and still be wrong. The rows are not in the item definition. Two notebooks produce them at runtime. A pipeline that copies the items builds the view against nothing. The plan is the sequence lineage cannot see: populate the lakehouse, then deploy the view. He would not bring deployment pipelines back without that. Source control stays the essential piece.

**Plot:** opinion. One scene, the sales lakehouse and the warehouse view. "Pipelines were Power BI" is the closer, not a second post. Do not teach YAML. Do not teach the Learn sample as a tour.

**Material (Tommy):** Paraphrase except the quotes. The caption says "get." He means git.
- He calls it a process changer, addressed to Mike. Use it and the team changes intake, the actions, and the expectation immediately, or it does not work. He does not describe the new intake. Do not invent one.
- Pipelines fell off once git was the standard. They still made sense. They felt like a different flow from source control and the workspace, and he did not know whether to use both. "Is your workspace" in the same breath is muddled. Do not turn it into "the workspace is the repo."
- Plans, as he describes them to Mike, are the GitHub Actions idea: on a change, defined actions run. A workspace states an explicit order. He also says "deployment in order of time" and does not define it. Do not invent a schedule. Create the table, then load it. Automated actions before or after a deployment. Dependencies pipelines did not have. Lineage captures some of them. "Fabric lineage is great, but it does not encompass everything." The same plan can run with git integration, deployment pipelines, or the REST API. He does not rank those. The star, in his words, is a sequence lineage would not recognize, and running notebooks, pipelines, or other supported items before or after. He wants lineage dependencies and custom deployments. He does not define custom. A pipeline still cannot run an action in the middle.
- "Can I reuse deployment pipelines now?" Yeah. But you have to use them with a deployment plan. He counts three parts: deployment groups, the steps, and actions. The plan is YAML. He had not noticed. He likens it to GitHub Actions.
- The failure, addressed to Mike. Lineage sees that a warehouse view references a lakehouse table, so it deploys the lakehouse first. It does not show that the table must be populated before the view is valid. "The table doesn't arrive with the item definition." Two notebooks produce it at runtime. Deploy in that order without the notebook actions and "it's going to fail every single time." Items are copied, the view and the table are created, and the view points at something that does not exist because the notebook has not run. With a plan: lakehouse, run the notebook so the table exists, then the warehouse view.
- The sales shape he does claim. Two deployment groups, sales lakehouse and sales warehouse. The lakehouse item has two post-deploy actions, first notebook then second. The warehouse item depends on the lakehouse being complete. He once calls that second group "the second deployment plan." Treat that as a slip. Do not invent two plans. The doc narration that everything copies at once is unlabeled. Do not add it.
- Clients have been asking him where git and deployment pipelines stand. His answer in that turn: he recommends source control and git. He was not adverse to pipelines. They did not have everything, so he did not treat them as essential. Source control is high on his list regardless of GA. That sentence is about source control, not about plans. He does not say "adopt plans this quarter." The "do we invest today" question is unlabeled.
- Canvas, one beat. YAML in the back, built in the UI. He does not say you need no GitHub Actions experience. That is the next unlabeled turn.
- Later, thinner. The plan has a clear job and a clear way to build it. He hopes testing is part of it. He does not say he tested one. Git integration means the YAML can live in source control. If Mike wanted an agent on it, it is YAML and it smells like GitHub Actions. Stop there. Logical IDs, `plan.yml`, and "not meant for a user to create" are unlabeled.
- The closer, addressed to Mike. "Deployment pipelines were Power BI and deployment plans are to Fabric what deployment pipelines are to Power BI." Data engineering is where pipelines missed. For lakehouses and notebooks he finds the plan easier to grasp and create than a pipeline. Semantic models only needed a pipeline. A Fabric shop should find the plan easier to think about. He then says it is in preview and points Mike at the deployment-plan actions page and the create page. He does not list the limits in that turn.

**Attribution:** Tommy on the process change, pipelines feeling detached from git, reuse only with a plan, the empty view, the two sales groups, source control staying essential, the canvas, and pipelines-were-Power-BI. Mike owns "if you already live in GitHub Actions you do not need this," the shortcut that reverts to dev, "pipelines do not cover the data," the release engineer, and the agent that writes the Action.
**Freshness:** Ep 570 left git and pipelines on Mike's card because Tommy only asked. This is his answer, and it is narrower than that card. Not a task-flow post. Not another "do not let the agent touch Fabric."

## Other angles

Recommend folding the Power BI line into the write-first as the closer. Tommy has not picked.

### Pipelines Were for the Semantic Model
**Thesis:** A report and a model only needed a pipeline. Lakehouses and notebooks need the plan, and he finds that plan easier to grasp than the pipeline it replaces.
- Powers it: the closer quote, and "easier to get a grasp on and then easier to create."
- Do not build a maturity ladder. He does not say semantic-model teams must not use a plan. He says the plan makes less sense there.
**Plot:** recommend as the closer of the write-first. Not its own post.

### Git Stays. The Pipeline Comes Back with the Plan.
**Thesis:** He kept recommending git and let pipelines slide because they could not run the middle action. The plan is the reason to use a pipeline again. Git does not get demoted.
- He rejects "I was always adverse to pipelines." Do not write that he abandoned them.
- Ep 570's "git preferred, plans accepted, publish outside the pipeline is unacceptable, agents make git mandatory" is Mike. Do not import it.
- "Invest today" is unlabeled. Mike's answer is culture and existing Actions, not a yes.
**Plot:** fold into the write-first as the reason. Same post.

### The Canvas Is the Action, Until the YAML Leaves the UI
**Thesis:** He thinks the win is a canvas that emits GitHub-shaped YAML, so the sequence is in the product and can still sit in git.
- His attributed slice is one comparison plus "smells like" YAML in source control. Thin.
- "No GitHub Actions experience required," "the YAML is not for a user to write," and "you do not need an agent" are unlabeled.
- Mike's opposite, an agent should write every Action, is the landmine. Drafting a debate here becomes Don't Let Your Agent Touch Fabric.
**Plot:** one sentence inside the write-first. Demote anything larger.

### No Agent Means You Will Not Touch It
**Thesis:** He balks at the idea that, as of October 20, 2026, a feature with no agent is a barrier, on a canvas he calls intuitive.
- The timeout, the canvas compliment, the pay-cut, and "it would not be built" name neither host. A listener would call the timeout Tommy. The turns do not.
- Mike owns the agent-written Actions, the GitHub Pages one-liner, and the tipping point.
**Plot:** blocked until he claims the timeout.

### Wait for GA, and Look at the Limits First
**Thesis:** He wants the plan and he will not put a preview on a production workload.
- Attributed: "this is in preview," and look at the actions page and the create page.
- The limit examples and "wait for GA, but antsy" name neither host. So does "I will not recommend preview for production." Do not give either sentence to him or to Mike.
**Plot:** blocked. One clause in the write-first once he confirms the wrap-up was his. Do not copy the limits in from the docs.
