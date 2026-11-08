"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { XCircle } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type CancelBookingButtonProps = {
  bookingId: string
  studioTitle: string
}

export default function CancelBookingButton({
  bookingId,
  studioTitle,
}: CancelBookingButtonProps) {
  const router = useRouter()
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancel = async () => {
    if (isCancelling) {
      return
    }

    setIsCancelling(true)

    try {
      const response = await fetch(`/bookings/cancel/${bookingId}`, {
        method: "PATCH",
      })
      const result = (await response.json().catch(() => null)) as {
        message?: string
      } | null

      if (!response.ok) {
        throw new Error(result?.message || "Could not cancel the booking.")
      }

      toast.success("Booking cancelled.")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not cancel the booking. Please try again."
      )
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 rounded-md border-border/70 px-3 text-xs font-semibold"
          />
        }
      >
        <XCircle aria-hidden className="size-3.5" />
        Cancel booking
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
          <AlertDialogDescription>
            Your pending request for {studioTitle} will be cancelled. This
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isCancelling}>
            Keep booking
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={isCancelling}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isCancelling ? "Cancelling..." : "Yes, cancel booking"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
