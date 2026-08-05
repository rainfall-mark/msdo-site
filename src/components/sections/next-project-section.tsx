import { Reveal } from "@/components/ui/reveal";

export interface RelatedProject { name: string; href: string; tags: string[]; image: string; }
interface NextProjectSectionProps { label?: string; projects?: RelatedProject[]; indexLabel?: string; indexHref?: string; }

/**
 * @ployComponent
 * @ployComponentId next-project-section
 * @ployComponentType section
 * @ployComponentPattern work-index
 * @ployComponentDescription Light editorial related-project navigation with three landscape thumbnails, compact project metadata, and a secondary all-work link.
 * @ployComponentTags case-study next-project work-index studio editorial
 * @ployComponentStatus stable
 */
export default function NextProjectSection({ label = "More projects", projects = [], indexLabel = "All work", indexHref = "/#work" }: NextProjectSectionProps) {
  if (!projects.length) return null;

  return (
    <section className="next-project bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
      <Reveal className="mx-auto max-w-[92rem] border-t border-ploy-border-primary pt-8">
        <div className="mb-8 flex justify-between gap-6"><p className="text-sm text-ploy-text-secondary">{label}</p><a href={indexHref} className="text-sm text-ploy-text-secondary hover:text-ploy-text-primary">{indexLabel} →</a></div>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <a key={project.name} href={project.href} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-ploy-background-secondary">
                <img src={project.image} alt={`${project.name} project preview`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
              </div>
              <h2 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.03em] text-ploy-text-primary">{project.name}</h2>
              <p className="mt-1 text-sm text-ploy-text-secondary">{project.tags.join(" · ")}</p>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
