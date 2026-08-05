import { Reveal } from "@/components/ui/reveal";

export interface CaseStudyNarrativeBlock { heading: string; lead?: string; paragraphs?: readonly string[]; }
interface CaseStudyNarrativeSectionProps { label?: string; lead?: string; paragraphs?: readonly string[]; blocks?: CaseStudyNarrativeBlock[]; highlights?: string[]; highlightsLabel?: string; }

/**
 * @ployComponent
 * @ployComponentId case-study-narrative-section
 * @ployComponentType section
 * @ployComponentPattern narrative
 * @ployComponentDescription Adaptive editorial narrative block for case studies and profile pages. Supports a focused single narrative or a compact three-column challenge, approach, and deliverables presentation.
 * @ployComponentTags case-study narrative studio adaptive editorial
 * @ployComponentStatus stable
 */
export default function CaseStudyNarrativeSection({ label = "Challenge", lead, paragraphs = [], blocks, highlights, highlightsLabel }: CaseStudyNarrativeSectionProps) {
  const hasBlocks = blocks && blocks.length > 0;

  return (
    <section className={`cs-narrative bg-ploy-background-primary px-5 sm:px-8 lg:px-10 ${hasBlocks ? "py-20 sm:py-24 lg:py-28" : "py-24 sm:py-32 lg:py-40"}`}>
      <Reveal className="cs-narrative__inner mx-auto grid max-w-[92rem] gap-10 border-t border-ploy-border-primary pt-8 lg:grid-cols-[.45fr_1.55fr] lg:gap-16">
        <p className="cs-narrative__label text-sm text-ploy-text-secondary lg:sticky lg:top-24 lg:self-start">{label}</p>
        <div className="cs-narrative__main">
          {hasBlocks ? (
            <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-10">
              {blocks.map((block) => (
                <div key={block.heading}>
                  <h2 className="text-sm font-medium text-ploy-text-primary">{block.heading}</h2>
                  {block.lead && <p className="mt-5 font-heading text-2xl font-semibold leading-[1.08] tracking-[-0.035em] text-ploy-text-primary sm:text-3xl">{block.lead}</p>}
                  {block.paragraphs && block.paragraphs.length > 0 && <div className="mt-6 space-y-5">{block.paragraphs.map((paragraph, index) => <p key={index} className="text-base leading-relaxed text-ploy-text-secondary">{paragraph}</p>)}</div>}
                </div>
              ))}
              {highlights && highlights.length > 0 && (
                <div>
                  <h2 className="text-sm font-medium text-ploy-text-primary">{highlightsLabel ?? "Deliverables"}</h2>
                  <ul className="mt-5 border-t border-ploy-border-primary">
                    {highlights.map((item) => <li key={item} className="border-b border-ploy-border-primary py-4 text-base font-medium leading-snug text-ploy-text-primary">{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-3xl">
              {lead && <p className="cs-narrative__lead font-heading text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-ploy-text-primary sm:text-5xl">{lead}</p>}
              {paragraphs.length > 0 && <div className="cs-narrative__body mt-8 space-y-6">{paragraphs.map((paragraph, index) => <p key={index} className="text-lg leading-relaxed text-ploy-text-secondary">{paragraph}</p>)}</div>}
              {highlights && highlights.length > 0 && <div className="mt-12">{highlightsLabel && <p className="text-xs text-ploy-text-secondary">{highlightsLabel}</p>}<ul className="mt-5 border-t border-ploy-border-primary">{highlights.map((item) => <li key={item} className="border-b border-ploy-border-primary py-4 text-base font-medium text-ploy-text-primary">{item}</li>)}</ul></div>}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
