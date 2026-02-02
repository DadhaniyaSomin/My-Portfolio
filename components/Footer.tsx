"use client"

import { Github, Linkedin, Twitter, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("https://api.counterapi.dev/v1/tusharpankhaniya/visits/up")
        const data = await response.json()
        setVisitorCount(data.count)
      } catch (error) {
        console.error("Error fetching visitor count:", error)
      }
    }
    fetchCount()
  }, [])

  return (
    <footer className="border-t border-border bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground transition-colors duration-300">Tushar Pankhaniya</h3>
            <p className="text-muted-foreground leading-relaxed transition-colors duration-300">
              Mobile Application Developer passionate about creating beautiful, functional mobile and web experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/tushar-2223" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-foreground/5">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-foreground/5">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-foreground/5">
                  <Twitter className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Academic Projects", "Blog", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>


        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm">© 2026 Tushar Pankhaniya. All rights reserved.</p>
            <div className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground text-sm mt-4 md:mt-0">
              {visitorCount !== null && (
                <div className="flex items-center bg-foreground/5 dark:bg-white/5 backdrop-blur-md border border-border dark:border-white/10 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.05)] group hover:border-emerald-500/40 transition-all duration-500">
                  <div className="relative flex h-2 w-2 mr-3">
                    <motion.span
                      animate={{
                        scale: [1, 2.2, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                    />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                  </div>
                  <span className="text-foreground dark:text-white/90 font-medium tracking-tight whitespace-nowrap">
                    {visitorCount.toLocaleString()} <span className="text-muted-foreground dark:text-white/30 ml-1 font-normal text-xs uppercase tracking-widest">visitors</span>
                  </span>
                </div>
              )}
              <div className="flex items-center">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 mx-2 fill-current" />
                <span>and lots of coffee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
