import type { Metadata } from "next"

import { PlaceholderPage } from "@/components/placeholder-page"

export const metadata: Metadata = {
  title: "List your space",
}

export default function ListYourSpacePage() {
  return (
    <PlaceholderPage
      title="List your space"
      description="Have a studio, loft, or production stage? Listing tools are on the way — tell us about your space and we'll help you find the right people."
    />
  )
}
