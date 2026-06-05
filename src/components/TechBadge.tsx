export function TechBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: "11px",
        color: "var(--text-muted)",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        padding: "2px 7px",
        whiteSpace: "nowrap" as const,
        display: "inline-block",
      }}
    >
      {label}
    </span>
  )
}
