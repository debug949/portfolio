import Link from "next/link"
import type { Project } from "@/lib/data"
import { TechBadge } from "./TechBadge"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "12px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text)",
          }}
        >
          {project.name}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "11px",
            color: "var(--green)",
            background: "rgba(63, 185, 80, 0.1)",
            border: "1px solid rgba(63, 185, 80, 0.2)",
            borderRadius: "99px",
            padding: "2px 8px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--green)",
              display: "inline-block",
            }}
          />
          live
        </span>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-2)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
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
          gap: "4px",
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
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>·</span>
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

      {/* Links */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap" as const,
          marginTop: "4px",
          paddingTop: "12px",
          borderTop: "1px solid var(--border-muted)",
        }}
      >
        <Link
          href={project.caseStudyPath}
          style={{
            fontSize: "13px",
            color: "var(--accent)",
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
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            textDecoration: "none",
          }}
        >
          GitHub ↗
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            textDecoration: "none",
          }}
        >
          Live demo ↗
        </a>
      </div>
    </article>
  )
}
