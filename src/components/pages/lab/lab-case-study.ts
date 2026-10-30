import { ALL_LAB_PROJECTS, LAB_HREF, labAsset, otherLabProjects } from "@/lib/lab";
import type { ProjectCaseStudyContent } from "../project-case-study";
import type { CaseStudyMediaItem } from "@/components/sections/case-study-media-section";

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
  const project = ALL_LAB_PROJECTS.find((item) => item.slug === input.slug);
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

export interface LabExperimentInput {
  slug: string;
  summary: string;
  role?: string;
  builtWith: string;
  platform: string;
  challenge: Story;
  /** The solution, including how AI was used to build and power it. */
  solution: Story;
  /** One or two sentences above the demo. */
  demoIntro: string;
  /**
   * Show the recorded walkthrough (walkthrough.mp4/.webm + poster). Until one is
   * recorded, set false: the demo section shows demo-still.webp, a capture of
   * the live app, with the same call to action.
   */
  walkthrough?: boolean;
  /** Line under the demo media. */
  demoCaption?: string;
  /** Lead capture under the demo media (default on): "Want to try it for yourself?" + "I'm interested". */
  interest?: boolean;
}

const GRID_W = 2880;
const GRID_H = 1818;

/**
 * Lighter Lab page for an experiment: a 2x2 screenshot grid as the hero,
 * Challenge + Solution (with the AI story folded into Solution), then a
 * recorded walkthrough of the app with a lead-capture call to action
 * ("Want to try it for yourself?" / "I'm interested").
 */
export function buildLabExperiment(input: LabExperimentInput): ProjectCaseStudyContent {
  const project = ALL_LAB_PROJECTS.find((item) => item.slug === input.slug);
  if (!project) throw new Error(`Unknown Lab project: ${input.slug}`);
  const asset = (file: string) => labAsset(input.slug, file);

  const interest = input.interest === false ? undefined : { project: project.name };
  const walkthroughItem: CaseStudyMediaItem = {
    video: {
      src: asset("walkthrough.mp4"),
      webm: asset("walkthrough.webm"),
      poster: asset("walkthrough-poster.webp"),
      title: `${project.name} walkthrough`,
      width: 1440,
      height: 900,
      controls: true,
    },
    caption: input.demoCaption ?? "A walkthrough recorded from the live app.",
    interest,
  };
  const stillItem: CaseStudyMediaItem = {
    src: asset("demo-still.webp"),
    alt: `${project.name}, captured from the live demo`,
    width: 2880,
    height: 1800,
    caption: input.demoCaption ?? "Captured from the live app.",
    interest,
  };

  return {
    eyebrow: "Lab · AI-native experiment",
    title: project.name,
    summary: input.summary,
    heroImage: asset("hero-grid.webp"),
    naturalHero: true,
    heroWidth: GRID_W,
    heroHeight: GRID_H,
    meta: [
      { label: "Role", value: input.role ?? "Concept, Product Design, AI Build" },
      { label: "Built with", value: input.builtWith },
      { label: "Platform", value: input.platform },
      { label: "Live demo", value: "Open in a new tab", href: project.demoHref },
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
        label: "Demo",
        media: {
          id: "demo",
          groups: [
            {
              heading: input.walkthrough === false ? "Try It" : "See It in Action",
              description: input.demoIntro,
              items: [input.walkthrough === false ? stillItem : walkthroughItem],
            },
          ],
        },
      },
    ],
    relatedProjects: otherLabProjects(input.slug),
    related: { label: "More from the Lab", indexLabel: "All Lab projects", indexHref: LAB_HREF },
  };
}
