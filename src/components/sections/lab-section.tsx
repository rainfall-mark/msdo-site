import { ArrowUpRight } from "lucide-react";
import { LAB_PROJECTS, type LabProject } from "@/lib/lab";
import { Reveal } from "@/components/ui/reveal";

/**
 * @ployComponent
 * @ployComponentId lab-section
 * @ployComponentType section
 * @ployComponentPattern editorial-project-grid
 * @ployComponentDescription MSDO Lab: a grid of AI-native experiments, three per row, with uniform 16:10 thumbnails, matching the Work grid's card treatment, Each card links to the experiment's page. Sits between Work and About on the homepage.
 * @ployComponentTags lab experiments ai portfolio light editorial
 * @ployComponentStatus stable
 */
interface LabSectionProps {
  eyebrow?: string;
  heading?: string;
  projects?: LabProject[];
}

export default function LabSection({
  eyebrow = "Lab",
  heading = "AI-native experiments",
  projects = LAB_PROJECTS,
}: LabSectionProps) {
  if (!projects.length) return null;

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
                <div className="lab__media relative aspect-[16/10] overflow-hidden rounded-xl bg-ploy-background-secondary">
                  <img src={project.image} alt={`${project.name} preview`} className="block h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]" loading="lazy" decoding="async" />
                  {project.description ? (
                    <div className="lab__overlay absolute inset-0 flex items-center justify-center bg-black/70 px-8 text-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                      <p className="lab__description max-w-[24ch] font-heading text-lg font-medium leading-snug tracking-[-0.015em] text-white lg:text-xl">{project.description}</p>
                    </div>
                  ) : null}
                </div>
                <div className="lab__meta mt-4 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="lab__name font-heading text-xl font-semibold tracking-[-0.025em] text-ploy-text-primary sm:text-2xl">{project.name}</h3>
                    <p className="lab__tags mt-1 text-sm text-ploy-text-secondary">{project.tags.join(" · ")}</p>
                    {/* Touch screens have no hover, so the line stays under the tags there. */}
                    {project.description ? <p aria-hidden="true" className="lab__description-touch mt-2 hidden text-sm text-ploy-text-primary [@media(hover:none)]:block">{project.description}</p> : null}
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
