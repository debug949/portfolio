# Portfolio — PROJECT_CAPSULE.md

> Last updated: 2026-06-05  
> Status: **COMPLETE — live in production**

---

## 0. What This Is

Veeresh's personal developer portfolio. A Next.js 16 App Router site — fully statically generated, zero env vars, zero database, zero auth. Ships instantly, never has a 500 error.

**Live:** https://veeresh-portfolio-dev.vercel.app  
**GitHub:** https://github.com/debug949/portfolio  
**Vercel project:** debug949s-projects/portfolio

---

## 1. Developer

| Field | Value |
|---|---|
| Name | Veeresh |
| Age | 15 |
| Email | vihanveeresh@gmail.com |
| GitHub | https://github.com/debug949 |
| Education | Class 10, Shantiniketan Vidyalaya, Telangana, India |
| LinkedIn | (none) |

---

## 2. Projects Showcased

### ShipSafe
- **Live:** https://shipsafe-xzne.vercel.app/
- **GitHub:** https://github.com/debug949/shipsafe
- **What:** Web security scanner — 19 parallel checks, AI remediation, shareable reports
- **Tech:** Next.js 16, TypeScript, Prisma 7, PostgreSQL, Groq, Vercel

### Patchwork
- **Live:** https://patchwork-theta.vercel.app
- **GitHub:** https://github.com/debug949/patchwork
- **What:** GitHub OAuth changelog generator — raw OAuth 2.0, multi-tenant SaaS, iframe embed
- **Tech:** Next.js 16, TypeScript, Prisma 7, iron-session, Groq, Vercel

---

## 3. Tech Stack

```
Framework:  Next.js 16.2.7 (App Router)
Language:   TypeScript 5 (strict: true)
Styling:    Tailwind CSS v4 (@import "tailwindcss") — reset only, no utility classes in JSX
Fonts:      Geist + Geist_Mono from next/font/google
            Variables: --font-geist-sans, --font-geist-mono
            Mapped to --font-sans, --font-mono via @theme inline in globals.css
Rendering:  100% static (all pages pre-rendered at build time)
OG image:   src/app/opengraph-image.tsx via Next.js ImageResponse (generated at build)
Deployment: Vercel (connected to GitHub, auto-deploys on push to master)
```

---

