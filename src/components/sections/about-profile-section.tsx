import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface AboutProfileSectionProps { portrait: string; paragraphs: readonly string[]; linkedInHref: string; heading?: string; id?: string; }

/**
 * @ployComponent
 * @ployComponentId about-profile-section
 * @ployComponentType section
 * @ployComponentPattern profile
 * @ployComponentDescription Editorial founder profile section with optional section heading and anchor, large rounded portrait, verbatim biography copy, and external full-bio link. Reusable on the homepage and About page.
 * @ployComponentTags about profile founder biography editorial
 * @ployComponentStatus stable
 */
export default function AboutProfileSection({ portrait, paragraphs, linkedInHref, heading, id }: AboutProfileSectionProps) {
  return (
    <section id={id} className="about-profile scroll-mt-20 bg-ploy-background-primary px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32 lg:px-10 lg:pb-40 lg:pt-40">
      <div className="mx-auto max-w-[92rem]">
        {heading && <Reveal className="mb-12 sm:mb-16"><p className="mb-3 text-sm text-ploy-text-secondary">Studio</p><h2 className="font-heading text-4xl font-semibold tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2></Reveal>}
        <Reveal><div className="overflow-hidden rounded-xl bg-ploy-background-secondary"><img src={portrait} alt="Mark Strehlow, Founder and Principal of MSDO" className="aspect-[900/710] h-auto w-full object-cover" /></div></Reveal>
        <Reveal className="mt-16 grid gap-10 border-t border-ploy-border-primary pt-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <p className="text-sm text-ploy-text-secondary">Mark Strehlow / Founder & Principal</p>
          <div className="max-w-3xl space-y-6">{paragraphs.map((paragraph, index) => <p key={index} className={`${index === 0 ? "font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-ploy-text-primary sm:text-4xl" : "text-lg leading-relaxed text-ploy-text-secondary"}`}>{paragraph}</p>)}<a href={linkedInHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 pt-4 text-lg font-medium text-ploy-text-primary">Full bio <ArrowUpRight className="h-5 w-5" /></a></div>
        </Reveal>
      </div>
    </section>
  );
}
