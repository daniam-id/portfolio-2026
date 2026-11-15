/**
 * Every fact on the page lives here. Sources:
 * - projects: the public READMEs on github.com/daniam-id and the local repos in ~/programme
 * - agentYear: wrapped-2026.html (Adam's own opencode usage export, 17 Feb to 13 Nov 2026)
 * - socials: the old portfolio's src/config/site.ts
 * Nothing here is estimated. Add roles only when they are real.
 */

export type Tone = "tomato" | "cobalt" | "lime" | "mint" | "sand" | "ink" | "paper";

export const person = {
  name: "Adam Dani Apta Mahendra",
  short: "Adam Dani",
  role: "Web developer & AI enthusiast",
  country: "Indonesia",
  email: "adam.daniamm@gmail.com",
};

export const socials = [
  { label: "GitHub", handle: "daniam-id", href: "https://github.com/daniam-id", icon: "github" },
  {
    label: "LinkedIn",
    handle: "Adam Dani Apta M.",
    href: "https://www.linkedin.com/in/adam-dani-apta-m-099408323/",
    icon: "linkedin",
  },
  { label: "Instagram", handle: "daniam.dnm", href: "https://www.instagram.com/daniam.dnm/", icon: "instagram" },
  { label: "Email", handle: "Write to Adam", href: `mailto:${person.email}`, icon: "gmail" },
] as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Creative", href: "#creative" },
  { label: "Contact", href: "#contact" },
];

/** From wrapped-2026.html: window.__WRAPPED__.totals and friends. */
export const agentYear = {
  range: "17 Feb to 13 Nov 2026",
  prompts: 3584,
  sessions: 557,
  projects: 38,
  activeDays: 152,
  linesWritten: 261452,
  streakDays: 34,
  models: 52,
  providers: 7,
  peakHour: "21:00",
  busiest: "20 July, 163 prompts",
  topLanguage: "TypeScript",
  shellCommands: 19274,
  fileEdits: 7727,
};

export const principles = [
  { word: "User first", tone: "lime" },
  { word: "Automate the repeat work", tone: "mint" },
  { word: "Simple over clever", tone: "paper" },
  { word: "Built to scale", tone: "sand" },
  { word: "Real impact", tone: "tomato" },
] as const;

export type Service = {
  n: string;
  title: string;
  body: string;
  tone: Tone;
  visual: "browser" | "dots" | "lanes" | "shapes";
  tools: string[];
};

export const services: Service[] = [
  {
    n: "01",
    title: "Web development",
    body: "Web apps from the first screen to the deploy: React and Next.js up front, Node.js and Supabase or Firebase behind.",
    tone: "tomato",
    visual: "browser",
    tools: ["react", "nextjs", "typescript", "nodejs"],
  },
  {
    n: "02",
    title: "AI integration & tools",
    body: "Gemini and OpenAI models wired into products: reading receipts, assigning couriers, drafting replies a person checks.",
    tone: "cobalt",
    visual: "dots",
    tools: ["gemini", "openai", "firebase"],
  },
  {
    n: "03",
    title: "Automation & productivity",
    body: "WhatsApp bots, scheduled jobs and agent workflows that take over the repeat step and report back.",
    tone: "ink",
    visual: "lanes",
    tools: ["whatsapp", "nodejs", "supabase"],
  },
  {
    n: "04",
    title: "UI/UX & creative design",
    body: "Flows and layouts drawn in Figma, then built exactly as drawn, with type and spacing I learned from posters.",
    tone: "mint",
    visual: "shapes",
    tools: ["figma", "tailwindcss"],
  },
];

export type Project = {
  id: string;
  name: string;
  what: string;
  body: string;
  stack: string[];
  tone: Tone;
  visual: "route" | "chat" | "meter" | "bill" | "booth" | "orders";
  links: { label: string; href: string }[];
  note?: string;
  year: string;
};

