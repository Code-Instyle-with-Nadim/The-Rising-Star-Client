"use client"

import { useMemo, useState } from "react"
import { ChevronDown, Compass, Search, SlidersHorizontal } from "lucide-react"

import type { StudioData } from "@/lib/AllTypes"
import { StudioCard } from "@/components/studios/studio-card"
import {
  ALL_CATEGORIES_LABEL,
  STUDIO_CATEGORIES,
} from "@/lib/studio-constants"
import { cn } from "@/lib/utils"

const CATEGORY_FILTERS = [ALL_CATEGORIES_LABEL, ...STUDIO_CATEGORIES]

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to high" },
  { value: "price-desc", label: "Price: High to low" },
  { value: "rating", label: "Top rated" },
] as const

type SortOption = (typeof SORT_OPTIONS)[number]["value"]

type AllStudioProps = {
  studios: StudioData[]
  initialCategory?: string
}

const AllStudio = ({
  studios,
  initialCategory = ALL_CATEGORIES_LABEL,
}: AllStudioProps) => {
  const startingCategory = CATEGORY_FILTERS.find(
    (category) => category === initialCategory
  )

  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState(
    startingCategory ?? ALL_CATEGORIES_LABEL
  )
  const [sort, setSort] = useState<SortOption>("recommended")

  const filteredStudios = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()

    const matches = studios.filter((studio) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORIES_LABEL ||
        studio.category === activeCategory

      if (!matchesCategory) {
        return false
      }

      if (!searchTerm) {
        return true
      }

      return [studio.title, studio.location, studio.category, studio.overview]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(searchTerm))
    })

    if (sort === "recommended") {
      return matches
    }

    return [...matches].sort((first, second) => {
      if (sort === "price-asc") {
        return first.hourlyRate - second.hourlyRate
      }

      if (sort === "price-desc") {
        return second.hourlyRate - first.hourlyRate
      }

      return (second.rating ?? 0) - (first.rating ?? 0)
    })
  }, [activeCategory, query, sort, studios])

  const activeSortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ??
    SORT_OPTIONS[0].label

  const resetFilters = () => {
    setQuery("")
    setActiveCategory(ALL_CATEGORIES_LABEL)
    setSort("recommended")
  }

  return (
    <main className="flex-1 bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="relative mx-auto w-full max-w-7xl px-6 pt-14 pb-20 lg:px-12 lg:pt-16 lg:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              The directory
            </p>

            <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              Find a space to
              <br />
              <span className="text-[#7f8f43] italic dark:text-[#94a54e]">
                make it happen.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              Distinctive spaces. Transparent pricing. Your next project starts
              here.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row lg:mt-14">
            <label className="relative flex h-12 flex-1 items-center gap-3 rounded-lg border border-border/80 bg-card/60 px-4 transition focus-within:border-highlight/60 focus-within:ring-2 focus-within:ring-ring/30">
              <Search aria-hidden className="size-4 shrink-0 text-muted-foreground" />
              <span className="sr-only">Search studios</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by space, city, or vibe..."
                className="h-full w-full min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
              />
            </label>

            <div className="relative flex h-12 items-center gap-2 rounded-lg border border-border/80 bg-card/60 px-4 sm:w-48">
              <SlidersHorizontal
                aria-hidden
                className="size-4 shrink-0 text-muted-foreground"
              />
              <span className="flex-1 truncate text-sm font-medium">
                {activeSortLabel}
              </span>
              <ChevronDown
                aria-hidden
                className="size-4 shrink-0 text-muted-foreground"
              />
              <select
                aria-label="Sort studios"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((category) => {
              const isActive = activeCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "h-10 rounded-full border px-4 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
                    isActive
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border/80 bg-card/40 text-muted-foreground hover:border-highlight/50 hover:text-foreground"
                  )}
                >
                  {category}
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 text-[11px] text-muted-foreground">
            <p>
              {filteredStudios.length}{" "}
              {filteredStudios.length === 1 ? "space" : "spaces"} to explore
            </p>

            <p className="flex items-center gap-1.5">
              <Compass aria-hidden className="size-3.5" />
              Curated for creators
            </p>
          </div>

          {filteredStudios.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStudios.map((studio, index) => (
                <StudioCard
                  key={studio._id}
                  studio={studio}
                  priority={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
              <p className="font-serif text-2xl">
                {studios.length === 0
                  ? "Spaces are taking a quick break."
                  : "No spaces match that search."}
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                {studios.length === 0
                  ? "The directory could not be loaded right now. Please check back in a moment."
                  : "Try another city, vibe or category, or clear your filters to see everything."}
              </p>

              {studios.length > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 h-10 rounded-full bg-brand px-5 text-xs font-semibold text-brand-foreground transition hover:bg-brand/90"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default AllStudio
