import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/ui/input";
import { projects, projectCategories } from "@/content/projects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on category and search
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-16">
      <Section
        eyebrow="Portfolio"
        title="My Projects"
        subtitle="A comprehensive collection of my software development work, from web applications to data analysis and mobile apps."
        centerText
      >
        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by title, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus-ring"
            />
          </div>

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {projectCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  className={`cursor-pointer transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-secondary"
                  }`}
                >
                  {category}
                  {category !== "All" && (
                    <span className="ml-1 text-xs opacity-60">
                      ({projects.filter(p => p.category === category).length})
                    </span>
                  )}
                </Badge>
              </motion.button>
            ))}
          </motion.div>
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
            {activeCategory !== "All" && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </motion.div>
        )}
      </Section>
    </div>
  );
}