import type { Metadata } from "next"
import { CONTACT, SKILL_GROUPS } from "@/lib/data"
import { PrintButton } from "@/components/PrintButton"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Full-stack engineer · Next.js, TypeScript, PostgreSQL, OAuth, AI integration.",
}

const mono = { fontFamily: "var(--font-geist-mono)" } as const

const divider = (
  <hr
    style={{
      border: "none",
      borderTop: "1px solid var(--border)",
      margin: "20px 0",
    }}
  />
)

export default function ResumePage() {
  return (
    <div
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "48px 20px 80px",
      }}
    >
      {/* Print action — hidden on print */}
      <div
        className="no-print"
        style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}
      >
        <PrintButton />
      </div>

      {/* Header */}
      <header style={{ marginBottom: "4px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            margin: "0 0 8px",
          }}
        >
          Veeresh
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap" as const,
            gap: "4px 16px",
            fontSize: "13px",
            color: "var(--text-muted)",
          }}
        >
          <a href={`mailto:${CONTACT.email}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            {CONTACT.email}
          </a>
          <span>·</span>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-muted)", textDecoration: "none" }}
          >
            github.com/debug949
          </a>
          <span>·</span>
          <span>Telangana, India</span>
        </div>
      </header>

      {divider}

      {/* Skills */}
      <section style={{ marginBottom: "24px" }}>
        <h2
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "var(--text-muted)",
            margin: "0 0 12px",
          }}
        >
          Skills
        </h2>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              style={{
                display: "grid",
                gridTemplateColumns: "130px 1fr",
                gap: "8px",
                fontSize: "13px",
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>{group.label}</span>
              <span style={{ color: "var(--text-2)" }}>{group.skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* Projects */}
      <section style={{ marginBottom: "24px" }}>
        <h2
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "var(--text-muted)",
            margin: "0 0 20px",
          }}
        >
          Projects
        </h2>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: "24px" }}>
          {/* ShipSafe */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap" as const,
                gap: "4px",
                marginBottom: "4px",
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>
                ShipSafe — Web Security Audit Tool
              </span>
              <span style={{ ...mono, fontSize: "12px", color: "var(--text-muted)" }}>2026</span>
            </div>
            <div
              style={{
                ...mono,
                fontSize: "12px",
                color: "var(--text-muted)",
                marginBottom: "6px",
              }}
            >
              Next.js · TypeScript · Prisma 7 · PostgreSQL · Groq · Vercel
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-2)", margin: "0 0 6px", lineHeight: 1.7 }}>
              Built a web security scanner that runs 19 parallel HTTP checks (HTTPS, security
              headers, exposed files, cookies, performance) and generates AI-powered, prioritized
              remediation. Engineered a model-agnostic AI interface (Groq/OpenAI/Grok) switchable
              via env var. Deployed with shareable report links backed by Neon PostgreSQL.
            </p>
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              <a
                href="https://shipsafe-xzne.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                shipsafe-xzne.vercel.app
              </a>
              {" · "}
              <a
                href="https://github.com/debug949/shipsafe"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                github.com/debug949/shipsafe
              </a>
            </div>
          </div>

          {/* Patchwork */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap" as const,
                gap: "4px",
                marginBottom: "4px",
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>
                Patchwork — AI Changelog Generator
              </span>
              <span style={{ ...mono, fontSize: "12px", color: "var(--text-muted)" }}>2026</span>
            </div>
            <div
              style={{
                ...mono,
                fontSize: "12px",
                color: "var(--text-muted)",
                marginBottom: "6px",
              }}
            >
              Next.js · TypeScript · iron-session · GitHub OAuth · Groq · Vercel
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-2)", margin: "0 0 6px", lineHeight: 1.7 }}>
              Built a multi-tenant SaaS that connects to GitHub via raw OAuth 2.0, fetches commit
              history, and generates categorized changelogs with AI. Implemented CSRF protection,
              encrypted sessions, cascade-delete data model, embeddable iframe widget, and public
              JSON API.
            </p>
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              <a
                href="https://patchwork-theta.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                patchwork-theta.vercel.app
              </a>
              {" · "}
              <a
                href="https://github.com/debug949/patchwork"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                github.com/debug949/patchwork
              </a>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* Education */}
      <section>
        <h2
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "var(--text-muted)",
            margin: "0 0 12px",
          }}
        >
          Education
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap" as const,
            gap: "4px",
            marginBottom: "4px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
            Class 10 (in progress)
          </span>
          <span style={{ ...mono, fontSize: "12px", color: "var(--text-muted)" }}>2026</span>
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
          Shantiniketan Vidyalaya, Telangana, India
        </p>
      </section>
    </div>
  )
}
