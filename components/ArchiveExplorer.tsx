"use client";

import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import type { ArtPiece } from "@/lib/drawings";
import ArtworkCard from "@/components/ArtworkCard";

type MediumFilter = "all" | "ink" | "pencil" | "color";
type EraFilter = "all" | "recent" | "mid" | "early";
type SortOption = "curated" | "newest" | "oldest";

type ArchiveExplorerProps = {
    pieces: ArtPiece[];
};

export default function ArchiveExplorer({ pieces }: ArchiveExplorerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMedium, setSelectedMedium] = useState<MediumFilter>("all");
    const [selectedEra, setSelectedEra] = useState<EraFilter>("all");
    const [reflectionsOnly, setReflectionsOnly] = useState(false);
    const [forSaleOnly, setForSaleOnly] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>("curated");

    const hasActiveFilters =
        searchQuery.trim() !== "" ||
        selectedMedium !== "all" ||
        selectedEra !== "all" ||
        reflectionsOnly ||
        forSaleOnly ||
        sortOption !== "curated";

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedMedium("all");
        setSelectedEra("all");
        setReflectionsOnly(false);
        setForSaleOnly(false);
        setSortOption("curated");
    };

    const filteredPieces = useMemo(() => {
        return pieces.filter((piece) => {
            // For sale only filter
            if (forSaleOnly && piece.status !== "available") {
                return false;
            }

            // Search query filter
            if (searchQuery.trim() !== "") {
                const query = searchQuery.toLowerCase();
                const titleMatch = piece.title.toLowerCase().includes(query);
                const thoughtsMatch = piece.thoughts?.toLowerCase().includes(query) ?? false;
                if (!titleMatch && !thoughtsMatch) return false;
            }

            // Reflections only filter
            if (reflectionsOnly && !piece.thoughts) {
                return false;
            }

            // Era filter
            if (selectedEra === "recent" && piece.id < 61) return false;
            if (selectedEra === "mid" && (piece.id < 31 || piece.id > 60)) return false;
            if (selectedEra === "early" && piece.id > 30) return false;

            // Medium filter
            if (selectedMedium !== "all") {
                const text = `${piece.title} ${piece.image} ${piece.thoughts ?? ""}`.toLowerCase();
                if (selectedMedium === "ink") {
                    if (!/pen|ink|crosshatch|warli|liner|ballpoint|mandala|pattern|lines|calligraphy/.test(text)) {
                        return false;
                    }
                } else if (selectedMedium === "pencil") {
                    if (!/pencil|graphite|sketch|charcoal|study|shading|shaded|portrait|gesture|anatom/.test(text)) {
                        return false;
                    }
                } else if (selectedMedium === "color") {
                    if (!/water|paint|acrylic|oil|brush|color|colour|crimson|spray|sunset|orange|bloom|rose|sky|cloud|goku|cherries|lake|volcano|hibiscus|violet|yellow/.test(text)) {
                        return false;
                    }
                }
            }

            return true;
        }).sort((a, b) => {
            if (sortOption === "newest") {
                return b.id - a.id;
            }
            if (sortOption === "oldest") {
                return a.id - b.id;
            }
            // "curated" (thoughts first, then id desc)
            const thoughtsFirst = Number(Boolean(b.thoughts)) - Number(Boolean(a.thoughts));
            return thoughtsFirst || b.id - a.id;
        });
    }, [pieces, searchQuery, selectedMedium, selectedEra, reflectionsOnly, sortOption]);

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Search and Filter Controls */}
            <div className="flex flex-col gap-4 border-b border-border/80 pb-6 sm:pb-8">
                {/* Search Bar + Sort */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-lg">
                        <Search
                            size={16}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40"
                            aria-hidden="true"
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title, subject, or memory..."
                            className="w-full border border-border bg-[#0d0d0d] py-2.5 pl-10 pr-9 font-sans text-xs sm:text-sm text-foreground placeholder:text-foreground/40 focus:border-[#b91c1c] focus:outline-none"
                            aria-label="Search artworks"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                                aria-label="Clear search query"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="archive-sort" className="shrink-0 font-sans text-xs uppercase tracking-wider text-foreground/50">
                            Sort:
                        </label>
                        <select
                            id="archive-sort"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="border border-border bg-[#0d0d0d] px-3 py-2 font-sans text-xs uppercase tracking-wider text-foreground focus:border-[#b91c1c] focus:outline-none"
                        >
                            <option value="curated">Curated (Stories First)</option>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>

                {/* Filter Chips Groups */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Medium Filters */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="mr-1 font-sans text-xs uppercase tracking-wider text-foreground/40">Medium:</span>
                        {[
                            { id: "all", label: "All Mediums" },
                            { id: "ink", label: "Ink & Pen" },
                            { id: "pencil", label: "Pencil & Charcoal" },
                            { id: "color", label: "Color & Painting" },
                        ].map((m) => (
                            <button
                                key={m.id}
                                type="button"
                                onClick={() => setSelectedMedium(m.id as MediumFilter)}
                                className={`min-h-8 px-3 py-1 font-sans text-xs uppercase tracking-[0.12em] transition-colors ${
                                    selectedMedium === m.id
                                        ? "border border-[#b91c1c] bg-[#b91c1c]/15 text-white font-medium"
                                        : "border border-border bg-[#0d0d0d] text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                                }`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>

                    {/* Era & Reflections Filters */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="mr-1 font-sans text-xs uppercase tracking-wider text-foreground/40">Period:</span>
                        {[
                            { id: "all", label: "All Eras" },
                            { id: "recent", label: "Recent (2024–2026)" },
                            { id: "mid", label: "Covid Era (2020–2023)" },
                            { id: "early", label: "Early Works (2018–2020)" },
                        ].map((e) => (
                            <button
                                key={e.id}
                                type="button"
                                onClick={() => setSelectedEra(e.id as EraFilter)}
                                className={`min-h-8 px-3 py-1 font-sans text-xs uppercase tracking-[0.12em] transition-colors ${
                                    selectedEra === e.id
                                        ? "border border-[#b91c1c] bg-[#b91c1c]/15 text-white font-medium"
                                        : "border border-border bg-[#0d0d0d] text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                                }`}
                            >
                                {e.label}
                            </button>
                        ))}

                        <div className="my-1 hidden h-4 w-px bg-border sm:block" aria-hidden="true" />

                        <button
                            type="button"
                            onClick={() => setReflectionsOnly(!reflectionsOnly)}
                            className={`min-h-8 px-3 py-1 font-sans text-xs uppercase tracking-[0.12em] transition-colors ${
                                reflectionsOnly
                                    ? "border border-[#b91c1c] bg-[#b91c1c] text-white font-medium"
                                    : "border border-border bg-[#0d0d0d] text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                            }`}
                        >
                            With Reflections Only
                        </button>

                        <button
                            type="button"
                            onClick={() => setForSaleOnly(!forSaleOnly)}
                            className={`min-h-8 px-3 py-1 font-sans text-xs uppercase tracking-[0.12em] transition-colors ${
                                forSaleOnly
                                    ? "border border-emerald-500 bg-emerald-500/20 text-emerald-400 font-medium"
                                    : "border border-border bg-[#0d0d0d] text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                            }`}
                        >
                            For Sale Only
                        </button>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex min-h-8 items-center gap-1 border border-border/70 px-2.5 py-1 font-sans text-xs uppercase tracking-[0.12em] text-[#ff8d8d] hover:border-[#b91c1c] hover:bg-[#b91c1c]/10"
                                title="Reset all applied filters"
                            >
                                <RotateCcw size={12} />
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Counter status */}
                <div className="flex items-center justify-between font-sans text-xs text-foreground/45">
                    <span>
                        Showing {filteredPieces.length} of {pieces.length} works
                    </span>
                    {hasActiveFilters && (
                        <span className="text-[#ff8d8d]">Filters active</span>
                    )}
                </div>
            </div>

            {/* Artworks Grid or Empty State */}
            {filteredPieces.length > 0 ? (
                <div className="gallery-work-grid grid gap-4 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPieces.map((piece) => (
                        <ArtworkCard key={piece.id} piece={piece} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center border border-border/60 bg-[#0d0d0d] py-16 px-4 text-center sm:py-24">
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/40">No Matches Found</p>
                    <h3 className="mt-2 text-2xl font-bold sm:text-3xl">No drawings match your filters</h3>
                    <p className="mt-2 max-w-md font-sans text-sm text-foreground/60">
                        Try searching for another term, selecting a different medium, or resetting all active filters.
                    </p>
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-6 inline-flex min-h-10 items-center gap-2 border border-[#b91c1c] bg-[#b91c1c] px-5 font-sans text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#991b1b]"
                    >
                        <RotateCcw size={14} />
                        Reset All Filters
                    </button>
                </div>
            )}
        </div>
    );
}
