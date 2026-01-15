"use client";

import { useState, useEffect, useRef } from "react";
import GalleryCard from "./GalleryCard";

interface ArtPiece {
    id: number;
    title: string;
    image: string;
}

interface MasonryLayoutProps {
    items: ArtPiece[];
    openLightbox: (index: number) => void;
}

export default function MasonryLayout({ items, openLightbox }: MasonryLayoutProps) {
    const [columns, setColumns] = useState(1);
    const [distributedColumns, setDistributedColumns] = useState<ArtPiece[][]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const updateColumns = () => {
            if (window.matchMedia("(min-width: 1280px)").matches) setColumns(5);
            else if (window.matchMedia("(min-width: 1024px)").matches) setColumns(4);
            else if (window.matchMedia("(min-width: 768px)").matches) setColumns(3);
            else if (window.matchMedia("(min-width: 640px)").matches) setColumns(2);
            else setColumns(1);
        };

        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    // Greedy "Shortest Column" Distribution
    useEffect(() => {
        setLoading(true); // Start loading when items/columns change

        if (columns === 1) {
            setDistributedColumns([items]);
            setLoading(false);
            return;
        }

        const distributeItems = async () => {
            const colHeights = new Array(columns).fill(0);
            const cols: ArtPiece[][] = Array.from({ length: columns }, () => []);

            // Helper to get image aspect ratio
            const getAspectRatio = (src: string): Promise<number> => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => {
                        const ratio = img.height / (img.width || 1);
                        resolve(ratio);
                    };
                    img.onerror = () => resolve(1); // Fallback to square
                });
            };

            const ratios = await Promise.all(items.map(item => getAspectRatio(item.image)));

            items.forEach((item, index) => {
                const ratio = ratios[index];
                let shortestColIndex = 0;
                let minHeight = colHeights[0];

                for (let i = 1; i < columns; i++) {
                    if (colHeights[i] < minHeight) {
                        minHeight = colHeights[i];
                        shortestColIndex = i;
                    }
                }

                cols[shortestColIndex].push(item);
                colHeights[shortestColIndex] += ratio;
            });

            setDistributedColumns(cols);
            setLoading(false);
        };

        distributeItems();
    }, [items, columns]);

    if (loading) {
        return (
            <div className="flex gap-3 md:gap-4 lg:gap-5 items-start">
                {Array.from({ length: columns }).map((_, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-3 md:gap-4 lg:gap-5 flex-1">
                        {/* Show a few skeletons per column */}
                        <div className="bg-gray-200 animate-pulse w-full h-64 rounded-none"></div>
                        <div className="bg-gray-200 animate-pulse w-full h-96 rounded-none"></div>
                        <div className="bg-gray-200 animate-pulse w-full h-48 rounded-none"></div>
                        <div className="bg-gray-200 animate-pulse w-full h-80 rounded-none"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex gap-3 md:gap-4 lg:gap-5 items-start">
            {distributedColumns.map((col, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-3 md:gap-4 lg:gap-5 flex-1">
                    {col.map((piece) => {
                        const originalIndex = items.findIndex((p) => p.id === piece.id);
                        return (
                            <GalleryCard
                                key={piece.id}
                                id={piece.id}
                                title={piece.title}
                                image={piece.image}
                                index={originalIndex}
                                onClick={() => openLightbox(originalIndex)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
