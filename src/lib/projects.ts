/**
 * MSDO selected work. Preserved from the original msdo.us site (project names,
 * links, tags, and high-resolution project thumbnails) so the redesigned homepage stays
 * factually true to the studio's real portfolio.
 */
export interface Project {
  name: string;
  href: string;
  tags: string[];
  /** Project thumbnail reused across portfolio and related-project previews. */
  image: string;
}

const ASSET_BASE =
  "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user";

export const PROJECTS: Project[] = [
  {
    name: "Rainfall Website",
    href: "/rainfall",
    tags: ["Website", "AI", "Web3"],
    image: `${ASSET_BASE}/d297aa17-rainfall-website.webp`,
  },
  {
    name: "Rainfall Mobile",
    href: "/rainfall-mobile",
    tags: ["AI", "Web3"],
    image: `${ASSET_BASE}/e1421a7d-rainfall-mobile.webp`,
  },
  {
    name: "Econiscore",
    href: "/econiscore",
    tags: ["Web App"],
    image: `${ASSET_BASE}/fa5ed38d-econify-performance.webp`,
  },
  {
    name: "Coinboost",
    href: "/coinboost",
    tags: ["Mobile", "Blockchain", "Cryptocurrency"],
    image: `${ASSET_BASE}/713ac62a-coinboost.webp`,
  },
  {
    name: "Truvalue Website",
    href: "/truvalue-website",
    tags: ["Web", "AI", "Finance"],
    image: `${ASSET_BASE}/48350719-truvalue-website.webp`,
  },
  {
    name: "Truvalue Platform",
    href: "/truvalue-platform",
    tags: ["Web", "AI", "Finance"],
    image: `${ASSET_BASE}/c8bd8ef0-truvalue-platform.webp`,
  },
  {
    name: "Truvalue Wealth",
    href: "/truvalue-wealth",
    tags: ["Mobile", "AI", "Finance"],
    image: `${ASSET_BASE}/a321b267-truvalue-wealth.webp`,
  },
  {
    name: "Slalome",
    href: "/slalome",
    tags: ["Mobile", "Collaboration"],
    image: `${ASSET_BASE}/ca8baf5a-slalome.webp`,
  },
  {
    name: "LaterPay",
    href: "/laterpay",
    tags: ["Mobile", "Social"],
    image: `${ASSET_BASE}/40de33d1-laterpay.webp`,
  },
  {
    name: "Wickr",
    href: "/wickr",
    tags: ["Mobile", "Social"],
    image: `${ASSET_BASE}/fc757ab3-wickr.webp`,
  },
];

const HIDDEN_PROJECT_NAMES = new Set(["Rainfall Website", "Truvalue Website"]);

/** Projects currently shown in portfolio grids and related-work sections. */
export const VISIBLE_PROJECTS = PROJECTS.filter(
  (project) => !HIDDEN_PROJECT_NAMES.has(project.name),
);

/** Primary contact destination, preserved from the original site nav. */
export const CONTACT_HREF = "/contact";
export const ABOUT_HREF = "/about";
export const TWITTER_HREF = "http://twitter.com/#!/mstrehlow";
export const LINKEDIN_HREF = "https://www.linkedin.com/in/markstrehlow";
