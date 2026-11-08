import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

import type { BookingStatus } from "@/lib/AllTypes"
import { auth } from "@/lib/auth"
import {
  getBookingsCollection,
  serializeBooking,
  type BookingDocument,
} from "@/lib/bookings"
import { getDb } from "@/lib/mongodb"

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/

function timeToMinutes(value: string) {
  const match = TIME_PATTERN.exec(value)

  if (!match) {
    return null
  }

  return Number(match[1]) * 60 + Number(match[2])
}

function isValidDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    return false
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const user = session?.user

    if (!user) {
      return NextResponse.json(
        { message: "Please sign in to request a booking." },
        { status: 401 }
      )
    }

    const body: unknown = await request.json().catch(() => null)

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid booking request." },
        { status: 400 }
      )
    }

    const { studioId, bookingDate, startTime, endTime } = body as Record<
      string,
      unknown
    >

    if (
      typeof studioId !== "string" ||
      !ObjectId.isValid(studioId) ||
      typeof bookingDate !== "string" ||
      !isValidDate(bookingDate) ||
      typeof startTime !== "string" ||
      !TIME_PATTERN.test(startTime) ||
      typeof endTime !== "string" ||
      !TIME_PATTERN.test(endTime)
    ) {
      return NextResponse.json(
        { message: "Please choose a valid date and time." },
        { status: 400 }
      )
    }

    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)

    if (
      startMinutes === null ||
      endMinutes === null ||
      endMinutes <= startMinutes
    ) {
      return NextResponse.json(
        { message: "The end time must be after the start time." },
        { status: 400 }
      )
    }

    const now = new Date()
    const today = new Date(now)
    today.setHours(0, 0, 0, 0)

    const selectedDate = new Date(`${bookingDate}T00:00:00`)

    if (selectedDate < today) {
      return NextResponse.json(
        { message: "Please choose a future date." },
        { status: 400 }
      )
    }

    if (selectedDate.getTime() === today.getTime()) {
      const selectedStart = new Date(selectedDate)
      selectedStart.setHours(
        Math.floor(startMinutes / 60),
        startMinutes % 60,
        0,
        0
      )

      if (selectedStart <= now) {
        return NextResponse.json(
          { message: "Please choose a time later today." },
          { status: 400 }
        )
      }
    }

    const db = await getDb()
    const studio = await db
      .collection("studio")
      .findOne({ _id: new ObjectId(studioId) })

    if (!studio) {
      return NextResponse.json(
        { message: "This studio could not be found." },
        { status: 404 }
      )
    }

    const hostEmail =
      typeof studio.hostEmail === "string" ? studio.hostEmail.toLowerCase() : ""

    if (hostEmail && hostEmail === user.email.toLowerCase()) {
      return NextResponse.json(
        { message: "You cannot book your own studio." },
        { status: 400 }
      )
    }

    const bookings = await getBookingsCollection()
    const overlappingBooking = await bookings.findOne({
      studioId,
      bookingDate,
      status: { $in: ["Pending", "Confirmed"] as BookingStatus[] },
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    })

    if (overlappingBooking) {
      return NextResponse.json(
        { message: "That time slot is already booked. Please choose another." },
        { status: 409 }
      )
    }

    const hourlyRate = Number(studio.hourlyRate ?? 0)
    const securityDeposit = Number(studio.securityDeposit ?? 0)
    const durationHours = (endMinutes - startMinutes) / 60
    const totalPrice = Math.round(durationHours * hourlyRate * 100) / 100

    const booking: BookingDocument = {
      studioId,
      studioTitle: String(studio.title ?? "Studio"),
      studioImage:
        typeof studio.imageUrl === "string" ? studio.imageUrl : undefined,
      studioLocation:
        typeof studio.location === "string" ? studio.location : undefined,
      userEmail: user.email.toLowerCase(),
      userName: user.name,
      bookingDate,
      startTime,
      endTime,
      totalPrice,
      securityDeposit,
      status: "Pending",
      createdAt: new Date(),
    }

    const result = await bookings.insertOne(booking)

    return NextResponse.json(
      serializeBooking({ ...booking, _id: result.insertedId }),
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { message: "Could not create the booking. Please try again." },
      { status: 500 }
    )
  }
}
