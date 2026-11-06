"use client"

import { useState } from "react"
import { ChevronDown, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const RATINGS = ["5", "4", "3", "2", "1"]

export function ReviewForm({ studioTitle }: { studioTitle: string }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    event.currentTarget.reset()
    setSubmitted(true)
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
            placeholder="What should other creators know about this space?"
            className="min-h-24 rounded-md border-input bg-card text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            className="h-10 rounded-md bg-primary px-5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Publish review
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
