interface StatItem {
  num: string;
  label: string;
}

interface StatStripProps {
  items: StatItem[];
}

export function StatStrip({ items }: StatStripProps) {
  return (
    <div className="stat-strip" role="list">
      {items.map((item, idx) => (
        <div className="stat-item" key={idx} role="listitem">
          <div className="stat-num mono">{item.num}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
