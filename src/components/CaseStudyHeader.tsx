import Link from "next/link"
import { TechBadge } from "./TechBadge"

interface CaseStudyHeaderProps {
  title: string
  tagline: string
  tech: string[]
  links: { label: string; href: string; external?: boolean }[]
}

export function CaseStudyHeader({ title, tagline, tech, links }: CaseStudyHeaderProps) {
  return (
    <header style={{ marginBottom: "48px" }}>
      <Link
        href="/projects"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          color: "var(--text-muted)",
          textDecoration: "none",
          marginBottom: "24px",
        }}
      >
        ← Projects
      </Link>

      <h1
        style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700,
          color: "var(--text)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          margin: "0 0 8px",
        }}
      >
        {title}
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "var(--text-2)",
          margin: "0 0 24px",
          lineHeight: 1.5,
        }}
      >
        {tagline}
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap" as const,
          marginBottom: "20px",
        }}
      >
        {links.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "36px",
                padding: "0 14px",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "13px",
                color: "var(--text-2)",
                textDecoration: "none",
                transition: "border-color 150ms",
              }}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "36px",
                padding: "0 14px",
                background: "var(--accent)",
                border: "1px solid var(--accent)",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          )
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
        {tech.map((t) => (
          <TechBadge key={t} label={t} />
        ))}
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--border)",
          margin: "32px 0 0",
        }}
      />
    </header>
  )
}
