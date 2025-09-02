import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";

export function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      href: profile.github,
      icon: Github,
    },
    {
      name: "LinkedIn", 
      href: profile.linkedin,
      icon: Linkedin,
    },
    {
      name: "Email",
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Left side - Name and location */}
          <div className="text-center md:text-left">
            <p className="text-sm font-medium">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.location}</p>
          </div>

          {/* Right side - Social links */}
          <div className="flex space-x-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="focus-ring h-8 w-8"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with React + TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}