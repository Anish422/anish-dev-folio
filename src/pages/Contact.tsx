import { useState } from "react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/content/profile";

const FIELD =
  "focus-ring w-full border border-border bg-transparent px-4 py-3 font-mono text-sm text-foreground transition-colors duration-200 placeholder:text-muted-foreground hover:border-foreground focus:border-signal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Unchanged behaviour: compose a mailto: rather than POST anywhere.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast({
      title: "Opening email client",
      description: "Your default client should open with the message pre-filled.",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast({ title: "Copied", description: profile.email });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy the address manually.",
        variant: "destructive",
      });
    }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const details = [
    { label: "Email", value: profile.email, action: true },
    { label: "Phone", value: profile.phone },
    { label: "Location", value: profile.location },
    { label: "Graduating", value: profile.graduation },
  ];

  const elsewhere = [
    { name: "GitHub", href: profile.github, note: "Code and contributions" },
    { name: "LinkedIn", href: profile.linkedin, note: "Professional profile" },
  ];

  return (
    <div>
      <Section
        index="03"
        eyebrow="Contact"
        title="Start a conversation"
        subtitle="Open to new-grad roles, contract work and anything interesting in between."
      >
        <div className="grid gap-16 md:grid-cols-12">
          {/* ── Details ─────────────────────────────────────────── */}
          <div className="md:col-span-5">
            <Reveal>
              <dl className="border-t border-foreground">
                {details.map((row) => (
                  <div
                    key={row.label}
                    className="group flex items-baseline justify-between gap-4 border-b border-border py-4"
                  >
                    <dt className="label shrink-0 text-muted-foreground">{row.label}</dt>
                    <dd className="text-right font-mono text-xs text-foreground">
                      {row.action ? (
                        <button
                          onClick={handleCopy}
                          data-cursor="copy"
                          className="focus-ring link-sweep transition-colors hover:text-signal"
                        >
                          {copied ? "Copied ✓" : row.value}
                        </button>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="label mb-4 mt-12 text-muted-foreground">Elsewhere</p>
              <div className="border-t border-border">
                {elsewhere.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className="focus-ring group flex items-center justify-between border-b border-border py-5 transition-colors hover:bg-card"
                  >
                    <span>
                      <span className="display-sm block text-xl transition-colors group-hover:text-signal">
                        {link.name}
                      </span>
                      <span className="label mt-1 block text-muted-foreground">{link.note}</span>
                    </span>
                    <span className="font-mono text-lg text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Form ────────────────────────────────────────────── */}
          <div className="md:col-span-7">
            <Reveal delay={0.15} from="bottom">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex items-baseline justify-between border-b border-foreground pb-2">
                  <span className="label text-foreground">Message form</span>
                  <span className="label text-muted-foreground">Required *</span>
                </div>

                {[
                  { id: "name", n: "01", label: "Name", type: "text", placeholder: "Your full name" },
                  {
                    id: "email",
                    n: "02",
                    label: "Email",
                    type: "email",
                    placeholder: "you@example.com",
                  },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="mb-2 flex items-baseline gap-3"
                    >
                      <span className="label tabular text-signal">{field.n}</span>
                      <span className="label text-foreground">{field.label} *</span>
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      value={form[field.id as "name" | "email"]}
                      onChange={change}
                      required
                      placeholder={field.placeholder}
                      className={FIELD}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="mb-2 flex items-baseline gap-3">
                    <span className="label tabular text-signal">03</span>
                    <span className="label text-foreground">Message *</span>
                    <span className="label ml-auto tabular text-muted-foreground">
                      {String(form.message.length).padStart(3, "0")}
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={change}
                    required
                    rows={7}
                    placeholder="Tell me about the role, the project, or just say hello."
                    className={`${FIELD} resize-none`}
                  />
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Magnetic>
                    <button type="submit" data-cursor="send" className="btn-block focus-ring">
                      Send message →
                    </button>
                  </Magnetic>
                  <p className="label max-w-xs text-muted-foreground">
                    Opens your email client with the message pre-filled
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
}
