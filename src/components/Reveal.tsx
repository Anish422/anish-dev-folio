import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Edge the wipe travels from. */
  from?: "left" | "right" | "bottom";
}

/** All four values carry units so Framer can interpolate them cleanly. */
const HIDDEN = {
  left: { clipPath: "inset(0% 100% 0% 0%)", y: 8 },
  right: { clipPath: "inset(0% 0% 0% 100%)", y: 8 },
  bottom: { clipPath: "inset(100% 0% 0% 0%)", y: 16 },
} as const;

const SHOWN = { clipPath: "inset(0% 0% 0% 0%)", y: 0 };

/**
 * Scroll-in transition for the whole site: content is uncovered like a printed
 * sheet sliding out, rather than the usual fade-and-rise.
 *
 * The visibility check deliberately runs on an *outer, unclipped* wrapper.
 * Chrome computes an IntersectionObserver's rect after applying clip-path, so
 * observing the clipped element itself would mean an element hidden by
 * `inset(… 100% …)` has zero intersection area and can never trigger the
 * animation that would reveal it. Splitting the two roles breaks that deadlock.
 */
export function Reveal({ children, className, delay = 0, from = "left" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={HIDDEN[from]}
        animate={inView ? SHOWN : HIDDEN[from]}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
