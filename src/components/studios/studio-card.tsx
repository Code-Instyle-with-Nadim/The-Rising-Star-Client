import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";

import type { StudioData } from "@/lib/AllTypes";

type StudioCardProps = {
  studio: StudioData;
  priority?: boolean;
};

export function StudioCard({ studio, priority = false }: StudioCardProps) {
  const imageUrl = studio.imageUrl || "/assets/hero-1.jpg";
  const parsedRating = Number(studio.rating ?? 0);
  const rating = Number.isFinite(parsedRating) ? parsedRating : 0;
  const reviewCount = Number(studio.reviewCount ?? 0) || 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-highlight/40 hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={studio.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/55 via-black/0 to-black/5"
        />

        <span className="absolute top-3 left-3 rounded-full bg-brand px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-brand-foreground uppercase shadow-sm">
          {studio.category}
        </span>

        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
          <Star aria-hidden className="size-3.5 fill-gold text-gold" />
          {rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold tracking-tight">{studio.title}</h3>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin aria-hidden className="size-3.5 shrink-0 text-highlight" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>

        <div className="mt-4 flex items-end justify-between gap-4 border-t border-border pt-4">
          <p className="font-serif text-2xl leading-none text-gold">
            ${studio.hourlyRate}
            <span className="ml-1 font-sans text-[11px] font-normal text-muted-foreground">
              / hr
            </span>
          </p>

          <p className="text-[11px] text-muted-foreground">
            {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
          </p>
        </div>

        <Link
          href={`/Details/${studio._id}`}
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
  );
}
