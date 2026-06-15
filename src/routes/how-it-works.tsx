import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — NairaTrader Academy" },
      { name: "description", content: "Four simple steps: choose a plan, pay with crypto, send proof, get your Telegram link. NairaTrader Academy is run by three professional traders." },
      { property: "og:title", content: "How NairaTrader Academy works" },
      { property: "og:description", content: "Choose a plan, pay with crypto (Busha for Naira → USDT), send proof, get access to the Telegram group." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { n: "01", t: "Choose your plan", d: "Mentorship ($5) for guidance and strategy, or VIP ($10) for daily live signals plus everything in Mentorship." },
  { n: "02", t: "Pay with crypto", d: "Send your payment in BTC or USDT (TRC-20). New to crypto? Use Busha — a Nigerian app — to convert Naira to USDT in minutes." },
  { n: "03", t: "Submit proof", d: "Fill out the proof form with your name, email, transaction hash, a screenshot of the payment and any helpful notes." },
  { n: "04", t: "Get the Telegram link", d: "We verify the payment, then email you the private Telegram group link — usually within a few hours." },
];

const faqs = [
  { q: "Who runs the mentorship and VIP groups?", a: "NairaTrader Academy partners with three professional traders — Sabiigal (@midrizzy1), VixMayor (@Vix_Mayor) and DAX (@thissdax) — who handle the mentorship and VIP signals directly." },
  { q: "Why crypto only?", a: "Crypto is fast, borderless, and works for everyone in our community regardless of country or bank. Nigerians can use Busha to convert Naira to USDT in minutes." },
  { q: "Is the access recurring?", a: "Plans are monthly. To stay in the group beyond a month, you simply renew by sending a new payment and proof." },
  { q: "Do you guarantee profits?", a: "No. Trading involves risk and no one can guarantee profits. We teach risk management and discipline — the rest is on you." },
  { q: "How long until I get the Telegram link?", a: "After we receive your proof we usually verify and email the link within a few hours, often faster." },
];

function HowItWorks() {
  return (
    <SiteShell>
      <section className="bg-ink text-white py-20">
        <div className="container-tight max-w-3xl">
          <p className="text-gold text-sm uppercase tracking-widest">How it works</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">From sign-up to signals in 4 steps.</h1>
          <p className="mt-6 text-white/70 text-lg">
            We've kept onboarding deliberately simple. Pay, prove, and you're in.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-tight grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-card p-6">
              <div className="text-gold font-display text-3xl font-bold">{s.n}</div>
              <h3 className="mt-3 font-semibold text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="container-tight mt-10">
          <Button asChild size="lg" className="bg-ink text-white hover:bg-ink/90">
            <Link to="/plans">Go to Plans</Link>
          </Button>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container-tight max-w-3xl">
          <h2 className="text-3xl font-bold">FAQ</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteShell>
  );
}
