/**
 * Keystatic CMS admin (/keystatic) — mirrors the Outfit Edits pattern.
 *
 * IMPORTANT: this config points at a NEW Keystatic Cloud project placeholder
 * (`cozy-tiny-space/cozy-tiny-space`). It does NOT reuse the Outfit Edits
 * project (`fashionblog/fashion-blog`). Before using the admin:
 *   1. Create a Keystatic Cloud project at https://keystatic.cloud
 *      (connect it to THIS site's repo).
 *   2. Replace the `project` value below with the real project slug
 *      (`<org>/<project>`).
 *   3. Deploy — the admin is served from the Cloudflare Pages deployment.
 *
 * The site builds and deploys fine without a real project; the admin simply
 * cannot sign in until step 1–2 are done. See README "Keystatic admin".
 */
import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'Cozy Tiny Space' },
  },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description (meta, 150–160 chars)',
          validation: { length: { min: 145, max: 165 } },
        }),
        pubDate: fields.date({ label: 'Publish date' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Kitchen Storage', value: 'kitchen-storage' },
            { label: 'Bedroom & Closet Storage', value: 'bedroom-closet-storage' },
            { label: 'Bathroom Storage', value: 'bathroom-storage' },
            { label: 'Living Room & Entryway Storage', value: 'living-room-entryway-storage' },
            { label: 'Renter-Friendly Solutions', value: 'renter-guides' },
          ],
          defaultValue: 'kitchen-storage',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags (max 4)',
          itemLabel: (props) => props.value,
        }),
        image: fields.image({
          label: 'Feature image (3:4 portrait)',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        imageAlt: fields.text({ label: 'Image alt text' }),
        instagramUrl: fields.url({ label: 'Instagram URL (optional)' }),
        instagramCredit: fields.text({ label: 'Instagram Credit (optional)' }),
        author: fields.relationship({
          label: 'Author',
          collection: 'authors',
        }),
        draft: fields.checkbox({ label: 'Draft (hidden from the site)', defaultValue: false }),
        pillar: fields.checkbox({ label: 'Pillar article', defaultValue: false }),
        keyword: fields.text({ label: 'Primary keyword' }),
        bestFor: fields.text({ label: 'Best for' }),
        drilling: fields.text({ label: 'Drilling' }),
        budget: fields.text({ label: 'Budget (approx. range)' }),
        timeNeeded: fields.text({ label: 'Time needed' }),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: 'Question' }),
            a: fields.text({ label: 'Answer', multiline: true }),
          }),
          {
            label: 'FAQ (4–6 items)',
            itemLabel: (props) => props.fields.q.value,
          },
        ),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/content/authors/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        bio: fields.text({ label: 'Short bio', multiline: true }),
        avatar: fields.image({
          label: 'Photo',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        email: fields.text({ label: 'Email' }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        github: fields.url({ label: 'GitHub URL' }),
        website: fields.url({ label: 'Website URL' }),
        content: fields.mdx({ label: 'Long bio' }),
      },
    }),
    categories: collection({
      label: 'Categories',
      slugField: 'name',
      path: 'src/content/categories/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        slug: fields.text({ label: 'URL slug' }),
        tagline: fields.text({ label: 'Tagline', multiline: true }),
        description: fields.text({ label: 'Description', multiline: true }),
        quickSolutions: fields.array(fields.text({ label: 'Quick solution' }), {
          label: 'Quick solutions (exactly 5)',
          itemLabel: (props) => props.value,
        }),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: 'Question' }),
            a: fields.text({ label: 'Answer', multiline: true }),
          }),
          {
            label: 'FAQ (3–4 items)',
            itemLabel: (props) => props.fields.q.value,
          },
        ),
        content: fields.mdx({ label: 'Intro' }),
      },
    }),
  },
});
