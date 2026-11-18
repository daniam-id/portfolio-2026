import { useEffect } from "react";

/** Fraction of the remaining distance covered per 1/60 s. Lower is slower. */
const EASE = 0.07;
const FRAME_MS = 1000 / 60;

/**
 * Glides the page toward each wheel step instead of jumping. The glide is time-based, so it runs at the
 * same speed on 60 Hz and 120 Hz screens. Trackpad momentum is replaced by this glide. Keyboard, scrollbar,
 * anchor, and touch scrolling stay native, and the glide picks up wherever they leave the page.
 * Off under reduced motion, and while the first-visit loading screen is up.
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let last = 0;
    let frame = 0; // non-zero while a glide is running

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const glide = (now: number) => {
      const dt = last ? Math.min(64, now - last) : FRAME_MS;
      last = now;
      current += (target - current) * (1 - Math.pow(1 - EASE, dt / FRAME_MS));
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo({ top: current, behavior: "instant" as ScrollBehavior });
      frame = current === target ? 0 : requestAnimationFrame(glide);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey) return; // pinch zoom
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return; // sideways swipes stay native
      if (document.documentElement.classList.contains("intro-running")) return;
      if (insideScroller(event.target)) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.min(maxScroll(), Math.max(0, target + event.deltaY * unit));
      if (!frame) {
        current = window.scrollY;
        last = 0;
        frame = requestAnimationFrame(glide);
      }
    };

    // Native scrolling moves the page without us. A jump we did not make (keyboard, scrollbar, anchor,
    // a restored position) wins over a glide in progress, so it cannot drag the page back.
    const onScroll = () => {
      if (frame && Math.abs(window.scrollY - current) > 2) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      if (!frame) target = current = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}

/** True when the pointer is over an element that scrolls on its own, so its wheel input stays native. */
function insideScroller(node: EventTarget | null): boolean {
  for (let el = node instanceof Element ? node : null; el && el !== document.body; el = el.parentElement) {
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) return true;
  }
  return false;
}
