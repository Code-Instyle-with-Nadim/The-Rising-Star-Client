"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

type StudioGalleryProps = {
  title: string
  images: string[]
}

const FALLBACK_IMAGE = "/assets/hero-1.jpg"

export function StudioGallery({ title, images }: StudioGalleryProps) {
  const gallery = Array.from(
    new Set(images.filter((image) => Boolean(image?.trim())))
  )

  if (gallery.length === 0) {
    gallery.push(FALLBACK_IMAGE)
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = gallery[activeIndex] ?? gallery[0]
  const hasMultipleImages = gallery.length > 1

  const showPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + gallery.length) % gallery.length
    )
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % gallery.length)
  }

  return (
    <div className="mt-8">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted sm:aspect-[16/7] lg:aspect-[2.35/1]">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${title} — image ${activeIndex + 1} of ${gallery.length}`}
          fill
          preload={activeIndex === 0}
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      {hasMultipleImages && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            {gallery.map((image, index) => {
              const isActive = activeIndex === index

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View image ${index + 1} of ${gallery.length}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative h-11 w-[4.25rem] overflow-hidden rounded-md border-2 transition sm:h-12 sm:w-20",
                    isActive
                      ? "border-foreground"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              )
            })}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous image"
              className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-foreground/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <ArrowLeft aria-hidden className="size-3.5" />
            </button>

            <p
              aria-live="polite"
              className="min-w-10 text-center text-[11px] tabular-nums text-muted-foreground"
            >
              {activeIndex + 1} / {gallery.length}
            </p>

            <button
              type="button"
              onClick={showNext}
              aria-label="Show next image"
              className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-foreground/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <ArrowRight aria-hidden className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
