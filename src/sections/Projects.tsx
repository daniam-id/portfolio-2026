import { projects, type Project } from "../content";
import { SectionHead } from "../components/ui";

const tone: Record<string, string> = {
  lime: "t-lime",
  tomato: "t-tomato",
  cobalt: "t-cobalt",
  sand: "t-sand",
  mint: "t-mint",
  ink: "t-ink",
};

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section t-paper">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead index="04 projects --selected" id="projects-title">
            Selected projects, from a hackathon to a studio platform
          </SectionHead>
          <a href="https://github.com/daniam-id" className="link shrink-0 text-[17px] font-medium" rel="noopener">
            See all repos on GitHub →
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {projects.map((p) => (
            <li key={p.id} className="card flex flex-col bg-paper-2">
              <div className={`relative h-[240px] overflow-hidden ${tone[p.tone]}`}>
                <Fragment kind={p.visual} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="mono flex items-center justify-between text-[13px] opacity-70">
                  <span>{p.name}</span>
                  <span>{p.year}</span>
                </p>
                <h3 className="mt-3 text-[24px] leading-[1.08] tracking-[-0.04em]">{p.what}</h3>
                <p className="mt-3 text-[16px] leading-[1.5] opacity-85">{p.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
                  {p.stack.map((s) => (
                    <li key={s} className="pill">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-[16px] font-medium">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} className="link inline-flex min-h-11 items-center" target="_blank" rel="noopener">
                      {l.label} <span aria-hidden="true">&nbsp;↗</span>
                      <span className="sr-only"> for {p.name} (opens in a new tab)</span>
                    </a>
                  ))}
                  {p.note && <span className="inline-flex min-h-11 items-center text-[15px] font-normal opacity-60">{p.note}</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Small, live-HTML pieces of each product: what it works on, not a generic dashboard. */
function Fragment({ kind }: { kind: Project["visual"] }) {
  switch (kind) {
    case "route":
      return (
        <svg viewBox="0 0 400 230" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="rgb(25 25 25 / .14)" strokeWidth="10" fill="none">
            <path d="M-10 60 H420 M-10 150 H420 M90 -10 V240 M230 -10 V240 M330 -10 V240" />
          </g>
          <path d="M40 190 V150 H230 V60 H360" fill="none" stroke="rgb(25 25 25 / .3)" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
          <path className="route-new" d="M40 190 V150 H90 V60 H360" fill="none" stroke="#191919" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
          <circle cx="230" cy="110" r="16" fill="#2f4be0" />
          <path d="M230 100c-5 7-7 10-7 13a7 7 0 0 0 14 0c0-3-2-6-7-13z" fill="#f4f1ea" />
          <rect x="30" y="180" width="20" height="20" rx="4" fill="#ff5a36" />
          <rect x="350" y="50" width="20" height="20" rx="10" fill="#191919" />
          <g transform="translate(246 128)">
            <rect width="140" height="30" rx="6" fill="#191919" />
            <text x="12" y="20" fontFamily="ui-monospace,monospace" fontSize="12" fill="#d8f34a">&gt;</text>
            <text x="26" y="20" fontFamily="ui-monospace,monospace" fontSize="12" fill="#f4f1ea">flood: reroute</text>
          </g>
        </svg>
      );
    case "chat":
      return (
        <div className="absolute inset-0 flex flex-col justify-center gap-2.5 px-6 text-[14px] leading-[1.35]" aria-hidden="true">
          <p className="chat-in ml-auto max-w-[78%] rounded-[14px] rounded-br-[4px] bg-paper-2 px-3.5 py-2.5">Pemasukan 150000 dari penjualan bakso</p>
          <p className="chat-out max-w-[84%] rounded-[14px] rounded-bl-[4px] bg-ink px-3.5 py-2.5 text-paper">
            <span className="text-lime">✓</span> Pemasukan Rp150.000 dicatat sebagai ‘penjualan bakso’
          </p>
          <p className="chat-out2 max-w-[60%] rounded-[14px] rounded-bl-[4px] bg-ink/85 px-3.5 py-2 text-[13px] text-paper/90">Total pemasukan hari ini: Rp150.000</p>
        </div>
      );
    case "meter":
      return (
        <div className="absolute inset-0 flex flex-col justify-center gap-5 px-6" aria-hidden="true">
          <div>
            <p className="text-[13px] opacity-80">Tension</p>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="meter-seg h-6 flex-1 rounded-[2px] bg-paper/25" style={{ animationDelay: `${i * 0.12}s`, ["--c" as string]: i > 8 ? "#ff5a36" : i > 5 ? "#d8f34a" : "#f4f1ea" }} />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[13px]">
            {["Authoritative", "Collaborative", "De-escalation"].map((t, i) => (
              <span key={t} className="tone-pill rounded-full border border-paper/50 px-3 py-1.5" style={{ animationDelay: `${i * 1.07}s` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      );
    case "bill":
      return (
        <div className="absolute inset-x-6 inset-y-5 flex flex-col gap-0 rounded-[10px] bg-paper-2 p-4 text-[13px]" aria-hidden="true">
          <div className="flex items-center justify-between">
            <span className="font-medium">Household bill</span>
            <span className="mono rounded bg-ink px-1.5 py-0.5 text-[11px] text-lime">JWT</span>
          </div>
          {["Flat monthly fee", "PDAM water, metered", "Total due"].map((r, i) => (
            <div key={r} className={`flex items-center justify-between gap-4 border-ink/10 py-2 ${i ? "border-t" : "mt-1.5"} ${i === 2 ? "font-medium" : ""}`}>
              <span>{r}</span>
              <span className="bill-line h-2 rounded-full bg-ink/80" style={{ width: [44, 62, 76][i], animationDelay: `${i * 0.4}s` }} />
            </div>
          ))}
          <span className="mt-auto self-start rounded-full bg-tomato px-3 py-1 text-[12px] font-medium">Send bills</span>
        </div>
      );
    case "booth":
      return (
        <div className="absolute inset-0 flex items-center justify-center gap-4" aria-hidden="true">
          {[0, 1, 2].map((s) => (
            <div key={s} className={`flex flex-col gap-1.5 rounded-[4px] bg-paper-2 p-1.5 shadow-[0_12px_24px_-14px_rgb(25_25_25/.5)] ${s === 1 ? "-translate-y-2" : "translate-y-2"}`}>
              {[0, 1, 2].map((k) => (
                <span key={k} className="booth-slot block h-[46px] w-[62px] rounded-[2px]" style={{ animationDelay: `${(s * 3 + k) * 0.25}s` }} />
              ))}
              <span className="mono mt-0.5 text-center text-[8px] opacity-60">venture</span>
            </div>
          ))}
          <span className="absolute bottom-4 right-4 rounded-full bg-ink px-3 py-1.5 text-[12px] text-paper">Export PNG</span>
        </div>
      );
    case "orders":
      return (
        <div className="absolute inset-x-6 inset-y-5 flex flex-col justify-center gap-2 text-[13px]" aria-hidden="true">
          {[
            { what: "UI/UX design", s: 2 },
            { what: "Brand identity", s: 1 },
            { what: "3D modelling", s: 0 },
          ].map((o, i) => (
            <div key={o.what} className="flex items-center justify-between rounded-[8px] bg-paper/10 px-3 py-2.5">
              <span>{o.what}</span>
              <span className="flex gap-1">
                {["Paid", "In progress", "Delivered"].map((st, k) => (
                  <span key={st} className={`order-dot size-2.5 rounded-full ${k <= o.s ? "bg-lime" : "bg-paper/25"}`} style={{ animationDelay: `${i * 0.3 + k * 0.15}s` }} />
                ))}
              </span>
            </div>
          ))}
          <p className="mono mt-1 text-[11px] opacity-70">paid → in progress → delivered</p>
        </div>
      );
  }
}