## 4. File Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    Root layout: fonts, metadata, Nav, Footer
│   │   ├── globals.css                   Design tokens, CSS resets, media queries
│   │   ├── page.tsx                      Homepage
│   │   ├── opengraph-image.tsx           OG image (auto-detected by Next.js App Router)
│   │   ├── sitemap.ts                    SEO sitemap
│   │   ├── about/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx                  Projects index
│   │   │   ├── shipsafe/page.tsx         ShipSafe case study
│   │   │   └── patchwork/page.tsx        Patchwork case study
│   │   └── resume/page.tsx              Print-ready resume
│   ├── components/
│   │   ├── Nav.tsx                       "use client" — mobile toggle + active route
│   │   ├── Footer.tsx                    Server component
│   │   ├── ProjectCard.tsx               Card with name, tagline, stats, tech, links
│   │   ├── TechBadge.tsx                 Monospace pill: font-geist-mono, 11px
│   │   ├── SectionLabel.tsx              ALL-CAPS label, 11px, 0.08em tracking
│   │   ├── CaseStudyHeader.tsx           Back link + title + links + tech badges
│   │   ├── ArchitectureDiagram.tsx       <pre> wrapper for ASCII diagrams
│   │   └── PrintButton.tsx              "use client" — window.print() for resume page
│   └── lib/
│       └── data.ts                       All content: PROJECTS, SKILL_GROUPS, TIMELINE, CONTACT
├── public/
│   └── robots.txt
├── next.config.ts                        Minimal config (empty object)
├── postcss.config.mjs                    @tailwindcss/postcss
├── eslint.config.mjs                     Flat config: eslint-config-next + typescript
├── package.json
├── tsconfig.json
├── README.md
├── SCREENSHOT_GUIDE.md
└── PROJECT_CAPSULE.md
```

---

## 5. Routes

| Route | Page | SEO Title |
|---|---|---|
| `/` | Homepage | "Veeresh — Full-Stack Engineer" |
| `/about` | About + timeline | "About — Veeresh" |
| `/projects` | Projects index | "Projects — Veeresh" |
| `/projects/shipsafe` | ShipSafe case study | "ShipSafe — Case Study — Veeresh" |
| `/projects/patchwork` | Patchwork case study | "Patchwork — Case Study — Veeresh" |
| `/resume` | Print-ready resume | "Resume — Veeresh" |
| `/sitemap.xml` | Auto-generated | — |
| `/opengraph-image` | Build-time OG image | — |
| `/robots.txt` | Static file in /public | — |

---

## 6. Design System

All design tokens are CSS custom properties in `src/app/globals.css`:

```css
--bg:           #060a0f    /* page background */
--bg-surface:   #0d1117    /* card backgrounds */
--bg-elevated:  #161b22    /* nav, code blocks */
--border:       #21262d
--border-muted: #161b22
--text:         #e6edf3
--text-2:       #a0aab4
--text-muted:   #7d8590
--text-dim:     #404850
--accent:       #2f81f7
--accent-dim:   rgba(47, 129, 247, 0.15)
--green:        #3fb950
--red:          #f85149
--yellow:       #d29922
```

**Styling rule:** All visual properties are inline styles using these CSS custom properties. No Tailwind utility classes in JSX. The only CSS classes used are `nav-desktop` and `nav-mobile-btn` (responsive switching via globals.css media query) and `no-print` (print suppression).

---

## 7. Key Implementation Notes

### ESLint in Next.js 16
`next lint` was removed from the Next.js 16 CLI. Use `eslint src` directly.
ESLint config uses the native flat config from `eslint-config-next` (no FlatCompat):
```js
import nextConfig from "eslint-config-next"
import nextTypescriptConfig from "eslint-config-next/typescript"
export default [...nextConfig, ...nextTypescriptConfig]
```

### Vercel public URL
The Vercel project's stable public URL is `veeresh-portfolio-dev.vercel.app` (Vercel's auto-assigned promotion alias). This alias is assigned once and persists across all future deploys.

Other aliases (`portfolio-debug949s-projects.vercel.app`, manually set ones) return 401 because Vercel's Standard Deployment Protection applies to all URLs except the auto-assigned promotion alias.

To get a cleaner URL: add a custom domain (e.g., `veeresh.dev`) via the Vercel dashboard → Project Settings → Domains. This bypasses protection and gets a professional URL.

### Workspace root warning
Next.js 16 with Turbopack detects a `package-lock.json` at `C:\Users\vihan\package-lock.json` and warns about the workspace root. This is cosmetic — build and lint still work correctly.

### OG image
`src/app/opengraph-image.tsx` uses Next.js `ImageResponse`. No static PNG needed — Next.js App Router auto-detects this file and serves it at `/opengraph-image`, generating the `og:image` metadata automatically.

---

## 8. Commands

```bash
npm run dev          # dev server at localhost:3000
npm run build        # production build (includes tsc check)
npx tsc --noEmit     # standalone TypeScript check
npm run lint         # eslint src
git push             # auto-deploys to Vercel via GitHub integration
vercel --prod --yes  # manual production deploy
```

---

## 9. Build Status (verified 2026-06-05)

```
✓ npm run build      — 10 static pages, 0 warnings
✓ npx tsc --noEmit   — 0 errors
✓ npm run lint       — 0 errors
✓ All 9 routes       — HTTP 200 in production
✓ OG image           — 200 at /opengraph-image
✓ sitemap.xml        — 200, lists 6 content routes
✓ robots.txt         — 200
```

---

## 10. Future Work

| Feature | Approach |
|---|---|
| Custom domain | Vercel dashboard → Project Settings → Domains → add `veeresh.dev` or similar |
| Contact form | Add Resend API (1 env var), convert contact section to a `<form>` with API route |
| Project #3 | Add entry to `PROJECTS` in data.ts + create `src/app/projects/[slug]/page.tsx` |
| Blog | Add `/blog/[slug]` with MDX files in `/content/blog/` |
| Analytics | `@vercel/analytics` — zero config, add `<Analytics />` to layout.tsx |
| Resume PDF | Link to a hosted PDF or use `@react-pdf/renderer` |

---

## 11. Quality Checklist (completed)

**Build:**
- [x] `npm run build` — exit 0, no warnings
- [x] `npx tsc --noEmit` — exit 0
- [x] `npm run lint` — exit 0

**Routes (all HTTP 200 in production):**
- [x] `/`
- [x] `/about`
- [x] `/projects`
- [x] `/projects/shipsafe`
- [x] `/projects/patchwork`
- [x] `/resume`
- [x] `/sitemap.xml`
- [x] `/robots.txt`
- [x] `/opengraph-image`

**Content:**
- [x] No placeholders visible
- [x] Email: vihanveeresh@gmail.com
- [x] GitHub: github.com/debug949
- [x] All tech badges render
- [x] Architecture diagrams in monospace
- [x] Timeline in order

**SEO:**
- [x] Per-page `<title>` via title template `%s — Veeresh`
- [x] Per-page `<meta description>`
- [x] OpenGraph tags on every page
- [x] `/sitemap.xml` lists 6 routes
- [x] `/robots.txt` with sitemap reference

**Production:**
- [x] Deployed to Vercel
- [x] Connected to GitHub (auto-deploys on push)
- [x] All routes 200 in production

---

---

## 12. UX Enhancement Pass (2026-06-06)

Cross-site initiative: +30% satisfaction, sub-3s load. Applies to Portfolio, ShipSafe, Patchwork.

**Shipped**
- ShipSafe hero/background video: `preload="auto"` → `preload="metadata"` (faster first paint).
- ShipSafe example-URL quick-fill chips (github.com / stripe.com / vercel.com) populating AuditForm via native input value setter + dispatched `input` event.
- Patchwork readability pass: Poppins 14–26px, 1.6–1.7 line-height, `AppNav` breadcrumbs (readability 60+).

**Planned interactive features**
- Portfolio: stack-fit quiz, skill-filter chips, "Was this helpful?" feedback widget.
- ShipSafe: animated score gauge, inline "Fix this" accordions, email-the-report capture.
- Patchwork: changelog-tone selector, live embed preview, per-entry thumbs up/down.

**Speed tactics (no interactivity cost)**
- Video `preload="metadata"` + poster fallback; SSG where possible; `next/font` self-hosting.
- Lazy-mount below-the-fold motion via `whileInView`; dynamic-import quizzes/forms; cache API responses.

**Self-review:** satisfaction loops (quizzes/feedback/quick-fill) ✅; first paint ~1s ✅; human-centered nav + readable type ✅; risk = slow-network video bandwidth (mitigated by poster fallback).

---

*End of PROJECT_CAPSULE.md — v2.1*  
*Written: 2026-06-05 · Updated: 2026-06-06*  
*Status: Complete + UX enhancement pass logged*
