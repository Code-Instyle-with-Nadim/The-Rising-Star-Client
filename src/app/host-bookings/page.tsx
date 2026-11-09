import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  User,
} from "lucide-react"

import { BookingStatusBadge } from "@/components/bookings/booking-status-badge"
import HostBookingActions from "@/components/bookings/host-booking-actions"
import type { BookingStatus } from "@/lib/AllTypes"
import { auth } from "@/lib/auth"
import {
  formatBookingDate,
  formatBookingTime,
  formatBookingTotal,
  getHostBookings,
} from "@/lib/bookings"
import { getStudiosByHost } from "@/lib/studios"

export const metadata: Metadata = {
  title: "Host booking requests",
  description: "Review and manage booking requests for your studios.",
}

const statusOrder: Record<BookingStatus, number> = {
  Pending: 0,
  Confirmed: 1,
  Completed: 2,
  Cancelled: 3,
}

export default async function HostBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const user = session?.user

  if (!user) {
    redirect("/sign-in")
  }

  const [studios, bookings] = await Promise.all([
    getStudiosByHost(user.email),
    getHostBookings(user.email),
  ])
  const sortedBookings = [...bookings].sort(
    (a, b) =>
      statusOrder[a.status] - statusOrder[b.status] ||
      b.createdAt.localeCompare(a.createdAt)
  )
  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length

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
              Host
              <br />
              <span className="text-highlight italic">requests.</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Review booking requests from creators and keep your studio calendar
              up to date.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-semibold text-foreground">
              <span className="size-1.5 rounded-full bg-amber-500" />
              {pendingCount} pending{" "}
              {pendingCount === 1 ? "request" : "requests"}
            </span>

            <Link
              href="/my-listings"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              My listings
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>

        {sortedBookings.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
            <h2 className="font-serif text-3xl tracking-[-0.01em]">
              No booking requests yet.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              {studios.length === 0
                ? "Add your first studio to start receiving booking requests."
                : "New requests for your studios will appear here."}
            </p>
            <Link
              href={studios.length === 0 ? "/add-studio?new=1" : "/my-listings"}
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              {studios.length === 0 ? "Add studio" : "Manage listings"}
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-5 sm:mt-12">
            {sortedBookings.map((booking) => {
              const image = booking.studioImage || "/assets/hero-1.jpg"
              const customerName = booking.userName || booking.userEmail

              return (
                <article
                  key={booking._id}
                  className="flex flex-col gap-5 rounded-xl border border-border/60 bg-card p-5 text-card-foreground shadow-sm xl:flex-row xl:items-center xl:justify-between"
                >
                  <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
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
                        <BookingStatusBadge status={booking.status} />
                      </div>

                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0 text-highlight" />
                        <span className="truncate">
                          {booking.studioLocation || "Location not set"}
                        </span>
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <User
                            aria-hidden
                            className="size-3.5 text-highlight"
                          />
                          {customerName}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Mail
                            aria-hidden
                            className="size-3.5 text-highlight"
                          />
                          <a
                            href={`mailto:${booking.userEmail}`}
                            className="transition hover:text-foreground"
                          >
                            {booking.userEmail}
                          </a>
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
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

                  <div className="flex flex-col gap-4 border-t border-border/60 pt-4 xl:min-w-[15rem] xl:border-t-0 xl:pt-0">
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

                    <HostBookingActions
                      bookingId={booking._id}
                      status={booking.status}
                    />
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
