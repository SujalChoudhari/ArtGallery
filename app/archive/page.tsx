import Link from "next/link";
import type { Metadata } from "next";
import ArtworkCard from "@/components/ArtworkCard";
import SiteHeader from "@/components/SiteHeader";
import { latestArtPieces, getArtPieceBySlug } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";

const archivePiece = getArtPieceBySlug("kanheri-in-warli")!;
const archiveImage = getImageAsset(archivePiece.image);

export const metadata: Metadata = {
    title: "Archive",
    description: "Browse the complete collection of 78 drawings, paintings, and visual experiments by Sujal Choudhari.",
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
        <div className="min-h-screen overflow-x-clip bg-background text-foreground">
            <SiteHeader />
            <main className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 sm:pt-20 lg:px-12">
                <div className="max-w-3xl border-b border-foreground/15 pb-10">
                    <p className="font-sans text-xs uppercase tracking-[0.28em] text-foreground/50">Lines &amp; Feelings</p>
                    <h1 className="mt-4 text-5xl leading-[0.98] sm:text-7xl">The archive</h1>
                    <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-foreground/65 sm:text-lg">
                        Every documented work in one quiet, searchable place. Follow a title to spend more time with the image and the thoughts behind it.
                    </p>
                    <p className="mt-5 font-sans text-xs uppercase tracking-[0.18em] text-foreground/45">{latestArtPieces.length} works · newest first</p>
                </div>
                <section className="mt-14" aria-labelledby="archive-grid-title">
                    <h2 id="archive-grid-title" className="sr-only">All works</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {latestArtPieces.map((piece) => (
                            <ArtworkCard key={piece.id} piece={piece} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="border-t border-foreground/10 px-5 py-10 sm:px-8 lg:px-12">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 font-sans text-xs text-foreground/50">
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
