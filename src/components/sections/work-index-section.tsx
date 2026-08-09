import { ArrowUpRight } from "lucide-react";
import { VISIBLE_PROJECTS, type Project } from "@/lib/projects";
import { Reveal } from "@/components/ui/reveal";

/**
 * @ployComponent
 * @ployComponentId work-index-section
 * @ployComponentType section
 * @ployComponentPattern editorial-project-grid
 * @ployComponentDescription Uniform editorial portfolio grid using the real MSDO project imagery. Every project uses the same card width while preserving each source image’s natural proportions, with soft 12px corners, restrained metadata, and slow image reveals.
 * @ployComponentTags work portfolio light editorial imagery
 * @ployComponentStatus stable
 */
interface WorkIndexSectionProps {
  heading?: string;
  projects?: Project[];
}

export default function WorkIndexSection({ heading = "Selected work", projects = VISIBLE_PROJECTS }: WorkIndexSectionProps) {
  return (
    <section id="work" className="work scroll-mt-20 bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
      <div className="work__inner mx-auto max-w-[92rem]">
        <Reveal className="work__head mb-12 flex items-end justify-between sm:mb-16">
          <div>
            <p className="work__eyebrow mb-3 text-sm text-ploy-text-secondary">Portfolio</p>
            <h2 className="work__title font-heading text-4xl font-semibold tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>
          </div>
          <span className="work__count hidden text-sm text-ploy-text-secondary sm:block">{String(projects.length).padStart(2, "0")} projects</span>
        </Reveal>

        <div className="work__grid grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {projects.map((project, index) => {
            return (
              <Reveal key={`${project.name}-${index}`} className="work__item">
                <a href={project.href} className="work__card group block">
                  <div className="work__media overflow-hidden rounded-xl bg-ploy-background-secondary">
                    <img src={project.image} alt={`${project.name} project preview`} className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]" loading={index > 2 ? "lazy" : "eager"} />
                  </div>
                  <div className="work__meta mt-4 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="work__name font-heading text-xl font-semibold tracking-[-0.025em] text-ploy-text-primary sm:text-2xl">{project.name}</h3>
                      <p className="work__tags mt-1 text-sm text-ploy-text-secondary">{project.tags.join(" · ")}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ploy-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
