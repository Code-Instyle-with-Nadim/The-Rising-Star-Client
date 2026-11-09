import type { ObjectId } from "mongodb"

import type { BookingData, BookingStatus } from "@/lib/AllTypes"
import { getDb } from "@/lib/mongodb"

const BACKEND_URL = (
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "https://the-rising-star-server.vercel.app"
).replace(/\/+$/, "")

export interface BookingDocument {
  _id?: ObjectId
  studioId: string
  studioTitle: string
  studioImage?: string
  studioLocation?: string
  hostEmail?: string
  hostName?: string
  userEmail: string
  userName: string
  bookingDate: string
  startTime: string
  endTime: string
  totalPrice: number
  securityDeposit?: number
  status: BookingStatus
  createdAt: Date | string
  updatedAt?: Date | string
}

type BookingWithId = Omit<BookingDocument, "_id"> & {
  _id: ObjectId | string
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

function isSelfBooking(booking: {
  userEmail: string
  hostEmail?: string
}): boolean {
  const hostEmail = booking.hostEmail?.trim().toLowerCase()
  const userEmail = booking.userEmail?.trim().toLowerCase()

  return Boolean(hostEmail && userEmail && hostEmail === userEmail)
}

export function serializeBooking(booking: BookingWithId): BookingData {
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
    hostEmail:
      typeof booking.hostEmail === "string" ? booking.hostEmail : undefined,
    hostName:
      typeof booking.hostName === "string" ? booking.hostName : undefined,
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
        : typeof booking.updatedAt === "string"
          ? booking.updatedAt
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
      .toArray()

    return documents
      .map(serializeBooking)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return []
  }
}

export async function getHostBookings(
  email: string
): Promise<BookingData[]> {
  try {
    const response = await fetch(
      `${BACKEND_URL}/bookings/${encodeURIComponent(email.toLowerCase())}`,
      { cache: "no-store" }
    )

    if (!response.ok) {
      return []
    }

    const data: unknown = await response.json()

    if (!Array.isArray(data)) {
      return []
    }

    return data
      .map((booking) => serializeBooking(booking as BookingWithId))
      .filter((booking) => !isSelfBooking(booking))
  } catch {
    return []
  }
}

export async function createBookingViaBackend(
  booking: Omit<BookingDocument, "_id">
): Promise<BookingData> {
  const response = await fetch(`${BACKEND_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Could not create the booking.")
  }

  const data = (await response.json().catch(() => null)) as {
    result?: { insertedId?: string }
    insertedId?: string
  } | null
  const insertedId = data?.result?.insertedId ?? data?.insertedId

  return serializeBooking({ ...booking, _id: insertedId ?? "" })
}

export async function updateBookingViaBackend(
  id: string,
  updates: Partial<Omit<BookingDocument, "_id">>
): Promise<void> {
  const response = await fetch(
    `${BACKEND_URL}/bookings/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Could not update the booking.")
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
