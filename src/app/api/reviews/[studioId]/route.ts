import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

import { auth } from "@/lib/auth"
import { createStudioReview } from "@/lib/reviews"
import { getStudio } from "@/lib/studios"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ studioId: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const user = session?.user

    if (!user) {
      return NextResponse.json(
        { message: "Please sign in to publish a review." },
        { status: 401 }
      )
    }

    const { studioId } = await params

    if (!ObjectId.isValid(studioId)) {
      return NextResponse.json(
        { message: "Invalid studio id." },
        { status: 400 }
      )
    }

    const body: unknown = await request.json().catch(() => null)

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid review details." },
        { status: 400 }
      )
    }

    const fields = body as Record<string, unknown>
    const rating = Number(fields.rating)
    const review = String(fields.review ?? "").trim()

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      review.length < 3 ||
      review.length > 1000
    ) {
      return NextResponse.json(
        { message: "Please choose a rating and write a short review." },
        { status: 400 }
      )
    }

    const studio = await getStudio(studioId)

    if (!studio) {
      return NextResponse.json(
        { message: "Studio not found." },
        { status: 404 }
      )
    }

    const hostEmail =
      typeof studio.hostEmail === "string" ? studio.hostEmail.toLowerCase() : ""

    if (hostEmail && hostEmail === user.email.toLowerCase()) {
      return NextResponse.json(
        { message: "You cannot review your own studio." },
        { status: 403 }
      )
    }

    const createdReview = await createStudioReview({
      studioId,
      userEmail: user.email,
      userName: user.name,
      rating,
      review,
    })

    return NextResponse.json(createdReview, { status: 201 })
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "You have already reviewed this studio."
    ) {
      return NextResponse.json(
        { message: error.message },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: "Could not publish the review. Please try again." },
      { status: 500 }
    )
  }
}
