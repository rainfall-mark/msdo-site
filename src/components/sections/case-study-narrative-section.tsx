import { Reveal } from "@/components/ui/reveal";

interface CaseStudyNarrativeSectionProps { label?: string; lead?: string; paragraphs?: readonly string[]; highlights?: string[]; highlightsLabel?: string; }

/**
 * @ployComponent
 * @ployComponentId case-study-narrative-section
 * @ployComponentType section
 * @ployComponentPattern narrative
 * @ployComponentDescription Adaptive editorial narrative block for case studies and profile pages. Uses a compact sticky label, large lead, readable body copy, optional ruled highlights, and slow scroll reveal.
 * @ployComponentTags case-study narrative studio adaptive editorial
 * @ployComponentStatus stable
 */
export default function CaseStudyNarrativeSection({ label = "Challenge", lead, paragraphs = [], highlights, highlightsLabel }: CaseStudyNarrativeSectionProps) {
  return (
    <section className="cs-narrative bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
      <Reveal className="cs-narrative__inner mx-auto grid max-w-[92rem] gap-10 border-t border-ploy-border-primary pt-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <p className="cs-narrative__label text-sm text-ploy-text-secondary lg:sticky lg:top-24 lg:self-start">{label}</p>
        <div className="cs-narrative__main max-w-3xl">
          {lead && <p className="cs-narrative__lead font-heading text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-ploy-text-primary sm:text-5xl">{lead}</p>}
          {paragraphs.length > 0 && <div className="cs-narrative__body mt-8 space-y-6">{paragraphs.map((paragraph, index) => <p key={index} className="text-lg leading-relaxed text-ploy-text-secondary">{paragraph}</p>)}</div>}
          {highlights && highlights.length > 0 && <div className="mt-12">{highlightsLabel && <p className="text-xs text-ploy-text-secondary">{highlightsLabel}</p>}<ul className="mt-5 border-t border-ploy-border-primary">{highlights.map((item) => <li key={item} className="border-b border-ploy-border-primary py-4 text-lg font-medium text-ploy-text-primary">{item}</li>)}</ul></div>}
        </div>
      </Reveal>
    </section>
  );
}
