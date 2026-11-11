import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session?.user) {
    const signInURL = new URL('/sign-in', request.url)

    const redirectTo =
      request.nextUrl.pathname + request.nextUrl.search

    signInURL.searchParams.set('redirect', redirectTo)

    return NextResponse.redirect(signInURL)
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    '/add-studio',
    '/my-listings',
    '/host-bookings',
    '/my-bookings',
    '/update-add/:id',
    '/Dashboard',
  ],
}