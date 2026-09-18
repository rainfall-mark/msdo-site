import { VISIBLE_PROJECTS } from "@/lib/projects";
import ProjectCaseStudyTemplate, { type ProjectCaseStudyContent } from "./project-case-study";

// MSDO fork: images live in the repo (public/images) because Ploy storage is not writable from the fork.
const RAINFALL_STUDIO_ASSET = "/images/rainfall-studio";
const RELATED_PROJECT_NAMES = new Set(["Rainfall Mobile", "Econiscore", "Truvalue Platform", "Truvalue Wealth"]);

const CONTENT = {
  eyebrow: "Case study · Agentic AI",
  title: "Rainfall Studio",
  summary: "Designing Rainfall Studio, a no-code workspace where teams describe an AI app in plain English, then review, test, and deploy it as a governed Coherent App.",
  heroImage: `${RAINFALL_STUDIO_ASSET}/hero.webp`,
  naturalHero: true,
  heroWidth: 2880,
  heroHeight: 2160,
  meta: [
    { label: "Role", value: "Product Strategy, UX Design, Product Design, Design Systems" },
    { label: "Date", value: "September 2026" },
    { label: "Sector", value: "Applied AI · Agent Infrastructure" },
    { label: "Platform", value: "Web App" },
  ],
  chapters: [
    {
      label: "Challenge + Solution",
      blocks: [
        {
          heading: "Challenge",
          lead: "Make AI agents that teams can trust, without writing code.",
          paragraphs: [
            "AI agents are easy to demo and hard to rely on. Behavior drifts between models, rules live in scattered prompts, and the people accountable for an agent’s conduct are rarely the ones who can change it.",
            "The challenge was to make abstract ideas such as guardrails, orchestration, and model-agnostic control concrete enough that a non-engineer could define how an agentic system should act, and verify that it does.",
          ],
        },
        {
          heading: "Solution",
          lead: "From a plain-English description to a governed, running app.",
          paragraphs: [
            "Rainfall Studio starts with one question: what should we build? An authoring assistant asks about guardrails, interfaces, and surfaces, then drafts a readable Design. Studio turns that Design into a visual choreograph of actors, decisions, and safety boundaries that anyone on the team can inspect.",
            "We unified describing, specifying, building, testing, and deploying into a single workflow. Teams can start from scratch, extend a proven exemplar, or import an existing agent workflow and add the coherence layer it is missing. Pre-flight checks and a sign, approve, publish release keep a person accountable for every app that goes live.",
          ],
        },
      ],
      footnote: {
        label: "Example",
        lead: "Ask The Two Robbies: an AI chat app that is governed and reliable.",
        description: "A fan-facing companion for a football podcast, built and published from Studio. Its guardrails, sources, and release approvals are part of the app rather than bolted on afterwards.",
        link: { href: "#ask-the-two-robbies", label: "See: Ask The Two Robbies App" },
      },
      highlightsLabel: "The work included:",
      highlights: [
        "Product strategy",
        "UX and product design",
        "Conversational and canvas interaction design",
        "Design systems",
      ],
      media: {
        groups: [
          {
            heading: "Describe It, and Studio Designs and Builds It",
            description: "A conversation gathers the requirements, guardrails, and surfaces, then drafts a Design in plain language. Nothing is invented: every section traces back to the inputs that were provided.",
            items: [
              {
                src: `${RAINFALL_STUDIO_ASSET}/studio-01.webp`,
                alt: "Rainfall Studio screens showing the start page, a described app, the authoring conversation gathering guardrails and sources, and the generated Design and choreograph",
                width: 2880,
                height: 10726,
              },
            ],
          },
          {
            heading: "Deploy All in One Place",
            description: "The canvas turns the Design into actors, decisions, and safety boundaries. Pre-flight runs checks to ensure all paths work, and a release approval workflow that keeps the human in the loop all from one place. Can’t get any easier.",
            items: [
              {
                src: `${RAINFALL_STUDIO_ASSET}/studio-02.webp`,
                alt: "Rainfall Studio screens showing the choreograph canvas with actor library, pre-flight check results, the generated Design document, and the deploy sign-approve-publish flow",
                width: 2880,
                height: 8798,
              },
            ],
          },
        ],
      },
    },
    {
      label: "Ask The Two Robbies",
      media: {
        id: "ask-the-two-robbies",
        label: "Ask The Two Robbies",
        groups: [
          {
            heading: "See It in Action",
            description: "The working version of the Ask The Two Robbies app can be viewed in action. This is an example of how the Studio can build fully governed applications.",
            items: [
              {
                embed: {
                  src: "/demos/ask-the-two-robbies/index.html",
                  title: "Ask The Two Robbies — live demo",
                  ratio: "16 / 10",
                },
                caption: "A live build of Ask The Two Robbies, published from Rainfall Studio.",
                link: { href: "https://www.thetworobbies.com/", label: "Visit The Two Robbies" },
              },
            ],
          },
          {
            heading: "Mobile",
            description: "Onboarding prompts, threaded answers with episode citations, follow-up suggestions, and chat history in one fan-facing app.",
            items: [
              {
                src: `${RAINFALL_STUDIO_ASSET}/robbies-mobile.webp`,
                alt: "Ask The Two Robbies mobile screens showing the prompt suggestions home, an answer with episode citations, follow-up chips, and the chat history drawer",
                width: 2880,
                height: 1628,
              },
            ],
          },
        ],
      },
    },
    {
      label: "Outcome",
      lead: "A practical path from AI experiments to accountable agents.",
      paragraphs: [
        "By putting behavior and governance in the hands of the people responsible for them, Studio showed an approach where agentic apps are consistent, auditable, and portable across models.",
      ],
    },
  ],
  relatedProjects: VISIBLE_PROJECTS.filter((project) => RELATED_PROJECT_NAMES.has(project.name)),
} satisfies ProjectCaseStudyContent;

/**
 * @ployComponent
 * @ployComponentId rainfall-studio-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Rainfall Studio instance of the reusable light editorial project template, using the Studio web app screens and an embedded live demo of the app it produced.
 * @ployComponentTags case-study rainfall studio agentic-ai product-design editorial
 * @ployComponentStatus stable
 */
export default function RainfallStudioPage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
