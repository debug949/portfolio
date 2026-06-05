"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* ── Main Nav Bar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "56px",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          transition: "background 300ms ease, border-color 300ms ease",
          background: scrolled
            ? "rgba(6, 10, 15, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2f81f7 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontFamily: "var(--font-instrument-serif)",
                fontStyle: "italic",
                color: "#fff",
                fontWeight: 400,
                flexShrink: 0,
              }}
            >
              V
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontWeight: 700,
                fontSize: "14px",
                color: "var(--text)",
              }}
            >
              Veeresh
            </span>
          </Link>

          {/* Desktop nav pill */}
          <div
            className="nav-desktop liquid-glass"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              borderRadius: "9999px",
              padding: "5px 6px",
            }}
          >
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "13px",
                    color: active ? "var(--text)" : "var(--text-muted)",
                    textDecoration: "none",
                    padding: "5px 14px",
                    borderRadius: "9999px",
                    background: active
                      ? "rgba(255,255,255,0.07)"
                      : "transparent",
                    transition: "color 150ms, background 150ms",
                    fontWeight: active ? 500 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text)"
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Contact CTA */}
          <a
            href="mailto:vihanveeresh@gmail.com"
            className="nav-desktop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: "32px",
              padding: "0 16px",
              background: "linear-gradient(135deg, #2f81f7 0%, #8b5cf6 100%)",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(47,129,247,0.25)",
              transition: "opacity 150ms",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
          >
            Contact ↗
          </a>

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

      {/* ── Mobile menu ── */}
      {open && (
        <div
          className="liquid-glass"
          style={{
            position: "fixed",
            top: "56px",
            left: "12px",
            right: "12px",
            borderRadius: "16px",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            zIndex: 99,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: "15px",
                color: pathname === link.href ? "var(--text)" : "var(--text-muted)",
                textDecoration: "none",
                padding: "10px 12px",
                borderRadius: "10px",
                background:
                  pathname === link.href ? "rgba(255,255,255,0.05)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:vihanveeresh@gmail.com"
            onClick={() => setOpen(false)}
            style={{
              fontSize: "15px",
              color: "var(--accent)",
              textDecoration: "none",
              padding: "10px 12px",
            }}
          >
            Contact ↗
          </a>
        </div>
      )}
    </>
  )
}
