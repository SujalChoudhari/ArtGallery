import Link from "next/link";
import ArtworkCard from "@/components/ArtworkCard";
import ArtworkImage from "@/components/ArtworkImage";
import SiteHeader from "@/components/SiteHeader";
import { featuredArtPieces, getArtPieceBySlug } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";

const heroPiece = getArtPieceBySlug("kanheri-in-warli")!;
const heroAsset = getImageAsset(heroPiece.image);
const curatedPieces = featuredArtPieces.slice(0, 6);

export default function HomePage() {
    return (
        <div className="min-h-screen overflow-x-clip bg-background text-foreground" data-mobile-shell="phone-first">
            <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black text-white" aria-labelledby="gallery-title">
                <div className="absolute inset-0">
                    <ArtworkImage
                        asset={heroAsset}
                        alt=""
                        variant="detail"
                        fit="cover"
                        priority
                        sizes="100vw"
                        className="opacity-45"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/90" />
                </div>
                <SiteHeader dark />
                <div className="relative flex flex-1 items-center justify-center px-4 pb-12 pt-6 text-center sm:px-10 sm:pb-20 sm:pt-12">
                    <div className="max-w-4xl">
                        <p className="mb-5 font-sans text-xs uppercase tracking-[0.24em] text-white/65 sm:mb-6 sm:text-sm sm:tracking-[0.35em]">A personal collection</p>
                        <h1 id="gallery-title" className="text-balance font-serif text-5xl font-medium leading-[0.95] sm:text-8xl lg:text-[9rem]">
                            Lines &amp; Feelings
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed tracking-wide text-white/80 sm:mt-8 sm:text-lg">
                            Sketches, paintings, and visual explorations by{" "}
                            <a href="https://sujal.xyz" target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white">
                                Sujal Choudhari
                            </a>
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                            <Link href="/archive" className="inline-flex min-h-12 w-full items-center justify-center bg-white px-5 font-sans text-xs uppercase tracking-[0.16em] text-black transition-colors hover:bg-white/85 sm:w-auto sm:px-6 sm:tracking-[0.18em]">
                                Explore the archive
                            </Link>
                            <Link href={`/art/${heroPiece.slug}`} className="inline-flex min-h-12 w-full items-center justify-center border border-white/40 px-5 font-sans text-xs uppercase tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto sm:px-6 sm:tracking-[0.18em]">
                                View a work
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative flex items-end justify-between gap-3 px-4 pb-5 font-sans text-xs tracking-wide text-white/55 sm:gap-6 sm:px-10 sm:pb-7 lg:px-12">
                    <span>Selected work · {heroPiece.title}</span>
                    <a href="#selected-works" className="hidden items-center gap-2 uppercase tracking-[0.18em] transition-colors hover:text-white sm:flex">
                        Scroll to selected works <span aria-hidden="true">↓</span>
                    </a>
                </div>
            </section>

            <main>
                <section id="selected-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-28 lg:px-12" aria-labelledby="selected-title">
                    <div className="mb-10 flex flex-col justify-between gap-5 border-b border-foreground/15 pb-6 sm:mb-12 sm:gap-6 sm:pb-8 sm:flex-row sm:items-end">
                        <div>
                            <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/50 sm:tracking-[0.28em]">A considered selection</p>
                            <h2 id="selected-title" className="mt-3 text-3xl leading-tight sm:text-6xl">Selected works</h2>
                        </div>
                        <p className="max-w-sm font-sans text-sm leading-relaxed text-foreground/60">
                            A small doorway into the collection. Each work has its own page, story, and place in the archive.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
                        {curatedPieces.map((piece, index) => (
                            <ArtworkCard key={piece.id} piece={piece} priority={index < 2} />
                        ))}
                    </div>
                </section>

                <section className="border-y border-foreground/15 bg-zinc-950 px-4 py-16 text-white sm:px-8 sm:py-28 lg:px-12" aria-labelledby="archive-invite-title">
                    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
                        <div className="max-w-2xl">
                            <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45 sm:tracking-[0.28em]">The complete collection</p>
                            <h2 id="archive-invite-title" className="mt-4 text-3xl leading-tight sm:text-6xl">Take the long way through.</h2>
                            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/65">
                                Browse all 78 documented works, from early studies to the pieces that brought the pencil back.
                            </p>
                        </div>
                        <Link href="/archive" className="inline-flex min-h-12 w-full shrink-0 items-center justify-center border border-white/35 px-5 font-sans text-xs uppercase tracking-[0.16em] transition-colors hover:border-white hover:bg-white hover:text-black sm:w-auto sm:px-6 sm:tracking-[0.18em]">
                            Open the archive <span aria-hidden="true" className="ml-3">↗</span>
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 font-sans text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
                <span>All sketches &amp; paintings © Sujal Choudhari.</span>
                <a href="https://sujal.xyz" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition-colors hover:text-foreground">sujal.xyz</a>
            </footer>
        </div>
    );
}
