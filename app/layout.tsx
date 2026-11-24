import type React from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import clsx from "clsx";
import "./globals.css";
import { allArtPieces, getArtPieceBySlug } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";

const playfair = localFont({
    src: "./fonts/playfair-display-latin.woff2",
    weight: "400 900",
    display: "swap",
    variable: "--font-serif",
});

const dancingScript = localFont({
    src: "./fonts/dancing-script-latin.woff2",
    weight: "400 700",
    display: "swap",
    variable: "--font-dancing-script",
});

const lexend = localFont({
    src: "./fonts/lexend-latin.woff2",
    weight: "300 700",
    display: "swap",
    variable: "--font-gallery-fallback",
});

const socialPiece = getArtPieceBySlug("kanheri-in-warli") ?? allArtPieces[0];
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
            <body className="font-sans antialiased">{children}</body>
        </html>
    );
}
