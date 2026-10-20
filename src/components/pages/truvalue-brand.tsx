import { VISIBLE_PROJECTS } from "@/lib/projects";
import ProjectCaseStudyTemplate, { type ProjectCaseStudyContent } from "./project-case-study";

// MSDO fork: images live in public/images rather than Ploy storage.
const ASSET = "/images/truvalue-brand";
const RELATED_PROJECT_NAMES = new Set(["Truvalue Platform", "Truvalue Wealth", "Econiscore", "Rainfall Mobile"]);

const CONTENT: ProjectCaseStudyContent = {
  eyebrow: "Case study · Brand & go-to-market",
  title: "Truvalue Labs",
  summary: "Positioning an AI and alternative-data company for institutional investors, through brand, messaging, product marketing, and a website built to sell.",
  heroImage: `${ASSET}/hero.webp`,
  naturalHero: true,
  heroWidth: 1200,
  heroHeight: 924,
  meta: [
    { label: "Role", value: "Brand Strategy, Positioning, Product Marketing, Creative Direction, Development Oversight" },
    { label: "Date", value: "2020" },
    { label: "Sector", value: "AI · Finance · ESG" },
    { label: "Market", value: "B2B · Institutional Investors" },
  ],
  chapters: [
    {
      label: "Challenge + Approach",
      blocks: [
        {
          heading: "Challenge",
          lead: "A real edge, hard to explain to a skeptical market.",
          paragraphs: [
            "Alternative data and AI were upending asset management. Investment professionals who could quickly synthesize unstructured data stood to find new sources of alpha, separate signal from noise, and outperform.",
            "Truvalue Labs had the technology to deliver that edge, but institutional buyers were flooded with data vendors and AI claims. The brand needed to make a sophisticated offer simple, credible, and relevant to how each type of investor actually works.",
          ],
        },
        {
          heading: "Approach",
          lead: "Lead with solutions, proof, and a point of view.",
          paragraphs: [
            "We positioned Truvalue Labs around one promise, Amplified Investment Intelligence, and organized the go-to-market story around the buyers it served: asset managers, quantitative managers, and risk and compliance teams.",
            "Thought leadership and ESG expertise moved to the foreground. Paired with Truvalue’s sponsorship of industry-leading ESG events and its global academic research network, they gave the company a voice in the market well beyond its size.",
          ],
        },
      ],
      highlightsLabel: "The work included:",
      highlights: [
        "Brand strategy, positioning, and messaging",
        "Product marketing for the Truvalue Platform family",
        "Website strategy, creative direction, and development oversight",
        "Thought leadership, events, and industry recognition",
      ],
      media: {
        groups: [
          {
            heading: "Brand and Messaging",
            description: "A single promise, Amplified Investment Intelligence, anchored the brand. A clear point of view on the convergence of ESG, AI, and big data explained why the timing mattered.",
            items: [{ src: `${ASSET}/brand-messaging.webp`, alt: "Truvalue Labs homepage and Why Us page", width: 2880, height: 3840 }],
          },
          {
            heading: "Product Marketing",
            description: "The Truvalue Platform and the Truvalue AI engine became a clear product story, with editions tailored to each investment strategy and solutions mapped to specific buyer workflows.",
            items: [{ src: `${ASSET}/product-marketing.webp`, alt: "Truvalue Platform product page and Solutions page", width: 2880, height: 3840 }],
          },
          {
            heading: "Proof and Credibility",
            description: "Institutional logos and industry awards gave an emerging vendor the credibility to compete for the largest asset managers and asset owners.",
            items: [{ src: `${ASSET}/proof.webp`, alt: "Institutions using Truvalue Labs and industry awards", width: 2880, height: 1534 }],
          },
          {
            heading: "Thought Leadership",
            description: "Research, backtests, press, and conference coverage became a primary path into the brand, backed by the company story, leadership, investors, and academic network.",
            items: [{ src: `${ASSET}/thought-leadership.webp`, alt: "Truvalue Labs Insights and About pages", width: 2880, height: 3840 }],
          },
        ],
      },
    },
    {
      label: "Outcome",
      lead: "Industry-wide recognition, and a successful exit.",
      paragraphs: [
        "Brand, product marketing, and thought leadership worked as one system, helping Truvalue Labs earn industry-wide recognition among institutional investors, including awards for its AI and machine learning data and its specialist product.",
        "The platform reached investors directly and through integrations with the Bloomberg, FactSet, and Refinitiv terminals. In 2020, Truvalue Labs was acquired by FactSet.",
      ],
    },
  ],
  relatedProjects: VISIBLE_PROJECTS.filter((project) => RELATED_PROJECT_NAMES.has(project.name)),
};

/**
 * @ployComponent
 * @ployComponentId truvalue-brand-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Truvalue Labs brand and go-to-market case study using the shared editorial project template.
 * @ployComponentTags case-study truvalue brand go-to-market ai finance
 * @ployComponentStatus draft
 */
export default function TruvalueBrandPage() { return <ProjectCaseStudyTemplate content={CONTENT} />; }
