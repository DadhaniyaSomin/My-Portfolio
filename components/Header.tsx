"use client"

import { useState, useEffect } from "react"
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "./ThemeToggle"
import PillNav from "./PillNav"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Track active section based on scroll position
      const sections = ['about', 'experience', 'tech', 'blog']
      const scrollPosition = window.scrollY + 100 // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`/#${section}`)
            return
          }
        }
      }

      // If at top of page, set to home
      if (window.scrollY < 100) {
        setActiveSection('')
      }
    }

    handleScroll() // Call once on mount
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Tech Stack", href: "/#tech" },
    { label: "Blogs", href: "/blog" },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${isScrolled
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
    >
      <div
        className="container mx-auto max-w-6xl px-4 pt-[max(env(safe-area-inset-top),16px)]"
      >
        <div className="relative flex items-center justify-between rounded-2xl border border-border/50 bg-background/95 px-6 py-3 backdrop-blur-xl shadow-lg shadow-primary/5 dark:border-white/10 dark:bg-background/70">

          {/* Desktop Navigation */}
          <div className="hidden flex-1 justify-center md:flex">
            <PillNav
              items={navItems}
              activeHref={activeSection}
              hoverCircleBgColor="#ffffff"
              hoveredPillTextColor="#000000"
              ease="power2.out"
              initialLoadAnimation
            />
          </div>

          {/* Desktop Right */}
          <div className="hidden items-center gap-2 md:flex absolute right-6">
            <a
              href="https://www.linkedin.com/in/dadhaniya-somin-3a4137121/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:scale-110"
              >
                <Linkedin className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </a>

            <ThemeToggle />
          </div>

          {/* Mobile Right */}
          <div className="ml-auto flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
