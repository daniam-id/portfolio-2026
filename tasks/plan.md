# Implementation Plan: Dark mode

## Overview

Add an accessible light/dark theme toggle to the portfolio without changing its existing visual identity. Before a visitor makes a choice, the page follows the operating-system color preference. A manual choice is saved in the browser and takes precedence on later visits.

**Status:** Implemented and verified. See [`todo.md`](todo.md) for task status and the limits of final browser/contrast sampling.

## Confirmed behavior and boundaries

- Confirmed by the user: use antislop DURING; follow the device preference until a manual choice is made; persist that manual choice locally.
- Proposed interaction: a two-state light/dark button. A separate System option and reset control are outside this first version.
- Keep existing content, typography, layout, section order, six tool rows, screenshots, intro timing, and navigation lifecycle.
- Domain migration, social image fixes, deployment, and the separate decorative menu-number accessibility fix are outside this plan.

## Source findings

- `src/index.css` defines the existing palette but also uses paper and ink as both raw colors and semantic foreground/background values. Those roles must be separated before dark-mode overrides.
- `src/sections/projects.css`, `services.css`, `experience.css`, and `src/motion.css` contain fixed neutral colors that will not follow a root token change.
- `src/components/Halftone.tsx` draws its own palette into a canvas; CSS recoloring alone cannot update it.
- `index.html` contains the pre-paint intro bootstrap and fixed browser theme-color. `src/main.tsx` hydrates static HTML produced by `entry-server.tsx` and `scripts/prerender.mjs`.

## Architecture decisions

- Set the initial theme on the document root before first paint, then let CSS theme tokens recolor the static prerendered page. Keep the server markup and first React render identical to avoid hydration mismatches. Fall back to the system preference when storage is unavailable or invalid.
- Keep the toggle in the shared header, where it is available on desktop and mobile alongside the existing navigation controls. Use a real button with a clear accessible name and visible keyboard focus.
- Preserve the light palette. Use dark neutrals for the dark mode base and carry the existing colors into accents. Give the larger tomato, mint, cobalt, and lime surfaces their own foreground/background pairs so each can be tuned independently without changing the brand colors used elsewhere.
- Keep product screenshots and logos unchanged; adapt the halftone canvas separately because it draws with a hard-coded palette.
- Update browser `color-scheme` and theme-color metadata to match the active theme.
- Use `data-theme="light|dark"` on the document root and a single local-storage key (`portfolio-theme`, valid values `light` or `dark`). Keep the inline bootstrap and runtime resolver consistent; do not add a theme library for this scope.
- Introduce semantic tokens additively; do not globally reverse the existing paper/ink palette. Migrate each component's surface and foreground together so intermediate tasks do not break accent contrast.
- Apply root colors and metadata before paint. Synchronize theme-dependent React control state after mount; never choose different initial React markup from browser storage.
- Storage failures must not break toggling. Treat unavailable storage as an in-memory manual override for the current visit; fall back to system preference on the next visit.

## Visual direction

Source: the existing approved portfolio and the designer's read-only source review. This is a proposed direction for implementation, not a visually verified dark palette.

- Use warm charcoal for the base, a slightly lighter charcoal for secondary surfaces, and warm off-white for text. Reason: carry the paper/ink character into a comfortable dark neutral pair.
- Use deeper tomato, mint, and lime section grounds with their own readable foregrounds; keep vivid brand hues on existing graphic accents. Keep cobalt recognizable with an independently light foreground. Reason: preserve section boundaries and the site's existing color rhythm.
- Separate adaptive neutral tokens from fixed dark/light artwork colors. Lime highlights, terminal chips, chapter nodes, and the mobile menu each need explicit foreground/background pairs. Reason: changing page text must not reverse contrast on fixed colored surfaces.
- Keep logo backing discs light and screenshot pixels/browser chrome unchanged. Reason: preserve the legibility and accuracy of the original artwork.
- Place a quiet text button before Contact Me on desktop and before the menu button on mobile, in the existing right-hand header group. Use visible Dark/Light action text, the current type scale and rounded interaction treatment, and a minimum 44px target. Reason: make the setting discoverable without a new visual motif or asset.
- Keep existing composition, fonts, spacing, and motion. Working dial interpretation: ENERGY 3 / RHYTHM 3 / MOTION 2, inherited from the existing page rather than a request for more effects. No new assets or theme-switch animation.
- Do not select final hex values by source inspection alone. Validate theme pairs, muted text, focus, hover, and text over decorative canvas on fresh preview screenshots and measured contrast.

