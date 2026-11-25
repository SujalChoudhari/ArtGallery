"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import type { ArtPiece } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";
import ArtworkImage from "@/components/ArtworkImage";
import WhatsAppInquireButton from "@/components/WhatsAppInquireButton";

type StatusTab = "available" | "reserved" | "all";
type SortOption = "curated" | "price-asc" | "price-desc" | "newest" | "oldest";

interface WorksForSaleExplorerProps {
    pieces: ArtPiece[];
}

export default function WorksForSaleExplorer({ pieces }: WorksForSaleExplorerProps) {
    // Only artworks that are actively listed for sale with a price
    const listedPieces = useMemo(() => {
        return pieces.filter((p) => (p.status === "available" || p.status === "reserved") && p.price !== undefined);
    }, [pieces]);

    const [statusFilter, setStatusFilter] = useState<StatusTab>("available");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState<SortOption>("curated");

    const availableCount = useMemo(() => listedPieces.filter((p) => p.status === "available").length, [listedPieces]);
    const reservedCount = useMemo(() => listedPieces.filter((p) => p.status === "reserved").length, [listedPieces]);

    const filteredPieces = useMemo(() => {
        return listedPieces
            .filter((piece) => {
                if (statusFilter === "available" && piece.status !== "available") return false;
                if (statusFilter === "reserved" && piece.status !== "reserved") return false;

                if (searchQuery.trim() !== "") {
                    const q = searchQuery.toLowerCase();
                    const titleMatch = piece.title.toLowerCase().includes(q);
                    const thoughtsMatch = piece.thoughts?.toLowerCase().includes(q) ?? false;
                    const mediumMatch = piece.medium?.toLowerCase().includes(q) ?? false;
                    if (!titleMatch && !thoughtsMatch && !mediumMatch) return false;
                }

                return true;
            })
            .sort((a, b) => {
                if (sortOption === "price-asc") {
                    return (a.price ?? 0) - (b.price ?? 0);
                }
                if (sortOption === "price-desc") {
                    return (b.price ?? 0) - (a.price ?? 0);
                }
                if (sortOption === "newest") {
                    return b.id - a.id;
                }
                if (sortOption === "oldest") {
                    return a.id - b.id;
                }
                const featuredA = a.isFeatured ? 1 : 0;
                const featuredB = b.isFeatured ? 1 : 0;
                if (featuredB !== featuredA) return featuredB - featuredA;
                return b.id - a.id;
            });
    }, [listedPieces, statusFilter, searchQuery, sortOption]);

    // When no artworks are currently listed for sale
    if (listedPieces.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center border border-border/60 bg-[#0d0d0d] py-16 px-4 text-center sm:py-24">
                <h3 className="text-2xl font-bold sm:text-3xl">Nothing currently for sale</h3>
                <p className="mt-2 max-w-md font-sans text-sm text-foreground/60">
                    Original drawings and studio studies will appear here when listed.
                </p>
                <Link
                    href="/archive"
                    className="gallery-action gallery-action-primary mt-6"
                >
                    Browse archive <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Filter & Search Bar */}
            <div className="flex flex-col gap-4 border-b border-border/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
                {/* Status Tabs styled consistently with Archive filter chips */}
                <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter works">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={statusFilter === "available"}
                        onClick={() => setStatusFilter("available")}
                        className={`min-h-8 inline-flex items-center gap-1.5 px-3 py-1 font-sans text-xs uppercase tracking-[0.12em] transition-colors ${
                            statusFilter === "available"
                                ? "border border-[#b91c1c] bg-[#b91c1c]/15 text-white font-medium"
                                : "border border-border bg-[#0d0d0d] text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                        }`}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Available ({availableCount})
                    </button>

                    <button
                        type="button"
                        role="tab"
                        aria-selected={statusFilter === "reserved"}
                        onClick={() => setStatusFilter("reserved")}
                        className={`min-h-8 inline-flex items-center gap-1.5 px-3 py-1 font-sans text-xs uppercase tracking-[0.12em] transition-colors ${
                            statusFilter === "reserved"
                                ? "border border-[#b91c1c] bg-[#b91c1c]/15 text-white font-medium"
                                : "border border-border bg-[#0d0d0d] text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                        }`}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Reserved ({reservedCount})
                    </button>

                    <button
                        type="button"
                        role="tab"
                        aria-selected={statusFilter === "all"}
                        onClick={() => setStatusFilter("all")}
                        className={`min-h-8 inline-flex items-center gap-1.5 px-3 py-1 font-sans text-xs uppercase tracking-[0.12em] transition-colors ${
                            statusFilter === "all"
                                ? "border border-[#b91c1c] bg-[#b91c1c]/15 text-white font-medium"
                                : "border border-border bg-[#0d0d0d] text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                        }`}
                    >
                        All ({listedPieces.length})
                    </button>
                </div>

                {/* Search & Sort Controls */}
                <div className="flex items-center gap-2.5">
                    <div className="relative flex-1 sm:w-64">
                        <Search
                            size={14}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                            aria-hidden="true"
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title, medium..."
                            className="h-9 w-full border border-border bg-[#0d0d0d] pl-8 pr-7 font-sans text-xs text-foreground placeholder:text-foreground/40 transition-colors focus:border-[#b91c1c] focus:outline-none"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-foreground/40 hover:text-foreground"
                                aria-label="Clear search"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>

                    <select
                        id="works-sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        aria-label="Sort artworks"
                        className="h-9 border border-border bg-[#0d0d0d] px-2.5 font-sans text-xs uppercase tracking-wider text-foreground transition-colors focus:border-[#b91c1c] focus:outline-none"
                    >
                        <option value="curated">Curated</option>
                        <option value="price-asc">Price ↑</option>
                        <option value="price-desc">Price ↓</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>
            </div>

            {/* Artwork Grid */}
            {filteredPieces.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-border/60 bg-[#0d0d0d] py-16 px-4 text-center sm:py-24">
                    <h3 className="text-2xl font-bold sm:text-3xl">No drawings match your filter</h3>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("available");
                        }}
                        className="mt-6 inline-flex min-h-10 items-center gap-2 border border-[#b91c1c] bg-[#b91c1c] px-5 font-sans text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#991b1b]"
                    >
                        Reset filters
                    </button>
                </div>
            ) : (
                <div className="gallery-work-grid grid gap-4 lg:grid-cols-3">
                    {filteredPieces.map((piece, index) => (
                        <SaleCard key={piece.id} piece={piece} priority={index < 3} />
                    ))}
                </div>
            )}
        </div>
    );
}

