import Link from "next/link";
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
            images: [{ url: imageAsset.detail.path, alt: piece.title }],
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
            <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-8 sm:pb-24 lg:px-12">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/15 py-3 font-sans text-[0.68rem] uppercase tracking-[0.12em] text-foreground/55 sm:gap-4 sm:py-5 sm:text-xs sm:tracking-[0.16em]">
                    <Link href="/archive" className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">← Back to archive</Link>
                    <span>Work {piece.id}</span>
                </div>

                <article className="pt-6 sm:pt-16">
                    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-16">
                        <div
                            className="artwork-detail-stage relative overflow-hidden bg-zinc-100"
                            data-mobile-artwork-stage="natural-aspect"
                            style={{ "--artwork-aspect-ratio": `${imageAsset.detail.width} / ${imageAsset.detail.height}` } as CSSProperties}
                        >
                            <ArtworkImage
                                asset={imageAsset}
                                alt={piece.title}
                                variant="detail"
                                priority
                                sizes="(min-width: 1024px) 65vw, calc(100vw - 2rem)"
                            />
                        </div>
                        <div className="flex min-w-0 flex-col lg:sticky lg:top-8">
                            <p className="font-sans text-xs uppercase tracking-[0.18em] text-foreground/45 sm:tracking-[0.28em]">Lines &amp; Feelings · {piece.id}</p>
                            <h1 className="mt-3 break-words text-4xl leading-[0.98] sm:mt-4 sm:text-7xl">{piece.title}</h1>
                            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
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
                                <div className="mt-8 border-l border-foreground/25 pl-4 sm:mt-12 sm:pl-7">
                                    <p className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-foreground/45">Thoughts</p>
                                    <blockquote className="font-sans text-[0.95rem] leading-relaxed text-foreground/70 sm:text-lg">
                                        {piece.thoughts}
                                    </blockquote>
                                </div>
                            )}
                        </div>
                    </div>
                </article>

                <nav className="mt-12 grid border-y border-foreground/15 sm:mt-16 sm:grid-cols-2" aria-label="Artwork navigation">
                    {previous ? (
                        <Link href={`/art/${previous.slug}`} className="group min-w-0 border-b border-foreground/15 px-1 py-5 sm:border-b-0 sm:border-r sm:py-7 sm:pr-8">
                            <span className="inline-flex min-h-11 items-center font-sans text-xs uppercase tracking-[0.14em] text-foreground/45 sm:tracking-[0.18em]">← Previous work</span>
                            <span className="mt-2 block break-words font-serif text-xl transition-transform group-hover:-translate-x-1 sm:mt-3 sm:text-3xl">{previous.title}</span>
                        </Link>
                    ) : <span className="hidden sm:block" />}
                    {next ? (
                        <Link href={`/art/${next.slug}`} className="group min-w-0 px-1 py-5 text-left sm:py-7 sm:pl-8 sm:text-right">
                            <span className="inline-flex min-h-11 items-center font-sans text-xs uppercase tracking-[0.14em] text-foreground/45 sm:tracking-[0.18em]">Next work →</span>
                            <span className="mt-2 block break-words font-serif text-xl transition-transform group-hover:translate-x-1 sm:mt-3 sm:text-3xl">{next.title}</span>
                        </Link>
                    ) : null}
                </nav>

                <section className="mt-14" aria-labelledby="related-title">
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-foreground/15 pb-4 sm:mb-8 sm:gap-6 sm:pb-5">
                        <div>
                            <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/45 sm:tracking-[0.25em]">Keep looking</p>
                            <h2 id="related-title" className="mt-2 text-3xl sm:text-4xl">Latest works</h2>
                        </div>
                        <Link href="/archive" className="inline-flex min-h-11 shrink-0 items-center font-sans text-xs uppercase tracking-[0.12em] underline underline-offset-4 sm:tracking-[0.16em]">View all</Link>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedPieces.map((relatedPiece) => (
                            <ArtworkCard key={relatedPiece.id} piece={relatedPiece} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="border-t border-foreground/10 px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
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
