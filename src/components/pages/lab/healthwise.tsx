import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabCaseStudy } from "./lab-case-study";

const CONTENT = buildLabCaseStudy({
  slug: "healthwise",
  summary: "A personal health advisor that turns scattered lab PDFs into one living profile, a dashboard you can actually read, and a monthly brief on the research that matters to you.",
  builtWith: "Claude · Claude plugin",
  platform: "Claude plugin + local dashboard",
  challenge: {
    lead: "Your health data is everywhere, and nobody is reading it as a whole.",
    paragraphs: [
      "Lab results arrive as PDFs from different vendors, in different units, months apart. Each visit looks at a snapshot. Trends, interactions, and what to ask next are left to the patient.",
      "The goal: a precision-health tool that does the reading and tracking for you, while your data stays on your own machine.",
    ],
  },
  solution: {
    lead: "Drop in your labs. Get an advisor that knows your history.",
    paragraphs: [
      "Healthwise runs a short setup interview, reads every lab PDF, normalizes the units, and builds one health profile. The dashboard shows biomarkers over time, flags what changed, and keeps advisor notes right beside the numbers.",
      "New labs are one request away, and a monthly intelligence report surfaces new research, guidelines, and approvals relevant to your markers.",
    ],
  },
  ai: {
    lead: "Claude is the analyst, the advisor, and the build.",
    paragraphs: [
      "Claude extracts biomarkers from any vendor's PDF and normalizes them, then reviews the profile through nine expert perspectives so the advice is cross-checked rather than one-note.",
      "The product ships as a Claude plugin: a set of skills for setup, lab ingestion, the advisor, and the monthly report. There is no app to install, and the data stays on your computer.",
    ],
  },
  demoCaption: "A guided tour of the dashboard with a sample profile: biomarker trends, the labs table, advisor notes, and the research feed.",
  screens: [
    { heading: "Labs Over Time", caption: "Every biomarker in one table, normalized across vendors, with trends and ranges." },
    { heading: "The Advisor", caption: "Notes and next steps from the expert panel, tied to the numbers that prompted them." },
    { heading: "Research Feed", caption: "New studies and guideline changes relevant to the profile, summarized in plain English." },
  ],
});

/**
 * @ployComponent
 * @ployComponentId lab-healthwise-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Healthwise Lab case study on the shared project template: hero capture, challenge and solution, how AI helped, a recorded demo with a link to the live sample-data version, and feature screens.
 * @ployComponentTags lab case-study healthwise health ai editorial
 * @ployComponentStatus stable
 */
export default function HealthwisePage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
