import type { Metadata } from "next"
import Link from "next/link"
import { SectionLabel } from "@/components/SectionLabel"
import { TechBadge } from "@/components/TechBadge"
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram"
import { AnimatedSection } from "@/components/AnimatedSection"

export const metadata: Metadata = {
  title: "Patchwork — Case Study",
  description:
    "How I implemented raw GitHub OAuth 2.0, built a multi-tenant SaaS, and shipped an embeddable changelog widget.",
}

const ARCHITECTURE = `┌─────────────────────────────────────────────────────────┐
│  Browser                                                │
│    ↓  GET /api/auth/github                              │
│  GitHub OAuth (CSRF state → authorize → callback)       │
│    ↓  token exchange, user upsert, session cookie set   │
│  /dashboard                                             │
│    ↓  Connect a repository                              │
│  Repository saved to PostgreSQL                         │
│    ↓  POST /api/repos/[id]/generate                     │
│  GitHub API: fetch last 50 commits                      │
│    ↓                                                    │
│  Groq AI: categorize into features/fixes/refactors/     │
│            breaking (falls back to keyword classifier)  │
│    ↓                                                    │
│  Changelog saved to PostgreSQL                          │
│    ↓                                                    │
│  /log/[owner]/[repo]/[slug]  — public URL               │
│  /embed/[owner]/[repo]       — iframe widget            │
│  /api/public/[owner]/[repo]  — JSON API                 │
└─────────────────────────────────────────────────────────┘`

const TECH = ["Next.js", "TypeScript", "Prisma 7", "PostgreSQL", "iron-session", "Groq AI", "Vercel"]
const PURPLE = "#e8a020"
const PURPLE_DIM = "rgba(232, 160, 32, 0.10)"
const PURPLE_BORDER = "rgba(232, 160, 32, 0.22)"

const OAUTH_STEPS = [
  "Generate 16-byte random hex state token → store in HttpOnly cookie",
  "Redirect to github.com/login/oauth/authorize with state param",
  "GitHub redirects back with code + state",
  "Verify state (CSRF check) → delete state cookie",
  "POST to github.com/login/oauth/access_token (server-side)",
  "GET api.github.com/user with the token",
  "Upsert user in DB → set iron-session cookie (AES-256-GCM, HttpOnly, Secure, SameSite=Lax)",
]

const DECISIONS = [
  {
    title: "Raw OAuth 2.0 — no NextAuth",
    steps: OAUTH_STEPS,
    code: null,
    text: null,
  },
  {
    title: "Multi-tenant data model",
    steps: null,
    code: `prisma.repository.findFirst({
  where: { id, userId: session.userId }
})`,
    text: "User → Repository → Changelog (cascade deletes). Every database query is scoped to the authenticated user's ID — a user can never read, modify, or delete another user's data.",
  },
  {
    title: "Embeddable widget as a platform primitive",
    steps: null,
    code: null,
    text: "/embed/[owner]/[repo] is iframe-ready: X-Frame-Options overridden to ALLOWALL and CORS enabled on the JSON API. One iframe tag embeds a live changelog anywhere on the web.",
  },
  {
    title: "AI with graceful fallback",
    steps: null,
    code: null,
    text: "If GROQ_API_KEY is absent or the API fails, a keyword-based classifier runs instead. Keywords like feat:, fix:, refactor: map to categories. The app works fully without any AI key.",
  },
]

const CHALLENGES = [
  {
    title: "iron-session with Next.js 15+ async cookies",
    body: "In Next.js 15+, cookies() from next/headers returns a Promise. This isn't documented clearly in iron-session v8 — I found it through type errors.",
    code: `const cookieStore = await cookies()
const session = getIronSession(cookieStore, options)`,
  },
  {
    title: "PowerShell BOM corruption (production debugging)",
    body: "After deploying to Vercel, all database routes returned 500. Root cause: PowerShell 5.1 prepends a UTF-8 BOM (U+FEFF) when piping strings. The DATABASE_URL became ﻿postgresql://… and pg parsed the invalid scheme, falling back to host \"base\".",
    code: `// Fix: spawn Vercel CLI via Node.js + cmd.exe
child.stdin.write(Buffer.from(url, "utf8"))`,
  },
  {
    title: "Embed iframe headers",
    body: "Next.js sets X-Frame-Options: SAMEORIGIN on all responses by default. To make the embed page frameable, I override headers in next.config.ts per route.",
    code: null,
  },
]

