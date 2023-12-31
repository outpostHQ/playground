"use client"

import React from "react"
import { useSession } from "next-auth/react"

import Text from "@/components/ui/text"
import Header from "@/components/sections/header"
import { OutpostLoginButton } from "@/components/sections/header/_components/auth"

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession()
  return (
    <div>
      <Header />

      {session.status === "authenticated" ? (
        <main className="h-screen overflow-hidden bg-subdued">{children}</main>
      ) : session.status === "loading" ? (
        <div className="grid min-h-screen place-items-center">
          <Text variant={"displayMedium"}>Loading...</Text>
        </div>
      ) : (
        <div className="g-3 grid min-h-screen content-center justify-center ">
          <div className="flex flex-col items-center justify-center gap-1">
            <OutpostLoginButton />
          </div>
        </div>
      )}
    </div>
  )
}
