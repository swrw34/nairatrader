import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white/70">
      <div className="container-tight py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-9 w-auto mb-4" />
          <p className="text-sm max-w-sm">
            {SITE.tagline} Powered by a partnership with three professional traders.
          </p>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/how-it-works" className="hover:text-gold">How it works</Link></li>
            <li><Link to="/plans" className="hover:text-gold">Plans</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Mentors</h4>
          <ul className="space-y-2 text-sm">
            {SITE.mentors.map((m) => (
              <li key={m.handle}>
                <a href={m.x} target="_blank" rel="noreferrer" className="hover:text-gold">
                  {m.name} <span className="text-white/40">{m.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-tight py-5 text-xs text-white/50 flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} NairaTrader. All rights reserved.</p>
          <p>Trading involves risk. Past performance is not indicative of future results.</p>
        </div>
      </div>
    </footer>
  );
}
