import { Link } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

/**
 * The long-form landing page: hero, toolchain, a short "about" record, the
 * selected projects, and a closing call to action.
 *
 * Note: `App.tsx` currently routes "/" straight to <Hero />, so this page is
 * not reachable. Point the "/" route at <Home /> to bring it back.
 */
export default function Home() {
  const featured = projects.filter((p) => p.featured);

  const record = [
    {
      label: "Education",
      value: "University of Toronto",
      note: `Computer Science, Software Engineering specialization · Expected ${profile.graduation}`,
    },
    {
      label: "Recognition",
      value: "Dean's List",
      note: profile.deansList.join(" · "),
    },
    {
      label: "Based in",
      value: profile.location,
      note: "Open to hybrid and remote",
    },
  ];

  return (
    <div>
      <Hero showScrollCue />
      <TechMarquee />

      {/* ── Record ─────────────────────────────────────────────── */}
      <Section
        index="00.1"
        eyebrow="About"
        title="The record"
        subtitle="Computer Science at the University of Toronto, specializing in Software Engineering. I care about systems that stay correct under load and stay legible under maintenance."
      >
        <dl className="border-t border-foreground">
          {record.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.06}>
              <div className="group grid gap-2 border-b border-border py-6 md:grid-cols-12 md:items-baseline">
                <dt className="label text-muted-foreground md:col-span-3">{row.label}</dt>
                <dd className="md:col-span-9">
                  <span className="display-sm block text-2xl transition-colors duration-300 group-hover:text-signal md:text-3xl">
                    {row.value}
                  </span>
                  <span className="mt-2 block font-mono text-xs text-muted-foreground">
                    {row.note}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* ── Selected work ──────────────────────────────────────── */}
      <Section index="00.2" eyebrow="Selected" title="Recent work">
        <div className="border-b border-border">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i + 1} />
          ))}
        </div>

        <div className="mt-10">
          <Link to="/projects" className="btn-ghost focus-ring" data-cursor="open">
            Full index ({projects.length}) →
          </Link>
        </div>
      </Section>

      <CTA
        title="Let's build something"
        description="Four co-op terms across full-stack, data engineering and security. Here's the whole record."
        buttonText="View experience"
        buttonHref="/experience"
        variant="accent"
      />
    </div>
  );
}
