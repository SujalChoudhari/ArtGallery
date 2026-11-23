import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import ArtworkImage from "@/components/ArtworkImage";
import { notFound } from "next/navigation";
import ArtworkCard from "@/components/ArtworkCard";
import ShareButton from "@/components/ShareButton";
import SiteHeader from "@/components/SiteHeader";
import {
    allArtPieces,
    getAdjacentArtPieces,
    getArtPieceBySlug,
    getLatestArtPieces,
} from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";

const SITE_URL = "https://art.sujal.xyz";

type ArtworkPageProps = {
    params: { slug: string };
};

export function generateStaticParams() {
    return allArtPieces.map((piece) => ({ slug: piece.slug }));
}

export function generateMetadata({ params }: ArtworkPageProps): Metadata {
    const piece = getArtPieceBySlug(params.slug);

    if (!piece) {
        return { title: "Artwork not found" };
    }

    const description = piece.thoughts ?? `${piece.title}, from the Lines & Feelings collection.`;
    const alt = piece.alt ?? piece.title;
    const imageAsset = getImageAsset(piece.image);
    const url = `${SITE_URL}/art/${piece.slug}`;

    return {
        title: piece.title,
        description,
        alternates: { canonical: `/art/${piece.slug}` },
        openGraph: {
            type: "article",
            title: piece.title,
            description,
            url,
            images: [{ url: imageAsset.detail.path, alt }],
        },
        twitter: {
            card: "summary_large_image",
            title: piece.title,
            description,
            images: [imageAsset.detail.path],
        },
    };
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
    const piece = getArtPieceBySlug(params.slug);

    if (!piece) {
        notFound();
    }

    const { previous, next } = getAdjacentArtPieces(piece.slug);
    const imageAsset = getImageAsset(piece.image);
    const relatedPieces = getLatestArtPieces(4, piece.slug);
    const canonicalUrl = `${SITE_URL}/art/${piece.slug}`;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        name: piece.title,
        image: `${SITE_URL}${piece.image}`,
        url: canonicalUrl,
        identifier: piece.id,
        ...(piece.thoughts ? { description: piece.thoughts } : {}),
    };

    return (
        <div className="min-h-screen overflow-x-clip bg-background text-foreground" data-mobile-shell="phone-first">
            <SiteHeader />
            <main className="gallery-frame pb-12 sm:pb-20">
                <article className="pt-5 sm:pt-12">
                    <div className="gallery-detail-grid">
                        <div className="gallery-detail-heading min-w-0">
                            <p className="font-sans text-xs uppercase tracking-[0.18em] text-foreground/65 sm:tracking-[0.28em]">Drawing no. {piece.id}</p>
                            <h1 className="mt-2 break-words text-[clamp(1.9rem,6.5vw,4.5rem)] leading-[1.05] sm:mt-4">{piece.title}</h1>
                        </div>
                        <div
                            className="artwork-detail-stage gallery-image-stage relative overflow-hidden border border-border"
                            data-mobile-artwork-stage="natural-aspect"
                            style={{ "--artwork-aspect-ratio": `${imageAsset.detail.width} / ${imageAsset.detail.height}` } as CSSProperties}
                        >
                            <ArtworkImage
                                asset={imageAsset}
                                alt={piece.alt ?? piece.title}
                                variant="detail"
                                priority
                                sizes="(min-width: 1024px) 65vw, calc(100vw - 2rem)"
                            />
                        </div>
                        <div className="gallery-detail-copy min-w-0">
                            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                                <ShareButton title={piece.title} url={canonicalUrl} />
                                <a
                                    href={piece.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 w-full items-center justify-center border border-foreground/20 px-4 font-sans text-xs uppercase tracking-[0.12em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background sm:w-auto sm:tracking-[0.16em]"
                                >
                                    Open original
                                </a>
                            </div>
                            {piece.thoughts && (
                                <div className="mt-8 border-l border-[#b91c1c] pl-4 sm:mt-12 sm:pl-7">
                                    <p className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-foreground/45">About this drawing</p>
                                    <blockquote className="font-sans text-[0.95rem] leading-relaxed text-foreground/70 sm:text-lg">
                                        {piece.thoughts}
                                    </blockquote>
                                </div>
                            )}
                        </div>
                    </div>
                </article>

                <nav className="mt-8 grid grid-cols-2 gap-2 border-y border-foreground/15 sm:mt-16" aria-label="Artwork navigation">
                    {previous ? (
                        <Link href={`/art/${previous.slug}`} className="group min-w-0 border-r border-foreground/15 px-1 py-3 sm:py-7 sm:pr-8">
                            <span className="inline-flex min-h-11 items-center font-sans text-xs uppercase tracking-[0.14em] text-foreground/45 sm:tracking-[0.18em] gap-2"><ArrowLeft size={16} aria-hidden="true" /> Previous work</span>
                            <span className="mt-2 block break-words font-sans text-sm font-semibold transition-transform group-hover:-translate-x-1 sm:mt-3 sm:text-3xl">{previous.title}</span>
                        </Link>
                    ) : <span className="block" />}
                    {next ? (
                        <Link href={`/art/${next.slug}`} className="group min-w-0 px-1 py-3 text-right sm:py-7 sm:pl-8">
                            <span className="inline-flex min-h-11 items-center font-sans text-xs uppercase tracking-[0.14em] text-foreground/45 sm:tracking-[0.18em] gap-2">Next work <ArrowRight size={16} aria-hidden="true" /></span>
                            <span className="mt-2 block break-words font-sans text-sm font-semibold transition-transform group-hover:translate-x-1 sm:mt-3 sm:text-3xl">{next.title}</span>
                        </Link>
                    ) : null}
                </nav>

                <section className="mt-14" aria-labelledby="related-title">
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-foreground/15 pb-4 sm:mb-8 sm:gap-6 sm:pb-5">
                        <div>
                            <h2 id="related-title" className="mt-2 text-3xl sm:text-4xl">More drawings</h2>
                        </div>
                        <Link href="/archive" className="inline-flex min-h-11 shrink-0 items-center font-sans text-xs uppercase tracking-[0.12em] underline underline-offset-4 sm:tracking-[0.16em]">View all</Link>
                    </div>
                    <div className="gallery-work-grid grid gap-4 lg:grid-cols-4">
                        {relatedPieces.map((relatedPiece) => (
                            <ArtworkCard key={relatedPiece.id} piece={relatedPiece} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="gallery-frame border-t border-border py-6">
                <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 font-sans text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    <Link href="/archive" className="underline underline-offset-4 transition-colors hover:text-foreground">Back to archive</Link>
                    <span>© Sujal Choudhari</span>
                </div>
            </footer>
            {/* Safe: jsonLd is built only from the static, locally-owned artwork record above. */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </div>
    );
}
