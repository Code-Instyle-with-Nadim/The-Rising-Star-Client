import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "List your space",
}

export default function ListYourSpacePage() {
  redirect("/add-studio?new=1")
}
