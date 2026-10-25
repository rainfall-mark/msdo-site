import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabExperiment } from "./lab-case-study";

const CONTENT = buildLabExperiment({
  slug: "healthwise",
  summary: "AI that charts your Function Health results over time and brings in expert perspectives to explain what your numbers mean, so you understand your own health and know what to ask next.",
  builtWith: "Claude · Function Health connector",
  platform: "Claude artifact, live Function data",
  challenge: {
    lead: "Function Health shows you a snapshot. Your health is a journey.",
    paragraphs: [
      "Function Health gives you a deep panel of biomarkers, but it emphasizes your most recent results. It doesn't chart how each marker has moved over time, how fast it's changing, or whether the changes you've made are working.",
      "Without that, it's hard to connect the diet, training, and sleep changes you make to the numbers that follow, or to know what to ask about next.",
    ],
  },
  solution: {
    lead: "Your results over time, interpreted by the health experts you respect.",
    paragraphs: [
      "See every biomarker charted across all your draws, with the rate of change and Function Health's range, so you can tell what's moving and whether your efforts are paying off.",
      "Choose personalized health advisors: AI agents built on the published frameworks of health experts you respect, matched to your own health concerns. Each one reads your results through its lens, explains what matters, and ends with a question to bring to your doctor.",
      "Go deeper on any marker with a research brief: what it measures, what the evidence says, and where each expert's targets come from, so you keep learning as your health journey unfolds.",
      "None of this replaces your doctor. It strengthens the relationship: you arrive prepared, with better questions and a clear picture of your trends. You are your best advocate.",
    ],
  },
  demoIntro: "A walkthrough of the live demo on a fictional Function member's results: the dashboard and marker charts, every lab over time, an expert review, and a Research conversation with a follow-up.",
  demoCaption: "Recorded from the live demo. The results, reviews and briefs are pre-written samples, not real data or live AI.",
  showCta: false,
});

/**
 * @ployComponent
 * @ployComponentId lab-healthwise-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Healthwise for Function Lab experiment page: 2x2 screenshot-grid hero (Dashboard, Labs, Advisor, Research), challenge and solution (with how AI was used), a recorded walkthrough of the live sample-data demo.
 * @ployComponentTags lab experiment healthwise health ai editorial
 * @ployComponentStatus stable
 */
export default function HealthwisePage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
