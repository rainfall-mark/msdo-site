import ProjectCaseStudyTemplate from "./project-case-study";
import { PORTFOLIO_CASE_STUDIES } from "./portfolio-case-study-content";

/**
 * @ployComponent
 * @ployComponentId truvalue-website-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Truvalue Website portfolio case study using the shared editorial project template.
 * @ployComponentTags case-study truvalue website ai finance
 * @ployComponentStatus stable
 */
export default function TruvalueWebsitePage() { return <ProjectCaseStudyTemplate content={PORTFOLIO_CASE_STUDIES.truvalueWebsite} />; }
