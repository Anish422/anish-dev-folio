import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline";
  animate?: boolean;
}

export function Badge({ 
  children, 
  className,
  variant = "default",
  animate = false
}: BadgeProps) {
  const variants = {
    default: "tech-badge",
    accent: "bg-accent text-accent-foreground border-accent/20",
    outline: "border-2 border-current bg-transparent"
  };

  const badge = (
    <span 
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );

  if (animate) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        {badge}
      </motion.div>
    );
  }

  return badge;
}