import type { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import MyStudioListings from "@/components/layout/MyStudioListings"
import { auth } from "@/lib/auth"
import { getStudiosByHost } from "@/lib/studios"

export const metadata: Metadata = {
  title: "My studio listings",
  description: "Manage the creative spaces you host at The Rising Star.",
}

export default async function MyListingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const user = session?.user

  if (!user) {
    redirect("/sign-in")
  }

  const studios = await getStudiosByHost(user.email)
  return <MyStudioListings studios={studios} />
}
