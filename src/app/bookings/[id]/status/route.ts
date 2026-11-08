import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

import type { BookingStatus } from "@/lib/AllTypes"
import { auth } from "@/lib/auth"
import {
  getBookingsCollection,
  isBookingStatus,
  serializeBooking,
} from "@/lib/bookings"
import { getDb } from "@/lib/mongodb"

const allowedTransitions: Partial<Record<BookingStatus, BookingStatus[]>> = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Completed", "Cancelled"],
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const user = session?.user

    if (!user) {
      return NextResponse.json(
        { message: "Please sign in to manage booking requests." },
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

    const body: unknown = await request.json().catch(() => null)

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid booking update." },
        { status: 400 }
      )
    }

    const { status } = body as Record<string, unknown>

    if (!isBookingStatus(status)) {
      return NextResponse.json(
        { message: "Invalid booking status." },
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

    if (!ObjectId.isValid(booking.studioId)) {
      return NextResponse.json(
        { message: "This booking is linked to an invalid studio." },
        { status: 409 }
      )
    }

    const db = await getDb()
    const studio = await db
      .collection("studio")
      .findOne({ _id: new ObjectId(booking.studioId) })

    if (!studio) {
      return NextResponse.json(
        { message: "The studio for this booking could not be found." },
        { status: 404 }
      )
    }

    const hostEmail =
      typeof studio.hostEmail === "string" ? studio.hostEmail.toLowerCase() : ""

    if (!hostEmail || hostEmail !== user.email.toLowerCase()) {
      return NextResponse.json(
        { message: "You can only manage bookings for your own studios." },
        { status: 403 }
      )
    }

    const nextStatuses = allowedTransitions[booking.status]

    if (!nextStatuses?.includes(status)) {
      return NextResponse.json(
        {
          message: `A ${booking.status.toLowerCase()} booking cannot be marked as ${status.toLowerCase()}.`,
        },
        { status: 409 }
      )
    }

    const updatedBooking = await bookings.findOneAndUpdate(
      {
        _id: new ObjectId(id),
        status: booking.status,
      },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    )

    if (!updatedBooking) {
      return NextResponse.json(
        { message: "This booking was already updated. Please refresh." },
        { status: 409 }
      )
    }

    return NextResponse.json(serializeBooking(updatedBooking))
  } catch {
    return NextResponse.json(
      { message: "Could not update the booking. Please try again." },
      { status: 500 }
    )
  }
}
