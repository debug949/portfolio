export function ArchitectureDiagram({ children }: { children: string }) {
  return (
    <pre
      style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        color: "var(--text-2)",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "20px 24px",
        overflowX: "auto" as const,
        lineHeight: 1.6,
        margin: "16px 0",
        whiteSpace: "pre" as const,
      }}
    >
      {children}
    </pre>
  )
}
