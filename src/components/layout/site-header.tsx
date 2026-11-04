import Link from "next/link"
import { headers } from "next/headers"

import { BrandLogo } from "@/components/layout/brand-logo"
import { MobileNav } from "@/components/layout/mobile-nav"
import { PrimaryNav } from "@/components/layout/primary-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"


import { auth } from "@/lib/auth"
import DialogPage from "./Dialog/page"




export async function SiteHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:h-24 lg:px-12">
        <BrandLogo priority />

        <PrimaryNav className="hidden lg:flex" />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />

          {session?.user ? (
         <>
         
         <DialogPage user={session.user} />
         </>
          ) : (
            <>
              <Button
                variant="ghost"
                nativeButton={false}
                render={<Link href="/sign-in" />}
                className="hidden h-9 rounded-full px-4 text-sm font-medium md:inline-flex"
              >
                Log in
              </Button>

              <Button
                nativeButton={false}
                render={<Link href="/sign-up" />}
                className="h-9 rounded-full bg-brand px-3 text-sm font-semibold text-brand-foreground shadow-sm hover:bg-brand/90 sm:px-5"
              >
                Get Started
              </Button>
            </>
          )}

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
