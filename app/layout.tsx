import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Dancing_Script, Lexend } from "next/font/google"
import "./globals.css"
import clsx from "clsx"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  weight: ['400', '700'],
})
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"],
})

export const metadata: Metadata = {
  title: "Sujal Choudhari - Art Gallery",
  description: "A curated collection of artistic works",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx(playfair.variable, dancingScript.variable, lexend.variable)}>
      <body className="font-serif antialiased">{children}</body>
    </html>
  )
}
