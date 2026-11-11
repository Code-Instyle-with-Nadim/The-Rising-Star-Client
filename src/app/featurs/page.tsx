import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { StudioData } from "@/lib/AllTypes";
import { StudioCard } from "@/components/studios/studio-card";


const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "https://the-rising-star-server.vercel.app"
).replace(/\/+$/, "")

export const metadata: Metadata = {
  title: "Featured studios",
  description:
    "Discover inspiring creative spaces for your next project at The Rising Star.",
}

const FeatursSection = async () => {
  let fearurs: StudioData[] = []

  try {
    const res = await fetch(`${BACKEND_URL}/explore-studio`, {
      cache: "no-store",
    })

    if (res.ok) {
      const data: unknown = await res.json()

      if (Array.isArray(data)) {
        fearurs = data as StudioData[]
      }
    }
  } catch {
    fearurs = []
  }

  return (
    <section className="relative overflow-hidden bg-background py-20 text-foreground lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-48 size-[34rem] -translate-y-1/2 rounded-full border border-border/70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 -right-48 size-[40rem] rounded-full border border-border/70"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-brand" />
            Find your creative home
          </p>

          <h2 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-6xl">
            Featured{" "}
            <span className="text-highlight italic">Studios</span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted-foreground">
            Discover inspiring creative spaces for your next project.
          </p>
        </div>

        {fearurs.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {fearurs.map((feature, index) => (
              <StudioCard
                key={feature._id}
                studio={feature}
                priority={index === 0}
              />
            ))}
          </div>
        ) : (
          <p className="mx-auto mt-12 max-w-md text-center text-sm leading-6 text-muted-foreground">
            Featured studios are taking a quick break. Explore the full
            directory below.
          </p>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/Explore-Studios"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Explore All Studios
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatursSection;
