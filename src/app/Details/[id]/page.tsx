import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react"

import { ReviewForm } from "@/components/details/review-form"
import { StudioGallery } from "@/components/details/studio-gallery"
import { Button } from "@/components/ui/button"
import { getStudio } from "@/lib/studios"

export async function generateMetadata({
  params,
}: PageProps<"/Details/[id]">): Promise<Metadata> {
  const { id } = await params
  const studio = await getStudio(id)

  if (!studio) {
    return { title: "Studio details" }
  }

  return {
    title: studio.title,
    description: studio.overview,
  }
}

export default async function DetailsPage({
  params,
}: PageProps<"/Details/[id]">) {
  const { id } = await params
  const studio = await getStudio(id)

  if (!studio) {
    notFound()
  }

  const rating = Number(studio.rating ?? 0)
  const reviewCount = Number(studio.reviewCount ?? 0)
  const galleryImages = Array.isArray(studio.images)
    ? [studio.imageUrl, ...studio.images]
    : [studio.imageUrl]
  const amenities = Array.isArray(studio.amenities) ? studio.amenities : []

  const stats = [
    { label: "Max capacity", value: studio.maxCapacity },
    { label: "Per hour", value: `$${studio.hourlyRate}` },
    { label: "Security deposit", value: `$${studio.securityDeposit}` },
  ]

  return (
    <main className="flex-1 bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-24 lg:px-12 lg:pt-12">
        <Link
          href="/Explore-Studios"
          className="inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          All studios
        </Link>

        <header className="mt-8">
          <span className="inline-flex rounded-sm bg-brand/60 px-2.5 py-1 text-[9px] font-bold tracking-[0.18em] text-brand-foreground uppercase">
            {studio.category}
          </span>

          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
                {studio.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin aria-hidden className="size-3.5 shrink-0" />
                  {studio.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Star
                    aria-hidden
                    className="size-3.5 shrink-0 fill-gold text-gold"
                  />
                  {rating > 0 && (
                    <span className="font-medium text-foreground">
                      {rating.toFixed(1)}
                    </span>
                  )}
                  <span>
                    ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                  </span>
                </span>
              </div>
            </div>

            <p className="flex shrink-0 items-baseline gap-1 font-serif text-3xl text-foreground">
              ${studio.hourlyRate}
              <span className="font-sans text-[11px] font-normal text-muted-foreground">
                /hour
              </span>
            </p>
          </div>
        </header>

        <StudioGallery title={studio.title} images={galleryImages} />

        <div className="mt-12 grid items-start gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="order-2 lg:order-1">
            <section>
              <h2 className="text-lg font-semibold tracking-tight">
                About this space
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {studio.overview}
              </p>

              <dl className="mt-5 grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col-reverse rounded-lg bg-callout/80 px-4 py-3.5"
                  >
                    <dt className="mt-1.5 text-[10px] leading-4 text-muted-foreground">
                      {stat.label}
                    </dt>
                    <dd className="font-serif text-2xl leading-none">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-10">
              <h2 className="text-lg font-semibold tracking-tight">
                What&apos;s included
              </h2>

              {amenities.length > 0 ? (
                <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-highlight"
                      />
                      {amenity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">
                  Amenity details coming soon.
                </p>
              )}
            </section>

            <section className="mt-10">
              <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                Creator reviews
                <span className="text-xs font-normal text-muted-foreground">
                  ({reviewCount})
                </span>
              </h2>

              <ReviewForm studioTitle={studio.title} />
            </section>
          </div>

          <aside className="order-1 lg:sticky lg:top-28 lg:order-2">
            <div className="rounded-xl border border-border/70 bg-card p-5 shadow-[0_1px_2px_rgba(31,36,25,0.04)]">
              <p className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                <span className="grid size-3.5 place-items-center rounded-full border border-muted-foreground/50">
                  <span className="size-1 rounded-full bg-highlight" />
                </span>
                Reserve your session
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-none tracking-[-0.01em]">
                Make it yours.
              </h2>

              <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
                Choose your time and send a booking request to{" "}
                {studio.hostName || "the host"}.
              </p>

              <Button
                type="button"
                className="mt-5 h-10 w-full rounded-md bg-primary px-4 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Book Workspace Now
                <ArrowUpRight aria-hidden className="size-3.5" />
              </Button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                <ShieldCheck aria-hidden className="size-3" />
                No payment taken at this stage
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
