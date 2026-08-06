// App.tsx
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ThemeProvider } from "@/hooks/use-theme";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Backdrop } from "@/components/Backdrop";
import { CommandPalette } from "@/components/CommandPalette";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Hero } from "./components/Hero";

const queryClient = new QueryClient();

/**
 * Route transition: a signal-coloured panel sweeps down over the outgoing
 * page and back up off the incoming one, so navigation reads as a page being
 * turned rather than a cross-fade. Also resets scroll, which HashRouter does
 * not do on its own.
 */
function RoutedContent() {
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  const routes = (
    <Routes location={location}>
      <Route path="/" element={<Hero />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  if (reduced) return <main id="main" className="flex-1">{routes}</main>;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          id="main"
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {routes}
        </motion.main>
      </AnimatePresence>

      {/* Wipe panel, keyed to the path so it replays on every navigation */}
      <motion.div
        key={`wipe-${location.pathname}`}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] origin-top bg-signal"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
      />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Backdrop />
          <Cursor />
          <CommandPalette />

          <div className="relative flex min-h-screen flex-col">
            {/* Skip to content link for accessibility */}
            <a
              href="#main"
              className="sr-only z-[60] bg-foreground px-4 py-2 font-mono text-2xs uppercase tracking-[0.16em] text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
            >
              Skip to content
            </a>

            <Header />
            <RoutedContent />
            <Footer />
          </div>
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
