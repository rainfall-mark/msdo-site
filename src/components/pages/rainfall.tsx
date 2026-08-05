import { PROJECTS } from "@/lib/projects";
import ProjectCaseStudyTemplate, { type ProjectCaseStudyContent } from "./project-case-study";

const RAINFALL_ASSET = "https://payload.cargocollective.com/1/0/18737/14634126";
const RELATED_PROJECT_NAMES = new Set(["Econiscore", "Coinboost", "Truvalue Website"]);

const CONTENT: ProjectCaseStudyContent = {
  eyebrow: "Case study · Applied AI",
  title: "Rainfall",
  summary: "Positioning and designing Rainfall’s AI Coherence platform across a category-defining website and privacy-first mobile product.",
  heroImage: "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user/4e6a6a97-slurp-prt-218x146-1774545511.webp",
  meta: [
    { label: "Role", value: "Strategy, Branding, UX & Product Design, Design Systems" },
    { label: "Timeline", value: "2023 – 2025" },
    { label: "Sector", value: "Applied AI · Self-sovereign / Web3" },
    { label: "Live site", value: "rainfall.one", href: "https://www.rainfall.one" },
  ],
  chapters: [
    {
      label: "Challenge + Approach",
      blocks: [
        {
          heading: "Challenge",
          lead: "A new AI category without an existing mental model.",
          paragraphs: [
            "Rainfall combined Personal AI, privacy, ownership, and agent governance. The challenge was explaining it without reducing the idea to another assistant, privacy app, or Web3 product.",
            "The story also needed to work for users, developers, and investors while connecting an abstract governance layer to tangible experiences across web and mobile.",
          ],
        },
        {
          heading: "Approach",
          lead: "Turn a complex system into one clear story.",
          paragraphs: [
            "We focused the positioning around AI Coherence, then created a minimal visual and modular design system that could carry the idea from high-level vision to product detail.",
          ],
        },
      ],
      highlightsLabel: "The work included:",
      highlights: [
        "Positioning and category narrative",
        "Website brand, design system, and development oversight",
        "R.1 mobile product strategy, UX, and component system",
      ],
      media: {
        groups: [
          {
            heading: "Website",
            description: "The website carried Rainfall’s AI Coherence story from its core vision into company context, product detail, resources, news, and contact pathways.",
            items: [
              { src: `${RAINFALL_ASSET}/01_Home_1000.png`, alt: "Rainfall homepage" },
              { src: `${RAINFALL_ASSET}/02_About_1000.png`, alt: "Rainfall about page" },
              { src: `${RAINFALL_ASSET}/03_News_1000.png`, alt: "Rainfall news page" },
              { src: `${RAINFALL_ASSET}/04_Details_1000.png`, alt: "Rainfall product details page" },
              { src: `${RAINFALL_ASSET}/05_Resources_1000.png`, alt: "Rainfall resources page" },
              { src: `${RAINFALL_ASSET}/06_Contact_1000.png`, alt: "Rainfall contact page" },
            ],
          },
        ],
      },
    },
    {
      label: "Outcome",
      lead: "A clear story and product foundation for self-sovereign AI.",
      paragraphs: [
        "Rainfall now has a coherent identity, focused AI Coherence narrative, and scalable foundation across web and mobile.",
      ],
    },
  ],
  relatedProjects: PROJECTS.filter((project) => RELATED_PROJECT_NAMES.has(project.name)),
};

/**
 * @ployComponent
 * @ployComponentId rainfall-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Rainfall instance of the reusable light editorial project case-study template, using six high-resolution website presentation images from the original MSDO project page.
 * @ployComponentTags case-study rainfall portfolio studio light editorial
 * @ployComponentStatus stable
 */
export default function RainfallPage() { return <ProjectCaseStudyTemplate content={CONTENT} />; }
