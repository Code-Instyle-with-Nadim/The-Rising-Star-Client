"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"

const slides = [
  {
    src: "/assets/hero-1.jpg",
    alt: "Sunlit creative studio with glass walls and a lounge",
    title: "Built around your craft",
    description: "Spaces that spark ideas.",
  },
  {
    src: "/assets/hero-2.jpg",
    alt: "Open-plan studio with desks and plenty of natural light",
    title: "Room for your next idea",
    description: "Flexible studios, ready when you are.",
  },
  {
    src: "/assets/hero-3.jpg",
    alt: "Warm lounge and meeting space for creative teams",
    title: "Made for the way you work",
    description: "Quiet corners and room to collaborate.",
  },
]

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  return (
    <div>
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-muted">
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-[16rem] translate-y-3/4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-2xl sm:-left-6 sm:w-[17rem]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 shrink-0 rounded-full bg-brand" />
                <p className="text-sm font-semibold">{slide.title}</p>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {slide.description}
              </p>
            </div>
            <ArrowUpRight className="mt-0.5 size-4 shrink-0" />
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-end gap-3 text-sm font-semibold text-muted-foreground lg:mt-8">
        <button
          type="button"
          onClick={() =>
            setIndex((current) => (current - 1 + slides.length) % slides.length)
          }
          aria-label="Previous space"
          className="grid size-8 place-items-center rounded-full border border-border transition hover:border-foreground/40 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </button>

        <span aria-live="polite" className="min-w-14 text-center tabular-nums">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={() => setIndex((current) => (current + 1) % slides.length)}
          aria-label="Next space"
          className="grid size-8 place-items-center rounded-full border border-border transition hover:border-foreground/40 hover:text-foreground"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
