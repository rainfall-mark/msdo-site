import ProjectCaseStudyTemplate from "./project-case-study";
import { PORTFOLIO_CASE_STUDIES } from "./portfolio-case-study-content";

/**
 * @ployComponent
 * @ployComponentId slalome-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Slalome portfolio case study using the shared editorial project template.
 * @ployComponentTags case-study slalome mobile collaboration
 * @ployComponentStatus stable
 */
export default function SlalomePage() { return <ProjectCaseStudyTemplate content={PORTFOLIO_CASE_STUDIES.slalome} />; }
