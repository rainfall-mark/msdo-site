import { PROJECTS } from "@/lib/projects";
import ProjectCaseStudyTemplate, { type ProjectCaseStudyContent } from "./project-case-study";

const RAINFALL_MOBILE_ASSET = "https://payload.cargocollective.com/1/0/18737/14275059";
const RELATED_PROJECT_NAMES = new Set(["Rainfall Website", "Econiscore", "Coinboost", "Truvalue Platform"]);

const CONTENT = {
  eyebrow: "Case study · Personal AI",
  title: "Rainfall Mobile",
  summary: "Designing Rainfall R.1 Beta, a privacy-first Personal Intelligence platform built from a user’s own data and kept entirely on-device.",
  heroImage: `${RAINFALL_MOBILE_ASSET}/R.1_01_1200.png`,
  meta: [
    { label: "Role", value: "Product Strategy, UX Design, Product Design, Design Systems" },
    { label: "Date", value: "2024" },
    { label: "Sector", value: "Applied AI · Personal Intelligence" },
    { label: "Platform", value: "Mobile App" },
  ],
  chapters: [
    {
      label: "Challenge + Solution",
      blocks: [
        {
          heading: "Challenge",
          lead: "Build a personal AI without giving up privacy or ownership.",
          paragraphs: [
            "AI systems are becoming increasingly capable, but most rely on centralized cloud infrastructure and generic models that know little about the individual. Rainfall R.1 explored a fundamentally different approach: enabling people to build a Personal Intelligence from their own data while keeping complete privacy and ownership.",
            "The challenge was to make complex concepts — on-device AI, personal memory, and continuous model training — understandable and accessible to everyday users.",
          ],
        },
        {
          heading: "Solution",
          lead: "A continuously learning Personal Intelligence that stays on-device.",
          paragraphs: [
            "Rainfall R.1 Beta introduced a privacy-first Personal Intelligence platform that turned a user’s existing data into a continuously learning, on-device AI.",
            "We unified personal memory, timeline capture, contextual insights, and local model training into a single product that became more useful as it learned from the individual.",
          ],
        },
      ],
      highlightsLabel: "The work included:",
      highlights: [
        "Product strategy",
        "UX and product design",
        "Mobile interaction design",
        "Design systems",
      ],
      media: {
        groups: [
          {
            heading: "R.1 Beta Mobile App",
            description: "The mobile experience connected onboarding, personal memory, timeline capture, contextual insights, saved items, and activity details in one privacy-first product.",
            items: [
              {
                src: `${RAINFALL_MOBILE_ASSET}/R.1_02_1200.png`,
                alt: "Rainfall R.1 Beta mobile app screens showing onboarding, dashboard, timeline, activity details, insights, and saved items",
              },
            ],
          },
          {
            heading: "Design System Component Samples",
            description: "The design specification documented navigation, timeline and insight modules, maps, detail views, and reusable assets for the R.1 Beta system.",
            items: [
              {
                src: `${RAINFALL_MOBILE_ASSET}/R.1_03_1200.png`,
                alt: "Rainfall R.1 Beta design system component specifications for navigation, timeline, maps, and insight modules",
              },
            ],
          },
        ],
      },
    },
    {
      label: "Outcome",
      lead: "A practical alternative to cloud-centric AI.",
      paragraphs: [
        "By keeping data entirely on-device and under user control, the product demonstrated an approach where intelligence is personal, private, and uniquely aligned to the individual.",
      ],
    },
  ],
  relatedProjects: PROJECTS.filter((project) => RELATED_PROJECT_NAMES.has(project.name)),
} satisfies ProjectCaseStudyContent;

/**
 * @ployComponent
 * @ployComponentId rainfall-mobile-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Rainfall Mobile instance of the reusable light editorial project template, using the original R.1 Beta product and design-system artifacts.
 * @ployComponentTags case-study rainfall mobile personal-ai product-design editorial
 * @ployComponentStatus stable
 */
export default function RainfallMobilePage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
