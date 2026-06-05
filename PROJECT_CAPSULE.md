# Portfolio — PROJECT_CAPSULE.md

> This capsule is the single source of truth for building Veeresh's developer portfolio.
> A fresh Claude Code session will build the entire project from ONLY this file.
> Every decision is documented. Every line of content is written here.
> Do not deviate from this spec without explicit approval.

---

## 0. Context — Who This Is For

**Developer:** Veeresh  
**Age:** 15  
**Education:** Class 10, Shantiniketan Vidyalaya, Telangana, India  
**GitHub:** https://github.com/debug949  
**Goal:** Build a top-1% developer portfolio that maximizes:
- US university admissions (CS/Engineering programs)
- Software engineering internship applications
- Recruiter and technical evaluator credibility
- Freelance client trust

**The narrative:** At 15, Veeresh shipped two production SaaS tools — not tutorials, not clones. Real engineering: parallel HTTP checks, raw OAuth 2.0, multi-tenant databases, AI integration, production deployments, debugging non-obvious failures (Vercel timeouts, PowerShell BOM corruption). The portfolio's job is to make that immediately obvious.

---

## 1. Projects Being Showcased

### ShipSafe
- **Live:** https://shipsafe-xzne.vercel.app/
- **GitHub:** https://github.com/debug949/shipsafe
- **What it is:** Web security audit tool. Paste a URL → 19 parallel HTTP checks run via `Promise.all` → composite 0–100 score + A–F grade → AI (Groq llama-3.3-70b) generates plain-English analysis with prioritized fixes → report saved to PostgreSQL, shareable via `/report/[id]`
- **Check categories:** 2 HTTPS checks, 6 security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), 9 exposed file probes (.env, .git/config, wp-config.php, etc.), 1 cookie flags check, 1 server disclosure check, 1 PageSpeed performance check
- **Key engineering decisions:**
  1. `Promise.all` for all 19 checks concurrently — sequential would take 2–3 min; parallel takes 10–20 seconds
  2. Model-agnostic AI layer — factory pattern (getAIProvider()), switches Groq/OpenAI/Grok via single `AI_PROVIDER` env var
  3. Graceful degradation — AI and DB are optional; if either fails, core audit still runs and returns results
- **Tech:** Next.js 16, TypeScript strict, Tailwind v4, Prisma 7 (pg adapter), Neon PostgreSQL, Groq API, Vercel
- **Design:** GitHub dark palette, Geist fonts (via next/font/google), inline styles + CSS custom properties

### Patchwork
- **Live:** https://patchwork-theta.vercel.app
- **GitHub:** https://github.com/debug949/patchwork
- **What it is:** GitHub OAuth changelog generator. Sign in → connect a repository → click "Generate" → system fetches last 50 commits from GitHub API → Groq AI categorizes into features/fixes/refactors/breaking changes → changelog saved to DB → public URL at `/log/[owner]/[repo]` → embeddable anywhere via `<iframe>`
- **Key engineering decisions:**
  1. Raw OAuth 2.0 — no NextAuth. Implemented: CSRF state token (random 16-byte hex stored in HttpOnly cookie), redirect to GitHub authorize, code exchange for access token (server-side), user upsert, iron-session cookie (HttpOnly, Secure, SameSite=Lax, AES-256-GCM)
  2. Multi-tenant data model — User → Repository → Changelog (cascade deletes). Every DB query scoped to `userId` to prevent cross-tenant data leakage
  3. Embeddable widget — `/embed/[owner]/[repo]` with `X-Frame-Options: ALLOWALL` and CSP `frame-ancestors *` set in next.config.ts headers
  4. AI with keyword fallback — Groq optional; if unavailable, keyword-based classifier runs
- **Technical challenges solved:**
  - iron-session + Next.js 15+ async `cookies()` (must `await cookies()` before passing to `getIronSession`)
  - Prisma 7 pg adapter pattern (no `url` in schema.prisma; `prisma.config.ts` handles connection)
  - PowerShell BOM corruption — PS 5.1 prepends UTF-8 BOM (U+FEFF) when piping strings, corrupting DATABASE_URL in Vercel env vars (P1001 error). Fixed by spawning Vercel CLI from Node.js via `cmd.exe` with raw `Buffer` stdin
- **Tech:** Next.js 16, TypeScript strict, Tailwind v4, Prisma 7 (pg adapter), Neon PostgreSQL, iron-session, raw GitHub OAuth 2.0, Groq API, Vercel

---

## 2. Architecture Decision

### Options Evaluated

| | Option A: Astro | Option B: Next.js static | Option C: Next.js SSG |
|---|---|---|---|
| Matches Veeresh's stack | ✗ | ✓ | ✓ |
| Portfolio proves the tech | ✗ | ✓ | ✓ |
| Zero runtime cost | ✓ | ✓ | ✓ |
| Future dynamic features | ✗ | Limited | ✓ |
| Vercel deployment | ✓ | ✓ | ✓ |
| Complexity | Low | Low | Low |

**Chosen: Option C — Next.js 16 App Router with static generation.**

Rationale: The portfolio is Project #3. "Built my portfolio in the same stack I use for production tools" reinforces the narrative. All pages are statically generated at build time — no database, no auth, no server-side anything. Zero env vars required. Fast, SEO-perfect, zero ongoing cost.

**No external UI libraries.** No framer-motion, no shadcn, no Radix. The portfolio itself is a demonstration of clean code. Every visual element is hand-built.

---

## 3. Tech Stack

```
Framework:   Next.js 16.2.7 (App Router)
Language:    TypeScript 5 (strict: true)
Styling:     Tailwind CSS v4 (via @import "tailwindcss" in globals.css)
Font:        Geist + Geist Mono (via next/font/google — same as ShipSafe)
Icons:       Inline SVG only (no icon library)
Rendering:   Static generation (all pages pre-rendered at build)
Deployment:  Vercel
Domain:      TBD — placeholder is [YOUR_DOMAIN] throughout
```

