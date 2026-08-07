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
  metadataBase: new URL("https://art.sujal.xyz"),
  title: {
    default: "Sujal Choudhari - Art Gallery",
    template: "%s | Sujal Choudhari Art",
  },
  description: "A curated collection of Sujal Choudhari's drawings, paintings, and visual experiments.",
  keywords: ["Sujal Choudhari", "art gallery", "drawings", "paintings", "watercolor", "Mumbai"],
  authors: [{ name: "Sujal Choudhari", url: "https://sujal.xyz/" }],
  creator: "Sujal Choudhari",
  alternates: { canonical: "https://art.sujal.xyz/" },
  openGraph: {
    type: "website",
    url: "https://art.sujal.xyz/",
    siteName: "Sujal Choudhari Art Gallery",
    title: "Sujal Choudhari - Art Gallery",
    description: "Drawings, paintings, and visual experiments by Sujal Choudhari.",
    images: [{ url: "/hero/art.png", alt: "Sujal Choudhari Art Gallery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujal Choudhari - Art Gallery",
    description: "Drawings, paintings, and visual experiments by Sujal Choudhari.",
    images: ["/og-image.png"],
  },
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
