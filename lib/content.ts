// Non-text structured data. Translated copy lives in /messages/{locale}.json;
// this file only holds ids, icon references, and asset paths that get paired
// with that copy by array index.

export const SECTION_ID = {
  home: "home",
  about: "about",
  services: "services",
  approach: "approach",
  results: "results",
  testimonials: "testimonials",
  faq: "faq",
  location: "location",
  contact: "contact",
} as const;

// Paired with messages.services.items by index.
export const SERVICE_ICONS = [
  "stethoscope",
  "scale",
  "trending-up",
  "syringe",
  "sparkles",
  "activity",
  "droplet",
  "repeat",
] as const;

// Paired with messages.services.items by index. Used as anchor ids so FAQ
// answers can deep-link to the specific service they relate to.
export const SERVICE_SLUGS = [
  "clinical-nutrition",
  "weight-loss",
  "weight-gain",
  "injection-follow-up",
  "body-contouring",
  "insulin-resistance",
  "fatty-liver",
  "ongoing-follow-up",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

// Paired with messages.faq.items by index. Each entry lists the service
// slug(s) most relevant to that question, rendered as an internal link.
export const FAQ_RELATED_SERVICES: ServiceSlug[][] = [
  ["injection-follow-up"],
  ["insulin-resistance", "fatty-liver"],
  ["body-contouring"],
  ["injection-follow-up"],
  ["injection-follow-up"],
  ["injection-follow-up"],
  ["weight-loss", "body-contouring"],
  ["ongoing-follow-up"],
];

// Paired with messages.results.items by index.
export const RESULT_IMAGES = [
  { before: "/images/results/result-01-before.jpg", after: "/images/results/result-01-after.jpg" },
  { before: "/images/results/result-02-before.png", after: "/images/results/result-02-after.png" },
  { before: "/images/results/result-03-before.jpg", after: "/images/results/result-03-after.jpg" },
];

export const HERO_PORTRAIT = "/images/hero/hero.jpg";
// Reusing the hero photo until a dedicated About portrait is supplied.
export const ABOUT_PORTRAIT = "/images/hero/hero.jpg";
