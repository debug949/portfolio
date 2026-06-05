import type { Metadata } from "next"
import { TIMELINE, CONTACT } from "@/lib/data"
import { SectionLabel } from "@/components/SectionLabel"

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of a 15-year-old developer from Telangana building production software.",
}

const page = {
  maxWidth: "760px",
  margin: "0 auto",
  padding: "0 20px",
}

export default function AboutPage() {
  return (
    <div style={{ ...page, paddingTop: "64px", paddingBottom: "80px" }}>
      <h1
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          color: "var(--text)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          margin: "0 0 40px",
        }}
      >
        About
      </h1>

      {/* Intro */}
      <div
        style={{
          display: "flex",
          flexDirection: "column" as const,
          gap: "20px",
          marginBottom: "64px",
        }}
      >
        <p style={{ fontSize: "16px", color: "var(--text-2)", margin: 0, lineHeight: 1.7 }}>
          I&apos;m Veeresh, a 15-year-old developer from Telangana, India. I taught myself to code,
          and then I built things. Not tutorial projects — actual tools that solve problems
          developers face: a security scanner, a changelog generator. Both are live, both have real
          users, and both taught me more than any course could.
        </p>
        <p style={{ fontSize: "16px", color: "var(--text-2)", margin: 0, lineHeight: 1.7 }}>
          My engineering philosophy: ship something that works before polishing something that
          doesn&apos;t. ShipSafe and Patchwork both started as personal frustrations. ShipSafe
          because I kept forgetting to check security headers before launch. Patchwork because
          writing changelogs manually was tedious and nobody did it. I build tools I&apos;d actually
          want to use.
        </p>
        <p style={{ fontSize: "16px", color: "var(--text-2)", margin: 0, lineHeight: 1.7 }}>
          I&apos;m currently in Class 10 at Shantiniketan Vidyalaya. I plan to study Computer
          Science at university — ideally abroad. In the meantime, I&apos;m open to internship
          opportunities, freelance projects, and anything that lets me work on interesting
          engineering problems.
        </p>
      </div>

      {/* Timeline */}
      <section style={{ marginBottom: "64px" }}>
        <SectionLabel>Timeline</SectionLabel>
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: "0",
            position: "relative" as const,
          }}
        >
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: "20px",
                paddingBottom: i < TIMELINE.length - 1 ? "28px" : "0",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "12px",
                  color: "var(--text-dim)",
                  paddingTop: "2px",
                  whiteSpace: "nowrap" as const,
                }}
              >
                {item.period}
              </div>
              <div>
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
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Looking for */}
      <section>
        <SectionLabel>What I&apos;m looking for</SectionLabel>
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>
              Software engineering internships
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.7 }}>
              Remote or in-person, India or abroad. I&apos;m comfortable with TypeScript, Next.js,
              PostgreSQL, and REST APIs. I learn fast and prefer environments where I&apos;ll get
              real engineering work.
            </p>
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>
              Freelance projects
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.7 }}>
              Web applications, developer tools, anything technical. I&apos;ve built production
              systems; I can build yours.
            </p>
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>
              Open source collaboration
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.7 }}>
              If you&apos;re building something interesting, I&apos;d like to contribute.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
          <a
            href={`mailto:${CONTACT.email}`}
            style={{
              fontSize: "14px",
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
    </div>
  )
}
