import ProjectCaseStudyTemplate, { type ProjectCaseStudyContent } from "./project-case-study";

const RAINFALL_ASSET = "https://payload.cargocollective.com/1/0/18737/14634126";

const CONTENT: ProjectCaseStudyContent = {
  eyebrow: "Case study · Applied AI",
  title: "Rainfall",
  summary: "Defining and designing a new category — AI Coherence and self-sovereign Personal AI — across a category-defining website and an on-device, privacy-first mobile product for the agentic era.",
  heroImage: `${RAINFALL_ASSET}/Overview_1200_1200.png`,
  meta: [
    { label: "Role", value: "Strategy, Branding, UX & Product Design, Design Systems" },
    { label: "Timeline", value: "2023 – 2025" },
    { label: "Sector", value: "Applied AI · Self-sovereign / Web3" },
    { label: "Live site", value: "rainfall.one", href: "https://www.rainfall.one" },
  ],
  chapters: [
    {
      label: "Challenge / 01",
      lead: "Rainfall introduced a category that didn't map to any existing mental model — neither AI assistant, data-privacy app, nor Web3 wallet.",
      paragraphs: [
        "Rainfall set out to build the self-sovereign governance layer for the agentic era: AI Coherence and Personal AI that stays private, owned, and aligned to the individual it serves. The concept was genuinely new — and it didn't fit how people already thought about AI.",
        "Early website iterations leaned on familiar narratives around data privacy, ownership, and monetization. Those framings felt safe but blunted differentiation, and failed to convey Rainfall as foundational infrastructure for an autonomous-agent economy.",
      ],
      media: { label: "Overview", heading: "A category-defining storytelling platform", items: [{ src: `${RAINFALL_ASSET}/Overview_1200_1200.png`, alt: "Overview of Rainfall website screens" }] },
    },
    {
      label: "Approach / 02",
      lead: "Distill a complex, evolving concept into one clear, future-facing story — then express it consistently from high-level vision down to product architecture.",
      paragraphs: [
        "The work evolved through multiple iterations into a focused storytelling platform. Each version simplified the story and shifted positioning away from a data-centric message toward a category-defining AI Coherence narrative — strengthening the case around reliability, identity, and governance for autonomous systems.",
        "The final design introduced a more opinionated, future-facing narrative supported by a clean, minimal visual system and a modular structure — enabling clear communication from the high-level vision through to the product architecture, and establishing Rainfall as foundational infrastructure for the agentic era.",
      ],
      highlightsLabel: "What MSDO delivered",
      highlights: ["Positioning & category narrative — from data-centric to AI Coherence", "Brand & minimal visual system for rainfall.one", "Website design + development oversight (2023–2025)", "R.1 mobile product strategy, UX & product design", "On-device Personal AI design system & component library"],
      media: { label: "Website system", heading: "A modular story from vision to product detail", items: [
        { src: `${RAINFALL_ASSET}/01_Home_1000.png`, alt: "Rainfall homepage" },
        { src: `${RAINFALL_ASSET}/02_About_1000.png`, alt: "Rainfall about page" },
        { src: `${RAINFALL_ASSET}/03_News_1000.png`, alt: "Rainfall news page" },
        { src: `${RAINFALL_ASSET}/04_Details_1000.png`, alt: "Rainfall product details page" },
        { src: `${RAINFALL_ASSET}/05_Resources_1000.png`, alt: "Rainfall resources page" },
        { src: `${RAINFALL_ASSET}/06_Contact_1000.png`, alt: "Rainfall contact page" },
      ] },
    },
    {
      label: "Outcome / 03",
      lead: "A clear, ownable story and a shipping product that prove a private, self-sovereign alternative to cloud-centric AI is real.",
      paragraphs: [
        "The website now communicates a single, confident narrative — AI Coherence for the agentic era — that holds up across users, developers, and investors, and positions Rainfall as a governance layer rather than another privacy app.",
        "Together the work gave Rainfall a coherent identity and product foundation to keep building on as it scales self-sovereign AI coherence for autonomous systems.",
      ],
    },
  ],
  nextProject: { name: "Truvalue", href: "https://msdo.us/Truvalue-Website", tags: ["Web", "AI", "Finance"] },
};

/**
 * @ployComponent
 * @ployComponentId rainfall-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Rainfall instance of the reusable light editorial project case-study template, using all seven high-resolution website presentation images from the original MSDO project page.
 * @ployComponentTags case-study rainfall portfolio studio light editorial
 * @ployComponentStatus stable
 */
export default function RainfallPage() { return <ProjectCaseStudyTemplate content={CONTENT} />; }
