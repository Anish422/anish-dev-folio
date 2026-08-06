import { Link } from "react-router-dom";
import { profile } from "@/content/profile";
import { ScrambleText } from "./ScrambleText";

const SITEMAP = [
  { name: "Index", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];

/**
 * Colophon plate. Closes the document with the name set at full width, the
 * sitemap and outbound links as two mono columns, and a build note.
 */
export function Footer() {
  const elsewhere = [
    { name: "GitHub", href: profile.github },
    { name: "LinkedIn", href: profile.linkedin },
    { name: "Email", href: `mailto:${profile.email}` },
  ];

  return (
    <footer className="border-t border-foreground">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Contact block */}
          <div className="md:col-span-6">
            <p className="label mb-4 text-muted-foreground">Get in touch</p>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="write"
              className="link-sweep focus-ring editorial block text-2xl md:text-4xl"
            >
              {profile.email}
            </a>
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              {profile.location} · {profile.phone}
            </p>
          </div>

          {/* Sitemap */}
          <nav className="md:col-span-3">
            <p className="label mb-4 text-muted-foreground">Index</p>
            <ul className="space-y-2">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    data-cursor="go"
                    className="link-sweep focus-ring font-mono text-2xs uppercase tracking-[0.16em]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Outbound */}
          <nav className="md:col-span-3">
            <p className="label mb-4 text-muted-foreground">Elsewhere</p>
            <ul className="space-y-2">
              {elsewhere.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className="link-sweep focus-ring font-mono text-2xs uppercase tracking-[0.16em]"
                  >
                    {item.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Name at full measure — the sign-off */}
      <div className="overflow-hidden border-t border-border">
        <div className="container py-8">
          <ScrambleText
            text={profile.name}
            as="div"
            speed={3}
            className="display block text-center text-[clamp(3rem,17vw,14rem)] leading-none text-foreground"
          />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p className="label text-muted-foreground">
            © {new Date().getFullYear()} — All rights reserved
          </p>
          <p className="label text-muted-foreground">
            React · TypeScript · Vite — set in Archivo &amp; IBM Plex Mono
          </p>
        </div>
      </div>
    </footer>
  );
}
