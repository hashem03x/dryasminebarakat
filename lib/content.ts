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
  location: "location",
  contact: "contact",
} as const;

// Paired with messages.services.items by index.
export const SERVICE_ICONS = [
  "stethoscope",
  "scale",
  "trending-up",
  "sparkles",
  "repeat",
] as const;

// Paired with messages.results.items by index.
// Replace with real client photography once consent is confirmed.
export const RESULT_IMAGES = [
  { before: "/images/results/result-01-before.jpg", after: "/images/results/result-01-after.jpg" },
  { before: "/images/results/result-02-before.png", after: "/images/results/result-02-after.png" },
  { before: "/images/results/result-03-before.svg", after: "/images/results/result-03-after.svg" },
];

export const HERO_PORTRAIT = "/images/hero/hero.jpg";
export const ABOUT_PORTRAIT = "/images/about/portrait.svg";
