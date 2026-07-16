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

const file = join('src', 'content', 'blog', `${slug}.md`);
if (existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}

const fm = `---
title: "${title}"
date: ${yyyy}-${mm}-${dd}T${String(now.getUTCHours()).padStart(2, '0')}:00:00Z
permalink: "${yyyy}/${mm}/${dd}/${slug}"
description: "TODO: one-sentence teaser (under 160 chars)"
draft: true
---

Write the post here.
`;

writeFileSync(file, fm);
mkdirSync(join('public', 'images', String(yyyy), mm), { recursive: true });
console.log(`Created ${file} (draft: true — flip to false to publish)`);
console.log(`Image folder ready: public/images/${yyyy}/${mm}/`);
console.log(`URL will be: https://promptingbi.com/${yyyy}/${mm}/${dd}/${slug}/`);
