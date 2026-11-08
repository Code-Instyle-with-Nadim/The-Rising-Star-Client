import type { Metadata } from "next"
import { headers } from "next/headers"
import { notFound, redirect } from "next/navigation"

import AddStudioFrom from "@/components/layout/Add-Studio-from"
import { auth } from "@/lib/auth"
import { getStudio } from "@/lib/studios"

export const metadata: Metadata = {
  title: "Edit studio",
  description: "Update the details of your studio listing.",
}

export default async function UpdateStudioPage({
  params,
}: PageProps<"/update-add/[id]">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const user = session?.user

  if (!user) {
    redirect("/sign-in")
  }

  const { id } = await params
  const studio = await getStudio(id)

  if (!studio) {
    notFound()
  }

  if (
    studio.hostEmail &&
    studio.hostEmail.toLowerCase() !== user.email.toLowerCase()
  ) {
    notFound()
  }

  return <AddStudioFrom user={user} studio={studio} />
}
