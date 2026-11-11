import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

import { auth } from "@/lib/auth"
import {
  getBookingsCollection,
  serializeBooking,
  updateBookingViaBackend,
} from "@/lib/bookings"

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const user = session?.user

    if (!user) {
      return NextResponse.json(
        { message: "Please sign in to cancel a booking." },
        { status: 401 }
      )
    }

    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid booking id." },
        { status: 400 }
      )
    }

    const bookings = await getBookingsCollection()
    const booking = await bookings.findOne({ _id: new ObjectId(id) })

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found." },
        { status: 404 }
      )
    }

    if (
      String(booking.userEmail ?? "").toLowerCase() !==
      user.email.toLowerCase()
    ) {
      return NextResponse.json(
        { message: "You can only cancel your own bookings." },
        { status: 403 }
      )
    }

    if (booking.status !== "Pending") {
      return NextResponse.json(
        { message: "Only pending bookings can be cancelled." },
        { status: 409 }
      )
    }

    const updatedAt = new Date()

    await updateBookingViaBackend(id, {
      status: "Cancelled",
      updatedAt,
    })

    return NextResponse.json(
      serializeBooking({ ...booking, status: "Cancelled", updatedAt })
    )
  } catch {
    return NextResponse.json(
      { message: "Could not cancel the booking. Please try again." },
      { status: 500 }
    )
  }
}
