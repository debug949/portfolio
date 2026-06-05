export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 24px",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          Built with Next.js · © 2026 Veeresh
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          <a
            href="https://github.com/debug949"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
