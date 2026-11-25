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
                </div>
                <figcaption className="gallery-caption">
                    <span>{piece.title}</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                </figcaption>
            </figure>
        </Link>
    );
}
