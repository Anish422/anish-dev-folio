import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Magnetic } from "./Magnetic";

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  /** `accent` inverts the block to ink; `signal` floods it with vermilion. */
  variant?: "default" | "accent" | "signal";
}

/**
 * Full-bleed closing block. Inverts against the page so it reads as a hard
 * stop at the end of a section rather than another card in the flow.
 */
export function CTA({
  title,
  description,
  buttonText,
  buttonHref,
  variant = "accent",
}: CTAProps) {
  const inverted = variant !== "default";
  const surface =
    variant === "signal"
      ? "bg-signal text-signal-foreground"
      : variant === "accent"
        ? "bg-foreground text-background"
        : "border-y border-border bg-transparent text-foreground";

  // Same split as <Reveal />: the <section> is observed and never clipped,
  // while the inner element carries the clip. Observing the clipped element
  // would mean the clip that hides it also hides it from the observer, and it
  // could never animate open.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const closed = { clipPath: "inset(0% 0% 100% 0%)" };
  const open = { clipPath: "inset(0% 0% 0% 0%)" };

  return (
    <section ref={ref} className={`relative overflow-hidden ${surface}`}>
      <motion.div
        className="container py-20 md:py-28"
        initial={reduced ? false : closed}
        animate={reduced || inView ? open : closed}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 className="display text-[clamp(2.25rem,7vw,5.5rem)]">{title}</h2>
            <p
              className={`editorial mt-6 max-w-xl text-xl md:text-2xl ${
                inverted ? "opacity-70" : "text-muted-foreground"
              }`}
            >
              {description}
            </p>
          </div>

          <div className="md:col-span-4 md:justify-self-end">
            <Magnetic strength={18}>
              <Link
                to={buttonHref}
                data-cursor="open"
                className={`focus-ring inline-flex items-center gap-3 border px-6 py-4 font-mono text-2xs uppercase tracking-[0.16em] transition-colors duration-200 ${
                  inverted
                    ? "border-current hover:bg-background hover:text-foreground"
                    : "border-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {buttonText}
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
