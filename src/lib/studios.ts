import type { StudioData } from "@/lib/AllTypes"
import { auth } from "./auth"
import { headers } from "next/headers"

const BACKEND_URL = (
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "https://the-rising-star-server.vercel.app"
).replace(/\/+$/, "")

export async function getStudios(): Promise<StudioData[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/studio`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    const data: unknown = await response.json()

    return Array.isArray(data) ? (data as StudioData[]) : []
  } catch {
    return []
  }
}

export async function getStudiosByHost(email: string): Promise<StudioData[]> {
  try {
    const JwtToken = await auth.api.getToken({
      headers: await headers(),
    })
    const response = await fetch(
      `${BACKEND_URL}/studio/${encodeURIComponent(email)}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${JwtToken.token}`,
        },
      }
    )

    if (!response.ok) {
      return []
    }

    const data: unknown = await response.json()

    return Array.isArray(data) ? (data as StudioData[]) : []
  } catch {
    return []
  }
}

export async function getStudio(id: string): Promise<StudioData | null> {
  try {
    const response = await fetch(
      `${BACKEND_URL}/studio-space/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    )

    if (!response.ok) {
      return null
    }

    const data: unknown = await response.json()

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return null
    }

    return data as StudioData
  } catch {
    return null
  }
}

export async function updateStudioViaBackend(
  id: string,
  updates: Partial<Omit<StudioData, "_id">> & { updatedAt?: string }
): Promise<void> {
  const JwtToken = await auth.api.getToken({
    headers: await headers()
  })
  const response = await fetch(
    `${BACKEND_URL}/studio/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JwtToken.token}`
      },
      body: JSON.stringify(updates),
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Could not update the studio.")
  }
}

export async function deleteStudioViaBackend(id: string): Promise<void> {
  const JwtToken = await auth.api.getToken({
    headers: await headers()
  })
  const response = await fetch(
    `${BACKEND_URL}/studio/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${JwtToken.token}`
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Could not delete the studio.")
  }
}
