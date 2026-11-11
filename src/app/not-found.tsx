import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page doesn't exist or has moved. Head back home or explore creative studio spaces at The Rising Star.",
}

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-background px-6 py-24 text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 -right-40 size-[36rem] rounded-full border border-border"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-48 size-[32rem] -translate-y-1/2 rounded-full border border-border"
      />

      <div className="relative w-full max-w-2xl text-center">
        <p className="flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          <span className="size-1.5 rounded-full bg-brand" />
          404 &mdash; Page not found
        </p>

        <h1 className="mt-8 font-serif text-7xl leading-none tracking-[-0.04em] sm:text-8xl">
          4<span className="text-highlight italic">0</span>4
        </h1>

        <h2 className="mt-5 font-serif text-3xl leading-[1.02] tracking-[-0.02em] sm:text-4xl">
          This scene didn&apos;t
          <br />
          <span className="text-highlight italic">make the cut.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-muted-foreground">
          The page you&apos;re looking for may have moved, wrapped early, or
          never existed. Let&apos;s get you back to a space that does.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform group-hover:-translate-x-0.5"
            />
            Back to home
          </Link>

          <Link
            href="/Explore-Studios"
            className="group inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-card/60 px-6 text-sm font-semibold text-foreground transition hover:border-highlight/50 hover:bg-accent/60 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Explore studios
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <p className="mt-10 text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          The Rising Star &middot; Space for ideas
        </p>
      </div>
    </main>
  )
}
