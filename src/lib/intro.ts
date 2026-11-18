import "../intro.css";

/** The curtain stays up at least this long, so the hero's halftone disc has time to print. */
const MIN_MS = 1000;
/** The curtain lifts after this long even if the page is still loading. */
const MAX_MS = 2400;
/** Matches the opacity transition in src/intro.css. */
const FADE_MS = 400;

/**
 * Runs the loading screen on every visit. index.html has already set `intro-running` on <html>, or
 * `intro-skip` (in which case there is nothing to do). The curtain lifts once the page has loaded,
 * fonts are ready, and MIN_MS has passed, or at MAX_MS at the latest.
 */
export function runIntro(): void {
  const root = document.documentElement;
  const overlay = document.getElementById("intro");
  if (!root.classList.contains("intro-running")) {
    overlay?.remove();
    return;
  }

  const app = document.getElementById("root");
  if (app) app.inert = true;

  const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
  const loaded = new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });
  const fonts = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();

  void Promise.race([Promise.all([wait(MIN_MS), loaded, fonts]), wait(MAX_MS)]).then(() => {
    root.classList.remove("intro-running");
    root.classList.add("intro-leaving");
    if (app) app.inert = false;
    window.setTimeout(() => {
      root.classList.remove("intro-leaving");
      overlay?.remove();
    }, FADE_MS);
  });
}
