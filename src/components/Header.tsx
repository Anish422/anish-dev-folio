import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { ScrambleText } from "./ScrambleText";
import { profile } from "@/content/profile";

const navigation = [
  { name: "Index", href: "/", n: "00" },
  { name: "Projects", href: "/projects", n: "01" },
  { name: "Experience", href: "/experience", n: "02" },
  { name: "Contact", href: "/contact", n: "03" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // useLocation is the only path source that works under HashRouter —
  // window.location.pathname is always "/" here.
  const { pathname } = useLocation();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock the page behind the mobile overlay.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("open-command-palette"));

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
          scrolled
            ? "border-foreground bg-background/92 backdrop-blur-sm"
            : "border-transparent bg-background"
        }`}
      >
        <div className="container flex h-16 items-center justify-between gap-6">
          {/* Monogram + wordmark */}
          <Link to="/" className="focus-ring group flex items-center gap-3" data-cursor="index">
            <span className="flex h-7 w-7 items-center justify-center bg-signal font-mono text-[11px] font-semibold text-signal-foreground transition-transform duration-300 group-hover:rotate-[-6deg]">
              AS
            </span>
            <span className="hidden font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground sm:block">
              {profile.name} /{" "}
              <span className="text-foreground">{profile.title}</span>
            </span>
          </Link>

          {/* Desktop nav — numbered, like sections of a document */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  data-cursor="go"
                  className="focus-ring group relative flex items-baseline gap-2 px-3 py-2"
                >
                  <span
                    className={`font-mono text-[9px] tabular tracking-[0.1em] transition-colors ${
                      active ? "text-signal" : "text-muted-foreground"
                    }`}
                  >
                    {item.n}
                  </span>
                  <ScrambleText
                    text={item.name}
                    trigger="hover"
                    speed={1}
                    className={`font-mono text-2xs uppercase tracking-[0.16em] transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-px bg-signal"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Palette trigger — doubles as the discoverability hint for ⌘K */}
            <button
              onClick={openPalette}
              data-cursor="search"
              aria-label="Open command palette"
              className="focus-ring hidden h-8 items-center gap-2 border border-border px-3 font-mono text-2xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground sm:flex"
            >
              <span>Jump</span>
              <kbd className="border border-border px-1 py-px text-[9px] leading-none">⌘K</kbd>
            </button>

            <ThemeToggle />

            <button
              className="focus-ring flex h-8 w-8 flex-col items-center justify-center gap-[5px] border border-border md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block h-px w-4 bg-foreground"
                animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block h-px w-4 bg-foreground"
                animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>

        {/* Reading progress — the only always-on use of the signal colour */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-signal"
          style={{ scaleX: progress }}
        />
      </header>

      {/* Mobile overlay: the nav becomes the page */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-background pt-16 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-1 flex-col justify-center">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5 }}
                  className="border-t border-border last:border-b"
                >
                  <Link
                    to={item.href}
                    className="focus-ring flex items-baseline gap-4 px-5 py-5"
                  >
                    <span className="font-mono text-2xs tabular text-signal">{item.n}</span>
                    <span
                      className={`display text-4xl ${
                        pathname === item.href ? "text-signal" : "text-foreground"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-border px-5 py-6">
              <p className="label text-muted-foreground">{profile.location}</p>
              <a
                href={`mailto:${profile.email}`}
                className="link-sweep mt-1 inline-block font-mono text-xs text-foreground"
              >
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
