"use client";

import { useState, useEffect, useRef, useCallback, type CSSProperties, type MouseEvent, type WheelEvent } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCcw, X, Maximize2 } from "lucide-react";
import type { ArtPiece } from "@/lib/drawings";
import type { ImageAsset } from "@/lib/image-assets";
import ArtworkImage from "@/components/ArtworkImage";
import { cn } from "@/lib/utils";

type ArtworkDetailStageProps = {
    piece: ArtPiece;
    asset: ImageAsset;
};

export default function ArtworkDetailStage({ piece, asset }: ArtworkDetailStageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

    // Listen to custom open-art-inspection event
    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setZoom(1);
            setPan({ x: 0, y: 0 });
        };
        window.addEventListener("open-art-inspection", handleOpen);
        return () => window.removeEventListener("open-art-inspection", handleOpen);
    }, []);

    // Lock body scroll and handle keyboard shortcuts when inspection modal is open
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            } else if (e.key === "+" || e.key === "=") {
                e.preventDefault();
                setZoom((prev) => Math.min(prev + 0.5, 4));
            } else if (e.key === "-") {
                e.preventDefault();
                setZoom((prev) => {
                    const next = Math.max(prev - 0.5, 1);
                    if (next === 1) setPan({ x: 0, y: 0 });
                    return next;
                });
            } else if (e.key === "0") {
                e.preventDefault();
                setZoom(1);
                setPan({ x: 0, y: 0 });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.5, 4));
    };

    const handleZoomOut = () => {
        setZoom((prev) => {
            const next = Math.max(prev - 0.5, 1);
            if (next === 1) setPan({ x: 0, y: 0 });
            return next;
        });
    };

    const handleResetZoom = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    const handleDoubleClick = () => {
        if (zoom > 1) {
            handleResetZoom();
        } else {
            setZoom(2.25);
        }
    };

    // Wheel zoom
    const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.25 : -0.25;
        setZoom((prev) => {
            const next = Math.min(Math.max(prev + delta, 1), 4);
            if (next === 1) setPan({ x: 0, y: 0 });
            return next;
        });
    };

    // Mouse drag handlers for panning
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (zoom <= 1) return;
        setIsDragging(true);
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            panX: pan.x,
            panY: pan.y,
        };
    };

    const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging || zoom <= 1) return;
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        setPan({
            x: dragStartRef.current.panX + dx,
            y: dragStartRef.current.panY + dy,
        });
    }, [isDragging, zoom]);

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <>
            <div
                className="artwork-detail-stage gallery-image-stage group relative overflow-hidden border border-border cursor-zoom-in"
                data-mobile-artwork-stage="natural-aspect"
                style={{ "--artwork-aspect-ratio": `${asset.detail.width} / ${asset.detail.height}` } as CSSProperties}
                onClick={() => {
                    setIsOpen(true);
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                }}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${piece.title} in deep zoom`}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsOpen(true);
                        setZoom(1);
                        setPan({ x: 0, y: 0 });
                    }
                }}
            >
                <ArtworkImage
                    asset={asset}
                    alt={piece.alt ?? piece.title}
                    variant="detail"
                    priority
                    sizes="(min-width: 1024px) 65vw, calc(100vw - 2rem)"
                />

                {/* Subtle inspection badge overlay */}
                <div className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1.5 border border-border/80 bg-background/85 px-2.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/80 backdrop-blur-sm transition-all group-hover:border-[#b91c1c] group-hover:bg-background group-hover:text-foreground">
                    <Maximize2 size={13} className="text-[#b91c1c]" aria-hidden="true" />
                    <span>Deep Zoom</span>
                </div>
            </div>

            {/* Deep Zoom Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex flex-col bg-[#080808]/96 backdrop-blur-md"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Inspection view: ${piece.title}`}
                >
                    {/* Top HUD */}
                    <div className="flex shrink-0 items-center justify-between border-b border-border/80 bg-[#080808]/90 px-4 py-3 sm:px-6">
                        <div className="flex min-w-0 items-center gap-3">
                            <span className="font-sans text-xs uppercase tracking-[0.18em] text-foreground/50">
                                #{piece.id}
                            </span>
                            <div className="h-3 w-px bg-border" aria-hidden="true" />
                            <h2 className="truncate font-sans text-sm font-semibold text-foreground sm:text-base">
                                {piece.title}
                            </h2>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <button
                                type="button"
                                onClick={handleZoomOut}
                                disabled={zoom <= 1}
                                className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-foreground hover:text-foreground disabled:opacity-30 disabled:hover:border-border"
                                aria-label="Zoom out"
                                title="Zoom out (-)"
                            >
                                <ZoomOut size={16} />
                            </button>
                            <span className="min-w-14 text-center font-sans text-xs uppercase tracking-wider text-foreground/80">
                                {Math.round(zoom * 100)}%
                            </span>
                            <button
                                type="button"
                                onClick={handleZoomIn}
                                disabled={zoom >= 4}
                                className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-foreground hover:text-foreground disabled:opacity-30 disabled:hover:border-border"
                                aria-label="Zoom in"
                                title="Zoom in (+)"
                            >
                                <ZoomIn size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={handleResetZoom}
                                disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
                                className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-foreground hover:text-foreground disabled:opacity-30 disabled:hover:border-border"
                                aria-label="Reset zoom and position"
                                title="Reset view (0)"
                            >
                                <RotateCcw size={15} />
                            </button>
                            <div className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex h-9 w-9 items-center justify-center border border-[#b91c1c]/50 bg-[#b91c1c]/10 text-foreground transition-colors hover:border-[#b91c1c] hover:bg-[#b91c1c] hover:text-white"
                                aria-label="Close inspection view"
                                title="Close (Escape)"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Viewport Stage */}
                    <div
                        className={cn(
                            "relative flex flex-1 items-center justify-center overflow-hidden select-none",
                            zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
                        )}
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onDoubleClick={handleDoubleClick}
                    >
                        <div
                            className="relative max-h-[85vh] max-w-[90vw] transition-transform duration-75 ease-out"
                            style={{
                                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                                transformOrigin: "center center",
                            }}
                        >
                            <Image
                                src={asset.original.path}
                                alt={piece.alt ?? piece.title}
                                width={asset.original.width}
                                height={asset.original.height}
                                priority
                                unoptimized
                                className="max-h-[85vh] w-auto max-w-[90vw] object-contain shadow-2xl"
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* Bottom Info HUD */}
                    <div className="flex shrink-0 items-center justify-between border-t border-border/80 bg-[#080808]/90 px-4 py-2.5 font-sans text-xs text-foreground/50 sm:px-6">
                        <span>
                            {asset.original.width} × {asset.original.height} px · Master Original
                        </span>
                        <span className="hidden sm:inline">
                            Scroll / double-click to zoom · Drag to pan · <kbd className="border border-border/60 bg-white/5 px-1 py-0.5 text-[10px]">Esc</kbd> to exit
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
