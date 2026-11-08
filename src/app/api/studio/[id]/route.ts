import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

import { auth } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"

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
        { message: "Please sign in to update a studio." },
        { status: 401 }
      )
    }

    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid studio id." },
        { status: 400 }
      )
    }

    const body: unknown = await request.json().catch(() => null)

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid studio details." },
        { status: 400 }
      )
    }

    const fields = body as Record<string, unknown>
    const title = String(fields.title ?? "").trim()
    const category = String(fields.category ?? "").trim()
    const location = String(fields.location ?? "").trim()
    const overview = String(fields.overview ?? "").trim()
    const imageUrl = String(fields.imageUrl ?? "").trim()
    const maxCapacity = Number(fields.maxCapacity)
    const hourlyRate = Number(fields.hourlyRate)
    const securityDeposit = Number(fields.securityDeposit ?? 0)

    if (
      !title ||
      !category ||
      !location ||
      !overview ||
      !imageUrl ||
      !Number.isFinite(maxCapacity) ||
      maxCapacity < 1 ||
      !Number.isFinite(hourlyRate) ||
      hourlyRate < 0 ||
      !Number.isFinite(securityDeposit) ||
      securityDeposit < 0
    ) {
      return NextResponse.json(
        { message: "Please fill in all required studio details." },
        { status: 400 }
      )
    }

    const rawImages = Array.isArray(fields.images) ? fields.images : []
    const images = rawImages.filter(
      (image): image is string => typeof image === "string" && image.length > 0
    )
    const rawAmenities = Array.isArray(fields.amenities) ? fields.amenities : []
    const amenities = rawAmenities.filter(
      (amenity): amenity is string =>
        typeof amenity === "string" && amenity.length > 0
    )

    const db = await getDb()
    const studios = db.collection("studio")
    const studio = await studios.findOne({ _id: new ObjectId(id) })

    if (!studio) {
      return NextResponse.json(
        { message: "Studio not found." },
        { status: 404 }
      )
    }

    const hostEmail =
      typeof studio.hostEmail === "string" ? studio.hostEmail.toLowerCase() : ""

    if (!hostEmail || hostEmail !== user.email.toLowerCase()) {
      return NextResponse.json(
        { message: "You can only edit your own studio." },
        { status: 403 }
      )
    }

    await studios.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          category,
          maxCapacity,
          location,
          hourlyRate,
          securityDeposit,
          imageUrl,
          images: images.length > 0 ? images : [imageUrl],
          amenities,
          overview,
          updatedAt: new Date(),
        },
      }
    )

    return NextResponse.json({ message: "Studio updated successfully." })
  } catch {
    return NextResponse.json(
      { message: "Could not update the studio. Please try again." },
      { status: 500 }
    )
  }
}
