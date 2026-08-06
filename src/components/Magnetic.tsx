import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useFinePointer } from "@/hooks/use-fine-pointer";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to travel toward the pointer, in px. */
  strength?: number;
}

/**
 * Pulls its child toward the pointer while the pointer is inside it, then
 * springs back on exit. Applied to the primary calls to action so the things
 * you are meant to click feel like they want to be clicked.
 */
export function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const active = fine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.3 });

  const onMove = (e: React.PointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // Offset from the element's centre, normalised to -1..1, then scaled.
    x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength);
    y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={active ? { x: sx, y: sy } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
