# Shared components

**Parent context:** `../AGENTS.md`
**Generated:** 2026-11-18 · **Updated:** 2026-11-18

| File | Responsibility |
| --- | --- |
| `Nav.tsx` | Fixed header, active-section observer, segmented progress, and mobile menu. |
| `Halftone.tsx` | Decorative canvas used in Hero, AgentYear, and Contact. It draws rotated ink screens and pauses offscreen. |
| `ui.tsx` | Tags, headings, display entrances, icons, view detection, count-up, and decorative dots. |

- Preserve the mobile menu lifecycle. On open, it focuses the first link, locks scrolling, and makes `main` and `#contact` inert. Escape closes it and returns focus to the toggle. Following a menu link closes it without restoring toggle focus. `../lib/smooth-scroll.ts` reads the same `data-scroll-lock` flag.
- Pass `Halftone` stable module-level `circles` and `inks` arrays so rerenders do not rebuild the canvas. Keep the still frame under reduced motion and the cleanup for observers, listeners, and animation frames.
- Keep `CountUp`'s final value available in the static HTML and to assistive technology. Only the visual digits animate. `Icon` renders a decorative image, so its parent supplies the text label.
- After changes, run the build and preview the affected component. For `Nav`, test desktop highlighting and mobile focus, Escape, anchor jumps, and scroll unlock. For decorative effects, verify the reduced-motion rendering.

## Manual Notes
