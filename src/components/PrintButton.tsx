"use client"

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        fontSize: "13px",
        color: "var(--text-muted)",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "6px 12px",
        cursor: "pointer",
      }}
    >
      Print / Save PDF
    </button>
  )
}
