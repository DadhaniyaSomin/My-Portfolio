"use client"

import type { ReactNode } from "react"
import { useEffect, useRef } from "react"

type SpotlightCardProps = {
  children: ReactNode
  className?: string
}

/** Pointer-following accent light kept within a card's visual surface. */
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!finePointer.matches || reducedMotion.matches) return

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      const bounds = card.getBoundingClientRect()
      card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`)
      card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`)
      card.dataset.spotlightActive = "true"
    }
    const handlePointerLeave = () => {
      card.dataset.spotlightActive = "false"
    }

    card.addEventListener("pointermove", handlePointerMove)
    card.addEventListener("pointerleave", handlePointerLeave)
    return () => {
      card.removeEventListener("pointermove", handlePointerMove)
      card.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return (
    <div ref={cardRef} className={`spotlight-card ${className}`} data-spotlight-active="false">
      {children}
    </div>
  )
}
