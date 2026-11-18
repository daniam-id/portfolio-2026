# Page sections

**Parent context:** `../AGENTS.md`
**Generated:** 2026-11-18 · **Updated:** 2026-11-18

| File | Owns |
| --- | --- |
| `Hero.tsx` | `#top`, the entrance composition, and the link to projects. |
| `About.tsx`, `about.css` | Bio, working principles, and the Venture Studio link. |
| `AgentYear.tsx` | The usage snapshot. Totals come from `content.ts`, while ranked tool counts live in the component. |
| `Services.tsx`, `services.css` | The services matrix and readable labels for tools. |
| `Projects.tsx`, `projects.css` | Gallery order, roles and statuses, responsive screenshots, and project heading IDs. |
| `Experience.tsx`, `experience.css` | Roles sorted by `start`, with chapter labels and links into the gallery. |
| `Contact.tsx` | Footer with contact and social links and a return to `#top`. |

## Cross-section changes

- Navigation depends on the IDs in `../content.ts` and `../components/Nav.tsx`. On section renames, check `href`, `id`, and `aria-labelledby` together. The usage snapshot is in the page flow and omitted from the header progress list.
- When adding or renaming a project, sync its `content.ts` ID with `projectOrder`, `projectDetails`, and any `#project-${id}` links in `Experience.tsx`. Match `Experience.tsx` chapter keys to the corresponding `roles[].org` strings.
- For a verified project screenshot, provide `shot.src` as the `-1200.webp` path, meaningful `alt`, and `host`. `Projects.tsx` derives the `-640.webp` path from that name. Omit `shot` for a text-only entry.
- Keep usage figures and role descriptions grounded in verified sources. Review `AgentYear.tsx` and `content.ts` together when updating the usage snapshot.

## Checks

Run `npm run build`, then preview affected sections at narrow and wide widths. Follow changed section and project anchors, and check that each screenshot variant loads. For motion changes, also check reduced motion.

## Manual Notes
