/**
 * MSDO Lab: AI-driven builds shown as a row of cards on the homepage (between
 * Work and About), each linking to its own case-study page under /lab/.
 *
 * To add a project:
 * 1. Add an entry here (image is the 16:10 card thumbnail).
 * 2. Put its assets in public/images/lab/<slug>/ (thumb, hero, screens, demo.mp4).
 * 3. Keep the working demo in lab-drafts/demos/<slug>/ (not deployed). The
 *    page shows the recorded walkthrough and an "I'm interested" form instead.
 * 4. Copy one of src/components/pages/lab/*.tsx and add a route in src/pages/lab/.
 *
 * Unpublished drafts keep their page components here but have no route, and
 * their demos and images wait in lab-drafts/ at the repo root (outside public/,
 * so they are not deployed). To publish one: move its folders into public/,
 * add its route, and set published: true.
 */
export interface LabProject {
  name: string;
  slug: string;
  href: string;
  tags: string[];
  /** One-line summary. Not shown on the homepage card for now; kept for later use. */
  description: string;
  image: string;
  /** Legacy: only the long-form buildLabCaseStudy layout links here; Lab demos are no longer deployed. */
  demoHref: string;
  /** Only published projects appear on the homepage and in "More from the Lab". */
  published: boolean;
}

export const LAB_HREF = "/#lab";

const lab = (slug: string) => ({
  slug,
  href: `/lab/${slug}`,
  image: `/images/lab/${slug}/thumb.webp`,
  demoHref: `/demos/${slug}/`,
});

/** Every Lab project, drafts included. */
export const ALL_LAB_PROJECTS: LabProject[] = [
  { name: "Healthwise", tags: ["AI Advisor", "Function Health"], description: "Your lab results charted over time, with AI advisors to explain them.", published: true, ...lab("healthwise") },
  { name: "Supplement Stack", tags: ["AI Agent", "Dashboard"], description: "Your whole supplement routine, checked and kept current by AI.", published: true, ...lab("supplement-stack") },
  { name: "Killswitch", tags: ["AI Agent", "Subscriptions"], description: "Finds every subscription and cancels the ones you don't need.", published: true, ...lab("killswitch") },
  { name: "MRI Explorer", tags: ["Medical Imaging", "3D"], description: "Your MRI and its report, explained in plain English.", published: true, ...lab("mri-explorer") },
  { name: "ClaimBot", tags: ["AI Agent", "Health Insurance"], description: "Files your health insurance claims and tracks every reply.", published: true, ...lab("claimbot") },
];

/** Projects shown on the site. */
export const LAB_PROJECTS = ALL_LAB_PROJECTS.filter((project) => project.published);

/** Asset folder for a Lab project's case-study media. */
export const labAsset = (slug: string, file: string) => `/images/lab/${slug}/${file}`;

/** The other Lab projects, for the "More from the Lab" row on each case study. */
export const otherLabProjects = (slug: string) => LAB_PROJECTS.filter((project) => project.slug !== slug);
