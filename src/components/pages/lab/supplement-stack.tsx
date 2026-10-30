import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabExperiment } from "./lab-case-study";

const CONTENT = buildLabExperiment({
  slug: "supplement-stack",
  summary: "AI that keeps your whole supplement routine in one place: what to take and when, where products overlap, what runs past safe limits, what it costs, and what to keep, trim, or add.",
  builtWith: "Claude · multi-agent workflow",
  platform: "Web dashboard, sample data",
  challenge: {
    lead: "Supplement stacks grow one recommendation at a time.",
    paragraphs: [
      "A podcast here, a doctor's suggestion there, and a few years in you're taking a dozen products from different brands. The same nutrients hide in several labels, some totals creep past safe upper limits, and nothing connects back to your labs or goals.",
      "Staying on top of it means reading every label, adding up every ingredient, and remembering what you changed and why. Almost no one does.",
    ],
  },
  solution: {
    lead: "Your whole stack, checked and kept current by AI.",
    paragraphs: [
      "Snap photos of your labels. AI reads every ingredient, totals each nutrient across products, and checks it against upper limits and target ranges, so overlaps and risks surface on their own.",
      "A small team of AI agents researches the evidence for each ingredient and brand, reviews the stack against your labs and goals, and recommends what to keep, adjust, add, or trim. It keeps running: tell it what you skipped or swapped, and a weekly sync updates the plan.",
      "The dashboard shows today's protocol by time of day, a timeline of everything you've taken over the years, and what it all costs each month.",
      "The result: a simpler, safer stack you can review with your doctor or nutritionist. It never replaces their advice.",
    ],
  },
  demoIntro: "A walkthrough of the live demo on a fictional person's stack: today's protocol, the safety flags and plan, the timeline with dose details, cost, and dark mode.",
  demoCaption: "Recorded from the live demo. Sam Avery is fictional, and every product, dose, and price is sample data.",
});

/**
 * @ployComponent
 * @ployComponentId lab-supplement-stack-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Supplement Stack Lab experiment page: 2x2 screenshot-grid hero (Dashboard, Safety and Recommendations, Timeline with a dose popover, Cost), challenge and solution (with how AI was used), a recorded walkthrough of the live sample-data demo, and an "I'm interested" lead form.
 * @ployComponentTags lab experiment supplements dashboard ai editorial
 * @ployComponentStatus stable
 */
export default function SupplementStackPage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
