import { motion } from "framer-motion";
import { Badge } from "./Badge";
import { skills } from "@/content/skills";

export function TechMarquee() {
  // Duplicate the array to create seamless loop
  const marqueeItems = [...skills.marquee, ...skills.marquee];

  return (
    <section className="py-12 bg-muted/30 overflow-hidden">
      <div className="container mb-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wider uppercase">
            Technologies
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Tech Stack & Tools
          </h2>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div className="relative">
        <div className="flex space-x-6 animate-marquee">
          {marqueeItems.map((tech, index) => (
            <Badge
              key={`${tech}-${index}`}
              className="whitespace-nowrap flex-shrink-0"
              variant="default"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>

      {/* Second row - reverse direction */}
      <div className="relative mt-6">
        <div className="flex space-x-6 animate-marquee-reverse">
          {marqueeItems.slice().reverse().map((tech, index) => (
            <Badge
              key={`${tech}-reverse-${index}`}
              className="whitespace-nowrap flex-shrink-0"
              variant="accent"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}