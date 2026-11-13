"use client"

import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { observeOnce } from "./observeOnce"

type GsapRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

/** One-time, near-viewport reveal. Content stays visible if animation is unavailable. */
export function GsapReveal({ children, className = "", delay = 0 }: GsapRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let active = true
    let revertAnimation: (() => void) | undefined
    const stopObserving = observeOnce(element, async () => {
      try {
        const { gsap } = await import("gsap")
        if (!active || !element.isConnected || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const context = gsap.context(() => {
          gsap.fromTo(element,
            { autoAlpha: 0.94, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.48,
              delay,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
            },
          )
        }, element)
        revertAnimation = () => context.revert()
      } catch {
        // The page content remains visible if the animation chunk cannot load.
      }
    })

    return () => {
      active = false
      stopObserving()
      revertAnimation?.()
    }
  }, [delay])

  return <div ref={elementRef} className={className}>{children}</div>
}