### package.json dependencies
```json
{
  "dependencies": {
    "next": "16.2.7",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 4. Design System

### 4.1 Philosophy

The portfolio uses a premium dark developer aesthetic — visually related to ShipSafe and Patchwork (same font family, same structural approach) but distinctly a personal site rather than a tool UI. Deeper blacks, one signature accent color, content-first layout.

**Rules:**
- Content density: high. No padding that wastes space.
- Typography: the design. Everything else is structure.
- Color: used to create hierarchy, not decoration.
- Transitions: 150ms only, for interactive states. No entrance animations.
- No gradients anywhere.
- No shadows.
- No border-radius > 8px except pills (full-radius).

### 4.2 Color Palette

```css
/* Canvas / Backgrounds */
--bg:           #060a0f   /* page background — deeper than GitHub's #0d1117 */
--bg-surface:   #0d1117   /* card / section backgrounds */
--bg-elevated:  #161b22   /* nav, code blocks, elevated surfaces */

/* Borders */
--border:       #21262d   /* primary border */
--border-muted: #161b22   /* subtle separator */

/* Text */
--text:         #e6edf3   /* primary text */
--text-2:       #a0aab4   /* secondary text */
--text-muted:   #7d8590   /* captions, labels */
--text-dim:     #404850   /* placeholder text, decorative */

/* Accent — Electric Blue (the portfolio's signature color) */
--accent:       #2f81f7   /* primary accent — same blue as ShipSafe for cohesion */
--accent-dim:   #1a4a8a   /* accent at reduced opacity for borders/backgrounds */

/* Status colors (used in case studies) */
--green:        #3fb950
--red:          #f85149
--yellow:       #d29922
--orange:       #db6d28

/* Selection */
--selection-bg: #264f78
```

**Why this palette:**
- `--bg: #060a0f` is 10% darker than GitHub's `#0d1117`. This distinguishes the portfolio from the tools while maintaining visual coherence. A personal portfolio should feel premium, not like a product UI.
- `--accent: #2f81f7` is the exact blue from ShipSafe's `--blue`. This creates subtle cohesion — evaluators who visit both sites feel they're in the same developer's world.
- Only one accent color. No gradient, no secondary accent. Visual discipline.

### 4.3 Typography

```css
/* Fonts loaded via next/font/google */
font-sans: Geist     (weights: 400, 500, 600, 700)
font-mono: Geist Mono (weights: 400, 500, 600)

/* Type scale */
--text-xs:   11px   /* labels, meta, timestamps */
--text-sm:   13px   /* body secondary, captions */
--text-base: 15px   /* primary body text */
--text-lg:   18px   /* section intro, lead text */
--text-xl:   24px   /* sub-headings */
--text-2xl:  32px   /* section headings */
--text-3xl:  48px   /* hero headings (clamped: clamp(32px, 5vw, 48px)) */

/* Line heights */
Body text:   1.7
Headings:    1.15
Code:        1.5
Labels:      1.0 (no wrap intended)

/* Letter spacing */
Headings:       -0.02em to -0.03em (tight)
All-caps labels: 0.08em
Body:           normal
```

**Font loading in layout.tsx:**
```typescript
import { Geist, Geist_Mono } from "next/font/google"

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] })
```

### 4.4 Spacing System

```
4px    gap-1    — tight inline spacing
8px    gap-2    — between related elements  
12px   gap-3    — between list items
16px   gap-4    — between form elements
24px   gap-6    — between cards/sections within a block
32px   gap-8    — between major sections
48px   gap-12   — section vertical padding
64px   gap-16   — hero vertical padding
80px   gap-20   — between top-level page sections
```

### 4.5 Component Tokens

```css
/* Containers */
--max-w-content: 760px    /* primary content column */
--max-w-wide:    1000px   /* wider sections (project grid) */
--padding-page:  0 20px   /* side padding on mobile */

/* Nav */
--nav-height: 56px

/* Cards */
--card-padding:  20px 24px
--card-radius:   8px

/* Buttons */
--btn-height-sm: 28px
--btn-height-md: 36px
--btn-radius:    6px
```

---

## 5. Folder Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  ← Root layout: fonts, metadata, nav, footer
│   │   ├── globals.css                 ← Design tokens, resets, base styles
│   │   ├── page.tsx                    ← Homepage
│   │   ├── about/
│   │   │   └── page.tsx                ← About + timeline + goals
│   │   ├── projects/
│   │   │   ├── page.tsx                ← Projects index
│   │   │   ├── shipsafe/
│   │   │   │   └── page.tsx            ← ShipSafe case study
│   │   │   └── patchwork/
│   │   │       └── page.tsx            ← Patchwork case study
│   │   └── resume/
│   │       └── page.tsx                ← Resume (print-ready)
│   ├── components/
│   │   ├── Nav.tsx                     ← Site navigation (links + mobile)
│   │   ├── Footer.tsx                  ← Site footer
│   │   ├── ProjectCard.tsx             ← Project card for homepage + index
│   │   ├── TechBadge.tsx               ← Monospace tech name pill
│   │   ├── SectionLabel.tsx            ← ALL-CAPS section label
│   │   ├── CaseStudyHeader.tsx         ← Shared case study page header
│   │   └── ArchitectureDiagram.tsx     ← Text-based architecture diagram
│   └── lib/
│       └── data.ts                     ← All content, projects data, skills list
├── public/
│   ├── og-image.png                    ← 1200×630 OpenGraph image (built by Claude)
│   ├── favicon.ico                     ← Generated from initials
│   └── robots.txt                      ← Allow all
├── .gitignore
├── .env.example                        ← (empty — no env vars needed)
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── PROJECT_CAPSULE.md
```

---

## 6. All Routes / Pages

| Route | Type | Description |
|---|---|---|
| `/` | Static | Homepage: hero, projects, skills, timeline, contact |
| `/about` | Static | Full story, detailed timeline, what I'm looking for |
| `/projects` | Static | Projects index with cards |
| `/projects/shipsafe` | Static | ShipSafe case study |
| `/projects/patchwork` | Static | Patchwork case study |
| `/resume` | Static | HTML resume, print-ready with CSS |
| `/sitemap.xml` | Static (generated) | SEO sitemap |
| `/robots.txt` | Static | Crawl permissions |

All pages: statically generated. No dynamic routes. No API routes. No database.

---

## 7. Component Hierarchy

```
RootLayout (layout.tsx)
├── <html> (fonts applied via className)
├── <body>
│   ├── Nav
│   │   ├── Logo/name link
│   │   └── NavLinks (About, Projects, Resume, Contact)
│   ├── {children} — page content
│   └── Footer
│       ├── Copyright
│       └── Social links (GitHub, LinkedIn)

