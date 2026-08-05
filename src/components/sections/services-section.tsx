import { Reveal } from "@/components/ui/reveal";

/**
 * @ployComponent
 * @ployComponentId services-section
 * @ployComponentType section
 * @ployComponentPattern service-cards
 * @ployComponentDescription Compact two-column service cards on a soft neutral field, pairing clear AI product consulting offers with rounded 12px surfaces.
 * @ployComponentTags services studio light cards
 * @ployComponentStatus stable
 */
interface Service { name: string; description: string; }
interface ServicesSectionProps { heading?: string; services?: Service[]; }

const DEFAULT_SERVICES: Service[] = [
  {
    name: "AI-driven Product Strategy",
    description: "Turn emerging AI capabilities into a focused product vision, prioritized use cases, and a practical roadmap aligned with user, operational, and business goals.",
  },
  {
    name: "UI/UX Design",
    description: "Design clear, trustworthy interfaces and workflows for AI-powered web, mobile, and internal tools—from early concepts through production-ready UX and UI.",
  },
  {
    name: "Rapid Prototyping & User Research",
    description: "Prototype with AI-native tools, test critical assumptions with users, and turn evidence into faster product and engineering decisions.",
  },
  {
    name: "AI-Native Design Systems",
    description: "Create agent-centric design systems, reusable patterns, and workflows that help human and AI teams design, build, and maintain products consistently.",
  },
];

export default function ServicesSection({ heading = "From AI opportunity to working product.", services = DEFAULT_SERVICES }: ServicesSectionProps) {
  return (
    <section id="services" className="services scroll-mt-20 bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
      <div className="services__inner mx-auto max-w-[92rem]">
        <Reveal className="services__head mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="services__eyebrow mb-3 text-sm text-ploy-text-secondary">Services / 02</p>
            <h2 className="services__title max-w-[14ch] font-heading text-4xl font-semibold leading-[1] tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>
          </div>
          <p className="services__intro max-w-lg text-base leading-relaxed text-ploy-text-secondary lg:justify-self-end">MSDO helps teams identify where AI creates real value, shape the right experience, and establish the systems and workflows needed to move from exploration to production.</p>
        </Reveal>
        <div className="services__grid grid gap-3 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.name} delay={index * 0.04}>
              <div className="services__card flex min-h-72 flex-col justify-between rounded-xl bg-ploy-background-secondary p-6 sm:p-8">
                <span className="text-sm text-ploy-text-secondary">0{index + 1}</span>
                <div>
                  <h3 className="services__name max-w-[18ch] font-heading text-2xl font-semibold tracking-[-0.03em] text-ploy-text-primary sm:text-3xl">{service.name}</h3>
                  <p className="services__desc mt-4 max-w-lg text-base leading-relaxed text-ploy-text-secondary">{service.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
