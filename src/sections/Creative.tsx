import { photos } from "../content";
import { SectionHead } from "../components/ui";
import { asset } from "../lib/asset";

/*
 * CLIENT SLOT: photography. The five frames below are licensed STAND-INS from Wikimedia Commons
 * (credits in the footer). Swap each `src` in content.ts for Adam's own photographs before launch.
 */

const layout = [
  "col-span-2 aspect-[4/3] lg:col-span-7 lg:row-span-2 lg:aspect-auto",
  "aspect-[4/3] lg:col-span-5 lg:aspect-[16/9]",
  "aspect-[4/3] lg:col-span-5 lg:aspect-[16/9]",
  "aspect-[4/3] lg:col-span-4 lg:aspect-[3/2]",
  "aspect-[4/3] lg:col-span-4 lg:aspect-[3/2]",
];

export function Creative() {
  return (
    <section id="creative" aria-labelledby="creative-title" className="section t-ink on-dark">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead index="06 creative --side" id="creative-title" paperTag>
              Photographs, posters and side experiments
            </SectionHead>
          </div>
          <p className="lead self-end opacity-85 lg:col-span-4 lg:col-start-9">
            Photography trains me to frame one subject and cut the rest. I bring the same rule to interfaces.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:mt-14 lg:grid-cols-12">
          {photos.map((p, i) => (
            <a
              key={p.src}
              href={p.page}
              target="_blank"
              rel="noopener"
              className={`photo card relative block ${layout[i]}`}
              aria-label={`${p.alt} (opens the photograph’s page)`}
            >
              <img
                src={asset(p.src.replace("-1200", "-640"))}
                srcSet={`${asset(p.src.replace("-1200", "-640"))} 640w, ${asset(p.src)} 1200w`}
                sizes={i === 0 ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 34vw, 50vw"}
                alt={p.alt}
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
                data-source="stand-in"
              />
            </a>
          ))}

          <div className="card col-span-2 flex flex-col justify-between gap-6 rounded-[14px] bg-lime p-6 text-ink lg:col-span-4">
            <div>
              <h3 className="text-[26px] leading-[1.05] tracking-[-0.045em]">Graphic design and side experiments</h3>
              <ul className="mt-4 grid gap-2 text-[16px]">
                {["Posters and type layouts", "Frame templates for Venture Photobooth", "The halftone canvas on this page, written from scratch"].map((t) => (
                  <li key={t} className="flex gap-3 border-t border-ink/20 pt-2">
                    <span className="font-mono text-cobalt" aria-hidden="true">&gt;</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <a href="https://www.instagram.com/daniam.dnm/" target="_blank" rel="noopener" className="btn btn--ink self-start">
              See my Instagram <span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
