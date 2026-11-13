"use client"

import type { CSSProperties } from "react"
import type { IconType } from "react-icons"

export type LogoLoopItem = {
  name: string
  href: string
  icon: IconType
}

type LogoLoopProps = {
  items: LogoLoopItem[]
  duration?: number
}

function LogoGroup({ items, duplicate = false }: { items: LogoLoopItem[]; duplicate?: boolean }) {
  return (
    <ul className="logo-loop__group" aria-hidden={duplicate || undefined}>
      {items.map(({ name, href, icon: Icon }) => (
        <li key={name} className="logo-loop__item">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Learn about ${name}`}
            tabIndex={duplicate ? -1 : undefined}
          >
            <Icon aria-hidden="true" className="logo-loop__icon" />
            <span>{name}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

/** A seamless, pause-on-hover technology marquee with a static reduced-motion layout. */
export function LogoLoop({ items, duration = 34 }: LogoLoopProps) {
  return (
    <div className="logo-loop" role="group" aria-label="Core technologies">
      <div className="logo-loop__track" style={{ "--logo-loop-duration": `${duration}s` } as CSSProperties}>
        <LogoGroup items={items} />
        <LogoGroup items={items} duplicate />
      </div>
    </div>
  )
}
