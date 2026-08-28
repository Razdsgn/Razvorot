# 🎨 Feature Overview

Design direction: **Editorial Mono**, inspired by [cuberto.com](https://cuberto.com) — a
stark white canvas, near-black ink, a single muted grey, one sparing lime accent, and a
near-black rounded "panel" the page scrolls into for the final call-to-action + footer.
No drop shadows anywhere; contrast comes from scale, whitespace and flat color blocks.

## Motion & interaction

- **Preloader** — full-screen counter (0 → 100) on first load, skipped automatically for
  `prefers-reduced-motion`. `components/ui/Preloader.tsx`
- **Custom cursor** — a single circle using `mix-blend-mode: difference`, so it reads
  correctly over white, black or photos with no extra logic. Grows and shows a label
  when hovering any element with a `data-cursor="..."` attribute. Disabled on touch
  devices. `components/ui/Cursor.tsx`
- **Magnetic buttons** — CTAs, the nav button and the floating contact badge gently
  follow the cursor within their own bounds via spring physics.
  `components/ui/Magnetic.tsx`
- **Kinetic text reveal** — headlines split into words, masked and slid up into place on
  load or on scroll into view. `components/ui/RevealText.tsx`
- **Smooth scrolling** — Lenis-powered, with all scroll-triggered reveals built on
  Framer Motion's `whileInView`.
- **Opposite-direction marquees** — the tech-stack strip scrolls two rows in opposite
  directions and pauses on hover.
- **Floating contact badge** — fixed, bottom-right, circular, with rotating orbit text
  and a magnetic pull, always legible thanks to the accent background.

## Sections (in order)

1. **Hero** — availability badge, huge name reveal, rotating role text, short bio, dual
   CTA.
2. **Tech marquee** — two-row scrolling tech stack strip.
3. **Services ("Ce que je fais")** — row-based list (index / title / description+tags /
   arrow), mirroring the reference site's "What we do" layout.
4. **Projects ("Réalisations sélectionnées")** — asymmetric image-led grid (one large +
   two medium cards), rounded corners, hover zoom + arrow reveal, one-line case-study
   captions. Projects without a screenshot render a branded gradient placeholder
   automatically — no broken images, no external image host required.
5. **Stats ("Pourquoi moi")** — animated counters (count up on scroll into view) plus a
   short "why work with me" bullet list.
6. **Experience & Parcours** — two-column timeline (professional experience /
   education) with an animated language-level bar chart.
7. **FAQ** — accordion of common hiring questions, reusable `Accordion` component.
8. **CTA panel** — the near-black rounded-top panel: big "get in touch" headline, a
   giant email link with a hover-drawn underline, contact details, a compact message
   form, and the footer (nav, contact, copyright) folded into the same panel.

## Content model

All copy lives in **`lib/content.ts`** — a single typed file exporting the contact
details, nav items, hero roles, tech stack, services, projects, stats, experience,
education, languages and FAQ. Components only render this data; there is no copy baked
into JSX to hunt for.

## Technical

- **Next.js 15 / App Router**, React 18, TypeScript, strict mode.
- **Tailwind CSS**, design tokens centralized in `app/styles/variables.css` (colors,
  radii, spacing, easing) and consumed by `tailwind.config.ts`.
- **Framer Motion** for all animation (reveals, springs, page/menu transitions).
- **Lenis** for smooth scrolling.
- Accessible by default: semantic sections/headings, visible focus rings, cursor and
  parallax effects disabled under `prefers-reduced-motion`, and the custom cursor is
  automatically swapped for the native one on touch devices.

## Customizing

See `QUICK_START.md` for the guided walkthrough. Short version: edit `lib/content.ts`
for copy, `app/styles/variables.css` for color/radius, `tailwind.config.ts` for type
scale.
