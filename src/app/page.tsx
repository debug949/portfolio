import type { Metadata } from "next"
import Link from "next/link"
import { PROJECTS, SKILL_GROUPS, CONTACT, PORTFOLIO_URL } from "@/lib/data"
import { ProjectCard } from "@/components/ProjectCard"
import { SectionLabel } from "@/components/SectionLabel"

export const metadata: Metadata = {
  title: "Veeresh — Full-Stack Engineer",
  description:
    "15-year-old full-stack engineer from India. I build developer tools with Next.js, TypeScript, and PostgreSQL. Shipped ShipSafe and Patchwork.",
  alternates: { canonical: PORTFOLIO_URL },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Veeresh",
  url: PORTFOLIO_URL,
  description: "15-year-old full-stack engineer from Telangana, India",
  knowsAbout: ["TypeScript", "Next.js", "PostgreSQL", "OAuth", "AI integration"],
  sameAs: [CONTACT.github],
}

const page = {
  maxWidth: "760px",
  margin: "0 auto",
  padding: "0 20px",
}

const wideContainer = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "0 20px",
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        style={{
          ...page,
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: "0 0 16px",
          }}
        >
          I build developer tools.
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "var(--text-2)",
            margin: "0 0 8px",
            lineHeight: 1.5,
          }}
        >
          Full-stack engineer · 15 · Telangana, India
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "13px",
            color: "var(--text-muted)",
            margin: "0 0 40px",
          }}
        >
          Next.js · TypeScript · PostgreSQL · OAuth · AI
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: "40px",
              padding: "0 20px",
              background: "var(--accent)",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            View my work
          </Link>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: "40px",
              padding: "0 20px",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              fontSize: "14px",
              color: "var(--text-2)",
              textDecoration: "none",
            }}
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* Projects */}
      <section style={{ ...wideContainer, paddingBottom: "80px" }}>
        <SectionLabel>Selected work</SectionLabel>
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
      </section>

      {/* Skills */}
      <section style={{ ...page, paddingBottom: "80px" }}>
        <SectionLabel>Skills</SectionLabel>
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: "12px",
          }}
        >
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "12px",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  paddingTop: "2px",
                }}
              >
                {group.label}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: "13px",
                      color: "var(--text-2)",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      padding: "2px 8px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section
        style={{
          ...page,
          paddingBottom: "80px",
          borderTop: "1px solid var(--border-muted)",
          paddingTop: "48px",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            color: "var(--text-2)",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          I&apos;m a self-taught developer from Telangana, building developer tools that solve
          problems I actually run into. I prefer shipping real products over tutorial clones.
        </p>
        <Link
          href="/about"
          style={{
            fontSize: "14px",
            color: "var(--accent)",
            textDecoration: "none",
          }}
        >
          Full story →
        </Link>
      </section>

      {/* Contact */}
      <section
        style={{
          ...page,
          paddingBottom: "80px",
        }}
      >
        <SectionLabel>Let&apos;s talk</SectionLabel>
        <p
          style={{
            fontSize: "15px",
            color: "var(--text-2)",
            margin: "0 0 20px",
            lineHeight: 1.7,
          }}
        >
          Open to internships, freelance projects, and collaborations.
        </p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px" }}>
          <a
            href={`mailto:${CONTACT.email}`}
            style={{
              fontSize: "15px",
              color: "var(--text)",
              textDecoration: "none",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {CONTACT.email}
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "14px",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            github.com/debug949 ↗
          </a>
        </div>
      </section>
    </>
  )
}
