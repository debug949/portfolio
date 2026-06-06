"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    // No custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    document.body.style.cursor = "none"

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId: number

    const DOT_R = 4   // half of 8px dot
    const RING_R = 18 // half of 36px ring

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onEnter = () => { hoverRef.current = true }
    const onLeave = () => { hoverRef.current = false }

    const attachListeners = () => {
      document.querySelectorAll<Element>("a, button, [role='button'], input, textarea, select, label")
        .forEach(el => {
          el.addEventListener("mouseenter", onEnter)
          el.addEventListener("mouseleave", onLeave)
        })
    }

    // Re-attach when DOM changes (navigations, dynamic content)
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    attachListeners()

    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      ringX = lerp(ringX, mouseX, 0.1)
      ringY = lerp(ringY, mouseY, 0.1)

      const isHover = hoverRef.current

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - DOT_R}px, ${mouseY - DOT_R}px) scale(${isHover ? 0 : 1})`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - RING_R}px, ${ringY - RING_R}px) scale(${isHover ? 1.6 : 1})`
        ringRef.current.style.opacity = isHover ? "0.45" : "1"
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
      document.body.style.cursor = ""
    }
  }, [])

  return (
    <>
      {/* Dot — snaps exactly to cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#fff",
          pointerEvents: "none",
          zIndex: 999999,
          willChange: "transform",
          mixBlendMode: "difference",
          transition: "transform 0.12s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.2s",
        }}
      />
      {/* Ring — trails behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.75)",
          pointerEvents: "none",
          zIndex: 999998,
          willChange: "transform",
          transition: "opacity 0.25s, transform 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)",
          mixBlendMode: "difference",
        }}
      />
    </>
  )
}
