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
    const [statusFilter, setStatusFilter] = useState<StatusTab>("available");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState<SortOption>("curated");

    const availableCount = useMemo(() => pieces.filter((p) => p.status === "available").length, [pieces]);
    const reservedCount = useMemo(() => pieces.filter((p) => p.status === "reserved").length, [pieces]);

    const filteredPieces = useMemo(() => {
        return pieces
            .filter((piece) => {
                // Status tab filter
                if (statusFilter === "available" && piece.status !== "available") return false;
                if (statusFilter === "reserved" && piece.status !== "reserved") return false;

                // Search query filter
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
                    return a.price - b.price;
                }
                if (sortOption === "price-desc") {
                    return b.price - a.price;
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
    }, [pieces, statusFilter, searchQuery, sortOption]);

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Filter & Search Bar */}
            <div className="flex flex-col gap-4 border-b border-foreground/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
                {/* Status Tabs */}
                <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter works">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={statusFilter === "available"}
                        onClick={() => setStatusFilter("available")}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 font-sans text-xs uppercase tracking-[0.14em] transition-colors border ${
                            statusFilter === "available"
                                ? "border-foreground bg-foreground text-background font-medium"
                                : "border-border text-foreground/65 hover:border-foreground/40 hover:text-foreground"
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
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 font-sans text-xs uppercase tracking-[0.14em] transition-colors border ${
                            statusFilter === "reserved"
                                ? "border-foreground bg-foreground text-background font-medium"
                                : "border-border text-foreground/65 hover:border-foreground/40 hover:text-foreground"
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
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 font-sans text-xs uppercase tracking-[0.14em] transition-colors border ${
                            statusFilter === "all"
                                ? "border-foreground bg-foreground text-background font-semibold"
                                : "border-border text-foreground/65 hover:border-foreground/40 hover:text-foreground"
                        }`}
                    >
                        All ({pieces.length})
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
                            placeholder="Search..."
                            className="h-9 w-full border border-border bg-background pl-8 pr-7 font-sans text-xs text-foreground placeholder:text-foreground/40 transition-colors hover:border-foreground/40 focus:border-foreground focus:outline-none"
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
                        className="h-9 border border-border bg-background px-2.5 font-sans text-xs uppercase tracking-wider text-foreground transition-colors hover:border-foreground/40 focus:border-foreground focus:outline-none"
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
                <div className="py-16 text-center border border-dashed border-border p-8">
                    <p className="font-serif text-lg text-foreground/60">No drawings found matching your filter.</p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("available");
                        }}
                        className="mt-3 inline-flex items-center font-sans text-xs uppercase tracking-wider underline underline-offset-4 text-foreground/70 hover:text-foreground"
                    >
                        Reset filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        <article className="group flex flex-col justify-between border border-foreground/10 bg-background transition-shadow hover:shadow-xs">
            {/* Image Preview */}
            <div className="relative aspect-[4/3] overflow-hidden gallery-image-stage bg-muted/20">
                <Link href={`/art/${piece.slug}`} className="block h-full w-full">
                    <ArtworkImage
                        asset={asset}
                        alt={piece.alt ?? piece.title}
                        priority={priority}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                </Link>

                {/* Minimal Floating Status/Price Pill */}
                {piece.status === "available" && (
                    <span className="absolute top-2.5 right-2.5 z-10 rounded-xs bg-background/90 px-2 py-0.5 font-sans text-xs font-medium text-foreground backdrop-blur-md border border-foreground/10 shadow-xs">
                        {piece.currency ?? "₹"}{piece.price.toLocaleString("en-IN")}
                    </span>
                )}
                {piece.status === "reserved" && (
                    <span className="absolute top-2.5 right-2.5 z-10 rounded-xs bg-background/90 px-2 py-0.5 font-sans text-[10px] uppercase tracking-wider text-amber-500 backdrop-blur-md border border-amber-500/30">
                        Reserved
                    </span>
                )}
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                    {/* Title & Price Header */}
                    <div className="flex items-baseline justify-between gap-2">
                        <h2 className="text-xl font-serif tracking-tight leading-snug">
                            <Link href={`/art/${piece.slug}`} className="hover:underline underline-offset-4">
                                {piece.title}
                            </Link>
                        </h2>
                        {piece.status === "available" && (
                            <span className="font-sans text-sm font-semibold tracking-tight text-foreground/80">
                                {piece.currency ?? "₹"}{piece.price.toLocaleString("en-IN")}
                            </span>
                        )}
                    </div>

                    {/* Metadata Subline */}
                    <p className="mt-1 font-sans text-xs text-foreground/50">
                        No. {piece.id} • {piece.medium} {piece.dimensions ? `• ${piece.dimensions}` : ""}
                    </p>

                    {/* Story / Thoughts (Engineered for Long Paragraphs) */}
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
                                            className="mt-1.5 inline-flex items-center gap-1 font-sans text-[11px] font-medium text-foreground/55 hover:text-foreground transition-colors"
                                        >
                                            <span>Read full story</span>
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
                                        className="mt-1 inline-flex items-center gap-1 font-sans text-[11px] font-medium text-foreground/55 hover:text-foreground transition-colors"
                                    >
                                        <span>Show less</span>
                                        <ChevronUp size={12} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Actions: WhatsApp & Inspect */}
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-foreground/10 pt-3">
                    {piece.status === "available" ? (
                        <WhatsAppInquireButton
                            piece={piece}
                            label="Inquire"
                            variant="compact"
                        />
                    ) : piece.status === "reserved" ? (
                        <WhatsAppInquireButton
                            piece={piece}
                            label="Waitlist"
                            variant="outline"
                            className="px-3 py-1 text-[11px]"
                        />
                    ) : (
                        <span className="font-sans text-[11px] text-foreground/45">
                            Archival
                        </span>
                    )}

                    <Link
                        href={`/art/${piece.slug}`}
                        className="inline-flex items-center gap-1 font-sans text-xs text-foreground/60 hover:text-foreground transition-colors"
                        aria-label={`View details of ${piece.title}`}
                    >
                        <span>Inspect</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
