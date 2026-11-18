import { person, photos, socials } from "../content";
import { Halftone } from "../components/Halftone";
import { Icon } from "../components/ui";

const DISC = [{ x: 0.5, y: 0.5, r: 0.49 }];
const INKS = [0, 2, 3];

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="section t-cobalt on-cobalt [--halo:var(--color-cobalt)]">
      <Halftone circles={DISC} inks={INKS} seed={23} pitch={7} className="bottom-[-30%] left-[-40vw] aspect-square w-[100vw] opacity-80 sm:left-[-22vw] sm:w-[70vw] lg:bottom-[-42%] lg:left-[-12vw] lg:w-[min(52vw,760px)]" />

      <div className="wrap flex min-h-[calc(100svh-var(--padt)-var(--padb))] flex-col justify-between gap-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p className="tag tag--paper">
              <span className="tag__caret" aria-hidden="true">&gt;</span> 07 contact
              <span className="tag__cursor" aria-hidden="true" />
            </p>
            <h2 id="contact-title" className="mt-6 text-[clamp(52px,8vw,120px)] leading-[0.9] tracking-[-0.065em]">
              <span className="halo">Contact.</span> <br />
              <span className="mt-2 inline-block -rotate-2 bg-lime px-[0.2em] pb-[0.1em] text-ink">Send me the slow job.</span>
            </h2>
            <p className="lead halo mt-8">
              Tell me what you want built, or the manual task you want gone. I reply in English or Bahasa Indonesia.
            </p>
            <a href={`mailto:${person.email}?subject=Project%20for%20Adam`} className="btn mt-8 w-full sm:w-auto">
              Contact Me <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <ul className="self-end lg:col-span-5 lg:col-start-8">
            {socials.map((s) => (
              <li key={s.label} className="border-b border-paper/30 first:border-t">
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "me noopener" } : {})}
                  className="group flex min-h-[76px] items-center gap-4 py-3 transition-[padding] duration-300 hover:pl-2"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper-2 transition-transform duration-300 group-hover:-rotate-6">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="text-[24px] leading-[1.1] tracking-[-0.04em]">{s.label}</span>
                    <span className="text-[14px] opacity-90">{s.handle}</span>
                  </span>
                  <span className="text-[22px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/30 pt-5 text-[14px] sm:flex-row sm:items-start sm:justify-between">
          <p>© 2026 {person.name}</p>
          <details className="group max-w-[42em] sm:text-right">
            <summary className="link inline-flex min-h-11 cursor-pointer list-none items-center">Photographs via Wikimedia Commons</summary>
            <ul className="mt-2 grid gap-1 opacity-85">
              {photos.map((p) => (
                <li key={p.src}>
                  <a className="link" href={p.page} target="_blank" rel="noopener">
                    {p.credit}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  );
}
