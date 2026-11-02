"use client"

import Link from "next/link"

import { NAV_LINKS } from "@/lib/navigation"
import { cn } from "@/lib/utils"

type PrimaryNavProps = {
  variant?: "desktop" | "mobile"
  className?: string
  onNavigate?: () => void
}

export function PrimaryNav({
  variant = "desktop",
  className,
  onNavigate,
}: PrimaryNavProps) {
  const isMobile = variant === "mobile"

  return (
    <nav
      aria-label={isMobile ? "Mobile navigation" : "Main navigation"}
      className={cn(
        isMobile ? "flex flex-col gap-1" : "flex items-center gap-5",
        className
      )}
    >
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={cn(
            "rounded-lg font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
            isMobile
              ? "px-3 py-2.5 text-base hover:bg-muted"
              : "px-2 py-2 text-sm"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
