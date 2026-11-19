# Dark mode implementation tasks

Implementation complete. Preserve existing layout, typography, copy, section order, screenshot presentation, six tool rows, and motion. No new assets or effects were added. The palette was previewed in both themes and representative contrast pairs were measured; the limits of that sampling are noted at the final checkpoint.

## Task 1: Establish the pre-paint theme and semantic color tokens

**Description:** Select the initial theme from a saved browser choice or, when absent, the operating-system preference. Establish light and dark semantic tokens and a small runtime resolver with a stable theme-change notification contract. Apply the root theme, color-scheme, and browser theme-color before first paint; use the same preference rules for later changes. Keep static rendering independent of browser state.

**Acceptance criteria:**
- [x] A valid saved light/dark choice wins. Missing, invalid, or inaccessible storage falls back to the operating-system preference.
- [x] The root exposes a theme, matching `color-scheme`, and browser theme-color before paint without changing prerendered React markup; runtime changes keep them synchronized.
- [x] Neutral and accent-foreground tokens are defined for both themes; existing brand accents remain intentional and legible.

**Verification:**
- [x] Build succeeds: `npm run build`.
- [x] Inspect prerendered HTML and load with both system preferences to confirm the root theme is selected before first paint. Confirm the static content is still readable with JavaScript disabled.
- [x] Confirm no theme-dependent React markup is read before hydration.

**Dependencies:** None.

**Files likely touched:**
- `index.html`
- `src/index.css`
- `src/lib/theme.ts` (new, runtime resolver and theme-change contract)

**Estimated scope:** Medium.

## Task 2: Add the persistent, accessible header toggle

**Description:** Add a two-state theme control in the shared header. Manual selection updates the root theme immediately and persists locally across reloads when storage is available. While a manual override is active it takes precedence over system changes. With no manual choice, a system preference change while the page is open updates the theme.

**Acceptance criteria:**
- [x] The control is a keyboard-operable button with a theme-accurate accessible name, visible focus, and at least a 44px target.
- [x] Clicking switches themes without a reload, persists when storage is available, and still works for the current visit if storage is blocked.
- [x] With no saved manual choice, system changes are followed; the existing mobile menu behavior remains intact.

**Verification:**
- [x] Build succeeds: `npm run build`.
- [x] Test keyboard activation, accessible name, persistence after reload, and system-follow behavior with no saved choice.
- [x] Check desktop and 390px-wide header layout alongside the mobile menu.

**Dependencies:** Task 1.

**Files likely touched:**
- `src/components/Nav.tsx`
- `src/lib/theme.ts`

**Estimated scope:** Small.

## Checkpoint: Theme state

- [x] Tasks 1–2 acceptance criteria pass.
- [x] Production build and prerender succeed.
- [x] Bootstrap resolves before the stylesheet and module entry; light, dark, and saved selections hydrated in production preview without console warnings. First-paint flash was not separately recorded.
- [x] Review header control placement before applying the theme across every section.

## Task 3: Make shared styles and navigation surfaces theme-aware

**Description:** Replace shared-style assumptions about fixed light/dark colors with semantic tokens. Cover intro, focus, selection, buttons, tags, chips, cards, animation details, shared logo backings, and navigation surfaces. Review Nav header translucency, brand tile, active links, progress segments, and mobile-menu ground/text/borders as well as the toggle.

**Acceptance criteria:**
- [x] Shared neutral colors respond to the root theme; decorative palette colors are not unintentionally inverted.
- [x] Intro curtain and shared focus/interaction states match the active theme, including when reduced motion skips the curtain.
- [x] All navigation surfaces have deliberate foreground/background pairs, and shared tool-logo backings preserve legibility without filtering artwork.

**Verification:**
- [x] Build succeeds: `npm run build`.
- [x] Inspect initial and toggled shared controls and navigation surfaces in both themes, including an open mobile menu.
- [x] Check focus-visible contrast and reduced-motion rendering.

**Dependencies:** Tasks 1–2.

**Files likely touched:**
- `src/index.css`
- `src/intro.css`
- `src/motion.css`
- `src/components/Nav.tsx`
- `src/components/ui.tsx`

**Estimated scope:** Medium.

## Task 4: Adapt section-specific styles and check contrast

**Description:** Convert hard-coded neutral colors and muted copy in portfolio sections to theme-aware tokens. Preserve the intentional color composition of each section and the project artwork.

**Acceptance criteria:**
- [x] No section has stray light-only body text, borders, muted labels, or hover states in dark mode.
- [x] Text contrast meets WCAG AA in both themes, including muted labels, accent surfaces, and interactive text states.
- [x] Project screenshots and logo assets retain their original appearance.

