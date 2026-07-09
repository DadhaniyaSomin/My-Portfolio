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
    <header className={`fixed top-3 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "top-1" : ""}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-background/60 dark:bg-slate-900/60 backdrop-blur-xl border border-border dark:border-white/10 rounded-xl px-5 py-2.5 flex items-center justify-between shadow-sm">

          <div className="flex items-center justify-between w-full relative">
            {/* Logo (Separate) */}
            <Link href="/" className="flex items-center">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <img
                  src="/logo-dark.webp"
                  srcSet="/logo-dark@1x.webp 1x, /logo-dark@2x.webp 2x, /logo-dark@3x.webp 3x, /logo-dark@4x.webp 4x"
                  alt="Somin Dadhaniya — Backend Software Engineer Portfolio"
                  className="logo-light w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/logo.webp"
                  srcSet="/logo@1x.webp 1x, /logo@2x.webp 2x, /logo@3x.webp 3x, /logo@4x.webp 4x"
                  alt="Somin Dadhaniya — Backend Software Engineer Portfolio"
                  className="logo-dark w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>

            {/* Desktop Navigation - Centered PillNav */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <PillNav
                items={navItems}
                activeHref={activeSection}
                hoverCircleBgColor="#CCFF00"
                hoveredPillTextColor="#000000"
                ease="power2.out"
                initialLoadAnimation={true}
              />
            </div>

            {/* Social Icons (Right Side - Desktop Only) */}
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="https://github.com/somindadhaniya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Somin's GitHub profile"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/70 hover:text-foreground hover:bg-muted"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/somin-dadhaniya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Somin on LinkedIn"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/70 hover:text-foreground hover:bg-muted"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a
                href="https://www.instagram.com/somin_dadhaniya/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Somin on Instagram"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/70 hover:text-foreground hover:bg-muted"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground flex-shrink-0 ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              className="md:hidden mt-2 bg-background/90 backdrop-blur-xl border border-border rounded-2xl p-4"
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
