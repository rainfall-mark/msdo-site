import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabExperiment } from "./lab-case-study";

const CONTENT = buildLabExperiment({
  slug: "claimbot",
  summary: "AI that turns an invoice and receipt into a ready-to-submit health insurance claim, files it in your own browser, then tracks every reply, settlement letter and benefit limit so nothing slips.",
  builtWith: "Claude · browser agent · multi-agent workflow",
  platform: "Live claims page, sample data",
  challenge: {
    lead: "Claims take too long, and you never know what came back.",
    paragraphs: [
      "Every visit means another claim, and every claim asks for the same details again: provider, dates, codes, amounts, bank info. Then the emails start, asking for more.",
      "Once it's in, you rarely know whether it was paid, how much, or what's left on your plan for the rest of the policy year. Submitting, tracking and responding all take time and effort, and all of it can be handled by AI agents.",
    ],
  },
  solution: {
    lead: "Agents file the claim and see it through, so you don't have to.",
    paragraphs: [
      "Drop in the invoice and receipt. AI reads both and fills in the claim: provider, dates, amounts, diagnosis and treatment codes, written the way the insurer expects. It flags anything that could hold up payment, like a session that needs prior authorisation.",
      "A browser agent then submits the claim in your own Chrome, stopping for your approval. From there, agents watch the inbox, answer the insurer's emails, and track each claim until it's paid.",
      "Every settlement letter is read and matched against your plan, so you can finally see what's been paid, how much deductible is left, how many sessions remain, and what's still covered for the rest of the policy year.",
      "The upside: less time, more money back, and full use of the benefits you're already paying for.",
    ],
  },
  demoIntro: "A walkthrough of the live demo on a fictional member's claims: a physio invoice and receipt dropped in, read, reviewed and submitted, then the settlement letters, then the benefits tracked against the policy.",
  demoCaption: "Recorded from the live demo. Jordan Reyes is fictional, every provider, claim and amount is sample data, and the agent's steps are simulated. Not affiliated with or endorsed by Cigna.",
});

/**
 * @ployComponent
 * @ployComponentId lab-claimbot-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription ClaimBot Lab experiment page: 2x2 screenshot-grid hero (Claims list with a just-submitted claim, the claim card the agent filled in with its prior-authorisation flag, a settlement letter opened in place, Benefits with deductibles and limits), challenge and solution (with how AI was used), a recorded walkthrough of the live sample-data demo, and an "I'm interested" lead form.
 * @ployComponentTags lab experiment health insurance claims agent browser ai editorial
 * @ployComponentStatus stable
 */
export default function ClaimBotPage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
