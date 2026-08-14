import Link from "next/link";
import type { Metadata } from "next";
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
        <div className="min-h-screen overflow-x-clip bg-background text-foreground">
            <SiteHeader />
            <main className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/15 py-5 font-sans text-xs uppercase tracking-[0.16em] text-foreground/55">
                    <Link href="/archive" className="transition-colors hover:text-foreground">← Back to archive</Link>
                    <span>Work {piece.id}</span>
                </div>

                <article className="pt-10 sm:pt-16">
                    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-16">
                        <div className="relative aspect-[4/3] min-h-[55vh] overflow-hidden bg-zinc-100">
                            <ArtworkImage
                                asset={imageAsset}
                                alt={piece.title}
                                variant="detail"
                                priority
                                sizes="(min-width: 1024px) 65vw, 100vw"
                            />
                        </div>
                        <div className="flex flex-col lg:sticky lg:top-8">
                            <p className="font-sans text-xs uppercase tracking-[0.28em] text-foreground/45">Lines &amp; Feelings · {piece.id}</p>
                            <h1 className="mt-4 text-5xl leading-[0.98] sm:text-7xl">{piece.title}</h1>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <ShareButton title={piece.title} url={canonicalUrl} />
                                <a
                                    href={piece.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center border border-foreground/20 px-4 font-sans text-xs uppercase tracking-[0.16em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                                >
                                    Open original
                                </a>
                            </div>
                            {piece.thoughts && (
                                <div className="mt-12 border-l border-foreground/25 pl-5 sm:pl-7">
                                    <p className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-foreground/45">Thoughts</p>
                                    <blockquote className="font-sans text-base leading-relaxed text-foreground/70 sm:text-lg">
                                        {piece.thoughts}
                                    </blockquote>
                                </div>
                            )}
                        </div>
                    </div>
                </article>

                <nav className="mt-16 grid border-y border-foreground/15 sm:grid-cols-2" aria-label="Artwork navigation">
                    {previous ? (
                        <Link href={`/art/${previous.slug}`} className="group border-b border-foreground/15 px-1 py-7 sm:border-b-0 sm:border-r sm:pr-8">
                            <span className="font-sans text-xs uppercase tracking-[0.18em] text-foreground/45">← Previous work</span>
                            <span className="mt-3 block font-serif text-2xl transition-transform group-hover:-translate-x-1 sm:text-3xl">{previous.title}</span>
                        </Link>
                    ) : <span className="hidden sm:block" />}
                    {next ? (
                        <Link href={`/art/${next.slug}`} className="group px-1 py-7 text-left sm:pl-8 sm:text-right">
                            <span className="font-sans text-xs uppercase tracking-[0.18em] text-foreground/45">Next work →</span>
                            <span className="mt-3 block font-serif text-2xl transition-transform group-hover:translate-x-1 sm:text-3xl">{next.title}</span>
                        </Link>
                    ) : null}
                </nav>

                <section className="mt-20" aria-labelledby="related-title">
                    <div className="mb-8 flex items-end justify-between gap-6 border-b border-foreground/15 pb-5">
                        <div>
                            <p className="font-sans text-xs uppercase tracking-[0.25em] text-foreground/45">Keep looking</p>
                            <h2 id="related-title" className="mt-2 text-3xl sm:text-4xl">Latest works</h2>
                        </div>
                        <Link href="/archive" className="hidden font-sans text-xs uppercase tracking-[0.16em] underline underline-offset-4 sm:block">View all</Link>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedPieces.map((relatedPiece) => (
                            <ArtworkCard key={relatedPiece.id} piece={relatedPiece} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="border-t border-foreground/10 px-5 py-10 sm:px-8 lg:px-12">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 font-sans text-xs text-foreground/50">
                    <Link href="/archive" className="underline underline-offset-4 transition-colors hover:text-foreground">Back to archive</Link>
                    <span>© Sujal Choudhari</span>
                </div>
            </footer>
            {/* Safe: jsonLd is built only from the static, locally-owned artwork record above. */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </div>
    );
}
