"use client"

import { motion } from "framer-motion"
import { ReactNode, CSSProperties } from "react"

interface Props {
  children: ReactNode
  style?: CSSProperties
  delay?: number
  className?: string
}

export function AnimatedSection({ children, style, delay = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.85,
        delay,
        ease: "easeOut",
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}
