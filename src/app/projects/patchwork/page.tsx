import type { Metadata } from "next"
import { CaseStudyHeader } from "@/components/CaseStudyHeader"
import { SectionLabel } from "@/components/SectionLabel"
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram"

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

const page = {
  maxWidth: "760px",
  margin: "0 auto",
  padding: "0 20px",
}

const sectionGap = { marginBottom: "48px" }

export default function PatchworkCaseStudy() {
  return (
    <div style={{ ...page, paddingTop: "48px", paddingBottom: "80px" }}>
      <CaseStudyHeader
        title="Patchwork"
        tagline="GitHub OAuth changelog generator with embeddable widget"
        tech={[
          "Next.js",
          "TypeScript",
          "Prisma 7",
          "PostgreSQL",
          "iron-session",
          "Groq AI",
          "Vercel",
        ]}
        links={[
          {
            label: "Live Demo ↗",
            href: "https://patchwork-theta.vercel.app",
            external: true,
          },
          {
            label: "GitHub ↗",
            href: "https://github.com/debug949/patchwork",
            external: true,
          },
        ]}
      />

      {/* Problem */}
      <section style={sectionGap}>
        <SectionLabel>The problem</SectionLabel>
        <p style={{ fontSize: "15px", color: "var(--text-2)", margin: "0 0 16px", lineHeight: 1.7 }}>
          Writing changelogs is tedious. Most developers skip them or write one sentence. Patchwork
          connects to GitHub, reads your commit history, and generates a structured changelog —
          features, fixes, refactors, breaking changes — that you can share or embed on your site.
        </p>
        <p style={{ fontSize: "15px", color: "var(--text-2)", margin: 0, lineHeight: 1.7 }}>
          It&apos;s the tool I wanted every time I shipped a new version of something.
        </p>
      </section>

      {/* How it works */}
      <section style={sectionGap}>
        <SectionLabel>How it works</SectionLabel>
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
              1. Raw OAuth 2.0 — no NextAuth
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-2)",
                margin: "0 0 12px",
                lineHeight: 1.7,
              }}
            >
              Most developers reach for NextAuth and never understand what OAuth actually does. I
              implemented the full flow:
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
                margin: "0 0 12px",
                overflowX: "auto" as const,
                lineHeight: 1.6,
              }}
            >
              {`Step 1: Generate 16-byte random hex state → HttpOnly cookie
Step 2: Redirect to github.com/login/oauth/authorize
Step 3: GitHub redirects back with code + state
Step 4: Verify state (CSRF check) → delete state cookie
Step 5: POST to github.com/login/oauth/access_token (server-side)
Step 6: GET api.github.com/user with the token
Step 7: Upsert user in DB → set iron-session cookie`}
            </pre>
            <p style={{ fontSize: "14px", color: "var(--text-2)", margin: 0, lineHeight: 1.7 }}>
              The session cookie uses AES-256-GCM encryption (iron-session), is HttpOnly, Secure
              (HTTPS only), and SameSite=Lax.
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
              2. Multi-tenant data model
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-2)",
                margin: "0 0 12px",
                lineHeight: 1.7,
              }}
            >
              User → Repository → Changelog (cascade deletes). Every database query is scoped to
              the authenticated user&apos;s ID — a user can never read, modify, or delete another
              user&apos;s data.
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
              {`prisma.repository.findFirst({
  where: { id, userId: session.userId }
})`}
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
              3. Embeddable widget as a platform primitive
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-2)", margin: 0, lineHeight: 1.7 }}>
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                /embed/[owner]/[repo]
              </code>{" "}
              is iframe-ready:{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                X-Frame-Options
              </code>{" "}
              overridden to{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                ALLOWALL
              </code>{" "}
              and CORS enabled on the JSON API. One iframe tag embeds a live changelog anywhere on
              the web.
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
              4. AI with graceful fallback
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-2)", margin: 0, lineHeight: 1.7 }}>
              If{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                GROQ_API_KEY
              </code>{" "}
              is absent or the API fails, a keyword-based classifier runs instead. Keywords like{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                feat:
              </code>
              ,{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                fix:
              </code>
              ,{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                refactor:
              </code>{" "}
              map to categories. The app works fully without any AI key.
            </p>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section style={sectionGap}>
        <SectionLabel>Challenges</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "28px" }}>
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: "8px",
              }}
            >
              iron-session with Next.js 15+ async cookies
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 10px", lineHeight: 1.7 }}>
              In Next.js 15+,{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                cookies()
              </code>{" "}
              from{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                next/headers
              </code>{" "}
              returns a Promise. This isn&apos;t documented clearly in iron-session v8 — I found it
              through type errors.
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
              {`const cookieStore = await cookies()
const session = getIronSession(cookieStore, options)`}
            </pre>
          </div>
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: "8px",
              }}
            >
              PowerShell BOM corruption (production debugging)
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 10px", lineHeight: 1.7 }}>
              This was the most interesting bug. After deploying to Vercel, all database routes
              returned 500. The health endpoint revealed P1001:{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--red)",
                }}
              >
                Can&apos;t reach database server at &quot;base&quot;
              </code>
              . The hostname was{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                base
              </code>{" "}
              — not the Neon hostname.
            </p>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 10px", lineHeight: 1.7 }}>
              Root cause: PowerShell 5.1 prepends a UTF-8 BOM (U+FEFF) when piping strings to
              external processes. The DATABASE_URL in Vercel became{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--red)",
                }}
              >
                ﻿postgresql://…
              </code>{" "}
              and{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                pg
              </code>{" "}
              parsed the invalid scheme and fell back to host{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                base
              </code>
              .
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
              {`// Fix: spawn Vercel CLI via Node.js + cmd.exe
// Write raw Buffer bytes to stdin — no PowerShell encoding layer
child.stdin.write(Buffer.from(url, "utf8"))`}
            </pre>
          </div>
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: "8px",
              }}
            >
              Embed iframe headers
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.7 }}>
              Next.js sets{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                X-Frame-Options: SAMEORIGIN
              </code>{" "}
              on all responses by default. To make the embed page frameable, I override headers in{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                next.config.ts
              </code>{" "}
              per route.
            </p>
          </div>
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
              skill: "OAuth 2.0 protocol",
              detail:
                "Full implementation: CSRF, code exchange, token storage, encrypted sessions. Not a library wrapper.",
            },
            {
              skill: "Multi-tenant SaaS design",
              detail:
                "User-scoped DB queries, cascade deletes, data isolation between users",
            },
            {
              skill: "GitHub API integration",
              detail:
                "OAuth token management, repo listing, commit history traversal",
            },
            {
              skill: "Security-first defaults",
              detail:
                "HttpOnly cookies, CSRF state token, Secure flag, SameSite=Lax, no sensitive data in client JS",
            },
            {
              skill: "Platform thinking",
              detail:
                "Shipped a JSON API and embeddable widget from day one, not as an afterthought",
            },
            {
              skill: "Production debugging",
              detail:
                "Diagnosed and fixed a non-obvious production failure (P1001 from PowerShell BOM corruption)",
            },
          ].map((item, i, arr) => (
            <div
              key={item.skill}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
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
