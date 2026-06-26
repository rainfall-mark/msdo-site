import { motion } from "motion/react";

/**
 * @ployComponent
 * @ployComponentId marquee-section
 * @ployComponentType section
 * @ployComponentPattern marquee
 * @ployComponentDescription Full-bleed horizontally scrolling marquee of oversized grotesk text (e.g. "MARK STREHLOW — MSDO — APPLIED AI PRODUCT DESIGN"). Uses motion/react for a seamless infinite loop; the text is visible in the DOM before hydration. Signature dynamic moment of the 2026 dark redesign.
 * @ployComponentTags marquee studio dark motion
 * @ployComponentStatus stable
 */
interface MarqueeSectionProps {
  items?: string[];
}

const DEFAULT_ITEMS = [
  "Mark Strehlow",
  "MSDO",
  "Applied AI Product Design",
  "Strategy",
  "UX",
];

export default function MarqueeSection({ items = DEFAULT_ITEMS }: MarqueeSectionProps) {
  // Duplicated track so the -50% translate loops seamlessly.
  const track = [...items, ...items];
  return (
    <section className="marquee overflow-hidden border-y border-ploy-border-primary bg-ploy-background-primary py-8">
      <motion.div
        className="marquee__track flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="marquee__item flex items-center gap-10 font-heading text-[clamp(3rem,9vw,8rem)] font-extrabold uppercase leading-none tracking-tight text-ploy-text-primary"
          >
            {item}
            <span className="marquee__dot text-ploy-accent-primary">—</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
