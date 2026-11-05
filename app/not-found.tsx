"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route")
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5 text-black">
      <div className="border-2 border-black bg-white p-10 text-center shadow-[5px_5px_0_#00b8d4]">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan-800">Route / unavailable</p>
        <h1 className="mb-4 text-7xl font-extrabold tracking-tighter">404</h1>
        <p className="mb-6 font-mono text-sm text-neutral-600">The page you requested could not be found.</p>
        <Link href="/">
          <Button className="border-2 border-black bg-primary font-mono text-xs font-bold uppercase tracking-widest text-black">Return home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
