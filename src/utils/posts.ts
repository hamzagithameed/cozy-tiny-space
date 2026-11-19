import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

export async function getPublishedArticles(): Promise<Article[]> {
  const all = await getCollection(
    'articles',
    ({ data }) => data.author === 'hamza-hameed' && !data.draft,
  );
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function articleUrl(article: Article): string {
  return `/${article.data.category}/${article.id}/`;
}

export function readingTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Related posts, build-time, zero JS: score by shared tags,
 * fall back to latest in the same category, always include one
 * method guide from the Renter-Friendly Solutions cluster.
 */
export function getRelatedPosts(current: Article, all: Article[], count = 3): Article[] {
  const others = all.filter((p) => p.id !== current.id);
  const scored = others
    .map((p) => ({
      post: p,
      score:
        p.data.tags.filter((t) => current.data.tags.includes(t)).length * 2 +
        (p.data.category === current.data.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf());

  const picked: Article[] = [];
  for (const { post } of scored) {
    if (picked.length >= count) break;
    if (post.data.category === current.data.category || picked.length === 0) picked.push(post);
  }
  // Guarantee one method guide when the article is room-based.
  if (current.data.category !== 'renter-friendly-solutions') {
    const method = others.find(
      (p) => p.data.category === 'renter-friendly-solutions' && !picked.includes(p),
    );
    if (method) {
      if (picked.length >= count) picked.pop();
      picked.push(method);
    }
  }
  return picked.slice(0, count);
}
