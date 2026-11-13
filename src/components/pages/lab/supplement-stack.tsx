import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabExperiment } from "./lab-case-study";

const CONTENT = buildLabExperiment({
  slug: "supplement-stack",
  summary: "AI that keeps your whole supplement routine in one place: what to take and when, where products overlap, what runs past safe limits, what it costs, and what to keep, trim, or add.",
  builtWith: "Multi-agent workflow",
  platform: "Web dashboard, sample data",
  challenge: {
    lead: "Supplement stacks grow one recommendation at a time.",
    paragraphs: [
      "A podcast here, a doctor's suggestion there, and a few years in you're taking a dozen products. The same nutrients hide in several labels, totals creep past safe limits, and nothing connects to your labs or what you spend.",
      "Keeping it right means adding up every label, checking every new lab panel, and remembering what you changed and why. Almost no one does.",
    ],
  },
  solution: {
    lead: "Your whole stack, checked and kept current by AI.",
    paragraphs: [
      "Snap photos of your bottles. AI totals every nutrient across products and flags anything past safe limits.",
      "Share new labs and AI agents check them against your stack and the evidence, then recommend what to keep, adjust, add, or trim. When your doctor pauses something, it plans the way back.",
      "One dashboard shows what to take today, everything you've taken over the years, and what it all costs, and it stays current as you go.",
      "The result: a simpler, safer stack to review with your doctor. It never replaces their advice.",
    ],
  },
  demoIntro: "A walkthrough of the live demo on a fictional person's stack: today's protocol, the safety flags and plan, the timeline with dose details, and cost.",
  demoCaption: "Recorded from the live demo. Sam Avery is fictional, and every product, dose, and price is sample data.",
});

/**
 * @ployComponent
 * @ployComponentId lab-supplement-stack-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Supplement Stack Lab experiment page: 2x2 screenshot-grid hero (Dashboard, Recommendations, Timeline with a dose popover, Cost), challenge and solution (with how AI was used), a recorded walkthrough of the live sample-data demo, and an "I'm interested" lead form.
 * @ployComponentTags lab experiment supplements dashboard ai editorial
 * @ployComponentStatus stable
 */
export default function SupplementStackPage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
