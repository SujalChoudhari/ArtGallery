"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, SlidersHorizontal, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import type { ArtPiece } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";
import ArtworkImage from "@/components/ArtworkImage";
import WhatsAppInquireButton from "@/components/WhatsAppInquireButton";

type StatusTab = "all" | "available" | "reserved" | "unavailable";
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
    const unavailableCount = useMemo(() => pieces.filter((p) => p.status === "unavailable").length, [pieces]);

    const filteredPieces = useMemo(() => {
        return pieces
            .filter((piece) => {
                // Status tab filter
                if (statusFilter === "available" && piece.status !== "available") return false;
                if (statusFilter === "reserved" && piece.status !== "reserved") return false;
                if (statusFilter === "unavailable" && piece.status !== "unavailable") return false;

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
                // Curated: featured first, then newest
                const featuredA = a.isFeatured ? 1 : 0;
                const featuredB = b.isFeatured ? 1 : 0;
                if (featuredB !== featuredA) return featuredB - featuredA;
                return b.id - a.id;
            });
    }, [pieces, statusFilter, searchQuery, sortOption]);

    return (
        <div className="space-y-8">
            {/* Control Bar: Status Tabs, Search & Sort */}
            <div className="flex flex-col gap-5 border-b border-border/80 pb-6 sm:pb-8">
                {/* Status Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Artwork availability">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={statusFilter === "available"}
                            onClick={() => setStatusFilter("available")}
                            className={`min-h-10 px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] transition-colors border ${
                                statusFilter === "available"
                                    ? "border-foreground bg-foreground text-background font-semibold"
                                    : "border-border text-foreground/70 hover:border-foreground/50 hover:text-foreground"
                            }`}
                        >
                            Available Works ({availableCount})
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={statusFilter === "reserved"}
                            onClick={() => setStatusFilter("reserved")}
                            className={`min-h-10 px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] transition-colors border ${
                                statusFilter === "reserved"
                                    ? "border-foreground bg-foreground text-background font-semibold"
                                    : "border-border text-foreground/70 hover:border-foreground/50 hover:text-foreground"
                            }`}
                        >
                            Reserved ({reservedCount})
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={statusFilter === "unavailable"}
                            onClick={() => setStatusFilter("unavailable")}
                            className={`min-h-10 px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] transition-colors border ${
                                statusFilter === "unavailable"
                                    ? "border-foreground bg-foreground text-background font-semibold"
                                    : "border-border text-foreground/70 hover:border-foreground/50 hover:text-foreground"
                            }`}
                        >
                            Archived / Unavailable ({unavailableCount})
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={statusFilter === "all"}
                            onClick={() => setStatusFilter("all")}
                            className={`min-h-10 px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] transition-colors border ${
                                statusFilter === "all"
                                    ? "border-foreground bg-foreground text-background font-semibold"
                                    : "border-border text-foreground/70 hover:border-foreground/50 hover:text-foreground"
                            }`}
                        >
                            All Pieces ({pieces.length})
                        </button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort-select" className="sr-only">Sort works</label>
                        <select
                            id="sort-select"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="min-h-10 border border-border bg-background px-3 py-2 font-sans text-xs uppercase tracking-[0.12em] text-foreground transition-colors hover:border-foreground/50 focus:border-foreground focus:outline-none"
                        >
                            <option value="curated">Curated Order</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40"
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search artworks, mediums, or stories..."
                        className="min-h-10 w-full border border-border bg-background pl-10 pr-9 font-sans text-xs text-foreground placeholder:text-foreground/40 transition-colors hover:border-foreground/40 focus:border-foreground focus:outline-none"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-foreground/40 hover:text-foreground"
                            aria-label="Clear search"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Results counter */}
            <div className="flex items-center justify-between font-sans text-xs text-foreground/50">
                <span>Showing {filteredPieces.length} {filteredPieces.length === 1 ? "work" : "works"}</span>
                {statusFilter === "available" && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ All listed prices include 40% negotiation buffer & domestic shipping
                    </span>
                )}
            </div>

            {/* Artworks List (Story & Price Layout) */}
            {filteredPieces.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-border p-8">
                    <p className="font-serif text-lg text-foreground/60">No drawings found matching your criteria.</p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                        }}
                        className="mt-4 inline-flex items-center font-sans text-xs uppercase tracking-wider underline underline-offset-4"
                    >
                        Reset filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
                    {filteredPieces.map((piece, index) => {
                        const asset = getImageAsset(piece.image);
                        return (
                            <article
                                key={piece.id}
                                className="group flex flex-col justify-between border border-border bg-background transition-shadow hover:shadow-md"
                            >
                                {/* Top Image Stage */}
                                <div className="relative aspect-[4/3] overflow-hidden gallery-image-stage bg-muted/20 border-b border-border">
                                    <Link href={`/art/${piece.slug}`} className="block h-full w-full">
                                        <ArtworkImage
                                            asset={asset}
                                            alt={piece.alt ?? piece.title}
                                            priority={index < 4}
                                            sizes="(min-width: 1024px) 50vw, 100vw"
                                        />
                                    </Link>

                                    {/* Price / Status Tag Badge */}
                                    <div className="absolute top-3 right-3 z-10">
                                        {piece.status === "available" && (
                                            <span className="rounded-xs bg-background/95 px-3 py-1 font-sans text-xs font-bold text-foreground backdrop-blur-md border border-foreground/15 shadow-sm">
                                                {piece.currency ?? "₹"}{piece.price.toLocaleString("en-IN")}
                                            </span>
                                        )}
                                        {piece.status === "reserved" && (
                                            <span className="rounded-xs bg-amber-950/90 px-2.5 py-1 font-sans text-[11px] uppercase tracking-wider text-amber-200 backdrop-blur-md border border-amber-500/30">
                                                Reserved
                                            </span>
                                        )}
                                        {piece.status === "unavailable" && (
                                            <span className="rounded-xs bg-background/90 px-2.5 py-1 font-sans text-[11px] uppercase tracking-wider text-foreground/50 backdrop-blur-md border border-foreground/15">
                                                Unavailable
                                            </span>
                                        )}
                                        {piece.status === "sold" && (
                                            <span className="rounded-xs bg-rose-950/90 px-2.5 py-1 font-sans text-[11px] uppercase tracking-wider text-rose-200 backdrop-blur-md border border-rose-500/20">
                                                Sold
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content: Title, Price, Medium, Story / Thoughts */}
                                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                                    <div>
                                        {/* Header Row: Drawing No & Status */}
                                        <div className="flex items-center justify-between gap-2 font-sans text-[11px] uppercase tracking-[0.16em] text-foreground/55">
                                            <span>Drawing no. {piece.id}</span>
                                            {piece.status === "available" ? (
                                                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available
                                                </span>
                                            ) : piece.status === "reserved" ? (
                                                <span className="inline-flex items-center gap-1 text-amber-500 font-medium">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Reserved
                                                </span>
                                            ) : piece.status === "unavailable" ? (
                                                <span className="text-foreground/40">Early Archival</span>
                                            ) : (
                                                <span className="text-rose-500">Sold</span>
                                            )}
                                        </div>

                                        {/* Artwork Title & Price */}
                                        <div className="mt-2 flex items-baseline justify-between gap-3 border-b border-border/60 pb-3">
                                            <h2 className="text-2xl font-serif tracking-tight leading-snug">
                                                <Link href={`/art/${piece.slug}`} className="hover:underline underline-offset-4">
                                                    {piece.title}
                                                </Link>
                                            </h2>
                                            {piece.status === "available" && (
                                                <div className="text-right shrink-0">
                                                    <span className="font-sans text-xl font-semibold tracking-tight">
                                                        {piece.currency ?? "₹"}{piece.price.toLocaleString("en-IN")}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Specifications: Medium & Size */}
                                        <p className="mt-2.5 font-sans text-xs text-foreground/60">
                                            {piece.medium} {piece.dimensions ? `• ${piece.dimensions}` : ""}
                                        </p>

                                        {/* The Story / Thoughts Block */}
                                        <div className="mt-4 border-l-2 border-[#b91c1c] bg-foreground/[0.02] p-3.5">
                                            <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/45 mb-1.5 font-medium">
                                                The Story & Thoughts
                                            </span>
                                            <blockquote className="font-sans text-[0.92rem] leading-relaxed text-foreground/75 italic">
                                                "{piece.thoughts}"
                                            </blockquote>
                                        </div>
                                    </div>

                                    {/* Action Buttons: WhatsApp Inquire & Detail Link */}
                                    <div className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-border/60 sm:flex-row sm:items-center sm:justify-between">
                                        {piece.status === "available" ? (
                                            <WhatsAppInquireButton
                                                piece={piece}
                                                label="Inquire via WhatsApp"
                                                className="w-full sm:w-auto"
                                            />
                                        ) : piece.status === "reserved" ? (
                                            <WhatsAppInquireButton
                                                piece={piece}
                                                label="Inquire Waitlist"
                                                variant="outline"
                                                className="w-full sm:w-auto"
                                            />
                                        ) : (
                                            <span className="font-sans text-xs text-foreground/45 italic">
                                                {piece.status === "sold" ? "In private collection" : "Original not in studio"}
                                            </span>
                                        )}

                                        <Link
                                            href={`/art/${piece.slug}`}
                                            className="inline-flex min-h-10 items-center justify-center gap-1.5 border border-foreground/20 px-4 font-sans text-xs uppercase tracking-[0.14em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                                        >
                                            Inspect original <ArrowUpRight size={14} aria-hidden="true" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
