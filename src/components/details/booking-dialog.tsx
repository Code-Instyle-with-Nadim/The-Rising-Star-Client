"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { CalendarDays, Clock3, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type BookingDialogProps = {
  studio: {
    _id: string
    title: string
    hourlyRate: number
    securityDeposit: number
  }
  user: {
    name: string
    email: string
  } | null
}

const triggerClassName =
  "mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-[11px] font-semibold text-primary-foreground transition hover:bg-primary/90"

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number)

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null
  }

  return hours * 60 + minutes
}

function getTodayValue() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${today.getFullYear()}-${month}-${day}`
}

export default function BookingDialog({ studio, user }: BookingDialogProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [bookingDate, setBookingDate] = useState("")
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("12:00")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const startMinutes = timeToMinutes(startTime)
  const endMinutes = timeToMinutes(endTime)
  const durationHours =
    startMinutes !== null && endMinutes !== null && endMinutes > startMinutes
      ? (endMinutes - startMinutes) / 60
      : 0
  const estimatedTotal = durationHours * studio.hourlyRate

  if (!user) {
    return (
      <Link
        href={`/sign-in?redirect=${encodeURIComponent(pathname)}`}
        className={triggerClassName}
      >
        Book Workspace Now
        <CalendarDays aria-hidden className="size-3.5" />
      </Link>
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    if (startTime >= endTime) {
      toast.error("The end time must be after the start time.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studioId: studio._id,
          bookingDate,
          startTime,
          endTime,
        }),
      })

      const result = (await response.json().catch(() => null)) as {
        message?: string
      } | null

      if (!response.ok) {
        throw new Error(result?.message || "Could not send the booking request.")
      }

      toast.success(
        "Booking request sent. The host will confirm your session shortly."
      )
      setOpen(false)
      setBookingDate("")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not send the booking request. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
      >
        Book Workspace Now
        <CalendarDays aria-hidden className="size-3.5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/55 backdrop-blur-[2px]"
          className="max-w-[calc(100%-2rem)] gap-0 rounded-2xl p-6 sm:max-w-[30rem] sm:p-8"
        >
          <DialogClose
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
              />
            }
          >
            <X aria-hidden className="size-4" />
            <span className="sr-only">Close booking form</span>
          </DialogClose>

          <p className="flex items-center gap-2 text-[9px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-brand" />
            Reservation request
          </p>

          <DialogTitle className="mt-4 font-sans text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Choose your session.
          </DialogTitle>

          <DialogDescription className="sr-only">
            Choose a date and time to send a booking request for {studio.title}.
          </DialogDescription>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="booking-date"
                className="text-xs font-semibold text-foreground"
              >
                Session date
              </Label>
              <div className="relative">
                <Input
                  id="booking-date"
                  name="bookingDate"
                  type="date"
                  value={bookingDate}
                  min={getTodayValue()}
                  onChange={(event) => setBookingDate(event.target.value)}
                  autoFocus
                  required
                  className="h-11 rounded-md border-border/50 bg-muted/50 pr-10 text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                <CalendarDays
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="start-time"
                  className="text-xs font-semibold text-foreground"
                >
                  Start
                </Label>
                <div className="relative">
                  <Input
                    id="start-time"
                    name="startTime"
                    type="time"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    required
                    className="h-11 rounded-md border-border/50 bg-muted/50 pr-10 text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                  />
                  <Clock3
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="end-time"
                  className="text-xs font-semibold text-foreground"
                >
                  End
                </Label>
                <div className="relative">
                  <Input
                    id="end-time"
                    name="endTime"
                    type="time"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                    required
                    className="h-11 rounded-md border-border/50 bg-muted/50 pr-10 text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                  />
                  <Clock3
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-border/70 pt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estimated total</span>
                <span className="font-semibold text-foreground">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                  }).format(estimatedTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Security deposit</span>
                <span className="font-semibold text-foreground">
                  ${studio.securityDeposit}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? "Sending request..." : "Send booking request"}
              <CalendarDays aria-hidden className="size-4" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
