import { useEffect, useRef, useState, type CSSProperties } from "react";
import { nav, navTop } from "../content";

/**
 * Fixed header. The segmented bar under it is the reference's story progress: one segment per
 * section, filled up to the section on screen. It changes on a section boundary, never per pixel.
 */
export function Nav() {
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const skipRestore = useRef(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
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

  /** While the sheet is open the page behind it is inert and cannot scroll, so a gesture on the
   *  sheet is never spent moving content the visitor cannot see. */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const page = [document.getElementById("main"), document.getElementById("contact")].filter(Boolean) as HTMLElement[];
    const wasInert = page.map((el) => el.inert);
    page.forEach((el) => (el.inert = true));
    root.dataset.scrollLock = "1";
    const lockedFrom = [root.style.overflow, document.body.style.overflow];
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLElement>("#menu a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      page.forEach((el, i) => (el.inert = wasInert[i]));
      delete root.dataset.scrollLock;
      [root.style.overflow, document.body.style.overflow] = lockedFrom;
      if (!skipRestore.current) toggle.current?.focus({ preventScroll: true });
      skipRestore.current = false;
    };
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
              {navTop.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    aria-current={active === nav.indexOf(n) ? "true" : undefined}
                    className={`nav-section-link flex min-h-11 items-center rounded-full px-4 text-[15px] tracking-[-0.02em] transition-colors duration-200 hover:bg-ink/8 ${active === nav.indexOf(n) ? "bg-ink text-paper hover:bg-ink" : ""}`}
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
              ref={toggle}
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
        data-open={open}
        inert={!open}
        className={`fixed inset-0 top-0 z-[-1] flex flex-col bg-lime transition-[clip-path,visibility] duration-500 lg:hidden ${open ? "visible" : "invisible"}`}
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", transitionTimingFunction: "var(--ease)" }}
      >
        <nav aria-label="Menu" className="wrap flex flex-1 flex-col justify-center" style={{ paddingTop: "var(--nav)" }}>
          <ul className="flex flex-col">
            {nav.map((n, i) => (
              <li key={n.href} className="border-b border-ink/20">
                <a
                  href={n.href}
                  onClick={() => {
                    skipRestore.current = true;
                    setOpen(false);
                  }}
                  className="nav-menu-link flex min-h-16 items-baseline justify-between py-2 text-[clamp(36px,9vw,64px)] leading-none tracking-[-0.05em]"
                  style={{ "--menu-index": i } as CSSProperties}
                >
                  {n.label}
                  <span className="font-mono text-sm tracking-normal opacity-60">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
