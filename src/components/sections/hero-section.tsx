import { motion } from "motion/react";
import { CONTACT_HREF } from "@/lib/projects";

/**
 * @ployComponent
 * @ployComponentId hero-section
 * @ployComponentType section
 * @ployComponentPattern hero
 * @ployComponentDescription MSDO studio hero. Type-led dark hero on a near-black canvas with an oversized Archivo grotesk headline, a graphite supporting paragraph, a cobalt "Start a project" pill, and a secondary "View work" link. Content is prop-driven with defaults. Rewritten from the original Cargo intro block during the 2026 dark redesign.
 * @ployComponentTags hero studio dark grotesk
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
  headline = "Applied AI product design, built for the real world.",
  subcopy = "MSDO is a strategic product and design studio. We partner with startups and established teams to turn complex, emerging technology into clear, usable products — across web, mobile, and AI.",
  primaryCtaLabel = "Start a project",
  primaryCtaHref = CONTACT_HREF,
  secondaryCtaLabel = "View work",
  secondaryCtaHref = "#work",
}: HeroSectionProps) {
  return (
    <section className="hero relative flex min-h-screen items-center overflow-hidden bg-ploy-background-primary px-5 pt-16 sm:px-8">
      <div className="hero__inner mx-auto w-full max-w-[90rem]">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hero__title max-w-[18ch] font-heading text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-tight text-balance text-ploy-text-primary"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="hero__subtitle mt-8 max-w-xl text-lg leading-relaxed text-ploy-text-secondary"
        >
          {subcopy}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
          className="hero__actions mt-10 flex flex-wrap items-center gap-5"
        >
          <a
            href={primaryCtaHref}
            className="hero__cta hero__cta--primary inline-flex items-center rounded-full bg-ploy-accent-primary px-7 py-3.5 text-base font-semibold text-ploy-text-on-accent-primary transition-opacity hover:opacity-90"
          >
            {primaryCtaLabel}
          </a>
          <a
            href={secondaryCtaHref}
            className="hero__cta hero__cta--secondary text-base font-medium text-ploy-text-primary underline-offset-8 hover:underline"
          >
            {secondaryCtaLabel} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
