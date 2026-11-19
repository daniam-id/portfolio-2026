import { useEffect, useRef, type CSSProperties } from "react";
import { getTheme, onThemeChange, type Theme } from "../lib/theme";

/**
 * A four-screen halftone (ink, cobalt, tomato, lime), each screen rotated to its own angle and
 * layered over the ground, clipped to one or more circles. The dots breathe slowly and swell
 * away from the pointer. It sleeps off screen and draws a single still frame under reduced motion.
 */

type Circle = { x: number; y: number; r: number };

const SCREENS = [
  { light: "#191919", dark: "#f4f1ea", angle: 45 },
  { light: "#2f4be0", dark: "#2f4be0", angle: 75 },
  { light: "#ff5a36", dark: "#ff5a36", angle: 15 },
  { light: "#b9d419", dark: "#b9d419", angle: 0 },
];

const hash = (a: number, b: number) => {
  const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return n - Math.floor(n);
};

type Props = {
  circles: Circle[];
  pitch?: number;
  seed?: number;
  className?: string;
  style?: CSSProperties;
  /** Which screens to draw, by index into SCREENS. */
  inks?: number[];
  strength?: number;
};

const ALL_INKS = [0, 1, 2, 3];

/** Pass `circles` and `inks` as module constants so the effect does not restart on render. */
export function Halftone({ circles, pitch = 7, seed = 1, className = "", style, inks = ALL_INKS, strength = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let reduce = preference.matches;
    let theme: Theme = getTheme();
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    let W = 0;
    let H = 0;
    let step = 1;
    let raf = 0;
    let last = 0;
    let visible = false;
    // Start already a little way into the print, so the first painted frame has ink instead of
    // empty canvas while the curtain is up.
    const t0 = performance.now() - 400;
    const pointer = { x: 0.5, y: 0.5, on: 0, target: 0 };

    /** Per screen, the dots that can ever show, with their static trig terms worked out once. */
    type Grid = { x: Float32Array; y: Float32Array; sx: Float32Array; cx: Float32Array; sy: Float32Array; cy: Float32Array; grain: Float32Array; rad: Float32Array; n: number };
    let grids: Grid[] = [];
    // One offscreen layer per screen; a tick redraws one layer, then all are composed together.
    const layers = SCREENS.map(() => document.createElement("canvas"));
    let turn = 0;

    const build = () => {
      // Cap the dot count so a large canvas costs the same as a small one.
      step = Math.max(pitch * dpr, Math.sqrt((W * H * 0.8) / 5000));
      const half = Math.hypot(W, H) / 2;
      const n = Math.ceil(half / step);
      grids = SCREENS.map((sc) => {
        const ang = (sc.angle * Math.PI) / 180;
        const ca = Math.cos(ang);
        const sa = Math.sin(ang);
        const xs: number[] = [];
        const ys: number[] = [];
        for (let u = -n; u <= n; u++) {
          for (let v = -n; v <= n; v++) {
            const x = W / 2 + (u * ca - v * sa) * step;
            const y = H / 2 + (u * sa + v * ca) * step;
            if (x < 0 || y < 0 || x > W || y > H) continue;
            let near = false;
            for (const c of circles) {
              const r = c.r * W * 1.06;
              if ((x - c.x * W) ** 2 + (y - c.y * H) ** 2 < r * r) { near = true; break; }
            }
            if (near) { xs.push(x); ys.push(y); }
          }
        }
        const len = xs.length;
        const g: Grid = {
          x: Float32Array.from(xs), y: Float32Array.from(ys),
          sx: new Float32Array(len), cx: new Float32Array(len), sy: new Float32Array(len), cy: new Float32Array(len),
          grain: new Float32Array(len), rad: new Float32Array(len), n: len,
        };
        for (let k = 0; k < len; k++) {
          const nx = xs[k] / W;
          const ny = ys[k] / H;
          g.sx[k] = Math.sin(nx * 6); g.cx[k] = Math.cos(nx * 6);
          g.sy[k] = Math.sin(ny * 5); g.cy[k] = Math.cos(ny * 5);
          g.grain[k] = hash(Math.floor(nx * 4 + seed), Math.floor(ny * 6));
          g.rad[k] = Math.hypot(xs[k] - W / 2, ys[k] - H / 2) / half;
        }
        return g;
      });
    };

    const resize = () => {
      W = Math.max(1, Math.round(canvas.offsetWidth * dpr));
      H = Math.max(1, Math.round(canvas.offsetHeight * dpr));
      canvas.width = W;
      canvas.height = H;
      for (const l of layers) { l.width = W; l.height = H; }
      build();
      const t = reduce ? 99 : (performance.now() - t0) / 1000;
      for (const i of inks) paint(i, t);
      compose();
    };

    const compose = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      // Preserve the original light-theme print. Screen composition keeps the bright dark-theme
      // inks from muddying together on deeper section grounds.
      ctx.globalCompositeOperation = theme === "dark" ? "screen" : "multiply";
      for (const i of inks) ctx.drawImage(layers[i], 0, 0);
    };

    const paint = (i: number, t: number) => {
      const lctx = layers[i].getContext("2d");
      if (!lctx) return;
      lctx.clearRect(0, 0, W, H);
      const discs = circles.map((c, k) => ({
        x: (c.x + 0.01 * Math.sin(t * 0.8 + k * 1.9)) * W,
        y: (c.y + 0.008 * Math.cos(t * 0.7 + k * 2.3)) * H,
        r: c.r * W * (1 + 0.025 * Math.sin(t * 0.9 + k)),
      }));
      const px = pointer.x * W;
      const py = pointer.y * H;
      const reach = 0.22 * W;
      const reach2 = reach * reach;
      const live = pointer.on > 0.01;
      const intro = Math.min(1, t * 0.9) * 1.6;
      const base = step * 0.62 * strength;

      {
        const g = grids[i];
        if (!g) return;
        // sin(6x + a) and cos(5y - b) from the stored terms, so the inner loop has no trig.
        const a = t * 0.5 + i;
        const b = t * 0.35 - seed;
        const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
        const bx = 0.5 + 0.36 * Math.sin(t * 0.21 + i * 2.1 + seed);
        const by = 0.5 + 0.4 * Math.cos(t * 0.17 + i * 1.3 + seed * 1.7);
        lctx.fillStyle = SCREENS[i][theme];
        lctx.beginPath();
        for (let k = 0; k < g.n; k++) {
          let x = g.x[k];
          let y = g.y[k];
          let inside = false;
          for (const d of discs) {
            if ((x - d.x) ** 2 + (y - d.y) ** 2 < d.r * d.r) { inside = true; break; }
          }
          if (!inside) continue;
          const grow = intro - g.rad[k];
          if (grow <= 0) continue;
          const nx = x / W - bx;
          const ny = (y / H - by) * 1.4;
          const blob = Math.exp(-(nx * nx + ny * ny) / 0.06);
          const wave = 0.5 + 0.5 * (g.sx[k] * ca + g.cx[k] * sa) * (g.cy[k] * cb + g.sy[k] * sb);
          // The ink screen stays lighter so type over it keeps its contrast.
          const f = i === 0 ? Math.min(0.55, blob * 0.38 + wave * 0.2 + g.grain[k] * 0.1) : Math.min(0.9, blob * 0.8 + wave * 0.1);
          let r = base * Math.sqrt(f) * (grow < 1 ? grow : 1);
          if (live) {
            const dx = x - px;
            const dy = y - py;
            const d2 = dx * dx + dy * dy;
            if (d2 < reach2) {
              const kk = (1 - Math.sqrt(d2) / reach) ** 2 * pointer.on;
              x += dx * kk * 0.5;
              y += dy * kk * 0.5;
              r *= 1 + kk * 0.7;
            }
          }
          if (r < 0.4) continue;
          lctx.moveTo(x + r, y);
          lctx.arc(x, y, r, 0, Math.PI * 2);
        }
        lctx.fill();
      }
    };

    // Touch screens never get the pointer distortion, so their drift only needs a few frames a second.
    // The opening spread still prints at full speed everywhere, and so does mouse hover.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const active = pointer.target > 0 || pointer.on > 0.02;
      const t = (now - t0) / 1000;
      if (now - last < (active ? 24 : finePointer || t < 1.6 ? 60 : 400)) return;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      pointer.on += (pointer.target - pointer.on) * (1 - Math.exp(-dt * 6));
      if (t < 1.2) for (const i of inks) paint(i, t); // the opening spread draws every layer
      else paint(inks[turn++ % inks.length], t);
      compose();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / (r.width || 1);
      const y = (e.clientY - r.top) / (r.height || 1);
      const inBox = x > -0.1 && x < 1.1 && y > -0.1 && y < 1.1;
      pointer.target = inBox ? 1 : 0;
      if (inBox) {
        pointer.x += (x - pointer.x) * 0.5;
        pointer.y += (y - pointer.y) * 0.5;
      }
    };

    const start = () => {
      if (raf || reduce) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    }) : null;
    io?.observe(canvas);
    if (!io) { visible = true; start(); }

    const onVis = () => (document.hidden ? stop() : visible && start());
    document.addEventListener("visibilitychange", onVis);
    const onPreference = () => {
      reduce = preference.matches;
      window.removeEventListener("pointermove", onMove);
      pointer.on = 0;
      pointer.target = 0;
      stop();
      if (reduce) { for (const i of inks) paint(i, 99); compose(); }
      else {
        if (fine.matches) window.addEventListener("pointermove", onMove, { passive: true });
        if (visible && !document.hidden) start();
      }
    };
    const unsubscribeTheme = onThemeChange((nextTheme) => {
      theme = nextTheme;
      const t = reduce ? 99 : (performance.now() - t0) / 1000;
      for (const i of inks) paint(i, t);
      compose();
    });
    onPreference();
    preference.addEventListener("change", onPreference);
    fine.addEventListener("change", onPreference);

    return () => {
      stop();
      ro.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      preference.removeEventListener("change", onPreference);
      fine.removeEventListener("change", onPreference);
      unsubscribeTheme();
    };
  }, [circles, pitch, seed, inks, strength]);

  return <canvas ref={ref} className={`ht ${className}`} style={style} aria-hidden="true" />;
}
