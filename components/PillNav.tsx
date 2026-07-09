"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import './PillNav.css'

export interface PillNavItem {
  label: string
  href: string
  ariaLabel?: string
}

export interface PillNavProps {
  items: PillNavItem[]
  activeHref?: string
  className?: string
  ease?: string
  containerBgColor?: string
  pillColor?: string
  hoverCircleBgColor?: string
  pillTextColor?: string
  hoveredPillTextColor?: string
  initialLoadAnimation?: boolean
}

const isExternalLink = (href: string) =>
  href.startsWith('http://') ||
  href.startsWith('https://') ||
  href.startsWith('//') ||
  href.startsWith('mailto:') ||
  href.startsWith('tel:') ||
  href.startsWith('#')

const PillLink = ({
  href,
  className,
  ariaLabel,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  href: string
  className?: string
  ariaLabel?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  children: React.ReactNode
}) => {
  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        role="menuitem"
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menuitem"
    >
      {children}
    </Link>
  )
}

const PillNav = ({
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  containerBgColor = 'transparent',
  pillColor = 'transparent',
  hoverCircleBgColor = '#CCFF00',
  pillTextColor,
  hoveredPillTextColor = '#000000',
  initialLoadAnimation = true,
}: PillNavProps) => {
  const resolvedPillTextColor = pillTextColor ?? 'currentColor'

  // Refs for main nav items
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([])
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([])
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([])
  const navItemsRef = useRef<HTMLDivElement>(null)

  const setupPills = (
    refs: React.MutableRefObject<(HTMLSpanElement | null)[]>,
    timelines: React.MutableRefObject<(gsap.core.Timeline | null)[]>,
    count: number
  ) => {
    refs.current.slice(0, count).forEach((circle, index) => {
      if (!circle?.parentElement) return

      const pill = circle.parentElement
      const rect = pill.getBoundingClientRect()
      const { width: w, height: h } = rect
      const R = ((w * w) / 4 + h * h) / (2 * h)
      const D = Math.ceil(2 * R) + 2
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
      const originY = D - delta

      circle.style.width = `${D}px`
      circle.style.height = `${D}px`
      circle.style.bottom = `-${delta}px`

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      })

      const label = pill.querySelector('.pill-label')
      const white = pill.querySelector('.pill-label-hover')

      if (label) gsap.set(label, { y: 0 })
      if (white) gsap.set(white, { y: h + 12, opacity: 0 })

      timelines.current[index]?.kill()
      const tl = gsap.timeline({ paused: true })

      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0)

      if (label) {
        tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0)
      }

      if (white) {
        gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 })
        tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0)
      }

      timelines.current[index] = tl
    })
  }

  useEffect(() => {
    const layout = () => {
      setupPills(circleRefs, tlRefs, items.length)
    }

    layout()

    const onResize = () => layout()
    window.addEventListener('resize', onResize)

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {})
    }

    if (initialLoadAnimation && navItemsRef.current) {
      gsap.set(navItemsRef.current, { opacity: 0, y: -10 })
      gsap.to(navItemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease,
      })
    }

    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, ease, initialLoadAnimation])

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    })
  }

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto',
    })
  }

  const cssVars = {
    ['--nav-bg']: containerBgColor,
    ['--pill-bg']: pillColor,
    ['--hover-circle-bg']: hoverCircleBgColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
  } as React.CSSProperties

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        <div className="pill-nav-items" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                <PillLink
                  href={item.href}
                  className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                  ariaLabel={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </PillLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default PillNav
