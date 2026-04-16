"use client"

import { useState, useEffect } from "react"
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "./ThemeToggle"
import { useTheme } from "next-themes"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Track active section based on scroll position
      const sections = ['about', 'experience', 'tech', 'projects', 'blog']
      const scrollPosition = window.scrollY + 100 // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
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
    { name: "About", href: "/#about" },
    { name: "Experience", href: "/#experience" },
    { name: "Tech Stack", href: "/#tech" },
    { name: "Academic Projects", href: "/#projects" },
    { name: "Blogs", href: "/blog" },
  ]

  return (
    <header className={`fixed top-3 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "top-1" : ""}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-background/60 dark:bg-slate-900/60 backdrop-blur-xl border border-border dark:border-white/10 rounded-xl px-5 py-2.5 flex items-center justify-between shadow-sm">

          <div className="flex items-center justify-between w-full relative">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <img
                  src="/logo-dark.webp"
                  srcSet="/logo-dark@1x.webp 1x, /logo-dark@2x.webp 2x, /logo-dark@3x.webp 3x, /logo-dark@4x.webp 4x"
                  alt="TP Logo"
                  className="logo-light w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/logo.webp"
                  srcSet="/logo@1x.webp 1x, /logo@2x.webp 2x, /logo@3x.webp 3x, /logo@4x.webp 4x"
                  alt="TP Logo"
                  className="logo-dark w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <nav className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace('/#', '') || (activeSection === '' && item.href === '/');

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative px-3.5 py-2 text-sm font-semibold transition-colors"
                      onMouseEnter={() => setHoveredPath(item.href)}
                      onMouseLeave={() => setHoveredPath(null)}
                    >
                      <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
                        }`}>
                        {item.name}
                      </span>

                      {/* Simple Bottom Border on Hover Only */}
                      {item.href === hoveredPath && (
                        <motion.div
                          className="absolute -bottom-[16px] left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8),0_0_5px_rgba(59,130,246,0.8)]"
                          layoutId="navbar-underline"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Social Icons (Right Side - Desktop Only) */}
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="https://github.com/tushar-2223"
                target="_blank"
                rel="noopener noreferrer"
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
                href="https://www.linkedin.com/in/tushar2223"
                target="_blank"
                rel="noopener noreferrer"
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
                href="https://www.instagram.com/tushar.p_22/"
                target="_blank"
                rel="noopener noreferrer"
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
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-muted rounded-xl transition-colors font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}
