import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import CaseStudyHeroSection from "../sections/case-study-hero-section";
import CaseStudyNarrativeSection from "../sections/case-study-narrative-section";
import CaseStudyMediaSection from "../sections/case-study-media-section";
import NextProjectSection from "../sections/next-project-section";
import ContactCtaSection from "../sections/contact-cta-section";

const RAINFALL_HERO_IMAGE =
  "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user/3516595f-ai-generated-1782451516981.png";
const RAINFALL_WEBSITE_IMAGE =
  "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user/4e6a6a97-slurp-prt-218x146-1774545511.webp";
const RAINFALL_MOBILE_IMAGE =
  "https://storage.googleapis.com/ployai/ac8de608-c1da-40c7-bb89-c3998502b072/user/9e439195-slurp-prt-218x146-1782021406.webp";

/**
 * @ployComponent
 * @ployComponentId rainfall-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription MSDO case study for Rainfall — the self-sovereign Personal AI / AI Coherence platform. Composes the shared navbar, full-bleed case-study hero (atmospheric backdrop + meta), Challenge / Approach / Outcome narrative blocks, framed full-bleed project imagery (real slurped Rainfall website + mobile work), a next-project rail, the shared contact CTA, and footer. All facts sourced from msdo.us and rainfall.one — no fabricated metrics. Reuses the homepage design system (tokens, grotesk type, hairline rhythm). Built for the 2026 dark redesign.
 * @ployComponentTags case-study rainfall portfolio studio dark
 * @ployComponentStatus stable
 */
export default function RainfallPage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseStudyHeroSection
          eyebrow="Case study · Applied AI"
          title="Rainfall"
          summary="Defining and designing a new category — AI Coherence and self-sovereign Personal AI — across a category-defining website and an on-device, privacy-first mobile product for the agentic era."
          backgroundImage={RAINFALL_HERO_IMAGE}
          meta={[
            { label: "Role", value: "Strategy, Branding, UX & Product Design, Design Systems" },
            { label: "Timeline", value: "2023 – 2025" },
            { label: "Sector", value: "Applied AI · Self-sovereign / Web3" },
            { label: "Live site", value: "rainfall.one", href: "https://www.rainfall.one" },
          ]}
        />

        <CaseStudyNarrativeSection
          label="Challenge"
          lead="Rainfall introduced a category that didn't map to any existing mental model — neither AI assistant, data-privacy app, nor Web3 wallet."
          paragraphs={[
            "Rainfall set out to build the self-sovereign governance layer for the agentic era: AI Coherence and Personal AI that stays private, owned, and aligned to the individual it serves. The concept was genuinely new — and it didn't fit how people already thought about AI.",
            "Early website iterations leaned on familiar narratives around data privacy, ownership, and monetization. Those framings felt safe but blunted differentiation, and failed to convey Rainfall as foundational infrastructure for an autonomous-agent economy.",
            "The mobile product faced its own version of the same problem. AI systems are increasingly capable, but most rely on centralized cloud models that know little about the individual. Rainfall R.1 explored the opposite: building a Personal Intelligence from a person's own data while keeping complete privacy and ownership — which meant making on-device AI, personal memory, and continuous model training understandable to everyday users.",
          ]}
        />

        <CaseStudyMediaSection
          label="The website"
          heading="A category-defining storytelling platform"
          items={[
            {
              src: RAINFALL_WEBSITE_IMAGE,
              alt: "Rainfall website — AI Coherence for the Agentic Era hero",
              caption:
                "rainfall.one — the final website, built around an opinionated AI Coherence narrative with a clean, minimal visual system.",
              aspect: "aspect-[16/10]",
            },
            {
              src: RAINFALL_MOBILE_IMAGE,
              alt: "Rainfall R.1 mobile app — self-sovereign Personal AI interface",
              caption:
                "Rainfall R.1 Beta — a privacy-first Personal Intelligence app that turns a user's own data into a continuously learning, on-device AI.",
              aspect: "aspect-[16/10]",
            },
          ]}
        />

        <CaseStudyNarrativeSection
          label="Approach"
          lead="Distill a complex, evolving concept into one clear, future-facing story — then express it consistently from high-level vision down to product architecture."
          paragraphs={[
            "On the website, the work evolved through multiple iterations into a focused storytelling platform. Each version simplified the story and shifted positioning away from a data-centric message toward a category-defining AI Coherence narrative — strengthening the case around reliability, identity, and governance for autonomous systems.",
            "The final design introduced a more opinionated, future-facing narrative supported by a clean, minimal visual system and a modular structure — enabling clear communication from the high-level vision through to the product architecture, and establishing Rainfall as foundational infrastructure for the agentic era.",
            "On mobile, R.1 Beta unified personal memory, timeline capture, contextual insights, and local model training into a single product that became more useful as it learned from the individual. By keeping data entirely on-device and under user control, the design demonstrated a practical alternative to cloud-centric AI.",
          ]}
          highlightsLabel="What MSDO delivered"
          highlights={[
            "Positioning & category narrative — from data-centric to AI Coherence",
            "Brand & minimal visual system for rainfall.one",
            "Website design + development oversight (2023–2025)",
            "R.1 mobile product strategy, UX & product design",
            "On-device Personal AI design system & component library",
          ]}
        />

        <CaseStudyNarrativeSection
          label="Outcome"
          lead="A clear, ownable story and a shipping product that prove a private, self-sovereign alternative to cloud-centric AI is real."
          paragraphs={[
            "The website now communicates a single, confident narrative — AI Coherence for the agentic era — that holds up across users, developers, and investors, and positions Rainfall as a governance layer rather than another privacy app.",
            "R.1 Beta turned the thesis into something people can hold: a Personal Intelligence that lives on-device, learns continuously from a person's own data, and stays under their control — making an abstract idea concrete and usable.",
            "Together the work gave Rainfall a coherent identity and product foundation to keep building on as it scales self-sovereign AI coherence for autonomous systems.",
          ]}
        />

        <NextProjectSection
          label="Next project"
          name="Truvalue"
          href="https://msdo.us/Truvalue-Website"
          tags={["Web", "AI", "Finance"]}
          indexLabel="All work"
          indexHref="/#work"
        />

        <ContactCtaSection heading="Have an ambitious idea? Let's build it." />
      </main>
      <Footer />
    </>
  );
}
