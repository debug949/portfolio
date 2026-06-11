import type { Metadata } from "next"
import Link from "next/link"
import { SectionLabel } from "@/components/SectionLabel"
import { TechBadge } from "@/components/TechBadge"
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram"
import { AnimatedSection } from "@/components/AnimatedSection"

export const metadata: Metadata = {
  title: "Verdict — Case Study",
  description:
    "How I built a deterministic GitHub App that posts a trust score (0–100) on every PR — secrets, CVEs, zone-weighted risk. Not AI.",
}

const ARCHITECTURE = `PR opened / synchronised
       │
       ▼
 Webhook  POST /api/webhooks/github
       │   → 200 returned immediately (no timeout risk)
       │
       ▼   (runs via next/server after())
 Pipeline
 ├── fetchPRFiles        GitHub API — changed files + unified diffs
 ├── classifyFiles       Zone-classify each file (8 zones, path-only)
 ├── scanSecrets         Regex credential detection — added lines only
 ├── auditDependencies   OSV.dev CVE lookup for new npm packages
 ├── calculateTrustScore Zone-weighted score with diminishing returns
 ├── postVerdictReview   GitHub PR review + inline comments on flagged lines
 ├── postCheckRun        GitHub check run (pass/fail in PR status bar)
 └── saveReport          StoredReport → Upstash Redis (30-day TTL)`

const TECH = ["Next.js", "TypeScript", "GitHub Apps", "Upstash Redis", "OSV.dev", "Vercel"]
const ACCENT       = "#e8304a"
const ACCENT_DIM   = "rgba(232, 48, 74, 0.10)"
const ACCENT_BORDER = "rgba(232, 48, 74, 0.22)"

const ZONES = [
  { zone: "AUTH",    mult: "2.5×", matches: "auth/, session/, jwt/, oauth/, middleware/" },
  { zone: "PAYMENT", mult: "2.5×", matches: "payment/, billing/, checkout/, stripe/" },
  { zone: "ADMIN",   mult: "2.0×", matches: "admin/, management/, backoffice/" },
  { zone: "API",     mult: "1.5×", matches: "app/api/, pages/api/, routes/, controllers/" },
  { zone: "DATA",    mult: "1.5×", matches: "models/, prisma/, db/, migrations/" },
  { zone: "CONFIG",  mult: "1.3×", matches: ".env*, config/, settings/, *.config.*" },
  { zone: "GENERAL", mult: "1.0×", matches: "Everything else" },
  { zone: "TEST",    mult: "0.3×", matches: "*.test.*, *.spec.*, __tests__/, fixtures/" },
]

const DECISIONS = [
  {
    title: "next/server after() for webhook handling",
    body: "GitHub expects a webhook 200 in under 10 seconds. The full pipeline (API calls, OSV query, score calculation, PR review post) takes longer. Using next/server after() lets the pipeline run after the response is sent — no timeout risk, no background job queue needed.",
    code: `export async function POST(req: Request) {
  // verify HMAC, return 200 immediately
  after(() => runPipeline(payload))
  return Response.json({ ok: true })
}`,
  },
  {
    title: "Deterministic by design — no AI",
    body: "AI code review tools are expensive, non-reproducible, and hallucinate. Every Verdict finding has a line number, a matched pattern, and a zone multiplier that anyone can reproduce by reading the source. This is a deliberate architectural choice: security decisions should be auditable.",
    code: null,
  },
  {
    title: "Zone-weighted scoring with diminishing returns",
    body: "A credential leak in payment/checkout.ts scores 2.5× worse than in a test fixture. The scoring formula uses diminishing returns — 10 small findings don't equal one CRITICAL — so the score reflects actual blast radius, not just finding count.",
    code: `penalty = basePenalty × zoneMultiplier
score   = 100 − Σ penalties   (floor 0)`,
  },
  {
    title: "Failure isolation at every layer",
    body: "saveReport() returns boolean, never throws. loadReport() returns null, never throws. A Redis failure never breaks PR reviews. The core pipeline (review + check run) runs in Phase 4; persistence in Phase 5. Phases are sequential but independent — any can fail without cascading.",
    code: null,
  },
]

const CHALLENGES = [
  {
    title: "GitHub App JWT authentication",
    body: "GitHub App auth requires an RS256 JWT signed with the private key, exchanged for a short-lived installation access token. The private key is stored base64-encoded (PowerShell BOM issue with raw PEM in Vercel env vars) and decoded at runtime.",
  },
  {
    title: "HMAC timing-safe verification",
    body: "GitHub signs webhooks with HMAC-SHA256. The verification must use a timing-safe comparison (crypto.timingSafeEqual) to prevent timing attacks. A subtlety: the comparison must operate on equal-length buffers — comparing the computed hex to the header directly.",
  },
  {
    title: "OSV.dev batch query schema",
    body: "OSV.dev requires querying packages with {name, ecosystem} objects. New packages are extracted from the diff by parsing the package.json hunk — only lines beginning with + that match the dependency JSON pattern. Unchanged packages generate zero requests.",
  },
]

