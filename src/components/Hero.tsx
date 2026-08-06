import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { profile } from "@/content/profile";
import { Metric } from "./Metric";
import { Magnetic } from "./Magnetic";
import { ScrambleText } from "./ScrambleText";

import headshotImage from "@/assets/headshot.jpeg";
import headshot2 from "@/assets/headshot2.jpg";
import headshot3 from "@/assets/headshot3.jpg";
import headshot4 from "@/assets/headshot4.png";
import headshot5 from "@/assets/headshot5.jpg";
import headshot7 from "@/assets/headshot7.jpg";
import headshot8 from "@/assets/headshot8.jpg";

const PORTRAITS = [
  headshotImage,
  headshot2,
  headshot3,
  headshot4,
  headshot5,
  headshot7,
  headshot8,
];

/** "Hi, I'm Anish! I build …" → "I build …" */
const statement = profile.heroTitle.includes("!")
  ? profile.heroTitle.split("!").slice(1).join("!").trim()
  : profile.heroTitle;

/** Live wall-clock in the city named in the profile. */
function useLocalTime() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Toronto",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Each glyph is individually hoverable — the headline is a control surface. */
function LiveType({ text }: { text: string }) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden
          className="inline-block cursor-default transition-all duration-200 ease-out hover:-translate-y-1.5 hover:text-signal"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

interface HeroProps {
  /**
   * Only meaningful when something follows the hero. At "/" the hero is the
   * entire route, so the cue would point at the footer.
   */
  showScrollCue?: boolean;
}

export function Hero({ showScrollCue = false }: HeroProps) {
  const [portrait, setPortrait] = useState(0);
  const [hovering, setHovering] = useState(false);
  const reduced = useReducedMotion();
  const time = useLocalTime();

  // Cycle the portrait only while the frame is hovered — the original
  // behaviour, kept because it rewards curiosity without demanding attention.
  useEffect(() => {
    if (!hovering || reduced) {
      setPortrait(0);
      return;
    }
    const id = setInterval(
      () => setPortrait((p) => (p + 1) % PORTRAITS.length),
      1200,
    );
    return () => clearInterval(id);
  }, [hovering, reduced]);

  return (
    <section className="relative">
      {/* ── Status bar ─────────────────────────────────────── */}
      <div className="border-b border-border">
        <div className="container flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3">
          <span className="label flex items-center gap-2 text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 animate-blink bg-signal" />
            Available — {profile.graduation} grad
          </span>
          <span className="label hidden text-muted-foreground sm:block">
            {profile.location} · 43.6532°N 79.3832°W
          </span>
          <span className="label tabular text-foreground">
            {time || "--:--:--"} EST
          </span>
        </div>
      </div>

      {/* ── Masthead ───────────────────────────────────────── */}
      <div className="container">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
          {/* Name + statement */}
          <div className="md:col-span-8">
            <motion.p
              className="label mb-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              [00] — Index
            </motion.p>

            <motion.h1
              className="display text-[clamp(3rem,13vw,10rem)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block">
                <LiveType text={profile.name.split(" ")[0]} />
              </span>
              <span className="block text-muted-foreground">
                <LiveType text={profile.name.split(" ").slice(1).join(" ")} />
              </span>
            </motion.h1>

            <motion.div
              className="mt-10 h-px origin-left bg-foreground"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              className="editorial mt-8 max-w-2xl text-2xl md:text-4xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {statement}
            </motion.p>

            <motion.p
              className="mt-6 max-w-md font-mono text-xs leading-relaxed text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.8 }}
            >
              {profile.heroSubtitle}
            </motion.p>

            {/* Primary routes */}
            <motion.div
              className="mt-12 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
            >
              <Magnetic>
                <Link
                  to="/projects"
                  className="btn-block focus-ring"
                  data-cursor="open"
                >
                  Selected work →
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/experience"
                  className="btn-ghost focus-ring"
                  data-cursor="open"
                >
                  Experience
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Portrait, framed like a plate in a spec document */}
          <motion.div
            className="md:col-span-4 md:pt-24"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="cell ticks group relative aspect-[4/5] w-full max-w-xs overflow-hidden"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              data-cursor="hold"
            >
              {/* Crossfade rather than a hard cut — the frames sit stacked and
                  the outgoing one fades out beneath the incoming one. */}
              <AnimatePresence initial={false}>
                <motion.img
                  key={portrait}
                  src={PORTRAITS[portrait]}
                  alt={`${profile.name} — portrait`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="eager"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </AnimatePresence>
              {/* Scan line sweeps as the frame cycles */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <motion.div
                  className="h-px w-full bg-signal"
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

            <div className="mt-3 flex max-w-xs items-center justify-between">
              <span className="label text-muted-foreground">
                Fig. 01 — Portrait
              </span>
              <span className="label tabular text-signal">
                {String(portrait + 1).padStart(2, "0")}/
                {String(PORTRAITS.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats table ────────────────────────────────────── */}
      <div className="border-y border-border">
        <div className="container grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {profile.metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <Metric label={metric.label} value={metric.value} index={i + 1} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ─────────────────────────────────────── */}
      {showScrollCue && (
        <div className="container flex items-center gap-4 py-6">
          <ScrambleText
            text="Scroll"
            trigger="mount"
            className="label text-muted-foreground"
          />
          <motion.span
            className="h-px flex-1 origin-left bg-border"
            animate={{ scaleX: [0.15, 1, 0.15] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="label text-muted-foreground">↓</span>
        </div>
      )}
    </section>
  );
}