Homepage (page.tsx)
├── HeroSection
│   ├── headline
│   ├── sub-headline (age, location)
│   ├── stack line
│   └── CTAs
├── ProjectsSection
│   ├── SectionLabel
│   └── ProjectCard × 2 (ShipSafe, Patchwork)
├── SkillsSection
│   ├── SectionLabel
│   └── SkillGroup × N
├── AboutTeaser
│   ├── paragraph
│   └── "Full story →" link
└── ContactSection
    ├── availability statement
    └── contact links

ProjectCard (component)
├── project name + live badge
├── description
├── key stats (3 bullet points)
├── TechBadge × N
└── links: [Case study →] [GitHub ↗]

Case Study (projects/[slug]/page.tsx)
├── CaseStudyHeader
│   ├── back link
│   ├── title + tagline
│   ├── action links (Live Demo, GitHub)
│   └── TechBadge × N
├── ProblemSection
├── HowItWorksSection
│   └── ArchitectureDiagram
├── EngineeringDecisionsSection
│   └── DecisionCard × N
├── ChallengesSection
├── WhatItDemonstratesSection
└── CTASection

AboutPage
├── intro paragraphs
├── TimelineSection
│   └── TimelineItem × N
└── LookingForSection

ResumePage
├── ResumeHeader (name, contact)
├── SkillsSection (resume format)
├── ProjectsSection (resume format)
├── EducationSection
└── print: media query styles
```

---

## 8. globals.css

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

:root {
  --bg:           #060a0f;
  --bg-surface:   #0d1117;
  --bg-elevated:  #161b22;
  --border:       #21262d;
  --border-muted: #161b22;
  --text:         #e6edf3;
  --text-2:       #a0aab4;
  --text-muted:   #7d8590;
  --text-dim:     #404850;
  --accent:       #2f81f7;
  --accent-dim:   rgba(47, 129, 247, 0.15);
  --green:        #3fb950;
  --red:          #f85149;
  --yellow:       #d29922;
  --orange:       #db6d28;
}

*, *::before, *::after { box-sizing: border-box; }

html { font-size: 15px; scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  min-height: 100dvh;
}

::selection { background: #264f78; color: #e6edf3; }

/* Code blocks */
code, pre, .mono {
  font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;
}

/* Focus visible only (accessibility) */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Print styles for /resume */
@media print {
  :root { --bg: white; --text: #111; --text-2: #444; --border: #ccc; }
  nav, footer { display: none; }
  body { font-size: 11pt; }
}
```

---

## 9. Content — Complete Copy

### 9.1 SEO Metadata (per page)

**Homepage (`/`)**
```
title: "Veeresh — Full-Stack Engineer"
description: "15-year-old full-stack engineer from India. I build developer tools with Next.js, TypeScript, and PostgreSQL. Shipped ShipSafe and Patchwork."
og:image: /og-image.png
og:type: website
twitter:card: summary_large_image
```

**About (`/about`)**
```
title: "About — Veeresh"
description: "The story of a 15-year-old developer from Telangana building production software."
```

**Projects (`/projects`)**
```
title: "Projects — Veeresh"
description: "ShipSafe and Patchwork — two production SaaS tools built by a 15-year-old developer."
```

**ShipSafe case study (`/projects/shipsafe`)**
```
title: "ShipSafe — Case Study | Veeresh"
description: "How I built a web security scanner that runs 19 parallel checks and generates AI-powered fixes. Next.js, TypeScript, Prisma, Groq."
```

**Patchwork case study (`/projects/patchwork`)**
```
title: "Patchwork — Case Study | Veeresh"
description: "How I implemented raw GitHub OAuth 2.0, built a multi-tenant SaaS, and shipped an embeddable changelog widget."
```

**Resume (`/resume`)**
```
title: "Resume — Veeresh"
description: "Full-stack engineer · Next.js, TypeScript, PostgreSQL, OAuth, AI integration."
```

### 9.2 JSON-LD Structured Data (homepage only)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Veeresh",
  "url": "[PORTFOLIO_URL]",
  "description": "15-year-old full-stack engineer from Telangana, India",
  "knowsAbout": ["TypeScript", "Next.js", "PostgreSQL", "OAuth", "AI integration"],
  "sameAs": [
    "https://github.com/debug949"
  ]
}
```

### 9.3 Homepage Content

**Hero:**
```
Headline (H1):   I build developer tools.
Sub-headline:    Full-stack engineer · 15 · Telangana, India
Stack line:      Next.js · TypeScript · PostgreSQL · OAuth · AI
CTA primary:     View my work          → /projects
CTA secondary:   GitHub               → https://github.com/debug949
```

**Projects section label:** `Selected work`

**ShipSafe card:**
```
Name:        ShipSafe
Live badge:  ● live
Tagline:     Web security scanner with AI-powered remediation
Stats:
  · 19 parallel checks via Promise.all
  · AI-generated, prioritized fix list
  · Shareable report links