const DEMONSTRATES = [
  { skill: "GitHub App platform",  detail: "JWT + installation token exchange, webhook verification, PR review API, check run API" },
  { skill: "Security engineering", detail: "Secret pattern regex (AWS, GitHub, Stripe, OpenAI, DB URLs), zone classification, blast radius scoring" },
  { skill: "TypeScript / Node.js", detail: "Strict types throughout, async pipeline design, crypto primitives, unified diff parsing" },
  { skill: "System design",        detail: "after() for webhook decoupling, failure-isolated phases, schema versioning, graceful degradation" },
  { skill: "Infrastructure",       detail: "Upstash Redis (serverless KV), Vercel Pro maxDuration, env var discipline, structured report storage" },
]

export default function VerdictCaseStudy() {
  return (
    <>
      {/* ── Hero banner ── */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(160deg, #1a0005 0%, #0d0003 60%, var(--bg) 100%)",
          padding: "80px 20px 64px",
          overflow: "hidden",
          marginBottom: "0",
        }}
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(232,48,74,0.16) 0%, transparent 68%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0", left: "30%", width: "600px", height: "2px", background: "linear-gradient(90deg, transparent, rgba(232,48,74,0.22), transparent)" }} />

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
            Verdict
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-2)", margin: "0 0 28px", lineHeight: 1.5 }}>
            GitHub PR risk engine — deterministic, not AI
          </p>

          <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" as const }}>
            <a href="https://verdict-vihan.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", height: "36px", padding: "0 16px", background: ACCENT, borderRadius: "9999px", fontSize: "13px", color: "#fff", textDecoration: "none", fontWeight: 500 }}>
              Live Site ↗
            </a>
            <a href="https://verdict-vihan.vercel.app/r/debug949/verdict-test/1" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", height: "36px", padding: "0 16px", background: "rgba(232,48,74,0.1)", border: "1px solid rgba(232,48,74,0.25)", borderRadius: "9999px", fontSize: "13px", color: ACCENT, textDecoration: "none" }}>
              Live Report ↗
            </a>
            <a href="https://github.com/debug949/verdict" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", height: "36px", padding: "0 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9999px", fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              GitHub ↗
            </a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
            {TECH.map((t) => <TechBadge key={t} label={t} />)}
          </div>
        </div>
      </div>

      {/* ── Metrics bar ── */}
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
            { value: "0 / 100", label: "Real PR score" },
            { value: "9",       label: "Findings" },
            { value: "8",       label: "Security zones" },
            { value: "F",       label: "Grade" },
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
                  color: ACCENT,
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
            Code review catches logic bugs. But a hardcoded AWS key, a newly-added dependency with 5 known CVEs, or an API credential committed in a payment handler — these are security failures that happen in seconds and get noticed months later.
          </p>
          <p style={{ fontSize: "15px", color: "var(--text-2)", margin: 0, lineHeight: 1.75 }}>
            Verdict runs automatically on every PR before it&apos;s merged. It doesn&apos;t suggest refactors or style improvements — it exclusively looks for things that will get you breached.
          </p>
        </AnimatedSection>

        {/* How it works */}
        <AnimatedSection style={{ marginBottom: "56px" }}>
          <SectionLabel>How it works</SectionLabel>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 4px" }}>
            3 signals · 8 zones · 1 trust score per PR
          </p>
          <ArchitectureDiagram>{ARCHITECTURE}</ArchitectureDiagram>
        </AnimatedSection>

        {/* Zone table */}
        <AnimatedSection style={{ marginBottom: "56px" }}>
          <SectionLabel>Security zones</SectionLabel>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 16px", lineHeight: 1.6 }}>
            Every changed file is classified by path. Zone multipliers mean the same secret scores differently based on where it lives — a credential in{" "}
            <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px", color: "var(--text)", background: "var(--bg-elevated)", padding: "1px 5px", borderRadius: "4px" }}>payment/</code>
            {" "}is 8× more damaging than in{" "}
            <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px", color: "var(--text)", background: "var(--bg-elevated)", padding: "1px 5px", borderRadius: "4px" }}>__tests__/</code>.
          </p>
          <div style={{ border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
            {ZONES.map((z, i, arr) => (
              <div
                key={z.zone}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 50px 1fr",
                  gap: "16px",
                  padding: "12px 18px",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--border-muted)" : "none",
                  background: z.mult === "2.5×" ? ACCENT_DIM : "transparent",
                }}
              >
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px", fontWeight: 600, color: z.mult === "2.5×" ? ACCENT : "var(--text-2)" }}>{z.zone}</span>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px", color: z.mult === "2.5×" ? ACCENT : "var(--text-muted)", fontWeight: z.mult === "2.5×" ? 700 : 400 }}>{z.mult}</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{z.matches}</span>
              </div>
            ))}
          </div>
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
                <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: "1px", background: `linear-gradient(90deg, transparent, ${ACCENT}44, transparent)` }} />
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
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
