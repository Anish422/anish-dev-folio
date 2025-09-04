import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { CTA } from "@/components/CTA";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, GraduationCap } from "lucide-react";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Tech Marquee */}
      <TechMarquee />

      {/* About Section */}
      <Section
        eyebrow="About"
        title="Building the future, one line of code at a time"
        subtitle="Computer Science student at University of Toronto with a specialization in Software Engineering. Passionate about creating secure, scalable solutions that make a real impact."
        centerText
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            className="bg-card border rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <p className="text-muted-foreground mb-2">
              University of Toronto - Computer Science
            </p>
            <p className="text-sm text-muted-foreground">
              Software Engineering Specialization • Expected Graduation -{" "}
              {profile.graduation}
            </p>
          </motion.div>

          <motion.div
            className="bg-card border rounded-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Award className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold mb-2">Dean's List</h3>
            <p className="text-muted-foreground mb-2">
              Academic Excellence Recognition
            </p>
            <p className="text-sm text-muted-foreground">
              {profile.deansList.join(" • ")}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Featured Projects */}
      <Section
        eyebrow="Featured Work"
        title="Recent Projects"
        subtitle="A selection of my recent work showcasing full-stack development, data analysis, and security-focused solutions."
      >
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/projects" className="inline-flex items-center">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA to Experience */}
      <Section>
        <CTA
          title="Want to learn more about my experience?"
          description="Explore my professional journey including co-op positions at Ontario Power Generation and City of Toronto."
          buttonText="View Experience"
          buttonHref="/experience"
          variant="accent"
        />
      </Section>
    </div>
  );
}
