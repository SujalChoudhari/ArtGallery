import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import WorksForSaleExplorer from "@/components/WorksForSaleExplorer";
import { allArtPieces, availableArtPieces } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";

const heroPiece = availableArtPieces[0] || allArtPieces[0];
const heroImage = getImageAsset(heroPiece.image);

export const metadata: Metadata = {
    title: "Available Works & Originals for Sale",
    description: "Browse original hand-drawn works, sketches, and paintings for sale by Sujal Choudhari. Direct inquiries handled via WhatsApp.",
    alternates: { canonical: "/available" },
    openGraph: {
        title: "Available Works & Originals | Sujal Choudhari Art",
        description: "Browse original hand-drawn artworks and sketches with stories and listed prices.",
        url: "/available",
        images: [{ url: heroImage.detail.path, alt: "Sujal Choudhari works for sale" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Available Works & Originals | Sujal Choudhari Art",
        description: "Browse original hand-drawn artworks and sketches with stories and listed prices.",
        images: [heroImage.detail.path],
    },
};

export default function AvailablePage() {
    return (
        <div className="min-h-screen overflow-x-clip bg-background text-foreground" data-mobile-shell="phone-first">
            <SiteHeader />
            <main className="gallery-frame pb-16 pt-6 sm:pb-24 sm:pt-12">
                {/* Hero Header */}
                <div className="border-b border-foreground/15 pb-6 sm:pb-10">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/50">
                                Original Physical Artworks
                            </p>
                            <h1 className="mt-2 text-4xl leading-[0.98] sm:text-6xl font-serif">
                                Works for Sale
                            </h1>
                        </div>
                        <p className="font-sans text-xs uppercase tracking-[0.14em] text-foreground/50 sm:text-right">
                            {availableArtPieces.length} available originals • {allArtPieces.length} catalogued
                        </p>
                    </div>

                    <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-foreground/70 sm:mt-5 sm:text-base">
                        Every drawing is an original, hand-created physical work on paper or canvas. Click on{" "}
                        <strong className="text-foreground">Inquire via WhatsApp</strong> to start a direct conversation with Sujal, pre-filled with the artwork reference and direct link.
                    </p>

                    <div className="mt-5 inline-flex flex-wrap items-center gap-3 rounded-none border border-foreground/15 bg-foreground/[0.02] px-4 py-2.5 font-sans text-xs text-foreground/75">
                        <span className="font-semibold text-foreground">💡 Pricing & Purchasing:</span>
                        <span>Prices include a 40% negotiation buffer and domestic packaging. Inquire directly to discuss framing or custom delivery.</span>
                    </div>
                </div>

                {/* Explorer Section */}
                <section className="mt-8 sm:mt-12" aria-labelledby="works-catalog-title">
                    <h2 id="works-catalog-title" className="sr-only">Available Artworks Catalog</h2>
                    <WorksForSaleExplorer pieces={allArtPieces} />
                </section>
            </main>

            <footer className="gallery-frame border-t border-border py-6">
                <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 font-sans text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="underline underline-offset-4 transition-colors hover:text-foreground">Back home</Link>
                        <Link href="/archive" className="underline underline-offset-4 transition-colors hover:text-foreground">View full archive</Link>
                    </div>
                    <span>© Sujal Choudhari</span>
                </div>
            </footer>
        </div>
    );
}
