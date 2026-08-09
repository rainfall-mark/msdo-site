import ProjectCaseStudyTemplate from "./project-case-study";
import { PORTFOLIO_CASE_STUDIES } from "./portfolio-case-study-content";

/**
 * @ployComponent
 * @ployComponentId truvalue-wealth-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Truvalue Wealth portfolio case study using the shared editorial project template.
 * @ployComponentTags case-study truvalue wealth esg tablet
 * @ployComponentStatus stable
 */
export default function TruvalueWealthPage() { return <ProjectCaseStudyTemplate content={PORTFOLIO_CASE_STUDIES.truvalueWealth} />; }
