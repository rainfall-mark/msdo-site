import { ArrowUpRight } from "lucide-react";
import { LAB_PROJECTS, type LabProject } from "@/lib/lab";
import { Reveal } from "@/components/ui/reveal";

/**
 * @ployComponent
 * @ployComponentId lab-section
 * @ployComponentType section
 * @ployComponentPattern editorial-project-grid
 * @ployComponentDescription MSDO Lab: a single row of AI-native experiments with uniform 16:10 thumbnails, matching the Work grid's card treatment, followed by a quiet, non-interactive "More coming soon..." placeholder the same size as a project thumbnail. Each card links to the experiment's page. Sits between Work and About on the homepage.
 * @ployComponentTags lab experiments ai portfolio light editorial
 * @ployComponentStatus stable
 */
interface LabSectionProps {
  eyebrow?: string;
  heading?: string;
  /** Placeholder card after the projects, same size as a project card. Null hides it. */
  comingSoon?: string | null;
  projects?: LabProject[];
}

export default function LabSection({
  eyebrow = "Lab",
  heading = "AI-native experiments",
  comingSoon = "More coming soon...",
  projects = LAB_PROJECTS,
}: LabSectionProps) {
  if (!projects.length && !comingSoon) return null;

  return (
    <section id="lab" className="lab scroll-mt-20 bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
      <div className="lab__inner mx-auto max-w-[92rem]">
        <Reveal className="lab__head mb-12 sm:mb-16">
          <p className="lab__eyebrow mb-3 text-sm text-ploy-text-secondary">{eyebrow}</p>
          <h2 className="lab__title font-heading text-4xl font-semibold tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>
        </Reveal>

        <div className="lab__grid grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06} className="lab__item">
              <a href={project.href} className="lab__card group block">
                <div className="lab__media aspect-[16/10] overflow-hidden rounded-xl bg-ploy-background-secondary">
                  <img src={project.image} alt={`${project.name} preview`} className="block h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]" loading="lazy" decoding="async" />
                </div>
                <div className="lab__meta mt-4 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="lab__name font-heading text-xl font-semibold tracking-[-0.025em] text-ploy-text-primary sm:text-2xl">{project.name}</h3>
                    <p className="lab__tags mt-1 text-sm text-ploy-text-secondary">{project.tags.join(" · ")}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ploy-text-secondary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </a>
            </Reveal>
          ))}

          {comingSoon && (
            <Reveal delay={projects.length * 0.06} className="lab__soon">
              <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-ploy-border-primary p-6">
                <p className="text-sm font-bold text-ploy-text-secondary/60">{comingSoon}</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
