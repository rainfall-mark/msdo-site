import { motion, type HTMLMotionProps } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

/**
 * @ployComponent
 * @ployComponentId reveal
 * @ployComponentType component
 * @ployComponentPattern motion-reveal
 * @ployComponentDescription Slow, restrained scroll-triggered fade and vertical entrance reveal used below the fold across MSDO editorial pages. Respects reduced motion and activates only as content moves comfortably into view.
 * @ployComponentTags motion reveal editorial
 * @ployComponentStatus stable
 */
export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -25% 0px" }}
      transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
