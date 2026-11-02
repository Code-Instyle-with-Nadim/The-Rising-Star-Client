"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { BrandLogo } from "@/components/layout/brand-logo"
import { PrimaryNav } from "@/components/layout/primary-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className={cn("rounded-full lg:hidden", className)}
          />
        }
      >
        <Menu />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="max-w-[88vw] gap-0 p-0 data-[side=right]:w-80"
      >
        <SheetHeader className="border-b px-5 py-4">
          <BrandLogo onClick={close} />
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation and account actions
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          <PrimaryNav variant="mobile" onNavigate={close} />

          <div className="mt-6 flex items-center justify-between rounded-lg px-3 py-2">
            <span className="text-sm font-medium text-muted-foreground">
              Theme
            </span>
            <ThemeToggle />
          </div>

          <div className="mt-auto flex flex-col gap-2 border-t pt-4">
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/login" onClick={close} />}
              className="h-10 w-full rounded-full"
            >
              Log in
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/get-started" onClick={close} />}
              className="h-10 w-full rounded-full bg-brand text-brand-foreground shadow-sm hover:bg-brand/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
