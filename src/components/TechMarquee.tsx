import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { skills } from "@/content/skills";

interface RowProps {
  items: string[];
  /** Percent of the strip's width to travel per second. Sign sets direction. */
  baseVelocity: number;
  className?: string;
}

/**
 * A marquee row wired to scroll velocity: it drifts on its own, accelerates
 * when you scroll, and reverses direction when you scroll back up. Scrolling
 * also skews the row, so fast movement visibly bends the type.
 */
function VelocityRow({ items, baseVelocity, className }: RowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 380 });
  const factor = useTransform(smooth, [0, 1200], [0, 4], { clamp: false });
  const skew = useTransform(smooth, [-1600, 0, 1600], [6, 0, -6], { clamp: true });

  // Four copies are rendered; wrapping over a quarter of the strip keeps the
  // seam permanently off-screen in both directions.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * Math.abs(f);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div className="flex w-max whitespace-nowrap" style={{ x, skewX: skew }}>
      {[0, 1, 2, 3].map((copy) => (
        <div key={copy} className="flex shrink-0" aria-hidden={copy > 0}>
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className={`flex items-center gap-6 px-6 py-2 ${className ?? ""}`}
            >
              {item}
              <span className="text-signal">◆</span>
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

/** Static fallback for reduced-motion: the same list, simply set as text. */
function StaticRows({ items }: { items: string[] }) {
  return (
    <div className="container flex flex-wrap gap-x-6 gap-y-2 py-6">
      {items.map((item) => (
        <span key={item} className="font-mono text-2xs uppercase tracking-[0.16em]">
          {item}
        </span>
      ))}
    </div>
  );
}

export function TechMarquee() {
  const reduced = useReducedMotion();
  const items = skills.marquee;

  return (
    <section className="overflow-hidden border-y border-border py-10">
      <div className="container mb-8 flex items-baseline justify-between">
        <span className="label text-muted-foreground">Toolchain</span>
        <span className="label tabular text-muted-foreground">
          {String(items.length).padStart(2, "0")} entries
        </span>
      </div>

      {reduced ? (
        <StaticRows items={items} />
      ) : (
        <div className="flex flex-col gap-3">
          <VelocityRow
            items={items}
            baseVelocity={-2.2}
            className="display-sm text-3xl text-foreground md:text-5xl"
          />
          <VelocityRow
            items={[...items].reverse()}
            baseVelocity={1.6}
            className="font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground"
          />
        </div>
      )}
    </section>
  );
}
