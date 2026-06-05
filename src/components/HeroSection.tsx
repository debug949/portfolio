"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import { LoadingScreen } from "./LoadingScreen"
import { CONTACT } from "@/lib/data"

const ROLES = ["engineer", "builder", "developer", "maker"]

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [showLoader, setShowLoader] = useState(false)
  const [loaderDone, setLoaderDone] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])

  useEffect(() => {
    setShowLoader(true)
    setRoleIndex(0)
  }, [])

  useEffect(() => {
    if (!loaderDone) return
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [loaderDone])

  const variants: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, delay: i * 0.12, ease: "easeOut" },
    }),
  }

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
          overflow: "hidden",
        }}
      >
        {/* ── Background: grid texture ── */}
        <div
          className="grid-texture"
          style={{ position: "absolute", inset: 0, opacity: 0.6 }}
        />

        {/* ── Background: gradient orbs ── */}
        <motion.div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(47,129,247,0.14) 0%, transparent 68%)",
            borderRadius: "50%",
            pointerEvents: "none",
            y: orb1Y,
            animation: "orb-1 10s ease-in-out infinite",
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-8%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 68%)",
            borderRadius: "50%",
            pointerEvents: "none",
            y: orb2Y,
            animation: "orb-2 14s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "40%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(47,129,247,0.06) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            animation: "orb-3 18s ease-in-out infinite",
          }}
        />

        {/* ── Content ── */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "760px",
            margin: "0 auto",
            padding: "100px 24px 80px",
            width: "100%",
            y: contentY,
          }}
        >
          {/* Eyebrow badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={loaderDone ? "visible" : "hidden"}
            variants={variants}
          >
            <span
              className="liquid-glass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                borderRadius: "9999px",
                padding: "6px 14px",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--green)",
                  boxShadow: "0 0 6px var(--green)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              Full-Stack Engineer · 15 · India
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate={loaderDone ? "visible" : "hidden"}
            variants={variants}
            style={{
              fontSize: "clamp(44px, 8vw, 80px)",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 24px",
            }}
          >
            I build{" "}
            <span
              className="display gradient-text"
              style={{ fontWeight: 400 }}
            >
              developer
            </span>
            <br />
            tools.
          </motion.h1>

          {/* Role cycling */}
          <motion.p
            custom={2}
            initial="hidden"
            animate={loaderDone ? "visible" : "hidden"}
            variants={variants}
            style={{
              fontSize: "16px",
              color: "var(--text-muted)",
              margin: "0 0 40px",
              lineHeight: 1.6,
            }}
          >
            A self-taught{" "}
            <span
              key={roleIndex}
              style={{
                color: "var(--text-2)",
                display: "inline-block",
                animation: "word-in 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {ROLES[roleIndex]}
            </span>{" "}
            who ships real products. Not tutorials. Not clones.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate={loaderDone ? "visible" : "hidden"}
            variants={variants}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}
          >
            <Link
              href="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "44px",
                padding: "0 24px",
                background: "linear-gradient(135deg, #2f81f7 0%, #8b5cf6 100%)",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(47, 129, 247, 0.3)",
                transition: "opacity 150ms, transform 150ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              View my work
            </Link>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "44px",
                padding: "0 24px",
                borderRadius: "9999px",
                fontSize: "14px",
                color: "var(--text-2)",
                textDecoration: "none",
                transition: "color 150ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
            >
              GitHub ↗
            </a>
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaderDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: "10px",
              color: "var(--text-dim)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "var(--border)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "var(--accent)",
                animation: "scroll-indicator 1.6s ease-in-out infinite",
              }}
            />
          </div>
        </motion.div>
      </section>
    </>
  )
}
