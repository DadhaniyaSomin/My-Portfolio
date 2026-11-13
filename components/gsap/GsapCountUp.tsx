"use client"

import { useEffect, useRef } from "react"
import { observeOnce } from "./observeOnce"

type GsapCountUpProps = {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}

function formatCount(value: number, prefix: string, suffix: string) {
  return `${prefix}${value.toLocaleString("en-US")}${suffix}`
}

/** Animates the visual number only; the complete metric remains available to assistive tech. */
export function GsapCountUp({ value, prefix = "", suffix = "", duration = 0.85 }: GsapCountUpProps) {
  const visualRef = useRef<HTMLSpanElement>(null)
  const finalText = formatCount(value, prefix, suffix)

  useEffect(() => {
    const element = visualRef.current
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let active = true
    let revertAnimation: (() => void) | undefined
    const stopObserving = observeOnce(element, async () => {
      try {
        const { gsap } = await import("gsap")
        if (!active || !element.isConnected || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const counter = { value: 0 }
        let lastRenderedValue = -1
        element.textContent = formatCount(0, prefix, suffix)

        const context = gsap.context(() => {
          gsap.to(counter, {
            value,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              const nextValue = Math.round(counter.value)
              if (nextValue === lastRenderedValue) return
              lastRenderedValue = nextValue
              element.textContent = formatCount(nextValue, prefix, suffix)
            },
            onComplete: () => {
              element.textContent = finalText
            },
          })
        }, element)
        revertAnimation = () => context.revert()
      } catch {
        if (active && element.isConnected) element.textContent = finalText
      }
    })

    return () => {
      active = false
      stopObserving()
      revertAnimation?.()
    }
  }, [duration, finalText, prefix, suffix, value])

  return (
    <span className="tabular-nums">
      <span ref={visualRef} aria-hidden="true">{finalText}</span>
      <span className="sr-only">{finalText}</span>
    </span>
  )
}
