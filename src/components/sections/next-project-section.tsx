/**
 * @ployComponent
 * @ployComponentId next-project-section
 * @ployComponentType section
 * @ployComponentPattern work-index
 * @ployComponentDescription Closing "next project" navigation for MSDO case-study pages. A single oversized grotesk row that mirrors the work-index anatomy (hairline rule, uppercase grotesk name, tags, hover-to-accent), linking to the next project and back to the full work index. Dark theme. Built for the 2026 redesign.
 * @ployComponentTags case-study next-project work-index studio dark
 * @ployComponentStatus stable
 */
interface NextProjectSectionProps {
  label?: string;
  name?: string;
  href?: string;
  tags?: string[];
  indexLabel?: string;
  indexHref?: string;
}

export default function NextProjectSection({
  label = "Next project",
  name = "Selected work",
  href = "/#work",
  tags = [],
  indexLabel = "All work",
  indexHref = "/#work",
}: NextProjectSectionProps) {
  return (
    <section className="next-project border-t border-ploy-border-primary bg-ploy-background-primary px-5 py-20 sm:px-8 sm:py-28">
      <div className="next-project__inner mx-auto max-w-[90rem]">
        <div className="next-project__head mb-8 flex items-end justify-between">
          <p className="next-project__label font-eyebrow text-sm uppercase tracking-widest text-ploy-accent-primary">
            {label}
          </p>
          <a
            href={indexHref}
            className="next-project__index text-sm text-ploy-text-secondary transition-colors hover:text-ploy-text-primary"
          >
            {indexLabel} →
          </a>
        </div>
        <a
          href={href}
          className="next-project__row group flex items-center justify-between border-t border-b border-ploy-border-primary py-8"
        >
          <span className="next-project__name font-heading text-[clamp(2rem,5vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight text-ploy-text-primary transition-colors duration-300 group-hover:text-ploy-accent-primary">
            {name}
          </span>
          {tags.length > 0 && (
            <span className="next-project__tags ml-6 hidden shrink-0 text-sm text-ploy-text-secondary lg:block">
              {tags.join(" · ")}
            </span>
          )}
        </a>
      </div>
    </section>
  );
}
