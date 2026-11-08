import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { getBookingsByEmail } from "@/lib/bookings"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const user = session?.user

    if (!user) {
      return NextResponse.json(
        { message: "Please sign in to view your bookings." },
        { status: 401 }
      )
    }

    const { email } = await params
    const requestedEmail = decodeURIComponent(email)

    if (requestedEmail.toLowerCase() !== user.email.toLowerCase()) {
      return NextResponse.json(
        { message: "You can only view your own bookings." },
        { status: 403 }
      )
    }

    const bookings = await getBookingsByEmail(user.email)

    return NextResponse.json(bookings)
  } catch {
    return NextResponse.json(
      { message: "Could not load bookings. Please try again." },
      { status: 500 }
    )
  }
}
