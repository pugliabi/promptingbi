import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_IDS } from './lib/prompt-categories.mjs';

const blog = defineCollection({
  // Only published/ + drafts/ are loaded. backlog/ is ignored (ideas/outlines, never on site).
  loader: glob({ pattern: '{published,drafts}/**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    permalink: z.string(), // original WordPress path, e.g. "2024/07/17/slug"
    featured: z.string().optional(),
    tags: z.array(z.string()).default([]), // lowercase kebab-case slugs, see src/lib/tags.mjs
    draft: z.boolean().default(false), // true = never built or listed
    // Editor-only: silences `npm run scan-prompts` for a post whose code blocks
    // don't belong in the /prompts/ library. Not rendered on the site.
    promptsExempt: z.boolean().default(false),
    // Editor/agent-only: EMP episode that inspired the post. Not rendered on the site.
    source: z
      .object({
        episode: z.number().optional(),
        title: z.string().optional(),
        notion: z.string().url().optional(),
        youtube: z.string().url().optional(),
        transcript: z.string().optional(),
      })
      .optional(),
  }),
});

const prompts = defineCollection({
  // The /prompts/ library: full copy-paste artifacts (instruction pages, briefs,
  // validation cells). Flat folder; draft: true is the only gate.
  loader: glob({ pattern: '**/*.md', base: './src/content/prompts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // one-liner shown on the /prompts/ index
    category: z.enum(CATEGORY_IDS as [string, ...string[]]), // see src/lib/prompt-categories.mjs
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    format: z.string().default('markdown'), // badge text: markdown, dax, python
    // The post(s) this artifact came from. Each permalink must match an existing
    // post's permalink; titles are resolved at build time. A list is allowed so a
    // composite artifact (assembled from two posts) backlinks to both.
    source: z
      .object({
        permalink: z.union([z.string(), z.array(z.string()).min(1)]),
        label: z.string().optional(),
      })
      .optional(),
    draft: z.boolean().default(false), // true = never built or listed
  }),
});

export const collections = { blog, prompts };
