/**
 * MSDO selected work. Preserved from the original msdo.us site (project names,
 * links, tags, and slurped thumbnail images) so the redesigned homepage stays
 * factually true to the studio's real portfolio.
 */
export interface Project {
  name: string;
  href: string;
  tags: string[];
  /** Slurped project thumbnail (218x146 source), reused as the hover preview. */
  image: string;
}

const ASSET_BASE =
  "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user";

export const PROJECTS: Project[] = [
  {
    name: "Rainfall Website",
    href: "/rainfall",
    tags: ["Website", "AI", "Web3"],
    image: `${ASSET_BASE}/4e6a6a97-slurp-prt-218x146-1774545511.webp`,
  },
  {
    name: "Rainfall Mobile",
    href: "/rainfall",
    tags: ["AI", "Web3"],
    image: `${ASSET_BASE}/9e439195-slurp-prt-218x146-1782021406.webp`,
  },
  {
    name: "Econiscore",
    href: "https://msdo.us/Econiscore",
    tags: ["Web App"],
    image: `${ASSET_BASE}/257c1293-slurp-prt-218x146-1782199686.webp`,
  },
  {
    name: "Coinboost",
    href: "https://msdo.us/Coinboost",
    tags: ["Mobile", "Blockchain", "Cryptocurrency"],
    image: `${ASSET_BASE}/a574d938-slurp-prt-218x146-1566081304.webp`,
  },
  {
    name: "Truvalue Website",
    href: "https://msdo.us/Truvalue-Website",
    tags: ["Web", "AI", "Finance"],
    image: `${ASSET_BASE}/924e85b0-slurp-prt-218x146-1566081425.webp`,
  },
  {
    name: "Truvalue Platform",
    href: "https://msdo.us/Truvalue-Platform",
    tags: ["Web", "AI", "Finance"],
    image: `${ASSET_BASE}/3b32dc80-slurp-prt-218x146-1566081455.webp`,
  },
  {
    name: "Truvalue Wealth",
    href: "https://msdo.us/Truvalue-Wealth",
    tags: ["Mobile", "AI", "Finance"],
    image: `${ASSET_BASE}/8c605c3f-slurp-prt-218x146-1566081254.webp`,
  },
  {
    name: "Slalome",
    href: "https://msdo.us/Slalome",
    tags: ["Mobile", "Collaboration"],
    image: `${ASSET_BASE}/dbe2df1d-slurp-prt-218x146-1566081299.webp`,
  },
  {
    name: "LaterPay",
    href: "https://msdo.us/LaterPay",
    tags: ["Mobile", "Social"],
    image: `${ASSET_BASE}/88f708ce-slurp-prt-218x146-1566081241.webp`,
  },
  {
    name: "Wickr",
    href: "https://msdo.us/Wickr",
    tags: ["Mobile", "Social"],
    image: `${ASSET_BASE}/0047fde1-slurp-prt-218x146-1566081348.webp`,
  },
];

/** Primary contact destination, preserved from the original site nav. */
export const CONTACT_HREF = "/contact";
export const ABOUT_HREF = "/about";
export const TWITTER_HREF = "http://twitter.com/#!/mstrehlow";
export const LINKEDIN_HREF = "https://www.linkedin.com/in/markstrehlow";
