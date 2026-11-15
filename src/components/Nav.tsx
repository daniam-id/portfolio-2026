import { useEffect, useState } from "react";
import { nav } from "../content";

/**
 * Fixed header. The segmented bar under it is the reference's story progress: one segment per
 * section, filled up to the section on screen. It changes on a section boundary, never per pixel.
 */
export function Nav() {
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(ids.indexOf(e.target.id));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById("top");
    const ioTop = new IntersectionObserver(([e]) => e.isIntersecting && setActive(-1), { rootMargin: "-45% 0px -50% 0px" });
    if (hero) ioTop.observe(hero);
    return () => {
      io.disconnect();
      ioTop.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-paper/90 backdrop-blur-md">
        <div className="wrap flex items-center justify-between" style={{ height: "var(--nav)" }}>
          <a href="#top" className="group flex items-center gap-3 rounded-lg text-[17px] font-medium tracking-[-0.03em] no-underline">
            <span className="grid size-9 place-items-center rounded-[8px] bg-ink font-mono text-[15px] text-lime transition-transform duration-300 group-hover:-rotate-6" aria-hidden="true">
              &gt;_
            </span>
            <span>Adam Dani</span>
          </a>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n, i) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    aria-current={active === i ? "true" : undefined}
                    className={`flex min-h-11 items-center rounded-full px-4 text-[15px] tracking-[-0.02em] transition-colors duration-200 hover:bg-ink/8 ${active === i ? "bg-ink text-paper hover:bg-ink" : ""}`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn hidden !min-h-11 !px-5 !text-[15px] sm:inline-flex">
              Contact Me
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full bg-ink text-paper lg:hidden"
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
        <div className="wrap flex gap-1.5 pb-2" aria-hidden="true">
          {nav.map((n, i) => (
            <span key={n.href} className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/15">
              <span
                className="block h-full origin-left bg-ink transition-transform duration-500"
                style={{ transform: `scaleX(${i <= active ? 1 : 0})`, transitionTimingFunction: "var(--ease)" }}
              />
            </span>
          ))}
        </div>
      </div>

      <div
        id="menu"
        className={`fixed inset-0 top-0 z-[-1] flex flex-col bg-lime transition-[clip-path,visibility] duration-500 lg:hidden ${open ? "visible" : "invisible"}`}
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", transitionTimingFunction: "var(--ease)" }}
      >
        <nav aria-label="Menu" className="wrap flex flex-1 flex-col justify-center" style={{ paddingTop: "var(--nav)" }}>
          <ul className="flex flex-col">
            {nav.map((n, i) => (
              <li key={n.href} className="border-b border-ink/20">
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-baseline justify-between py-2 text-[clamp(36px,9vw,64px)] leading-none tracking-[-0.05em]"
                >
                  {n.label}
                  <span className="font-mono text-sm tracking-normal opacity-60">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="btn mt-8 w-full">
            Contact Me
          </a>
        </nav>
      </div>
    </header>
  );
}
