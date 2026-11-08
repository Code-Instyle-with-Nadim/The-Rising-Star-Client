import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react"

import CancelBookingButton from "@/components/bookings/cancel-booking-button"
import { Badge } from "@/components/ui/badge"
import type { BookingStatus } from "@/lib/AllTypes"
import { auth } from "@/lib/auth"
import {
  formatBookingDate,
  formatBookingTime,
  formatBookingTotal,
  getBookingsByEmail,
} from "@/lib/bookings"

export const metadata: Metadata = {
  title: "My bookings",
  description: "View and manage your studio booking requests.",
}

const statusStyles: Record<BookingStatus, string> = {
  Pending:
    "border-amber-300/70 bg-amber-100 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-200",
  Confirmed:
    "border-sky-300/70 bg-sky-100 text-sky-900 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-200",
  Completed:
    "border-emerald-300/70 bg-emerald-100 text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-200",
  Cancelled:
    "border-rose-300/70 bg-rose-100 text-rose-900 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-200",
}

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const user = session?.user

  if (!user) {
    redirect("/sign-in")
  }

  const bookings = await getBookingsByEmail(user.email)

  return (
    <main className="flex-1 bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 pt-14 pb-20 lg:px-12 lg:pt-16 lg:pb-28">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              Your sessions
            </p>

            <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-6xl">
              My
              <br />
              <span className="text-highlight italic">bookings.</span>
            </h1>
          </div>

          <Link
            href="/Explore-Studios"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:self-auto"
          >
            Explore studios
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
            <h2 className="font-serif text-3xl tracking-[-0.01em]">
              No bookings yet.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Find a space you love and send your first booking request.
            </p>
            <Link
              href="/Explore-Studios"
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Explore studios
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-5 sm:mt-12">
            {bookings.map((booking) => {
              const image = booking.studioImage || "/assets/hero-1.jpg"
              const statusClass =
                statusStyles[booking.status] ?? statusStyles.Pending

              return (
                <article
                  key={booking._id}
                  className="flex flex-col gap-5 rounded-xl border border-border/60 bg-card p-5 text-card-foreground shadow-sm lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-5">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={image}
                        alt={`${booking.studioTitle} studio`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="truncate text-base font-semibold tracking-tight">
                          {booking.studioTitle}
                        </h2>
                        <Badge
                          variant="outline"
                          className={`gap-1.5 text-[10px] font-semibold ${statusClass}`}
                        >
                          <span className="size-1.5 rounded-full bg-current" />
                          {booking.status}
                        </Badge>
                      </div>

                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0 text-highlight" />
                        <span className="truncate">
                          {booking.studioLocation || "Location not set"}
                        </span>
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays
                            aria-hidden
                            className="size-3.5 text-highlight"
                          />
                          {formatBookingDate(booking.bookingDate)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3
                            aria-hidden
                            className="size-3.5 text-highlight"
                          />
                          {formatBookingTime(booking.startTime)} &ndash;{" "}
                          {formatBookingTime(booking.endTime)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4 lg:border-t-0 lg:pt-0">
                    <div>
                      <p className="text-sm font-semibold">
                        {formatBookingTotal(booking.totalPrice)}
                        <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                          total
                        </span>
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        Security deposit{" "}
                        {formatBookingTotal(booking.securityDeposit ?? 0)}
                      </p>
                    </div>

                    {booking.status === "Pending" && (
                      <CancelBookingButton
                        bookingId={booking._id}
                        studioTitle={booking.studioTitle}
                      />
                    )}
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