## Task list

See [`todo.md`](todo.md) for acceptance criteria, verification, dependencies, and likely files for each task.

### Phase 1: Theme state and control
- Task 1: Establish the pre-paint theme and semantic color tokens.
- Task 2: Add the persistent, accessible header toggle.

### Checkpoint: Theme state
- Confirm system preference is used when no manual preference is saved.
- Confirm a manual selection persists and the rendered page hydrates without mismatch.
- Build succeeds; check desktop and mobile header layout.

### Phase 2: Apply the theme across the site
- Task 3: Make shared styles and navigation surfaces theme-aware.
- Task 4: Adapt section-specific styles and check text contrast.
- Task 5: Apply semantic colors to section markup.

### Checkpoint: Section surfaces
- Check section foreground/background pairs, halos, logo backing surfaces, and unchanged product screenshots in both themes.

### Phase 3: Decorative canvas and final verification
- Task 6: Make the halftone palette and overlap behavior respond to theme changes.

### Checkpoint: Complete
- Build succeeds and both themes render without a first-paint flash or hydration warnings. Compare fresh production-preview screenshots at desktop and mobile widths before shipping.
- Verify navigation, toggle keyboard operation, mobile menu lifecycle, sections, project screenshots, reduced motion, and browser metadata in both themes.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Reading storage or media preference during React's initial render changes markup | Hydration mismatch | Set the root theme before paint; keep theme choice out of the initial rendered markup. |
| Reversing paper and ink makes bright accent surfaces unreadable | Contrast failure | Use fixed foreground-on-accent tokens and verify contrast for accent sections and controls. |
| Literal colors remain in section CSS or canvas code | Mixed light/dark appearance | Audit literal colors; convert semantic neutrals to tokens and explicitly review intentional brand artwork. |
| Added header control crowds mobile navigation | Layout or touch-target regression | Keep the control at least 44px and verify at the project's narrow viewport. |
| Canvas screens multiply together and lose separation on deeper grounds | Decorative colors become muddy or disappear | Assess theme-aware palette and overlap/compositing together; immediately repaint all selected layers on a theme change. |

## Verification matrix for implementation

- Fresh visit with system light and system dark; a saved light choice against system dark and vice versa; invalid storage and blocked storage.
- Change the system theme while the page is open, before and after a manual override; reload a persisted selection.
- Inspect a fresh production preview, including the intro and first paint with reduced motion enabled so the curtain cannot hide a wrong initial theme. Check browser console for hydration warnings.
- Check JavaScript-disabled static content. The theme control must not appear to offer a working interaction before it is usable.
- Check header at 320px, 390px, the desktop-navigation breakpoint, and desktop width. Verify the toggle while the mobile sheet is open without disturbing focus restoration or scroll locking.
- Include Hero, AgentYear, and Contact canvases. On theme changes, repaint all selected layers immediately, including offscreen/reduced-motion still frames. Verify the hero canvas lifted above the intro agrees with the resolved theme from its first visible frame.
- At completion, run `npm run build`, inspect rendered content in `dist/index.html`, and confirm `dist-ssr/` was removed. Do not add a test framework solely for this feature.
- Save temporary verification screenshots outside tracked project files. Record the preview URL, viewport, theme, and actual results; do not claim physical touch, trackpad, or 120 Hz behavior from desktop browser emulation.

## Execution order

Tasks 1 through 6 are the default sequential order. The canvas lane can be separated after Task 1 only once the theme token/change-notification contract is stable. Do not run parallel writers against `src/index.css`; section styles and markup also need reconciliation against the same token contract.

## Planning verification

Before handing off: check every task has acceptance criteria, verification steps, ordered dependencies, and at most five likely source files; verify both documents agree; confirm only planning documents were added. Application build, browser checks, measured contrast, and final design delivery checks remain pending implementation.

## Open questions

- None. Theme default and persistence behavior are defined for this implementation.
