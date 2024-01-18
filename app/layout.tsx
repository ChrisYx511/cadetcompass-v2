import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Provider from "./(components)/client-provider"
import { initializeSession } from "@/lib/services/session"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CadetCompass v2",
  description: "(BETA) The cadet dashboard",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await initializeSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  )
}
