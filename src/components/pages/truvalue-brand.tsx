import { VISIBLE_PROJECTS } from "@/lib/projects";
import ProjectCaseStudyTemplate, { type ProjectCaseStudyContent } from "./project-case-study";

// MSDO fork: images live in public/images rather than Ploy storage.
// placeholder-*.webp panels mark sections still waiting on real imagery.
const ASSET = "/images/truvalue-brand";
const RELATED_PROJECT_NAMES = new Set(["Truvalue Platform", "Truvalue Wealth", "Econiscore", "Rainfall Mobile"]);

const placeholder = (name: string, label: string) => ({ src: `${ASSET}/placeholder-${name}.webp`, alt: `${label}, imagery to come`, width: 2880, height: 1240 });

const CONTENT: ProjectCaseStudyContent = {
  eyebrow: "Case study · Brand & go-to-market",
  title: "Truvalue Labs",
  summary: "Building the brand and the full go-to-market system for an AI company selling to institutional investors, from identity and website to sales tools, research, thought leadership, and events.",
  heroImage: `${ASSET}/hero.webp`,
  naturalHero: true,
  heroWidth: 1200,
  heroHeight: 924,
  meta: [
    { label: "Role", value: "Brand Strategy, Identity, Marketing & Sales Enablement, Creative Direction" },
    { label: "Date", value: "2014–2020" },
    { label: "Sector", value: "AI · Finance · ESG" },
    { label: "Market", value: "B2B · Institutional Investors" },
  ],
  chapters: [
    {
      label: "Challenge + Approach",
      blocks: [
        {
          heading: "Challenge",
          lead: "Sell a model into a market that trusts experts.",
          paragraphs: [
            "Truvalue Labs used AI to score company behavior from massive volumes of unstructured data, in a domain that had always been an analyst’s qualitative judgment. Asset managers and asset owners needed a reason to trust it.",
            "The brand had to match a sophisticated product, hold up inside partner terminals like Bloomberg, Thomson Reuters, and FactSet, and earn the company a voice in a crowded market of data vendors and AI claims.",
          ],
        },
        {
          heading: "Approach",
          lead: "One brand system behind every touchpoint.",
          paragraphs: [
            "We built the Truvalue Labs brand from the ground up around one promise, Amplified Investment Intelligence, and set clear standards for how it looked, sounded, and behaved.",
            "Every marketing and sales asset became a component of the same system: the website, the sales deck system, research and benchmark papers, thought leadership, events, and a knowledge dashboard. Tools and templates let the whole company produce on-brand work and feed it back into the system.",
          ],
        },
      ],
      highlightsLabel: "The work included:",
      highlights: [
        "Brand strategy, identity, and standards",
        "Website and product marketing",
        "Sales deck system and tools",
        "Thought leadership blog and social media",
        "Research and benchmark papers",
        "Event collateral",
        "Knowledge dashboard",
      ],
    },
    {
      label: "The System",
      lead: "From identity to every channel the market touched.",
      paragraphs: [
        "The same palette, type, iconography, and voice ran through every channel, so each touchpoint reinforced the last, from a first visit to the website to a conversation at an event or a deck in a sales meeting.",
      ],
      media: {
        groups: [
          {
            heading: "Brand System",
            description: "A purple-led palette, Barlow with a sparing layer of Roboto Mono, custom solution icons, a technical illustration style, and document frames, written down as standards the whole company could use.",
            items: [{ src: `${ASSET}/brand-system.webp`, alt: "Truvalue Labs brand system: logo, color, typography, iconography, and design elements", width: 2880, height: 3256 }],
          },
          {
            heading: "Website",
            description: "The website led with the promise and organized the story around the buyers it served: asset managers, quantitative managers, and risk and compliance teams. A point of view on the convergence of ESG, AI, and big data explained why the timing mattered.",
            items: [
              { src: `${ASSET}/brand-messaging.webp`, alt: "Truvalue Labs homepage and Why Us page", width: 2880, height: 3840 },
              { src: `${ASSET}/product-marketing.webp`, alt: "Truvalue Platform product page and Solutions page", width: 2880, height: 3840 },
            ],
          },
          {
            heading: "Sales Enablement",
            description: "A modular sales deck system, with templates and tools, so the sales team could assemble on-brand presentations for each buyer, product, and use case.",
            items: [placeholder("sales-enablement", "Sales deck system")],
          },
          {
            heading: "Thought Leadership",
            description: "A steady cadence of blog posts, social media, daily ESG reports, and research briefs gave Truvalue a voice on the issues its buyers cared about, and a reason to keep coming back.",
            items: [
              { src: `${ASSET}/thought-leadership.webp`, alt: "Truvalue Labs Insights and About pages", width: 2880, height: 3840 },
              placeholder("social", "Blog and social"),
            ],
          },
          {
            heading: "Research and Benchmarks",
            description: "Backtests and research papers, including studies with Truvalue’s global academic research network, turned performance claims into evidence buyers could check.",
            items: [placeholder("research", "Research and benchmark papers")],
          },
          {
            heading: "Events",
            description: "Collateral for Truvalue’s own ESG Investing Forum in New York and London, academic roundtables, and industry receptions put the brand in the room with the people it needed to reach.",
            items: [placeholder("events", "Event collateral")],
          },
          {
            heading: "Knowledge Dashboard",
            description: "Details to come.",
            items: [placeholder("knowledge-dashboard", "Knowledge dashboard")],
          },
          {
            heading: "Proof and Credibility",
            description: "Institutional clients, distribution partners, and industry awards gave an emerging vendor the credibility to compete for the largest asset managers and asset owners.",
            items: [{ src: `${ASSET}/proof.webp`, alt: "Institutions using Truvalue Labs and industry awards", width: 2880, height: 1534 }],
          },
        ],
      },
    },
    {
      label: "Outcome",
      lead: "From a new data source to a trusted name, and an exit.",
      paragraphs: [
        "Truvalue Labs became one of very few alternative data providers live on the major terminals, earned twelve industry awards including Best Alternative Data Provider and Best ESG Data Disrupter, and grew revenue more than 250%.",
        "In 2020, Truvalue Labs was acquired by FactSet.",
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
