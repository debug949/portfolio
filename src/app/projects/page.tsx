import type { Metadata } from "next"
import { PROJECTS } from "@/lib/data"
import { ProjectCard } from "@/components/ProjectCard"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "ShipSafe, Patchwork, and Verdict — three production tools built by a 15-year-old developer.",
}

export default function ProjectsPage() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "64px 20px 80px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          color: "var(--text)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          margin: "0 0 8px",
        }}
      >
        Projects
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: "var(--text-muted)",
          margin: "0 0 40px",
        }}
      >
        Three production tools shipped in 2026.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
        }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
