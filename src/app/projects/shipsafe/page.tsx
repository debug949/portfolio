import type { Metadata } from "next"
import { CaseStudyHeader } from "@/components/CaseStudyHeader"
import { SectionLabel } from "@/components/SectionLabel"
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram"

export const metadata: Metadata = {
  title: "ShipSafe — Case Study",
  description:
    "How I built a web security scanner that runs 19 parallel checks and generates AI-powered fixes. Next.js, TypeScript, Prisma, Groq.",
}

const ARCHITECTURE = `┌─────────────────────────────────────────────────────────┐
│  User enters URL                                        │
│         │                                               │
│         ▼                                               │
│  POST /api/audit (maxDuration: 45s)                     │
│         │                                               │
│  Promise.all([                                          │
│    checkHttps(),        — 2 checks                      │
│    checkHeaders(),      — 6 checks                      │
│    checkExposedFiles(), — 9 checks                      │
│    checkCookies(),      — 1 check                       │
│    checkDisclosure(),   — 1 check                       │
│    checkPerformance()   — PageSpeed API                 │
│  ])                                                     │
│         │                                               │
│  score = 100 − penalties                                │
│  grade = A/B/C/D/F                                      │
│         │                                               │
│  synthesizeAudit()      — Groq AI (fails silently)      │
│         │                                               │
│  prisma.auditReport.create()  (fails silently)          │
│         │                                               │
│  return { result, synthesis, reportId }                 │
│         │                                               │
│  → /report/[id]  (shareable link)                       │
└─────────────────────────────────────────────────────────┘`

const page = {
  maxWidth: "760px",
  margin: "0 auto",
  padding: "0 20px",
}

const sectionGap = { marginBottom: "48px" }

export default function ShipSafeCaseStudy() {
  return (
    <div style={{ ...page, paddingTop: "48px", paddingBottom: "80px" }}>
      <CaseStudyHeader
        title="ShipSafe"
        tagline="Web security scanner with AI-powered remediation"
        tech={["Next.js", "TypeScript", "Prisma 7", "PostgreSQL", "Groq AI", "Vercel"]}
        links={[
          {
            label: "Live Demo ↗",
            href: "https://shipsafe-xzne.vercel.app/",
            external: true,
          },
          {
            label: "GitHub ↗",
            href: "https://github.com/debug949/shipsafe",
            external: true,
          },
        ]}
      />

      {/* Problem */}
      <section style={sectionGap}>
        <SectionLabel>The problem</SectionLabel>
        <p style={{ fontSize: "15px", color: "var(--text-2)", margin: "0 0 16px", lineHeight: 1.7 }}>
          Most developers ship websites without checking the basics. A missing
          Content-Security-Policy leaves users exposed to XSS. An exposed{" "}
          <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px", color: "var(--text)" }}>
            .env
          </code>{" "}
          file leaks database credentials. HTTP cookies without the Secure flag get stolen over
          coffee shop Wi-Fi.
        </p>
        <p style={{ fontSize: "15px", color: "var(--text-2)", margin: 0, lineHeight: 1.7 }}>
          These aren&apos;t obscure vulnerabilities — they&apos;re the first things attackers check.
          ShipSafe automates the audit.
        </p>
      </section>

      {/* How it works */}
      <section style={sectionGap}>
        <SectionLabel>How it works</SectionLabel>
        <p style={{ fontSize: "15px", color: "var(--text-muted)", margin: "0 0 4px" }}>
          Total checks: 19 across 6 categories · Time: 10–20 seconds
        </p>
        <ArchitectureDiagram>{ARCHITECTURE}</ArchitectureDiagram>
      </section>

      {/* Engineering decisions */}
      <section style={sectionGap}>
        <SectionLabel>Engineering decisions</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "32px" }}>
          <div>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text)",
                margin: "0 0 8px",
              }}
            >
              1. Promise.all for 19 concurrent checks
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-2)", margin: 0, lineHeight: 1.7 }}>
              Running checks sequentially would require 10 HTTP requests × 5s timeout each = 50+
              seconds. Running them concurrently via{" "}
              <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px", color: "var(--text)" }}>
                Promise.all
              </code>{" "}
              brings the total to the slowest single check — about 8 seconds of I/O, 2 seconds of
              overhead. The system is I/O-bound, not CPU-bound, so concurrency is everything.
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text)",
                margin: "0 0 8px",
              }}
            >
              2. Model-agnostic AI interface
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-2)", margin: "0 0 12px", lineHeight: 1.7 }}>
              The AI layer uses a factory pattern:{" "}
              <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px", color: "var(--text)" }}>
                getAIProvider()
              </code>{" "}
              reads the{" "}
              <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px", color: "var(--text)" }}>
                AI_PROVIDER
              </code>{" "}
              environment variable and returns the appropriate class. Switching AI vendors is one
              env var change — a 30-minute investment that future-proofs the entire AI layer.
            </p>
            <pre
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "12px",
                color: "var(--text-2)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "12px 16px",
                margin: 0,
                overflowX: "auto" as const,
              }}
            >
              {`const ai = getAIProvider()          // reads AI_PROVIDER env var
const result = await ai.complete()  // uniform interface`}
            </pre>
          </div>
          <div>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text)",
                margin: "0 0 8px",
              }}
            >
              3. Graceful degradation
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-2)", margin: 0, lineHeight: 1.7 }}>
              The core audit has zero external dependencies beyond the target URL. AI synthesis and
              database saving are independently isolated — each can fail without affecting the other
              or the core result. The tool always works, even misconfigured.
            </p>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section style={sectionGap}>
        <SectionLabel>Challenges</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "24px" }}>
          {[
            {
              title: "Prisma 7 breaking changes",
              body: "Prisma 7 removed the database URL from schema.prisma and requires a pg adapter. The pattern: Pool → PrismaPg adapter → PrismaClient({ adapter }). Documentation for v7 was sparse; I read the migration notes and adapted.",
            },
            {
              title: "Vercel function timeout",
              body: "19 parallel checks + AI synthesis exceeded Vercel's default 10s function timeout. Fixed by adding export const maxDuration = 45 to the route handler. 45s is the maximum on the hobby tier.",
            },
            {
              title: "Model naming confusion",
              body: "The user-provided key was a Groq key (prefix: gsk_), not an xAI Grok key. Added Groq as a separate provider class while keeping the model-agnostic interface intact — the abstraction meant this was a 20-minute change.",
            },
          ].map((item) => (
            <div key={item.title}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "6px",
                }}
              >
                {item.title}
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.7 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What it demonstrates */}
      <section style={sectionGap}>
        <SectionLabel>What this demonstrates</SectionLabel>
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: "0",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {[
            {
              skill: "Security engineering",
              detail:
                "OWASP header knowledge, attack vector awareness, understanding of what attackers actually check first",
            },
            {
              skill: "TypeScript / Node.js",
              detail:
                "Strict types throughout, async/await patterns, proper error handling without exception propagation",
            },
            {
              skill: "System design",
              detail:
                "Parallel I/O, graceful degradation, isolated failure domains, vendor abstraction",
            },
            {
              skill: "AI integration",
              detail:
                "Prompt engineering for structured JSON output, silent failure design (AI never breaks the product)",
            },
            {
              skill: "Production deployment",
              detail:
                "Vercel functions, serverless PostgreSQL (Neon), env var management, build pipeline",
            },
          ].map((item, i, arr) => (
            <div
              key={item.skill}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: "16px",
                padding: "14px 16px",
                borderBottom: i < arr.length - 1 ? "1px solid var(--border-muted)" : "none",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>
                {item.skill}
              </span>
              <span style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
