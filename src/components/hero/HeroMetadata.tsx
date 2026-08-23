import { portfolio } from "@/config/portfolio";

export function HeroMetadata() {
  return <>
    <aside className="metadata metadata-left" aria-label="Portfolio details">
      <span className="cross">＋</span>
      <span className="vertical-name">{portfolio.name} {portfolio.suffix}</span>
      <span className="lime-dot" />
      <div><span>EST.</span><strong>{portfolio.established}</strong></div>
      <div className="coordinates">{portfolio.coordinates.latitude}</div>
      <span className="barcode" aria-hidden="true" />
    </aside>
    <aside className="metadata metadata-right" aria-label="Availability and version">
      <span className="cross">＋</span>
      <div><strong>AVAILABLE</strong><span>FOR {portfolio.availableFor}</span></div>
      <i /><span>{portfolio.coordinates.longitude}</span><i />
      <div><span>VERSION</span><strong>{portfolio.version}</strong></div>
      <i /><div><span>LAST UPDATE</span><strong>{portfolio.lastUpdated.toUpperCase()}</strong></div>
    </aside>
  </>;
}
