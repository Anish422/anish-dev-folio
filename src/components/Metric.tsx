import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface MetricProps {
  label: string;
  value: string;
  /** Printed as the row's index in the spec table. */
  index?: number;
  className?: string;
}

/** Splits "10+" into [10, "+"] so the number can count and the suffix can't. */
function parse(value: string): [number | null, string] {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return [null, value];
  return [Number(match[1]), match[2]];
}

/**
 * One row of the stats table. Counts up on entry using tabular figures, so
 * the row never changes width while the number climbs.
 */
export function Metric({ label, value, index, className }: MetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [target, suffix] = parse(value);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (target === null) return;
    if (reduced) {
      setShown(target);
      return;
    }
    if (!inView) return;

    const duration = 900;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast out of the gate, settles precisely on the number
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setShown(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, reduced]);

  return (
    <div ref={ref} className={`group flex flex-col gap-1 ${className ?? ""}`}>
      <div className="flex items-baseline gap-2">
        {index !== undefined && (
          <span className="font-mono text-[9px] tabular text-muted-foreground">
            {String(index).padStart(2, "0")}
          </span>
        )}
        <span className="display-sm tabular text-4xl transition-colors duration-300 group-hover:text-signal md:text-5xl">
          {target === null ? value : `${shown}${suffix}`}
        </span>
      </div>
      <span className="label text-muted-foreground">{label}</span>
    </div>
  );
}
