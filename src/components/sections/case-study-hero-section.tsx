import { motion } from "motion/react";

export interface CaseStudyMeta { label: string; value: string; href?: string; }
interface CaseStudyHeroSectionProps { eyebrow?: string; title?: string; summary?: string; backgroundImage?: string; meta?: CaseStudyMeta[]; variant?: "dark" | "editorial"; }

/**
 * @ployComponent
 * @ployComponentId case-study-hero-section
 * @ployComponentType section
 * @ployComponentPattern hero
 * @ployComponentDescription Adaptive inner-page hero with dark and light editorial variants. Supports optional background imagery, large sentence-case title, summary, and ruled project metadata while preserving server-rendered content and restrained loading motion.
 * @ployComponentTags case-study hero studio adaptive editorial
 * @ployComponentStatus stable
 */
export default function CaseStudyHeroSection({ eyebrow = "Case study", title = "Project", summary, backgroundImage, meta = [], variant = "dark" }: CaseStudyHeroSectionProps) {
  const editorial = variant === "editorial";
  const transition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const };
  return (
    <section className={`cs-hero relative flex items-end overflow-hidden bg-ploy-background-primary px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-10 ${editorial ? "min-h-[78vh]" : "min-h-screen"}`}>
      {backgroundImage && (
        <div className={`cs-hero__visual absolute ${editorial ? "right-5 top-28 hidden h-[48%] w-[38%] overflow-hidden rounded-xl lg:block" : "inset-0"}`}>
          <img src={backgroundImage} alt="" aria-hidden="true" className={`h-full w-full object-cover ${editorial ? "" : "opacity-70"}`} />
          {!editorial && <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ploy-background-primary via-ploy-background-primary/70 to-ploy-background-primary/30" />}
        </div>
      )}
      <div className="cs-hero__inner relative mx-auto w-full max-w-[92rem]">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="cs-hero__eyebrow text-sm text-ploy-text-secondary">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.06 }} className={`cs-hero__title mt-5 max-w-[15ch] font-heading font-semibold leading-[0.94] tracking-[-0.055em] text-balance text-ploy-text-primary ${editorial ? "text-[clamp(3.5rem,8vw,8rem)]" : "text-[clamp(2.75rem,8vw,7rem)]"}`}>{title}</motion.h1>
        {summary && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.14 }} className="cs-hero__summary mt-8 max-w-2xl text-lg leading-relaxed text-ploy-text-secondary">{summary}</motion.p>}
        {meta.length > 0 && (
          <motion.dl initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.22 }} className="cs-hero__meta mt-12 grid border-t border-ploy-border-primary sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((item) => <div key={item.label} className="cs-hero__meta-item border-b border-ploy-border-primary py-5 sm:pr-8"><dt className="text-xs text-ploy-text-secondary">{item.label}</dt><dd className="mt-2 text-base font-medium text-ploy-text-primary">{item.href ? <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-ploy-text-secondary">{item.value} ↗</a> : item.value}</dd></div>)}
          </motion.dl>
        )}
      </div>
    </section>
  );
}
