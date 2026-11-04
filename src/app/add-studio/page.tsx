"use client"

import Image from "next/image"
import {
  ArrowUpRight,
  Banknote,
  Building2,
  ChevronDown,
  ImageIcon,
  LayoutGrid,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
]

const AddStudioPage = () => {
  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data=Object.fromEntries(formData.entries());
    
  return (
    <main className="grid flex-1 lg:grid-cols-2">
      <div className="hidden lg:block">
        <div className="sticky top-24 h-[calc(100dvh-6rem)] overflow-hidden">
          <Image
            src="/assets/hero-1.jpg"
            alt="A light-filled studio hallway with glass partitions"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15" />

          <div className="absolute inset-0 flex flex-col justify-end p-10 text-white xl:p-14">
            <p className="text-[10px] font-semibold tracking-[0.25em] text-white/70 uppercase">
              Studio Notes — 002
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.02em] xl:text-6xl">
              Big things
              <br />
              happen in the
              <br />
              <span className="text-brand italic">right space.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-background px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="w-full max-w-[27rem]">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-highlight" />
            Become a host
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-6xl">
            Share your
            <br />
            <span className="text-highlight italic">space.</span>
          </h1>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Tell creators about your studio and start welcoming bookings.
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-8 space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-semibold">
                Studio name
              </Label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="The Glasshouse Studio"
                  required
                  className="h-11 rounded-md bg-card pl-10"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs font-semibold">
                  Category
                </Label>
                <div className="relative">
                  <LayoutGrid className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    id="category"
                    name="category"
                    defaultValue=""
                    required
                    className="h-11 w-full appearance-none rounded-md border border-input bg-card py-1 pr-9 pl-10 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxCapacity" className="text-xs font-semibold">
                  Max capacity
                </Label>
                <div className="relative">
                  <Users className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="maxCapacity"
                    name="maxCapacity"
                    type="number"
                    min={1}
                    placeholder="12"
                    required
                    className="h-11 rounded-md bg-card pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-xs font-semibold">
                Location
              </Label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Gulshan, Dhaka"
                  required
                  className="h-11 rounded-md bg-card pl-10"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="text-xs font-semibold">
                  Hourly rate
                </Label>
                <div className="relative">
                  <Banknote className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    min={0}
                    placeholder="45"
                    required
                    className="h-11 rounded-md bg-card pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="securityDeposit"
                  className="text-xs font-semibold"
                >
                  Security deposit
                </Label>
                <div className="relative">
                  <ShieldCheck className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="securityDeposit"
                    name="securityDeposit"
                    type="number"
                    min={0}
                    placeholder="100"
                    className="h-11 rounded-md bg-card pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-xs font-semibold">
                Photo URL
              </Label>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://..."
                  required
                  className="h-11 rounded-md bg-card pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="amenities" className="text-xs font-semibold">
                  Amenities
                </Label>
                <span className="text-[10px] text-muted-foreground">
                  (comma separated)
                </span>
              </div>
              <div className="relative">
                <Sparkles className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="amenities"
                  name="amenities"
                  type="text"
                  placeholder="Wi-Fi, lighting, parking"
                  className="h-11 rounded-md bg-card pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="overview" className="text-xs font-semibold">
                Overview
              </Label>
              <Textarea
                id="overview"
                name="overview"
                placeholder="Describe the space, the light and what makes it special..."
                required
                className="min-h-24 rounded-md bg-card"
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-sm bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Publish studio
              <ArrowUpRight className="size-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
            You can update your studio details anytime.
          </p>
        </div>
      </div>
    </main>
  )
}

export default AddStudioPage
