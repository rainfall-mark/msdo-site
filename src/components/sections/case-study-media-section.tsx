import { Reveal } from "@/components/ui/reveal";

export interface CaseStudyMediaItem { src: string; alt: string; caption?: string; aspect?: string; fit?: "cover" | "contain"; }
interface CaseStudyMediaSectionProps { label?: string; heading?: string; items?: CaseStudyMediaItem[]; columns?: 1 | 2; }

/**
 * @ployComponent
 * @ployComponentId case-study-media-section
 * @ployComponentType section
 * @ployComponentPattern media
 * @ployComponentDescription Large editorial project-media section for one or two columns. Supports full screenshots with contain fitting, image captions, soft 12px frames, lazy loading, and restrained reveals.
 * @ployComponentTags case-study media imagery gallery studio editorial
 * @ployComponentStatus stable
 */
export default function CaseStudyMediaSection({ label, heading, items = [], columns = 1 }: CaseStudyMediaSectionProps) {
  if (!items.length) return null;
  return (
    <section className="cs-media bg-ploy-background-primary px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[92rem]">
        {(label || heading) && <Reveal className="mb-10 max-w-3xl">{label && <p className="text-sm text-ploy-text-secondary">{label}</p>}{heading && <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>}</Reveal>}
        <div className={`grid grid-cols-1 gap-5 sm:gap-8 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
          {items.map((item, index) => <Reveal key={`${item.src}-${index}`}><figure><div className={`overflow-hidden rounded-xl bg-ploy-background-secondary ${item.aspect ?? "aspect-[16/10]"}`}><img src={item.src} alt={item.alt} loading="lazy" className={`h-full w-full ${item.fit === "contain" ? "object-contain" : "object-cover"}`} /></div>{item.caption && <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-ploy-text-secondary">{item.caption}</figcaption>}</figure></Reveal>)}
        </div>
      </div>
    </section>
  );
}
