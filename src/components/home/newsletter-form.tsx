"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { toast } from "react-toastify"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = email.trim()

    if (!value) {
      return
    }

    setSubmitted(true)
    setEmail("")
    toast.success("Thanks for subscribing. We'll be in touch.")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 flex items-center gap-3 border-b border-footer-foreground/20 pb-2"
    >
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
          setSubmitted(false)
        }}
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

      {submitted && (
        <p role="status" className="sr-only">
          Thanks for subscribing.
        </p>
      )}
    </form>
  )
}
