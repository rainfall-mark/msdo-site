import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface NextProjectSectionProps { label?: string; name?: string; href?: string; tags?: string[]; indexLabel?: string; indexHref?: string; }

/**
 * @ployComponent
 * @ployComponentId next-project-section
 * @ployComponentType section
 * @ployComponentPattern work-index
 * @ployComponentDescription Light editorial next-project navigation with large sentence-case type, compact tags, and a secondary all-work link.
 * @ployComponentTags case-study next-project work-index studio editorial
 * @ployComponentStatus stable
 */
export default function NextProjectSection({ label = "Next project", name = "Selected work", href = "/#work", tags = [], indexLabel = "All work", indexHref = "/#work" }: NextProjectSectionProps) {
  return (
    <section className="next-project bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
      <Reveal className="mx-auto max-w-[92rem] border-t border-ploy-border-primary pt-8">
        <div className="mb-8 flex justify-between"><p className="text-sm text-ploy-text-secondary">{label}</p><a href={indexHref} className="text-sm text-ploy-text-secondary hover:text-ploy-text-primary">{indexLabel} →</a></div>
        <a href={href} className="group flex items-end justify-between gap-8 border-b border-ploy-border-primary pb-8"><div><span className="font-heading text-[clamp(3rem,7vw,7rem)] font-semibold leading-[.94] tracking-[-0.055em] text-ploy-text-primary">{name}</span>{tags.length > 0 && <p className="mt-4 text-sm text-ploy-text-secondary">{tags.join(" · ")}</p>}</div><ArrowUpRight className="mb-2 h-8 w-8 shrink-0 text-ploy-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
      </Reveal>
    </section>
  );
}
