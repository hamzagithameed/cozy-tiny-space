import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CATEGORIES = [
  'kitchen-storage',
  'bedroom-closet-storage',
  'bathroom-storage',
  'living-room-entryway-storage',
  'renter-guides',
] as const;

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

/**
 * Articles — one MDX file per article, filename = URL slug.
 * Path: src/content/articles/<slug>.mdx
 * URL: /<category>/<slug>/
 *
 * The schema is a build-time contract: a missing field, a meta
 * description outside 145–165 characters, or fewer than 4 FAQs
 * fails the build. That is intentional — it enforces the quality gate.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    // Meta description: 150–160 chars is the target; 145–165 is the hard gate.
    description: z.string().min(145).max(165),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(CATEGORIES),
    // Max 4 tags, only reusable tags (method / room size / constraint).
    tags: z.array(z.string()).max(4),
    // Feature image path in public/, e.g. /images/kitchen-storage/no-drill-kitchen-storage-for-renters.svg
    image: z.string(),
    imageAlt: z.string(),
    // Official Instagram embed for the feature visual (no image file is
    // downloaded). When set, the article shows the Instagram embed with a
    // visible credit line instead of the SVG above. The SVG stays in place
    // for cards, og:image and the Pin-it button (embeds cannot be pinned).
    // Site policy: embeds are a supplement only — never the article's only
    // visual evidence, and never a substitute for licensed imagery.
    instagramUrl: z.string().url().optional(),
    instagramCredit: z.string().optional(), // creator handle, e.g. "@infinitidy"
    // Image licence tracking. Site policy: credit alone is NOT permission.
    // Every feature image must end up 'own', 'stock' or 'permissioned'
    // (written licence on file) before the site applies to any ad network.
    // 'placeholder' = generated SVG stand-in still awaiting a real image.
    // Run `npm run check-images` for the current licence report.
    imageLicense: z
      .enum(['own', 'stock', 'permissioned', 'ai', 'placeholder'])
      .default('placeholder'),
    // Visible credit line for the feature image file, when it is not ours.
    imageCredit: z.string().optional(),
    // Where the feature image file came from (stock page, creator post...).
    imageSourceUrl: z.string().url().optional(),
    // Licence notes — e.g. where the written permission is saved.
    licenseNotes: z.string().optional(),
    author: z.string().default('hamza-hameed'),
    // Gradual rollout control: draft articles are excluded from pages,
    // listings, sitemap, RSS and search. Ship v1 with draft: false on all
    // 30 (complete, fully interlinked site). To phase a future deploy,
    // set draft: true on not-yet-due articles — but note the linking rule:
    // a pillar links to its supporting articles, so only gate an article
    // once the articles linking to it are also gated, or its links 404.
    draft: z.boolean().default(false),
    // true only for the first article of each cluster (the pillar).
    pillar: z.boolean().default(false),
    // Primary keyword, e.g. "no drill kitchen storage for renters".
    keyword: z.string(),
    // Quick-facts box (rendered by the article layout).
    bestFor: z.string(),
    // e.g. "No — damage-free only" / "No drilling; adhesive + tension only".
    drilling: z.string(),
    // e.g. "$25–$80".
    budget: z.string(),
    // e.g. "1–2 hours".
    timeNeeded: z.string(),
    // 4–6 FAQs, People Also Ask style. Rendered by the layout + FAQPage JSON-LD.
    faq: z.array(faqItem).min(4).max(6),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    avatar: z.string(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    description: z.string(),
    // Exactly 5 quick solutions shown on the category page.
    quickSolutions: z.array(z.string()).length(5),
    faq: z.array(faqItem).min(3).max(4),
  }),
});

export const collections = { articles, authors, categories };
