import rss from '@astrojs/rss';
import { getPublishedArticles, articleUrl } from '../utils/posts';
import { SITE } from '../utils/site';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const articles = await getPublishedArticles();
  return rss({
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    site: SITE.url,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: articleUrl(article),
    })),
  });
};
