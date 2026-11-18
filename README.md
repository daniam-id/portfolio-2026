# Adam Dani Apta Mahendra · portfolio

React 19 + Vite 8 + TypeScript + Tailwind CSS 4. The design language comes from `wrapped-2026.html`:
paper ground, tomato/cobalt/lime/mint/sand slides, Host Grotesk with Instrument Serif italic, terminal
tags, ink highlight blocks and the four-screen halftone canvas.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check, build, then prerender the page into dist/index.html
npm run preview
```

Belum dipindah ke `adamdev.web.id`: lihat `TODO-domain.md` sebelum mengubah `canonical` atau `og:url`.

## Where things live

- `src/content.ts`: every fact, link and photo on the page. Edit copy here.
- `src/sections/*`: one file per section (Hero, About, AgentYear, Services, Projects, Experience, Contact).
- `src/components/Halftone.tsx`: the halftone canvas (sleeps off screen, still under reduced motion).
- `src/index.css`: tokens, type, buttons, cards and the motion layer.
- `scripts/prerender.mjs`: writes the server-rendered HTML into `dist/index.html` for SEO.

## Publish (GitHub Pages)

`.github/workflows/pages.yml` builds and deploys on every push to `main`. The base path is set
automatically, so the site works at `https://daniam-id.github.io/<repo>/` and on a custom domain.

```bash
gh auth login                       # once
gh repo create daniam-id/portfolio-2026 --public --source . --push
gh api -X POST repos/daniam-id/portfolio-2026/pages -f build_type=workflow
gh run watch                        # wait for the deploy, then open the Pages URL
```

`wrapped-2026.html` (the design reference) is git-ignored on purpose: it holds private usage data.

## Before launch

- Replace the five stand-in photographs in `content.ts` (`photos`) with your own, and drop the footer credit line.
- Add `public/share.png` (1200×630) for link previews.
- Add any leadership or organisation roles to `roles` in `content.ts`.
