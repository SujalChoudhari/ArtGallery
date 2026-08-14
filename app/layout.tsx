import type React from "react";
import type { Metadata, Viewport } from "next";
import { Dancing_Script, Lexend, Playfair_Display } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { getArtPieceBySlug } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-serif",
});

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    variable: "--font-dancing-script",
    weight: ["400", "700"],
});

const lexend = Lexend({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["300", "400", "500", "700"],
});

const socialPiece = getArtPieceBySlug("kanheri-in-warli")!;
const ROOT_SOCIAL_IMAGE = getImageAsset(socialPiece.image).detail.path;

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
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        url: "https://art.sujal.xyz/",
        siteName: "Sujal Choudhari Art Gallery",
        title: "Sujal Choudhari - Art Gallery",
        description: "Drawings, paintings, and visual experiments by Sujal Choudhari.",
        images: [{ url: ROOT_SOCIAL_IMAGE, alt: "Lines & Feelings art gallery" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sujal Choudhari - Art Gallery",
        description: "Drawings, paintings, and visual experiments by Sujal Choudhari.",
        images: [ROOT_SOCIAL_IMAGE],
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={clsx(playfair.variable, dancingScript.variable, lexend.variable)}>
            <body className="font-serif antialiased">{children}</body>
        </html>
    );
}
