import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    permalink: z.string(), // original WordPress path, e.g. "2024/07/17/slug"
    featured: z.string().optional(),
    draft: z.boolean().default(false), // true = never built or listed
  }),
});

export const collections = { blog };
