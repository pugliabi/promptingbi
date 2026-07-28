import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
  }),
});

export const collections = { blog };
