export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  stats: string[]
  tech: string[]
  liveUrl: string
  githubUrl: string
  caseStudyPath: string
}

export const PROJECTS: Project[] = [
  {
    slug: "shipsafe",
    name: "ShipSafe",
    tagline: "Web security scanner with AI-powered remediation",
    description:
      "Paste a URL. Get a scored security report with prioritized fixes in 20 seconds.",
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
    description:
      "Connect a GitHub repo. Generate a categorized changelog from commit history with one click.",
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
  {
    label: "Auth & Security",
    skills: ["OAuth 2.0", "iron-session", "CSRF", "Security headers"],
  },
  { label: "AI", skills: ["Groq", "LLM integration", "Prompt engineering"] },
  { label: "Infrastructure", skills: ["Vercel", "GitHub Actions", "CI/CD"] },
]

export interface TimelineItem {
  period: string
  title: string
  description: string
}

export const TIMELINE: TimelineItem[] = [
  {
    period: "2024",
    title: "Started programming",
    description:
      "Self-taught via documentation. First scripts and web experiments.",
  },
  {
    period: "2025",
    title: "First full-stack projects",
    description:
      "Learned Next.js, PostgreSQL, TypeScript. Started understanding production concerns.",
  },
  {
    period: "Jun 2026",
    title: "Shipped ShipSafe",
    description:
      "Web security audit tool: 19 parallel checks, model-agnostic AI, graceful degradation.",
  },
  {
    period: "Jun 2026",
    title: "Shipped Patchwork",
    description:
      "GitHub OAuth changelog SaaS: raw OAuth 2.0, multi-tenant architecture, embeddable widget.",
  },
  {
    period: "Now",
    title: "Class 10, Shantiniketan Vidyalaya",
    description:
      "Applying for internships and US university programs. Building the next project.",
  },
]

export const CONTACT = {
  email: "vihanveeresh@gmail.com",
  github: "https://github.com/debug949",
  linkedin: "",
}

export const PORTFOLIO_URL = "https://portfolio-six-kohl-89.vercel.app"
export const PORTFOLIO_NAME = "Veeresh"
