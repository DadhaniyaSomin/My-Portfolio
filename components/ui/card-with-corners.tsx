"use client"

import React from "react"
import { cn } from "@/lib/utils"

const CardWithCorners = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative border border-border bg-muted/30 backdrop-blur-sm rounded-lg p-6", className)}
      {...props}
    >
      {/* Corner Icons */}
      <CornerIcon className="absolute h-6 w-6 -top-2 -left-2 md:-top-3 md:-left-3 text-foreground" />
      <CornerIcon className="absolute h-6 w-6 -bottom-2 -left-2 md:-bottom-3 md:-left-3 text-foreground" />
      <CornerIcon className="absolute h-6 w-6 -top-2 -right-2 md:-top-3 md:-right-3 text-foreground" />
      <CornerIcon className="absolute h-6 w-6 -bottom-2 -right-2 md:-bottom-3 md:-right-3 text-foreground" />

      {children}
    </div>
  ),
)
CardWithCorners.displayName = "CardWithCorners"

const CornerIcon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  )
}

export { CardWithCorners, CornerIcon }
