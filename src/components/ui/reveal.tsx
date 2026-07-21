import { motion, type HTMLMotionProps } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

/**
 * @ployComponent
 * @ployComponentId reveal
 * @ployComponentType component
 * @ployComponentPattern motion-reveal
 * @ployComponentDescription Slow, restrained vertical entrance reveal used by the light editorial MSDO pages. Keeps critical content visible before activation, respects reduced motion, and avoids blank sections during fast scrolling or automated capture.
 * @ployComponentTags motion reveal editorial
 * @ployComponentStatus stable
 */
export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -18% 0px" }}
      transition={{ duration: 1.25, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
