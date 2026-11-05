import type { StudioData } from "@/lib/AllTypes"

export const ALL_CATEGORIES_LABEL = "All spaces"

export const STUDIO_CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
] as const

export function getCategoryHref(category: string) {
  return `/Explore-Studios/Category/${encodeURIComponent(category)}`
}

export async function getStudios(): Promise<StudioData[]> {
  try {
    const response = await fetch("http://localhost:5000/studio", {
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