Tech:        Next.js  TypeScript  Prisma  PostgreSQL  Groq
Links:       [Case study →]  [GitHub ↗]  [Live demo ↗]
```

**Patchwork card:**
```
Name:        Patchwork
Live badge:  ● live
Tagline:     GitHub OAuth changelog generator with embeddable widget
Stats:
  · Raw OAuth 2.0 — no NextAuth, CSRF protected
  · Multi-tenant SaaS architecture
  · Embeddable iframe widget + public JSON API
Tech:        Next.js  TypeScript  Prisma  iron-session  Groq
Links:       [Case study →]  [GitHub ↗]  [Live demo ↗]
```

**Skills section label:** `Skills`

**Skills groups:**
```
Languages       TypeScript  JavaScript
Frameworks      Next.js  React
Database        PostgreSQL  Prisma 7  Neon
Auth & Security OAuth 2.0  iron-session  CSRF  HTTPS / security headers
AI              Groq  LLM integration  Prompt engineering  Structured output
Infrastructure  Vercel  GitHub Actions  CI/CD  Neon serverless
```

**About teaser:**
```
I'm a self-taught developer from Telangana, building developer tools
that solve problems I actually run into. I prefer shipping real products
over tutorial clones.

[Full story →]
```

**Contact section:**
```
Label:       Let's talk
Body:        Open to internships, freelance projects, and collaborations.
Contact:     [EMAIL — TBD by user]
GitHub:      github.com/debug949
LinkedIn:    [TBD by user — omit section if not provided]
```

### 9.4 About Page Content

**Intro (3 paragraphs):**
```
Para 1:
I'm Veeresh, a 15-year-old developer from Telangana, India. I taught myself
to code, and then I built things. Not tutorial projects — actual tools that
solve problems developers face: a security scanner, a changelog generator.
Both are live, both have real users, and both taught me more than any course could.

Para 2:
My engineering philosophy: ship something that works before polishing something
that doesn't. ShipSafe and Patchwork both started as personal frustrations.
ShipSafe because I kept forgetting to check security headers before launch.
Patchwork because writing changelogs manually was tedious and nobody did it.
I build tools I'd actually want to use.

Para 3:
I'm currently in Class 10 at Shantiniketan Vidyalaya. I plan to study Computer
Science at university — ideally abroad. In the meantime, I'm open to internship
opportunities, freelance projects, and anything that lets me work on interesting
engineering problems.
```

**Timeline section label:** `Timeline`

**Timeline items:**
```
2024 — Started programming
       Self-taught via documentation, not bootcamps.
       First projects: small scripts and web experiments.

2025 — First full-stack projects
       Learned Next.js, PostgreSQL, TypeScript.
       Built internal tools and hobby projects.
       Started understanding deployment and production concerns.

Jun 2026 — Shipped ShipSafe
            Web security audit tool: 19 parallel HTTP checks, model-agnostic
            AI layer (Groq / OpenAI / Grok switchable via env var), graceful
            degradation architecture. Live at shipsafe-xzne.vercel.app.

Jun 2026 — Shipped Patchwork
            GitHub OAuth changelog generator: raw OAuth 2.0 (no NextAuth),
            multi-tenant SaaS data model, embeddable iframe widget, public
            JSON API. Live at patchwork-theta.vercel.app.

Now — Class 10, Shantiniketan Vidyalaya
      Applying for internships and US university programs.
      Building the next project.
```

**Looking for section:**
```
Label: What I'm looking for

Software engineering internships — remote or in-person, India or abroad.
I'm comfortable with TypeScript, Next.js, PostgreSQL, and REST APIs.
I learn fast and prefer environments where I'll get real engineering work.

Freelance projects — web applications, developer tools, anything technical.
I've built production systems; I can build yours.

Open source collaboration — if you're building something interesting,
I'd like to contribute.

Contact: [EMAIL — TBD] · GitHub: github.com/debug949
```

### 9.5 ShipSafe Case Study Content

**Header:**
```
Back: ← Projects
Title: ShipSafe
Tagline: Web security scanner with AI-powered remediation
Links: [Live Demo ↗]  [GitHub ↗]  [Run a scan ↗]
Tech: Next.js  TypeScript  Prisma 7  PostgreSQL  Groq AI  Vercel
```

**Problem section:**
```
Label: The problem

Most developers ship websites without checking the basics. A missing
Content-Security-Policy leaves users exposed to XSS. An exposed .env
file leaks database credentials. HTTP cookies without the Secure flag
get stolen over coffee shop Wi-Fi.

These aren't obscure vulnerabilities — they're the first things
attackers check. ShipSafe automates the audit.
```

**How it works section:**
```
Label: How it works

Architecture (text diagram):
┌─────────────────────────────────────────────────────────┐
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
└─────────────────────────────────────────────────────────┘

Total checks: 19 (6 categories)
Time: 10–20 seconds
```

**Engineering decisions section:**
```
Label: Engineering decisions

1. Promise.all for 19 concurrent checks
   Running checks sequentially would require 10 HTTP requests × 5s timeout
   each = 50+ seconds. Running them concurrently via Promise.all brings the
   total to the slowest single check — about 8 seconds of I/O, 2 seconds
   of overhead. This was the first architecture decision I made: the system
   is I/O-bound, not CPU-bound, so concurrency is everything.

2. Model-agnostic AI interface
   The AI layer uses a factory pattern: getAIProvider() reads the AI_PROVIDER
   environment variable and returns the appropriate class (GroqProvider,
   OpenAIProvider, GrokProvider). Switching AI vendors is one env var change.
   This was a 30-minute investment that future-proofs the entire AI layer.

   Pattern:
   const ai = getAIProvider()          // reads AI_PROVIDER env var
   const result = await ai.complete()  // uniform interface regardless of vendor

