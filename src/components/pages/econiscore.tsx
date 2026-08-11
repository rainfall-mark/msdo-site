import { VISIBLE_PROJECTS } from "@/lib/projects";
import ProjectCaseStudyTemplate, { type ProjectCaseStudyContent } from "./project-case-study";

const ECONISCORE_ASSET = "https://payload.cargocollective.com/1/0/18737/12273661";
const ECONISCORE_CORE_IMAGE = "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user/3eb7e3ce-econify-performance-core.webp";
const RELATED_PROJECT_NAMES = new Set(["Rainfall Mobile", "Coinboost", "Truvalue Platform", "Truvalue Wealth"]);

const CONTENT: ProjectCaseStudyContent = {
  eyebrow: "Case study · Web performance intelligence",
  title: "Econiscore",
  summary: "Designing a transparent benchmarking platform that turned complex website-performance data into clear, comparable decisions for media organizations.",
  heroImage: "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user/554cd1ae-econify-performance-hero.webp",
  meta: [
    { label: "Role", value: "Product Strategy, UX Strategy, Product Design, Data Visualization, Design Systems" },
    { label: "Date", value: "2022" },
    { label: "Sector", value: "Media · Web Performance" },
    { label: "Platform", value: "Web Application" },
  ],
  chapters: [
    {
      label: "Challenge + Approach",
      blocks: [
        {
          heading: "Challenge",
          lead: "Performance data without shared context.",
          paragraphs: [
            "Website performance directly affects user experience, search visibility, and revenue—yet organizations often lack a clear understanding of what drives performance changes.",
            "Product, business, and engineering teams relied on different metrics and competing narratives, making it hard to align on decisions and priorities.",
          ],
        },
        {
          heading: "Approach",
          lead: "Turn complex performance data into a shared source of truth.",
          paragraphs: [
            "Econiscore benchmarked media organizations against industry peers and exposed the impact of site architecture, third-party vendors, and business decisions.",
          ],
        },
      ],
      highlightsLabel: "The work included:",
      highlights: [
        "Product and UX strategy",
        "Product design and data visualization",
        "Scalable interface and design systems",
      ],
      media: {
        groups: [
          {
            heading: "Core Product Experience",
            description: "The consolidated product system brings the dashboard, company summary, performance chart, vendor analysis, network requests, and vendor summary into one continuous view.",
            items: [{ src: ECONISCORE_CORE_IMAGE, alt: "Consolidated Econiscore dashboard, company analysis, network request, and vendor summary screens" }],
          },
          {
            heading: "Design Exploration",
            description: "Early company and vendor dashboard directions explored hierarchy, comparison, and how performance signals could become immediately legible.",
            items: [{ src: `${ECONISCORE_ASSET}/02_1200.png`, alt: "Econiscore company and vendor dashboard design directions" }],
          },
          {
            heading: "Vendor Visualization Exploration",
            description: "Alternative chart forms tested how third-party vendor impact could be compared without losing technical context.",
            items: [{ src: `${ECONISCORE_ASSET}/03_1200.png`, alt: "Econiscore vendor visualization explorations" }],
          },
          {
            heading: "Design Spec",
            description: "The final specification documented interface patterns and supporting visual-system decisions.",
            items: [{ src: `${ECONISCORE_ASSET}/10_1200.png`, alt: "Econiscore design specification and supporting brand explorations" }],
          },
        ],
      },
    },
    {
      label: "Outcome",
      lead: "Performance intelligence teams could act on.",
      paragraphs: [
        "The platform helped organizations move beyond isolated metrics and treat website performance as a strategic business advantage.",
      ],
    },
  ],
  relatedProjects: VISIBLE_PROJECTS.filter((project) => RELATED_PROJECT_NAMES.has(project.name)),
};

/**
 * @ployComponent
 * @ployComponentId econiscore-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Econiscore instance of the reusable light editorial project template, using the original web-performance platform strategy, scope, and four high-resolution design artifacts.
 * @ployComponentTags case-study econiscore portfolio web-app data-visualization editorial
 * @ployComponentStatus stable
 */
export default function EconiscorePage() { return <ProjectCaseStudyTemplate content={CONTENT} />; }
