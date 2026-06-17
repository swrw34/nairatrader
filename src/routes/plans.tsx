import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { PaymentProofForm } from "@/components/site/PaymentProofForm";
import { toast } from "sonner";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Plans & Pricing — NairaTrader Academy" },
      { name: "description", content: "Mentorship $15 · VIP Signals $20. Pay with BTC or USDT (TRC-20) and join the NairaTrader Academy community." },
      { property: "og:title", content: "NairaTrader Academy Plans — Mentorship $15 · VIP $20" },
      { property: "og:description", content: "Affordable forex mentorship and VIP signals. Pay with crypto." },
    ],
  }),
  component: Plans,
});

function Plans() {
  const [selected, setSelected] = useState<"mentorship" | "vip">("vip");

  const scrollToPay = (plan: "mentorship" | "vip") => {
    setSelected(plan);
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SiteShell>
      <section className="bg-ink text-white py-20">
        <div className="container-tight">
          <p className="text-gold text-sm uppercase tracking-widest">Plans</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold max-w-2xl">Two plans. Both built to make you a better trader.</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container-tight grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <PlanCard
            name="Mentorship"
            price={15}
            tagline="Learn the craft"
            features={[
              "Access to the private mentorship group",
              "Weekly strategy walkthroughs",
              "Q&A with the mentors",
              "Risk management framework",
              "Community of serious traders",
            ]}
            onSelect={() => scrollToPay("mentorship")}
          />
          <PlanCard
            name="VIP Signals"
            price={10}
            tagline="Trade with the pros"
            highlight
            features={[
              "Everything in Mentorship",
              "Daily live forex signals",
              "Entries, stop-loss & take-profit",
              "Priority chat support",
              "Trade recap & breakdowns",
            ]}
            onSelect={() => scrollToPay("vip")}
          />
        </div>
      </section>

      {/* Busha guide */}
      <section className="bg-secondary py-16 border-y border-border">
        <div className="container-tight max-w-4xl">
          <p className="text-gold text-sm uppercase tracking-widest">New to crypto?</p>
          <h2 className="mt-2 text-3xl font-bold">Pay in 4 steps with Busha</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Busha is a Nigerian app that makes converting Naira to USDT fast and simple — the easiest route for most of our members.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "01", t: "Create a Busha account", d: "Sign up free at busha.io and complete the quick verification." },
              { n: "02", t: "Fund with Naira", d: "Top up your Busha wallet by bank transfer from any Nigerian bank." },
              { n: "03", t: "Buy USDT (TRC-20)", d: "Convert Naira to the USD amount of your plan ($5 or $10) in USDT." },
              { n: "04", t: "Send & submit proof", d: "Send USDT to our wallet below, then fill the proof form." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-border bg-card p-5">
                <div className="text-gold font-display text-2xl font-bold">{s.n}</div>
                <h3 className="mt-2 font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button asChild variant="outline" className="border-gold/60 text-foreground hover:bg-gold hover:text-ink">
              <a href={SITE.busha} target="_blank" rel="noopener noreferrer">
                Open Busha <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="checkout" className="bg-background py-20 scroll-mt-20">
        <div className="container-tight grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">Pay with crypto</h2>
            <p className="mt-2 text-muted-foreground">
              Send the exact USD amount in BTC or USDT (TRC-20) to one of the wallets below.
              Then fill out the proof form on the right.
            </p>

            <div className="mt-6 rounded-xl border border-border bg-card p-6">
              <div className="text-sm text-muted-foreground">Selected plan</div>
              <div className="mt-1 flex items-baseline justify-between">
                <div className="font-display text-xl font-semibold capitalize">{selected === "vip" ? "VIP Signals" : "Mentorship"}</div>
                <div className="text-3xl font-bold gold-gradient-text">
                  ${SITE.plans[selected].price}
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  className={`flex-1 rounded-md border px-3 py-2 text-sm transition ${selected === "mentorship" ? "border-gold bg-gold/10" : "border-border"}`}
                  onClick={() => setSelected("mentorship")}
                >Mentorship · $5</button>
                <button
                  className={`flex-1 rounded-md border px-3 py-2 text-sm transition ${selected === "vip" ? "border-gold bg-gold/10" : "border-border"}`}
                  onClick={() => setSelected("vip")}
                >VIP · $10</button>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <WalletRow label="Bitcoin (BTC)" address={SITE.wallets.BTC} />
              <WalletRow label="USDT (TRC-20)" address={SITE.wallets.USDT} />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Tip: send exactly the USD-equivalent amount. Network fees are paid by you.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-xl font-display font-semibold">Submit payment proof</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              After paying, fill this form. We'll verify and email you the Telegram link.
            </p>
            <div className="mt-6">
              <PaymentProofForm initialPlan={selected} />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function PlanCard({ name, price, tagline, features, highlight, onSelect }: {
  name: string; price: number; tagline: string; features: string[]; highlight?: boolean; onSelect: () => void;
}) {
  return (
    <div className={`relative rounded-2xl p-8 border ${highlight ? "border-gold bg-ink text-white" : "border-border bg-card"}`}>
      {highlight && (
        <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
          Most popular
        </span>
      )}
      <div className="text-sm uppercase tracking-widest text-gold">{tagline}</div>
      <h3 className="mt-2 text-2xl font-display font-bold">{name}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-5xl font-bold gold-gradient-text">${price}</span>
        <span className={highlight ? "text-white/60" : "text-muted-foreground"}>/month</span>
      </div>
      <ul className="mt-6 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" /> <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={onSelect}
        className={`mt-8 w-full font-semibold ${highlight ? "bg-gold text-ink hover:bg-gold-soft" : "bg-ink text-white hover:bg-ink/90"}`}
      >
        Get {name}
      </Button>
    </div>
  );
}

function WalletRow({ label, address }: { label: string; address: string }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success(`${label} address copied`);
    } catch {
      toast.error("Could not copy");
    }
  };
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between text-sm">
        <div className="font-semibold">{label}</div>
        <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <Copy className="h-3.5 w-3.5" /> Copy
        </button>
      </div>
      <div className="mt-2 font-mono text-xs break-all text-muted-foreground">{address}</div>
    </div>
  );
}
