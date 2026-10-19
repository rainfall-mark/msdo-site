import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabCaseStudy } from "./lab-case-study";

const CONTENT = buildLabCaseStudy({
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
    lead: "See what the radiologist saw.",
    paragraphs: [
      "MRI Explorer opens every series side by side, rings each finding on the slice the radiologist cited, and explains it in plain English. A 3D view combines the series with a cut plane and an explodable bone and muscle model.",
      "Symptoms can be pinned to the body, questions collected, and everything exported as a PDF to bring to the doctor. Tuned for shoulder, knee, hip, and spine. The demo pairs a real, anonymized shoulder scan with sample findings.",
    ],
  },
  ai: {
    lead: "Claude reads the scan and the report together.",
    paragraphs: [
      "Claude processes the DICOM files, reads the report, places each finding on the right image, writes the explanations, and builds the viewer. One rule holds throughout: explain what the radiologist wrote, never diagnose.",
      "It ships as a Claude plugin, so anyone can point it at their own scan folder and report. Patient identifiers are stripped from the image data on the way in.",
    ],
  },
  demoCaption: "A guided tour of an anonymized shoulder scan with sample findings: picking findings across the series grid, scrolling slices and adjusting brightness, the 3D volume and model, a symptom pin, and the PDF summary.",
  screens: [
    { heading: "Findings on the Scan", caption: "One slice up close, with fluid highlighted and a ring on the finding, so you can see exactly what the report describes." },
    { heading: "3D View", caption: "The slices stack into a volume, with each finding pinned where it sits in the shoulder." },
    { heading: "Where It Hurts", caption: "An explodable anatomy model with color-coded muscles, and symptom pins that carry into the PDF summary for the doctor." },
  ],
});

/**
 * @ployComponent
 * @ployComponentId lab-mri-explorer-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription MRI Explorer Lab case study on the shared project template: hero capture, challenge and solution, how AI helped, a recorded demo with a link to the live sample-case version, and feature screens.
 * @ployComponentTags lab case-study mri medical-imaging ai editorial
 * @ployComponentStatus stable
 */
export default function MriExplorerPage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
