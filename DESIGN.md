# Cozy Tiny Space — Design System (DESIGN.md)

This file documents the site's EXISTING design so any AI agent or editor keeps every new page and component consistent with it. It describes the design as built — do not redesign from it; match it. Source of truth for values: `src/styles/global.css` (Tailwind v4 `@theme` tokens).

## Brand feel
Warm, calm, renter-friendly. Cream paper background, editorial serif headlines, one terracotta accent. No gradients, no glassmorphism, no neon. Photography-style AI illustrations in warm natural light.

## Colors
| Token | Hex | Use |
|---|---|---|
| `--color-paper` | #FAF7F1 | Page background |
| `--color-surface` | #FFFFFF | Cards, raised surfaces |
| `--color-ink` | #1C1917 | Headings, primary text |
| `--color-ink-soft` | #44403C | Secondary text |
| `--color-muted` | #57534E | Captions, meta text |
| `--color-line` | #E7DFD3 | Borders, dividers |
| `--color-accent` | #B4532A | Terracotta — links, buttons, highlights |
| `--color-accent-dark` | #8F3F1E | Accent hover, link text on light bg |
| `--color-accent-soft` | #F6E9DF | Accent-tinted backgrounds, chips |
| `--color-accent-light` | #D9825B | Light accent details |
| `--color-check` | #2F6B3A | Success / "renter-safe" green |
| `--color-sage` | #5E7B63 | Secondary green accent |
| `--color-sage-soft` | #E8EEE6 | Sage-tinted backgrounds |
| `--color-espresso` | #2A211C | Dark bands (newsletter, footer) |
| `--color-cream` | #F3EBDD | Cream panels on dark bands |

Pinterest red #E60023 is used ONLY on the "Save to Pinterest" bar that frames article images — nowhere else.

## Typography
- Display / headlines: **Fraunces** (variable, self-hosted via Fontsource), Georgia serif fallback. Used for H1–H3, card titles, hero.
- Body / UI: **Public Sans** (self-hosted), system-ui fallback.
- Body copy ~17–18px, line-height ~1.7; article body column ~720px wide.

## Layout & components
- Content max-width ~1200px; article layout = centered header, wide framed hero image (portrait image centered, max-height 720px, not cropped), body column with a right sticky sidebar (~300px) on desktop.
- Cards: white surface, 1px `--color-line` border, soft warm shadow, image zoom on hover (transform only).
- Buttons/chips: accent background for primary actions; accent-soft pills for category chips.
- FAQ: click-to-open accordion with + / − (articles) and rotating × (homepage) indicators.
- Article extras: reading-progress bar (accent, top, fixed), TOC card before the first H2, "Share this article" row, "Meet the Author" sidebar card, 6 related-post cards ("You Might Also Like").
- Homepage order: hero + search + category chips → trust strip → Editor's Picks (5 pillar articles) → Latest articles (6, max 2 per category) → Browse by room → one section per category → How We Research band → FAQ accordion → newsletter dark band.

## Images
- All displayed images WebP. Feature images 1344×1792 (3:4 portrait); in-body images 896×1200 (3:4 portrait). Social/og images are JPG twins of the same files (1200×630 declared only for the homepage hero 1920×1280; article og images use true 1344×1792 dims).
- Every image needs a strong, unique, keyword-bearing `alt`. Article images are AI-generated illustrations (licence tracked in frontmatter `imageLicense: "ai"`); never present them as photos of real tested setups.

## Rules that must not break
- AdSlot renders nothing until an ad approval exists — ads return only through `src/components/AdSlot.astro`.
- `https://cozy-tiny-space.pages.dev` carries `X-Robots-Tag: noindex` via `public/_headers`; the production domain does not.
- No AI-disclosure notes under article images; the single AI-images statement lives on /how-we-test/.
