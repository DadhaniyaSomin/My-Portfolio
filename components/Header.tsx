"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

const navItems = [
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/#contact" },
]

export const Header = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-black bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/#home" className="font-mono text-sm font-bold uppercase tracking-tight">SD<span className="text-primary">.</span></Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item, index) => <Link key={item.href} href={item.href} className="font-mono text-[11px] font-semibold uppercase tracking-[.12em] text-neutral-600 transition hover:text-cyan-700"><span className="mr-1 text-neutral-400">0{index + 1}</span>{item.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/#contact" className="border-2 border-black bg-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest shadow-[3px_3px_0_#0a0a0a] transition hover:-translate-y-0.5 hover:bg-cyan-100">Let’s talk ↗</Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)} className="border-2 border-black bg-white p-2 text-foreground dark:bg-card">{open ? <X size={18}/> : <Menu size={18}/>}</button>
        </div>
      </div>
      {open && <nav className="border-t border-neutral-200 bg-white px-5 py-4 md:hidden">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-neutral-100 py-3 font-mono text-xs font-semibold uppercase tracking-widest">{item.label}</Link>)}</nav>}
    </header>
  )
}
