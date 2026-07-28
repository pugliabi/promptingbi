import { getCollection, type CollectionEntry } from 'astro:content';

/** Posts per page on the homepage and /page/N/ archive pages. */
export const PAGE_SIZE = 8;

/** All non-draft posts with a publish date in the past, newest first. */
export async function publishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const now = new Date();
  const posts = await getCollection(
    'blog',
    ({ data }) => !data.draft && data.date.valueOf() <= now.valueOf()
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
