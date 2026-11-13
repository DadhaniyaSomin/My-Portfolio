"use client"

import type { ReactNode, PointerEvent as ReactPointerEvent } from "react"
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type MagnetProps = {
  children: ReactNode
  className?: string
  strength?: number
  maxDisplacement?: number
}

/** A subtle pointer attraction, enabled only for fine pointers and motion-friendly users. */
export function Magnet({ children, className = "", strength = 0.14, maxDisplacement = 7 }: MagnetProps) {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 190, damping: 22, mass: 0.18 })
  const springY = useSpring(y, { stiffness: 190, damping: 22, mass: 0.18 })

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateEnabled = () => setEnabled(finePointer.matches && !reducedMotion.matches)
    updateEnabled()
    finePointer.addEventListener("change", updateEnabled)
    reducedMotion.addEventListener("change", updateEnabled)
    return () => {
      finePointer.removeEventListener("change", updateEnabled)
      reducedMotion.removeEventListener("change", updateEnabled)
    }
  }, [])

  const handlePointerMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (!enabled || event.pointerType !== "mouse") return
    const bounds = event.currentTarget.getBoundingClientRect()
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) * strength
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) * strength
    x.set(Math.max(-maxDisplacement, Math.min(maxDisplacement, offsetX)))
    y.set(Math.max(-maxDisplacement, Math.min(maxDisplacement, offsetY)))
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      className={`magnet-target ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  )
}
