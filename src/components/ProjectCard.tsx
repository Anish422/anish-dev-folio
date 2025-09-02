import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
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
}

export function ProjectCard({
  title,
  when,
  stack,
  summary,
  bullets = [],
  links,
  category,
  featured = false
}: ProjectCardProps) {
  return (
    <motion.div
      className={`group relative bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 ${
        featured ? "ring-2 ring-primary/20" : ""
      }`}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {featured && (
        <div className="absolute -top-3 left-6">
          <Badge variant="accent" className="text-xs">
            Featured
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{when}</p>
        </div>
        <Badge variant="outline" className="text-xs">
          {category}
        </Badge>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {stack.slice(0, 6).map((tech) => (
          <Badge key={tech} className="text-xs">
            {tech}
          </Badge>
        ))}
        {stack.length > 6 && (
          <Badge className="text-xs opacity-60">
            +{stack.length - 6} more
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {summary}
      </p>

      {/* Bullets */}
      {bullets.length > 0 && (
        <ul className="space-y-2 mb-6">
          {bullets.map((bullet, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {/* Links */}
      {links.length > 0 && (
        <div className="flex gap-2 pt-4 border-t">
          {links.map((link) => (
            <Button
              key={link.label}
              variant="outline"
              size="sm"
              asChild
              className="focus-ring"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                {link.label === "GitHub" ? (
                  <Github className="w-4 h-4 mr-1" />
                ) : (
                  <ExternalLink className="w-4 h-4 mr-1" />
                )}
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      )}
    </motion.div>
  );
}