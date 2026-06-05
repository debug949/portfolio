import type { Metadata } from "next"
import { TIMELINE, CONTACT } from "@/lib/data"
import { SectionLabel } from "@/components/SectionLabel"
import { AnimatedSection } from "@/components/AnimatedSection"

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of a 15-year-old developer from Telangana building production software.",
}

export default function AboutPage() {
  return (
    <div
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "64px 20px 80px",
      }}
    >
      {/* Heading */}
      <AnimatedSection style={{ marginBottom: "48px" }}>
        <h1
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 400,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          About
        </h1>
      </AnimatedSection>

      {/* Intro paragraphs */}
      <AnimatedSection style={{ marginBottom: "72px" }}>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "20px" }}>
          <p style={{ fontSize: "16px", color: "var(--text-2)", margin: 0, lineHeight: 1.8 }}>
            I&apos;m Veeresh, a 15-year-old developer from Telangana, India. I taught myself to code, and then I built things. Not tutorial projects — actual tools that solve problems developers face: a security scanner, a changelog generator. Both are live, both have real users, and both taught me more than any course could.
          </p>
          <p style={{ fontSize: "16px", color: "var(--text-2)", margin: 0, lineHeight: 1.8 }}>
            My engineering philosophy: ship something that works before polishing something that doesn&apos;t. ShipSafe and Patchwork both started as personal frustrations. ShipSafe because I kept forgetting to check security headers before launch. Patchwork because writing changelogs manually was tedious and nobody did it. I build tools I&apos;d actually want to use.
          </p>
          <p style={{ fontSize: "16px", color: "var(--text-2)", margin: 0, lineHeight: 1.8 }}>
            I&apos;m currently in Class 10 at Shantiniketan Vidyalaya. I plan to study Computer Science at university — ideally abroad. In the meantime, I&apos;m open to internship opportunities, freelance projects, and anything that lets me work on interesting engineering problems.
          </p>
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <AnimatedSection style={{ marginBottom: "72px" }}>
        <SectionLabel>Timeline</SectionLabel>
        <div style={{ position: "relative" as const }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "92px",
              top: "8px",
              bottom: "8px",
              width: "1px",
              background: "linear-gradient(180deg, transparent, var(--border) 10%, var(--border) 90%, transparent)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0" }}>
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "92px 1fr",
                  gap: "24px",
                  paddingBottom: i < TIMELINE.length - 1 ? "32px" : "0",
                  position: "relative" as const,
                }}
              >
                {/* Period */}
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "11px",
                    color: i === TIMELINE.length - 1 ? "var(--green)" : "var(--text-dim)",
                    paddingTop: "4px",
                    textAlign: "right" as const,
                    paddingRight: "16px",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {item.period}
                </div>

                {/* Content */}
                <div style={{ position: "relative" as const }}>
                  {/* Dot on the line */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-28px",
                      top: "6px",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: i === TIMELINE.length - 1 ? "var(--green)" : "var(--border)",
                      boxShadow: i === TIMELINE.length - 1 ? "0 0 8px var(--green)" : "none",
                      border: i === TIMELINE.length - 1 ? "none" : "1px solid var(--border)",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.65 }}>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Looking for */}
      <AnimatedSection>
        <SectionLabel>What I&apos;m looking for</SectionLabel>
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "28px",
          }}
        >
          {[
            {
              title: "Software engineering internships",
              body: "Remote or in-person, India or abroad. I'm comfortable with TypeScript, Next.js, PostgreSQL, and REST APIs. I learn fast and prefer environments where I'll get real engineering work.",
            },
            {
              title: "Freelance projects",
              body: "Web applications, developer tools, anything technical. I've built production systems; I can build yours.",
            },
            {
              title: "Open source collaboration",
              body: "If you're building something interesting, I'd like to contribute.",
            },
          ].map((item, i, arr) => (
            <div
              key={item.title}
              style={{
                padding: "18px 20px",
                borderBottom: i < arr.length - 1 ? "1px solid var(--border-muted)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "5px",
                }}
              >
                {item.title}
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.7 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Contact links */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
          <a
            href={`mailto:${CONTACT.email}`}
            style={{
              fontSize: "15px",
              color: "var(--accent)",
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
            style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none" }}
          >
            github.com/debug949 ↗
          </a>
        </div>
      </AnimatedSection>
    </div>
  )
}
