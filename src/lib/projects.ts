/**
 * MSDO selected work. Preserved from the original msdo.us site (project names,
 * links, tags, and slurped thumbnail images) so the redesigned homepage stays
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
    image: `${ASSET_BASE}/4e6a6a97-slurp-prt-218x146-1774545511.webp`,
  },
  {
    name: "Rainfall Mobile",
    href: "https://msdo.us/Rainfall-Mobile",
    tags: ["AI", "Web3"],
    image: `${ASSET_BASE}/9e439195-slurp-prt-218x146-1782021406.webp`,
  },
  {
    name: "Econiscore",
    href: "/econiscore",
    tags: ["Web App"],
    image: `${ASSET_BASE}/257c1293-slurp-prt-218x146-1782199686.webp`,
  },
  {
    name: "Coinboost",
    href: "/coinboost",
    tags: ["Mobile", "Blockchain", "Cryptocurrency"],
    image: `${ASSET_BASE}/6ab4513f-prt-218x146-1566081304-2x-3.webp`,
  },
  {
    name: "Truvalue Website",
    href: "/truvalue-website",
    tags: ["Web", "AI", "Finance"],
    image: `${ASSET_BASE}/924e85b0-slurp-prt-218x146-1566081425.webp`,
  },
  {
    name: "Truvalue Platform",
    href: "/truvalue-platform",
    tags: ["Web", "AI", "Finance"],
    image: `${ASSET_BASE}/3b32dc80-slurp-prt-218x146-1566081455.webp`,
  },
  {
    name: "Truvalue Wealth",
    href: "/truvalue-wealth",
    tags: ["Mobile", "AI", "Finance"],
    image: "https://payload.cargocollective.com/1/0/18737/13920931/Wealth_cover_1200_2_1200.png",
  },
  {
    name: "Slalome",
    href: "/slalome",
    tags: ["Mobile", "Collaboration"],
    image: `${ASSET_BASE}/dbe2df1d-slurp-prt-218x146-1566081299.webp`,
  },
  {
    name: "LaterPay",
    href: "/laterpay",
    tags: ["Mobile", "Social"],
    image: `${ASSET_BASE}/88f708ce-slurp-prt-218x146-1566081241.webp`,
  },
  {
    name: "Wickr",
    href: "/wickr",
    tags: ["Mobile", "Social"],
    image: `${ASSET_BASE}/0047fde1-slurp-prt-218x146-1566081348.webp`,
  },
];

/** Primary contact destination, preserved from the original site nav. */
export const CONTACT_HREF = "/contact";
export const ABOUT_HREF = "/about";
export const TWITTER_HREF = "http://twitter.com/#!/mstrehlow";
export const LINKEDIN_HREF = "https://www.linkedin.com/in/markstrehlow";
