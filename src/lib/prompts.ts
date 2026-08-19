import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES } from './prompt-categories.mjs';
import { publishedPosts } from './posts';

export type Prompt = CollectionEntry<'prompts'>;

/** URL for a prompt entry. The entry id is its filename without the extension. */
export function promptHref(prompt: Prompt): string {
  return `/prompts/${prompt.id}/`;
}

/** All non-draft prompts dated in the past, newest first. */
export async function publishedPrompts(): Promise<Prompt[]> {
  const now = new Date();
  const prompts = await getCollection(
    'prompts',
    ({ data }) => !data.draft && data.date.valueOf() <= now.valueOf()
  );
  return prompts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Prompts bucketed into CATEGORIES order, skipping categories with no entries.
 * Within a category, entries stay in the order they were passed in (newest first).
 */
export function groupByCategory(prompts: Prompt[]) {
  return CATEGORIES.map((category) => ({
    ...category,
    prompts: prompts.filter((p) => p.data.category === category.id),
  })).filter((group) => group.prompts.length > 0);
}

/** The post permalinks an artifact cites, normalized to an array. */
export function sourcePermalinks(prompt: Prompt): string[] {
  const permalink = prompt.data.source?.permalink;
  if (!permalink) return [];
  return Array.isArray(permalink) ? permalink : [permalink];
}

/** Prompts that name this post as a source, in CATEGORIES order. */
export async function promptsForPost(permalink: string): Promise<Prompt[]> {
  const all = await publishedPrompts();
  const matches = all.filter((p) => sourcePermalinks(p).includes(permalink));
  const order = CATEGORIES.map((c) => c.id);
  return matches.sort(
    (a, z) =>
      order.indexOf(a.data.category) - order.indexOf(z.data.category) ||
      a.data.title.localeCompare(z.data.title)
  );
}

/**
 * Resolve a prompt's source posts to links, empty when it has no source. `href` is
 * null when a permalink matches no published post, so the page renders the label as
 * plain text instead of a dead link. Warns at build time to catch typos and drift.
 * `source.label` only overrides the text when there is a single source.
 */
export async function sourceLinks(
  prompt: Prompt
): Promise<{ href: string | null; label: string }[]> {
  const permalinks = sourcePermalinks(prompt);
  if (permalinks.length === 0) return [];

  const posts = await publishedPosts();
  const only = permalinks.length === 1 ? prompt.data.source?.label : undefined;

  return permalinks.map((permalink) => {
    const post = posts.find((p) => p.data.permalink === permalink);
    if (!post) {
      console.warn(
        `[prompts] ${prompt.id}: source.permalink "${permalink}" matches no published post`
      );
      return { href: null, label: only ?? permalink };
    }
    return { href: `/${permalink}/`, label: only ?? post.data.title };
  });
}
