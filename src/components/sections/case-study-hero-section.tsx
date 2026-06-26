import { motion } from "motion/react";

/**
 * @ployComponent
 * @ployComponentId case-study-hero-section
 * @ployComponentType section
 * @ployComponentPattern hero
 * @ployComponentDescription Full-bleed case-study hero for MSDO project pages. Near-black canvas with an optional atmospheric background image behind a bottom-anchored content block: eyebrow, oversized Archivo grotesk title, graphite summary, and a hairline-ruled meta grid (role, timeline, sector, external link). Prop-driven and reusable across per-project case studies. Built for the 2026 dark redesign.
 * @ployComponentTags case-study hero studio dark grotesk
 * @ployComponentStatus stable
 */
export interface CaseStudyMeta {
  label: string;
  value: string;
  href?: string;
}

interface CaseStudyHeroSectionProps {
  eyebrow?: string;
  title?: string;
  summary?: string;
  backgroundImage?: string;
  meta?: CaseStudyMeta[];
}

export default function CaseStudyHeroSection({
  eyebrow = "Case study",
  title = "Project",
  summary,
  backgroundImage,
  meta = [],
}: CaseStudyHeroSectionProps) {
  return (
    <section className="cs-hero relative flex min-h-screen items-end overflow-hidden bg-ploy-background-primary px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="cs-hero__bg pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div
            aria-hidden="true"
            className="cs-hero__scrim pointer-events-none absolute inset-0 bg-gradient-to-t from-ploy-background-primary via-ploy-background-primary/70 to-ploy-background-primary/30"
          />
        </>
      )}

      <div className="cs-hero__inner relative mx-auto w-full max-w-[90rem]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="cs-hero__eyebrow font-eyebrow text-sm uppercase tracking-widest text-ploy-accent-primary"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="cs-hero__title mt-5 max-w-[16ch] font-heading text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-tight text-balance text-ploy-text-primary"
        >
          {title}
        </motion.h1>
        {summary && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: "easeOut" }}
            className="cs-hero__summary mt-8 max-w-2xl text-lg leading-relaxed text-ploy-text-secondary"
          >
            {summary}
          </motion.p>
        )}

        {meta.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
            className="cs-hero__meta mt-12 grid grid-cols-1 gap-px overflow-hidden border-t border-ploy-border-primary sm:grid-cols-2 lg:grid-cols-4"
          >
            {meta.map((item) => (
              <div
                key={item.label}
                className="cs-hero__meta-item border-b border-ploy-border-primary py-5 sm:pr-8"
              >
                <dt className="cs-hero__meta-label font-eyebrow text-xs uppercase tracking-widest text-ploy-text-secondary">
                  {item.label}
                </dt>
                <dd className="cs-hero__meta-value mt-2 text-base font-medium text-ploy-text-primary">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-ploy-accent-primary"
                    >
                      {item.value} ↗
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  );
}
