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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-background/95 dark:bg-transparent backdrop-blur-xl border border-border/50 dark:border-white/10 rounded-2xl px-6 py-3 flex items-between  md:justify-center shadow-lg shadow-primary/5 relative">

          {/* Desktop Navigation - Centered PillNav */}
          <div className="hidden md:block">
            <PillNav
              items={navItems}
              activeHref={activeSection}
              hoverCircleBgColor="#ffffff"
              hoveredPillTextColor="#000000"
              ease="power2.out"
              initialLoadAnimation={true}
            />
          </div>

          {/* LinkedIn - Desktop */}
          <div className="hidden md:block absolute right-16">
            <a
              href="https://www.linkedin.com/in/dadhaniya-somin-3a4137121/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Somin on LinkedIn"
              className="group"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/60 hover:text-foreground hover:bg-primary/10 hover:scale-110 transition-all duration-200"
              >
                <Linkedin className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </a>
          </div>

          {/* Theme Toggle - Desktop */}
          <div className="hidden md:block absolute right-6">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden gap-1 flex-shrink-0">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-2 bg-background/90 backdrop-blur-xl border border-border rounded-2xl p-4 relative z-0"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-muted rounded-xl transition-colors font-medium text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
