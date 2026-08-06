import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { ScrambleText } from "./ScrambleText";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Two-digit section number printed in the margin. */
  index?: string;
  centerText?: boolean;
}

/**
 * The page's structural unit. Every section is introduced the same way: a
 * hairline rule, a numbered mono eyebrow in the left margin, the title in
 * expanded grotesque, and an optional serif standfirst.
 */
export function Section({
  children,
  className,
  id,
  eyebrow,
  title,
  subtitle,
  index,
  centerText = false,
}: SectionProps) {
  const hasHead = Boolean(eyebrow || title || subtitle);

  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="container">
        {hasHead && (
          <header className={cn("mb-14 md:mb-20", centerText && "text-center")}>
            <Reveal>
              <div className="rule mb-6" />
            </Reveal>

            <div
              className={cn(
                "flex flex-col gap-x-12 gap-y-6 md:flex-row",
                centerText ? "md:flex-col md:items-center" : "md:items-start"
              )}
            >
              {(eyebrow || index) && (
                <div className="flex shrink-0 items-baseline gap-3 md:w-40">
                  {index && (
                    <span className="font-mono text-2xs tabular text-signal">[{index}]</span>
                  )}
                  {eyebrow && (
                    <ScrambleText text={eyebrow} className="label text-muted-foreground" />
                  )}
                </div>
              )}

              <div className={cn("flex-1", centerText && "md:text-center")}>
                {title && (
                  <Reveal>
                    <h2 className="display-sm text-4xl md:text-6xl">{title}</h2>
                  </Reveal>
                )}
                {subtitle && (
                  <Reveal delay={0.08}>
                    <p
                      className={cn(
                        "editorial mt-5 max-w-2xl text-xl text-muted-foreground md:text-2xl",
                        centerText && "md:mx-auto"
                      )}
                    >
                      {subtitle}
                    </p>
                  </Reveal>
                )}
              </div>
            </div>
          </header>
        )}

        {children}
      </div>
    </section>
  );
}
