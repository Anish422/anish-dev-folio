import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { useFinePointer } from "@/hooks/use-fine-pointer";

/**
 * The surface everything else sits on: an engineering grid that is almost
 * invisible until the pointer passes over it, plus a fixed film grain.
 *
 * The spotlight is pure CSS — a radial mask positioned from two custom
 * properties on <html>. Pointer moves only write those two variables (once
 * per frame), so no React state changes and nothing re-renders.
 */
export function Backdrop() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const spotlight = fine && !reduced;

  useEffect(() => {
    if (!spotlight) return;
    const root = document.documentElement;
    let frame = 0;
    let px = 0;
    let py = 0;

    const write = () => {
      frame = 0;
      root.style.setProperty("--mx", `${px}px`);
      root.style.setProperty("--my", `${py}px`);
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(write);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [spotlight]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 grain">
      {/* Base grid — barely there, sets the measure of the page */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--grid)) 0 1px, transparent 1px 100%), linear-gradient(to bottom, hsl(var(--grid)) 0 1px, transparent 1px 100%)",
          backgroundSize: "88px 88px",
        }}
      />

      {/* Same grid at full strength, revealed only inside the pointer's halo */}
      {spotlight && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--signal) / 0.5) 0 1px, transparent 1px 100%), linear-gradient(to bottom, hsl(var(--signal) / 0.5) 0 1px, transparent 1px 100%)",
            backgroundSize: "88px 88px",
            maskImage:
              "radial-gradient(220px 220px at var(--mx) var(--my), #000 0%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(220px 220px at var(--mx) var(--my), #000 0%, transparent 72%)",
          }}
        />
      )}
    </div>
  );
}
