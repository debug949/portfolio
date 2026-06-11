import type { Metadata } from "next"
import { CONTACT, SKILL_GROUPS } from "@/lib/data"
import { PrintButton } from "@/components/PrintButton"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Full-stack engineer · Next.js, TypeScript, PostgreSQL, OAuth, GitHub Apps, AI integration.",
}

const SKILL_ICONS: Record<string, string> = {
  "Languages":       "{}",
  "Frameworks":      "⬡",
  "Database":        "▦",
  "Auth & Security": "◈",
  "AI":              "◎",
  "Infrastructure":  "△",
}

const SKILL_COLORS: Record<string, string> = {
  "Languages":       "#00c56e",
  "Frameworks":      "#e8a020",
  "Database":        "#60a5fa",
  "Auth & Security": "#e8304a",
  "AI":              "#a78bfa",
  "Infrastructure":  "#94a3b8",
}

export default function ResumePage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 20px 80px" }}>

      {/* Print action */}
      <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
        <PrintButton />
      </div>

      {/* ── Header ──────────────────────────────────────────────── */}
      <header
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)",
          border: "1px solid #1a1a1a",
          borderRadius: "20px",
          padding: "32px 32px 28px",
          marginBottom: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle accent glow top-right */}
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(0,197,110,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontStyle: "italic",
                fontSize: "clamp(36px, 6vw, 52px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                margin: "0 0 12px",
                background: "linear-gradient(135deg, #f0f0f0 0%, #00c56e 70%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Veeresh
            </h1>
            <p style={{ fontSize: "14px", color: "#999999", margin: "0 0 16px", lineHeight: 1.5 }}>
              Full-stack engineer · Next.js · TypeScript · GitHub Apps
            </p>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              color: "#000",
              background: "var(--accent)",
              borderRadius: "9999px",
              padding: "6px 14px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              alignSelf: "flex-start",
            }}
          >
            ◎ Available
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", fontSize: "13px" }}>
          <a href={`mailto:${CONTACT.email}`} style={{ color: "#555555", textDecoration: "none" }}>
            ↗ {CONTACT.email}
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" style={{ color: "#555555", textDecoration: "none" }}>
            ↗ github.com/debug949
          </a>
          <span style={{ color: "#555555" }}>
            ◎ Telangana, India
          </span>
        </div>
      </header>

      {/* ── Quick stats ──────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {[
          { value: "3",     label: "Projects shipped" },
          { value: "2026",  label: "Year started" },
          { value: "19+",   label: "Parallel checks" },
          { value: "0/100", label: "Verdict score" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#0a0a0a",
              border: "1px solid #1a1a1a",
              borderRadius: "14px",
              padding: "16px 14px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontStyle: "italic",
                fontSize: "22px",
                color: "var(--accent)",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: "10px", color: "#555555", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Skills ──────────────────────────────────────────────── */}
      <section style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#555555",
            marginBottom: "14px",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Skills
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
          {SKILL_GROUPS.map((group) => {
            const color = SKILL_COLORS[group.label] ?? "var(--accent)"
            const icon  = SKILL_ICONS[group.label]  ?? "·"
            return (
              <div
                key={group.label}
                style={{
                  background: "#0a0a0a",
                  border: "1px solid #1a1a1a",
                  borderRadius: "14px",
                  padding: "16px",
                  borderLeft: `3px solid ${color}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "14px", color, fontFamily: "var(--font-geist-mono)" }}>{icon}</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#999999" }}>
                    {group.label}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: "11px",
                        color: "#c0c0c0",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid #1a1a1a",
                        borderRadius: "6px",
                        padding: "2px 8px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────────── */}
      <section style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#555555",
            marginBottom: "14px",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Projects
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* ShipSafe */}
          <div
            style={{
              background: "#0a0a0a",
              border: "1px solid #1a1a1a",
              borderRadius: "16px",
              padding: "22px 24px",
              borderLeft: "3px solid #00c56e",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px", background: "radial-gradient(circle, rgba(0,197,110,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", fontSize: "18px", fontWeight: 400, color: "#f0f0f0" }}>
                  ShipSafe
                </span>
                <span style={{ fontSize: "12px", color: "#555555" }}>Web Security Audit Tool</span>
              </div>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: "#555555" }}>2026</span>
            </div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: "#00c56e", marginBottom: "10px", opacity: 0.8 }}>
              Next.js · TypeScript · Prisma 7 · PostgreSQL · Groq · Vercel
            </div>
            <p style={{ fontSize: "13px", color: "#999999", margin: "0 0 10px", lineHeight: 1.75 }}>
              Web security scanner that runs 19 parallel HTTP checks (HTTPS, headers, exposed files, cookies, performance) and generates AI-powered, prioritized remediation. Model-agnostic AI interface switchable via env var.
            </p>
            <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
              <a href="https://shipsafe-vihan.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "#00c56e", textDecoration: "none" }}>
                shipsafe-vihan.vercel.app ↗
              </a>
              <a href="https://github.com/debug949/shipsafe" target="_blank" rel="noopener noreferrer" style={{ color: "#555555", textDecoration: "none" }}>
                github ↗
              </a>
            </div>
          </div>

          {/* Patchwork */}
          <div
            style={{
              background: "#0a0a0a",
              border: "1px solid #1a1a1a",
              borderRadius: "16px",
              padding: "22px 24px",
              borderLeft: "3px solid #e8a020",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px", background: "radial-gradient(circle, rgba(232,160,32,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", fontSize: "18px", fontWeight: 400, color: "#f0f0f0" }}>
                  Patchwork
                </span>
                <span style={{ fontSize: "12px", color: "#555555" }}>AI Changelog Generator</span>
              </div>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: "#555555" }}>2026</span>
            </div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: "#e8a020", marginBottom: "10px", opacity: 0.8 }}>
              Next.js · TypeScript · iron-session · GitHub OAuth · Groq · Vercel
            </div>
            <p style={{ fontSize: "13px", color: "#999999", margin: "0 0 10px", lineHeight: 1.75 }}>
              Multi-tenant SaaS connecting to GitHub via raw OAuth 2.0. Generates categorized changelogs with AI from commit history. CSRF protection, encrypted sessions, embeddable iframe widget, and public JSON API.
            </p>
            <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
              <a href="https://patchwork-vihan.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "#e8a020", textDecoration: "none" }}>
                patchwork-vihan.vercel.app ↗
              </a>
              <a href="https://github.com/debug949/patchwork" target="_blank" rel="noopener noreferrer" style={{ color: "#555555", textDecoration: "none" }}>
                github ↗
              </a>
            </div>
          </div>

          {/* Verdict */}
          <div
            style={{
              background: "#0a0a0a",
              border: "1px solid #1a1a1a",
              borderRadius: "16px",
              padding: "22px 24px",
              borderLeft: "3px solid #e8304a",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px", background: "radial-gradient(circle, rgba(232,48,74,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", fontSize: "18px", fontWeight: 400, color: "#f0f0f0" }}>
                  Verdict
                </span>
                <span style={{ fontSize: "12px", color: "#555555" }}>PR Risk Engine — GitHub App</span>
              </div>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: "#555555" }}>2026</span>
            </div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: "#e8304a", marginBottom: "10px", opacity: 0.8 }}>
              Next.js · TypeScript · GitHub Apps · Upstash Redis · OSV.dev
            </div>
            <p style={{ fontSize: "13px", color: "#999999", margin: "0 0 10px", lineHeight: 1.75 }}>
              GitHub App that posts a deterministic trust score (0–100) on every PR. Scans added lines for credential leaks, queries OSV.dev for CVEs in new dependencies, and applies zone-weighted risk multipliers (AUTH 2.5×, PAYMENT 2.5×). Not AI — fully reproducible.
            </p>
            <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
              <a href="https://verdict-vihan.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "#e8304a", textDecoration: "none" }}>
                verdict-vihan.vercel.app ↗
              </a>
              <a href="https://github.com/debug949/verdict" target="_blank" rel="noopener noreferrer" style={{ color: "#555555", textDecoration: "none" }}>
                github ↗
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Education ────────────────────────────────────────────── */}
      <section>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#555555",
            marginBottom: "14px",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Education
        </div>
        <div
          style={{
            background: "#0a0a0a",
            border: "1px solid #1a1a1a",
            borderRadius: "16px",
            padding: "22px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#f0f0f0", marginBottom: "4px" }}>
              Class 10 <span style={{ fontWeight: 400, color: "#555555", fontSize: "13px" }}>(in progress)</span>
            </div>
            <div style={{ fontSize: "13px", color: "#555555" }}>
              Shantiniketan Vidyalaya · Telangana, India
            </div>
          </div>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "12px",
              color: "#000",
              background: "var(--accent)",
              borderRadius: "8px",
              padding: "4px 12px",
              fontWeight: 600,
            }}
          >
            2026
          </span>
        </div>
      </section>

    </div>
  )
}
