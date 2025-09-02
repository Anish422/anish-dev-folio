import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  variant?: "default" | "accent";
}

export function CTA({ 
  title, 
  description, 
  buttonText, 
  buttonHref,
  variant = "default" 
}: CTAProps) {
  return (
    <motion.section
      className={`py-16 rounded-2xl ${
        variant === "accent" 
          ? "bg-gradient-to-r from-primary to-accent text-white" 
          : "bg-muted/50"
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="container text-center max-w-2xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {title}
        </motion.h2>
        
        <motion.p
          className={`text-lg mb-8 leading-relaxed ${
            variant === "accent" ? "text-white/90" : "text-muted-foreground"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button 
            asChild 
            size="lg"
            variant={variant === "accent" ? "secondary" : "default"}
            className="group"
          >
            <Link to={buttonHref}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}