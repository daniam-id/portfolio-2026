import { services, type Service } from "../content";
import { Halftone } from "../components/Halftone";
import { SectionHead, ToolRow } from "../components/ui";
import { asset } from "../lib/asset";

const tone: Record<string, string> = {
  tomato: "t-tomato",
  cobalt: "t-cobalt",
  ink: "t-ink",
  mint: "t-mint",
};

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section t-lime">
      <div className="carets" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i}>{"> ".repeat(40)}</span>
        ))}
      </div>
      <div className="wrap">
        <SectionHead index="03 services" id="services-title">
          Four kinds of work I take on
        </SectionHead>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {services.map((s) => (
            <li key={s.n} className={`card flex flex-col rounded-[16px] p-5 sm:p-6 ${tone[s.tone]}`}>
              <div className="relative h-[150px] overflow-hidden rounded-[10px] bg-black/10 sm:h-[170px]">
                <Visual kind={s.visual} />
              </div>
              <p className="mt-6 text-[56px] leading-[0.9] tracking-[-0.07em] opacity-90">{s.n}</p>
              <h3 className="mt-3 text-[24px] leading-[1.05] tracking-[-0.04em]">{s.title}</h3>
              <p className="mt-3 flex-1 text-[16px] leading-[1.5] opacity-90">{s.body}</p>
              <div className="mt-6">
                <ToolRow tools={s.tools} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const DOT_DISC = [{ x: 0.5, y: 0.55, r: 0.42 }];
const DOT_INKS = [3, 0];

function Visual({ kind }: { kind: Service["visual"] }) {
  if (kind === "browser") {
    return (
      <div className="absolute inset-4 flex flex-col overflow-hidden rounded-[8px] bg-paper-2 text-ink" aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
          <span className="size-2 rounded-full bg-tomato" />
          <span className="size-2 rounded-full bg-lime" />
          <span className="size-2 rounded-full bg-mint" />
          <span className="ml-2 h-2 flex-1 rounded-full bg-ink/10" />
        </div>
        <div className="grid flex-1 grid-cols-[1fr_1.2fr] gap-2 p-3">
          <div className="flex flex-col gap-1.5">
            <span className="h-3 w-[90%] rounded-sm bg-ink" />
            <span className="h-3 w-[60%] rounded-sm bg-ink" />
            <span className="mt-1 h-1.5 w-[80%] rounded-sm bg-ink/25" />
            <span className="h-1.5 w-[70%] rounded-sm bg-ink/25" />
            <span className="mt-auto flex h-5 w-[58%] items-center rounded-full bg-ink px-2">
              <span className="loop-cursor h-2 w-1 bg-lime" />
            </span>
          </div>
          <div className="loop-swap rounded-[4px] bg-cobalt" />
        </div>
      </div>
    );
  }
  if (kind === "dots") {
    return <Halftone circles={DOT_DISC} inks={DOT_INKS} seed={7} pitch={5} strength={1.1} className="inset-0 size-full" />;
  }
  if (kind === "lanes") {
    return (
      <svg viewBox="0 0 260 150" className="absolute inset-0 size-full" aria-hidden="true">
        <g fill="none" stroke="rgb(244 241 234 / .35)" strokeWidth="1.5">
          <path id="l-in" d="M28 75 H104" />
          <path id="l-a" d="M156 75 C186 75 186 32 232 32" />
          <path id="l-b" d="M156 75 H232" />
          <path id="l-c" d="M156 75 C186 75 186 118 232 118" />
        </g>
        <image href={asset("icons/whatsapp.svg")} x="14" y="61" width="28" height="28" />
        <rect x="104" y="51" width="52" height="48" rx="8" fill="#d8f34a" />
        <text x="130" y="80" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="14" fill="#191919">&gt;_</text>
        {[32, 75, 118].map((y, i) => (
          <rect key={y} x="232" y={y - 9} width="18" height="18" rx="4" fill={["#ff5a36", "#bfe8d0", "#2f4be0"][i]} />
        ))}
        <circle r="4" fill="#d8f34a" className="pulse" style={{ offsetPath: "path('M28 75 H104')" }} />
        <circle r="3.5" fill="#fbf9f4" className="pulse pulse--late" style={{ offsetPath: "path('M156 75 C186 75 186 32 232 32')" }} />
        <circle r="3.5" fill="#fbf9f4" className="pulse pulse--late" style={{ offsetPath: "path('M156 75 H232')" }} />
        <circle r="3.5" fill="#fbf9f4" className="pulse pulse--late" style={{ offsetPath: "path('M156 75 C186 75 186 118 232 118')" }} />
      </svg>
    );
  }
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <span className="shape-a absolute left-[10%] top-[16%] aspect-square w-[30%] max-w-[96px] rounded-full bg-tomato" />
      <span className="shape-b absolute left-[44%] top-[22%] aspect-square w-[22%] max-w-[70px] bg-cobalt" />
      <span className="shape-c absolute bottom-[14%] right-[10%] h-[18%] w-[34%] origin-right bg-ink" />
      <span className="absolute bottom-[8%] left-[10%] font-serif text-[48px] italic leading-none">Aa</span>
    </div>
  );
}
