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
