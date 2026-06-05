# Veeresh — Developer Portfolio

Personal portfolio showcasing two production SaaS tools built in 2026.

**Live:** https://veeresh-portfolio.vercel.app  
**GitHub profile:** https://github.com/debug949

---

## Projects

### ShipSafe
Web security audit tool. Paste a URL → 19 parallel HTTP checks via `Promise.all` → composite 0–100 score + A–F grade → AI-generated prioritized fix list → shareable report link backed by PostgreSQL.

[Live](https://shipsafe-xzne.vercel.app/) · [GitHub](https://github.com/debug949/shipsafe) · [Case study](https://veeresh-portfolio.vercel.app/projects/shipsafe)

### Patchwork
GitHub OAuth changelog generator. Sign in with GitHub → connect a repo → one click generates a categorized changelog from commit history → public URL + embeddable `<iframe>` widget.

[Live](https://patchwork-theta.vercel.app) · [GitHub](https://github.com/debug949/patchwork) · [Case study](https://veeresh-portfolio.vercel.app/projects/patchwork)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.7 (App Router) |
| Language | TypeScript 5 (`strict: true`) |
| Styling | Tailwind CSS v4 (reset only) + inline styles in JSX |
| Font | Geist + Geist Mono via `next/font/google` |
| Rendering | 100% static — all pages pre-rendered at build time |
| Deployment | Vercel |

---

## Routes

| Route | Description |
|---|---|
| `/` | Homepage: hero, projects, skills, about teaser, contact |
| `/about` | Full story, timeline, what I'm looking for |
| `/projects` | Projects index |
| `/projects/shipsafe` | ShipSafe case study |
| `/projects/patchwork` | Patchwork case study |
| `/resume` | Print-ready HTML resume |
| `/sitemap.xml` | SEO sitemap (auto-generated) |
| `/opengraph-image` | OG image (generated at build via Next.js ImageResponse) |

---

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

No environment variables needed — this is a fully static site.

---

## Build & QA

```bash
npm run build      # Production build + TypeScript check (built-in)
npx tsc --noEmit   # Standalone TypeScript strict check
npm run lint       # ESLint
```

---

## Deployment

Import the repository on [Vercel](https://vercel.com). Framework is auto-detected as Next.js. Zero environment variables to configure.

```bash
vercel --prod      # CLI deploy
```

---

## Content updates

All content lives in [`src/lib/data.ts`](src/lib/data.ts). To update anything:

- **Contact / links** → edit `CONTACT` and `PORTFOLIO_URL`
- **Add a project** → add an entry to `PROJECTS`, create `src/app/projects/[slug]/page.tsx`
- **Skills** → edit `SKILL_GROUPS`
- **Timeline** → edit `TIMELINE`

---

## Design decisions

- **Inline styles over Tailwind utility classes.** All visual properties use CSS custom properties defined in `globals.css`. Styles are explicit, co-located with structure, and match the pattern used in ShipSafe and Patchwork.
- **No external UI libraries.** No framer-motion, no shadcn, no Radix. Every visual element is hand-built.
- **No animations.** The content is the signal. Entrance animations on a developer portfolio indicate style over substance.
- **`data.ts` as the CMS.** For a 6-page static site, a CMS adds complexity without benefit. Content updates are a one-line change.
- **No `output: 'export'`.** Vercel handles static generation natively — the sitemap route and OG image generation both require the standard Next.js runtime.

---

## Contact

vihanveeresh@gmail.com · [github.com/debug949](https://github.com/debug949)