3. Graceful degradation
   The core audit — running checks, computing a score — has zero external
   dependencies beyond the target URL. AI synthesis and database saving are
   independently isolated: each can fail without affecting the other or the
   core result. This means the tool always works, even misconfigured.
```

**Technical challenges section:**
```
Label: Challenges

Prisma 7 breaking changes
   Prisma 7 removed the database URL from schema.prisma and requires a
   pg adapter. The pattern: Pool → PrismaPg adapter → PrismaClient({ adapter }).
   Documentation for v7 was sparse; I read the migration notes and adapted.

Vercel function timeout
   19 parallel checks + AI synthesis exceeded Vercel's default 10s function
   timeout. Fixed by adding export const maxDuration = 45 to the route handler.
   45s is the maximum on the hobby tier.

Model naming confusion
   The user-provided key was a Groq key (prefix: gsk_), not an xAI Grok key.
   Added Groq as a separate provider class while keeping the model-agnostic
   interface intact — the abstraction meant this was a 20-minute change.
```

**What it demonstrates section:**
```
Label: What this demonstrates

Security engineering    — OWASP header knowledge, attack vector awareness,
                          understanding of what attackers actually check first

TypeScript / Node.js    — Strict types throughout, async/await patterns,
                          proper error handling without exception propagation

System design           — Parallel I/O, graceful degradation, isolated
                          failure domains, vendor abstraction

AI integration          — Prompt engineering for structured JSON output,
                          silent failure design (AI never breaks the product)

Production deployment   — Vercel functions, serverless PostgreSQL (Neon),
                          env var management, build pipeline
```

### 9.6 Patchwork Case Study Content

**Header:**
```
Back: ← Projects
Title: Patchwork
Tagline: GitHub OAuth changelog generator with embeddable widget
Links: [Live Demo ↗]  [GitHub ↗]  [View example changelog ↗]
Tech: Next.js  TypeScript  Prisma 7  PostgreSQL  iron-session  Groq AI
```

**Problem section:**
```
Label: The problem

Writing changelogs is tedious. Most developers skip them or write one
sentence. Patchwork connects to GitHub, reads your commit history, and
generates a structured changelog — features, fixes, refactors, breaking
changes — that you can share or embed on your site.

It's the tool I wanted every time I shipped a new version of something.
```

**How it works section:**
```
Label: How it works

Architecture:
┌─────────────────────────────────────────────────────────┐
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
└─────────────────────────────────────────────────────────┘
```

**Engineering decisions section:**
```
Label: Engineering decisions

1. Raw OAuth 2.0 — no NextAuth
   Most developers reach for NextAuth and never understand what OAuth actually
   does. I implemented the full flow:

   Step 1: Generate 16-byte random hex state token → store in HttpOnly cookie
   Step 2: Redirect to github.com/login/oauth/authorize with state param
   Step 3: GitHub redirects back with code + state
   Step 4: Verify state (CSRF check) → delete state cookie
   Step 5: POST to github.com/login/oauth/access_token (server-side)
   Step 6: GET api.github.com/user with the token
   Step 7: Upsert user in DB → set iron-session cookie

   The session cookie uses AES-256-GCM encryption (iron-session), is HttpOnly
   (inaccessible to JavaScript), Secure (HTTPS only), and SameSite=Lax.

2. Multi-tenant data model
   User → Repository → Changelog (cascade deletes).
   Every database query is scoped to the authenticated user's ID:
   prisma.repository.findFirst({ where: { id, userId: session.userId } })
   A user can never read, modify, or delete another user's data.

3. Embeddable widget as a platform primitive
   /embed/[owner]/[repo] is iframe-ready: X-Frame-Options overridden to
   ALLOWALL and CSP set to frame-ancestors * in next.config.ts headers.
   /api/public/[owner]/[repo] returns JSON with CORS enabled.
   One iframe tag embeds a live changelog anywhere on the web.

4. AI with graceful fallback
   If GROQ_API_KEY is absent or the API fails, a keyword-based classifier
   runs instead. Keywords like "feat:", "fix:", "refactor:" map to categories.
   The app works fully without any AI key.
```

**Technical challenges section:**
```
Label: Challenges

iron-session with Next.js 15+ async cookies
   In Next.js 15+, cookies() from next/headers returns a Promise. You must
   await it before passing to getIronSession:
   const cookieStore = await cookies()
   const session = getIronSession(cookieStore, options)
   This isn't documented clearly in iron-session v8. I found it through type errors.

PowerShell BOM corruption (production debugging)
   This was the most interesting bug. After deploying to Vercel, all database
   routes returned 500. The health endpoint revealed P1001: "Can't reach
   database server at base". The hostname was "base" — not the Neon hostname.

   Root cause: PowerShell 5.1 prepends a UTF-8 BOM (U+FEFF) when piping
   strings to external processes. The DATABASE_URL in Vercel became:
   ﻿postgresql://... (with BOM prefix)
   pg parsed ﻿postgresql:// as an invalid scheme and fell back to host "base".

   Fix: Spawn the Vercel CLI from a Node.js script via cmd.exe with raw
   Buffer stdin writes — completely bypassing PowerShell's encoding layer:
   child.stdin.write(Buffer.from(url, "utf8"))
   
   This required diagnosing the error from a 500 response body, reading
   PostgreSQL driver source to understand the fallback behavior, and
   understanding the Windows console encoding pipeline.

Embed iframe headers
   Next.js sets X-Frame-Options: SAMEORIGIN on all responses by default.
   To make the embed page frameable, I override headers in next.config.ts:
   { source: "/embed/:path*", headers: [{ key: "X-Frame-Options", value: "ALLOWALL" }] }
