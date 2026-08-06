import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/content/profile";

/**
 * ⌘K palette — the fastest path through the site for anyone who lives on a
 * keyboard, which is most of the people this portfolio is written for.
 *
 * Covers navigation, the two contact actions worth having (copy address,
 * compose), outbound profiles, and theme switching.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Any element can open the palette by dispatching this event.
  useEffect(() => {
    const openIt = () => setOpen(true);
    window.addEventListener("open-command-palette", openIt);
    return () => window.removeEventListener("open-command-palette", openIt);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast({ title: "Copied", description: profile.email });
    } catch {
      toast({ title: "Copy failed", description: profile.email, variant: "destructive" });
    }
  };

  const routes = [
    { label: "Index", to: "/", hint: "00" },
    { label: "Projects", to: "/projects", hint: "01" },
    { label: "Experience", to: "/experience", hint: "02" },
    { label: "Contact", to: "/contact", hint: "03" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl overflow-hidden border border-foreground bg-background p-0 shadow-none">
        <Command
          className="bg-background [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-2xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:text-muted-foreground"
          loop
        >
          <div className="flex items-center gap-3 border-b border-border px-4">
            <span className="label text-signal">⌘K</span>
            <CommandInput
              placeholder="Jump to…"
              className="h-14 border-0 font-mono text-sm placeholder:text-muted-foreground focus:ring-0"
            />
          </div>

          <CommandList className="max-h-[22rem] p-2">
            <CommandEmpty className="px-4 py-8 text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              No match
            </CommandEmpty>

            <CommandGroup heading="Navigate">
              {routes.map((r) => (
                <CommandItem
                  key={r.to}
                  value={`go ${r.label}`}
                  onSelect={() => run(() => navigate(r.to))}
                  className="group flex items-center gap-4 rounded-none px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] aria-selected:bg-foreground aria-selected:text-background"
                >
                  <span className="tabular text-muted-foreground group-aria-selected:text-background/60">
                    {r.hint}
                  </span>
                  {r.label}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Actions">
              <CommandItem
                value="copy email address"
                onSelect={() => run(copyEmail)}
                className="rounded-none px-4 py-2.5 pl-[3.4rem] font-mono text-xs uppercase tracking-[0.12em] aria-selected:bg-foreground aria-selected:text-background"
              >
                Copy email
              </CommandItem>
              <CommandItem
                value="send email compose message"
                onSelect={() => run(() => (window.location.href = `mailto:${profile.email}`))}
                className="rounded-none px-4 py-2.5 pl-[3.4rem] font-mono text-xs uppercase tracking-[0.12em] aria-selected:bg-foreground aria-selected:text-background"
              >
                Compose email
              </CommandItem>
              <CommandItem
                value="open github source code"
                onSelect={() => run(() => window.open(profile.github, "_blank", "noopener"))}
                className="rounded-none px-4 py-2.5 pl-[3.4rem] font-mono text-xs uppercase tracking-[0.12em] aria-selected:bg-foreground aria-selected:text-background"
              >
                GitHub ↗
              </CommandItem>
              <CommandItem
                value="open linkedin profile"
                onSelect={() => run(() => window.open(profile.linkedin, "_blank", "noopener"))}
                className="rounded-none px-4 py-2.5 pl-[3.4rem] font-mono text-xs uppercase tracking-[0.12em] aria-selected:bg-foreground aria-selected:text-background"
              >
                LinkedIn ↗
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Appearance">
              {(["light", "dark", "system"] as const).map((t) => (
                <CommandItem
                  key={t}
                  value={`theme ${t}`}
                  onSelect={() => run(() => setTheme(t))}
                  className="rounded-none px-4 py-2.5 pl-[3.4rem] font-mono text-xs uppercase tracking-[0.12em] aria-selected:bg-foreground aria-selected:text-background"
                >
                  {t}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
