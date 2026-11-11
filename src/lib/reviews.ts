import { ObjectId } from "mongodb"

import { getDb } from "@/lib/mongodb"

export interface ReviewDocument {
  _id?: ObjectId
  studioId: string
  userEmail: string
  userName: string
  rating: number
  review: string
  createdAt: Date | string
}

export interface ReviewData {
  _id: string
  studioId: string
  userName: string
  rating: number
  review: string
  createdAt: string
}

function serializeReview(review: ReviewDocument & { _id: ObjectId | string }) {
  return {
    _id: review._id.toString(),
    studioId: String(review.studioId ?? ""),
    userName: String(review.userName ?? "Creator"),
    rating: Number(review.rating ?? 0),
    review: String(review.review ?? ""),
    createdAt:
      review.createdAt instanceof Date
        ? review.createdAt.toISOString()
        : String(review.createdAt ?? ""),
  } satisfies ReviewData
}

export async function getStudioReviews(
  studioId: string
): Promise<ReviewData[]> {
  if (!ObjectId.isValid(studioId)) {
    return []
  }

  try {
    const db = await getDb()
    const documents = await db
      .collection<ReviewDocument>("reviews")
      .find({ studioId })
      .sort({ createdAt: -1 })
      .toArray()

    return documents.map((document) =>
      serializeReview(document as ReviewDocument & { _id: ObjectId })
    )
  } catch {
    return []
  }
}

export async function createStudioReview(input: {
  studioId: string
  userEmail: string
  userName: string
  rating: number
  review: string
}): Promise<ReviewData> {
  const db = await getDb()
  const reviews = db.collection<ReviewDocument>("reviews")
  const userEmail = input.userEmail.toLowerCase()
  const existingReview = await reviews.findOne({
    studioId: input.studioId,
    userEmail,
  })

  if (existingReview) {
    throw new Error("You have already reviewed this studio.")
  }

  const document: ReviewDocument = {
    studioId: input.studioId,
    userEmail,
    userName: input.userName || "Creator",
    rating: input.rating,
    review: input.review,
    createdAt: new Date(),
  }
  const result = await reviews.insertOne(document)
  const allReviews = await reviews.find({ studioId: input.studioId }).toArray()
  const averageRating =
    allReviews.reduce((total, review) => total + review.rating, 0) /
    allReviews.length

  await db.collection("studio").updateOne(
    { _id: new ObjectId(input.studioId) },
    {
      $set: {
        rating: Number(averageRating.toFixed(2)),
        reviewCount: allReviews.length,
      },
    }
  )

  return serializeReview({ ...document, _id: result.insertedId })
}
