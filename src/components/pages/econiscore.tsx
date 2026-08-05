import { PROJECTS } from "@/lib/projects";
import ProjectCaseStudyTemplate, { type ProjectCaseStudyContent } from "./project-case-study";

const ECONISCORE_ASSET = "https://payload.cargocollective.com/1/0/18737/12273661";
const RELATED_PROJECT_NAMES = new Set(["Rainfall Website", "Coinboost", "Truvalue Platform"]);

const CONTENT: ProjectCaseStudyContent = {
  eyebrow: "Case study · Web performance intelligence",
  title: "Econiscore",
  summary: "Designing a transparent benchmarking platform that turned complex website-performance data into clear, comparable decisions for media organizations.",
  heroImage: `${ECONISCORE_ASSET}/01_header_1200.png`,
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
            heading: "Dashboard",
            description: "A consolidated dashboard brought rankings, movement, vendor performance, and improvement opportunities into one view.",
            items: [{ src: `${ECONISCORE_ASSET}/04_1000.png`, alt: "Econiscore dashboard overview" }],
          },
          {
            heading: "Company — Summary",
            description: "The company summary paired performance grades with trends, metrics, and peer context.",
            items: [{ src: `${ECONISCORE_ASSET}/05_1000.png`, alt: "Econiscore company summary dashboard" }],
          },
          {
            heading: "Company — Chart",
            description: "Focused chart views made changes over time and comparison points easier to investigate.",
            items: [{ src: `${ECONISCORE_ASSET}/06_1000.png`, alt: "Econiscore company chart view" }],
          },
          {
            heading: "Company — Vendor",
            description: "Vendor analysis connected third-party services to measurable performance impact.",
            items: [{ src: `${ECONISCORE_ASSET}/07_1000.png`, alt: "Econiscore company vendor analysis" }],
          },
          {
            heading: "Company — Network Request",
            description: "Network-request views exposed the technical contributors behind a site’s overall score.",
            items: [{ src: `${ECONISCORE_ASSET}/08_1000.png`, alt: "Econiscore company network request analysis" }],
          },
          {
            heading: "Vendor — Summary",
            description: "Vendor summaries provided consistent cross-company visibility into third-party performance.",
            items: [{ src: `${ECONISCORE_ASSET}/09_1000.png`, alt: "Econiscore vendor summary and reporting screens" }],
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
  relatedProjects: PROJECTS.filter((project) => RELATED_PROJECT_NAMES.has(project.name)),
};

/**
 * @ployComponent
 * @ployComponentId econiscore-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Econiscore instance of the reusable light editorial project template, using the original web-performance platform strategy, scope, and nine high-resolution design artifacts.
 * @ployComponentTags case-study econiscore portfolio web-app data-visualization editorial
 * @ployComponentStatus stable
 */
export default function EconiscorePage() { return <ProjectCaseStudyTemplate content={CONTENT} />; }
