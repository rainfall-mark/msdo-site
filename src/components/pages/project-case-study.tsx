import { MotionConfig } from "motion/react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import CaseStudyHeroSection, { type CaseStudyMeta } from "../sections/case-study-hero-section";
import CaseStudyNarrativeSection, { type CaseStudyNarrativeBlock } from "../sections/case-study-narrative-section";
import CaseStudyMediaSection, { type CaseStudyMediaGroup, type CaseStudyMediaItem } from "../sections/case-study-media-section";
import NextProjectSection, { type RelatedProject } from "../sections/next-project-section";
import ContactCtaSection from "../sections/contact-cta-section";

export interface ProjectCaseStudyChapter {
  label: string;
  lead?: string;
  paragraphs?: string[];
  blocks?: CaseStudyNarrativeBlock[];
  highlights?: string[];
  highlightsLabel?: string;
  media?: { label?: string; heading?: string; items?: CaseStudyMediaItem[]; groups?: CaseStudyMediaGroup[]; };
}

export interface ProjectCaseStudyContent {
  eyebrow: string;
  title: string;
  summary: string;
  heroImage?: string;
  prominentHero?: boolean;
  naturalHero?: boolean;
  meta: CaseStudyMeta[];
  chapters: ProjectCaseStudyChapter[];
  relatedProjects: RelatedProject[];
}

/**
 * @ployComponent
 * @ployComponentId project-case-study-template
 * @ployComponentType page
 * @ployComponentPattern case-study
 * @ployComponentDescription Reusable light editorial MSDO project template with project-first hero content, compact narrative chapters, natural-height media stacks, related-project thumbnails, shared contact CTA, and adaptive site chrome.
 * @ployComponentTags project case-study portfolio template light editorial
 * @ployComponentStatus stable
 */
export default function ProjectCaseStudyTemplate({ content }: { content: ProjectCaseStudyContent }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="msdo-home light min-h-screen bg-ploy-background-primary text-ploy-text-primary">
        <Navbar aboutHref="/about" />
        <main>
          <CaseStudyHeroSection eyebrow={content.eyebrow} title={content.title} summary={content.summary} backgroundImage={content.heroImage} meta={content.meta} variant="editorial" prominentCover={content.prominentHero} naturalCover={content.naturalHero} />
          {content.chapters.map((chapter, index) => (
            <div key={`${chapter.label}-${index}`}>
              <CaseStudyNarrativeSection label={chapter.label} lead={chapter.lead} paragraphs={chapter.paragraphs} blocks={chapter.blocks} highlights={chapter.highlights} highlightsLabel={chapter.highlightsLabel} />
              {chapter.media && <CaseStudyMediaSection label={chapter.media.label} heading={chapter.media.heading} items={chapter.media.items} groups={chapter.media.groups} />}
            </div>
          ))}
          <NextProjectSection projects={content.relatedProjects} />
          <ContactCtaSection />
        </main>
        <Footer aboutHref="/about" />
      </div>
    </MotionConfig>
  );
}
