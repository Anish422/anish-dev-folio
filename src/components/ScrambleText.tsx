import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#%&$@";

type Trigger = "mount" | "view" | "hover";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** What starts the decode. `view` fires once, when scrolled into frame. */
  trigger?: Trigger;
  /** Frames each character spends scrambling before it locks in. */
  speed?: number;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

/**
 * Decodes text character by character out of random glyphs.
 *
 * The full string is always present for assistive tech and for layout — the
 * scrambled version is written to a visually-hidden-from-AT span, so the
 * element never reflows mid-animation and screen readers only ever see the
 * real words.
 */
export function ScrambleText({
  text,
  className,
  trigger = "view",
  speed = 2,
  delay = 0,
  as: Tag = "span",
}: ScrambleTextProps) {
  const reduced = useReducedMotion();
  const [output, setOutput] = useState(reduced ? text : "");
  const ref = useRef<HTMLElement>(null);
  const raf = useRef<number>();
  const done = useRef(false);

  const run = useCallback(() => {
    if (reduced) {
      setOutput(text);
      return;
    }
    cancelAnimationFrame(raf.current!);
    let frame = 0;

    const tick = () => {
      const revealed = Math.floor(frame / speed);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") next += " ";
        else if (i < revealed) next += text[i];
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(next);
      frame++;
      if (revealed <= text.length) raf.current = requestAnimationFrame(tick);
      else setOutput(text);
    };

    raf.current = requestAnimationFrame(tick);
  }, [text, speed, reduced]);

  useEffect(() => {
    if (trigger === "mount") {
      const t = setTimeout(run, delay);
      return () => clearTimeout(t);
    }

    if (trigger === "view") {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true;
            setTimeout(run, delay);
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      return () => io.disconnect();
    }

    // hover: idle until the handler below fires
    setOutput(text);
  }, [trigger, run, delay, text]);

  useEffect(() => () => cancelAnimationFrame(raf.current!), []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      onMouseEnter={trigger === "hover" ? run : undefined}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>{output || text}</span>
    </Tag>
  );
}
