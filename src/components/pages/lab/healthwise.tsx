import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabExperiment } from "./lab-case-study";

const CONTENT = buildLabExperiment({
  slug: "healthwise",
  summary: "AI that charts your Function Health results over time and brings in expert perspectives to explain what your numbers mean, so you understand your own health and know what to ask next.",
  builtWith: "Claude · Function Health connector",
  platform: "Claude artifact, live Function Health data",
  challenge: {
    lead: "Your health is not just a snapshot, it's a journey.",
    paragraphs: [
      "Function Health gives you a deep panel of biomarkers, but it emphasizes your most recent results. It doesn't chart how each marker has moved over time, how fast it's changing, or whether the changes you've made are working.",
      "And reading all of it the way an expert would, across every draw and every system, takes more time and knowledge than most of us have.",
    ],
  },
  solution: {
    lead: "Your results over time, interpreted by the health experts you respect.",
    paragraphs: [
      "Time-series charts of your biomarkers, so you can see what's changing and whether your efforts are paying off.",
      "Personalized health advice from your favorite health experts. AI builds each advisor persona from the expert's published work and matches it to your health concerns, then keeps it current as their thinking evolves, so you don't have to.",
      "AI does all the work, translating, charting, and explaining. The result: you understand your own health, you walk into your doctor's visit prepared, and you become your own best health advocate. It never replaces your doctor.",
      "Finally, health information you can understand, at your fingertips.",
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
