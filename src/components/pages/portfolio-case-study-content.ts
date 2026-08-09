import { VISIBLE_PROJECTS } from "@/lib/projects";
import type { ProjectCaseStudyContent } from "./project-case-study";

const relatedProjects = (names: string[]) => {
  const selected = new Set(names);
  return VISIBLE_PROJECTS.filter((project) => selected.has(project.name));
};

export const PORTFOLIO_CASE_STUDIES = {
  coinboost: {
    eyebrow: "Case study · Crypto portfolio management",
    title: "Coinboost",
    summary: "Designing a mobile trading experience that made diversified crypto portfolio management more approachable.",
    heroImage: "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user/1b852c1d-cover-1200-5-1200-7.webp",
    meta: [
      { label: "Role", value: "Product Strategy, UX/UI Design, Prototyping" },
      { label: "Date", value: "2021" },
      { label: "Sector", value: "Cryptocurrency · Trading" },
      { label: "Platform", value: "Mobile App" },
    ],
    chapters: [
      {
        label: "Challenge + Approach",
        blocks: [
          {
            heading: "Challenge",
            lead: "Crypto access remained intimidating and fragmented.",
            paragraphs: [
              "Mass-market consumers wanted access to cryptocurrencies, but trading across exchanges and managing risk created a high barrier to entry.",
            ],
          },
          {
            heading: "Approach",
            lead: "Make diversified portfolio management feel simple.",
            paragraphs: [
              "Coinboost combined three quantitatively managed funds, periodic rebalancing guidance, and one access point to multiple exchanges in a focused mobile workflow.",
            ],
          },
        ],
        highlightsLabel: "The work included:",
        highlights: ["Product and portfolio strategy", "Mobile UX and interface design", "Interactive prototyping"],
        media: {
          groups: [
            {
              heading: "Mobile App",
              description: "The concept covered onboarding, fund selection, portfolio performance, allocation, activity, and account controls.",
              items: [{ src: "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user/861b0fb6-vector.webp", alt: "Coinboost mobile application screens" }],
            },
          ],
        },
      },
      {
        label: "Outcome",
        lead: "A focused mobile concept for managing crypto portfolios.",
        paragraphs: ["The experience connected portfolio selection, monitoring, and rebalancing guidance in one approachable system."],
      },
    ],
    relatedProjects: relatedProjects(["Econiscore", "Truvalue Wealth", "Slalome", "LaterPay"]),
  },

  truvalueWebsite: {
    eyebrow: "Case study · AI investment intelligence",
    title: "Truvalue Website",
    summary: "Reframing AI-powered alternative data and ESG expertise into a clear, solutions-led website for investment professionals.",
    heroImage: "https://payload.cargocollective.com/1/0/18737/13920929/00_All_1200_7_1200.png",
    meta: [
      { label: "Role", value: "Brand Strategy, Product Marketing, Creative Direction, Development Oversight" },
      { label: "Date", value: "2020" },
      { label: "Sector", value: "AI · Finance · ESG" },
      { label: "Platform", value: "Website" },
    ],
    chapters: [
      {
        label: "Challenge + Approach",
        blocks: [
          {
            heading: "Challenge",
            lead: "A sophisticated value proposition buried in complexity.",
            paragraphs: [
              "Investment professionals needed to separate signal from noise across rapidly expanding alternative data while continuing to deliver trusted value to clients.",
            ],
          },
          {
            heading: "Approach",
            lead: "Lead with solutions, products, and proof.",
            paragraphs: [
              "The site organized Truvalue Labs around customer solutions, made its product family easier to understand, and foregrounded thought leadership and ESG expertise.",
            ],
          },
        ],
        highlightsLabel: "The work included:",
        highlights: ["Brand strategy and product positioning", "Website architecture and product marketing", "Creative direction and development oversight"],
        media: {
          groups: [
            { heading: "Home", description: "The homepage introduced amplified investment intelligence and directed visitors into products, solutions, and proof.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920929/00_Home_1000_1000.png", alt: "Truvalue Labs homepage" }] },
            { heading: "Platform", description: "The platform page translated AI and alternative-data capabilities into a clear product story.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920929/01_Platform_1000_1000.png", alt: "Truvalue Labs platform page" }] },
            { heading: "Solutions", description: "Solutions content connected the product family to specific investment workflows and buyer needs.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920929/02_Solution_1000_1000.png", alt: "Truvalue Labs solutions page" }] },
            { heading: "Why Us", description: "The company’s data, ESG expertise, and market credibility were brought together as clear differentiators.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920929/03_Why-Us_1000_1000.png", alt: "Truvalue Labs why us page" }] },
            { heading: "Insights", description: "Research and thought leadership became a prominent path into Truvalue’s perspective and expertise.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920929/03_Insight_1000_1000.png", alt: "Truvalue Labs insights page" }] },
            { heading: "About", description: "The company story connected Truvalue’s mission, network, and team to its position in AI-driven ESG research.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920929/04_About_1000_1000.png", alt: "Truvalue Labs about page" }] },
          ],
        },
      },
      {
        label: "Outcome",
        lead: "A clearer digital platform for investment intelligence.",
        paragraphs: ["The website brought Truvalue’s solutions, products, thought leadership, and ESG expertise into one coherent system."],
      },
    ],
    relatedProjects: relatedProjects(["Truvalue Platform", "Econiscore", "Coinboost", "Truvalue Wealth"]),
  },

  truvaluePlatform: {
    eyebrow: "Case study · AI-powered ESG analytics",
    title: "Truvalue Platform",
    summary: "Designing an ESG research platform that turned timely alternative data into actionable investment workflows.",
    heroImage: "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user/8e27b840-truvalue-platform-monitor-hero.webp",
    naturalHero: true,
    meta: [
      { label: "Role", value: "Design Thinking, Product Strategy, Design Direction, UX/UI Design, Development Oversight" },
      { label: "Date", value: "2020" },
      { label: "Sector", value: "AI · Finance · ESG" },
      { label: "Platform", value: "Web Application" },
    ],
    chapters: [
      {
        label: "Challenge + Approach",
        blocks: [
          {
            heading: "Challenge",
            lead: "Measure intangible company value with timely evidence.",
            paragraphs: [
              "Investment managers needed objective ESG insight, but traditional data was often outdated, slow-moving, and self-disclosed by companies.",
            ],
          },
          {
            heading: "Approach",
            lead: "Turn AI-driven ESG data into decision workflows.",
            paragraphs: [
              "The platform combined company research, sector analysis, portfolio evaluation, interactive time-series charts, materiality drill-downs, and search in a modular system.",
            ],
          },
        ],
        highlightsLabel: "The work included:",
        highlights: ["Product strategy and design direction", "Modular UX and interactive visualization", "Development oversight"],
        media: {
          groups: [
            { heading: "Dashboard", description: "The dashboard surfaced portfolio context, market movement, material events, and priority research in one view.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920927/01_Dashboard_1000_1000.png", alt: "Truvalue platform dashboard" }] },
            { heading: "Portfolio Overview", description: "Portfolio views connected ESG performance, trends, and material categories across holdings.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920927/05_Portfolio_1000_1000.png", alt: "Truvalue portfolio overview" }] },
            { heading: "Company Overview", description: "Company pages supported deeper research into ESG performance, categories, and underlying evidence.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920927/10_Company_1000_1000.png", alt: "Truvalue company overview" }] },
            { heading: "Article Details", description: "Event and article detail views linked source material to the ESG signals used in analysis.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920927/11_Article-Details_1000_1000.png", alt: "Truvalue article details" }] },
            { heading: "Search Results", description: "Search helped investment managers explore companies, themes, and emerging ideas across the platform.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920927/04_Search-Results_1000_1000.png", alt: "Truvalue search results" }] },
          ],
        },
      },
      {
        label: "Outcome",
        lead: "A modular research platform for ESG investment decisions.",
        paragraphs: ["The system made timely ESG signals easier to explore across companies, sectors, and portfolios."],
      },
    ],
    relatedProjects: relatedProjects(["Rainfall Mobile", "Truvalue Wealth", "Econiscore", "Coinboost"]),
  },

  truvalueWealth: {
    eyebrow: "Case study · ESG wealth management",
    title: "Truvalue Wealth",
    summary: "Concepting a tablet-based ESG companion that helped wealth managers connect client values, portfolios, products, and education.",
    heroImage: "https://payload.cargocollective.com/1/0/18737/13920931/Wealth_cover_1200_2_1200.png",
    meta: [
      { label: "Role", value: "Design Thinking, Product Concepting, Design Direction" },
      { label: "Date", value: "2019" },
      { label: "Sector", value: "Wealth Management · ESG" },
      { label: "Platform", value: "Tablet Concept" },
    ],
    chapters: [
      {
        label: "Challenge + Approach",
        blocks: [
          { heading: "Challenge", lead: "Values-aligned demand without the right advisory tools.", paragraphs: ["Investors increasingly wanted sustainable options, while wealth managers lacked the data, products, and tools needed to deliver them."] },
          { heading: "Approach", lead: "Bring ESG analysis and advice into one tablet experience.", paragraphs: ["The concept combined timely ESG analytics, portfolio analysis, rated investment products, alerts, reporting, and education for client conversations."] },
        ],
        highlightsLabel: "The work included:",
        highlights: ["Design thinking and product concepting", "Tablet experience architecture", "Product and visual design direction"],
        media: {
          groups: [
            { heading: "Wealth Manager App Concept", description: "The concept moved from dashboard and product discovery into portfolio comparison, ESG insight, alerts, and educational content.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920931/Wealth_all_1200_2_2_1200.png", alt: "Truvalue Wealth tablet application concept" }] },
          ],
        },
      },
      { label: "Outcome", lead: "A cohesive concept for values-aligned wealth conversations.", paragraphs: ["The experience connected ESG intelligence, portfolio context, investable products, and education in one advisory tool." ] },
    ],
    relatedProjects: relatedProjects(["Truvalue Platform", "Coinboost", "LaterPay", "Rainfall Mobile"]),
  },

  slalome: {
    eyebrow: "Case study · Goal-oriented collaboration",
    title: "Slalome",
    summary: "Designing a mobile collaboration app that kept tasks, activity, and team communication connected to a shared goal.",
    heroImage: "https://payload.cargocollective.com/1/0/18737/13920928/Slalome_cover_1200_1200.png",
    meta: [
      { label: "Role", value: "Product Strategy, UX/UI Design, Prototyping, Product Management" },
      { label: "Date", value: "2019" },
      { label: "Sector", value: "Team Collaboration" },
      { label: "Platform", value: "Mobile App" },
    ],
    chapters: [
      {
        label: "Challenge + Approach",
        blocks: [
          { heading: "Challenge", lead: "Teams needed context, not another disconnected task list.", paragraphs: ["Knowing what to prioritize requires understanding the overall goal, what came before, and what needs to happen next."] },
          { heading: "Approach", lead: "Organize collaboration around a shared timeline.", paragraphs: ["Slalome connected tasks, milestones, comments, teams, activity, and project completion while keeping the end goal visible throughout."] },
        ],
        highlightsLabel: "The work included:",
        highlights: ["Product strategy and management", "Mobile UX and interface design", "Interactive prototyping"],
        media: {
          groups: [
            { heading: "Mobile App", description: "The application covered project timelines, task creation, comments, scheduling, complexity, teams, activity, messages, and settings.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13920928/Slalome_all_1200_1200.png", alt: "Slalome mobile collaboration application screens" }] },
          ],
        },
      },
      { label: "Outcome", lead: "A collaboration concept with the goal always in view.", paragraphs: ["The experience gave teams one contextual flow for planning, communication, progress, and shared acknowledgment of completed work."] },
    ],
    relatedProjects: relatedProjects(["LaterPay", "Wickr", "Coinboost", "Truvalue Wealth"]),
  },

  laterpay: {
    eyebrow: "Case study · Creator micro-payments",
    title: "LaterPay",
    summary: "Designing a mobile publishing workflow that let creators capture, price, distribute, and manage monetized content.",
    heroImage: "https://payload.cargocollective.com/1/0/18737/13923228/LaterPay_cover_1200_1200.png",
    meta: [
      { label: "Role", value: "UX/UI Design, Prototyping" },
      { label: "Date", value: "2019" },
      { label: "Sector", value: "Creator Economy · Payments" },
      { label: "Platform", value: "Mobile App" },
    ],
    chapters: [
      {
        label: "Challenge + Approach",
        blocks: [
          { heading: "Challenge", lead: "Creators had limited ways to monetize smaller pieces of work.", paragraphs: ["LaterPay’s technology supported even fractional payments, but needed a mobile experience that showed creators what those micro-payments could enable."] },
          { heading: "Approach", lead: "Connect creation, pricing, distribution, and earnings.", paragraphs: ["The app streamlined photo and video capture, let creators set pricing and channels, and provided a dashboard for managing monetization over time."] },
        ],
        highlightsLabel: "The work included:",
        highlights: ["Mobile workflow and information architecture", "UX and interface design", "Interactive prototyping"],
        media: {
          groups: [
            { heading: "Mobile App", description: "The end-to-end flow covered capture, editing, pricing, publishing, distribution, content management, and earnings.", items: [
              { src: "https://payload.cargocollective.com/1/0/18737/13923228/LaterPay_all_1200_top_1200.png", alt: "LaterPay mobile publishing workflow" },
              { src: "https://payload.cargocollective.com/1/0/18737/13923228/LaterPay_all_1200_mid_1200.png", alt: "LaterPay pricing and distribution screens" },
              { src: "https://payload.cargocollective.com/1/0/18737/13923228/LaterPay_all_1200_bot_1200.png", alt: "LaterPay content and earnings management screens" },
            ] },
          ],
        },
      },
      { label: "Outcome", lead: "A streamlined mobile concept for monetized publishing.", paragraphs: ["The experience extended the LaterPay brand into a clear workflow for creating, distributing, and managing paid content."] },
    ],
    relatedProjects: relatedProjects(["Slalome", "Wickr", "Truvalue Wealth", "Coinboost"]),
  },

  wickr: {
    eyebrow: "Case study · Private social communication",
    title: "Wickr Concepts",
    summary: "Exploring three social communication products that broadened secure peer-to-peer technology for a mainstream millennial audience.",
    heroImage: "https://payload.cargocollective.com/1/0/18737/13925015/Wickr_cover_1200_1200.png",
    meta: [
      { label: "Role", value: "Design Thinking, Product Strategy, Design Direction, UX/UI Design, Product Management" },
      { label: "Date", value: "2016" },
      { label: "Sector", value: "Private Communication · Social" },
      { label: "Platform", value: "Product Concepts" },
    ],
    chapters: [
      {
        label: "Challenge + Approach",
        blocks: [
          { heading: "Challenge", lead: "Broaden secure communication beyond an early-adopter audience.", paragraphs: ["Wickr wanted to extend the appeal of its peer-to-peer technology to millennials while keeping users in control of their content and communications."] },
          { heading: "Approach", lead: "Explore three focused products for distinct social behaviors.", paragraphs: ["Explor addressed publishing and discovery, Slidr focused on private photo sharing, and Quickr streamlined secure messaging with shortcuts."] },
        ],
        highlightsLabel: "The work included:",
        highlights: ["Design thinking and product strategy", "Concept and design direction", "UX/UI design and product management"],
        media: {
          groups: [
            { heading: "Explor — Micro Content Publishing", description: "Explor combined content publishing and discovery with secure peer-to-peer transactions.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13925015/Explor_all_1200_1200.png", alt: "Wickr Explor micro-content publishing concept" }] },
            { heading: "Slidr — Private Photo Sharing", description: "Slidr explored a one-screen photo capture-and-sharing experience with stronger viewing controls.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13925015/Slidr_all_1200_1200.png", alt: "Wickr Slidr private photo sharing concept" }] },
            { heading: "Quickr — Faster Text Messaging", description: "Quickr streamlined secure messaging through a faster interface and command-line shortcuts such as # and @.", items: [{ src: "https://payload.cargocollective.com/1/0/18737/13925015/Quickr_all_1200_1200.png", alt: "Wickr Quickr secure messaging concept" }] },
          ],
        },
      },
      { label: "Outcome", lead: "Three distinct paths to mainstream private communication.", paragraphs: ["The concepts demonstrated how Wickr’s secure foundation could support publishing, photo sharing, and messaging without giving up user control."] },
    ],
    relatedProjects: relatedProjects(["Slalome", "LaterPay", "Coinboost", "Truvalue Wealth"]),
  },
} satisfies Record<string, ProjectCaseStudyContent>;
