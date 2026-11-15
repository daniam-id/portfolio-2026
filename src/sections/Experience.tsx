import type { CSSProperties } from "react";
import { roles } from "../content";
import { SectionHead, useInView } from "../components/ui";

const MONTHS = 24; // Jan 2025 to Dec 2026
const bg: Record<string, string> = {
  tomato: "bg-tomato",
  lime: "bg-lime",
  cobalt: "bg-cobalt",
  ink: "bg-ink",
};

export function Experience() {
  const [ref, seen] = useInView<HTMLOListElement>({ threshold: 0.25 });
  return (
    <section id="experience" aria-labelledby="exp-title" className="section t-mint">
      <div className="wrap">
        <SectionHead index="05 experience" id="exp-title">
          Experience and activities with teams, a hackathon and a studio
        </SectionHead>

        <div className="mt-12 hidden grid-cols-12 gap-6 lg:grid" aria-hidden="true">
          <div className="col-span-7 col-start-6 grid grid-cols-2 border-b border-ink/30 pb-2 font-mono text-[13px]">
            <span>2025</span>
            <span className="border-l border-ink/30 pl-2">2026</span>
          </div>
        </div>

        <ol ref={ref} className="mt-8 grid lg:mt-0">
          {roles.map((r, i) => (
            <li key={r.title} className="group grid grid-cols-1 gap-4 border-b border-ink/20 py-6 transition-[translate] duration-300 hover:translate-x-1.5 lg:grid-cols-12 lg:items-center lg:gap-6">
              <div className="lg:col-span-5">
                <p className="mono flex gap-3 text-[13px] opacity-75">
                  <span>{r.when}</span>
                  <span aria-hidden="true">·</span>
                  <span>{r.kind}</span>
                </p>
                <h3 className="mt-2 text-[clamp(22px,2vw,28px)] leading-[1.08] tracking-[-0.04em]">{r.title}</h3>
                <p className="mt-1 text-[16px] opacity-80">{r.org}</p>
              </div>
              <div className="relative h-4 bg-ink/10 lg:col-span-7" aria-hidden="true">
                <span className="absolute inset-y-0 left-1/2 w-px bg-ink/30" />
                <span
                  className={`bar glint absolute inset-y-0 !h-full transition-[scale,height] duration-1000 group-hover:!h-[140%] group-hover:-translate-y-[14%] ${bg[r.tone]}`}
                  style={{
                    left: `${(r.start / MONTHS) * 100}%`,
                    width: `${Math.max(1.6, ((r.end - r.start) / MONTHS) * 100)}%`,
                    scale: seen ? "1 1" : "0 1",
                    transitionDelay: `${0.2 + i * 0.12}s`,
                    transitionTimingFunction: "var(--ease)",
                    "--glint": `${2.6 + i * 0.4}s`,
                  } as CSSProperties}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
