import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { asset } from "../lib/asset";
import { motionQuery, useReducedMotion } from "../lib/motion";

const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

/** Terminal chip: `> text▌`. `animate` wipes it in once on load. */
export function Tag({ children, paper = false, at, className = "" }: { children: ReactNode; paper?: boolean; at?: number; className?: string }) {
  return (
    <p className={`tag ${paper ? "tag--paper" : ""} ${at !== undefined ? "wipe" : ""} ${className}`} style={at !== undefined ? delay(at) : undefined}>
      <span className="tag__caret" aria-hidden="true">&gt;</span>
      <span>{children}</span>
      <span className="tag__cursor" aria-hidden="true" />
    </p>
  );
}

/** A line of display type that rises out of a mask once on load. */
export function Rise({ children, at = 0, className = "" }: { children: ReactNode; at?: number; className?: string }) {
  return (
    <span className={`rise ${className}`}>
      <span style={delay(at)}>{children}</span>
    </span>
  );
}

export function Icon({ name, size = 22, className = "" }: { name: string; size?: number; className?: string }) {
  return <img src={asset(`icons/${name}.svg`)} alt="" width={size} height={size} className={className} loading="lazy" decoding="async" />;
}

const TOOL_NAMES: Record<string, string> = {
  react: "React",
  nextjs: "Next.js",
  typescript: "TypeScript",
  nodejs: "Node.js",
  gemini: "Gemini",
  openai: "OpenAI",
  firebase: "Firebase",
  whatsapp: "WhatsApp",
  supabase: "Supabase",
  figma: "Figma",
  tailwindcss: "Tailwind CSS",
};

/** Real tool logos on a paper disc so each keeps its own colours on any ground. */
export function ToolRow({ tools }: { tools: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tools">
      {tools.map((t) => (
        <li key={t} className="grid size-10 place-items-center rounded-full bg-paper-2" title={TOOL_NAMES[t] ?? t}>
          <Icon name={t} size={20} />
          <span className="sr-only">{TOOL_NAMES[t] ?? t}</span>
        </li>
      ))}
    </ul>
  );
}

export function useInView<T extends Element>(options: IntersectionObserverInit = { threshold: 0.35 }) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen]);
  return [ref, seen] as const;
}

/** Counts from zero to `to` once `run` turns true. Under reduced motion it shows the number at once. */
export function CountUp({ to, run, duration = 1800 }: { to: number; run: boolean; duration?: number }) {
  const [value, setValue] = useState(to);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, duration, reduced]);
  return (
    <span className="tnum" aria-label={to.toLocaleString("en-US")}>
      <span aria-hidden="true">{value.toLocaleString("en-US")}</span>
    </span>
  );
}

type Dot = { x: number; y: number; size: number; color: string; at?: number };

/** Little square confetti that springs away from the mouse and settles back. */
export function Dots({ dots }: { dots: Dot[] }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia(motionQuery);
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const nodes = Array.from(el.children) as HTMLElement[];
    const reset = () => nodes.forEach((node) => node.style.removeProperty("translate"));
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      nodes.forEach((node, i) => {
        const dx = dots[i].x / 100 * rect.width - (event.clientX - rect.left);
        const dy = dots[i].y / 100 * rect.height - (event.clientY - rect.top);
        const distance = Math.hypot(dx, dy);
        const push = distance > 0 ? Math.max(0, 1 - distance / 140) ** 2 * 40 : 0;
        node.style.translate = `${dx / (distance || 1) * push}px ${dy / (distance || 1) * push}px`;
      });
    };
    let visible = true;
    const section = el.closest("section")!;
    const update = () => {
      section.removeEventListener("pointermove", onMove);
      reset();
      if (!reduce.matches && fine.matches && visible) section.addEventListener("pointermove", onMove, { passive: true });
    };
    nodes.forEach((node) => { node.style.transition = "translate 350ms cubic-bezier(.22,1,.36,1)"; });
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }) : null;
    observer?.observe(section);
    update();
    section.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    reduce.addEventListener("change", update);
    fine.addEventListener("change", update);
    return () => {
      observer?.disconnect(); reset();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      reduce.removeEventListener("change", update);
      fine.removeEventListener("change", update);
    };
  }, [dots]);

  return (
    <div ref={box} className="pointer-events-none absolute inset-0" aria-hidden="true">
      {dots.map((d, i) => (
        <span key={i} className="absolute" style={{ left: `${d.x}%`, top: `${d.y}%` }}>
          <span
            className="pop block"
            style={{ ...delay(d.at ?? 1.6), width: d.size, height: d.size }}
          >
            <span className="flip block size-full" style={{ background: d.color, animationDelay: `${(i * 0.7) % 3}s` }} />
          </span>
        </span>
      ))}
    </div>
  );
}

/** Section heading row: a mono index tag, then the h2. */
export function SectionHead({ index, id, children, paperTag = false, className = "" }: { index: string; id: string; children: ReactNode; paperTag?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col items-start gap-5 ${className}`}>
      <Tag paper={paperTag}>{index}</Tag>
      <h2 id={id} className="h2">
        {children}
      </h2>
    </div>
  );
}
