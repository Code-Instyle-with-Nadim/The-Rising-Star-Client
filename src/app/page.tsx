import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Camera,
  Headphones,
  Lightbulb,
  Play,
  Plus,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react"

import { HeroCarousel } from "@/components/home/hero-carousel"
import { BrandLogo } from "@/components/layout/brand-logo"

export const metadata: Metadata = {
  title: "Find your space",
  description:
    "Find your flow. Find your space. Studios and creative spaces for your next project.",
}

const audiences = [
  "Independent creators",
  "Production teams",
  "Creative agencies",
  "Artists & makers",
]

const avatars = [
  { initials: "J", className: "bg-primary text-primary-foreground" },
  { initials: "M", className: "bg-secondary text-secondary-foreground" },
  { initials: "A", className: "bg-muted text-muted-foreground" },
]

const categories = [
  {
    name: "Photo Studio",
    count: "120+",
    description: "Portraits, campaigns & more",
  },
  {
    name: "Film Stage",
    count: "48+",
    description: "Big ideas need big sets",
  },
  {
    name: "Podcast Lounge",
    count: "86+",
    description: "Make your voice heard",
  },
  {
    name: "Music Suite",
    count: "64+",
    description: "Find your sound",
  },
  {
    name: "Workshop",
    count: "35+",
    description: "A place to make things",
  },
]

const promises = [
  {
    icon: ShieldCheck,
    title: "Trusted spaces",
    description: "Clear details and verified host profiles.",
  },
  {
    icon: Users,
    title: "Creator-first support",
    description: "Real people when you need a hand.",
  },
  {
    icon: Play,
    title: "Transparent booking",
    description: "Know the rate before you reserve.",
  },
]

const howItWorksSteps = [
  {
    number: "01",
    icon: Camera,
    title: "Discover spaces",
    description: "Explore handpicked creative spaces that fit your vision.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Choose your hours",
    description: "Pick a date, time and the setup you need.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Book with confidence",
    description: "Send your request with transparent pricing.",
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Make something great",
    description: "Show up, create and bring your idea to life.",
  },
]

const confidenceFeatures = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description:
      "Protection-focused booking policies for creators and hosts.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description: "Connect with trusted creators and studio hosts.",
  },
  {
    icon: Video,
    title: "Equipment Safety",
    description: "Clear studio guidelines help protect valuable equipment.",
  },
  {
    icon: Headphones,
    title: "24/7 Host Support",
    description: "Get assistance whenever you need help with your booking.",
  },
]

