import type { Metadata } from "next"
import Link from "next/link"
import { PROJECTS, SKILL_GROUPS, CONTACT, PORTFOLIO_URL } from "@/lib/data"
import { ProjectCard } from "@/components/ProjectCard"
import { SectionLabel } from "@/components/SectionLabel"
import { HeroSection } from "@/components/HeroSection"
import { AnimatedSection } from "@/components/AnimatedSection"

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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero (full viewport, client component) ── */}
      <HeroSection />

      {/* ── Projects bento grid ── */}
      <AnimatedSection
        style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px 100px" }}
      >
        <div
          style={{
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: "12px",
          }}
        >
          <SectionLabel>Selected work</SectionLabel>
          <Link
            href="/projects"
            className="hover-text"
            style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", transition: "color 150ms" }}
          >
            View all →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </AnimatedSection>

      {/* ── Skills ── */}
      <AnimatedSection style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px 100px" }}>
        <SectionLabel>Skills</SectionLabel>
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={group.label}
              style={{
                display: "grid",
                gridTemplateColumns: "130px 1fr",
                gap: "16px",
                padding: "16px 20px",
                borderBottom:
                  i < SKILL_GROUPS.length - 1 ? "1px solid var(--border-muted)" : "none",
                alignItems: "start",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--text-muted)", paddingTop: "3px" }}>
                {group.label}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: "12px",
                      color: "var(--text-2)",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "3px 9px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ── About teaser ── */}
      <AnimatedSection
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "64px 20px 100px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <blockquote style={{ margin: "0 0 24px", padding: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              fontSize: "clamp(22px, 4vw, 32px)",
              color: "var(--text)",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              margin: "0 0 8px",
            }}
          >
            &ldquo;I prefer shipping real products over tutorial clones.&rdquo;
          </p>
          <cite style={{ fontSize: "13px", color: "var(--text-muted)", fontStyle: "normal" }}>
            — Self-taught from Telangana. Class 10.
          </cite>
        </blockquote>
        <Link
          href="/about"
          style={{ fontSize: "14px", color: "var(--accent)", textDecoration: "none" }}
        >
          Full story →
        </Link>
      </AnimatedSection>

      {/* ── Contact ── */}
      <AnimatedSection style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px 100px" }}>
        <SectionLabel>Let&apos;s talk</SectionLabel>

        <a
          href={`mailto:${CONTACT.email}`}
          className="hover-accent"
          style={{
            display: "block",
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
            fontSize: "clamp(20px, 4vw, 30px)",
            color: "var(--text)",
            textDecoration: "none",
            marginBottom: "8px",
            transition: "color 150ms",
          }}
        >
          {CONTACT.email} ↗
        </a>

        <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 20px" }}>
          Open to internships, freelance projects, and collaborations.
        </p>

        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          github.com/debug949 ↗
        </a>
      </AnimatedSection>
    </>
  )
}