export const projects: Project[] = [
  {
    id: "pandu",
    name: "Pandu.ai",
    what: "AI dispatcher for last-mile delivery in Surabaya",
    body: "Gemini assigns couriers, batches nearby orders and reroutes around floods reported by photo. I built the dashboard, the driver app and the backend wiring.",
    stack: ["React", "TypeScript", "Gemini", "Firestore", "Cloud Run"],
    tone: "lime",
    visual: "route",
    links: [
      { label: "Open the demo", href: "https://pandu-ai-2026.web.app" },
      { label: "Read the code", href: "https://github.com/daniam-id/pandu" },
    ],
    year: "2026",
  },
  {
    id: "nusakas",
    name: "NusaKas",
    what: "Cash book for small shops, kept over WhatsApp",
    body: "An owner sends “Pemasukan 150000” or a receipt photo; Gemini reads it, files the entry and updates a live dashboard.",
    stack: ["React 19", "Node.js", "Gemini", "WhatsApp bot"],
    tone: "tomato",
    visual: "chat",
    links: [
      { label: "Open the app", href: "https://nusa-kas.vercel.app" },
      { label: "Read the code", href: "https://github.com/daniam-id/NusaKas" },
    ],
    year: "2025",
  },
  {
    id: "riskala",
    name: "RISKALA",
    what: "Early-warning demo for industrial relations risk",
    body: "Scores conflict risk by division, drafts sensitive messages in three tones and runs de-escalation role-play against an AI counterpart.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    tone: "cobalt",
    visual: "meter",
    links: [
      { label: "Open the demo", href: "https://stitch-rho-liart.vercel.app" },
      { label: "Read the code", href: "https://github.com/daniam-id/stitch" },
    ],
    year: "2026",
  },
  {
    id: "rt-billing",
    name: "RT-Billing",
    what: "Billing dashboard for a neighbourhood association",
    body: "Charges each household a flat fee plus metered PDAM water, behind a JWT-secured REST API.",
    stack: ["TypeScript", "REST API", "JWT"],
    tone: "sand",
    visual: "bill",
    links: [
      { label: "Open the dashboard", href: "https://rt-billing-admin-web.vercel.app" },
      { label: "Read the code", href: "https://github.com/daniam-id/rt-billing" },
    ],
    year: "2026",
  },
  {
    id: "photobooth",
    name: "Venture Photobooth",
    what: "Photobooth editor that runs in the browser",
    body: "Pick one of three templates, upload or shoot photos, adjust each slot and export a full-size PNG or JPEG. No photo leaves the device.",
    stack: ["Next.js", "TypeScript", "Playwright"],
    tone: "mint",
    visual: "booth",
    links: [],
    note: "Private repository",
    year: "2026",
  },
  {
    id: "venture",
    name: "Venture Studio",
    what: "Marketplace for ordering creative work",
    body: "Clients order design, branding and 3D work as tracked projects with payment, chat and delivery in one place. Framio hands out photobooth photos by claim code.",
    stack: ["Next.js", "Supabase", "Cloudflare R2"],
    tone: "ink",
    visual: "orders",
    links: [],
    note: "Private repository",
    year: "2026",
  },
];

/** Months counted from Jan 2025 (0) to Dec 2026 (23). Dates come from repo history. */
export type Role = {
  when: string;
  kind: string;
  title: string;
  org: string;
  start: number;
  end: number;
  tone: Tone;
};

export const roles: Role[] = [
  {
    when: "Dec 2025 – Jan 2026",
    kind: "Startup",
    title: "Co-founder and full-stack developer",
    org: "NusaKas, with Nadif Fijri",
    start: 11,
    end: 13,
    tone: "tomato",
  },
  {
    when: "Apr – May 2026",
    kind: "Hackathon",
    title: "Full-stack engineer, team Pandu.ai",
    org: "GDG Surabaya Mini Hackathon Antigravity 2026",
    start: 15,
    end: 17,
    tone: "lime",
  },
  {
    when: "Jun 2026 – now",
    kind: "Studio",
    title: "Product builder, Venture Studio",
    org: "Marketplace, photobooth, Framio and a WhatsApp help desk",
    start: 17,
    end: 23,
    tone: "cobalt",
  },
  {
    when: "Sep 2026",
    kind: "Organisation",
    title: "Event site, Catalyst Summit 2026",
    org: "Society of Renewable Energy, Universitas Airlangga",
    start: 20,
    end: 21,
    tone: "ink",
  },
];

/**
 * STAND-IN PHOTOGRAPHS. These are licensed Wikimedia Commons frames, not Adam's own work.
 * Replace each `src` with Adam's photographs before the site goes live.
 */
export const photos = [
  {
    src: "/photos/m113462760-1200.webp",
    alt: "Wet road curving along a shore under a layered cliff, sunbeams on the rock",
    w: 1200,
    h: 800,
    credit: "Sanshiro KUBOTA, CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Road_at_Vi%C3%B0arei%C3%B0i_-_Faroe_Islands_(50518168417).jpg",
  },
  {
    src: "/photos/m44931831-1200.webp",
    alt: "Still fjord mirroring mountains, red fireweed in the foreground",
    w: 1200,
    h: 786,
    credit: "Ximonic (Simo Räsänen), CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Sl%C3%B8verfjorden_towards_northeast,_Austv%C3%A5g%C3%B8ya,_Lofoten,_Norway,_2015_September.jpg",
  },
  {
    src: "/photos/m164989354-1200.webp",
    alt: "Long exposure of a grey sea over black rocks below snowy mountains",
    w: 1200,
    h: 800,
    credit: "Eric Kilby, CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:East_Coastal_Cliffs_-_Iceland.jpg",
  },
  {
    src: "/photos/m108358720-1200.webp",
    alt: "Gravel road cut into a mossy slope with yellow edge poles",
    w: 1200,
    h: 658,
    credit: "Barry Marsh, Public Domain Mark",
    page: "https://commons.wikimedia.org/wiki/File:624_Road,_Westfjords,_Iceland_(48802800941).jpg",
  },
  {
    src: "/photos/m111881197-1200.webp",
    alt: "Valley opening onto a grey fjord, cloud lifting off the far plateau",
    w: 1200,
    h: 618,
    credit: "Barry Marsh, Public Domain Mark",
    page: "https://commons.wikimedia.org/wiki/File:Stunning_Westfjords,_Iceland_(48816583203).jpg",
  },
];
