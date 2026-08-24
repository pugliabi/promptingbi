#!/usr/bin/env node
// Scaffold a new blog post: npm run new-post "My Post Title"
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new-post "My Post Title"');
  process.exit(1);
}

const now = new Date();
const yyyy = now.getUTCFullYear();
const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
const dd = String(now.getUTCDate()).padStart(2, '0');
const slug = title.toLowerCase().replace(/['".,!?&:;()]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

const draftsDir = join('src', 'content', 'blog', 'drafts');
mkdirSync(draftsDir, { recursive: true });
const file = join(draftsDir, `${yyyy}-${mm}-${dd}-${slug}.md`);
if (existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}

const fm = `---
title: "${title}"
date: ${yyyy}-${mm}-${dd}T${String(now.getUTCHours()).padStart(2, '0')}:00:00Z
permalink: "${yyyy}/${mm}/${dd}/${slug}"
description: "TODO: one-sentence teaser (under 160 chars)"
# featured: /images/${yyyy}/${mm}/${slug}.png  # uncomment once the hero image exists
tags: []  # leave empty and run \`npm run auto-tag\`, or list slugs from src/lib/tags.mjs
draft: true
# source:                    # editor-only; omit if not from an EMP episode
#   episode: 544
#   title: "Episode Title"
#   notion: "https://app.notion.com/p/..."
---

Open with a hook: 2-3 sentences on the idea itself. Ask a question, then answer it. No em dashes.

State the thesis in a line or two.

## First Point

Develop one idea with your reasoning, a vivid analogy, and a concrete example.

<!-- Screenshot: paste with Ctrl+Alt+V (saves to public/images/${yyyy}/${mm}/) or drop a file there, then:
![Descriptive alt text](/images/${yyyy}/${mm}/example.png) -->

## Second Point

<!-- Need a diagram? Use a mermaid block (renders on the page, no image file needed):
\`\`\`mermaid
flowchart LR
  Source --> Insight
\`\`\` -->

## What To Do With This

What a Power BI / Fabric / BI pro should actually do. A short "this week" list works well.

## Takeaways

- 
- 
- 

Short closing opinion and a forward-looking prediction. Light CTA: stick around PromptingBI.
`;

writeFileSync(file, fm);
mkdirSync(join('public', 'images', String(yyyy), mm), { recursive: true });
console.log(`Created ${file} (in drafts/, draft: true)`);
console.log(`When ready: move to src/content/blog/published/${yyyy}-${mm}/ and set draft: false`);
console.log(`Image folder ready: public/images/${yyyy}/${mm}/`);
console.log(`URL will be: https://promptingbi.com/${yyyy}/${mm}/${dd}/${slug}/`);
