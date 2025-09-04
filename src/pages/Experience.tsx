import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { Badge } from "@/components/Badge";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <div className="min-h-screen pt-16">
      <Section
        eyebrow="Professional Journey"
        title="Work Experience"
        subtitle="My professional development through co-op positions, showcasing growth in full-stack development, cybersecurity, and data analytics."
        centerText
      >
        {/* Timeline */}
        <Timeline items={experience} />
      </Section>

      {/* Skills Overview */}
      <Section
        eyebrow="Technical Skills"
        title="Technologies & Tools"
        className="bg-muted/30"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              Programming Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((skill) => (
                <Badge key={skill.name} animate>
                  {skill.name}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Frameworks & Libraries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              Frameworks & Libraries
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.frameworks.map((skill) => (
                <Badge key={skill.name} animate variant="accent">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Tools & Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill) => (
                <Badge key={skill.name} animate variant="outline">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Key Achievements */}
      <Section eyebrow="Highlights" title="Key Achievements" centerText>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="metric-card mb-4">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Apps Enhanced</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Maintained and improved web applications using Angular and .NET
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="metric-card mb-4">
              <div className="text-3xl font-bold text-primary">40%</div>
              <div className="text-sm text-muted-foreground">
                Faster Deployments
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Reduced deployment times through CI/CD automation with Azure
              Pipelines
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="metric-card mb-4">
              <div className="text-3xl font-bold text-primary">90%</div>
              <div className="text-sm text-muted-foreground">
                Risk Closure Rate
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Successfully closed outstanding security risks through systematic
              assessment
            </p>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
