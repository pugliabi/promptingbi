---
title: "Skill Library Playbook: How a BI Team Owns Its Agentic Knowledge"
description: "The one-page playbook a BI team keeps next to its shared skill library: where skills live, how they're added, reviewed, and maintained, and the monthly check that says the knowledge is distributed."
category: playbooks
date: 2026-09-30T09:00:00Z
format: markdown
source:
  permalink: "2026/09/30/distribute-the-wisdom"
draft: false
---

A skill library only counts as shared when the team adds to it without the person who started it. This page is how a team keeps one alive after the consultant (or the one person who knew everything) steps back. Keep it next to the library, in the same repo.

```markdown
# Skill Library Playbook

One page. If it grows past one page, it is a skill, not a playbook.

## Where it lives
- Source of truth: the skills folder in the team repo. Nothing counts
  until it is merged there.
- Team-facing copy: synced to Notion for reading and discussion.
- Every AI tool we use points at the repo folder. If a skill only works
  in one tool, it is not done.
- Meeting recordings and transcripts live beside the library, so
  "I think we talked about this" is a search, not a guess.

## Adding a skill
1. Anything you explained twice, or an agent got wrong twice, is a
   candidate. Open it as a draft.
2. Write it so a colleague could follow it without the agent, and an
   agent could follow it without the colleague.
3. Name an owner in the front matter. A skill with no owner is a draft.
4. If it references a measure, the measure must be in the definition
   register with a business definition and an owner. No register entry,
   no merge.

## Reviewing
- One other person reads it before merge. Not the author's agent.
- Anything touching production, credentials, or a certified measure
  gets reviewed by the platform lead.
- Anything that grants an agent new reach (a workspace, a service
  principal, a secret) follows the agent access pattern, not the
  author's judgment.

## Maintaining
- When you override an agent, the override goes into the skill the same
  day. Not into chat. Not into your memory.
- Every skill gets opened once a quarter by its owner. Still true, or
  deleted. Stale is worse than missing.
- When the platform changes (new workspace, renamed table, new
  deployment stage), the person making the change updates every skill
  that mentions it in the same pull request.

## Roles
- Library owner: decides structure and naming, runs the quarterly sweep.
- Reviewers: anyone on the team, rotating.
- Production approver: the platform lead. Skills never approve their own
  production changes.

## Success check (monthly)
- [ ] Someone other than the lead added a skill.
- [ ] An agent answered a question the lead used to answer.
- [ ] An override made it into the library within a week.
- [ ] No skill references a measure missing from the register.
- [ ] The lead could be unreachable for a week and nothing would stall.
```

## Adapting it

- **"If a skill only works in one tool, it is not done."** This is the line that makes the library shared. A skill tuned to one person's Claude setup is personal tooling with a team label on it.
- **"Write it so a colleague could follow it without the agent."** Skills that only an agent can parse stop getting reviewed, and unreviewed skills drift.
- **"No register entry, no merge."** Skills are procedural and lean on definitions. Without this rule, agents follow perfect instructions toward a measure nobody defined.
- **"The override goes into the skill the same day."** This is the loop that turns individual judgment into team knowledge. Skip it and the same correction gets made in five different chats.
- **"Stale is worse than missing."** A missing skill makes the agent ask. A stale one makes it confidently wrong. Delete freely.
- **Keep the last success check.** "The lead could be unreachable for a week" is the one test you can't pass by writing more files.
