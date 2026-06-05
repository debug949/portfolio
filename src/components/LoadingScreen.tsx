"use client"

import { useEffect, useState } from "react"

const WORDS = ["Build", "Ship", "Create", "Launch"]

interface Props {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const DURATION = 2600

    let raf: number
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
      const current = Math.floor(eased * 100)
      setCount(current)

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setFading(true)
          setTimeout(onComplete, 550)
        }, 300)
      }
    }

    raf = requestAnimationFrame(tick)

    const wordInterval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length)
    }, 650)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(wordInterval)
    }
  }, [onComplete])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        padding: "28px 32px",
        transition: "opacity 550ms cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Top-left label */}
      <div
        style={{
          fontSize: "11px",
          color: "var(--text-muted)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        Portfolio
      </div>

      {/* Center word */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          key={wordIndex}
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
            fontSize: "clamp(52px, 9vw, 96px)",
            color: "rgba(230, 237, 243, 0.7)",
            animation: "word-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "block",
          }}
        >
          {WORDS[wordIndex]}
        </span>
      </div>

      {/* Bottom */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Progress bar */}
        <div
          style={{
            height: "2px",
            background: "var(--border)",
            borderRadius: "9999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #2f81f7 0%, #8b5cf6 100%)",
              width: `${count}%`,
              boxShadow: "0 0 10px rgba(47, 129, 247, 0.4)",
              transition: "width 40ms linear",
            }}
          />
        </div>

        {/* Counter */}
        <div
          style={{
            textAlign: "right",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "clamp(64px, 12vw, 120px)",
            fontWeight: 600,
            color: "var(--text)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {String(count).padStart(3, "0")}
        </div>
      </div>
    </div>
  )
}
