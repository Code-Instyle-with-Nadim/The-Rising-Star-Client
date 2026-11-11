"use client"

import { useRouter } from "next/navigation"
import {
  Building2,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Plus,
} from "lucide-react"
import { toast } from "react-toastify"

import { authClient } from "@/lib/auth-client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

type UserDropdownProps = {
  user: {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    emailVerified: boolean
    name: string
    image?: string | null
  }
}

export default function DialogPage({ user }: UserDropdownProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut()

      if (error) {
        throw new Error(error.message || "Could not sign out.")
      }

      router.push("/sign-in")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not sign out. Please try again."
      )
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button type="button" className="rounded-full">
            <Avatar>
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </button>
        }
      />

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-1 py-1.5">
            <span className="font-semibold text-foreground">{user.name}</span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => router.push("/Dashboard")}>
            <LayoutDashboard />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/add-studio?new=1")}>
            <Plus />
            Add New Studio
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/my-listings")}>
            <Building2 />
            My Studio Listings
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/my-bookings")}>
            <CalendarDays />
            My Bookings
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/host-bookings")}>
            <ClipboardList />
            Host Booking Requests
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
