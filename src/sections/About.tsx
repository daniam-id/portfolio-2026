import { person, principles, projects } from "../content";
import "./about.css";

const workingPrinciples = [
  {
    title: principles[0].word,
    note: "Start with the person using it, and the task they need to finish.",
  },
  {
    title: principles[1].word,
    note: "Find the manual step a script or a model can take over.",
  },
  {
    title: principles[2].word,
    note: "Build the smallest version that works, then take it from there.",
  },
];

const studio = projects.find((project) => project.id === "venture")!;

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section ab">
      <div className="wrap">
        <header className="ab__header" data-motion="slide">
          <h2 id="about-title" className="ab__title">about,</h2>
          <span className="ab__chapter">01 / A little context</span>
        </header>

        <div className="ab__composition">
          <div className="ab__identity" data-motion="rise">
            <h3 className="ab__name">{person.name}</h3>
            <p className="ab__role">{person.role}<br />Student · {person.country}</p>
            <p className="ab__bio">
              I’m Adam, a student and product engineer based in Indonesia. As CTO at Venture Studio,
              I lead technology and build the studio’s products end to end.
            </p>
            <a className="ab__studio" href={studio.links[0].href}>
              Venture Studio <span aria-hidden="true">↗</span>
            </a>

            <dl className="ab__facts">
              <div>
                <dt>Working with</dt>
                <dd>TypeScript, React, Next.js, Node.js, Supabase &amp; Firebase</dd>
              </div>
              <div>
                <dt>Beyond code</dt>
                <dd>Photography &amp; poster design</dd>
              </div>
            </dl>
          </div>

          <div className="ab__statement" data-motion="slide" data-stagger="1">
            <span className="ab__eyebrow">What I build</span>
            <p>From<br />idea to<br /><em>working</em><br />software<span className="ab__period">.</span></p>
            <span className="ab__statement-note">The interface. The system behind it.<br />Through to the deploy.</span>
          </div>

          <section className="ab__principles" aria-labelledby="about-how-title">
            <h3 id="about-how-title" className="ab__eyebrow">How I work</h3>
            <ol className="ab__principle-list">
              {workingPrinciples.map((principle, index) => (
                <li className="ab__principle" key={principle.title} data-motion="slide" data-stagger={index}>
                  <span className="ab__number" aria-hidden="true">0{index + 1}</span>
                  <div>
                    <h4>{principle.title}</h4>
                    <p>{principle.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
}
