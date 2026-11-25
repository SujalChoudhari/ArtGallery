import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import WorksForSaleExplorer from "@/components/WorksForSaleExplorer";
import { allArtPieces, availableArtPieces } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";

const heroPiece = availableArtPieces[0] || allArtPieces[0];
const heroImage = getImageAsset(heroPiece.image);

export const metadata: Metadata = {
    title: "Works for Sale | Sujal Choudhari Art",
    description: "Browse original hand-drawn works, paintings, and studio sketches available for sale and inquiry directly with Sujal Choudhari.",
    alternates: { canonical: "/sale" },
    openGraph: {
        title: "Works for Sale | Sujal Choudhari Art",
        description: "Browse original hand-drawn artworks and sketches with stories and listed prices.",
        url: "/sale",
        images: [{ url: heroImage.detail.path, alt: "Sujal Choudhari works for sale" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Works for Sale | Sujal Choudhari Art",
        description: "Browse original hand-drawn artworks and sketches with stories and listed prices.",
        images: [heroImage.detail.path],
    },
};

export default function SalePage() {
    return (
        <div className="min-h-screen overflow-x-clip bg-background text-foreground" data-mobile-shell="phone-first">
            <SiteHeader />
            <main className="gallery-frame pb-12 pt-5 sm:pb-20 sm:pt-12">
                <div className="max-w-3xl border-b border-foreground/15 pb-4 sm:pb-10">
                    <h1 className="text-4xl leading-[0.98] sm:text-7xl">Works for Sale</h1>
                </div>

                <section className="mt-6 sm:mt-10" aria-labelledby="works-catalog-title">
                    <h2 id="works-catalog-title" className="sr-only">Works for Sale</h2>
                    <WorksForSaleExplorer pieces={allArtPieces} />
                </section>
            </main>

            <footer className="gallery-frame border-t border-border py-6">
                <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 font-sans text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="underline underline-offset-4 transition-colors hover:text-foreground">Back home</Link>
                    </div>
                    <span>© Sujal Choudhari</span>
                </div>
            </footer>
        </div>
    );
}
