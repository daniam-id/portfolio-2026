import { Halftone } from "../components/Halftone";
import { Dots, Rise, Tag } from "../components/ui";

const DISC = [{ x: 0.5, y: 0.5, r: 0.49 }];
const DOTS = [
  { x: 8, y: 14, size: 14, color: "var(--color-tomato)", at: 1.7 },
  { x: 14, y: 22, size: 9, color: "var(--color-tomato)", at: 1.76 },
  { x: 6, y: 34, size: 11, color: "var(--color-cobalt)", at: 1.9 },
  { x: 54, y: 18, size: 10, color: "var(--color-ink)", at: 2 },
  { x: 47, y: 62, size: 12, color: "var(--color-lime)", at: 2.1 },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="section t-paper flex flex-col" style={{ paddingTop: "calc(var(--nav) + 28px)", paddingBottom: "40px" }}>
      {/* Layers: halftone disc, cobalt arc with its orbiting lime square, tomato bar, confetti */}
      <Halftone
        circles={DISC}
        seed={3}
        pitch={7}
        className="top-[20svh] right-[-48vw] aspect-square w-[82vw] opacity-80 sm:opacity-100 sm:top-[-6svh] sm:right-[-12vw] sm:w-[78vw] lg:right-[-6vw] lg:top-[-14svh] lg:w-[min(64vw,980px)]"
      />
      <div
        className="pop absolute bottom-[-72vw] right-[-40vw] aspect-square w-[92vw] sm:bottom-[-34vw] sm:right-[-22vw] sm:w-[70vw] lg:bottom-[-30vw] lg:right-[-14vw] lg:w-[52vw]"
        style={{ "--delay": "0.5s" } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="breathe size-full rounded-full bg-cobalt" />
        <div className="spin-slow absolute inset-0">
          <span className="absolute left-1/2 top-[5%] size-4 -translate-x-1/2 bg-lime sm:size-5" />
        </div>
      </div>
      <span
        className="grow-x glint absolute bottom-[19svh] left-0 h-3 w-[46vw] bg-tomato sm:h-3.5"
        style={{ "--delay": "0.7s", "--glint": "3s" } as React.CSSProperties}
        aria-hidden="true"
      />
      <Dots dots={DOTS} />

      <div className="wrap flex flex-1 flex-col justify-between gap-8">
        <div>
          <Tag at={0.4}>adam --portfolio 2026</Tag>
          <h1 id="hero-title" className="mt-5 sm:mt-6">
            <span className="display halo block text-[clamp(84px,min(15vw,18.5svh),232px)]">
              <Rise at={0.8}>Adam</Rise>
              <Rise at={0.92}>Dani</Rise>
            </span>
            <span className="mt-4 block text-[clamp(24px,3.2vw,46px)] leading-[1.12] tracking-[-0.045em] sm:mt-6">
              <span className="hl wipe" style={{ "--delay": "0.85s" } as React.CSSProperties}>
                 CTO &amp; Product Engineer
              </span>
            </span>
          </h1>
        </div>

        <div className="enter max-w-[620px]" style={{ "--delay": "1.0s" } as React.CSSProperties}>
          <p className="mono text-[13px] uppercase tracking-[0.04em] opacity-70">Student · Indonesia · on GitHub since 2025</p>
          <p className="lead halo mt-3">
            I build web apps, AI tools and WhatsApp automations for small businesses, teams and events, front end first and
            full stack when the product needs it.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn">
              Explore Projects <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn btn--ghost bg-paper/70 backdrop-blur-sm">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
