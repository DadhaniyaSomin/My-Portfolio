"use client"

import type { ReactNode } from "react"
import { useEffect, useRef } from "react"

type ParallaxHeroProps = {
  children: ReactNode
  className?: string
}

/** Defers ScrollTrigger until scroll intent, then moves only the hero profile card. */
export function ParallaxHero({ children, className = "" }: ParallaxHeroProps) {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const hero = frame?.closest<HTMLElement>("#home")
    const motionQuery = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)")
    if (!frame || !hero || !motionQuery.matches) return

    let active = true
    let revertAnimation: (() => void) | undefined

    const initializeParallax = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ])
        if (!active || !frame.isConnected || !motionQuery.matches) return

        gsap.registerPlugin(ScrollTrigger)
        const context = gsap.matchMedia()
        context.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
          gsap.to(frame, {
            y: 24,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
        })
        revertAnimation = () => context.revert()
      } catch {
        // The profile card remains in its normal position if the GSAP chunk cannot load.
      }
    }

    window.addEventListener("scroll", initializeParallax, { once: true, passive: true })
    return () => {
      active = false
      window.removeEventListener("scroll", initializeParallax)
      revertAnimation?.()
    }
  }, [])

  return <div ref={frameRef} className={className}>{children}</div>
}
