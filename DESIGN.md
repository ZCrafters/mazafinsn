# Design System: Maza Finance

Single source of truth for how Maza Finance looks and feels. Every screen is
built from the tokens, type scale and component rules below. If a screen
contradicts this file, the screen is wrong.

## 1. Visual Theme & Atmosphere

A calm, confident money workspace with an editorial point of view. Airy and
paper-like by default, with a single deliberate deep-green "vault" band used for
hero moments — never random dark sections. Generous whitespace, asymmetric
layouts, tight display type, and quiet sage-green accent. The feeling is
trustworthy and modern: a well-lit financial studio, not a crypto casino.

- **Density:** 4/10 (Daily App Balanced, leaning airy)
- **Variance:** 7/10 (offset, asymmetric, not centered)
- **Motion:** 5/10 (fluid, purposeful, spring-based — never decorative noise)

## 2. Color Palette & Roles

One accent. Neutrals are tinted green so they belong to the brand.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--background` | `#f7f8f5` | `#0f130e` | Page canvas (sage-tinted paper / off-black) |
| `--card` | `#ffffff` | `#171d16` | Raised surface: cards, panels |
| `--foreground` | `#171a16` | `#ecefe8` | Primary text (off-black, never `#000`) |
| `--muted-foreground` | `#5f665b` | `#a3ac9d` | Secondary text, metadata |
| `--muted` | `#eef1ea` | `#1d241b` | Sunken surface, subtle fills |
| `--border` | `#dfe4d8` | `#2a3327` | Hairlines, dividers |
| `--primary` (accent) | `#2E8B57` | `#85a37a` | The one accent: CTAs, active, focus |
| `--primary-foreground` | `#ffffff` | `#10140e` | Text on accent |
| `--sage-*` | scale | scale | Brand tints, gradients, illustration |

Rules:
- The accent is **sage green only**. No blue, purple, pink, orange or red as a
  decorative accent. Status colors (success/warning/danger) may appear only to
  communicate status, never as decoration.
- Never pure black (`#000000`). Never pure-white page canvas.
- Dark surfaces are green-tinted charcoal, not neutral gray.
- Gradient text on large headings is banned.
- Shadows are tinted with the surface hue, never neutral black.

## 3. Typography Rules

- **Display / headings:** `Plus Jakarta Sans` — tight tracking (`-0.02em`),
  heavy weights (700/800), line-height ~1.1.
- **Body / UI:** `Outfit` — relaxed leading (1.5–1.6), max 65ch measure.
- **Mono / numbers:** `JetBrains Mono` with `tabular-nums` on every changing value
  (prices, points, progress, timers).
- **Scale:** display → h1 → h2 → h3 → body → caption, descending. Never let a
  child heading outweigh its parent.
- Headings use `text-wrap: balance`; descriptions use `text-wrap: pretty`.
- Banned: `Inter`, generic serifs, all-caps labels everywhere.

## 4. Component Stylings

- **Buttons:** Flat, no outer glow. Radius `--radius`. Primary = accent fill +
  accent-foreground. Secondary = outline/ghost. Active state translates `-1px`
  (tactile). Visible focus ring in accent. Minimum 44px touch target.
- **Cards:** Only when elevation carries meaning. 1px hairline border + tinted
  soft shadow, generous radius. Prefer spacing and dividers over card walls.
- **Inputs:** Label above, error below. No floating labels. 16px on mobile.
- **Loaders:** Skeleton matching layout shape. No bare circular spinners.
- **Empty states:** Composed, with a clear next action — never a shrug.
- **Badges:** Square-ish, low saturation, sentence case. No pill "NEW/BETA".

## 5. Layout Principles

- Grid-first; CSS Grid over flex percentage math.
- Max-width container (~1200px) centered; content never stretches edge-to-edge.
- Hero and feature rows are **asymmetric** — split screen, left-aligned, or
  offset. Centered hero and the 3-equal-card row are banned.
- Full-height sections use `min-h-[100dvh]`, never `h-screen`.
- Vertical rhythm via `clamp()`; bottom padding often optically larger than top.
- Consistent vertical rhythm: shared elements (titles, prices, CTAs) align across
  side-by-side items. CTAs pin to the bottom of cards.
- Single-column collapse below 768px. No horizontal scroll on mobile.

## 6. Motion & Interaction

- Spring physics for interactive elements (no linear easing).
- Staggered entry on scroll — never mount everything at once.
- Animate only `transform` and `opacity`.
- One perpetual micro-motion at most per screen (shader drift, marquee). Respect
  `prefers-reduced-motion`.
- Hover: subtle background/translate shift. Active: `-1px` press. No neon glows.

## 7. Anti-Patterns (Banned)

- No emojis in UI copy.
- No `Inter`, no generic serif fonts.
- No pure black (`#000000`) or pure-white canvas.
- No neon or outer-glow shadows; no purple/blue/pink gradients.
- No gradient text on large headers.
- No centered hero, no 3-equal-card feature rows.
- No random dark section dropped into a light page — dark is a deliberate band.
- No fake data or invented statistics; use real content or clear placeholders.
- No AI copy clichés ("Elevate", "Seamless", "Unleash", "Next-Gen").
- No `Lorem Ipsum`; no generic names ("John Doe", "Acme").
- No dead `href="#"` links presented as real actions.
- No mixed icon sets — Lucide only, one stroke weight.
- No `h-screen`; no overlapping elements; no custom cursors.
