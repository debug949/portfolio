export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "40px 24px",
        marginTop: "40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient accent at top edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(47,129,247,0.3), rgba(139,92,246,0.3), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap" as const,
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2f81f7 0%, #8b5cf6 100%)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            V
          </span>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            © 2026 Veeresh · Built with Next.js
          </span>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <a
            href="https://github.com/debug949"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-text"
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 150ms",
            }}
          >
            GitHub ↗
          </a>
          <a
            href="mailto:vihanveeresh@gmail.com"
            className="hover-text"
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 150ms",
            }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
