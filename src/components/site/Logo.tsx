import logoAsset from "@/assets/naira-logo.png.asset.json";

export function Logo({ className = "h-8 w-auto", invert = true }: { className?: string; invert?: boolean }) {
  return (
    <img
      src={logoAsset.url}
      alt="NairaTrader Academy"
      className={className}
      style={invert ? { filter: "invert(1)" } : undefined}
    />
  );
}
