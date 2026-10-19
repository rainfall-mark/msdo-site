import { LAB_HREF, LAB_PROJECTS, labAsset, otherLabProjects } from "@/lib/lab";
import type { ProjectCaseStudyContent } from "../project-case-study";

interface Story { lead: string; paragraphs: string[] }

export interface LabCaseStudyInput {
  slug: string;
  summary: string;
  role?: string;
  builtWith: string;
  platform: string;
  challenge: Story;
  solution: Story;
  ai: Story & { highlights?: string[] };
  /** One sentence for the recorded tour. */
  demoCaption: string;
  /** Feature screenshots, in order: screen-1.webp, screen-2.webp, ... */
  screens: { heading: string; caption: string }[];
}

const HERO_W = 2880;
const HERO_H = 1800;

/**
 * Builds a Lab case study on the shared Work project template: hero capture,
 * Challenge + Solution, How AI helped, the recorded demo with a link to the
 * live version, feature screens, and the other Lab projects.
 */
export function buildLabCaseStudy(input: LabCaseStudyInput): ProjectCaseStudyContent {
  const project = LAB_PROJECTS.find((item) => item.slug === input.slug);
  if (!project) throw new Error(`Unknown Lab project: ${input.slug}`);
  const asset = (file: string) => labAsset(input.slug, file);
  const isExternal = /^https?:\/\//.test(project.demoHref);

  return {
    eyebrow: "Lab · AI-driven project",
    title: project.name,
    summary: input.summary,
    heroImage: asset("hero.webp"),
    naturalHero: true,
    heroWidth: HERO_W,
    heroHeight: HERO_H,
    meta: [
      { label: "Role", value: input.role ?? "Concept, Product Design, AI Build" },
      { label: "Built with", value: input.builtWith },
      { label: "Platform", value: input.platform },
      { label: "Live demo", value: isExternal ? "Open the demo" : "Try it", href: project.demoHref },
    ],
    chapters: [
      {
        label: "Challenge + Solution",
        blocks: [
          { heading: "Challenge", ...input.challenge },
          { heading: "Solution", ...input.solution },
        ],
      },
      {
        label: "How AI helped",
        lead: input.ai.lead,
        paragraphs: input.ai.paragraphs,
        highlights: input.ai.highlights,
        highlightsLabel: input.ai.highlights ? "Where AI does the work" : undefined,
      },
      {
        label: "Demo",
        media: {
          id: "demo",
          groups: [
            {
              heading: "See It in Action",
              description: input.demoCaption,
              items: [
                {
                  video: { src: asset("demo.mp4"), webm: asset("demo.webm"), poster: asset("demo-poster.webp"), title: `${project.name} demo recording`, width: 1440, height: 900 },
                  caption: "Recorded from the live demo, which runs on sample data.",
                  link: { href: project.demoHref, label: "Open the live demo" },
                },
              ],
            },
            ...input.screens.map((screen, index) => ({
              heading: screen.heading,
              description: screen.caption,
              items: [{ src: asset(`screen-${index + 1}.webp`), alt: `${project.name}: ${screen.caption}`, width: HERO_W, height: HERO_H }],
            })),
          ],
        },
      },
    ],
    relatedProjects: otherLabProjects(input.slug),
    related: { label: "More from the Lab", indexLabel: "All Lab projects", indexHref: LAB_HREF },
  };
}
