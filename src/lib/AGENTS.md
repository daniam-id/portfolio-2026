# Browser behavior and asset URLs

**Parent context:** `../AGENTS.md`
**Generated:** 2026-11-18 · **Updated:** 2026-11-18

| File | Responsibility |
| --- | --- |
| `asset.ts` | Prefixes `public/` asset paths with Vite's `import.meta.env.BASE_URL`. Use it for asset URLs assembled in TypeScript. |
| `intro.ts` | Releases the loading curtain after the hero font is ready or the timeout expires, then re-enables the app. |
| `motion.ts` | Runs in-view entrances, offscreen animation pausing, and fine-pointer project cover tilt. Also exports the reduced-motion hook. |
| `smooth-scroll.ts` | Adds wheel glide while preserving native touch, keyboard, scrollbar, anchor, and nested-scroller behavior. |

- Intro changes span `../../index.html`, `intro.ts`, and `../intro.css`. Keep the pre-paint classes, fade time, and timeout fallback aligned.
- Section motion starts with `data-motion` and optional `data-stagger`. `usePageMotion` observes the `main` subtree and adds `data-arrived`. The timeline uses that attribute for its CSS animation in `../motion.css`.
- Preserve the reduced-motion path and effect cleanup. The wheel handler yields to the loading curtain and the menu's scroll lock. When editing scroll behavior, verify those flows alongside native anchor and keyboard scrolling.
- Run `npm run build`. Preview intro and motion changes with both normal and reduced motion. For asset URL changes, also build with `BASE_PATH=/portfolio/ npm run build` and check the prefixed screenshot and icon URLs in `dist/index.html`.

## Manual Notes
