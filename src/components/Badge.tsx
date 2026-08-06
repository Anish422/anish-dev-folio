import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline" | "signal";
  animate?: boolean;
}

const VARIANTS = {
  default: "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
  accent: "border-border text-foreground hover:border-signal hover:text-signal",
  outline: "border-foreground text-foreground",
  signal: "border-signal text-signal",
} as const;

/**
 * Hard-edged mono tag. Deliberately not a pill — nothing in this system is
 * rounded, and the tags read as index terms rather than decoration.
 */
export function Badge({
  children,
  className,
  variant = "default",
  animate = false,
}: BadgeProps) {
  const classes = cn(
    "inline-flex items-center border px-2 py-1 font-mono text-2xs uppercase tracking-[0.1em] transition-colors duration-200",
    VARIANTS[variant],
    className
  );

  if (!animate) return <span className={classes}>{children}</span>;

  return (
    <motion.span
      className={classes}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.span>
  );
}
