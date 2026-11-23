import Link from "next/link";
import type { Metadata } from "next";
import ArtworkCard from "@/components/ArtworkCard";
import SiteHeader from "@/components/SiteHeader";
import { allArtPieces, latestArtPieces, getArtPieceBySlug } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";

const archivePiece = getArtPieceBySlug("kanheri-in-warli")!;
const archiveImage = getImageAsset(archivePiece.image);

export const metadata: Metadata = {
    title: "Archive",
    description: `Browse the complete collection of ${allArtPieces.length} drawings, paintings, and visual experiments by Sujal Choudhari.`,
    alternates: { canonical: "/archive" },
    openGraph: {
        title: "Archive | Sujal Choudhari Art",
        description: "Browse the complete Lines & Feelings collection.",
        url: "/archive",
        images: [{ url: archiveImage.detail.path, alt: "Lines & Feelings archive" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Archive | Sujal Choudhari Art",
        description: "Browse the complete Lines & Feelings collection.",
        images: [archiveImage.detail.path],
    },
};

export default function ArchivePage() {
    return (
        <div className="min-h-screen overflow-x-clip bg-background text-foreground" data-mobile-shell="phone-first">
            <SiteHeader />
            <main className="gallery-frame pb-12 pt-8 sm:pb-20 sm:pt-12">
                <div className="max-w-3xl border-b border-foreground/15 pb-8 sm:pb-10">
                    <h1 className="text-4xl leading-[0.98] sm:text-7xl">Archive</h1>
                    <p className="mt-4 font-sans text-xs uppercase tracking-[0.14em] text-foreground/45 sm:mt-5 sm:tracking-[0.18em]">{latestArtPieces.length} works</p>
                </div>
                <section className="mt-6 sm:mt-10" aria-labelledby="archive-grid-title">
                    <h2 id="archive-grid-title" className="sr-only">All works</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {latestArtPieces.map((piece) => (
                            <ArtworkCard key={piece.id} piece={piece} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="gallery-frame border-t border-border py-6">
                <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 font-sans text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    <LinkBackHome />
                    <span>© Sujal Choudhari</span>
                </div>
            </footer>
        </div>
    );
}

function LinkBackHome() {
    return <Link href="/" className="underline underline-offset-4 transition-colors hover:text-foreground">Back home</Link>;
}
