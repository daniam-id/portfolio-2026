import { roles } from "../content";
import { SectionHead } from "../components/ui";
import "./experience.css";

const chapters: Record<string, { name: string; context: string; project: string }> = {
  "NusaKas, with Nadif Fijri": {
    name: "NusaKas",
    context: "Built together with Nadif Fijri.",
    project: "nusakas",
  },
  "GDG Surabaya Mini Hackathon Antigravity 2026": {
    name: "Pandu.ai",
    context: "GDG Surabaya Mini Hackathon Antigravity 2026",
    project: "pandu",
  },
  "Venture Studio, a creative studio": {
    name: "Venture Studio",
    context: "A creative studio for design, branding and digital products.",
    project: "venture",
  },
};

export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="section t-mint experience">
      <div className="wrap">
        <header className="experience__header" data-motion="rise">
          <SectionHead index="05 experience" id="exp-title">
            Teams, projects<br />and a studio.
          </SectionHead>
          <p className="experience__intro">From co-founding NusaKas to building at Venture Studio.</p>
        </header>

        <ol className="experience__timeline" aria-label="Experience, oldest to newest">
          {[...roles].sort((a, b) => a.start - b.start).map((role, i) => {
            const chapter = chapters[role.org];
            const current = role.when.endsWith("now");
            return (
              <li key={role.org} className={`experience__chapter experience__chapter--${role.tone}`} data-motion="timeline">
                <div className="experience__date" data-motion="slide">
                  <p className="mono">{role.when}</p>
                  <span className="experience__kind">{role.kind}</span>
                </div>
                <span className="experience__node mono" aria-hidden="true" data-motion="node">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="experience__detail" data-motion="rise" data-stagger="1">
                  <div className="experience__name-row">
                    <h3 className="experience__name">
                      <a href={`#project-${chapter.project}`}>
                        {chapter.name}<span className="experience__arrow" aria-hidden="true">↗</span>
                      </a>
                    </h3>
                    {current && <span className="experience__now mono">Now</span>}
                  </div>
                  <p className="experience__role">{role.title.replace(", team Pandu.ai", "")}</p>
                  <p className="experience__context">{chapter.context}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
