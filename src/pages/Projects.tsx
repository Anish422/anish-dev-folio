import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const matchesQuery =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.stack.some((tech) => tech.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <Section
        index="01"
        eyebrow="Portfolio"
        title="Project Index"
        subtitle="Software I've designed, built and shipped — web applications, data pipelines and security tooling."
      >
        {/* ── Filter bar, styled as a form on a spec sheet ─────────── */}
        <div className="mb-4 border-y border-border">
          <div className="flex flex-col gap-0 md:flex-row md:items-stretch">
            {/* Search */}
            <div className="flex flex-1 items-center gap-3 border-b border-border px-1 py-4 md:border-b-0 md:border-r md:pr-6">
              <span className="label shrink-0 text-signal">Search</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="title, summary or technology…"
                aria-label="Search projects"
                className="focus-ring w-full min-w-0 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="focus-ring label shrink-0 text-muted-foreground transition-colors hover:text-signal"
                  aria-label="Clear search"
                >
                  Clear ✕
                </button>
              )}
            </div>

            {/* Category */}
            <div
              className="flex flex-wrap items-center gap-2 py-4 md:pl-6"
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((cat) => {
                const active = cat === category;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    aria-pressed={active}
                    data-cursor="filter"
                    className={`focus-ring border px-2.5 py-1 font-mono text-2xs uppercase tracking-[0.1em] transition-colors duration-200 ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live count readout */}
        <div className="mb-12 flex items-baseline justify-between">
          <span className="label tabular text-muted-foreground">
            {String(filtered.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}{" "}
            entries
          </span>
          {(query || category !== "All") && (
            <span className="label text-signal">Filtered</span>
          )}
        </div>

        {/* ── The index ────────────────────────────────────────────── */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="border-b border-border">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard {...project} index={i + 1} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="hatch border border-border py-24 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="label text-muted-foreground">No entries match</p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="focus-ring link-sweep mt-4 font-mono text-2xs uppercase tracking-[0.16em] text-signal"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </div>
  );
}
