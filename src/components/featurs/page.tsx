import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";

import type { StudioData } from "@/lib/AllTypes";

const FeatursSection = async () => {
  const res = await fetch("http://localhost:5000/explore-studio");

  const fearurs: StudioData[] = await res.json();

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

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {fearurs.map((feature) => (
            <article
              key={feature.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-highlight/40 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/55 via-black/0 to-black/5"
                />

                <span className="absolute top-3 left-3 rounded-full bg-brand px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-brand-foreground uppercase shadow-sm">
                  {feature.category}
                </span>

                <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                  <Star
                    aria-hidden
                    className="size-3.5 fill-gold text-gold"
                  />
                  {feature.rating}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-semibold tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin
                    aria-hidden
                    className="size-3.5 shrink-0 text-highlight"
                  />
                  {feature.location}
                </p>

                <div className="mt-4 flex items-end justify-between gap-4 border-t border-border pt-4">
                  <p className="font-serif text-2xl leading-none text-gold">
                    ${feature.hourlyRate}
                    <span className="ml-1 font-sans text-[11px] font-normal text-muted-foreground">
                      / hr
                    </span>
                  </p>

                  <p className="text-[11px] text-muted-foreground">
                    {feature.reviewCount} Reviews
                  </p>
                </div>

                <Link
                  href={`/studios/${feature._id}`}
                  className="group/link mt-5 inline-flex h-11 items-center justify-between rounded-lg border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
                >
                  View Details
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/studios"
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
