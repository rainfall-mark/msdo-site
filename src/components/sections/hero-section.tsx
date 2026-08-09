import { motion } from "motion/react";
import { CONTACT_HREF } from "@/lib/projects";

/**
 * @ployComponent
 * @ployComponentId hero-section
 * @ployComponentType section
 * @ployComponentPattern hero
 * @ployComponentDescription Light editorial studio hero with a compact availability note, large sentence-case statement, restrained supporting copy, pill CTA, and slow staged text loading inspired by premium product publishing.
 * @ployComponentTags hero studio light editorial motion
 * @ployComponentStatus stable
 */
interface HeroSectionProps {
  headline?: string;
  subcopy?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export default function HeroSection({
  headline = "Product design for ambitious ideas and emerging technology.",
  subcopy = "MSDO is a strategic product and design studio building applied AI products for the real world — from UX/UI through product development across web, mobile, and emerging platforms.",
  primaryCtaLabel = "Let's talk",
  primaryCtaHref = CONTACT_HREF,
  secondaryCtaLabel = "Explore selected work",
  secondaryCtaHref = "#work",
}: HeroSectionProps) {
  const transition = { duration: 1.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className="hero flex min-h-[92vh] items-end bg-ploy-background-primary px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="hero__inner mx-auto grid w-full max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="hero__eyebrow mb-7 text-sm text-ploy-text-secondary">
            Independent studio · San Francisco & Zurich · Working globally
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.08 }} className="hero__title max-w-[18ch] font-heading text-[clamp(3.25rem,7.2vw,7.4rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-balance text-ploy-text-primary">
            {headline}
          </motion.h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.2 }} className="hero__aside lg:pb-2">
          <p className="hero__subtitle text-base leading-relaxed text-ploy-text-secondary">{subcopy}</p>
          <div className="hero__actions mt-7 flex flex-wrap items-center gap-5">
            <a href={primaryCtaHref} className="hero__cta hero__cta--primary inline-flex min-h-10 items-center rounded-full bg-ploy-button-primary-background px-5 text-sm font-medium text-ploy-button-primary-text transition-transform duration-300 hover:scale-[1.03]">{primaryCtaLabel}</a>
            <a href={secondaryCtaHref} className="hero__cta hero__cta--secondary text-sm font-medium text-ploy-text-primary underline decoration-ploy-border-primary underline-offset-6 transition-colors hover:text-ploy-text-secondary">{secondaryCtaLabel}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
