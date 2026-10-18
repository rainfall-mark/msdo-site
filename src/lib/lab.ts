/**
 * MSDO Lab: recent AI-driven builds shown on the homepage between Work and About.
 *
 * To add or edit a project, change this array only. Each entry needs:
 * - image: a screenshot in public/images/lab/<slug>/ (16:10 crops best). Leave it
 *   undefined and the card shows a neutral placeholder until the screenshot lands.
 * - demo: where "Try the demo" goes. Either a page hosted with the site
 *   (public/lab/<slug>/index.html, served at /lab/<slug>/) or a public link
 *   such as a shared Claude artifact. Leave it undefined to hide the button.
 */
export interface LabDemo {
  href: string;
  label?: string;
}

export interface LabProject {
  slug: string;
  name: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  challenge: string;
  solution: string;
  aiRole: string;
  demo?: LabDemo;
}

export const LAB_PROJECTS: LabProject[] = [
  {
    slug: "healthwiser",
    name: "Healthwiser",
    tags: ["Claude Plugin", "Precision Health", "Dashboard"],
    image: undefined,
    imageAlt: "Healthwiser dashboard with biomarker trends and advisor notes",
    challenge:
      "Lab results arrive as PDFs from different vendors, in different units, months apart. Seeing the trend, and knowing what to ask your doctor, is left to you.",
    solution:
      "A personal health advisor that reads your lab PDFs, normalizes every biomarker into one profile, tracks changes across panels, and keeps a living dashboard with labs, advisor notes, and new research.",
    aiRole:
      "Claude extracts and normalizes the biomarkers, then reviews them through a panel of nine expert lenses. Packaged as a Claude plugin, so setup, new labs, and the monthly research report are each one request, and the data stays on your machine.",
    demo: undefined,
  },
  {
    slug: "mri-explorer-shoulder",
    name: "MRI Explorer (Shoulder)",
    tags: ["Claude Plugin", "Medical Imaging", "3D"],
    image: undefined,
    imageAlt: "MRI Explorer showing a shoulder scan with report findings ringed on the image",
    challenge:
      "A radiology report is written for other doctors. Patients get a disc of images they can't open and a page of terms they can't place on their own body, then walk into the appointment unprepared.",
    solution:
      "An interactive viewer that pairs the scan with the report: every series side by side, each finding ringed on the slice the radiologist cited and explained in plain English, a 3D model you can cut through, symptom pins, and a PDF summary for the doctor.",
    aiRole:
      "Claude processes the DICOM files, reads the report, places each finding on the right image, writes the explanations, and builds the viewer. One rule holds throughout: explain what the radiologist wrote, never diagnose.",
    demo: undefined,
  },
  {
    slug: "supplements",
    name: "Supplements",
    tags: ["Health", "Dashboard", "Ongoing Agent"],
    image: undefined,
    imageAlt: "Supplement dashboard showing the daily protocol, safety flags, and stack history",
    challenge:
      "A supplement stack grows one recommendation at a time. Years later, nutrients overlap, some exceed safe limits, and nothing connects back to your labs or goals.",
    solution:
      "One dashboard for the whole stack: today's protocol by time of day, nutrient totals against upper limits, safety flags, keep / adjust / trim recommendations, and a summary ready for a nutritionist to review.",
    aiRole:
      "Claude keeps the ledger from label photos, totals every ingredient across products, flags overlaps, ties recommendations to lab results, and refreshes the dashboard on a weekly sync.",
    demo: undefined,
  },
];
