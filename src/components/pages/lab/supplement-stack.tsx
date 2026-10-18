import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabCaseStudy } from "./lab-case-study";

const CONTENT = buildLabCaseStudy({
  slug: "supplement-stack",
  summary: "An always-current dashboard for a growing supplement stack: what to take and when, where products overlap, what runs over the limit, and what to keep, trim, or add.",
  builtWith: "Claude · Artifacts",
  platform: "Web dashboard",
  challenge: {
    lead: "Stacks grow one recommendation at a time.",
    paragraphs: [
      "A few years in, a routine can span a dozen products from different brands. The same nutrients hide in several labels, some totals creep past safe upper limits, and nothing connects back to lab results or goals.",
    ],
  },
  solution: {
    lead: "One view of the whole stack, kept current.",
    paragraphs: [
      "The dashboard shows today's protocol by time of day, nutrient totals against upper limits, safety flags, and keep, adjust, add, or trim recommendations tied to goals.",
      "A timeline traces every product and ingredient over the years, and a summary is ready to review with a nutritionist.",
    ],
  },
  ai: {
    lead: "Claude keeps the ledger.",
    paragraphs: [
      "Claude reads product labels from photos, totals every ingredient across products, flags overlaps and upper limits, and ties each recommendation back to labs and goals.",
      "It runs as an ongoing agent rather than a one-off report: skips and swaps get logged in chat, and a weekly sync refreshes the dashboard.",
    ],
  },
  demoCaption: "A guided tour with a sample stack: today's protocol, a dosing flag, recommendations, and the product timeline.",
  screens: [
    { heading: "Dosing Safety", caption: "Nutrient totals across every product, checked against upper limits." },
    { heading: "Recommendations", caption: "What to keep, adjust, add, or trim, and why." },
    { heading: "Stack History", caption: "Every product and ingredient over the years, by product or by ingredient." },
  ],
});

/**
 * @ployComponent
 * @ployComponentId lab-supplement-stack-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Supplement Stack Lab case study on the shared project template: hero capture, challenge and solution, how AI helped, a recorded demo with a link to the live sample-data version, and feature screens.
 * @ployComponentTags lab case-study supplements dashboard ai editorial
 * @ployComponentStatus stable
 */
export default function SupplementStackPage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
