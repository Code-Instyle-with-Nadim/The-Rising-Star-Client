"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { Check, CheckCheck, XCircle } from "lucide-react"

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
import type { BookingStatus } from "@/lib/AllTypes"
import { authClient } from "@/lib/auth-client"

type HostBookingActionsProps = {
  bookingId: string
  status: BookingStatus
}

const successMessages: Partial<Record<BookingStatus, string>> = {
  Confirmed: "Booking confirmed.",
  Completed: "Booking marked as completed.",
  Cancelled: "Booking cancelled.",
}

export default function HostBookingActions({
  bookingId,
  status,
}: HostBookingActionsProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateStatus = async (nextStatus: BookingStatus) => {
    if (isUpdating) {
      return
    }

    setIsUpdating(true)

    try {
      const { data: JwtToken } = await authClient.token()
      const token = JwtToken?.token
      const response = await fetch(`/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus }),
      })
      const result = (await response.json().catch(() => null)) as {
        message?: string
      } | null

      if (!response.ok) {
        throw new Error(result?.message || "Could not update the booking.")
      }

      toast.success(successMessages[nextStatus] ?? "Booking updated.")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update the booking. Please try again."
      )
    } finally {
      setIsUpdating(false)
    }
  }

  if (status !== "Pending" && status !== "Confirmed") {
    return null
  }

  const isPending = status === "Pending"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        size="sm"
        disabled={isUpdating}
        onClick={() => updateStatus(isPending ? "Confirmed" : "Completed")}
        className="h-9 rounded-md px-3 text-xs font-semibold"
      >
        {isPending ? (
          <Check aria-hidden className="size-3.5" />
        ) : (
          <CheckCheck aria-hidden className="size-3.5" />
        )}
        {isPending ? "Confirm booking" : "Mark completed"}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUpdating}
              className="h-9 rounded-md border-border/70 px-3 text-xs font-semibold text-destructive"
            />
          }
        >
          <XCircle aria-hidden className="size-3.5" />
          {isPending ? "Decline" : "Cancel booking"}
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isPending ? "Decline this request?" : "Cancel this booking?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isPending
                ? "The creator will see that their booking request was declined."
                : "The creator will see that their confirmed booking was cancelled."}{" "}
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>
              Keep booking
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => updateStatus("Cancelled")}
              disabled={isUpdating}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isUpdating
                ? "Updating..."
                : isPending
                  ? "Yes, decline"
                  : "Yes, cancel booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
