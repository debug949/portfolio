import type { Metadata } from "next"
import Link from "next/link"
import { SectionLabel } from "@/components/SectionLabel"
import { TechBadge } from "@/components/TechBadge"
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram"
import { AnimatedSection } from "@/components/AnimatedSection"

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

const TECH = ["Next.js", "TypeScript", "Prisma 7", "PostgreSQL", "Groq AI", "Vercel"]
const ACCENT = "#00c56e"
const ACCENT_DIM = "rgba(0, 197, 110, 0.10)"
const ACCENT_BORDER = "rgba(0, 197, 110, 0.22)"

const DECISIONS = [
  {
    title: "Promise.all for 19 concurrent checks",
    body: "Running checks sequentially would require 10 HTTP requests × 5s timeout each = 50+ seconds. Running them concurrently via Promise.all brings the total to the slowest single check — about 8 seconds of I/O, 2 seconds of overhead. The system is I/O-bound, not CPU-bound, so concurrency is everything.",
    code: null,
  },
  {
    title: "Model-agnostic AI interface",
    body: "The AI layer uses a factory pattern: getAIProvider() reads the AI_PROVIDER environment variable and returns the appropriate class. Switching AI vendors is one env var change — a 30-minute investment that future-proofs the entire AI layer.",
    code: `const ai = getAIProvider()          // reads AI_PROVIDER env var
const result = await ai.complete()  // uniform interface`,
  },
  {
    title: "Graceful degradation",
    body: "The core audit has zero external dependencies beyond the target URL. AI synthesis and database saving are independently isolated — each can fail without affecting the other or the core result. The tool always works, even misconfigured.",
    code: null,
  },
]

const CHALLENGES = [
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
]

const DEMONSTRATES = [
  { skill: "Security engineering", detail: "OWASP header knowledge, attack vector awareness, understanding of what attackers actually check first" },
  { skill: "TypeScript / Node.js", detail: "Strict types throughout, async/await patterns, proper error handling without exception propagation" },
  { skill: "System design", detail: "Parallel I/O, graceful degradation, isolated failure domains, vendor abstraction" },
  { skill: "AI integration", detail: "Prompt engineering for structured JSON output, silent failure design (AI never breaks the product)" },
  { skill: "Production deployment", detail: "Vercel functions, serverless PostgreSQL (Neon), env var management, build pipeline" },
]

export default function ShipSafeCaseStudy() {
  return (
    <>
      {/* ── Cinematic hero banner ── */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(160deg, #001a0d 0%, #000e07 60%, var(--bg) 100%)",
          padding: "80px 20px 64px",
          overflow: "hidden",
          marginBottom: "0",
        }}
      >
        {/* Orb */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(0,197,110,0.16) 0%, transparent 68%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0", left: "30%", width: "600px", height: "2px", background: "linear-gradient(90deg, transparent, rgba(0,197,110,0.25), transparent)" }} />

        <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Link
            href="/projects"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", marginBottom: "28px" }}
          >
            ← Projects
          </Link>

          <h1
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              fontSize: "clamp(44px, 8vw, 72px)",
              fontWeight: 400,
              color: "var(--text)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: "0 0 12px",
            }}
          >
            ShipSafe
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-2)", margin: "0 0 28px", lineHeight: 1.5 }}>
            Web security scanner with AI-powered remediation
          </p>

          <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" as const }}>
            <a href="https://shipsafe-vihan.vercel.app/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", height: "36px", padding: "0 16px", background: ACCENT, borderRadius: "9999px", fontSize: "13px", color: "#000", textDecoration: "none", fontWeight: 500 }}>
              Live Demo ↗
            </a>
            <a href="https://github.com/debug949/shipsafe" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", height: "36px", padding: "0 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9999px", fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              GitHub ↗
            </a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
            {TECH.map((t) => <TechBadge key={t} label={t} />)}
          </div>
        </div>
      </div>

      {/* ── Live metrics bar ── */}
      <AnimatedSection style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 20px 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "var(--border)",
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "64px",
          }}
        >
          {[
            { value: "19", label: "Checks" },
            { value: "10–20s", label: "Scan time" },
            { value: "0–100", label: "Score range" },
            { value: "A–F", label: "Grade" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ background: "var(--bg-elevated)", padding: "20px 12px", textAlign: "center" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(18px, 3vw, 26px)",
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ── Content ── */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px 80px" }}>

        {/* Problem */}
        <AnimatedSection style={{ marginBottom: "56px" }}>
          <SectionLabel>The problem</SectionLabel>
          <p style={{ fontSize: "15px", color: "var(--text-2)", margin: "0 0 14px", lineHeight: 1.75 }}>
            Most developers ship websites without checking the basics. A missing Content-Security-Policy leaves users exposed to XSS. An exposed{" "}
            <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px", color: "var(--text)", background: "var(--bg-elevated)", padding: "1px 5px", borderRadius: "4px" }}>.env</code>{" "}
            file leaks database credentials. HTTP cookies without the Secure flag get stolen over coffee shop Wi-Fi.
          </p>
          <p style={{ fontSize: "15px", color: "var(--text-2)", margin: 0, lineHeight: 1.75 }}>
            These aren&apos;t obscure vulnerabilities — they&apos;re the first things attackers check. ShipSafe automates the audit.
          </p>
        </AnimatedSection>

        {/* How it works */}
        <AnimatedSection style={{ marginBottom: "56px" }}>
          <SectionLabel>How it works</SectionLabel>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 4px" }}>
            Total checks: 19 across 6 categories · Time: 10–20 seconds
          </p>
          <ArchitectureDiagram>{ARCHITECTURE}</ArchitectureDiagram>
        </AnimatedSection>

        {/* Engineering decisions */}
        <AnimatedSection style={{ marginBottom: "56px" }}>
          <SectionLabel>Engineering decisions</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "20px" }}>
            {DECISIONS.map((d, i) => (
              <div
                key={d.title}
                style={{
                  background: "var(--bg-surface)",
                  border: `1px solid ${ACCENT_BORDER}`,
                  borderRadius: "14px",
                  padding: "22px 24px",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}
              >
                {/* Accent top line */}
                <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: "1px", background: `linear-gradient(90deg, transparent, ${ACCENT}44, transparent)` }} />

                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  {/* Number badge */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background: ACCENT_DIM,
                      border: `1px solid ${ACCENT_BORDER}`,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "12px",
                      color: ACCENT,
                      fontWeight: 600,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", margin: "0 0 8px", paddingTop: "8px" }}>
                      {d.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--text-2)", margin: d.code ? "0 0 12px" : "0", lineHeight: 1.7 }}>
                      {d.body}
                    </p>
                    {d.code && (
                      <pre style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px", color: "var(--text-2)", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "6px", padding: "12px 14px", margin: 0, overflowX: "auto" as const, lineHeight: 1.6 }}>
                        {d.code}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Challenges */}
        <AnimatedSection style={{ marginBottom: "56px" }}>
          <SectionLabel>Challenges</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "16px" }}>
            {CHALLENGES.map((c) => (
              <div
                key={c.title}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "18px 20px",
                }}
              >
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>{c.title}</div>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* What it demonstrates */}
        <AnimatedSection>
          <SectionLabel>What this demonstrates</SectionLabel>
          <div style={{ border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
            {DEMONSTRATES.map((item, i, arr) => (
              <div
                key={item.skill}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  gap: "16px",
                  padding: "14px 18px",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--border-muted)" : "none",
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>{item.skill}</span>
                <span style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </>
  )
}
