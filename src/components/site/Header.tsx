import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/plans", label: "Plans" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="container-tight flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-white/80">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild className="bg-gold text-ink hover:bg-gold-soft font-semibold">
            <Link to="/plans">Join now</Link>
          </Button>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-ink">
          <div className="container-tight flex flex-col py-3 gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-white/80 hover:text-gold"
                activeProps={{ className: "py-2 text-gold" }}
              >
                {n.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-gold text-ink hover:bg-gold-soft">
              <Link to="/plans" onClick={() => setOpen(false)}>Join now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
