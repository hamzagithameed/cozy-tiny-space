// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
// import cloudflare from '@astrojs/cloudflare'; // Removed for static build
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

// Site URL — CHANGE THIS when the real domain is purchased.
// cozytinyspace.com was checked available on 18 Nov 2026 (NOT confirmed).
// This is the single place the domain lives; canonicals, OG tags, RSS and
// the sitemap all derive from it.
export default defineConfig({
  site: 'https://cozytinyspace.pages.dev',
  trailingSlash: 'ignore',

  // Static output for Cloudflare Pages
  output: 'static',

  integrations: [
    mdx(),
    react(),
    // keystatic(), // Disabled for static deployment - admin panel via local dev only
    // sitemap({ // Temporarily disabled - causing build error
    //   filter: (page) => !page.includes('/search') && !page.includes('/keystatic'),
    // }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
