import { Plus_Jakarta_Sans, Spectral } from "next/font/google"

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
})

export const spectral = Spectral({
  subsets: ["latin"],
  variable: "--font-spectral",
  weight: ["500"], // Medium weight
  display: "swap",
})
