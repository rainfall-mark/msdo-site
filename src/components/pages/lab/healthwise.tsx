import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabExperiment } from "./lab-case-study";

const CONTENT = buildLabExperiment({
  slug: "healthwise",
  summary: "A free edition of Healthwise that reads your Function Health results through Claude, charts every biomarker over time, and lets the experts you choose explain what your numbers mean.",
  builtWith: "Claude · Function Health connector",
  platform: "Claude artifact, live Function data",
  challenge: {
    lead: "Function gives you a lot of lab results. Making sense of them is still up to you.",
    paragraphs: [
      "Each draw arrives as a long list of markers and ranges. It's hard to see what's moving, what matters most, and how one marker relates to another.",
      "And the best-known longevity and health experts read the same numbers differently, through frameworks most people never see side by side.",
    ],
  },
  solution: {
    lead: "Your Function results, read clearly and through the experts you follow.",
    paragraphs: [
      "See every biomarker charted across all your draws, with a trend line, Function's range, and what moved since last time.",
      "Understand what your numbers mean through the published frameworks of nine longevity and health experts. Each one reads your results through its own lens and ends with a question to take to your doctor.",
      "Go deeper with a research brief on any marker: what it measures, what the evidence says, and where each expert's target comes from.",
      "Claude reads your results live through its Function Health connector and writes every review and brief. There's no database, so nothing is stored. The free edition reads with three experts, and full Healthwise unlocks all nine plus Research.",
    ],
  },
  demoIntro: "A walkthrough of the live demo on a fictional Function member's results: the dashboard and marker charts, every lab over time, an expert review, and a Research conversation with a follow-up.",
  demoCaption: "Recorded from the live demo. The results, reviews and briefs are pre-written samples, not real data or live AI.",
});

/**
 * @ployComponent
 * @ployComponentId lab-healthwise-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Healthwise for Function Lab experiment page: 2x2 screenshot-grid hero (Dashboard, Labs, Advisor, Research), challenge and solution (with how AI was used), a recorded walkthrough of the live sample-data demo, and a prominent call to action that opens the live app in a new tab.
 * @ployComponentTags lab experiment healthwise health ai editorial
 * @ployComponentStatus stable
 */
export default function HealthwisePage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
