import { ReactNode } from "react";

interface BandDarkProps {
  eyebrow?: string;
  title: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
}

export function BandDark({ eyebrow, title, description, children }: BandDarkProps) {
  return (
    <section className="band-dark">
      <div className="wrap">
        {eyebrow && <span className="eyebrow" style={{ background: "var(--accent)", color: "var(--accent-ink)", padding: "4px 10px", borderRadius: 999 }}>{eyebrow}</span>}
        <h2 className="display" style={{ marginTop: 16, marginBottom: 18, maxWidth: 900 }}>{title}</h2>
        {description && <p className="lede" style={{ marginBottom: children ? 32 : 0 }}>{description}</p>}
        {children}
      </div>
    </section>
  );
}
