/**
 * MSDO Lab: AI-driven builds shown as a row of cards on the homepage (between
 * Work and About), each linking to its own case-study page under /lab/.
 *
 * To add a project:
 * 1. Add an entry here (image is the 16:10 card thumbnail).
 * 2. Put its assets in public/images/lab/<slug>/ (thumb, hero, screens, demo.mp4).
 * 3. Put the working demo in public/demos/<slug>/index.html, or link out to a
 *    shared Claude artifact.
 * 4. Copy one of src/components/pages/lab/*.tsx and add a route in src/pages/lab/.
 */
export interface LabProject {
  name: string;
  slug: string;
  href: string;
  tags: string[];
  image: string;
  /** Where "Try the live demo" goes: a page hosted with the site or a public artifact link. */
  demoHref: string;
}

export const LAB_HREF = "/#lab";

const lab = (slug: string) => ({
  slug,
  href: `/lab/${slug}`,
  image: `/images/lab/${slug}/thumb.webp`,
  demoHref: `/demos/${slug}/`,
});

export const LAB_PROJECTS: LabProject[] = [
  { name: "Healthwise", tags: ["AI Advisor", "Precision Health"], ...lab("healthwise") },
  { name: "Supplement Stack", tags: ["AI Agent", "Dashboard"], ...lab("supplement-stack") },
  { name: "MRI Explorer", tags: ["Medical Imaging", "3D"], ...lab("mri-explorer") },
];

/** Asset folder for a Lab project's case-study media. */
export const labAsset = (slug: string, file: string) => `/images/lab/${slug}/${file}`;

/** The other Lab projects, for the "More from the Lab" row on each case study. */
export const otherLabProjects = (slug: string) => LAB_PROJECTS.filter((project) => project.slug !== slug);
