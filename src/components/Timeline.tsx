import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Badge } from "./Badge";

interface Metric {
  label: string;
  value: string;
}

interface TimelineItemProps {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  tech: string[];
  metrics?: Metric[];
}

interface TimelineProps {
  items: TimelineItemProps[];
}

function TimelineItem({
  company,
  role,
  location,
  start,
  end,
  bullets,
  tech,
  metrics = [],
  n,
}: TimelineItemProps & { n: number }) {
  const [open, setOpen] = useState(false);
  const id = `role-${n}`;

  return (
    <motion.article
      className="group relative pl-10 md:pl-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Node on the rail — a square, not a dot */}
      <span className="absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-[calc(50%-0.5px)] border border-foreground bg-background transition-colors duration-300 group-hover:border-signal group-hover:bg-signal md:left-0" />

      <div className="border-b border-border pb-12">
        {/* Dates */}
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="label tabular text-signal">
            {start} → {end}
          </span>
          <span className="label text-muted-foreground">{location}</span>
        </div>

        <h3 className="display-sm text-2xl md:text-4xl">{role}</h3>
        <p className="editorial mt-2 text-xl text-muted-foreground md:text-2xl">{company}</p>

        {/* Outcomes as a hairline spec table */}
        {metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-1 border border-border sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-b border-border p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <div className="display-sm tabular text-2xl">{metric.value}</div>
                <div className="label mt-1 text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* First two responsibilities are always visible */}
        <ul className="mt-8 space-y-3">
          {bullets.slice(0, 2).map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-mono text-2xs tabular text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && bullets.length > 2 && (
            <motion.div
              id={id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-3 space-y-3">
                {bullets.slice(2).map((bullet, i) => (
                  <li
                    key={i + 2}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="font-mono text-2xs tabular text-signal">
                      {String(i + 3).padStart(2, "0")}
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {bullets.length > 2 && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={id}
            data-cursor={open ? "less" : "more"}
            className="focus-ring mt-5 flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <motion.span animate={{ rotate: open ? 45 : 0 }} className="inline-block">
              +
            </motion.span>
            {open ? "Collapse" : `${bullets.length - 2} more`}
          </button>
        )}

        <div className="mt-6 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Vertical rail whose fill tracks how far you've read through the roles —
 * the timeline doubles as a progress indicator for its own section.
 */
export function Timeline({ items }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  return (
    <div ref={ref} className="relative mx-auto max-w-5xl">
      {/* Rail */}
      <div className="absolute inset-y-0 left-0 w-px bg-border" aria-hidden />
      <motion.div
        className="absolute inset-y-0 left-0 w-px origin-top bg-signal"
        style={{ scaleY: fill }}
        aria-hidden
      />

      <div className="space-y-14">
        {items.map((item, i) => (
          <TimelineItem key={`${item.company}-${i}`} {...item} n={i} />
        ))}
      </div>
    </div>
  );
}
