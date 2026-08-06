import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "./Badge";

interface ProjectLink {
  label: string;
  href: string;
}

interface ProjectCardProps {
  title: string;
  when: string;
  stack: string[];
  summary: string;
  bullets?: string[];
  links: ProjectLink[];
  category: string;
  featured?: boolean;
  /** Position in the index; printed as the entry's catalogue number. */
  index?: number;
}

/**
 * A catalogue entry rather than a card: oversized index number in the margin,
 * metadata in mono along the top rule, title in expanded grotesque, summary
 * in serif.
 *
 * The engineering detail (`bullets`) sits behind a SPEC toggle — always one
 * click away, never crowding the scan. The whole entry is framed by a signal
 * rule that wipes in from the left on hover.
 */
export function ProjectCard({
  title,
  when,
  stack,
  summary,
  bullets = [],
  links,
  category,
  featured = false,
  index,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const id = `spec-${title.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <motion.article
      className="group relative border-t border-border pt-6 transition-colors duration-300 hover:border-foreground"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Signal rule wiping across the top edge on hover */}
      <span className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out group-hover:scale-x-100" />

      {/* Metadata line */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="label tabular text-muted-foreground transition-colors group-hover:text-signal">
          {index !== undefined ? String(index).padStart(2, "0") : "—"}
        </span>
        <div className="flex items-center gap-3">
          {featured && <span className="label text-signal">★ Selected</span>}
          <span className="label text-muted-foreground">{category}</span>
          <span className="label text-muted-foreground">{when}</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Title */}
        <div className="md:col-span-5">
          <h3 className="display-sm text-3xl transition-colors duration-300 group-hover:text-signal md:text-4xl">
            {title}
          </h3>

          {links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="link-sweep focus-ring font-mono text-2xs uppercase tracking-[0.16em] text-foreground"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="md:col-span-7">
          <p className="editorial text-xl text-foreground md:text-2xl">{summary}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          {bullets.length > 0 && (
            <>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={id}
                data-cursor={open ? "close" : "spec"}
                className="focus-ring mt-6 flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <motion.span animate={{ rotate: open ? 45 : 0 }} className="inline-block">
                  +
                </motion.span>
                {open ? "Hide spec" : `Spec (${bullets.length})`}
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-5 space-y-3 border-l border-signal pl-5">
                      {bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="font-mono text-2xs tabular text-signal">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>

      <div className="h-10" />
    </motion.article>
  );
}
