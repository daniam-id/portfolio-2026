import { projects, type Project } from "../content";
import { asset } from "../lib/asset";
import "./projects.css";

// Roles and build status confirmed by the project owner.
const projectDetails: Record<string, { role: string; status: string; title?: string }> = {
  venture: { role: "CTO & Product Engineer", status: "Public studio" },
  pandu: { role: "Frontend engineer", status: "Hackathon prototype", title: "Last-mile delivery dispatch" },
  nusakas: { role: "Co-founder & full-stack developer", status: "Hackathon build", title: "A cash book over WhatsApp" },
  riskala: { role: "End-to-end developer", status: "Hackathon concept demo", title: "Workplace conflict scenarios" },
  "rt-billing": { role: "End-to-end developer", status: "Hackathon build", title: "Neighbourhood billing" },
  photobooth: { role: "End-to-end developer", status: "Public app" },
};

const projectOrder = ["venture", "nusakas", "photobooth", "rt-billing", "pandu", "riskala"];

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section projects-index">
      <div className="wrap">
        <header className="projects-heading" data-motion="rise">
          <div>
            <p className="projects-eyebrow"><span aria-hidden="true">↳</span> 04 / Selected work</p>
            <h2 id="projects-title">Projects<span className="serif"> in practice.</span></h2>
          </div>
          <div className="projects-intro">
            <p>From hackathon ideas to studio products.<br />Six builds, and my part in each.</p>
            <a href="https://github.com/daniam-id" target="_blank" rel="noopener noreferrer">All repos on GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </header>

        <ol className="projects-gallery" aria-label="Selected projects">
          {projectOrder.map((id, index) => {
            const p = projects.find((project) => project.id === id);
            if (!p) return null;
            const details = projectDetails[id];
            return (
              <li key={id} className={`project-entry project-entry--${id}${p.shot ? "" : " project-entry--notext"}`}>
                <article aria-labelledby={`project-${id}`}>
                  {p.shot ? <Shot project={p} index={index} /> : null}
                  <div className="project-copy" data-motion="rise" data-stagger={p.shot ? "1" : "0"}>
                    <div className="project-summary">
                      <div className="project-title-line">
                        {!p.shot && <span className="project-figure" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}
                        <h3 id={`project-${id}`}>{p.name}</h3>
                        <span>{p.year}</span>
                      </div>
                      <p className="project-purpose">{details.title ?? p.what}</p>
                      <dl className="project-facts">
                        <div><dt>My role</dt><dd>{details.role}</dd></div>
                        <div><dt>Status</dt><dd>{details.status}</dd></div>
                      </dl>
                    </div>
                    <div className="project-description">
                      <p>{p.body}</p>
                      <ul className="project-stack" aria-label={`Built with for ${p.name}`}>
                        {p.stack.map((s) => <li key={s}>{s}</li>)}
                      </ul>
                      <div className="project-links">
                        {p.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span><span className="sr-only"> for {p.name} (opens in a new tab)</span></a>)}
                        {p.note && <span className="project-private"><span aria-hidden="true">↳</span> {p.note}</span>}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** The product's own screen, framed as a browser window. */
function Shot({ project, index }: { project: Project; index: number }) {
  const shot = project.shot!;
  return (
    <div className={`project-cover project-cover--shot project-cover--${project.id}`} data-motion="depth">
      <div className="project-chrome" aria-hidden="true">
        <span className="project-chrome-dots"><i /><i /><i /></span>
        <span className="project-chrome-host">{shot.host}</span>
        <span className="project-cover-index">{String(index + 1).padStart(2, "0")} / {project.year}</span>
      </div>
      <div className="project-art">
        <img
          className="project-shot"
          src={asset(shot.src.replace("-1200", "-640"))}
          srcSet={`${asset(shot.src.replace("-1200", "-640"))} 640w, ${asset(shot.src)} 1200w`}
          sizes="(min-width: 1200px) 1200px, (min-width: 900px) 62vw, calc(100vw - 48px)"
          alt={shot.alt}
          width={1200}
          height={408}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