function SaleCard({ piece, priority = false }: { piece: ArtPiece; priority?: boolean }) {
    const asset = getImageAsset(piece.image);
    const [isStoryOpen, setIsStoryOpen] = useState(false);

    // Split thoughts into multi-paragraph blocks
    const paragraphs = useMemo(() => {
        if (!piece.thoughts) return [];
        return piece.thoughts.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    }, [piece.thoughts]);

    const isLongStory = paragraphs.length > 1 || (paragraphs[0] && paragraphs[0].length > 140);
    const excerpt = paragraphs[0]
        ? isLongStory
            ? `${paragraphs[0].slice(0, 120)}…`
            : paragraphs[0]
        : null;

    return (
        <article className="gallery-card group flex flex-col justify-between">
            {/* Image Preview */}
            <div className="relative aspect-[4/3] overflow-hidden gallery-image-stage">
                <Link href={`/art/${piece.slug}`} className="block h-full w-full">
                    <ArtworkImage
                        asset={asset}
                        alt={piece.alt ?? piece.title}
                        priority={priority}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                </Link>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                    {/* Title & Price Header - Epilogue font (no font-serif!), hover accent */}
                    <div className="flex items-baseline justify-between gap-3">
                        <h2 className="text-lg sm:text-xl font-bold tracking-tight leading-snug group-hover:text-[var(--gallery-hover)] transition-colors">
                            <Link href={`/art/${piece.slug}`}>
                                {piece.title}
                            </Link>
                        </h2>
                        <div className="shrink-0 flex items-baseline gap-2">
                            {piece.price !== undefined && (
                                <span className="font-mono text-sm font-semibold tracking-tight text-foreground/90">
                                    {piece.currency ?? "₹"}{piece.price.toLocaleString("en-IN")}
                                </span>
                            )}
                            {piece.status === "reserved" && (
                                <span className="font-mono text-[10px] uppercase tracking-wider text-amber-500 font-medium">
                                    Reserved
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Metadata Subline */}
                    {(piece.medium || piece.dimensions) && (
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-foreground/45">
                            {[piece.medium, piece.dimensions].filter(Boolean).join(" • ")}
                        </p>
                    )}

                    {/* Story / Thoughts */}
                    {paragraphs.length > 0 && (
                        <div className="mt-3.5 border-l-2 border-[#b91c1c] pl-3 py-0.5">
                            {!isStoryOpen ? (
                                <div>
                                    <p className="font-sans text-xs italic leading-relaxed text-foreground/70">
                                        "{excerpt}"
                                    </p>
                                    {isLongStory && (
                                        <button
                                            type="button"
                                            onClick={() => setIsStoryOpen(true)}
                                            className="mt-1.5 inline-flex items-center gap-1 font-mono text-[11px] text-foreground/50 hover:text-foreground transition-colors"
                                        >
                                            <span>Read story</span>
                                            <ChevronDown size={12} />
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-2.5">
                                    <div className="max-w-prose space-y-2 font-sans text-xs leading-relaxed text-foreground/80">
                                        {paragraphs.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsStoryOpen(false)}
                                        className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-foreground/50 hover:text-foreground transition-colors"
                                    >
                                        <span>Show less</span>
                                        <ChevronUp size={12} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Direct Action Button */}
                <div className="mt-4 border-t border-border pt-3">
                    {piece.status === "available" ? (
                        <WhatsAppInquireButton
                            piece={piece}
                            label="Inquire"
                            variant="compact"
                            className="w-full"
                        />
                    ) : piece.status === "reserved" ? (
                        <WhatsAppInquireButton
                            piece={piece}
                            label="Waitlist"
                            variant="outline"
                            className="w-full"
                        />
                    ) : null}
                </div>
            </div>
        </article>
    );
}
