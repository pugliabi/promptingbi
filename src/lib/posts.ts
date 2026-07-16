import { getCollection } from 'astro:content';

/** All non-draft posts with a publish date in the past, newest first. */
export async function publishedPosts() {
  const now = new Date();
  const posts = await getCollection(
    'blog',
    ({ data }) => !data.draft && data.date.valueOf() <= now.valueOf()
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
