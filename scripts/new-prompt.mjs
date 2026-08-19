#!/usr/bin/env node
// Scaffold a new prompts-library artifact:
//   npm run new-prompt "My Artifact Title" [category-id]
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CATEGORIES, CATEGORY_IDS } from '../src/lib/prompt-categories.mjs';

const args = process.argv.slice(2);
// A trailing arg that matches a category id is the category, not part of the title.
const category = CATEGORY_IDS.includes(args.at(-1)) ? args.pop() : CATEGORY_IDS[0];
const title = args.join(' ').trim();

if (!title) {
  console.error('Usage: npm run new-prompt "My Artifact Title" [category-id]');
  console.error('\nCategories:');
  for (const c of CATEGORIES) console.error(`  ${c.id.padEnd(18)} ${c.label}`);
  process.exit(1);
}

const now = new Date();
const yyyy = now.getUTCFullYear();
const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
const dd = String(now.getUTCDate()).padStart(2, '0');
const slug = title
  .toLowerCase()
  .replace(/['".,!?&:;()]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const dir = join('src', 'content', 'prompts');
mkdirSync(dir, { recursive: true });
const file = join(dir, `${slug}.md`);
if (existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}

const body = `---
title: "${title}"
description: "TODO: one-sentence summary of what this artifact is (shown on /prompts/)"
category: ${category}
date: ${yyyy}-${mm}-${dd}T${String(now.getUTCHours()).padStart(2, '0')}:00:00Z
format: markdown  # badge text: markdown, dax, python
source:
  permalink: "YYYY/MM/DD/post-slug"  # must match an existing post's permalink
draft: true
---

One or two sentences on what this is and when to reach for it.

\`\`\`markdown
Paste the full artifact here. The library holds the complete version;
the post only shows a slice.
\`\`\`

## Adapting it

- The load-bearing line and why it matters
- What to change for your own tenant or practice
- The mistake this prevents
`;

writeFileSync(file, body);
console.log(`Created ${file} (draft: true)`);
console.log(`Category: ${category}`);
console.log(`When ready: set draft: false — URL will be https://promptingbi.com/prompts/${slug}/`);
