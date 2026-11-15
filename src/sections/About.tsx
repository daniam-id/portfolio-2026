import type { CSSProperties } from "react";
import { agentYear, principles } from "../content";
import { Halftone } from "../components/Halftone";
import { SectionHead } from "../components/ui";

const POSTER_DISCS = [{ x: 0.82, y: 0.2, r: 0.36 }];
const POSTER_INKS = [0, 2, 3];

const toneClass: Record<string, string> = {
  lime: "bg-lime",
  mint: "bg-mint",
  paper: "bg-paper-2",
  sand: "bg-paper",
  tomato: "bg-tomato",
};

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section t-sand">
      <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <SectionHead index="01 about" id="about-title">
            A student who ships <span className="soft">working software.</span>
          </SectionHead>

          <div className="mt-8 flex max-w-[34em] flex-col gap-5 text-[17px] leading-[1.6] sm:text-[18px]">
            <p>
              I’m Adam, a student in Indonesia who builds for the web. I write TypeScript most days, with React and Next.js
              on the front and Node.js, Supabase or Firebase behind.
            </p>
            <p>
              Most of my projects start from a slow, manual job: a shop owner writing cash notes by hand, a dispatcher
              rerouting couriers by phone, a team answering WhatsApp chats one at a time. I find the step a model or a
              script can take over, then build the smallest version that works.
            </p>
            <p>Away from code I take photographs and design posters, and that habit shapes how I set type on a screen.</p>
          </div>

          <h3 className="mt-10 text-[15px] font-medium tracking-[-0.01em]">How I work</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {principles.map((p, i) => (
              <li
                key={p.word}
                className={`chip bob ${toneClass[p.tone]} ${p.tone === "tomato" ? "text-ink" : ""}`}
                style={{ "--bob": `${i * 0.35}s` } as CSSProperties}
              >
                {p.word}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Poster />
        </div>
      </div>
    </section>
  );
}

function Poster() {
  const y = agentYear;
  return (
    <figure className="relative mx-auto w-full max-w-[460px] lg:max-w-none" aria-label="Adam’s 2026 with AI agents, as a poster">
      <div className="relative overflow-hidden rounded-[16px] bg-cobalt text-paper shadow-[0_40px_80px_-40px_rgb(25_25_25/0.55)] [--halo:var(--color-cobalt)]">
        <Halftone circles={POSTER_DISCS} inks={POSTER_INKS} seed={5} pitch={6} className="inset-x-0 top-0 h-[62%] w-full opacity-80" />
        <div className="relative px-6 pt-6 sm:px-7 sm:pt-7">
          <p className="tag tag--paper !text-[12px]">
            <span className="tag__caret" aria-hidden="true">&gt;</span> adam --wrapped 2026
          </p>
          <p className="halo mt-16 text-[22px] tracking-[-0.04em] sm:mt-20">This year I was</p>
          <p className="mt-2 flex origin-top-left -rotate-2 flex-wrap gap-x-1.5 gap-y-1 text-[clamp(40px,5vw,58px)] leading-none tracking-[-0.055em]">
            {["a night-shift", "builder"].map((w) => (
              <span key={w} className="whitespace-nowrap bg-lime px-[0.24em] pb-[0.13em] pt-[0.05em] text-ink">
                {w}
              </span>
            ))}
          </p>
          <p className="serif mt-4 text-[22px] leading-[1.08] text-balance">
            Peak hour {y.peakHour}. About a third of my prompts landed after dark.
          </p>
        </div>

        <dl className="relative mx-6 mt-6 grid grid-cols-4 gap-2 text-ink sm:mx-7">
          <Cell className="col-span-2 bg-tomato" big value={String(y.projects)} label="projects built with agents" />
          <Cell className="col-span-2 bg-lime" big value={String(y.activeDays)} label="active days" />
          <Cell className="bg-mint" value={String(y.streakDays)} unit="d" label="best streak" />
          <Cell className="bg-sand" value={String(y.models)} label="models tried" />
          <Cell className="col-span-2 bg-ink text-paper" value={String(y.providers)} label="AI providers in rotation" />
        </dl>

        <dl className="relative mx-6 mt-4 text-[14px] sm:mx-7">
          <div className="flex items-baseline justify-between gap-3 border-t border-paper/40 py-1.5">
            <dt>Busiest day</dt>
            <dd className="m-0 font-semibold">{y.busiest}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-t border-paper/40 py-1.5">
            <dt>Most edited language</dt>
            <dd className="m-0 font-semibold">{y.topLanguage}</dd>
          </div>
        </dl>

        <div className="relative mt-4 flex h-11 items-center justify-between bg-ink px-6 text-[13px] sm:px-7">
          <code className="mono flex items-center gap-2">
            <span className="text-lime">$</span> opencode
            <span className="tag__cursor !h-[14px] !w-[7px]" aria-hidden="true" />
          </code>
          <span className="opacity-80">{y.range}</span>
        </div>
      </div>
    </figure>
  );
}

function Cell({ value, unit, label, big = false, className = "" }: { value: string; unit?: string; label: string; big?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col-reverse justify-between gap-2 rounded-[3px] p-2.5 ${big ? "min-h-[92px]" : "min-h-[76px]"} ${className}`}>
      <dt className="text-[12px] leading-[1.1] tracking-[-0.01em]">{label}</dt>
      <dd className={`m-0 leading-[0.95] tracking-[-0.06em] ${big ? "text-[40px]" : "text-[30px]"}`}>
        {value}
        {unit && <i className="ml-0.5 text-[0.45em] not-italic tracking-[-0.03em]">{unit}</i>}
      </dd>
    </div>
  );
}
