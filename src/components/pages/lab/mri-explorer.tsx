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
      "Explore your scan. One easy, all-in-one interface with nothing to install shows your MRI as 2D slices and as a 3D model built from those same slices, so you can explore, even fly through, your own data.",
      "Understand the findings. The radiologist's report is translated into simple language, and each issue is pinned in context on the 2D slices and the 3D model, so you can see what it is and where it is.",
      "Prepare for your visit. Background, findings, and any ongoing symptoms come together in one view, with suggested questions for your doctor and a downloadable PDF to take into your next appointment.",
      "You walk in prepared, with everything in one place, clear visuals, and targeted questions to guide the conversation. Doctors benefit too: less time handling MRI data, more time on patient care.",
      "Claude does the heavy lifting: it processes the scan files, reads the report, writes the plain-language explanations, places each finding on the images, and builds the viewer. It explains what the radiologist wrote and never diagnoses. The demo runs on my own shoulder MRI.",
    ],
  },
  demoIntro: "The full viewer, running on my own shoulder MRI. Pick a finding to see it ringed across every series, scroll through slices, or switch to the 3D view.",
});

/**
 * @ployComponent
 * @ployComponentId lab-mri-explorer-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription MRI Explorer Lab experiment page: 2x2 screenshot-grid hero, challenge and solution (with how AI was used), and the working demo embedded with an open-in-new-tab option.
 * @ployComponentTags lab experiment mri medical-imaging ai editorial
 * @ployComponentStatus stable
 */
export default function MriExplorerPage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
