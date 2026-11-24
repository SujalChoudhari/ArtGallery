import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ArtworkImage from "@/components/ArtworkImage";
import type { ArtPiece } from "@/lib/drawings";
import { getImageAsset } from "@/lib/image-assets";

type ArtworkCardProps = {
    piece: ArtPiece;
    priority?: boolean;
};

export default function ArtworkCard({ piece, priority = false }: ArtworkCardProps) {
    const asset = getImageAsset(piece.image);

    return (
        <Link
            href={`/art/${piece.slug}`}
            className="gallery-card gallery-grid-card group h-full"
        >
            <figure className="h-full">
                <div className="relative aspect-[4/3] overflow-hidden gallery-image-stage">
                    <ArtworkImage
                        asset={asset}
                        alt={piece.alt ?? piece.title}
                        priority={priority}
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 360px) 50vw, 100vw"
                    />
                    {piece.status === "available" && piece.price && (
                        <span className="absolute top-2.5 right-2.5 z-10 rounded-xs bg-background/90 px-2 py-0.5 font-sans text-[11px] font-medium text-foreground backdrop-blur-md border border-foreground/10 shadow-xs">
                            {piece.currency ?? "₹"}{piece.price.toLocaleString("en-IN")}
                        </span>
                    )}
                    {piece.status === "reserved" && (
                        <span className="absolute top-2.5 right-2.5 z-10 rounded-xs bg-background/90 px-2 py-0.5 font-sans text-[10px] uppercase tracking-wider text-amber-500 backdrop-blur-md border border-amber-500/30">
                            Reserved
                        </span>
                    )}
                </div>
                <figcaption className="gallery-caption">
                    <span>{piece.title}</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                </figcaption>
            </figure>
        </Link>
    );
}
