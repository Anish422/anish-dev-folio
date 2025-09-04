import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { projects } from "@/content/projects";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on search
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen pt-16">
      <Section
        eyebrow="Portfolio"
        title="My Projects"
        subtitle="A comprehensive collection of my software development work, from web applications to data analysis and mobile apps."
        centerText
      >
        {/* Search */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by title, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus-ring"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-6"
          layout
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground">
                No projects found matching your criteria.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats */}
        {filteredProjects.length > 0 && (
          <motion.div
            className="mt-12 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Showing {filteredProjects.length} of {projects.length} projects
            {searchQuery && ` matching "${searchQuery}"`}
          </motion.div>
        )}
      </Section>
    </div>
  );
}