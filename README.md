# Raman Khaniakou — Portfolio

Personal portfolio / CV site for Raman Khaniakou, full-stack web developer (Symfony /
PHP) based in Rennes, France. Built with Next.js, TypeScript, Tailwind CSS and Framer
Motion.

**Live:** https://romankhonyakov.netlify.app/

## Design

The design system is inspired by [cuberto.com](https://cuberto.com): a stark white
canvas with near-black ink, a single muted grey, one sparing accent color, huge kinetic
typography, a morphing cursor, magnetic buttons, and a near-black rounded "panel" that
the page scrolls into for the final call-to-action and footer.

See `FEATURES.md` for the full breakdown of sections and interactions.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy (bio, roles, tech stack, projects, experience, education, FAQ, contact info)
lives in one file: [`lib/content.ts`](./lib/content.ts). See `QUICK_START.md` for a
guided tour.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm start       # serve the production build
npm run lint    # lint the codebase
```

## Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling
- [lucide-react](https://lucide.dev/) icons
