import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/lib/site";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NairaTrader" },
      { name: "description", content: "NairaTrader partners with three professional forex traders to bring mentorship and VIP signals to the next generation of African traders." },
      { property: "og:title", content: "About NairaTrader" },
      { property: "og:description", content: "Learn the story behind NairaTrader and meet our three professional mentors." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <section className="bg-ink text-white py-20">
        <div className="container-tight max-w-3xl">
          <p className="text-gold text-sm uppercase tracking-widest">About us</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Built by traders, for traders.</h1>
          <p className="mt-6 text-white/70 text-lg">
            NairaTrader is a forex education and signals community built on a simple idea: most
            traders fail not because the markets are impossible — but because they trade alone,
            without structure, without risk control, and without a mentor they can trust.
          </p>
          <p className="mt-4 text-white/70 text-lg">
            We partnered with three professional traders to fix that. Together, we provide
            mentorship, daily VIP signals and an active community — at prices anyone can start with.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-tight grid md:grid-cols-3 gap-6">
          {[
            { t: "Mission", d: "Make professional-grade forex education accessible across Africa and beyond." },
            { t: "Discipline", d: "Risk management is non-negotiable. Capital preservation comes before profit." },
            { t: "Community", d: "We grow as a group. Wins are shared, losses are studied, lessons are kept." },
          ].map((v) => (
            <div key={v.t} className="rounded-xl border border-border p-6 bg-card">
              <h3 className="font-display text-xl font-semibold text-gold">{v.t}</h3>
              <p className="mt-2 text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container-tight">
          <h2 className="text-3xl md:text-4xl font-bold">Meet the mentors</h2>
          <p className="mt-2 text-muted-foreground">Three traders. One community. Zero fluff.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {SITE.mentors.map((m) => (
              <a key={m.handle} href={m.x} target="_blank" rel="noreferrer"
                 className="group rounded-xl bg-card border border-border p-6 hover:border-gold transition">
                <div className="h-16 w-16 rounded-full bg-ink text-gold grid place-items-center font-display text-2xl font-bold">
                  {m.name[0]}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{m.name}</h3>
                <div className="mt-1 text-sm text-muted-foreground inline-flex items-center gap-1 group-hover:text-gold transition">
                  {m.handle} <ExternalLink className="h-3.5 w-3.5" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Professional forex trader and NairaTrader mentor.
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
