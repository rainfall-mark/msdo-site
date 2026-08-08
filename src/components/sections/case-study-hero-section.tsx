export interface CaseStudyMeta { label: string; value: string; href?: string; }
interface CaseStudyHeroSectionProps { eyebrow?: string; title?: string; summary?: string; backgroundImage?: string; meta?: CaseStudyMeta[]; variant?: "dark" | "editorial"; prominentCover?: boolean; }

/**
 * @ployComponent
 * @ployComponentId case-study-hero-section
 * @ployComponentType section
 * @ployComponentPattern hero
 * @ployComponentDescription Adaptive inner-page hero with dark and light editorial variants. The editorial case-study treatment presents project title, summary, and metadata before an optional wide landscape cover.
 * @ployComponentTags case-study hero studio adaptive editorial
 * @ployComponentStatus stable
 */
export default function CaseStudyHeroSection({ eyebrow = "Case study", title = "Project", summary, backgroundImage, meta = [], variant = "dark", prominentCover = false }: CaseStudyHeroSectionProps) {
  const editorial = variant === "editorial";

  return (
    <section className={`cs-hero relative overflow-hidden bg-ploy-background-primary px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-10 ${editorial ? "" : "flex min-h-screen items-end"}`}>
      {backgroundImage && !editorial && (
        <div className="cs-hero__visual absolute inset-0">
          <img src={backgroundImage} alt="" aria-hidden="true" decoding="async" className="h-full w-full object-cover opacity-70" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ploy-background-primary via-ploy-background-primary/70 to-ploy-background-primary/30" />
        </div>
      )}

      <div className="cs-hero__inner relative mx-auto w-full max-w-[92rem]">
        <p className="cs-hero__eyebrow text-sm text-ploy-text-secondary">{eyebrow}</p>
        <h1 className={`cs-hero__title mt-5 max-w-[15ch] font-heading font-semibold leading-[0.94] tracking-[-0.055em] text-balance text-ploy-text-primary ${editorial ? "text-[clamp(4.25rem,9vw,9rem)]" : "text-[clamp(2.75rem,8vw,7rem)]"}`}>{title}</h1>
        {summary && <p className={`cs-hero__summary mt-8 leading-relaxed text-ploy-text-secondary ${editorial ? "w-full max-w-none text-xl sm:text-2xl" : "max-w-2xl text-lg"}`}>{summary}</p>}
        {meta.length > 0 && (
          <dl className="cs-hero__meta mt-12 grid border-t border-ploy-border-primary text-left sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-12">
            {meta.map((item) => <div key={item.label} className="cs-hero__meta-item border-b border-ploy-border-primary py-5"><dt className="text-xs text-ploy-text-secondary">{item.label}</dt><dd className="mt-2 text-base font-medium text-ploy-text-primary">{item.href ? <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-ploy-text-secondary">{item.value} ↗</a> : item.value}</dd></div>)}
          </dl>
        )}

        {backgroundImage && editorial && (
          <div className={`cs-hero__cover mt-12 w-full overflow-hidden rounded-xl bg-ploy-background-secondary sm:mt-16 ${prominentCover ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[16/7]"}`}>
            <img src={backgroundImage} alt="" aria-hidden="true" loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
