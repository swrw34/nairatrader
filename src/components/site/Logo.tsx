import logoAsset from "@/assets/naira-logo.png.asset.json";

export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return <img src={logoAsset.url} alt="NairaTrader" className={className} />;
}
