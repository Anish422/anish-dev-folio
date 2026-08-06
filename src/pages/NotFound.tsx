import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrambleText } from "@/components/ScrambleText";
import { Magnetic } from "@/components/Magnetic";

const ROUTES = [
  { name: "Index", href: "/", n: "00" },
  { name: "Projects", href: "/projects", n: "01" },
  { name: "Experience", href: "/experience", n: "02" },
  { name: "Contact", href: "/contact", n: "03" },
];

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.error("404: no route for", pathname);
  }, [pathname]);

  return (
    <div className="container flex min-h-[70vh] flex-col justify-center py-20">
      <p className="label mb-6 text-signal">Error — 404</p>

      <ScrambleText
        text="Not found"
        as="h1"
        trigger="mount"
        speed={3}
        className="display text-[clamp(3rem,14vw,11rem)]"
      />

      <div className="rule my-10" />

      <p className="editorial max-w-xl text-2xl text-muted-foreground md:text-3xl">
        There's nothing filed under{" "}
        <span className="font-mono text-base text-signal">{pathname}</span>. It may have moved,
        or it may never have existed.
      </p>

      {/* Routes that do exist — via Link, so navigation stays client-side */}
      <nav className="mt-14 border-t border-border">
        {ROUTES.map((route) => (
          <Link
            key={route.href}
            to={route.href}
            data-cursor="go"
            className="focus-ring group flex items-baseline gap-5 border-b border-border py-5 transition-colors hover:bg-card"
          >
            <span className="label tabular text-muted-foreground transition-colors group-hover:text-signal">
              {route.n}
            </span>
            <span className="display-sm text-2xl transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
              {route.name}
            </span>
            <span className="ml-auto font-mono text-muted-foreground transition-colors group-hover:text-signal">
              →
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-12">
        <Magnetic>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="btn-ghost focus-ring"
            data-cursor="search"
          >
            Search everything ⌘K
          </button>
        </Magnetic>
      </div>
    </div>
  );
};

export default NotFound;
