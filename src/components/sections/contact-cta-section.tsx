import { CONTACT_HREF } from "@/lib/projects";

/**
 * @ployComponent
 * @ployComponentId contact-cta-section
 * @ployComponentType section
 * @ployComponentPattern cta
 * @ployComponentDescription Closing contact CTA. Oversized grotesk headline on near-black with a single cobalt "Start a project" pill, returning to the preserved msdo.us contact destination. Dark theme. Built for the 2026 redesign.
 * @ployComponentTags cta contact studio dark
 * @ployComponentStatus stable
 */
interface ContactCtaSectionProps {
  heading?: string;
  ctaLabel?: string;
  href?: string;
}

export default function ContactCtaSection({
  heading = "Have an ambitious idea? Let's build it.",
  ctaLabel = "Start a project",
  href = CONTACT_HREF,
}: ContactCtaSectionProps) {
  return (
    <section className="contact border-t border-ploy-border-primary bg-ploy-background-primary px-5 py-28 sm:px-8 sm:py-40">
      <div className="contact__inner mx-auto max-w-[90rem] text-center">
        <h2 className="contact__title mx-auto max-w-[20ch] font-heading text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-tight text-balance text-ploy-text-primary">
          {heading}
        </h2>
        <a
          href={href}
          className="contact__cta mt-12 inline-flex items-center rounded-full bg-ploy-accent-primary px-9 py-4 text-lg font-semibold text-ploy-text-on-accent-primary transition-opacity hover:opacity-90"
        >
          {ctaLabel} →
        </a>
      </div>
    </section>
  );
}
