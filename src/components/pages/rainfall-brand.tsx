import { VISIBLE_PROJECTS } from "@/lib/projects";
import ProjectCaseStudyTemplate, { type ProjectCaseStudyContent } from "./project-case-study";

// MSDO fork: images live in public/images rather than Ploy storage.
const ASSET = "/images/rainfall-brand";
const RELATED_PROJECT_NAMES = new Set(["Rainfall Studio", "Rainfall Mobile", "Truvalue Platform", "Econiscore"]);

const CONTENT: ProjectCaseStudyContent = {
  eyebrow: "Case study · Brand & positioning",
  title: "Rainfall",
  summary: "Defining a new category, AI Coherence, and building the brand and website to carry it to users, developers, and investors.",
  heroImage: `${ASSET}/hero.webp`,
  naturalHero: true,
  heroWidth: 1200,
  heroHeight: 923,
  meta: [
    { label: "Role", value: "Branding, Positioning, Design, Development Oversight" },
    { label: "Date", value: "2025" },
    { label: "Sector", value: "AI · Agentic Infrastructure · Web3" },
    { label: "Live site", value: "rainfall.one", href: "https://www.rainfall.one" },
  ],
  chapters: [
    {
      label: "Challenge + Approach",
      blocks: [
        {
          heading: "Challenge",
          lead: "A new category with no existing mental model.",
          paragraphs: [
            "Rainfall introduced AI Coherence and self-sovereign Personal AI, ideas that didn’t map to familiar categories like AI assistants, data privacy, or Web3. Early iterations of the site leaned on narratives around data privacy, ownership, and monetization, which limited differentiation and undersold Rainfall as a governance layer for the agentic economy.",
            "The challenge was to distill a complex, fast-moving concept into a clear story that could land with users, developers, and investors.",
          ],
        },
        {
          heading: "Approach",
          lead: "Name the category, then make it legible.",
          paragraphs: [
            "We took the site through multiple iterations, moving from a data-centric message to a category-defining AI Coherence narrative. Each version sharpened the positioning around reliability, identity, and governance for autonomous systems.",
            "The final design paired an opinionated, future-facing narrative with a clean, minimal visual system and a modular structure that carries the story from high-level vision down to product architecture.",
          ],
        },
      ],
      highlightsLabel: "The work included:",
      highlights: [
        "Category definition and positioning",
        "Messaging and narrative architecture",
        "Brand and visual system",
        "Website design and development oversight",
      ],
    },
    {
      label: "Positioning",
      lead: "From owning your data to governing your agents.",
      paragraphs: [
        "Rainfall’s story has moved with the market. Each step kept the same core belief, that intelligence should stay sovereign to the individual it serves, while reframing what that means as AI shifts from tools to autonomous agents.",
      ],
      highlightsLabel: "How the story evolved",
      highlights: [
        "Data ownership: privacy, control, and value from your own data",
        "Personal AI: R.1, an on-device Personal Intelligence that learns from the individual",
        "AI Coherence: the governance layer for the agentic era",
        "Coherent agents: Rainfall Studio, for building governed agents that behave consistently on any model",
      ],
      media: {
        groups: [
          {
            heading: "Category Narrative",
            description: "The homepage moves from mission to problem to solution. As AI becomes agent-native, intelligence is no longer the constraint, coherence is.",
            items: [{ src: `${ASSET}/home.webp`, alt: "Rainfall homepage, AI Coherence for the Agentic Era", width: 2880, height: 3219 }],
          },
          {
            heading: "Platform Architecture",
            description: "The platform story breaks the stack into five layers, each with a single verb: create, shape, enforce, scale, settle. It gives a complex governance architecture a simple, repeatable shape.",
            items: [{ src: `${ASSET}/platform-layers.webp`, alt: "Rainfall platform layers: Aura, Surface, Forge, Continuum, and Monsoon", width: 2880, height: 1417 }],
          },
          {
            heading: "Company and Credibility",
            description: "About and News establish the team, advisors, and global footprint, and keep a steady cadence of perspective on Personal AI, governance, and the agentic economy.",
            items: [{ src: `${ASSET}/company-news.webp`, alt: "Rainfall About and News pages", width: 2880, height: 3840 }],
          },
          {
            heading: "Content System",
            description: "Article, resource, and contact templates share one modular system, so the narrative can grow with the company.",
            items: [{ src: `${ASSET}/content-system.webp`, alt: "Rainfall article, resources, and contact pages", width: 2880, height: 3793 }],
          },
        ],
      },
    },
    {
      label: "Outcome",
      lead: "A category story the company can build on.",
      paragraphs: [
        "Rainfall now has a distinct identity and a focused narrative that frames it as foundational infrastructure for the agentic era, a story that extends from the website into the product family, from R.1 to Rainfall Studio.",
      ],
    },
  ],
  relatedProjects: VISIBLE_PROJECTS.filter((project) => RELATED_PROJECT_NAMES.has(project.name)),
};

/**
 * @ployComponent
 * @ployComponentId rainfall-brand-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Rainfall brand, positioning, and website case study using the shared editorial project template.
 * @ployComponentTags case-study rainfall brand positioning ai web3
 * @ployComponentStatus draft
 */
export default function RainfallBrandPage() { return <ProjectCaseStudyTemplate content={CONTENT} />; }
