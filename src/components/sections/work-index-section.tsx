import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PROJECTS, type Project } from "@/lib/projects";

/**
 * @ployComponent
 * @ployComponentId work-index-section
 * @ployComponentType section
 * @ployComponentPattern work-index
 * @ployComponentDescription Signature full-screen work index. On desktop, projects render as oversized grotesk rows; hovering a row floats that project's thumbnail preview next to the cursor (motion/react). On mobile it gracefully becomes a stacked image-card grid (hover preview hidden). Project names/links remain in the DOM pre-hydration. Data comes from src/lib/projects. Built for the 2026 dark redesign.
 * @ployComponentTags work portfolio hover-reveal studio dark
 * @ployComponentStatus stable
 */
interface WorkIndexSectionProps {
  heading?: string;
  projects?: Project[];
}

export default function WorkIndexSection({
  heading = "Selected work",
  projects = PROJECTS,
}: WorkIndexSectionProps) {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="work"
      className="work scroll-mt-16 bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="work__inner mx-auto max-w-[90rem]">
        <div className="work__head mb-10 flex items-end justify-between">
          <h2 className="work__title font-heading text-4xl font-extrabold tracking-tight text-ploy-text-primary sm:text-5xl">
            {heading}
          </h2>
          <span className="work__count hidden text-sm text-ploy-text-secondary sm:block">
            {projects.length} projects
          </span>
        </div>

        {/* Desktop: hover-reveal list */}
        <div
          ref={containerRef}
          onMouseMove={handleMove}
          className="work__list relative hidden border-t border-ploy-border-primary md:block"
        >
          {projects.map((project, i) => (
            <a
              key={project.name}
              href={project.href}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="work__row group flex items-center justify-between border-b border-ploy-border-primary py-6 transition-colors"
            >
              <span
                className={`work__name font-heading text-[clamp(2rem,4.5vw,4rem)] font-extrabold uppercase leading-none tracking-tight transition-colors duration-300 ${
                  active === i
                    ? "text-ploy-text-primary"
                    : active === null
                      ? "text-ploy-text-primary"
                      : "text-ploy-neutral-inverse-700"
                }`}
              >
                {project.name}
              </span>
              <span className="work__tags ml-6 hidden shrink-0 text-sm text-ploy-text-secondary lg:block">
                {project.tags.join(" · ")}
              </span>
            </a>
          ))}

          <AnimatePresence>
            {active !== null && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{ left: pos.x, top: pos.y }}
                className="work__preview pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <img
                  src={projects[active].image}
                  alt={projects[active].name}
                  className="work__preview-img h-56 w-80 rounded-lg border border-ploy-border-primary object-cover shadow-2xl"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: image-card grid */}
        <div className="work__grid grid grid-cols-1 gap-6 sm:grid-cols-2 md:hidden">
          {projects.map((project) => (
            <a key={project.name} href={project.href} className="work__card group block">
              <div className="work__card-media aspect-[218/146] overflow-hidden rounded-lg border border-ploy-border-primary bg-ploy-neutral-secondary">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="work__card-title mt-3 font-heading text-xl font-bold uppercase tracking-tight text-ploy-text-primary">
                {project.name}
              </h3>
              <p className="work__card-tags mt-1 text-sm text-ploy-text-secondary">
                {project.tags.join(" · ")}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
