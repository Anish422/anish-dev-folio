import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";

const HIGHLIGHTS = [
  {
    value: "10+",
    label: "Apps enhanced",
    note: "Maintained and improved web applications using Angular and .NET.",
  },
  {
    value: "40%",
    label: "Faster deployments",
    note: "Cut deployment time through CI/CD automation with Azure Pipelines.",
  },
  {
    value: "90%",
    label: "Risk closure rate",
    note: "Closed outstanding security risks through systematic assessment.",
  },
];

/** Proficiency rendered as a 5-segment bar rather than dots. */
function SkillBar({ name, proficiency }: { name: string; proficiency: number }) {
  return (
    <div className="group flex items-center justify-between gap-4 border-b border-border py-2.5">
      <span className="font-mono text-xs text-foreground transition-colors group-hover:text-signal">
        {name}
      </span>
      <span className="flex shrink-0 gap-1" aria-label={`${proficiency} of 5`}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`h-2.5 w-1.5 transition-colors duration-300 ${
              i < proficiency
                ? "bg-foreground group-hover:bg-signal"
                : "bg-transparent ring-1 ring-inset ring-border"
            }`}
          />
        ))}
      </span>
    </div>
  );
}

export default function Experience() {
  const columns = [
    { title: "Languages", items: skills.languages },
    { title: "Frameworks", items: skills.frameworks },
    { title: "Tools", items: skills.tools },
  ];

  return (
    <div>
      <Section
        index="02"
        eyebrow="Record"
        title="Work Experience"
        subtitle="Four co-op terms across full-stack development, data engineering, cybersecurity and analytics."
      >
        <Timeline items={experience} />
      </Section>

      {/* ── Proficiency matrix ─────────────────────────────────────── */}
      <Section
        index="02.1"
        eyebrow="Proficiency"
        title="Technical Matrix"
        className="border-t border-border"
      >
        <div className="grid gap-x-12 gap-y-12 md:grid-cols-3">
          {columns.map((column, ci) => (
            <Reveal key={column.title} delay={ci * 0.08}>
              <div>
                <div className="mb-4 flex items-baseline justify-between border-b border-foreground pb-2">
                  <h3 className="label text-foreground">{column.title}</h3>
                  <span className="label tabular text-muted-foreground">
                    {String(column.items.length).padStart(2, "0")}
                  </span>
                </div>
                {column.items.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Highlights ─────────────────────────────────────────────── */}
      <Section index="02.2" eyebrow="Outcomes" title="Key Results">
        <div className="grid border-t border-border md:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="group h-full border-b border-border p-8 transition-colors duration-300 hover:bg-card md:border-b-0 md:border-r md:last:border-r-0">
                <span className="label tabular text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="display-sm mt-4 text-5xl transition-colors duration-300 group-hover:text-signal">
                  {item.value}
                </div>
                <div className="label mt-3 text-foreground">{item.label}</div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTA
        title="See the work"
        description="Every claim above has a project behind it. The index is one click away."
        buttonText="Project index"
        buttonHref="/projects"
        variant="accent"
      />
    </div>
  );
}
