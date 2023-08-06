import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"
import "@/styles/search.css"
import "@/styles/tokens.css"

import { ThemeProvider } from "@/components/providers/theme-provider"

import Mounted from "./mounted"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Outpost playground",
  description: "Outpost Ai playground",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider>
          <Mounted>{children}</Mounted>
        </ThemeProvider>
      </body>
    </html>
  )
}
