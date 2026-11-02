import type { Metadata } from "next"

import { PlaceholderPage } from "@/components/placeholder-page"

export const metadata: Metadata = {
  title: "Get started",
}

export default function GetStartedPage() {
  return (
    <PlaceholderPage
      title="Get started"
      description="Create your account and start discovering standout films and studios. Onboarding is on the way."
    />
  )
}
