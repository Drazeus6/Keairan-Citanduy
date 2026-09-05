interface TickerProps {
  badge?: string;
  message: string;
  variant?: "siaga" | "waspada" | "info";
}

export function Ticker({ badge = "SIAGA", message, variant = "siaga" }: TickerProps) {
  const bg =
    variant === "siaga" ? "var(--status-siaga)" :
    variant === "waspada" ? "var(--status-waspada)" :
    "var(--paper-dark-2)";

  return (
    <div className="ticker">
      <span className="ticker-badge" style={{ background: bg }}>
        <span className="ticker-blink" /> {badge}
      </span>
      <span>{message}</span>
    </div>
  );
}
