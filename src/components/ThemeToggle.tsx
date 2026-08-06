import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

const MODES = [
  { key: "light", glyph: "☀" },
  { key: "dark", glyph: "☾" },
  { key: "system", glyph: "⌥" },
] as const;

/**
 * Three-state segmented control rather than a sun/moon flip — the system
 * setting is a real, selectable option, so it gets its own segment instead of
 * being an invisible middle state you cycle past.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="relative flex items-center border border-border"
      role="radiogroup"
      aria-label="Colour theme"
    >
      {MODES.map((mode) => {
        const selected = theme === mode.key;
        return (
          <button
            key={mode.key}
            role="radio"
            aria-checked={selected}
            aria-label={mode.key}
            data-cursor={mode.key}
            onClick={() => setTheme(mode.key)}
            className="focus-ring relative h-8 w-8 text-xs leading-none transition-colors duration-200"
          >
            {selected && (
              <motion.span
                layoutId="theme-selected"
                className="absolute inset-0 bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 ${
                selected ? "text-background" : "text-muted-foreground"
              }`}
            >
              {mode.glyph}
            </span>
          </button>
        );
      })}
    </div>
  );
}
