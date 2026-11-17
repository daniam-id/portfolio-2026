import { projects, type Project } from "../content";
import "./projects.css";

// Roles and build status confirmed by the project owner.
const projectDetails: Record<string, { role: string; status: string; title?: string; illustration: string }> = {
  venture: { role: "CTO & Product Engineer", status: "Public studio", illustration: "Abstract composition of design, digital and 3D forms for Venture Studio." },
  pandu: { role: "Frontend engineer", status: "Hackathon prototype", title: "Last-mile delivery dispatch", illustration: "Illustrative map with a delivery route changing around a flooded road." },
  nusakas: { role: "Co-founder & full-stack developer", status: "Hackathon build", title: "A cash book over WhatsApp", illustration: "Illustrative exchange showing a shop income message becoming a cash-book entry." },
  riskala: { role: "End-to-end developer", status: "Hackathon concept demo", title: "Workplace conflict scenarios", illustration: "Concept illustration connecting a simulated scenario to different reply tones; not an HR assessment." },
  "rt-billing": { role: "End-to-end developer", status: "Hackathon build", title: "Neighbourhood billing", illustration: "Illustrative billing formula combining a flat monthly fee and metered water usage." },
  photobooth: { role: "End-to-end developer", status: "Public app", illustration: "Abstract photo strips illustrating a browser photobooth editor and image export." },
  vsconnect: { role: "End-to-end developer", status: "Internal · private", illustration: "Illustrative customer-service flow from an incoming inquiry to the team inbox, an AI draft and a human reply." },
};

const projectOrder = ["venture", "pandu", "nusakas", "photobooth", "riskala", "vsconnect", "rt-billing"];

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
            <p>From hackathon ideas to studio products.<br />Seven builds, and my part in each.</p>
            <a href="https://github.com/daniam-id" target="_blank" rel="noopener noreferrer">All repos on GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </header>

        <ol className="projects-gallery" aria-label="Selected projects">
          {projectOrder.map((id, index) => {
            const p = projects.find((project) => project.id === id);
            if (!p) return null;
            const details = projectDetails[id];
            return (
              <li key={id} className={`project-entry project-entry--${id}`}>
                <article aria-labelledby={`project-${id}`}>
                  <div className={`project-cover project-cover--${id}`} role="img" aria-label={details.illustration} data-motion="depth">
                    <div className="project-cover-label" aria-hidden="true"><span>{p.name}</span><span>Illustrative cover</span></div>
                    <div className="project-art" aria-hidden="true"><ProjectArt project={p} /></div>
                    <span className="project-cover-index" aria-hidden="true">{String(index + 1).padStart(2, "0")} / {p.year}</span>
                  </div>
                  <div className="project-copy" data-motion="rise" data-stagger="1">
                    <div className="project-summary">
                      <div className="project-title-line"><h3 id={`project-${id}`}>{p.name}</h3><span>{p.year}</span></div>
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

/** Editorial illustrations, not screenshots or records from the products. */
function ProjectArt({ project }: { project: Project }) {
  if (project.id === "vsconnect") return (
    <div className="connect-flow">
      <div className="connect-inquiry"><span>Incoming inquiry</span><p>“Bisa tanya tentang layanannya?”</p></div>
      <span className="connect-arrow">↓</span>
      <div className="connect-work"><span>Team inbox</span><div><span className="connect-ai">AI draft</span><p>“Tentu, layanan apa yang ingin dibahas?”</p></div></div>
      <span className="connect-arrow">↓</span>
      <div className="connect-reply"><span>Human review & reply</span><span>↗</span></div>
    </div>
  );
  switch (project.visual) {
    case "studio": return (
      <div className="studio-composition">
        <span className="studio-word">venture</span>
        <svg className="studio-object" viewBox="0 0 440 320" fill="none">
          <path d="M220 20 400 120 220 220 40 120Z" fill="#ff5a36" />
          <path d="m40 120 180 100v90L40 210Z" fill="#c63e21" />
          <path d="m220 220 180-100v90L220 310Z" fill="#ed6c48" />
          <ellipse cx="220" cy="120" rx="78" ry="43" fill="#191919" />
          <path d="M142 120c0-24 35-43 78-43s78 19 78 43" stroke="#f4f1ea" strokeOpacity=".35" />
        </svg>
        <div className="studio-disc"><span>Design.<br />Digital.<br /><i className="serif">Dimension.</i></span></div>
        <span className="studio-foot">A creative studio / built across disciplines</span>
      </div>
    );
    case "route": return (
      <svg className="pandu-map" viewBox="0 0 600 320" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M0 70H600M0 160H600M0 250H600M100 0V320M260 0V320M430 0V320" stroke="#191919" strokeOpacity=".09" strokeWidth="22" />
        <path d="M100 250H430V70" stroke="#191919" strokeOpacity=".3" strokeWidth="3" strokeDasharray="5 9" />
        <path d="M100 250V70H430" stroke="#191919" strokeWidth="6" strokeLinejoin="round" />
        <circle cx="100" cy="250" r="13" fill="#ff5a36" stroke="#f4f1ea" strokeWidth="4" />
        <circle cx="430" cy="70" r="13" fill="#191919" stroke="#f4f1ea" strokeWidth="4" />
        <rect x="302" y="188" width="176" height="38" rx="19" fill="#2f4be0" />
        <text x="390" y="212" textAnchor="middle" fontFamily="Host Grotesk, sans-serif" fontSize="14" fill="#fbf9f4">Flood → route changes</text>
        <rect x="146" y="95" width="156" height="38" rx="19" fill="#191919" />
        <text x="224" y="119" textAnchor="middle" fontFamily="Host Grotesk, sans-serif" fontSize="14" fill="#f4f1ea">An alternative route ↗</text>
      </svg>
    );
    case "chat": return (
      <div className="cash-composition">
        <span className="cash-symbol serif">Rp.</span>
        <div className="cash-message">“Pemasukan 150000<br />dari penjualan bakso”<span>↓</span></div>
        <div className="cash-entry"><span>Cash-book entry · sample</span><p>Penjualan bakso <strong>+ Rp150.000</strong></p></div>
      </div>
    );
    case "meter": return (
      <div className="risk-composition">
        <span className="risk-caption">Simulated scenario</span>
        <div className="risk-orbit"><span className="serif">Let's<br />talk.</span></div>
        <div className="risk-tones"><span>Authoritative</span><span>Collaborative</span><span>De-escalation</span></div>
        <span className="risk-note">Explore a different tone ↗</span>
      </div>
    );
    case "bill": return (
      <div className="billing-composition">
        <div><span>01 / Monthly</span><strong>Flat fee</strong></div><span className="billing-operator">+</span>
        <div><span>02 / Metered</span><strong>Water usage</strong></div><span className="billing-operator">=</span>
        <p>Household bill <span>↗</span></p>
      </div>
    );
    case "booth": return (
      <div className="booth-composition">
        {[0, 1, 2].map((strip) => <div className="project-photo-strip" key={strip}>{[0, 1, 2].map((frame) => <span className={`project-photo-frame project-photo-frame--${(strip + frame) % 3}`} key={frame}><i /></span>)}<span className="photo-strip-label">venture / photobooth</span></div>)}
        <span className="booth-export">Shoot. Arrange. Export. ↗</span>
      </div>
    );
  }
}
