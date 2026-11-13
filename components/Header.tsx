"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { Magnet } from "@/components/react-bits/Magnet"

const navItems = [
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#projects" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/#contact" },
]

type ScrollLockSnapshot = {
  scrollY: number
  htmlOverflow: string
  bodyOverflow: string
  bodyPaddingRight: string
}

export const Header = () => {
  const [open, setOpen] = useState(false)
  const [motionFallback, setMotionFallback] = useState(false)
  const isOpenRef = useRef(false)
  const closingRef = useRef(false)
  const fallbackRef = useRef(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const timelineRef = useRef<{ kill: () => void } | null>(null)
  const gsapModuleRef = useRef<Promise<typeof import("gsap")> | null>(null)
  const scrollLockRef = useRef<ScrollLockSnapshot | null>(null)
  const closeMenuRef = useRef<(returnFocus?: boolean, immediate?: boolean) => void>(() => {})

  const loadGsap = () => {
    if (!gsapModuleRef.current) {
      gsapModuleRef.current = import("gsap").catch((error) => {
        gsapModuleRef.current = null
        throw error
      })
    }
    return gsapModuleRef.current
  }

  const preloadGsap = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void loadGsap().catch(() => undefined)
    }
  }

  const lockPage = () => {
    if (scrollLockRef.current) return
    const bodyPaddingRight = document.body.style.paddingRight
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth
    scrollLockRef.current = {
      scrollY: window.scrollY,
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
      bodyPaddingRight,
    }

    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    if (scrollbarGap > 0) {
      const computedPadding = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0
      document.body.style.paddingRight = `${computedPadding + scrollbarGap}px`
    }
  }

  const restorePage = () => {
    const snapshot = scrollLockRef.current
    if (!snapshot) return

    document.documentElement.style.overflow = snapshot.htmlOverflow
    document.body.style.overflow = snapshot.bodyOverflow
    document.body.style.paddingRight = snapshot.bodyPaddingRight

    const scrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = "auto"
    window.scrollTo(0, snapshot.scrollY)
    document.documentElement.style.scrollBehavior = scrollBehavior
    scrollLockRef.current = null
  }

  const finishClose = (returnFocus: boolean) => {
    isOpenRef.current = false
    closingRef.current = false
    fallbackRef.current = false
    timelineRef.current = null
    const menu = menuRef.current
    menu?.style.removeProperty("visibility")
    menu?.style.removeProperty("clip-path")
    menu?.querySelectorAll<HTMLElement>(".mobile-menu-link, .mobile-menu-foot a").forEach((link) => {
      link.style.removeProperty("transform")
      link.style.removeProperty("opacity")
    })
    lineRefs.current.forEach((line) => {
      line?.style.removeProperty("transform")
      line?.style.removeProperty("opacity")
      line?.style.removeProperty("background-color")
    })
    setOpen(false)
    setMotionFallback(false)
    restorePage()
    if (returnFocus) {
      requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }))
    }
  }

  const openMenu = () => {
    if (isOpenRef.current) return
    isOpenRef.current = true
    closingRef.current = false
    lockPage()
    setOpen(true)

    const menu = menuRef.current
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) {
      fallbackRef.current = true
      setMotionFallback(true)
      if (menu) menu.style.clipPath = "inset(0% 0% 0% 0%)"
      requestAnimationFrame(() => menu?.querySelector<HTMLAnchorElement>(".mobile-menu-link")?.focus({ preventScroll: true }))
      return
    }

    void loadGsap().then(({ gsap }) => {
      if (!isOpenRef.current || !menu) return

      const lines = lineRefs.current.filter((line): line is HTMLSpanElement => line !== null)
      const links = Array.from(menu.querySelectorAll<HTMLAnchorElement>(".mobile-menu-link"))
      const footerLinks = Array.from(menu.querySelectorAll<HTMLAnchorElement>(".mobile-menu-foot a"))
      const primary = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "187 100% 42%"
      const accent = `hsl(${primary})`

      timelineRef.current?.kill()
      fallbackRef.current = false
      setMotionFallback(false)
      gsap.set(menu, { visibility: "visible", clipPath: "inset(0% 0% 100% 0%)" })
      gsap.set(lines, { rotation: 0, y: 0, scaleX: 1, opacity: 1, clearProps: "backgroundColor" })

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(menu, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5 }, 0)
        .to(lines[0], { y: 6, rotation: 45, backgroundColor: accent, duration: 0.32 }, 0.05)
        .to(lines[2], { y: -8, rotation: -45, backgroundColor: accent, duration: 0.32 }, 0.05)
        .to(lines[1], { scaleX: 0, opacity: 0, duration: 0.18 }, 0)
        .fromTo(links,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.42, stagger: 0.055, clearProps: "transform,opacity" },
          0.14,
        )
        .fromTo(footerLinks,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.04, clearProps: "transform,opacity" },
          0.33,
        )

      timelineRef.current = timeline
      requestAnimationFrame(() => {
        if (isOpenRef.current) links[0]?.focus({ preventScroll: true })
      })
    }).catch(() => {
      if (!isOpenRef.current || !menu) return
      fallbackRef.current = true
      setMotionFallback(true)
      menu.style.visibility = "visible"
      menu.style.clipPath = "inset(0% 0% 0% 0%)"
      requestAnimationFrame(() => menu.querySelector<HTMLAnchorElement>(".mobile-menu-link")?.focus({ preventScroll: true }))
    })
  }

  const closeMenu = (returnFocus = true, immediate = false) => {
    if (!isOpenRef.current) return

    if (immediate || fallbackRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timelineRef.current?.kill()
      finishClose(returnFocus)
      return
    }
    if (closingRef.current) return

    closingRef.current = true
    const menu = menuRef.current
    const modulePromise = gsapModuleRef.current
    if (!menu || !modulePromise) {
      finishClose(returnFocus)
      return
    }

    void modulePromise.then(({ gsap }) => {
      if (!isOpenRef.current) return
      const lines = lineRefs.current.filter((line): line is HTMLSpanElement => line !== null)
      const links = Array.from(menu.querySelectorAll<HTMLAnchorElement>(".mobile-menu-link"))
      const footerLinks = Array.from(menu.querySelectorAll<HTMLAnchorElement>(".mobile-menu-foot a"))
      const restInk = getComputedStyle(menuButtonRef.current!).color

      timelineRef.current?.kill()
      const timeline = gsap.timeline({
        defaults: { ease: "power3.in" },
        onComplete: () => finishClose(returnFocus),
      })
        .to(links, { y: 18, opacity: 0, duration: 0.2, stagger: 0.025 }, 0)
        .to(footerLinks, { opacity: 0, duration: 0.16 }, 0)
        .to(menu, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.4, ease: "power3.inOut" }, 0.08)
        .to([lines[0], lines[2]], { y: 0, rotation: 0, backgroundColor: restInk, duration: 0.28 }, 0.06)
        .to(lines[1], { scaleX: 1, opacity: 1, backgroundColor: restInk, duration: 0.24 }, 0.12)
        .set([lines[0], lines[1], lines[2]], { clearProps: "backgroundColor" })

      timelineRef.current = timeline
    }).catch(() => finishClose(returnFocus))
  }

  closeMenuRef.current = closeMenu

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpenRef.current) return
      if (event.key === "Escape") {
        event.preventDefault()
        closeMenuRef.current(true)
        return
      }
      if (event.key !== "Tab") return

      const menu = menuRef.current
      const toggle = menuButtonRef.current
      if (!menu || !toggle) return
      const focusables = [toggle, ...Array.from(menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      ))]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (!focusables.includes(document.activeElement as HTMLElement)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)")
    const closeOnDesktop = () => {
      if (desktop.matches) closeMenuRef.current(true, true)
    }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  useEffect(() => () => {
    timelineRef.current?.kill()
    restorePage()
  }, [])

  const handleMenuLinkClick = () => closeMenuRef.current(false, true)

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b-2 transition-colors ${open ? "border-transparent bg-transparent backdrop-blur-none" : "border-black bg-white/95 backdrop-blur-sm"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <div inert={open}>
            <Link href="/#home" className="font-mono text-sm font-bold uppercase tracking-tight">SD<span className="text-primary">.</span></Link>
          </div>
          <nav aria-label="Primary navigation" inert={open} className="hidden items-center gap-7 md:flex">
            {navItems.map((item, index) => <Link key={item.href} href={item.href} className="font-mono text-[11px] font-semibold uppercase tracking-[.12em] text-neutral-600 transition hover:text-cyan-700"><span className="mr-1 text-neutral-400">0{index + 1}</span>{item.label}</Link>)}
          </nav>
          <div inert={open} className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Magnet>
              <Link href="/#contact" className="border-2 border-black bg-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest shadow-[3px_3px_0_#0a0a0a] transition hover:-translate-y-0.5 hover:bg-cyan-100">Let’s talk ↗</Link>
            </Magnet>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <div inert={open} className={`transition-opacity ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}>
              <ThemeToggle />
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobileFullscreenMenu"
              data-motion-fallback={motionFallback ? "true" : undefined}
              className="mobile-menu-toggle"
              onPointerDown={preloadGsap}
              onFocus={preloadGsap}
              onClick={() => isOpenRef.current ? closeMenu() : openMenu()}
            >
              {(["top", "mid", "bot"] as const).map((line, index) => (
                <span
                  key={line}
                  ref={(element) => { lineRefs.current[index] = element }}
                  className="mobile-menu-toggle__line"
                  data-line={line}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      <nav
        id="mobileFullscreenMenu"
        ref={menuRef}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
        className={`mobile-menu-overlay md:hidden${open ? " is-open" : ""}`}
      >
        <div className="mobile-menu-overlay__content">
          <p className="mobile-menu-overlay__eyebrow">Navigation <span>/</span> Somin Dadhaniya</p>
          <ul className="mobile-menu-list">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <Link href={item.href} onClick={handleMenuLinkClick} className="mobile-menu-link">
                  <span className="mobile-menu-link__index">0{index + 1}</span>
                  <span>{item.label === "Work" ? "Selected work" : item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-foot">
            <span>Ahmedabad, India</span>
            <a href="https://github.com/somindadhaniya" target="_blank" rel="noopener noreferrer" onClick={handleMenuLinkClick}>GitHub ↗</a>
            <a href="https://www.linkedin.com/in/dadhaniya-somin-3a4137121/" target="_blank" rel="noopener noreferrer" onClick={handleMenuLinkClick}>LinkedIn ↗</a>
          </div>
        </div>
      </nav>
    </>
  )
}
