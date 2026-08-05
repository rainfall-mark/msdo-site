import ProjectCaseStudyTemplate from "./project-case-study";
import { PORTFOLIO_CASE_STUDIES } from "./portfolio-case-study-content";

/** @ployComponent @ployComponentId wickr-case-study-page @ployComponentType page @ployComponentPattern case-study @ployComponentDescription Wickr concepts portfolio case study using the shared editorial project template. @ployComponentTags case-study wickr mobile social privacy @ployComponentStatus stable */
export default function WickrPage() { return <ProjectCaseStudyTemplate content={PORTFOLIO_CASE_STUDIES.wickr} />; }
