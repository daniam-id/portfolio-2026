import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { runIntro } from "./lib/intro";
import "./index.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

document.documentElement.dataset.appReady = "true";
runIntro();

// The production build ships prerendered HTML (scripts/prerender.mjs); the dev server does not.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
