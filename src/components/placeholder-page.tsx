import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="max-w-lg text-center">
        <p className="text-xs font-semibold tracking-[0.24em] text-highlight uppercase">
          The Rising Star
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {description}
        </p>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/" />}
          className="mt-8 rounded-full"
        >
          <ArrowLeft data-icon="inline-start" />
          Back to home
        </Button>
      </div>
    </main>
  )
}
