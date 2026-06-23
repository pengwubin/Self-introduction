export default function PlaceholderImage({ index = 1, caption, className = "" }) {
  return (
    <div className={"relative overflow-hidden grain " + className} style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "44px", fontWeight: 300, fontStyle: "italic", color: "var(--color-text-tertiary)", opacity: 0.55, lineHeight: 1, marginBottom: "6px", fontVariationSettings: '"opsz" 144, "SOFT" 80' }}>
            {String(index).padStart(2, "0")}
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.18em", color: "var(--color-text-tertiary)", opacity: 0.7 }}>
            {caption || "图 " + index}
          </span>
        </div>
      </div>
      <span className="absolute top-2 left-2" style={{ width: 7, height: 7, borderTop: "1px solid var(--color-accent-line)", borderLeft: "1px solid var(--color-accent-line)" }} />
      <span className="absolute top-2 right-2" style={{ width: 7, height: 7, borderTop: "1px solid var(--color-accent-line)", borderRight: "1px solid var(--color-accent-line)" }} />
      <span className="absolute bottom-2 left-2" style={{ width: 7, height: 7, borderBottom: "1px solid var(--color-accent-line)", borderLeft: "1px solid var(--color-accent-line)" }} />
      <span className="absolute bottom-2 right-2" style={{ width: 7, height: 7, borderBottom: "1px solid var(--color-accent-line)", borderRight: "1px solid var(--color-accent-line)" }} />
    </div>
  );
}
