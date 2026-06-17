import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, LineChart, Users, Zap } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NairaTrader Academy — Forex Mentorship & VIP Signals" },
      { name: "description", content: "NairaTrader Academy: forex mentorship from $15 and VIP signals from $20. Run by three professional traders. Pay with crypto." },
      { property: "og:title", content: "NairaTrader Academy — Forex Mentorship & VIP Signals" },
      { property: "og:description", content: "Mentorship & VIP signals for serious forex traders. Pay with crypto." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
             style={{ backgroundImage: "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 40%), radial-gradient(circle at 80% 70%, var(--gold) 0, transparent 35%)" }} />
        <div className="container-tight relative py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-gold font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              Mentorship from $5 · VIP from $10
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05]">
              Trade forex with <span className="gold-gradient-text">conviction.</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl">
              {SITE.tagline} A mentorship organised by NairaTrader and guided by three professional traders.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-ink hover:bg-gold-soft font-semibold">
                <Link to="/plans">View plans <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gold/60 bg-transparent text-gold hover:bg-gold hover:text-ink font-semibold">
                <Link to="/how-it-works">How it works</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
              <Stat n="3" l="Pro mentors" />
              <Stat n="24/7" l="Community" />
              <Stat n="Crypto" l="Easy payment" />
            </div>
          </div>
        </div>
      </section>

      {/* Mentor strip */}
      <section className="border-y border-border bg-secondary">
        <div className="container-tight py-10 grid sm:grid-cols-3 gap-6">
          {SITE.mentors.map((m) => (
            <a key={m.handle} href={m.x} target="_blank" rel="noreferrer"
               className="group flex items-center gap-4 rounded-lg bg-card p-4 border border-border hover:border-gold transition">
              <div className="h-12 w-12 rounded-full bg-ink text-gold grid place-items-center font-display font-bold text-lg">
                {m.name[0]}
              </div>
              <div>
                <div className="font-semibold">{m.name}</div>
                <div className="text-sm text-muted-foreground group-hover:text-gold transition">{m.handle}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="py-20">
        <div className="container-tight">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold">Built for traders who want to <span className="gold-gradient-text">level up.</span></h2>
            <p className="mt-4 text-muted-foreground">Whether you're starting out or scaling up, our plans give you the edge without the noise.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Feature icon={LineChart} title="Live signals" desc="High-probability setups delivered with entries, SLs and TPs." />
            <Feature icon={Users} title="Mentorship" desc="Direct guidance from three traders who run real accounts." />
            <Feature icon={ShieldCheck} title="Risk first" desc="We teach risk management before profit. Survive, then thrive." />
            <Feature icon={Zap} title="Fast onboarding" desc="Pay with crypto, send proof, get the Telegram link." />
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="bg-ink text-white py-20">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Simple pricing. Serious value.</h2>
              <p className="mt-4 text-white/70 max-w-md">
                Two plans, transparent crypto checkout. Cancel anytime by simply not renewing.
              </p>
              <Button asChild className="mt-6 bg-gold text-ink hover:bg-gold-soft font-semibold">
                <Link to="/plans">See pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid gap-4">
              <PricePeek name="Mentorship" price={5} bullets={["Group mentorship", "Strategy walkthroughs", "Weekly Q&A"]} />
              <PricePeek name="VIP Signals" price={10} highlight bullets={["Everything in Mentorship", "Daily live signals", "Priority support"]} />
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </SiteShell>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-gold font-display">{n}</div>
      <div className="text-xs uppercase tracking-wider">{l}</div>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-border p-6 bg-card hover:border-gold transition">
      <div className="h-10 w-10 rounded-md bg-ink text-gold grid place-items-center mb-4">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function PricePeek({ name, price, bullets, highlight }: { name: string; price: number; bullets: string[]; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-6 border ${highlight ? "border-gold bg-gold/5" : "border-white/10 bg-white/[0.03]"}`}>
      <div className="flex items-baseline justify-between">
        <div className="font-display text-lg font-semibold">{name}</div>
        <div className="text-3xl font-bold gold-gradient-text">${price}</div>
      </div>
      <ul className="mt-4 space-y-1.5 text-sm text-white/70">
        {bullets.map((b) => <li key={b}>• {b}</li>)}
      </ul>
    </div>
  );
}

function CTA() {
  return (
    <section className="py-20">
      <div className="container-tight">
        <div className="rounded-2xl bg-ink text-white p-10 md:p-14 text-center border border-gold/20">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to trade with a real plan?</h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">Join NairaTrader Academy and trade alongside professionals.</p>
          <Button asChild size="lg" className="mt-6 bg-gold text-ink hover:bg-gold-soft font-semibold">
            <Link to="/plans">Get started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
