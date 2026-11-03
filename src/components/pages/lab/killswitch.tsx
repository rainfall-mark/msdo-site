import ProjectCaseStudyTemplate from "../project-case-study";
import { buildLabExperiment } from "./lab-case-study";

const CONTENT = buildLabExperiment({
  slug: "killswitch",
  summary: "AI that finds every subscription hiding in your statements, tells you what to keep and what to cut, and cancels for you in your own browser, stopping for your yes before the final click.",
  builtWith: "Claude · multi-agent workflow",
  platform: "Live dashboard, sample data",
  challenge: {
    lead: "Subscriptions are easy to start and hard to stop.",
    paragraphs: [
      "A free trial here, a family plan there, and a few years later dozens of charges renew quietly across different cards. Some you forgot, some you outgrew, and a few you can't even name.",
      "Killing one means finding the right account, getting past the retention offers, and checking it actually stopped. So most of us just keep paying.",
    ],
  },
  solution: {
    lead: "AI finds every subscription and kills the ones you don't need.",
    paragraphs: [
      "Drop in your card and bank statements, receipts or emails. AI finds every recurring charge, sorts them by category, and recommends what to keep, reduce, review, or kill, with the reason for each. The biggest wins rise to the top.",
      "Press Start kill and a browser agent opens the vendor's site in your own Chrome, works through the cancel flow, declines the retention offers, and stops at the final screen. It shows you exactly what the screen says and only clicks when you say yes. Then it checks the account page, and your next statement, to confirm it's gone.",
      "Talk to it as you go: say you still use something, ask what a charge is, or have it track down one you don't recognize. The dashboard updates with every answer.",
      "The result: you stop paying for what you don't use, without spending an afternoon on hold. Your statements stay on your computer, and it never types your passwords.",
    ],
  },
  demoIntro: "A walkthrough of the live demo on a fictional person's subscriptions: priority actions, one kill from Start to verified, a charge nobody recognized, and telling the agent to keep one.",
  demoCaption: "Recorded from the live demo. Sam Avery is fictional, every subscription, site, and price is sample data, and the agent's steps are simulated.",
});

/**
 * @ployComponent
 * @ployComponentId lab-killswitch-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Killswitch Lab experiment page: 2x2 screenshot-grid hero (Dashboard with the agent overview, the agent working a cancel, the go-ahead screen, the verified kill), challenge and solution (with how AI was used), a recorded walkthrough of the live sample-data demo, and an "I'm interested" lead form.
 * @ployComponentTags lab experiment subscriptions agent browser ai editorial
 * @ployComponentStatus stable
 */
export default function KillswitchPage() {
  return <ProjectCaseStudyTemplate content={CONTENT} />;
}
