import { ArrowUpRight } from "lucide-react";
import { LAB_PROJECTS, type LabProject } from "@/lib/lab";
import { Reveal } from "@/components/ui/reveal";

/**
 * @ployComponent
 * @ployComponentId lab-section
 * @ployComponentType section
 * @ployComponentPattern editorial-project-grid
 * @ployComponentDescription MSDO Lab: a single row of AI-built projects with uniform 16:10 thumbnails, matching the Work grid's card treatment. Each card links to the project's case study. Sits between Work and About on the homepage.
 * @ployComponentTags lab experiments ai portfolio light editorial
 * @ployComponentStatus stable
 */
interface LabSectionProps {
  eyebrow?: string;
  heading?: string;
  note?: string;
  projects?: LabProject[];
}

export default function LabSection({ eyebrow = "Lab", heading = "Built with AI", note = "More coming soon", projects = LAB_PROJECTS }: LabSectionProps) {
  if (!projects.length) return null;

  return (
    <section id="lab" className="lab scroll-mt-20 bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
      <div className="lab__inner mx-auto max-w-[92rem]">
        <Reveal className="lab__head mb-12 flex items-end justify-between sm:mb-16">
          <div>
            <p className="lab__eyebrow mb-3 text-sm text-ploy-text-secondary">{eyebrow}</p>
            <h2 className="lab__title font-heading text-4xl font-semibold tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>
          </div>
          <span className="lab__count hidden text-sm text-ploy-text-secondary sm:block">
            {String(projects.length).padStart(2, "0")} projects{note ? ` · ${note}` : ""}
          </span>
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
        </div>
      </div>
    </section>
  );
}
