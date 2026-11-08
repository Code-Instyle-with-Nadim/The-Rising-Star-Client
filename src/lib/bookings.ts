import type { ObjectId, WithId } from "mongodb"

import type { BookingData, BookingStatus } from "@/lib/AllTypes"
import { getDb } from "@/lib/mongodb"

export interface BookingDocument {
  _id?: ObjectId
  studioId: string
  studioTitle: string
  studioImage?: string
  studioLocation?: string
  userEmail: string
  userName: string
  bookingDate: string
  startTime: string
  endTime: string
  totalPrice: number
  securityDeposit?: number
  status: BookingStatus
  createdAt: Date
  updatedAt?: Date
}

const BOOKING_STATUSES: BookingStatus[] = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
]

export function isBookingStatus(value: unknown): value is BookingStatus {
  return (
    typeof value === "string" &&
    BOOKING_STATUSES.includes(value as BookingStatus)
  )
}

export function serializeBooking(
  booking: WithId<BookingDocument> | (BookingDocument & { _id: ObjectId })
): BookingData {
  return {
    _id: booking._id.toString(),
    studioId: String(booking.studioId ?? ""),
    studioTitle: String(booking.studioTitle ?? "Studio"),
    studioImage:
      typeof booking.studioImage === "string" ? booking.studioImage : undefined,
    studioLocation:
      typeof booking.studioLocation === "string"
        ? booking.studioLocation
        : undefined,
    userEmail: String(booking.userEmail ?? ""),
    userName: String(booking.userName ?? ""),
    bookingDate: String(booking.bookingDate ?? ""),
    startTime: String(booking.startTime ?? ""),
    endTime: String(booking.endTime ?? ""),
    totalPrice: Number(booking.totalPrice ?? 0),
    securityDeposit:
      booking.securityDeposit === undefined
        ? undefined
        : Number(booking.securityDeposit),
    status: isBookingStatus(booking.status) ? booking.status : "Pending",
    createdAt:
      booking.createdAt instanceof Date
        ? booking.createdAt.toISOString()
        : String(booking.createdAt ?? ""),
    updatedAt:
      booking.updatedAt instanceof Date
        ? booking.updatedAt.toISOString()
        : undefined,
  }
}

export async function getBookingsCollection() {
  const db = await getDb()
  return db.collection<BookingDocument>("bookings")
}

export async function getBookingsByEmail(
  email: string
): Promise<BookingData[]> {
  try {
    const bookings = await getBookingsCollection()
    const documents = await bookings
      .find({ userEmail: email.toLowerCase() })
      .sort({ createdAt: -1 })
      .toArray()

    return documents.map(serializeBooking)
  } catch {
    return []
  }
}

export function formatBookingDate(value: string) {
  const parts = value.split("-").map(Number)

  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return value
  }

  const [year, month, day] = parts
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatBookingTime(value: string) {
  const parts = value.split(":").map(Number)

  if (parts.length !== 2 || parts.some((part) => Number.isNaN(part))) {
    return value
  }

  const [hours, minutes] = parts
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
}

export function formatBookingTotal(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0)
}
