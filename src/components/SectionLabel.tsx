export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        color: "var(--text-muted)",
        textTransform: "uppercase" as const,
        marginBottom: "24px",
      }}
    >
      {children}
    </div>
  )
}
