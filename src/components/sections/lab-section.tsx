import { ArrowUpRight, Plus } from "lucide-react";
import { LAB_PROJECTS, type LabProject } from "@/lib/lab";
import { Reveal } from "@/components/ui/reveal";

/**
 * @ployComponent
 * @ployComponentId lab-section
 * @ployComponentType section
 * @ployComponentPattern editorial-project-grid
 * @ployComponentDescription MSDO Lab: a single row of AI-native experiments with uniform 16:10 thumbnails, matching the Work grid's card treatment, followed by a quiet "more coming soon" placeholder that fills the rest of the row. Each card links to the experiment's page. Sits between Work and About on the homepage.
 * @ployComponentTags lab experiments ai portfolio light editorial
 * @ployComponentStatus stable
 */
interface LabSectionProps {
  eyebrow?: string;
  heading?: string;
  comingSoon?: { title: string; note: string } | null;
  projects?: LabProject[];
}

const COLUMNS = 3;
const SPAN_CLASS: Record<number, string> = { 1: "", 2: "md:col-span-2", 3: "md:col-span-3" };
const COLS_CLASS: Record<number, string> = { 1: "", 2: "md:grid-cols-2", 3: "md:grid-cols-3" };

export default function LabSection({
  eyebrow = "Lab",
  heading = "AI-native experiments",
  comingSoon = { title: "More coming soon", note: "New AI-native experiments in the works" },
  projects = LAB_PROJECTS,
}: LabSectionProps) {
  if (!projects.length && !comingSoon) return null;
  // The placeholder fills whatever is left of the row (a full column on its own if the row is full).
  const remainder = projects.length % COLUMNS;
  const span = remainder === 0 ? 1 : COLUMNS - remainder;

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
            <Reveal delay={projects.length * 0.06} className={`lab__soon ${SPAN_CLASS[span]}`}>
              <div className="relative overflow-hidden rounded-xl border border-dashed border-ploy-border-primary">
                {/* Sized by invisible 16:10 cells so its height matches the cards beside it exactly. */}
                <div className={`grid gap-x-5 ${COLS_CLASS[span]}`} aria-hidden="true">
                  {Array.from({ length: span }, (_, cell) => (
                    <div key={cell} className={`aspect-[16/10] ${cell > 0 ? "hidden md:block" : ""}`} />
                  ))}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ploy-background-secondary text-ploy-text-secondary">
                    <Plus className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="font-heading text-2xl font-semibold tracking-[-0.03em] text-ploy-text-primary sm:text-3xl">{comingSoon.title}</p>
                </div>
              </div>
              <p className="lab__soon-note mt-4 text-sm text-ploy-text-secondary">{comingSoon.note}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
