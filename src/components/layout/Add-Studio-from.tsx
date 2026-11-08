"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import {
  ArrowUpRight,
  Banknote,
  Building2,
  ChevronDown,
  ImageIcon,
  LayoutGrid,
  MapPin,
  ShieldCheck,
  Upload,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { StudioData, User } from "@/lib/AllTypes"

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
]

const amenities = [
  "Natural light",
  "Cyclorama wall",
  "Soundproofing",
  "Lighting kit",
  "Green screen",
  "Makeup station",
  "Wi-Fi",
  "Parking",
  "Air conditioning",
  "Changing room",
]

const AddStudioFrom = ({
  user,
  studio,
}: {
  user: User
  studio?: StudioData
}) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = Boolean(studio)

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const imageUrl = String(formData.get("imageUrl") ?? "")
      const galleryImages = String(formData.get("images") ?? "")
        .split(/\r?\n/)
        .map((url) => url.trim())
        .filter(Boolean)

      const data = {
        title: formData.get("title"),
        category: formData.get("category"),
        maxCapacity: Number(formData.get("maxCapacity")),
        location: formData.get("location"),
        hourlyRate: Number(formData.get("hourlyRate")),
        securityDeposit: Number(formData.get("securityDeposit") ?? 0),
        imageUrl,
        images: galleryImages.length > 0 ? galleryImages : [imageUrl],
        amenities: formData.getAll("amenities"),
        overview: formData.get("overview"),
        hostName: user.name,
        hostEmail: user.email,
      }

      if (isEditing && studio) {
        const response = await fetch(`/api/studio/${studio._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        const result = (await response.json().catch(() => null)) as {
          message?: string
        } | null

        if (!response.ok) {
          throw new Error(result?.message || "Could not update the studio.")
        }

        toast.success("Studio updated successfully.")
        router.push("/my-listings")
        router.refresh()
        return
      }

      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

      if (!API_URL) {
        throw new Error("Backend URL is not configured.")
      }

      const response = await fetch(`${API_URL}/studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          rating: 0,
          reviewCount: 0,
        }),
      })
      const result = (await response.json().catch(() => null)) as {
        message?: string
      } | null

      if (!response.ok) {
        throw new Error(result?.message || "Could not publish the studio.")
      }

      toast.success("Studio published successfully.")
      router.push("/my-listings")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }
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
            {isEditing ? "Your listing" : "Become a host"}
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-6xl">
            {isEditing ? "Edit your" : "Share your"}
            <br />
            <span className="text-highlight italic">space.</span>
          </h1>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            {isEditing
              ? "Update your studio details so creators always see the right information."
              : "Tell creators about your studio and start welcoming bookings."}
          </p>

          <form
            onSubmit={onSubmit}
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
                  defaultValue={studio?.title}
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
                    defaultValue={studio?.category ?? ""}
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
                    defaultValue={studio?.maxCapacity}
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
                  defaultValue={studio?.location}
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
                    defaultValue={studio?.hourlyRate}
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
                    defaultValue={studio?.securityDeposit}
                    placeholder="100"
                    className="h-11 rounded-md bg-card pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-xs font-semibold">
                Cover image URL
              </Label>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  defaultValue={studio?.imageUrl}
                  placeholder="Upload an image or paste an image URL"
                  required
                  className="h-11 rounded-md bg-card pl-10"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <a
                  href="https://imgbb.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-highlight underline-offset-4 hover:underline"
                >
                  <Upload className="size-3" />
                  Or upload directly to ImgBB
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="images" className="text-xs font-semibold">
                  Gallery image URLs
                </Label>
                <span className="text-[10px] text-muted-foreground">
                  (one URL per line)
                </span>
              </div>
              <Textarea
                id="images"
                name="images"
                defaultValue={
                  Array.isArray(studio?.images)
                    ? studio.images.join("\n")
                    : undefined
                }
                placeholder={"https://...\nhttps://..."}
                className="min-h-24 rounded-md bg-card font-mono text-xs leading-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overview" className="text-xs font-semibold">
                Overview
              </Label>
              <Textarea
                id="overview"
                name="overview"
                defaultValue={studio?.overview}
                placeholder="Describe the space, the light and what makes it special..."
                required
                className="min-h-24 rounded-md bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold">
                Amenities & equipment
              </Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {amenities.map((amenity) => {
                  const id = `amenity-${amenity
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`

                  return (
                    <Label
                      key={amenity}
                      htmlFor={id}
                      className="cursor-pointer rounded-md border border-border bg-card px-3 py-2.5 text-xs font-normal hover:bg-muted/40"
                    >
                      <Checkbox
                        id={id}
                        name="amenities"
                        value={amenity}
                        defaultChecked={
                          Array.isArray(studio?.amenities) &&
                          studio.amenities.includes(amenity)
                        }
                      />
                      {amenity}
                    </Label>
                  )
                })}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-sm bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting
                ? isEditing
                  ? "Saving changes..."
                  : "Publishing..."
                : isEditing
                  ? "Save changes"
                  : "Publish studio"}
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

export default AddStudioFrom
