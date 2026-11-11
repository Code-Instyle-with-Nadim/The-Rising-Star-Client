"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronDown, Star } from "lucide-react"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { authClient } from "@/lib/auth-client"

const RATINGS = ["5", "4", "3", "2", "1"]

export function ReviewForm({
  studioId,
  studioTitle,
  isSignedIn,
}: {
  studioId: string
  studioTitle: string
  isSignedIn: boolean
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const rating = Number(formData.get("rating"))
    const review = String(formData.get("review") ?? "").trim()

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      review.length < 3
    ) {
      toast.error("Please choose a rating and write a short review.")
      return
    }

    setIsSubmitting(true)

    try {
      const { data: JwtToken, error: tokenError } = await authClient.token()
      const token = JwtToken?.token

      if (tokenError || !token) {
        throw new Error("Your session expired. Please sign in again.")
      }

      const response = await fetch(`/api/reviews/${studioId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, review }),
      })
      const result = (await response.json().catch(() => null)) as {
        message?: string
      } | null

      if (!response.ok) {
        throw new Error(result?.message || "Could not publish the review.")
      }

      form.reset()
      setSubmitted(true)
      toast.success(`Thanks for reviewing ${studioTitle}.`)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not publish the review. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isSignedIn) {
    return (
      <div className="mt-5 rounded-xl bg-callout/80 p-5 sm:p-6">
        <h3 className="text-sm font-semibold">Share your experience</h3>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Sign in to leave a review for this studio.
        </p>
        <Button
          nativeButton={false}
          render={
            <Link href={`/sign-in?redirect=${encodeURIComponent(pathname)}`} />
          }
          className="mt-4 h-10 rounded-md bg-primary px-5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Sign in to review
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-5 rounded-xl bg-callout/80 p-5 sm:p-6">
      <h3 className="text-sm font-semibold">Share your experience</h3>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="review-rating"
            className="block text-[11px] font-medium text-foreground/80"
          >
            Rating
          </label>
          <div className="relative">
            <Star
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 fill-gold text-gold"
            />
            <select
              id="review-rating"
              name="rating"
              defaultValue="5"
              className="h-10 w-full cursor-pointer appearance-none rounded-md border border-input bg-card pr-9 pl-9 text-xs text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {RATINGS.map((rating) => (
                <option key={rating} value={rating}>
                  {rating} {rating === "1" ? "star" : "stars"}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        <div>
          <label htmlFor="review-body" className="sr-only">
            Your review
          </label>
          <Textarea
            id="review-body"
            name="review"
            required
            minLength={3}
            maxLength={1000}
            placeholder="What should other creators know about this space?"
            className="min-h-24 rounded-md border-input bg-card text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 rounded-md bg-primary px-5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Publishing..." : "Publish review"}
          </Button>

          {submitted && (
            <p role="status" className="text-[11px] text-highlight">
              Thanks for sharing your experience with {studioTitle}.
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