```

**What it demonstrates section:**
```
Label: What this demonstrates

OAuth 2.0 protocol        — Full implementation: CSRF, code exchange, token
                            storage, encrypted sessions. Not a library wrapper.

Multi-tenant SaaS design  — User-scoped DB queries, cascade deletes,
                            data isolation between users

GitHub API integration    — OAuth token management, repo listing,
                            commit history traversal

Security-first defaults   — HttpOnly cookies, CSRF state token, Secure flag,
                            SameSite=Lax, no sensitive data in client JS

Platform thinking         — Shipped a JSON API and embeddable widget from
                            day one, not as an afterthought

Production debugging      — Diagnosed and fixed a non-obvious production failure
                            (P1001 from PowerShell BOM corruption)
```

### 9.7 Resume Content

**Resume sections:**

```
Name: Veeresh
Location: Telangana, India
Contact: [EMAIL — TBD]  ·  github.com/debug949  ·  [LINKEDIN — TBD]

─── Skills ──────────────────────────────────────────────────────────
Languages:      TypeScript, JavaScript
Frameworks:     Next.js 16, React
Database:       PostgreSQL, Prisma 7, Neon (serverless)
Auth & APIs:    OAuth 2.0, iron-session, REST APIs, CSRF
AI:             Groq, LLM integration, prompt engineering
Infrastructure: Vercel, GitHub Actions, CI/CD

─── Projects ────────────────────────────────────────────────────────
ShipSafe — Web Security Audit Tool                          2026
Next.js · TypeScript · Prisma 7 · PostgreSQL · Groq · Vercel
Built a web security scanner that runs 19 parallel HTTP checks
(HTTPS, security headers, exposed files, cookies, performance) and
generates AI-powered, prioritized remediation. Engineered a
model-agnostic AI interface (Groq/OpenAI/Grok) switchable via env var.
Deployed with shareable report links backed by Neon PostgreSQL.
Live: shipsafe-xzne.vercel.app · github.com/debug949/shipsafe

Patchwork — AI Changelog Generator                          2026
Next.js · TypeScript · iron-session · GitHub OAuth · Groq · Vercel
Built a multi-tenant SaaS that connects to GitHub via raw OAuth 2.0,
fetches commit history, and generates categorized changelogs with AI.
Implemented CSRF protection, encrypted sessions, cascade-delete data
model, embeddable iframe widget, and public JSON API.
Live: patchwork-theta.vercel.app · github.com/debug949/patchwork

─── Education ───────────────────────────────────────────────────────
Class 10 (in progress)                                      2026
Shantiniketan Vidyalaya, Telangana, India
```

---

## 10. SEO Strategy

### Metadata approach
Every page uses Next.js `generateMetadata()` (or static `export const metadata`). No third-party SEO packages.

```typescript
// Root layout — base metadata
export const metadata: Metadata = {
  metadataBase: new URL("[PORTFOLIO_URL]"),
  title: { default: "Veeresh", template: "%s — Veeresh" },
  description: "...",
  openGraph: { type: "website", siteName: "Veeresh" },
  twitter: { card: "summary_large_image" },
}

// Per-page metadata overrides title and description
export const metadata: Metadata = {
  title: "ShipSafe — Case Study",
  description: "...",
}
```

### OpenGraph image
- `/public/og-image.png` — 1200×630px
- Dark background (#060a0f), white text
- "Veeresh" in large Geist typeface
- "Full-stack engineer · 15 · India" as subtitle
- Two project names: ShipSafe · Patchwork
- No complex graphics — text only, matches the aesthetic

### Sitemap
```typescript
// src/app/sitemap.ts
export default function sitemap() {
  return [
    { url: "[PORTFOLIO_URL]", lastModified: new Date(), priority: 1.0 },
    { url: "[PORTFOLIO_URL]/about", priority: 0.9 },
    { url: "[PORTFOLIO_URL]/projects", priority: 0.9 },
    { url: "[PORTFOLIO_URL]/projects/shipsafe", priority: 0.8 },
    { url: "[PORTFOLIO_URL]/projects/patchwork", priority: 0.8 },
    { url: "[PORTFOLIO_URL]/resume", priority: 0.7 },
  ]
}
```

### robots.txt (in public/)
```
User-agent: *
Allow: /
Sitemap: [PORTFOLIO_URL]/sitemap.xml
```

---

## 11. Data Structures (src/lib/data.ts)

This file holds all structured data so pages don't embed raw strings.

```typescript
export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  stats: string[]          // 3 bullet points for project card
  tech: string[]           // tech badge labels
  liveUrl: string
  githubUrl: string
  caseStudyPath: string
}

export const PROJECTS: Project[] = [
  {
    slug: "shipsafe",
    name: "ShipSafe",
    tagline: "Web security scanner with AI-powered remediation",
    description: "Paste a URL. Get a scored security report with prioritized fixes in 20 seconds.",
    stats: [
      "19 parallel checks via Promise.all",
      "AI-generated, prioritized fix list",
      "Shareable report links backed by PostgreSQL",
    ],
    tech: ["Next.js", "TypeScript", "Prisma 7", "PostgreSQL", "Groq AI"],
    liveUrl: "https://shipsafe-xzne.vercel.app/",
    githubUrl: "https://github.com/debug949/shipsafe",
    caseStudyPath: "/projects/shipsafe",
  },
  {
    slug: "patchwork",
    name: "Patchwork",
    tagline: "GitHub OAuth changelog generator with embeddable widget",
    description: "Connect a GitHub repo. Generate a categorized changelog from commit history with one click.",
    stats: [
      "Raw OAuth 2.0 — no NextAuth, CSRF protected",
      "Multi-tenant SaaS data model",
      "Embeddable iframe widget + public JSON API",
    ],
    tech: ["Next.js", "TypeScript", "Prisma 7", "iron-session", "Groq AI"],
    liveUrl: "https://patchwork-theta.vercel.app",
    githubUrl: "https://github.com/debug949/patchwork",
    caseStudyPath: "/projects/patchwork",
  },
]

