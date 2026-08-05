import { Reveal } from "@/components/ui/reveal";

export interface CaseStudyMediaItem { src: string; alt: string; caption?: string; }
interface CaseStudyMediaSectionProps { label?: string; heading?: string; items?: CaseStudyMediaItem[]; }

/**
 * @ployComponent
 * @ployComponentId case-study-media-section
 * @ployComponentType section
 * @ployComponentPattern media
 * @ployComponentDescription Immersive single-column project-media section that presents each image at its natural aspect ratio in a wide, uninterrupted scrolling sequence with optional captions.
 * @ployComponentTags case-study media imagery gallery studio editorial
 * @ployComponentStatus stable
 */
export default function CaseStudyMediaSection({ label, heading, items = [] }: CaseStudyMediaSectionProps) {
  if (!items.length) return null;

  return (
    <section className="cs-media bg-ploy-background-primary py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-10">
        {(label || heading) && (
          <Reveal className="mb-10 max-w-3xl">
            {label && <p className="text-sm text-ploy-text-secondary">{label}</p>}
            {heading && <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>}
          </Reveal>
        )}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
          {items.map((item, index) => (
            <Reveal key={`${item.src}-${index}`}>
              <figure>
                <img src={item.src} alt={item.alt} loading="lazy" className="block h-auto w-full" />
                {item.caption && <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-ploy-text-secondary">{item.caption}</figcaption>}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
