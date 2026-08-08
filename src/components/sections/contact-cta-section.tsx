import { CONTACT_HREF } from "@/lib/projects";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

/**
 * @ployComponent
 * @ployComponentId contact-cta-section
 * @ployComponentType section
 * @ployComponentPattern cta
 * @ployComponentDescription Quiet editorial closing CTA with an oversized statement, black pill action, soft neutral rounded surface, and preserved contact destination.
 * @ployComponentTags cta contact studio light
 * @ployComponentStatus stable
 */
interface ContactCtaSectionProps { heading?: ReactNode; ctaLabel?: string; href?: string; }

const DEFAULT_HEADING = (
  <>
    <span className="block whitespace-nowrap">Have an ambitious idea?</span>
    <span className="block whitespace-nowrap">Let&apos;s make it real.</span>
  </>
);

export default function ContactCtaSection({ heading = DEFAULT_HEADING, ctaLabel = "Let's talk", href = CONTACT_HREF }: ContactCtaSectionProps) {
  return (
    <section className="contact bg-ploy-background-primary px-5 py-10 sm:px-8 lg:px-10">
      <Reveal className="contact__inner mx-auto flex min-h-[70vh] max-w-[92rem] flex-col items-center justify-center rounded-xl bg-ploy-background-secondary px-6 py-24 text-center sm:px-10">
        <h2 className="contact__title font-heading text-[clamp(1.75rem,7vw,7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-ploy-text-primary">{heading}</h2>
        <a href={href} className="contact__cta mt-10 inline-flex min-h-[4.125rem] items-center rounded-full bg-ploy-button-primary-background px-9 text-xl font-medium text-ploy-button-primary-text transition-transform duration-300 hover:scale-[1.03]">{ctaLabel}</a>
      </Reveal>
    </section>
  );
}
