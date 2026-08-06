import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useFinePointer } from "@/hooks/use-fine-pointer";

/** Elements that should make the cursor react, in priority order. */
const TARGETS = "[data-cursor],a,button,[role='button'],input,textarea,summary";

/**
 * Two-part cursor: a dot that tracks the pointer exactly, and a ring that
 * lags behind on a spring. Both use `mix-blend-mode: difference`, so they
 * invert against whatever they happen to be over and stay legible in either
 * theme without needing to know the background.
 *
 * Any element can annotate the cursor with `data-cursor="open"` — the verb
 * gets printed next to the ring.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 460, damping: 38, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 460, damping: 38, mass: 0.4 });

  const [label, setLabel] = useState<string | null>(null);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  // Only hide the native cursor once this component is actually mounted and
  // running, so a JS error can never leave the page with no pointer at all.
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    return () => root.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement | null)?.closest?.(TARGETS) as
        | HTMLElement
        | null;
      setHot(Boolean(target));
      setLabel(target?.dataset.cursor || null);
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200]"
      style={{ mixBlendMode: "difference" }}
    >
      {/* Exact-tracking dot */}
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-white"
        style={{ x, y, width: 5, height: 5, translateX: -2.5, translateY: -2.5 }}
        animate={{ opacity: visible ? (hot ? 0 : 1) : 0 }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing ring */}
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-white"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hot ? 46 : 24,
          height: hot ? 46 : 24,
          opacity: visible ? 1 : 0,
          scale: down ? 0.82 : 1,
          translateX: hot ? -23 : -12,
          translateY: hot ? -23 : -12,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />

      {/* Verb printed alongside the ring, e.g. OPEN / DRAG / COPY */}
      <motion.div
        className="absolute left-0 top-0 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-white"
        style={{ x: ringX, y: ringY, translateX: 30, translateY: 16 }}
        animate={{ opacity: label && visible ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      >
        {label}
      </motion.div>
    </div>
  );
}
