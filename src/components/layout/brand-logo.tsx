import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  priority?: boolean
  onClick?: () => void
}

export function BrandLogo({
  className,
  priority = false,
  onClick,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="The Rising Star — Home"
      className={cn(
        "group/brand -ml-3 flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <Image
        src="/assets/Icon-Photoroom.png"
        alt=""
        width={1536}
        height={1024}
        priority={priority}
        sizes="(max-width: 640px) 54px, (max-width: 1024px) 72px, 84px"
        className="h-9 w-auto transition-transform duration-200 group-hover/brand:scale-[1.03] sm:h-12 lg:h-14"
      />

      <span className="ml-1.5 flex min-w-0 flex-col sm:ml-2">
        <span className="font-serif text-base leading-none tracking-[-0.01em] whitespace-nowrap sm:text-xl lg:text-2xl">
          The Rising Star
        </span>
        <span className="mt-1.5 hidden text-[8px] font-semibold tracking-[0.26em] uppercase opacity-60 sm:block">
          Space for ideas
        </span>
      </span>
    </Link>
  )
}