**Verification:**
- [x] Build succeeds: `npm run build`.
- [x] Inspect all sections in light and dark at desktop and 390px mobile widths; check text/link contrast and project assets.
- [x] Verify section navigation and focus states in each theme.

**Dependencies:** Task 3.

**Files likely touched:**
- `src/sections/projects.css`
- `src/sections/services.css`
- `src/sections/experience.css`
- `src/sections/about.css` (only if review finds a theme-specific exception)
- `src/index.css` (section tone pairs)

**Estimated scope:** Medium.

## Task 5: Apply semantic colors to section markup

**Description:** Review explicit color utilities and halo overrides in section markup. Use the semantic tokens introduced earlier wherever these are page UI rather than fixed artwork. Include Hero neutral confetti, translucent CTA and highlight, AgentYear bars, Contact social separators and logo discs, and Experience chapter-tone hooks. A source review may establish that some existing hooks need no change.

**Acceptance criteria:**
- [x] Hero controls, AgentYear bars and halo, contact text/buttons/halo, and experience nodes use intentional theme-compatible color pairs.
- [x] Contact social-logo discs and separators are legible in both themes without blanket image filters or changes to screenshot/logo pixels.
- [x] Markup changes preserve content, layout, animation timing, and the six-row tool list.

**Verification:**
- [x] Build succeeds: `npm run build`.
- [x] Compare these surfaces in both themes at desktop and mobile widths; verify halos match their section ground.
- [x] Check original screenshot and logo colors are unchanged.

**Dependencies:** Tasks 3–4.

**Files likely touched:**
- `src/sections/Hero.tsx`
- `src/sections/AgentYear.tsx`
- `src/sections/Contact.tsx`
- `src/sections/Experience.tsx`

**Estimated scope:** Medium.

## Checkpoint: Section surfaces

- [x] Tasks 3–5 acceptance criteria pass; build succeeds.
- [x] Check both theme foreground/background pairs, section halos, logo backing surfaces, and unaltered screenshot colors before final canvas review.

## Task 6: Make the halftone palette and overlap behavior theme-aware

**Description:** Assess a theme-aware canvas palette together with its multiply overlap/compositing on the deeper section grounds. Retain the recognizable hue families, geometry, layer order, and motion; limit any palette/compositing adjustment to what is needed for readable separation. On a theme change, repaint every selected layer using the stable notification contract from Task 1.

**Acceptance criteria:**
- [x] Neutral and colored screens retain intentional separation in both themes, including overlaps; section halos match their actual grounds.
- [x] A theme toggle immediately repaints every selected layer in Hero, AgentYear, and Contact without resize or reload, including paused/reduced-motion frames.
- [x] Existing offscreen pause, cleanup, and reduced-motion still-frame behavior remains intact.

**Verification:**
- [x] Build succeeds: `npm run build`.
- [x] Toggle themes on each of Hero, AgentYear, and Contact; verify redraw, overlaps, text over dots, offscreen behavior, and reduced-motion still frames.
- [x] Confirm the hero canvas above the intro curtain matches the resolved theme from its first visible frame.

**Dependencies:** Task 1.

**Files likely touched:**
- `src/components/Halftone.tsx`
- `src/index.css` (only if a halftone-specific theme token is needed)

**Estimated scope:** Small.

## Checkpoint: Complete

- [x] All task acceptance criteria pass.
- [x] `npm run build` succeeds and production preview has no hydration warnings or console errors.
- [x] Both themes are checked at desktop and mobile widths, including toggle, keyboard focus, all sections, mobile-menu focus/Escape/anchor/scroll behavior, and reduced motion. Header has no overflow at 320px, 390px, the desktop-navigation breakpoint, or desktop width. **Partial:** 320px, 390px, 1024px, and 1440px viewports checked; both themes rendered on desktop and mobile; theme toggle and persistence, keyboard focus/activation, system preference update, and mobile menu focus/Escape/anchor/scroll unlock were exercised. Reduced-motion rendering was loaded in dark mode; reduced-motion contrast and an OS-triggered canvas repaint were not independently sampled. No physical device, trackpad, or 120Hz behavior was tested.
- [x] Recorded measured contrast for representative text/surface pairs and fresh preview screenshots at desktop and 390px mobile in both themes. Screenshot paths: `/tmp/opencode/wrapped-final-dark.png`, `/tmp/opencode/wrapped-dark-390.png`, `/tmp/opencode/wrapped-light-390.png`. These are visual evidence, not automated full-page contrast sampling.
