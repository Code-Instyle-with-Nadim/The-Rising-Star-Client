import type { Metadata } from "next"
import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarCheck2,
  CalendarDays,
  ClipboardList,
  Plus,
  type LucideIcon,
} from "lucide-react"

import { auth } from "@/lib/auth"
import { getHostBookings } from "@/lib/bookings"
import { getStudiosByHost } from "@/lib/studios"

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your studio listings, review booking requests, and keep your spaces booking-ready.",
}

function DashboardStat({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon
  label: string
  value: string
  detail: string
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 text-card-foreground shadow-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full border border-brand/15 bg-brand/5"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="grid size-10 place-items-center rounded-lg bg-brand/15 text-highlight">
          <Icon aria-hidden className="size-5" />
        </span>
        <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          {label}
        </span>
      </div>

      <p className="relative mt-6 font-serif text-4xl leading-none tracking-[-0.01em]">
        {value}
      </p>
      <p className="relative mt-2 text-xs leading-5 text-muted-foreground">
        {detail}
      </p>
    </article>
  )
}

type QuickAction = {
  icon: LucideIcon
  title: string
  description: string
  href: string
  cta: string
  meta?: string
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  cta,
  meta,
}: QuickAction) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-xl border border-border/60 bg-card p-6 text-card-foreground shadow-sm transition-colors hover:border-highlight/40 hover:bg-accent/40"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-10 place-items-center rounded-lg bg-muted text-highlight transition-colors group-hover:bg-brand/15">
          <Icon aria-hidden className="size-5" />
        </span>
        <ArrowUpRight
          aria-hidden
          className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
        />
      </div>

      <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/60 pt-4">
        <span className="text-xs font-semibold">{cta}</span>
        {meta ? (
          <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
            {meta}
          </span>
        ) : null}
      </div>
    </Link>
  )
}

export default async function DashboardPage() {
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

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length
  const bookingDetail =
    bookings.length === 0
      ? "No requests yet"
      : pendingCount > 0
        ? `${pendingCount} pending ${pendingCount === 1 ? "request" : "requests"}`
        : "All caught up"
  const createdAt = new Date(user.createdAt)
  const memberSince = Number.isNaN(createdAt.getTime())
    ? "recently"
    : createdAt.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })

  const quickActions: QuickAction[] = [
    {
      icon: Plus,
      title: "Add a new studio",
      description:
        "Publish a new creative space and start welcoming booking requests.",
      href: "/add-studio?new=1",
      cta: "Add studio",
    },
    {
      icon: Building2,
      title: "Manage listings",
      description:
        "Update, hide, or remove the studios you already host.",
      href: "/my-listings",
      cta: "Manage listings",
      meta: `${studios.length} ${studios.length === 1 ? "space" : "spaces"}`,
    },
    {
      icon: CalendarCheck2,
      title: "View your bookings",
      description: "See the sessions you have booked as a creator.",
      href: "/my-bookings",
      cta: "View bookings",
    },
    {
      icon: ClipboardList,
      title: "Manage host requests",
      description:
        "Review incoming booking requests for your studios.",
      href: "/host-bookings",
      cta: "Review requests",
      meta: `${pendingCount} pending`,
    },
  ]

  return (
    <main className="flex-1 bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 pt-14 pb-20 lg:px-12 lg:pt-16 lg:pb-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              Your creative HQ
            </p>

            <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-6xl">
              Welcome back,
              <br />
              <span className="text-highlight italic">
                {user.name || "creator"}.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
              Your creative work, all in one place. Manage your studio listings,
              review booking requests, and keep your spaces booking-ready.
            </p>
          </div>

          <Link
            href="/add-studio?new=1"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 lg:self-auto"
          >
            <Plus aria-hidden className="size-4" />
            Add a new studio
          </Link>
        </div>

        <section
          aria-label="Account overview"
          className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <DashboardStat
            icon={Building2}
            label="Studio listings"
            value={String(studios.length)}
            detail={
              studios.length === 0
                ? "Publish your first space"
                : "Live on The Rising Star"
            }
          />
          <DashboardStat
            icon={CalendarDays}
            label="Booking requests"
            value={String(bookings.length)}
            detail={bookingDetail}
          />
          <DashboardStat
            icon={BadgeCheck}
            label="Creator account"
            value="Active"
            detail={`Member since ${memberSince}`}
          />
        </section>

        <section className="mt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                <span className="size-1.5 rounded-full bg-brand" />
                Quick actions
              </p>

              <h2 className="mt-3 font-serif text-3xl tracking-[-0.01em] sm:text-4xl">
                Keep your space in motion.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-right">
              Everything you need to manage your listings and bookings, in one
              place.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
