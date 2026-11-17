import { Nav } from "./components/Nav";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { AgentYear } from "./sections/AgentYear";
import { Services } from "./sections/Services";
import { Projects } from "./sections/Projects";
import { Experience } from "./sections/Experience";
import { Creative } from "./sections/Creative";
import { Contact } from "./sections/Contact";
import { usePageMotion } from "./lib/motion";
import { useSmoothScroll } from "./lib/smooth-scroll";
import "./motion.css";

export function App() {
  const motion = usePageMotion();
  useSmoothScroll();
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Nav />
      <main ref={motion} id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <AgentYear />
        <Services />
        <Projects />
        <Experience />
        <Creative />
      </main>
      <Contact />
    </>
  );
}
