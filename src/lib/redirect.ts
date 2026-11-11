const FALLBACK_REDIRECT = "/Explore-Studios"
const REDIRECT_ORIGIN = "https://app.local"

export function getSafeRedirectPath(value: string | null | undefined) {
  if (!value) {
    return FALLBACK_REDIRECT
  }

  try {
    const url = new URL(value, REDIRECT_ORIGIN)

    if (url.origin !== REDIRECT_ORIGIN) {
      return FALLBACK_REDIRECT
    }

    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return FALLBACK_REDIRECT
  }
}
