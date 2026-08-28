# 🎯 Quick Customization Guide

The site's design is inspired by [cuberto.com](https://cuberto.com) — a stark black/white
editorial system, huge kinetic type, a morphing cursor and a dark rounded "panel" the page
scrolls into for the final call-to-action and footer.

## Step 1: Install (2 minutes)

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Step 2: Edit your content (5 minutes)

Every piece of copy — name, bio, roles, tech stack, projects, experience, education,
languages, FAQ, contact details, nav links — lives in **one file**:

```
lib/content.ts
```

Open it and edit the exported values. Everything else (animations, layout, styling)
updates automatically since components read from this file.

Key exports to change first:

| What | Export |
|------|--------|
| Email / phone / location | `contactEmail`, `contactPhone`, `contactLocation` |
| GitHub / LinkedIn | `githubUrl`, `linkedinUrl` |
| Rotating hero roles | `roles` |
| Tech stack marquee | `techStack` |
| "What I do" cards | `services` |
| Projects grid | `projects` |
| Stats counters | `stats` |
| Experience timeline | `experiences`, `educations`, `languages` |
| FAQ accordion | `faqItems` |

## Step 3: Add project screenshots

Drop images into `public/screenshots/` and reference them from a project's `image` field
in `lib/content.ts`, e.g. `image: "/screenshots/my-project.png"`.

Projects with `image: null` automatically render a branded gradient placeholder instead —
no broken images, no external image host required.

## Step 4: Tune the design (optional)

- **Colors** — `app/styles/variables.css` (one place: background, ink, muted, the dark
  panel, and the single accent color).
- **Type scale** — `tailwind.config.ts` under `theme.extend.fontSize` (`hero`, `display`,
  `stat-lg`).
- **Cursor labels** — add `data-cursor="Some label"` to any element to make the custom
  cursor grow and show that text on hover; use `data-cursor=""` for a plain grow effect.

## Deploy

### Vercel (recommended)
1. Push to GitHub
2. Import the repo at https://vercel.com/new
3. Deploy — done.

### Netlify
1. Push to GitHub
2. New site from Git at https://app.netlify.com
3. Build command: `npm run build` · Publish directory: `.next`

## Need help?

- Can't find where to edit something? Search `lib/content.ts` first — almost everything
  is there.
- Want to change animation speed/feel? Look for `transition={{ duration: ... }}` inside
  `components/sections/*` and `components/ui/*`.

---

**That's it! Your portfolio is ready to impress! 🚀**
