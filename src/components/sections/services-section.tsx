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
interface Service { name: string; titleLines?: [string, string]; description: string; }
interface ServicesSectionProps { heading?: string; services?: Service[]; }

const DEFAULT_SERVICES: Service[] = [
  {
    name: "AI Transformation Product Strategy",
    titleLines: ["AI Transformation", "Product Strategy"],
    description: "Audit key business workflows, identify where AI creates value, and turn it into an actionable roadmap.",
  },
  {
    name: "Rapid Prototyping & User Research",
    titleLines: ["Rapid Prototyping &", "User Research"],
    description: "Concept and build working prototypes, test them with real users, and use the learnings to build what matters.",
  },
  {
    name: "AI-Driven Product Design",
    titleLines: ["AI-Driven", "Product Design"],
    description: "Design, build, and ship AI-native product experiences for web, mobile, and data-driven platforms.",
  },
  {
    name: "AI-First Process & Design Systems",
    titleLines: ["AI-First Process &", "Design Systems"],
    description: "Build scalable design systems and help your team adopt AI-first design processes.",
  },
];

export default function ServicesSection({ heading = "From AI opportunity to working product.", services = DEFAULT_SERVICES }: ServicesSectionProps) {
  return (
    <section id="services" className="services scroll-mt-20 bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
      <div className="services__inner mx-auto max-w-[92rem]">
        <Reveal className="services__head mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="services__eyebrow mb-3 text-sm text-ploy-text-secondary">Services</p>
            <h2 className="services__title max-w-[14ch] font-heading text-4xl font-semibold leading-[1] tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>
          </div>
          <p className="services__intro max-w-lg text-base leading-relaxed text-ploy-text-secondary lg:justify-self-end">MSDO helps teams find the right AI opportunities, test them with users, design and build the product, and adopt AI-first design processes.</p>
        </Reveal>
        <div className="services__grid grid gap-3 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.name} delay={index * 0.04}>
              <div className="services__card flex min-h-72 flex-col justify-between rounded-xl bg-ploy-background-secondary p-6 sm:p-8">
                <span className="text-sm text-ploy-text-secondary">0{index + 1}</span>
                <div>
                  <h3 className="services__name min-h-[2.1em] max-w-[18ch] font-heading text-2xl font-semibold leading-[1.05] tracking-[-0.03em] text-ploy-text-primary sm:text-3xl">
                    {service.titleLines ? service.titleLines.map((line) => <span key={line} className="block">{line}</span>) : service.name}
                  </h3>
                  <p className="services__desc mt-4 max-w-[48ch] text-base leading-relaxed text-ploy-text-secondary sm:min-h-[3.25rem]">{service.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
