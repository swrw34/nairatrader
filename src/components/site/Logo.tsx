export function Logo({ className = "h-8 w-auto", invert = true }: { className?: string; invert?: boolean }) {
  return (
    <img
      src="/naira-logo.png"
      alt="NairaTrader Academy"
      className={className}
      style={invert ? { filter: "invert(1)" } : undefined}
    />
  );
}
