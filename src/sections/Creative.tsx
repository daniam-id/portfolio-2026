import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { photos } from "../content";
import { asset } from "../lib/asset";
import { motionEase, useReducedMotion } from "../lib/motion";
import "./creative.css";

const number = (index: number) => String(index).padStart(2, "0");

export function Creative() {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const direction = useRef(1);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const photo = photos[index];
  const select = (next: number, travel = next > index ? 1 : -1) => {
    if (next === index) return;
    direction.current = travel;
    setOutgoing(reduced ? null : index);
    setIndex(next);
  };
  const move = (travel: number) => select((index + travel + photos.length) % photos.length, travel);

  useEffect(() => {
    const image = stage.current?.querySelector<HTMLImageElement>("img:not(.creative-outgoing)");
    const old = stage.current?.querySelector<HTMLImageElement>(".creative-outgoing");
    if (!image || !old || reduced || !image.animate) { setOutgoing(null); return; }
    const animations: Animation[] = [];
    const reveal = () => {
      const distance = direction.current * 26;
      animations.push(image.animate([
        { opacity: .4, transform: `translateX(${distance}px) scale(1.025)` },
        { opacity: 1, transform: "none" },
      ], { duration: 340, easing: motionEase }));
      const exit = old.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: `translateX(${-distance}px)` }], { duration: 300, easing: motionEase, fill: "forwards" });
      animations.push(exit);
      exit.onfinish = () => setOutgoing(null);
    };
    const failed = () => setOutgoing(null);
    if (image.complete) reveal();
    else image.addEventListener("load", reveal, { once: true });
    image.addEventListener("error", failed, { once: true });
    return () => {
      image.removeEventListener("load", reveal);
      image.removeEventListener("error", failed);
      animations.forEach((animation) => animation.cancel());
    };
  }, [index, reduced]);

  function onGalleryKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Arrow keys belong to this viewer only when it or its buttons have focus.
    if (event.target !== event.currentTarget && !(event.target instanceof HTMLButtonElement)) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return (
    <section id="creative" aria-labelledby="creative-title" className="section on-dark creative-section">
      <div className="wrap">
        <div className="creative-composition">
          <header className="creative-intro" data-motion="slide">
            <p className="creative-eyebrow"><span aria-hidden="true">06 /</span> Outside the interface</p>
            <h2 id="creative-title">Photography,<br />posters &amp;<br /><em>side experiments.</em></h2>
            <p className="creative-context">Photography trains me to frame one subject and cut the rest. I bring the same rule to interfaces.</p>
            <div className="creative-disclosure">
              <p>Reference photographs · Wikimedia Commons</p>
              <p>A selection of references, not my own photographs.</p>
            </div>
          </header>

          <div
            className="creative-gallery"
            data-motion="depth"
            role="region"
            aria-label="Reference photograph gallery"
            aria-describedby="creative-keyboard-hint"
            tabIndex={0}
            onKeyDown={onGalleryKeyDown}
          >
            <figure className="creative-figure">
              <div className="creative-image-stage" ref={stage}>
                {outgoing !== null && <img className="creative-outgoing" src={asset(photos[outgoing].src.replace("-1200", "-640"))} srcSet={`${asset(photos[outgoing].src.replace("-1200", "-640"))} 640w, ${asset(photos[outgoing].src)} 1200w`} sizes="(min-width: 1440px) 850px, (min-width: 1024px) 62vw, (min-width: 640px) calc(100vw - 96px), calc(100vw - 48px)" alt="" aria-hidden="true" />}
                <img
                  key={photo.src}
                  src={asset(photo.src.replace("-1200", "-640"))}
                  srcSet={`${asset(photo.src.replace("-1200", "-640"))} 640w, ${asset(photo.src)} 1200w`}
                  sizes="(min-width: 1440px) 850px, (min-width: 1024px) 62vw, (min-width: 640px) calc(100vw - 96px), calc(100vw - 48px)"
                  alt={photo.alt}
                  width={photo.w}
                  height={photo.h}
                  loading="lazy"
                  decoding="async"
                  data-source="stand-in"
                />
              </div>
              <figcaption className="creative-credit">
                <span>{photo.credit}</span>
                <a href={photo.page} target="_blank" rel="noopener noreferrer" aria-label={`Source & license for ${photo.alt} on Wikimedia Commons (opens in a new tab)`}>
                  Source &amp; license <span aria-hidden="true">↗</span>
                </a>
              </figcaption>
            </figure>

            <div className="creative-controls">
              <p className="creative-position" role="status" aria-live="polite" aria-atomic="true">
                <span className="sr-only">Reference photograph </span>
                {number(index + 1)}<span className="creative-position-divider" aria-hidden="true"> / </span>
                <span className="sr-only"> of </span><span className="creative-total">{number(photos.length)}</span>
              </p>
              <div className="creative-ticks" role="group" aria-label="Choose a reference photograph">
                {photos.map((item, itemIndex) => (
                  <button
                    key={item.src}
                    type="button"
                    aria-label={`Show reference photograph ${itemIndex + 1}`}
                    aria-current={itemIndex === index ? "true" : undefined}
                    onClick={() => select(itemIndex)}
                  ><span aria-hidden="true" /></button>
                ))}
              </div>
              <div className="creative-arrows">
                <button type="button" onClick={() => move(-1)} aria-label="Previous photograph"><span aria-hidden="true">←</span><span>Previous</span></button>
                <button type="button" onClick={() => move(1)} aria-label="Next photograph"><span>Next</span><span aria-hidden="true">→</span></button>
              </div>
            </div>
            <p id="creative-keyboard-hint" className="sr-only">Use the left and right arrow keys while the gallery or its buttons are focused to change photographs.</p>
          </div>
        </div>

        <div className="creative-experiments" data-motion="rise">
          <h3>More ways to <em>make.</em></h3>
          <p>Posters and type layouts. Frame templates for Venture Photobooth. The halftone canvas on this page, written from scratch.</p>
          <a href="https://www.instagram.com/daniam.dnm/" target="_blank" rel="noopener noreferrer">See my Instagram <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
