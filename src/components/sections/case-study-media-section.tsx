import { Reveal } from "@/components/ui/reveal";

export interface CaseStudyMediaItem { src: string; alt: string; caption?: string; }
export interface CaseStudyMediaGroup { heading: string; description?: string; items: CaseStudyMediaItem[]; }
interface CaseStudyMediaSectionProps { label?: string; heading?: string; items?: CaseStudyMediaItem[]; groups?: CaseStudyMediaGroup[]; }

/**
 * @ployComponent
 * @ployComponentId case-study-media-section
 * @ployComponentType section
 * @ployComponentPattern media
 * @ployComponentDescription Natural-height project-media section that supports one continuous image stack or titled media chapters with short descriptions, responsive columns, and no artificial framing.
 * @ployComponentTags case-study media imagery gallery studio editorial
 * @ployComponentStatus stable
 */
export default function CaseStudyMediaSection({ label, heading, items = [], groups = [] }: CaseStudyMediaSectionProps) {
  if (!items.length && !groups.length) return null;

  const renderItems = (mediaItems: CaseStudyMediaItem[]) => (
    <div className={mediaItems.length > 1 ? "columns-1 gap-5 md:columns-2 lg:gap-8" : ""}>
      {mediaItems.map((item, index) => (
        <Reveal key={`${item.src}-${index}`} className={mediaItems.length > 1 ? "mb-12 break-inside-avoid sm:mb-16 lg:mb-20" : ""}>
          <figure>
            <img src={item.src} alt={item.alt} loading="lazy" className="block h-auto w-full rounded-xl" />
            {item.caption && <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-ploy-text-secondary">{item.caption}</figcaption>}
          </figure>
        </Reveal>
      ))}
    </div>
  );

  return (
    <section className="cs-media bg-ploy-background-primary py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-10">
        {(label || heading) && (
          <Reveal className="mb-10 max-w-3xl">
            {label && <p className="text-sm text-ploy-text-secondary">{label}</p>}
            {heading && <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>}
          </Reveal>
        )}

        {groups.length > 0 ? (
          <div className="space-y-24 sm:space-y-32 lg:space-y-40">
            {groups.map((group) => (
              <div key={group.heading}>
                <Reveal className="mb-8 grid gap-4 border-t border-ploy-border-primary pt-6 md:grid-cols-[.8fr_1.2fr] md:gap-12">
                  <h2 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-ploy-text-primary sm:text-4xl">{group.heading}</h2>
                  {group.description && <p className="max-w-xl text-base leading-relaxed text-ploy-text-secondary md:justify-self-end">{group.description}</p>}
                </Reveal>
                {renderItems(group.items)}
              </div>
            ))}
          </div>
        ) : renderItems(items)}
      </div>
    </section>
  );
}