const DEMONSTRATES = [
  { skill: "OAuth 2.0 protocol", detail: "Full implementation: CSRF, code exchange, token storage, encrypted sessions. Not a library wrapper." },
  { skill: "Multi-tenant SaaS design", detail: "User-scoped DB queries, cascade deletes, data isolation between users" },
  { skill: "GitHub API integration", detail: "OAuth token management, repo listing, commit history traversal" },
  { skill: "Security-first defaults", detail: "HttpOnly cookies, CSRF state token, Secure flag, SameSite=Lax, no sensitive data in client JS" },
  { skill: "Platform thinking", detail: "Shipped a JSON API and embeddable widget from day one, not as an afterthought" },
  { skill: "Production debugging", detail: "Diagnosed and fixed a non-obvious production failure (P1001 from PowerShell BOM corruption)" },
]

export default function PatchworkCaseStudy() {
  return (
    <>
      {/* ── Cinematic hero banner ── */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(160deg, #1c1200 0%, #0f0a00 60%, var(--bg) 100%)",
          padding: "80px 20px 64px",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(232,160,32,0.16) 0%, transparent 68%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0", left: "30%", width: "600px", height: "2px", background: "linear-gradient(90deg, transparent, rgba(232,160,32,0.22), transparent)" }} />

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
            Patchwork
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-2)", margin: "0 0 28px", lineHeight: 1.5 }}>
            GitHub OAuth changelog generator with embeddable widget
          </p>

          <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" as const }}>
            <a href="https://patchwork-vihan.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", height: "36px", padding: "0 16px", background: PURPLE, borderRadius: "9999px", fontSize: "13px", color: "#000", textDecoration: "none", fontWeight: 500 }}>
              Live Demo ↗
            </a>
            <a href="https://github.com/debug949/patchwork" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", height: "36px", padding: "0 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9999px", fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              GitHub ↗
            </a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
            {TECH.map((t) => <TechBadge key={t} label={t} />)}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 20px 80px" }}>

        {/* Problem */}
        <AnimatedSection style={{ marginBottom: "56px" }}>
          <SectionLabel>The problem</SectionLabel>
          <p style={{ fontSize: "15px", color: "var(--text-2)", margin: "0 0 14px", lineHeight: 1.75 }}>
            Writing changelogs is tedious. Most developers skip them or write one sentence. Patchwork connects to GitHub, reads your commit history, and generates a structured changelog — features, fixes, refactors, breaking changes — that you can share or embed on your site.
          </p>
          <p style={{ fontSize: "15px", color: "var(--text-2)", margin: 0, lineHeight: 1.75 }}>
            It&apos;s the tool I wanted every time I shipped a new version of something.
          </p>
        </AnimatedSection>

        {/* How it works */}
        <AnimatedSection style={{ marginBottom: "56px" }}>
          <SectionLabel>How it works</SectionLabel>
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
                  border: `1px solid ${PURPLE_BORDER}`,
                  borderRadius: "16px",
                  padding: "22px 24px",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}
              >
                <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: "1px", background: `linear-gradient(90deg, transparent, ${PURPLE}44, transparent)` }} />

                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background: PURPLE_DIM,
                      border: `1px solid ${PURPLE_BORDER}`,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "12px",
                      color: PURPLE,
                      fontWeight: 600,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", margin: "0 0 12px", paddingTop: "8px" }}>
                      {d.title}
                    </h3>
                    {d.text && (
                      <p style={{ fontSize: "14px", color: "var(--text-2)", margin: d.code ? "0 0 12px" : "0", lineHeight: 1.7 }}>
                        {d.text}
                      </p>
                    )}
                    {/* OAuth steps */}
                    {d.steps && (
                      <div style={{ display: "flex", flexDirection: "column" as const, gap: "0" }}>
                        {d.steps.map((step, si) => (
                          <div
                            key={si}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "36px 1fr",
                              gap: "12px",
                              padding: "10px 0",
                              borderBottom: si < d.steps!.length - 1 ? "1px solid var(--border-muted)" : "none",
                              alignItems: "start",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-geist-mono)",
                                fontSize: "10px",
                                color: PURPLE,
                                background: PURPLE_DIM,
                                border: `1px solid ${PURPLE_BORDER}`,
                                borderRadius: "5px",
                                height: "22px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              {String(si + 1).padStart(2, "0")}
                            </span>
                            <span style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.6, paddingTop: "2px" }}>
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
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
                  borderRadius: "14px",
                  padding: "18px 20px",
                }}
              >
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>{c.title}</div>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: c.code ? "0 0 10px" : "0", lineHeight: 1.7 }}>{c.body}</p>
                {c.code && (
                  <pre style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px", color: "var(--text-2)", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "6px", padding: "10px 12px", margin: 0, overflowX: "auto" as const }}>
                    {c.code}
                  </pre>
                )}
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
                  gridTemplateColumns: "180px 1fr",
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
