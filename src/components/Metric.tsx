import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricProps {
  label: string;
  value: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

export function Metric({ 
  label, 
  value, 
  description, 
  icon: Icon,
  className = "" 
}: MetricProps) {
  return (
    <motion.div
      className={`metric-card ${className}`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
    >
      {Icon && (
        <Icon className="w-6 h-6 text-primary mb-2 mx-auto" />
      )}
      <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
        {value}
      </div>
      <div className="text-sm font-medium text-foreground mb-1">
        {label}
      </div>
      {description && (
        <div className="text-xs text-muted-foreground">
          {description}
        </div>
      )}
    </motion.div>
  );
}