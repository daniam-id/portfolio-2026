# Portfolio source

**Parent context:** `../AGENTS.md`
**Generated:** 2026-11-18 · **Updated:** 2026-11-18

## Entry points

| File | Responsibility |
| --- | --- |
| `App.tsx` | Owns section order, the skip link, and the page-motion root. The contact footer sits outside `main`. |
| `main.tsx` | Runs the intro and hydrates the built page, or mounts a fresh tree when Vite serves an empty root in development. |
| `entry-server.tsx` | Exports the static renderer consumed by `scripts/prerender.mjs`. |
| `content.ts` | Holds portfolio facts, link data, and the tables consumed by sections. Some headings, copy, and display metadata live in section files. |
| `index.css` | Tailwind entry, font faces, shared tokens in `@theme`, and base styles for type, layout, and controls. |
| `intro.css`, `motion.css` | The loading curtain and shared section motion/interaction styles. |
| `vite-env.d.ts` | Declares Vite client types, including `import.meta.env`. |

## Where to work

- Section markup, copy, anchors, and section-specific CSS → [sections/AGENTS.md](sections/AGENTS.md).
- Header, mobile menu, halftone canvas, and shared UI → [components/AGENTS.md](components/AGENTS.md).
- Intro timing, scroll behavior, animation hooks, and asset URLs → [lib/AGENTS.md](lib/AGENTS.md).

## Working in this directory

- Keep the first client render consistent with `entry-server.tsx`. Read browser state and start browser effects after mount so the built HTML hydrates cleanly.
- Put shared design tokens in `index.css`. Follow the existing section-local stylesheets for section-specific rules.
- Use `npm run build` to exercise both entries. For rendering changes, open `npm run preview` and check the initial load for hydration warnings. Check that meaningful content remains in the HTML with JavaScript disabled.

## Manual Notes
