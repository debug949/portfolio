# Screenshot Guide

Screenshots to take for the portfolio, internship applications, and GitHub README.

Use **1280×800** browser window for all desktop screenshots. Use **390×844** (iPhone 14) for mobile.

---

## Required screenshots

### 1. Homepage — hero + projects (`/`)

**What to capture:** Full homepage from top — the hero headline, CTAs, and both project cards visible.

**Settings:**
- Window: 1280×800
- Zoom: 100%
- Nav must be visible at top

**Filename:** `screenshot-home.png`

---

### 2. ShipSafe case study (`/projects/shipsafe`)

**What to capture:** The full case study header (title, tagline, links, tech badges) and the architecture diagram visible.

**Settings:**
- Window: 1280×800
- Scroll to show the architecture diagram box

**Filename:** `screenshot-shipsafe.png`

---

### 3. Patchwork case study (`/projects/patchwork`)

**What to capture:** Case study header + the OAuth step-by-step code block visible.

**Settings:**
- Window: 1280×800

**Filename:** `screenshot-patchwork.png`

---

### 4. Resume page (`/resume`)

**What to capture:** Full resume — header, skills, both project entries, education.

**Settings:**
- Window: 1280×800
- Scroll to show all content (or use full-page screenshot tool)

**Filename:** `screenshot-resume.png`

---

### 5. Mobile homepage

**What to capture:** Homepage on mobile viewport — hero text and first project card.

**Settings:**
- Window: 390px wide (Chrome DevTools mobile emulation)
- iPhone 14 preset

**Filename:** `screenshot-mobile.png`

---

### 6. Mobile nav open

**What to capture:** Mobile nav with the hamburger menu open, showing all links.

**Settings:**
- Same mobile viewport
- Click the ☰ button first

**Filename:** `screenshot-mobile-nav.png`

---

## How to take full-page screenshots in Chrome

1. Open DevTools (F12)
2. Press `Ctrl+Shift+P`
3. Type "screenshot"
4. Choose **"Capture full size screenshot"**

This captures the entire page, not just the visible viewport.

---

## Where to use the screenshots

| Screenshot | Use |
|---|---|
| `screenshot-home.png` | GitHub README, portfolio README, LinkedIn featured |
| `screenshot-shipsafe.png` | ShipSafe GitHub README |
| `screenshot-patchwork.png` | Patchwork GitHub README |
| `screenshot-resume.png` | Email attachments, application portals |
| `screenshot-mobile.png` | Show responsive design in applications |

---

## OG image

The OpenGraph image is auto-generated at `/opengraph-image` by Next.js at build time. No action needed — it appears automatically when the portfolio URL is shared on Twitter/LinkedIn/Discord.

To preview it: visit `https://veeresh-portfolio-site.vercel.app/opengraph-image` in the browser.