export interface SkillGroup {
  label: string
  skills: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  { label: "Languages", skills: ["TypeScript", "JavaScript"] },
  { label: "Frameworks", skills: ["Next.js", "React"] },
  { label: "Database", skills: ["PostgreSQL", "Prisma 7", "Neon"] },
  { label: "Auth & Security", skills: ["OAuth 2.0", "iron-session", "CSRF", "Security headers"] },
  { label: "AI", skills: ["Groq", "LLM integration", "Prompt engineering"] },
  { label: "Infrastructure", skills: ["Vercel", "GitHub Actions", "CI/CD"] },
]

export interface TimelineItem {
  period: string
  title: string
  description: string
}

export const TIMELINE: TimelineItem[] = [
  { period: "2024", title: "Started programming", description: "Self-taught via documentation. First scripts and web experiments." },
  { period: "2025", title: "First full-stack projects", description: "Learned Next.js, PostgreSQL, TypeScript. Started understanding production concerns." },
  { period: "Jun 2026", title: "Shipped ShipSafe", description: "Web security audit tool: 19 parallel checks, model-agnostic AI, graceful degradation." },
  { period: "Jun 2026", title: "Shipped Patchwork", description: "GitHub OAuth changelog SaaS: raw OAuth 2.0, multi-tenant architecture, embeddable widget." },
  { period: "Now", title: "Class 10, Shantiniketan Vidyalaya", description: "Applying for internships and US university programs. Building the next project." },
]

// Contact — UPDATE BEFORE DEPLOYMENT
export const CONTACT = {
  email: "[EMAIL — add before deployment]",
  github: "https://github.com/debug949",
  linkedin: "",           // "" = omit from UI
}

export const PORTFOLIO_URL = "[YOUR_DOMAIN]"  // Update before deployment
export const PORTFOLIO_NAME = "Veeresh"
```

---

## 12. Nav Component Specification

```
Desktop layout:
[Veeresh]                    [About] [Projects] [Resume] [Contact ↗]

Mobile layout (< 640px):
[Veeresh]                                                    [☰]
  ↓ (open)
  [About]
  [Projects]
  [Resume]
  [Contact]

Nav behavior:
- Fixed at top, background: var(--bg), border-bottom: 1px solid var(--border)
- Height: 56px
- Veeresh name: fontWeight 700, fontFamily mono, no hover decoration
- Links: color var(--text-muted), hover → var(--text), transition 150ms
- Active page: color var(--text)
- Contact link: opens mailto: (no new tab, just mailto handler)
- Mobile: hamburger toggles link list below nav
```

---

## 13. Footer Component Specification

```
Layout (centered, below all content):
─────────────────────────────────────
Built with Next.js · © 2026 Veeresh
[GitHub ↗]  [LinkedIn ↗]

Height: auto, padding: 32px 24px
Text: var(--text-muted), 13px
Border-top: 1px solid var(--border)
```

---

## 14. Missing Information — Collect Before Deployment

The following placeholders exist in the content above. The new Claude session should use exactly these placeholder strings and leave them for the user to replace, OR collect them before starting:

| Placeholder | Required | Notes |
|---|---|---|
| `[EMAIL]` | Yes | Contact email. If not provided, omit contact email, show only GitHub |
| `[LINKEDIN — TBD]` | No | LinkedIn profile URL. If not provided, omit LinkedIn link entirely |
| `[YOUR_DOMAIN]` | Yes for sitemap/OG | Portfolio URL. Use `https://veeresh-portfolio.vercel.app` as fallback |
| `[PORTFOLIO_URL]` | Same as above | Same |

**The new Claude session must ask for these at the very start before writing code.**

---

## 15. Implementation Order

The new Claude session must follow this exact order. Build, verify, and move on — no skipping ahead.

```
Step 1 — Ask user for: email, LinkedIn URL, domain/URL preference
Step 2 — Initialize project: package.json, tsconfig.json, next.config.ts, 
          postcss.config.mjs, eslint.config.mjs, .gitignore
Step 3 — Install dependencies: npm install
Step 4 — Write src/lib/data.ts (all content, updated with user inputs)
Step 5 — Write src/app/globals.css (design tokens, resets)
Step 6 — Write src/app/layout.tsx (fonts, root metadata, Nav, Footer)
Step 7 — Write src/components/Nav.tsx
Step 8 — Write src/components/Footer.tsx
Step 9 — Write src/components/TechBadge.tsx
Step 10 — Write src/components/SectionLabel.tsx
Step 11 — Write src/components/ProjectCard.tsx
Step 12 — Write src/app/page.tsx (homepage)
Step 13 — Run `npm run build` — fix any errors before continuing
Step 14 — Write src/app/about/page.tsx
Step 15 — Write src/app/projects/page.tsx
Step 16 — Write src/components/CaseStudyHeader.tsx
Step 17 — Write src/components/ArchitectureDiagram.tsx
Step 18 — Write src/app/projects/shipsafe/page.tsx
Step 19 — Write src/app/projects/patchwork/page.tsx
Step 20 — Write src/app/resume/page.tsx
Step 21 — Write src/app/sitemap.ts
Step 22 — Write public/robots.txt
Step 23 — Run `npm run build` — full clean build required
Step 24 — Run TypeScript check: npx tsc --noEmit
Step 25 — Run lint: npm run lint
Step 26 — Fix ALL errors from steps 23–25 before proceeding
Step 27 — Git init, add, commit: "feat: portfolio complete"
Step 28 — Vercel deploy (gh repo create + git push + vercel --prod)
Step 29 — Smoke test all routes in production
Step 30 — Update CONTACT.email, PORTFOLIO_URL in data.ts with real values
Step 31 — Final commit + push + redeploy
```

