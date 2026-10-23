import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabExperiment } from "./lab-case-study";

const CONTENT = buildLabExperiment({
  slug: "mri-explorer",
  summary: "An interactive viewer that pairs an MRI with its radiology report, rings each finding on the scan in plain English, and sends you into the appointment prepared.",
  builtWith: "Claude · Claude plugin",
  platform: "Web viewer, 2D + 3D",
  challenge: {
    lead: "Radiology reports are written for doctors, not patients.",
    paragraphs: [
      "After an MRI you get a disc of images you can't open and a report full of terms you can't place on your own body. Most people walk into the follow-up without knowing what to ask.",
    ],
  },
  solution: {
    lead: "See what the radiologist saw, explained by AI.",
    paragraphs: [
      "MRI Explorer opens every series side by side, rings each finding on the slice the radiologist cited, and explains it in plain English. A 3D view stacks the slices into a volume with an explodable bone and muscle model. Symptoms can be pinned to the body, questions collected, and everything exported as a PDF for the doctor.",
      "Claude does the heavy lifting: it processes the DICOM files, reads the report, places each finding on the right image, writes the explanations, and builds the viewer itself. One rule holds throughout: explain what the radiologist wrote, never diagnose.",
      "It ships as a Claude plugin, so anyone can point it at their own scan and report. The demo runs on my own shoulder MRI.",
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
