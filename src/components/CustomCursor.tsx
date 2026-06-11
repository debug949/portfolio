"use client"

import { useEffect, useRef } from "react"

const COLOR      = "#ffffff"
const COLOR_RGBA = "255,255,255"

const DOT_SIZE  = 6
const DOT_R     = DOT_SIZE  / 2
const RING_SIZE = 38
const RING_R    = RING_SIZE / 2
const LERP      = 0.13

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const burstRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef(false)
  const magnetEl = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return

    document.body.style.cursor = "none"

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onEnter = (e: MouseEvent) => {
      hoverRef.current = true
      magnetEl.current = e.currentTarget as HTMLElement
    }
    const onLeave = () => {
      hoverRef.current = false
      magnetEl.current = null
    }

    const onClick = (e: MouseEvent) => {
      if (!burstRef.current) return
      const b = burstRef.current
      b.style.transform = `translate(${e.clientX - RING_R}px, ${e.clientY - RING_R}px) scale(1)`
      b.style.opacity = "0.5"
      b.style.animation = "none"
      void b.offsetWidth
      b.style.animation = "cursor-burst 0.45s ease-out forwards"
    }

    const attachListeners = () => {
      document.querySelectorAll<Element>(
        "a, button, [role='button'], input, textarea, select, label"
      ).forEach(el => {
        el.addEventListener("mouseenter", onEnter as EventListener)
        el.addEventListener("mouseleave", onLeave)
      })
    }

    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    attachListeners()

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      let targetX = mouseX
      let targetY = mouseY

      if (hoverRef.current && magnetEl.current) {
        const rect = magnetEl.current.getBoundingClientRect()
        const cx = rect.left + rect.width  / 2
        const cy = rect.top  + rect.height / 2
        targetX = lerp(mouseX, cx, 0.28)
        targetY = lerp(mouseY, cy, 0.28)
      }

      ringX = lerp(ringX, targetX, LERP)
      ringY = lerp(ringY, targetY, LERP)

      const h = hoverRef.current

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouseX - DOT_R}px, ${mouseY - DOT_R}px) scale(${h ? 0 : 1})`
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringX - RING_R}px, ${ringY - RING_R}px) scale(${h ? 1.6 : 1})`
        ringRef.current.style.opacity     = h ? "0.55" : "1"
        ringRef.current.style.borderColor = h
          ? `rgba(${COLOR_RGBA},0.95)`
          : `rgba(${COLOR_RGBA},0.7)`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("click", onClick)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("click", onClick)
      cancelAnimationFrame(rafId)
      observer.disconnect()
      document.body.style.cursor = ""
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:     "fixed",
          top: 0, left: 0,
          width:        DOT_SIZE,
          height:       DOT_SIZE,
          borderRadius: "50%",
          background:   COLOR,
          mixBlendMode: "difference",
          pointerEvents:"none",
          zIndex:       999999,
          willChange:   "transform",
          transition:   "transform 0.1s cubic-bezier(0.25,0.1,0.25,1)",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:     "fixed",
          top: 0, left: 0,
          width:        RING_SIZE,
          height:       RING_SIZE,
          borderRadius: "50%",
          border:       `1.5px solid rgba(${COLOR_RGBA},0.7)`,
          mixBlendMode: "difference",
          pointerEvents:"none",
          zIndex:       999998,
          willChange:   "transform",
          transition:   "opacity 0.2s, border-color 0.15s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />
      <div
        ref={burstRef}
        aria-hidden="true"
        style={{
          position:     "fixed",
          top: 0, left: 0,
          width:        RING_SIZE,
          height:       RING_SIZE,
          borderRadius: "50%",
          border:       `1px solid rgba(${COLOR_RGBA},0.5)`,
          mixBlendMode: "difference",
          pointerEvents:"none",
          zIndex:       999997,
          willChange:   "transform",
          opacity:      0,
        }}
      />
    </>
  )
}
