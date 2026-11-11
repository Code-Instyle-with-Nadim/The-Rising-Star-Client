"use client"

import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUpRight, Lock, Mail } from "lucide-react"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { getSafeRedirectPath } from "@/lib/redirect"

const SignInForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectTo = searchParams.get("redirect")
  const callbackURL = getSafeRedirectPath(redirectTo)
  const signUpHref = redirectTo
    ? `/sign-up?callbackURL=${encodeURIComponent(callbackURL)}`
    : "/sign-up"

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const data = Object.fromEntries(formData.entries()) as {
        email: string
        password: string
      }

      const { data: resData, error } = await authClient.signIn.email({
        ...data,
        callbackURL,
      })

      if (error) {
        throw new Error(error.message || "Could not sign in. Please try again.")
      }

      if (resData) {
        toast.success(`Welcome back, ${resData.user.name}`)
        router.push(callbackURL)
        router.refresh()
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not sign in. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const signInGoogle = async () => {
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      })

      if (error) {
        throw new Error(error.message || "Could not sign in with Google.")
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not sign in with Google. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="grid flex-1 lg:grid-cols-2">
      <div className="relative hidden min-h-[calc(100dvh-5rem)] overflow-hidden lg:block lg:min-h-[calc(100dvh-6rem)]">
        <Image
          src="/assets/hero-1.jpg"
          alt="A light-filled studio hallway with glass partitions"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15" />

        <div className="absolute inset-0 flex flex-col justify-end p-10 text-white xl:p-14">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            Studio Notes — 002
          </p>
          <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.02em] xl:text-6xl">
            Big things
            <br />
            happen in the
            <br />
            <span className="text-brand italic">right space.</span>
          </h2>
        </div>
      </div>

      <div className="flex justify-center bg-background px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="w-full max-w-[27rem]">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-highlight" />
            Welcome back
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-6xl">
            Make yourself
            <br />
            <span className="text-highlight italic">at home.</span>
          </h1>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Sign in to manage your bookings and studio listings.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-4"
          >
           

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold">
                Email address
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-11 rounded-md bg-card pl-10"
                />
              </div>
            </div>

       

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold">
                Password
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  autoComplete="current-password"
                  required
                  className="h-11 rounded-md bg-card pl-10"
                />
              </div>
            </div>
            <Link
              href={signUpHref}
              className="font-semibold text-foreground underline-offset-4 hover:underline  mb-2"
            >
              Forgot Password ?
            </Link>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-sm bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
              <ArrowUpRight className="size-4" />
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Or continue with
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            onClick={signInGoogle}
            type="button"
            variant="outline"
            disabled={isSubmitting}
            className="h-11 w-full rounded-md border-border bg-transparent text-sm font-medium hover:bg-muted/60"
          >
            <Icon icon="devicon:google" className="size-4" />
            Sign in with Google
          </Button>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Do not have any account?{" "}
            <Link
              href={signUpHref}
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

function SignInPageFallback() {
  return (
    <main className="grid flex-1 place-items-center bg-background px-4 py-12">
      <p className="text-sm text-muted-foreground">Loading...</p>
    </main>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInPageFallback />}>
      <SignInForm />
    </Suspense>
  )
}
