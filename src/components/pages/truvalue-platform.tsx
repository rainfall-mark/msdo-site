import ProjectCaseStudyTemplate from "./project-case-study";
import { PORTFOLIO_CASE_STUDIES } from "./portfolio-case-study-content";

/**
 * @ployComponent
 * @ployComponentId truvalue-platform-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Truvalue Platform portfolio case study using the shared editorial project template.
 * @ployComponentTags case-study truvalue platform ai finance
 * @ployComponentStatus stable
 */
export default function TruvaluePlatformPage() { return <ProjectCaseStudyTemplate content={PORTFOLIO_CASE_STUDIES.truvaluePlatform} />; }
