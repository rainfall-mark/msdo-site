/**
 * @ployComponent
 * @ployComponentId case-study-narrative-section
 * @ployComponentType section
 * @ployComponentPattern narrative
 * @ployComponentDescription Reusable case-study narrative block for MSDO project pages — used for Challenge / Approach / Outcome. Two-column layout: a sticky eyebrow label on the left, and a large grotesk lead plus graphite body paragraphs on the right. Optional hairline-ruled highlight list (e.g. role deliverables, outcomes). No icon tiles or pill badges — matches the calm spec-sheet anatomy of the services rail. Dark theme. Built for the 2026 redesign.
 * @ployComponentTags case-study narrative challenge approach outcome studio dark
 * @ployComponentStatus stable
 */
interface CaseStudyNarrativeSectionProps {
  label?: string;
  lead?: string;
  paragraphs?: string[];
  highlights?: string[];
  highlightsLabel?: string;
}

export default function CaseStudyNarrativeSection({
  label = "Challenge",
  lead,
  paragraphs = [],
  highlights,
  highlightsLabel,
}: CaseStudyNarrativeSectionProps) {
  return (
    <section className="cs-narrative border-t border-ploy-border-primary bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32">
      <div className="cs-narrative__inner mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="cs-narrative__aside">
          <p className="cs-narrative__label font-eyebrow text-sm uppercase tracking-widest text-ploy-accent-primary lg:sticky lg:top-24">
            {label}
          </p>
        </div>
        <div className="cs-narrative__main max-w-3xl">
          {lead && (
            <p className="cs-narrative__lead font-heading text-2xl font-semibold leading-snug tracking-tight text-ploy-text-primary sm:text-4xl">
              {lead}
            </p>
          )}
          {paragraphs.length > 0 && (
            <div className="cs-narrative__body mt-8 space-y-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="cs-narrative__para text-lg leading-relaxed text-ploy-text-secondary"
                >
                  {p}
                </p>
              ))}
            </div>
          )}

          {highlights && highlights.length > 0 && (
            <div className="cs-narrative__highlights mt-12">
              {highlightsLabel && (
                <p className="cs-narrative__highlights-label font-eyebrow text-xs uppercase tracking-widest text-ploy-text-secondary">
                  {highlightsLabel}
                </p>
              )}
              <ul className="cs-narrative__list mt-5 border-t border-ploy-border-primary">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="cs-narrative__item border-b border-ploy-border-primary py-4 text-lg font-medium text-ploy-text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
