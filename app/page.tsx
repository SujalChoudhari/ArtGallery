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
        <div className="min-h-screen overflow-x-clip bg-background text-foreground">
            <section className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white" aria-labelledby="gallery-title">
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
                <div className="relative flex flex-1 items-center justify-center px-6 pb-20 pt-12 text-center sm:px-10">
                    <div className="max-w-4xl">
                        <p className="mb-6 font-sans text-xs uppercase tracking-[0.35em] text-white/65 sm:text-sm">A personal collection</p>
                        <h1 id="gallery-title" className="text-balance font-serif text-6xl font-medium leading-[0.95] sm:text-8xl lg:text-[9rem]">
                            Lines &amp; Feelings
                        </h1>
                        <p className="mx-auto mt-8 max-w-xl font-sans text-base leading-relaxed tracking-wide text-white/80 sm:text-lg">
                            Sketches, paintings, and visual explorations by{" "}
                            <a href="https://sujal.xyz" target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white">
                                Sujal Choudhari
                            </a>
                        </p>
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/archive" className="inline-flex min-h-12 items-center justify-center bg-white px-6 font-sans text-xs uppercase tracking-[0.18em] text-black transition-colors hover:bg-white/85">
                                Explore the archive
                            </Link>
                            <Link href={`/art/${heroPiece.slug}`} className="inline-flex min-h-12 items-center justify-center border border-white/40 px-6 font-sans text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white/10">
                                View a work
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative flex items-end justify-between gap-6 px-6 pb-7 font-sans text-xs tracking-wide text-white/55 sm:px-10 lg:px-12">
                    <span>Selected work · {heroPiece.title}</span>
                    <a href="#selected-works" className="hidden items-center gap-2 uppercase tracking-[0.18em] transition-colors hover:text-white sm:flex">
                        Scroll to selected works <span aria-hidden="true">↓</span>
                    </a>
                </div>
            </section>

            <main>
                <section id="selected-works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12" aria-labelledby="selected-title">
                    <div className="mb-12 flex flex-col justify-between gap-6 border-b border-foreground/15 pb-8 sm:flex-row sm:items-end">
                        <div>
                            <p className="font-sans text-xs uppercase tracking-[0.28em] text-foreground/50">A considered selection</p>
                            <h2 id="selected-title" className="mt-3 text-4xl leading-tight sm:text-6xl">Selected works</h2>
                        </div>
                        <p className="max-w-sm font-sans text-sm leading-relaxed text-foreground/60">
                            A small doorway into the collection. Each work has its own page, story, and place in the archive.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {curatedPieces.map((piece, index) => (
                            <ArtworkCard key={piece.id} piece={piece} priority={index < 2} />
                        ))}
                    </div>
                </section>

                <section className="border-y border-foreground/15 bg-zinc-950 px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12" aria-labelledby="archive-invite-title">
                    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
                        <div className="max-w-2xl">
                            <p className="font-sans text-xs uppercase tracking-[0.28em] text-white/45">The complete collection</p>
                            <h2 id="archive-invite-title" className="mt-4 text-4xl leading-tight sm:text-6xl">Take the long way through.</h2>
                            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/65">
                                Browse all 78 documented works, from early studies to the pieces that brought the pencil back.
                            </p>
                        </div>
                        <Link href="/archive" className="inline-flex min-h-12 shrink-0 items-center justify-center border border-white/35 px-6 font-sans text-xs uppercase tracking-[0.18em] transition-colors hover:border-white hover:bg-white hover:text-black">
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
