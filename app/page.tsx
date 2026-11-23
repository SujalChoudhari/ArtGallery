import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ArtworkCard from "@/components/ArtworkCard";
import ArtworkImage from "@/components/ArtworkImage";
import SiteHeader from "@/components/SiteHeader";
import { allArtPieces, chronologicalArtPieces, getArtPieceBySlug, getLatestArtPieces } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";

const heroPiece = chronologicalArtPieces[0];
const heroAsset = getImageAsset(heroPiece.image);
const selectedWorks = [
    "amaze-amaze-amaze",
    "tree-at-sunset",
    "goku",
    "what-fades-feels-real",
    "the-display",
    "oranges",
].map((slug) => {
    const piece = getArtPieceBySlug(slug);
    if (!piece) throw new Error(`Unknown homepage artwork: ${slug}`);
    return piece;
});
const recentWorks = getLatestArtPieces(6);

export default function HomePage() {
    return (
        <>
            <SiteHeader />
            <main className="gallery-frame">
                <section className="grid min-w-0 items-center gap-5 border-b border-border py-5 sm:gap-8 sm:py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14" aria-labelledby="gallery-title">
                    <div className="min-w-0">
                        <h1 id="gallery-title" className="text-balance text-[clamp(2.25rem,8.5vw,6.5rem)] leading-[0.92]">
                            Lines <span className="gallery-accent">&amp;</span> Feelings
                        </h1>
                        <p className="mt-3 max-w-sm text-sm sm:mt-5 sm:text-base leading-relaxed text-foreground/70">
                            Drawings, paintings, and visual experiments by Sujal Choudhari.
                        </p>
                        <div className="gallery-hero-actions mt-4 flex flex-wrap gap-2 sm:mt-6">
                            <Link href="/archive" className="gallery-action gallery-action-primary">
                                Browse archive <ArrowUpRight size={16} aria-hidden="true" />
                            </Link>
                            <a href="#selected-works" className="gallery-action">
                                Featured <ArrowDown size={16} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                    <Link href={`/art/${heroPiece.slug}`} className="gallery-card group">
                        <figure>
                            <div className="gallery-hero-image gallery-image-stage relative aspect-[4/3] overflow-hidden">
                                <ArtworkImage asset={heroAsset} alt={heroPiece.alt ?? heroPiece.title} variant="detail" priority sizes="(min-width: 1024px) 55vw, 100vw" />
                            </div>
                            <figcaption className="gallery-caption">
                                <span>{heroPiece.title}</span>
                                <ArrowUpRight size={18} aria-hidden="true" />
                            </figcaption>
                        </figure>
                    </Link>
                </section>

                <section id="selected-works" className="scroll-mt-6 py-8 sm:py-14" aria-labelledby="selected-title">
                    <div className="gallery-section-heading">
                        <h2 id="selected-title" className="text-3xl sm:text-5xl">Featured</h2>
                        <Link href="/archive" className="gallery-action">
                            All {allArtPieces.length} works <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                    <div className="gallery-work-grid grid gap-4 lg:grid-cols-3">
                        {selectedWorks.map((piece) => <ArtworkCard key={piece.id} piece={piece} />)}
                    </div>
                </section>

                <section className="border-t border-border py-8 sm:py-14" aria-labelledby="recent-title">
                    <div className="gallery-section-heading">
                        <h2 id="recent-title" className="text-3xl sm:text-5xl">Recent Works</h2>
                    </div>
                    <div className="gallery-work-grid grid gap-4 lg:grid-cols-3">
                        {recentWorks.map((piece) => <ArtworkCard key={piece.id} piece={piece} />)}
                    </div>
                </section>
            </main>
            <footer className="gallery-frame border-t border-border py-6 text-sm text-foreground/65">
                © Sujal Choudhari
            </footer>
        </>
    );
}
