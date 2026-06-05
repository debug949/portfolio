"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const linkStyle = (href: string) => ({
    fontSize: "14px",
    color: pathname === href ? "var(--text)" : "var(--text-muted)",
    textDecoration: "none",
    transition: "color 150ms",
  })

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "56px",
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            width: "100%",
            height: "100%",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 700,
              fontSize: "15px",
              color: "var(--text)",
              textDecoration: "none",
            }}
          >
            Veeresh
          </Link>

          {/* Desktop links */}
          <div
            className="nav-desktop"
            style={{ display: "flex", gap: "32px", alignItems: "center" }}
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} style={linkStyle(link.href)}>
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:vihanveeresh@gmail.com"
              style={{
                fontSize: "14px",
                color: "var(--accent)",
                textDecoration: "none",
                transition: "opacity 150ms",
              }}
            >
              Contact ↗
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="nav-mobile-btn"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              color: "var(--text)",
              cursor: "pointer",
              fontSize: "18px",
              padding: "8px",
              lineHeight: 1,
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            zIndex: 99,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: "16px",
                color: pathname === link.href ? "var(--text)" : "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:vihanveeresh@gmail.com"
            onClick={() => setOpen(false)}
            style={{
              fontSize: "16px",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            Contact
          </a>
        </div>
      )}
    </>
  )
}
