import { ArrowUpRight } from "lucide-react";
import { LAB_PROJECTS, type LabProject } from "@/lib/lab";
import { Reveal } from "@/components/ui/reveal";

/**
 * @ployComponent
 * @ployComponentId lab-section
 * @ployComponentType section
 * @ployComponentPattern editorial-project-list
 * @ployComponentDescription MSDO Lab: recent AI-driven builds, each with a screenshot, a Challenge / Solution / How AI helped breakdown, and a link to a working demo. Sits between Work and About on the homepage.
 * @ployComponentTags lab experiments ai demos light editorial
 * @ployComponentStatus stable
 */
interface LabSectionProps {
  heading?: string;
  intro?: string;
  projects?: LabProject[];
}

export default function LabSection({
  heading = "Built with AI.",
  intro = "Working tools I've designed and built with AI as the core, not a feature. Each one is live, so you can try it rather than read about it.",
  projects = LAB_PROJECTS,
}: LabSectionProps) {
  if (!projects.length) return null;

  return (
    <section id="lab" className="lab scroll-mt-20 bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
      <div className="lab__inner mx-auto max-w-[92rem]">
        <Reveal className="lab__head mb-12 grid gap-6 sm:mb-16 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="lab__eyebrow mb-3 text-sm text-ploy-text-secondary">Lab</p>
            <h2 className="lab__title font-heading text-4xl font-semibold leading-[1] tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>
          </div>
          <p className="lab__intro max-w-lg text-base leading-relaxed text-ploy-text-secondary lg:justify-self-end">{intro}</p>
        </Reveal>

        <div className="lab__list space-y-20 sm:space-y-28">
          {projects.map((project, index) => (
            <Reveal key={project.slug}>
              <LabItem project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const NOTES: { key: "challenge" | "solution" | "aiRole"; label: string }[] = [
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "aiRole", label: "How AI helped" },
];

function LabItem({ project, index }: { project: LabProject; index: number }) {
  const demo = project.demo;
  const isExternal = demo ? /^https?:\/\//.test(demo.href) : false;

  const media = (
    <div className="lab__media relative aspect-[16/10] overflow-hidden rounded-xl bg-ploy-background-secondary">
      {project.image ? (
        <img
          src={project.image}
          alt={project.imageAlt ?? `${project.name} screenshot`}
          className="block h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="flex h-full w-full items-end p-6 sm:p-8" aria-hidden="true">
          <span className="font-heading text-3xl font-semibold tracking-[-0.04em] text-ploy-text-secondary/60 sm:text-5xl">{project.name}</span>
        </div>
      )}
    </div>
  );

  return (
    <article className="lab__item grid gap-8 border-t border-ploy-border-primary pt-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
      {demo ? (
        <a href={demo.href} target="_blank" rel="noreferrer" className="group block" aria-label={`Open the ${project.name} demo`}>
          {media}
        </a>
      ) : (
        media
      )}

      <div className="lab__body flex flex-col">
        <span className="text-sm text-ploy-text-secondary">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="lab__name mt-3 font-heading text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-ploy-text-primary sm:text-4xl">{project.name}</h3>
        <p className="lab__tags mt-2 text-sm text-ploy-text-secondary">{project.tags.join(" · ")}</p>

        <dl className="lab__notes mt-8 space-y-6">
          {NOTES.map(({ key, label }) => (
            <div key={key}>
              <dt className="text-sm font-medium text-ploy-text-primary">{label}</dt>
              <dd className="mt-1.5 max-w-[52ch] text-base leading-relaxed text-ploy-text-secondary">{project[key]}</dd>
            </div>
          ))}
        </dl>

        {demo && (
          <a
            href={demo.href}
            target="_blank"
            rel="noreferrer"
            className="lab__cta mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-ploy-button-primary-background px-5 text-base font-medium text-ploy-button-primary-text transition-transform duration-300 hover:scale-[1.03]"
          >
            {demo.label ?? "Try the demo"}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            {isExternal && <span className="sr-only">(opens in a new tab)</span>}
          </a>
        )}
      </div>
    </article>
  );
}
