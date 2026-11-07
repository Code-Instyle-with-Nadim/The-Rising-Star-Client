import Image from "next/image"
import Link from "next/link"
import { MapPin, Pencil, Plus, Trash2 } from "lucide-react"

import type { StudioData } from "@/lib/AllTypes"

type MyStudioListingsProps = {
  studios: StudioData[]
  addStudioHref?: string
}

export default function MyStudioListings({
  studios,
  addStudioHref = "/add-studio?new=1",
}: MyStudioListingsProps) {
  return (
    <main className="flex-1 bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 pt-14 pb-20 lg:px-12 lg:pt-16 lg:pb-28">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              Your spaces
            </p>

            <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-6xl">
              My studio
              <br />
              <span className="text-highlight italic">listings.</span>
            </h1>
          </div>

          <Link
            href={addStudioHref}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:self-auto"
          >
            <Plus className="size-4" />
            Add studio
          </Link>
        </div>

        {studios.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
            <h2 className="font-serif text-3xl tracking-[-0.01em]">
              No listings yet.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Add your first studio and start welcoming creators to your space.
            </p>
            <Link
              href={addStudioHref}
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <Plus className="size-4" />
              Add studio
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-5 sm:mt-12">
            {studios.map((studio) => {
              const title = studio.title || "Untitled studio"
              const image =
                studio.imageUrl ||
                (Array.isArray(studio.images) ? studio.images[0] : "") ||
                "/assets/hero-1.jpg"

              return (
                <article
                  key={studio._id}
                  data-studio-id={studio._id}
                  className="flex flex-col gap-5 rounded-xl border border-border/60 bg-card p-5 text-card-foreground shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-5">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={image}
                        alt={`${title} studio`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-base font-semibold tracking-tight">
                        {title}
                      </h2>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0 text-highlight" />
                        <span className="truncate">
                          {studio.location || "Location not set"}
                        </span>
                      </p>
                      <p className="mt-3 text-sm font-semibold">
                        ${studio.hourlyRate}{" "}
                        <span className="text-[11px] font-normal text-muted-foreground">
                          / hour
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-6 self-end sm:self-auto">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/80 transition hover:text-foreground"
                      aria-label={`Edit ${title}`}
                    >
                      <Pencil className="size-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/80 transition hover:text-destructive"
                      aria-label={`Delete ${title}`}
                    >
                      <Trash2 className="size-3.5" />
                      Delete
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
