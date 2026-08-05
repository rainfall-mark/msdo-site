import ProjectCaseStudyTemplate from "./project-case-study";
import { PORTFOLIO_CASE_STUDIES } from "./portfolio-case-study-content";

/** @ployComponent @ployComponentId coinboost-case-study-page @ployComponentType page @ployComponentPattern case-study @ployComponentDescription Coinboost portfolio case study using the shared editorial project template. @ployComponentTags case-study coinboost mobile crypto @ployComponentStatus stable */
export default function CoinboostPage() { return <ProjectCaseStudyTemplate content={PORTFOLIO_CASE_STUDIES.coinboost} />; }
