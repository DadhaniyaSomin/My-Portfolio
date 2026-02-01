"use client"

import { cn } from "@/lib/utils"

export function AnimatedDotBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated dot background */}
      <div
        className={cn(
          "absolute inset-0 animate-dots-move",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(hsl(var(--foreground)/0.2)_1px,transparent_1.5px)]",
        )}
      />

      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>

      {/* Top blur fade */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent"></div>

      {/* Bottom blur fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
    </div>
  )
}
