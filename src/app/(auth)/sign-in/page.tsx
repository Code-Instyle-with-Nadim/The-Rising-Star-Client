"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

const SignInPage = () => {
    const router = useRouter()
     const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries())as {email:string,password:string}
  const { data:resData, error } = await authClient.signIn.email({
        ...data,
      })
      if(resData){
        toast.success(`${resData.user.name}Successfully Done the Registation`)
        router.push("/feature")
        router.refresh()
  
      }
      
    };
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              Welcome back
            </span>

            <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.02em]">
              Sign in to your <span className="text-highlight italic">account</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your details to continue to The Rising Star.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-highlight underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="h-10"
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full rounded-lg bg-brand text-sm font-semibold text-brand-foreground hover:bg-brand/90"
            >
              Login
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Or continue with
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            className="h-10 w-full rounded-lg bg-brand text-sm font-semibold text-brand-foreground hover:bg-brand/90"
            variant="default"
          >
            <Icon icon="devicon:google" />
            Sign in with Google
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  )
}

export default SignInPage
