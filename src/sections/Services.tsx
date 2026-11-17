import { services } from "../content";
import { Tag } from "../components/ui";
import "./services.css";

const toolNames: Record<string, string> = {
  react: "React",
  nextjs: "Next.js",
  typescript: "TypeScript",
  nodejs: "Node.js",
  gemini: "Gemini",
  openai: "OpenAI",
  firebase: "Firebase",
  whatsapp: "WhatsApp",
  supabase: "Supabase",
  figma: "Figma",
  tailwindcss: "Tailwind CSS",
};

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section svc">
      <div className="wrap">
        <header className="svc__intro">
          <div className="svc__annotation" data-motion="slide">
            <Tag paper>03 services</Tag>
            <span className="svc__rule" aria-hidden="true" />
          </div>
          <div className="svc__statement" data-motion="rise">
            <h2 id="services-title">I build the parts that make a product useful.</h2>
            <p>I work from interface to deploy, add AI where it helps, and automate repeat tasks.</p>
          </div>
        </header>

        <ul className="svc__matrix" aria-label="Services offered">
          {services.map((service, index) => (
            <li key={service.n} className="svc__item">
              <article data-motion="rise" data-stagger={index % 2}>
                <div className="svc__item-head">
                  <span className="svc__number">{service.n}</span>
                  <h3>{service.title}</h3>
                </div>
                <p className="svc__body">{service.body}</p>
                <div className="svc__tools">
                  <span className="svc__tools-label">Tools</span>
                  <ul aria-label={`${service.title} tools`}>
                    {service.tools.map((tool) => (
                      <li key={tool}>{toolNames[tool] ?? tool}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
