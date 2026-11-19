import type { CSSProperties } from "react";
import { agentYear } from "../content";
import { Halftone } from "../components/Halftone";
import { CountUp, SectionHead, useInView } from "../components/ui";

/** Tool calls from wrapped-2026.html (`tools`), largest first. */
const TOOLS = [
  { label: "Shell commands", count: 19274 },
  { label: "File reads", count: 14595 },
  { label: "File edits", count: 7727 },
  { label: "Searches", count: 7395 },
  { label: "Plans", count: 1985 },
  { label: "Browser actions", count: 1104 },
];
const MAX = TOOLS[0].count;
const DISC = [{ x: 0.5, y: 0.5, r: 0.49 }];
const INKS = [0, 1, 3];

export function AgentYear() {
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const y = agentYear;
  return (
    <section id="ai-year" aria-labelledby="ai-title" className="section t-tomato [--halo:var(--accent-tomato-surface)]">
      <Halftone circles={DISC} inks={INKS} seed={11} pitch={7} className="right-[-34vw] top-[-12svh] aspect-square w-[70vw] sm:right-[-18vw] sm:w-[48vw] lg:right-[-8vw] lg:top-[-16svh] lg:w-[min(34vw,520px)]" />

      <div ref={ref} className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <SectionHead index="02 ai --year" id="ai-title">
            What I built with AI coding agents in 2026
          </SectionHead>

          <p className="display halo mt-10 text-[clamp(72px,12.5vw,184px)] !leading-[0.9]" data-moment="count">
            <CountUp to={y.linesWritten} run={seen} />
          </p>
          <p className="halo text-[clamp(30px,4.2vw,60px)] leading-none tracking-[-0.06em]">lines written</p>
          <p className="lead halo mt-6">
            From {y.prompts.toLocaleString("en-US")} prompts across {y.sessions} sessions, {y.range}. Agents do the typing;
            I set the plan, read the diffs and decide what ships.
          </p>
        </div>

        <div className="self-end lg:col-span-5 lg:col-start-8">
          <h3 className="text-[15px] font-medium">What the agents ran for me</h3>
          <ul className="mt-4 grid gap-4">
            {TOOLS.map((t, i) => (
              <li key={t.label} data-motion="slide" data-stagger={i % 3} className="group grid grid-cols-[1fr_auto] gap-x-3 gap-y-1.5 text-[18px] tracking-[-0.03em] transition-[translate] duration-300 hover:translate-x-1.5">
                <span>{t.label}</span>
                <span className="tnum opacity-90 group-hover:opacity-100">{t.count.toLocaleString("en-US")}</span>
                <span className="agent-year-bar-track col-span-2 h-2.5">
                  <span
                    data-motion="rule"
                    className="bar glint h-full transition-[scale] duration-1000"
                    style={{
                      width: `${(t.count / MAX) * 100}%`,
                      transitionDelay: `${0.25 + i * 0.08}s`,
                      transitionTimingFunction: "var(--ease)",
                      "--glint": `${2.4 + i * 0.3}s`,
                    } as CSSProperties}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
