import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ContactForm } from "@/components/site/ContactForm";
import { SITE } from "@/lib/site";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NairaTrader" },
      { name: "description", content: "Questions about NairaTrader's mentorship or VIP plans? Send us a message and we'll get back to you." },
      { property: "og:title", content: "Contact NairaTrader" },
      { property: "og:description", content: "Reach the NairaTrader team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteShell>
      <section className="bg-ink text-white py-20">
        <div className="container-tight max-w-3xl">
          <p className="text-gold text-sm uppercase tracking-widest">Contact</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Got a question? Let's talk.</h1>
          <p className="mt-6 text-white/70 text-lg">
            For general inquiries fill the form below. For payment proof, use the form on the Plans page.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-tight grid lg:grid-cols-[1fr_320px] gap-10">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-xl font-semibold">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll reply by email.</p>
            <div className="mt-6"><ContactForm /></div>
          </div>
          <aside className="space-y-5">
            <div className="rounded-xl border border-border p-6 bg-secondary">
              <h3 className="font-semibold">Reach the mentors</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {SITE.mentors.map((m) => (
                  <li key={m.handle}>
                    <a href={m.x} target="_blank" rel="noreferrer"
                       className="inline-flex items-center gap-1.5 hover:text-gold">
                      {m.name} <span className="text-muted-foreground">{m.handle}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border p-6">
              <h3 className="font-semibold">Response time</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We typically respond within 24 hours. Payment proofs are verified faster.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
