/**
 * @ployComponent
 * @ployComponentId case-study-media-section
 * @ployComponentType section
 * @ployComponentPattern media
 * @ployComponentDescription Full-bleed case-study imagery band for MSDO project pages. Renders one large framed feature image or a set of framed image tiles (hairline border, rounded corners, near-black surface) with optional eyebrow heading and per-image captions. Reuses the site's existing project thumbnails / brand visuals rather than stock imagery. Dark theme. Built for the 2026 redesign.
 * @ployComponentTags case-study media imagery gallery studio dark
 * @ployComponentStatus stable
 */
export interface CaseStudyMediaItem {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
}

interface CaseStudyMediaSectionProps {
  label?: string;
  heading?: string;
  items?: CaseStudyMediaItem[];
  columns?: 1 | 2;
}

export default function CaseStudyMediaSection({
  label,
  heading,
  items = [],
  columns = 2,
}: CaseStudyMediaSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="cs-media border-t border-ploy-border-primary bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32">
      <div className="cs-media__inner mx-auto max-w-[90rem]">
        {(label || heading) && (
          <div className="cs-media__head mb-12 max-w-3xl">
            {label && (
              <p className="cs-media__label font-eyebrow text-sm uppercase tracking-widest text-ploy-accent-primary">
                {label}
              </p>
            )}
            {heading && (
              <h2 className="cs-media__heading mt-4 font-heading text-3xl font-extrabold tracking-tight text-ploy-text-primary sm:text-5xl">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div
          className={`cs-media__grid grid grid-cols-1 gap-6 sm:gap-8 ${
            columns === 2 ? "md:grid-cols-2" : ""
          }`}
        >
          {items.map((item) => (
            <figure key={item.src} className="cs-media__figure">
              <div
                className={`cs-media__frame overflow-hidden rounded-lg border border-ploy-border-primary bg-ploy-neutral-secondary ${
                  item.aspect ?? "aspect-[16/10]"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="cs-media__img h-full w-full object-cover"
                />
              </div>
              {item.caption && (
                <figcaption className="cs-media__caption mt-4 text-sm leading-relaxed text-ploy-text-secondary">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
