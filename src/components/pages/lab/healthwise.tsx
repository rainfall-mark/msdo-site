import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabExperiment } from "./lab-case-study";

const CONTENT = buildLabExperiment({
  slug: "healthwise",
  summary: "A personal health advisor that turns scattered lab PDFs into one living profile, a dashboard you can actually read, and a monthly brief on the research that matters to you.",
  builtWith: "Claude · Claude plugin",
  platform: "Claude plugin + web dashboard",
  challenge: {
    lead: "Your lab results are scattered, and nobody reads them as a whole.",
    paragraphs: [
      "Results arrive as PDFs from different labs and home kits, in different units, months apart. Each appointment looks at one snapshot, so the trends get missed.",
      "Working out what changed, what matters, and what to ask next is left to you.",
    ],
  },
  solution: {
    lead: "One living health profile, with an advisor that knows your history.",
    paragraphs: [
      "Track every biomarker in one dashboard. Drop in lab PDFs from any vendor and the values are normalized, charted over time, and checked against ranges.",
      "Understand what the numbers mean. An advisor reviews them through several expert lenses, like cardiology, nutrition, and metabolic health, and turns them into a prioritized plan to take to your doctor.",
      "Stay current with a monthly brief on new research and guidelines that matter to your markers, with sources.",
      "Claude reads the labs, normalizes the data, writes the advice, and builds the dashboard. It runs as a Claude plugin, so your data stays on your own computer. It informs, never prescribes.",
    ],
  },
  demoIntro: "The live demo runs on a fictional sample profile: the dashboard, every lab over time, the advisor's roadmap, and sample research threads.",
  walkthrough: false,
  demoCaption: "Captured from the live demo, which uses fictional sample data.",
});

/**
 * @ployComponent
 * @ployComponentId lab-healthwise-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Healthwise Lab experiment page: 2x2 screenshot-grid hero, challenge and solution (with how AI was used), a capture of the live sample-data demo, and a prominent call to action that opens the live app in a new tab.
 * @ployComponentTags lab experiment healthwise health ai editorial
 * @ployComponentStatus stable
 */
export default function HealthwisePage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
