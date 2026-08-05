import ProjectCaseStudyTemplate from "./project-case-study";
import { PORTFOLIO_CASE_STUDIES } from "./portfolio-case-study-content";

/**
 * @ployComponent
 * @ployComponentId laterpay-case-study-page
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription LaterPay portfolio case study using the shared editorial project template.
 * @ployComponentTags case-study laterpay mobile creator payments
 * @ployComponentStatus stable
 */
export default function LaterPayPage() { return <ProjectCaseStudyTemplate content={PORTFOLIO_CASE_STUDIES.laterpay} />; }