**CRITICAL RULE for the new Claude session:**
- Follow Next.js 16 App Router patterns exactly
- Every page component is a server component (no "use client") unless it needs interactivity (only Nav mobile toggle needs "use client")
- All pages use inline styles (same pattern as ShipSafe and Patchwork) — NOT Tailwind utility classes in JSX
- TypeScript strict: no `any`, no `as unknown` unless unavoidable
- Run `npm run build` after every major phase. Fix errors immediately.

---

## 16. Next.js Config

```typescript
// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // All pages are statically generated — no runtime needed
  // Note: Don't use output: 'export' — Vercel handles SSG natively and
  // output: export breaks the sitemap route and Next.js Image component
}

export default nextConfig
```

---

## 17. Deployment Plan

1. **GitHub repository:** Create new public repo named `portfolio` at github.com/debug949/portfolio
2. **Vercel project:** Import from GitHub, framework auto-detected as Next.js
3. **Environment variables:** None required (fully static)
4. **Domain:** TBD — user to decide. Vercel provides `[project].vercel.app` by default
5. **Post-deploy:** Update `PORTFOLIO_URL` and `CONTACT.email` in `data.ts`, redeploy

**This project has zero runtime dependencies — no database, no auth, no env vars. It will never have a 500 error in production.**

---

## 18. Future Expansion Plan

These are NOT in scope for the initial build. They are documented so the architecture supports them:

| Feature | Approach |
|---|---|
| Contact form | Add Resend API (1 env var), convert contact section to form with API route |
| Blog | Add `/blog/[slug]` route with MDX files in `/content/blog/` |
| Project #3 case study | Add `/projects/[new-slug]/page.tsx` + entry in `PROJECTS` array in data.ts |
| Analytics | Vercel Analytics (zero config, `@vercel/analytics` package) |
| Dark/light mode | Add theme toggle, CSS variables already structured for this |
| Resume PDF | Add `@react-pdf/renderer` or link to hosted PDF |
| GitHub Activity widget | Fetch from GitHub API in a Server Component |

---

## 19. Architecture Review (Self-Audit)

I reviewed every architectural decision at least 3 times. Here is the audit log:

**Q: Should I use Tailwind utility classes or inline styles?**
A: Inline styles, matching ShipSafe and Patchwork's pattern. Reason: (1) Visual cohesion with the existing projects. (2) Inline styles are more explicit and easier to read for a portfolio's simple layout. (3) The design system is simple enough that a utility class framework adds overhead without benefit. Tailwind `@import "tailwindcss"` is still included for the reset and font utilities.

**Q: Should I add animations?**
A: No. The projects are the product. CSS animations on a developer portfolio either look cheap (CSS keyframes) or are overkill (framer-motion adds 60KB). The "impressive" signal comes from the content and code quality, not from cards that slide in.

**Q: Should I use a CMS for content?**
A: No. `src/lib/data.ts` is the CMS. For a 5-page static portfolio, a CMS adds complexity without benefit. Updating content is a one-file change.

**Q: Should there be a projects index at /projects AND project cards on the homepage?**
A: Yes. The homepage cards are the first impression — they must be present. The /projects route exists because evaluators expect it and it improves SEO for each project name individually.

**Q: Should I use `output: 'export'` for full static export?**
A: No. Vercel's native Next.js handling is superior — it handles the sitemap.ts route handler, optimizes images, and supports future dynamic pages without config changes. `output: 'export'` is for non-Vercel deployments.

**Q: Is the content complete enough for the new Claude session to build without asking questions (other than the 3 missing fields)?**
A: Yes. Every page has exact copy, every component has exact specs, every style token is defined. The new session should be able to produce a working, production-ready portfolio in one pass.

---

## 20. Quality Checklist

The new Claude session must verify each item before declaring the build complete:

**Build:**
- [ ] `npm run build` exits with code 0, no warnings
- [ ] `npx tsc --noEmit` exits with code 0
- [ ] `npm run lint` exits with code 0
- [ ] All 7 routes resolve (/, /about, /projects, /projects/shipsafe, /projects/patchwork, /resume, /sitemap.xml)

**Content:**
- [ ] No placeholder text like "[TBD]" or "[TODO]" visible in rendered pages
- [ ] All links work: GitHub links, Live Demo links, contact email
- [ ] All tech badges render correctly
- [ ] Timeline renders in order
- [ ] Case study architecture diagrams render in monospace (code block)

**SEO:**
- [ ] Page `<title>` is correct on every page
- [ ] `<meta name="description">` is set on every page
- [ ] OpenGraph tags present on every page
- [ ] `/sitemap.xml` is accessible and lists all 6 routes
- [ ] `/robots.txt` is accessible

**Responsive:**
- [ ] Homepage readable at 375px (iPhone SE)
- [ ] Nav mobile menu works at 375px
- [ ] Project cards stack vertically on mobile
- [ ] Case study text doesn't overflow on mobile
- [ ] Resume page readable on mobile

**Accessibility:**
- [ ] All images have `alt` text
- [ ] Interactive elements have visible focus states (`:focus-visible` already in globals.css)
- [ ] Nav links and buttons are keyboard-navigable
- [ ] Color contrast: text on --bg meets WCAG AA (7:1 for --text on --bg)

**Production:**
- [ ] Deployed to Vercel
- [ ] All routes return 200 in production
- [ ] OG image visible when URL shared on Twitter/LinkedIn
- [ ] No console errors in production

---

*End of PROJECT_CAPSULE.md — v1.0*
*Written: 2026-06-05*
*Status: Awaiting approval*
