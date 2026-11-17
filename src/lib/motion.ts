import { useEffect, useRef, useState } from "react";

export const motionQuery = "(prefers-reduced-motion: reduce)";
export const motionEase = "cubic-bezier(0.22, 1, 0.36, 1)";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia(motionQuery);
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

const entrances: Record<string, Keyframe[]> = {
  rise: [{ transform: "translateY(32px)" }, { transform: "none" }],
  slide: [{ transform: "translateX(-36px)" }, { transform: "none" }],
  depth: [{ transform: "translateY(24px) scale(.96)" }, { transform: "none" }],
  node: [{ transform: "scale(.65) rotate(-30deg)" }, { transform: "none" }],
  rule: [{ transform: "scaleX(0)", transformOrigin: "left" }, { transform: "scaleX(1)", transformOrigin: "left" }],
};

/** Content stays visible in HTML. Only elements already entering the viewport animate. */
export function usePageMotion() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const media = window.matchMedia(motionQuery);
    const running = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        const element = target as HTMLElement;
        element.dataset.arrived = "true";
        if (media.matches || !element.animate) return;
        if (element.dataset.motion === "timeline") return;
        const frames = entrances[element.dataset.motion ?? "rise"] ?? entrances.rise;
        const animation = element.animate(frames, {
          duration: element.dataset.motion === "node" ? 550 : 720,
          delay: Number(element.dataset.stagger ?? 0) * 80,
          easing: motionEase,
        });
        running.add(animation);
        animation.onfinish = () => running.delete(animation);
      });
    }, { threshold: 0.12 });
    root.querySelectorAll<HTMLElement>("[data-motion]").forEach((el) => observer.observe(el));
    const cancel = () => { if (media.matches) { running.forEach((a) => a.cancel()); running.clear(); } };
    media.addEventListener("change", cancel);

    // Existing decorative CSS loops sleep along with their section.
    const visibility = new IntersectionObserver((entries) => entries.forEach((entry) => {
      (entry.target as HTMLElement).dataset.motionPaused = String(!entry.isIntersecting);
    }));
    root.querySelectorAll(".section").forEach((section) => visibility.observe(section));

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const covers = Array.from(root.querySelectorAll<HTMLElement>(".project-cover"));
    const cleanups = covers.map((cover) => {
      const art = cover.querySelector<HTMLElement>(".project-art");
      if (!art) return () => {};
      const reset = () => { art.style.removeProperty("transform"); };
      const move = (event: PointerEvent) => {
        if (media.matches || !fine.matches || event.pointerType !== "mouse") return;
        const rect = cover.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        art.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translate3d(${x * 7}px,${y * 7}px,0) scale(1.025)`;
      };
      const preference = () => { reset(); cover.removeEventListener("pointermove", move); if (fine.matches && !media.matches) cover.addEventListener("pointermove", move, { passive: true }); };
      preference();
      cover.addEventListener("pointerleave", reset);
      cover.addEventListener("pointercancel", reset);
      window.addEventListener("blur", reset);
      media.addEventListener("change", preference);
      fine.addEventListener("change", preference);
      return () => {
        reset();
        cover.removeEventListener("pointermove", move);
        cover.removeEventListener("pointerleave", reset);
        cover.removeEventListener("pointercancel", reset);
        window.removeEventListener("blur", reset);
        media.removeEventListener("change", preference);
        fine.removeEventListener("change", preference);
      };
    });
    return () => {
      observer.disconnect(); visibility.disconnect();
      running.forEach((a) => a.cancel());
      media.removeEventListener("change", cancel);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
  return ref;
}
