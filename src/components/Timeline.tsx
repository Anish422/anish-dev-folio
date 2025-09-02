import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "./Badge";

interface Metric {
  label: string;
  value: string;
}

interface TimelineItemProps {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  tech: string[];
  metrics?: Metric[];
}

interface TimelineProps {
  items: TimelineItemProps[];
}

function TimelineItem({
  company,
  role,
  location,
  start,
  end,
  bullets,
  tech,
  metrics = []
}: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="relative pl-8 pb-12 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-3 h-3 bg-primary rounded-full border-4 border-background group-hover:scale-125 transition-transform" />
      
      {/* Timeline line */}
      <div className="absolute left-1.5 top-5 w-px h-full bg-border group-last:hidden" />

      {/* Content */}
      <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {role}
            </h3>
            <p className="text-primary font-medium mb-2">{company}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {start} — {end}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="self-start"
          >
            <ChevronDown 
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`} 
            />
          </Button>
        </div>

        {/* Preview bullets (first 2) */}
        <div className="space-y-2 mb-4">
          {bullets.slice(0, 2).map((bullet, index) => (
            <div key={index} className="flex items-start">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && bullets.length > 2 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 mb-4 pt-2 border-t">
                {bullets.slice(2).map((bullet, index) => (
                  <div key={index + 2} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-lg font-bold text-primary mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((technology) => (
            <Badge key={technology} className="text-xs">
              {technology}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative max-w-4xl mx-auto">
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </div>
  );
}