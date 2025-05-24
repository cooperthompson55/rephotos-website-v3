import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { plusJakartaSans, spectral } from "@/lib/fonts"
import { MainNav } from "@/components/navigation/MainNav"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Re | Real Estate Photography & Marketing",
  description: "Premium photography, videography, aerials, websites, and more for real estate",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spectral.variable}`}>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col">
        <MainNav />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
