import Link from "next/link"
import type { Project } from "@/lib/data"
import { TechBadge } from "./TechBadge"

const CARD_THEMES: Record<string, {
  gradient: string
  accentColor: string
  borderColor: string
  glowColor: string
}> = {
  shipsafe: {
    gradient: "linear-gradient(145deg, #0a1f38 0%, #071422 60%, #060a0f 100%)",
    accentColor: "#2f81f7",
    borderColor: "rgba(47, 129, 247, 0.2)",
    glowColor: "rgba(47, 129, 247, 0.08)",
  },
  patchwork: {
    gradient: "linear-gradient(145deg, #160d30 0%, #0e0820 60%, #060a0f 100%)",
    accentColor: "#8b5cf6",
    borderColor: "rgba(139, 92, 246, 0.2)",
    glowColor: "rgba(139, 92, 246, 0.08)",
  },
}

const DEFAULT_THEME = {
  gradient: "linear-gradient(145deg, var(--bg-surface) 0%, var(--bg) 100%)",
  accentColor: "var(--accent)",
  borderColor: "var(--border)",
  glowColor: "transparent",
}

export function ProjectCard({ project }: { project: Project }) {
  const theme = CARD_THEMES[project.slug] ?? DEFAULT_THEME

  return (
    <article
      className="project-card"
      style={{
        background: theme.gradient,
        border: `1px solid ${theme.borderColor}`,
        borderRadius: "20px",
        padding: "28px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "16px",
        position: "relative" as const,
        overflow: "hidden" as const,
        boxShadow: `0 0 60px ${theme.glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Subtle top highlight line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${theme.accentColor}55, transparent)`,
        }}
      />

      {/* Corner decoration */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "180px",
          height: "180px",
          background: `radial-gradient(circle, ${theme.accentColor}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
            fontSize: "26px",
            fontWeight: 400,
            color: "var(--text)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {project.name}
        </h2>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "10px",
            color: "var(--green)",
            background: "rgba(63, 185, 80, 0.1)",
            border: "1px solid rgba(63, 185, 80, 0.2)",
            borderRadius: "9999px",
            padding: "3px 8px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "var(--green)",
              boxShadow: "0 0 4px var(--green)",
              display: "inline-block",
            }}
          />
          live
        </span>
      </div>

      {/* Tagline */}
      <p style={{ fontSize: "14px", color: "var(--text-2)", margin: 0, lineHeight: 1.55 }}>
        {project.tagline}
      </p>

      {/* Stats */}
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column" as const,
          gap: "5px",
        }}
      >
        {project.stats.map((stat) => (
          <li
            key={stat}
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <span style={{ color: theme.accentColor, flexShrink: 0, fontWeight: 600 }}>
              ·
            </span>
            {stat}
          </li>
        ))}
      </ul>

      {/* Tech badges */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
        {project.tech.map((t) => (
          <TechBadge key={t} label={t} />
        ))}
      </div>

      {/* Links — revealed on hover via CSS .card-links class */}
      <div
        className="card-links"
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap" as const,
          paddingTop: "12px",
          borderTop: `1px solid ${theme.borderColor}`,
        }}
      >
        <Link
          href={project.caseStudyPath}
          style={{
            fontSize: "13px",
            color: theme.accentColor,
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Case study →
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}
        >
          GitHub ↗
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}
        >
          Live demo ↗
        </a>
      </div>
    </article>
  )
}