const footerColumns = [
  {
    heading: "Explore",
    links: [
      { label: "All studios", href: "/#explore-studios" },
      { label: "Photo studios", href: "/#explore-studios" },
      { label: "Podcast rooms", href: "/#explore-studios" },
      { label: "Music suites", href: "/#explore-studios" },
    ],
  },
  {
    heading: "For hosts",
    links: [
      { label: "List your space", href: "/list-your-space" },
      { label: "Manage listings", href: "/list-your-space" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Our story", href: "/#about" },
    ],
  },
]

const socials = [
  { label: "IG", name: "Instagram", href: "#footer" },
  { label: "FB", name: "Facebook", href: "#footer" },
  { label: "X", name: "X", href: "#footer" },
]

export default function Home() {
  return (
    <>
      <main className="flex-1 bg-background text-foreground">
        <section
          id="home"
          className="relative scroll-mt-20 overflow-hidden lg:scroll-mt-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 -left-40 size-[42rem] -translate-y-1/2 rounded-full border border-border"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 -left-16 size-[28rem] -translate-y-1/2 rounded-full border border-border"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-56 -right-48 size-[46rem] rounded-full border border-border"
          />

          <div className="relative mx-auto grid w-full max-w-7xl gap-20 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:px-12 lg:py-24">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                <span className="size-1.5 rounded-full bg-brand" />
                Room to make something real
              </div>

              <h1 className="mt-7 font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Find your flow.
                <br />
                <span className="text-highlight italic">Find your</span> space.
              </h1>

              <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">
                A quiet podcast lounge, a sunlit loft or a full production
                stage. Your next project starts here.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href="#explore-studios"
                  className="group inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90"
                >
                  Explore spaces
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="#become-a-host"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 transition hover:text-foreground"
                >
                  List your space
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {avatars.map((avatar) => (
                    <span
                      key={avatar.initials}
                      className={`flex size-9 items-center justify-center rounded-full border-2 border-background text-[10px] font-bold ${avatar.className}`}
                    >
                      {avatar.initials}
                    </span>
                  ))}
                  <span className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-brand text-brand-foreground">
                    <Plus className="size-3.5" />
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">2,400+</span>{" "}
                  creators found their space
                </p>
              </div>
            </div>

            <HeroCarousel />
          </div>

          <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 pb-10 text-[9px] font-medium tracking-[0.22em] text-muted-foreground uppercase lg:px-12">
            <span>Find your creative home</span>
            <span className="hidden sm:inline">Scroll to explore ↓</span>
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-20 bg-muted text-foreground lg:scroll-mt-24"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)] lg:items-center lg:px-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              The space behind the story
            </p>
            {audiences.map((audience) => (
              <p key={audience} className="text-sm font-medium text-foreground/80">
                {audience}
              </p>
            ))}
          </div>
        </section>

        <section
          id="explore-studios"
          className="scroll-mt-20 bg-background text-foreground lg:scroll-mt-24"
        >
          <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                  <span className="size-1.5 rounded-full bg-brand" />
                  Find your kind of space
                </p>

                <h2 className="mt-7 font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-6xl">
                  Every craft has
                  <br />
                  <span className="text-highlight italic">a home.</span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-6 text-muted-foreground lg:justify-self-end lg:pb-1">
                The right environment changes everything. Find a space that
                understands what you&apos;re here to create.
              </p>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map((category) => (
                <article
                  key={category.name}
                  className="flex min-h-[13.5rem] flex-col rounded border border-border bg-card p-5 text-card-foreground transition-colors hover:border-highlight/40 hover:bg-accent/50"
                >
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden
                      className="size-11 rounded-full bg-foreground"
                    />
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 text-muted-foreground"
                    />
                  </div>

                  <p className="mt-10 text-[10px] text-muted-foreground">
                    {category.count} spaces
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold tracking-tight">
                    {category.name}
                  </h3>
                  <p className="mt-2 rounded-[3px] bg-muted px-3 py-1.5 text-[11px] text-muted-foreground">
                    {category.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="studio-promise"
          className="scroll-mt-20 bg-muted text-foreground lg:scroll-mt-24"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-12 lg:py-28">
            <div className="relative">
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <Image
                  src="/assets/hero-1.jpg"
                  alt="Sunlit studio corridor with glass walls and a lounge"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>

              <p className="absolute bottom-4 left-4 bg-brand px-5 py-3 text-[10px] font-bold tracking-[0.16em] text-brand-foreground uppercase">
                Good work starts here.
              </p>
            </div>

            <div>
              <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-highlight uppercase">
                <span className="size-1.5 rounded-full bg-brand" />
                The studio space promise
              </p>

              <h2 className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.02em] sm:text-6xl">
                Make room for
                <br />
                <span className="text-highlight italic">what matters.</span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-6 text-muted-foreground">
                Great work needs more than four walls. We bring creators and
                trusted hosts together, with the clarity and confidence to focus
                on the craft.
              </p>

              <ul className="mt-8 space-y-5">
                {promises.map((promise) => {
                  const Icon = promise.icon

                  return (
                    <li key={promise.title} className="flex gap-4">
                      <Icon
                        aria-hidden
                        strokeWidth={1.5}
                        className="mt-0.5 size-6 shrink-0 text-highlight"
                      />
                      <div>
                        <p className="text-sm font-semibold">{promise.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {promise.description}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <Link
                href="#explore-studios"
                className="group mt-9 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Find your space
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-20 bg-callout text-callout-foreground lg:scroll-mt-24"
        >
          <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] uppercase opacity-70">
                  <span className="size-1.5 rounded-full bg-brand" />
                  Simple by design
                </p>

                <h2 className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.02em] sm:text-6xl">
                  Less planning.
                  <br />
                  <span className="text-highlight italic">More making.</span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-6 opacity-70 lg:justify-self-end lg:pb-1">
                A smoother way to get from the first spark to the final frame.
              </p>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
              {howItWorksSteps.map((step) => {
                const Icon = step.icon

                return (
                  <article key={step.number}>
                    <div className="flex items-center justify-between border-t border-callout-foreground/20 pt-4">
                      <span className="text-[11px] font-medium tabular-nums opacity-70">
                        {step.number}
                      </span>
                      <Icon
                        aria-hidden
                        strokeWidth={1.4}
                        className="size-5 text-highlight"
                      />
                    </div>

                    <h3 className="mt-7 text-base font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 opacity-65">
                      {step.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section
          id="create-with-confidence"
          className="scroll-mt-20 bg-background text-foreground lg:scroll-mt-24"
        >
          <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
            <div className="max-w-2xl">
              <span className="block h-px w-12 bg-gold" />

              <h2 className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.02em] text-balance sm:text-6xl">
                Create With Confidence
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
                Your creativity deserves a safe, reliable, and supportive space.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {confidenceFeatures.map((feature) => {
                const Icon = feature.icon

                return (
                  <article
                    key={feature.title}
                    className="group rounded-lg border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-accent/60"
                  >
                    <span className="flex size-11 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground">
                      <Icon aria-hidden strokeWidth={1.6} className="size-5" />
                    </span>

                    <h3 className="mt-6 text-base font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </article>
                )
              })}
            </div>

            <p className="mt-8 max-w-xl text-[11px] leading-5 text-muted-foreground">
              Platform policies and planned support. Availability may vary by
              space and booking.
            </p>
          </div>
        </section>

        <section
          id="become-a-host"
          className="scroll-mt-20 bg-callout text-callout-foreground lg:scroll-mt-24"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-12 lg:py-24">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] uppercase opacity-70">
                <span className="size-1.5 rounded-full bg-brand" />
                Have a space to share?
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
                Your space could be
                <br />
                <span className="text-highlight italic">
                  someone&apos;s next big thing.
                </span>
              </h2>
            </div>

            <Link
              href="/list-your-space"
              className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-brand px-6 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90"
            >
              Become a host
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-footer text-footer-foreground">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1.1fr]">
            <div>
              <BrandLogo />

              <p className="mt-5 max-w-xs text-sm leading-6 text-footer-foreground/65">
                Good ideas deserve a great space. Find the room, tools and
                atmosphere to bring your next big thing to life.
              </p>

              <div className="mt-6 flex items-center gap-2">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="grid size-9 place-items-center rounded-full border border-footer-foreground/20 text-[10px] font-semibold transition hover:border-brand hover:bg-brand hover:text-brand-foreground"
                  >
                    {social.label}
                  </Link>
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <div key={column.heading}>
                <p className="text-sm font-semibold">{column.heading}</p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-footer-foreground/65 transition hover:text-footer-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-sm font-semibold">Stay in the creative loop</p>
              <p className="mt-3 text-sm leading-6 text-footer-foreground/65">
                Fresh spaces and inspiration, occasionally.
              </p>

              <form className="mt-5 flex items-center gap-3 border-b border-footer-foreground/20 pb-2">
                <input
                  type="email"
                  name="email"
                  required
                  aria-label="Email address"
                  placeholder="Your email address"
                  className="w-full min-w-0 bg-transparent py-2 text-sm text-footer-foreground placeholder:text-footer-foreground/45 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid size-9 shrink-0 place-items-center rounded-sm bg-brand text-brand-foreground transition hover:bg-brand/90"
                >
                  <ArrowUpRight className="size-4" />
                </button>
              </form>

              <p className="mt-3 text-[10px] text-footer-foreground/45">
                By subscribing you agree to our updates.
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-footer-foreground/15 pt-6 text-[11px] text-footer-foreground/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 The Rising Star. Made for the makers.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="#" className="transition hover:text-footer-foreground">
                Terms
              </Link>
              <span aria-hidden>·</span>
              <Link href="#" className="transition hover:text-footer-foreground">
                Privacy
              </Link>
              <span aria-hidden>·</span>
              <span>Crafted for creativity</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
