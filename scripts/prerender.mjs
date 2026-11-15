// Renders the app to static HTML and writes it into dist/index.html, so crawlers and
// no-JS visitors get the full page. Run after `vite build` and `vite build --ssr`.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssr = path.resolve("dist-ssr/entry-server.js");
const { render } = await import(pathToFileURL(ssr).href);

const file = path.join(dist, "index.html");
const html = fs.readFileSync(file, "utf8");
const out = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
if (out === html) throw new Error("prerender: #root placeholder not found");
fs.writeFileSync(file, out);
fs.rmSync(path.resolve("dist-ssr"), { recursive: true, force: true });
console.log("prerender: wrote", path.relative(process.cwd(), file));
