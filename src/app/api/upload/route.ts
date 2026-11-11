import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"

const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload"
const MAX_FILE_SIZE = 32 * 1024 * 1024

export async function POST(request: Request) {
  try {
    const apiKey = process.env.IMAGE_BB_API

    if (!apiKey) {
      return NextResponse.json(
        { message: "Image upload is not configured." },
        { status: 500 }
      )
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return NextResponse.json(
        { message: "Please sign in to upload an image." },
        { status: 401 }
      )
    }

    const formData = await request.formData().catch(() => null)
    const file = formData?.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Please choose an image to upload." },
        { status: 400 }
      )
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files can be uploaded." },
        { status: 400 }
      )
    }

    if (file.size === 0) {
      return NextResponse.json(
        { message: "The selected image is empty." },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Images must be 32 MB or smaller." },
        { status: 400 }
      )
    }

    const image = Buffer.from(await file.arrayBuffer()).toString("base64")
    const uploadData = new FormData()
    uploadData.append("image", image)
    uploadData.append(
      "name",
      file.name.replace(/\.[^.]+$/, "").slice(0, 100) || "studio-image"
    )

    const response = await fetch(
      `${IMGBB_UPLOAD_URL}?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        body: uploadData,
        cache: "no-store",
      }
    )

    const result = (await response.json().catch(() => null)) as {
      data?: { url?: string; display_url?: string; thumb?: { url?: string } }
      error?: { message?: string }
      success?: boolean
    } | null

    if (!response.ok || !result?.success || !result.data?.url) {
      return NextResponse.json(
        {
          message:
            result?.error?.message ||
            "ImgBB could not upload the image. Please try again.",
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      url: result.data.url,
      displayUrl: result.data.display_url,
      thumbUrl: result.data.thumb?.url,
    })
  } catch {
    return NextResponse.json(
      { message: "Could not upload the image. Please try again." },
      { status: 500 }
    )
  }
}
