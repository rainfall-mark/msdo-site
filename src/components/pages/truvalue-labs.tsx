import ProjectCaseStudyTemplate, { type ProjectCaseStudyContent } from "./project-case-study";

// DRAFT: first-pass layout for the Truvalue Labs brand + GTM case study.
// Images are working composites in public/images/truvalue-labs/ and are
// expected to be consolidated before publishing.
const IMG = "/images/truvalue-labs";

const CONTENT: ProjectCaseStudyContent = {
  eyebrow: "Case study · Brand and go-to-market",
  title: "Truvalue Labs",
  summary: "One story and one brand system, carried across every sales and marketing touchpoint for an AI-powered ESG startup, from Series A to acquisition.",
  heroImage: `${IMG}/tvl-hero-collateral.webp`,
  naturalHero: true,
  heroWidth: 2304,
  heroHeight: 1536,
  meta: [
    { label: "Role", value: "Brand Strategy, Messaging, Creative Direction, Sales Enablement" },
    { label: "Date", value: "2018 – 2020" },
    { label: "Sector", value: "AI · Finance · ESG" },
    { label: "Scope", value: "Brand System · GTM Materials · Website" },
  ],
  chapters: [
    {
      label: "",
      blocks: [
        {
          heading: "Challenge",
          lead: "A new category, sold to the most skeptical buyers in finance.",
          paragraphs: [
            "Truvalue Labs was the first company to apply AI to ESG data, scoring 15,000+ companies on what they do rather than what they report. Its buyers were quants, portfolio managers and pension funds used to annual, self-reported ratings from established providers.",
            "After a $14M Series A in early 2018, the company was launching three new products in one year. Every launch, deck and page needed the same story, and one the market could repeat.",
          ],
        },
        {
          heading: "Solution",
          lead: "Build the story once, then a system that carries it everywhere.",
          paragraphs: [
            "We worked in three layers. Story first: a messaging platform (tagline, story, value proposition and messaging for each buyer) and a 2018 launch calendar sequenced by audience, from early-adopter quants to fundamental PMs and asset owners.",
            "Then programs that ran on that story: launches, research, events and social. Underneath sat an engine of guidelines, templates and a shared hub, so each new piece started from parts that already existed.",
          ],
        },
      ],
      highlightsLabel: "The work included:",
      highlights: [
        "Positioning, messaging platform and product naming",
        "Brand system and guidelines site",
        "Sales deck system, collateral and case studies",
        "Thought leadership, events and social programs",
        "Website and internal knowledge hub",
      ],
      footnote: {
        label: "Outcome",
        placement: "end",
        lead: "From category newcomer to acquired market leader.",
        description: "Truvalue Labs won WatersTechnology's Best AI/Machine Learning Data Initiative two years running and was acquired by FactSet in 2020. Along the way it tripled its events to six a year, built distribution through FactSet, Bloomberg and Refinitiv, and grew a research network spanning Harvard, Oxford, Wharton and Columbia.",
      },
      media: {
        groups: [
          {
            heading: "The story",
            description: "One line, Amplified Investment Intelligence, and one idea buyers could repeat: it's not what companies say, it's what they do. The master deck followed the same arc: the market shift, the problem, a new approach, then proof.",
            items: [{ src: `${IMG}/tvl-story-deck.webp`, alt: "Sales deck slides: cover, three megatrends, say versus do, and the AI engine" }],
          },
          {
            heading: "Website",
            description: "A solutions-led site that put research up front and gave each buyer a clear path from story to product to proof.",
            items: [{ src: `${IMG}/tvl-website-pages.webp`, alt: "Truvalue Labs website pages: Home, Platform, Solutions, Why Us, Insights and About" }],
          },
          {
            heading: "Brand system",
            description: "A purple-led identity built for a data company: a geometric mark, Barlow throughout with Roboto Mono for technical labels, a light line icon set, layered 3D process diagrams, duotone photography and an abstract collage kit. It all lives on a guidelines site with downloadable logos, templates and guides.",
            items: [
              { src: `${IMG}/tvl-brand-board.webp`, alt: "Truvalue Labs brand board: logo, mark, color palette, typography, iconography, diagrams, collage and photography" },
              { video: { src: `${IMG}/tvl-brand-site.mp4`, poster: `${IMG}/tvl-brand-site-poster.webp`, title: "Walkthrough of the Truvalue Labs brand site: introduction, logo, colors, typography, iconography and illustration", width: 1920, height: 1080 }, cta: { href: "https://brand.truvaluelabs.com", label: "Visit the brand site" } },
            ],
          },
          {
            heading: "Sales deck system",
            description: "A 36-slide master deck built in modules: story, market problem, approach, the AI engine (100,000+ sources, 1M+ data points and 300,000 signals a month), products, backtests and case studies. Reps assembled decks for each buyer instead of starting over.",
            items: [{ src: `${IMG}/tvl-sales-deck-system.webp`, alt: "Grid of slides from the Truvalue Labs master sales deck" }],
          },
          {
            heading: "Collateral and proof",
            description: "A corporate brochure, product tearsheets and a repeatable case study format. Calvert ($15B AUM) and Brunel Pension Partnership (£30B) told the story in their own words.",
            items: [{ src: `${IMG}/tvl-collateral.webp`, alt: "Corporate brochure, tearsheets and Calvert and Brunel case studies" }],
          },
          {
            heading: "Thought leadership",
            description: "Weekly research briefs tied to the news, like J&J's talc liability and Intuit and H&R Block's lobbying, showed the data working in public. Whitepapers and daily ESG email alerts kept the conversation going between sales calls.",
            items: [{ src: `${IMG}/tvl-thought-leadership.webp`, alt: "Research brief and whitepaper covers" }],
          },
          {
            heading: "Social channel on X",
            description: "@TruvalueLabs carried the story between launches: research findings, a webinar series co-hosted with SASB, a public Coronavirus ESG Monitor built on the AI engine, award news and, finally, the FactSet acquisition. Posts routed to tracked landing pages.",
            items: [{ src: `${IMG}/tvl-social-x.webp`, alt: "Truvalue Labs profile on X with posts on the FactSet acquisition, the WatersTechnology award, the SASB webinar series and the Coronavirus ESG Monitor" }],
          },
          {
            heading: "Year in review",
            description: "A 28-page annual review that told the company story to clients, partners and investors: three product launches, the Spotlight algorithm, 12 years of data in 7 languages and a world-class academic network.",
            items: [{ video: { src: `${IMG}/tvl-year-in-review.mp4`, poster: `${IMG}/tvl-year-in-review-poster.webp`, title: "Page-through of the Truvalue Labs 2018 year in review, from cover to back cover", width: 1920, height: 1240 } }],
          },
          {
            heading: "Internal knowledge hub",
            description: "Basecamp put the whole sales kit in one place: collateral, eight buyer-specific use cases, methodology and integration docs, contract templates and brand files. New reps could get up to speed without hunting for files.",
            items: [
              { src: `${IMG}/tvl-basecamp-hub.webp`, alt: "Basecamp sales enablement hub showing use case one-pagers" },
            ],
          },
        ],
      },
    },
  ],
  // Standalone page: no "More projects" row (the section hides itself when empty).
  relatedProjects: [],
};

/**
 * @ployComponent
 * @ployComponentId truvalue-labs-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription DRAFT Truvalue Labs brand and go-to-market case study on the shared editorial project template.
 * @ployComponentTags case-study truvalue brand gtm ai finance
 * @ployComponentStatus draft
 */
export default function TruvalueLabsPage() { return <ProjectCaseStudyTemplate content={CONTENT} />; }
