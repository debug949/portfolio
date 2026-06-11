"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LoadingScreen } from "./LoadingScreen"
import { CONTACT } from "@/lib/data"

const ROLES = ["engineer", "builder", "developer", "maker"]

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [showLoader, setShowLoader] = useState(false)
  const [loaderDone, setLoaderDone] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 600], [0, -80])

  useEffect(() => {
    setShowLoader(true)
  }, [])

  useEffect(() => {
    if (!loaderDone) return
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [loaderDone])

  return (
    <>
      {showLoader && !loaderDone && (
        <LoadingScreen onComplete={() => setLoaderDone(true)} />
      )}

      <section
        ref={ref}
        style={{
          position: "relative",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.6,
          }}
        />

        {/* Content — motion.div for parallax scroll */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "800px",
            width: "100%",
            padding: "0 24px",
            y: parallaxY,
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={loaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            style={{ marginBottom: 40 }}
          >
            <span
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              Collection &apos;26
            </span>
          </motion.div>

          {/* Main name — elvana.in style: huge display type */}
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
            animate={loaderDone ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(72px, 14vw, 140px)",
              color: "var(--text)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              margin: "0 0 32px",
            }}
          >
            Veeresh
          </motion.h1>

          {/* Role cycling line */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={loaderDone ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "var(--text-2)",
              margin: "0 0 16px",
              lineHeight: 1.4,
            }}
          >
            A{" "}
            <span
              key={roleIndex}
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontStyle: "italic",
                color: "var(--text)",
                display: "inline-block",
                animation: "word-in 0.4s ease-out",
              }}
            >
              {ROLES[roleIndex]}
            </span>{" "}
            from Telangana, India.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={loaderDone ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            style={{
              fontSize: 14,
              color: "var(--text-muted)",
              maxWidth: 420,
              lineHeight: 1.7,
              margin: "0 auto 44px",
            }}
          >
            Building developer tools that solve real problems.
            ShipSafe, Patchwork, and Verdict are live in production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={loaderDone ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
            style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
          >
            <Link
              href="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 44,
                padding: "0 28px",
                background: "var(--text)",
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 500,
                color: "var(--bg)",
                textDecoration: "none",
                transition: "opacity 150ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
            >
              See Works
            </Link>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 44,
                padding: "0 28px",
                background: "transparent",
                border: "2px solid var(--border)",
                borderRadius: 9999,
                fontSize: 13,
                color: "var(--text)",
                textDecoration: "none",
                transition: "border-color 150ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--text-muted)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)" }}
            >
              Reach out ↗
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaderDone ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 40, background: "var(--border)", position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "40%",
                background: "var(--text-muted)",
                animation: "scroll-indicator 1.6s ease-in-out infinite",
              }}
            />
          </div>
        </motion.div>
      </section>
    </>
  )
}
