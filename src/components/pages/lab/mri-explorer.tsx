import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabExperiment } from "./lab-case-study";

const CONTENT = buildLabExperiment({
  slug: "mri-explorer",
  summary: "An interactive viewer that pairs an MRI with its radiology report, rings each finding on the scan in plain English, and sends you into the appointment prepared.",
  builtWith: "Claude · Claude plugin",
  platform: "Web viewer, 2D + 3D",
  challenge: {
    lead: "Your MRI is built for doctors, not for you.",
    paragraphs: [
      "MRI software is made for medical professionals. It usually needs to be installed, assumes clinical training, and isn't easy to use. It was never designed for everyday people.",
      "The radiologist's findings have the same problem: they're written for your doctor, not for you. So you're left with a DVD of images you can't easily view and a report you can't really understand.",
    ],
  },
  solution: {
    lead: "One simple view of your scan, your findings, and what to ask.",
    paragraphs: [
      "Explore your scan as 2D slices and a 3D model built from them, in one simple interface with nothing to install. You can even fly through it.",
      "Understand the findings in plain language, with each one pinned on the 2D and 3D views so you see what it is and where.",
      "Prepare for your visit with background, findings, symptoms, and suggested questions in one view, plus a PDF to bring along. Doctors spend less time on data, more on care.",
      "Claude processes the scan, translates the report, and builds the viewer. It explains, never diagnoses.",
    ],
  },
  demoIntro: "A walkthrough of the full viewer on my own shoulder MRI: findings across every series, scrolling the slices, the 3D model, symptoms and questions, and the PDF to take to the doctor.",
});

/**
 * @ployComponent
 * @ployComponentId lab-mri-explorer-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription MRI Explorer Lab experiment page: 2x2 screenshot-grid hero, challenge and solution (with how AI was used), a recorded walkthrough, and a prominent call to action that opens the live app in a new tab.
 * @ployComponentTags lab experiment mri medical-imaging ai editorial
 * @ployComponentStatus stable
 */
export default function MriExplorerPage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
