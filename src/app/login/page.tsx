import type { Metadata } from "next"

import { PlaceholderPage } from "@/components/placeholder-page"

export const metadata: Metadata = {
  title: "Log in",
}

export default function LoginPage() {
  return (
    <PlaceholderPage
      title="Log in"
      description="Authentication is coming soon. For now, explore The Rising Star as a guest — your next favourite film is waiting."
    />
  )
}
