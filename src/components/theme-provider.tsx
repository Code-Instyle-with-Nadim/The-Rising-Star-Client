"use client"

import type { ComponentProps } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  // next-themes renders an inline <script> that applies the theme before paint.
  // The server copy must stay executable, but if React re-creates it on the
  // client (remounts, Fast Refresh) it can never execute and React 19 warns
  // about it. A non-JavaScript type marks the client copy as a data block,
  // which React skips without warning. See next-themes#397.
  const scriptType =
    typeof window === "undefined" ? "text/javascript" : "application/json"

  return (
    <NextThemesProvider {...props} scriptProps={{ type: scriptType }}>
      {children}
    </NextThemesProvider>
  )
}
