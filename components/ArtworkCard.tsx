import Link from "next/link";
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
            className="group block h-full rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4"
        >
            <figure className="h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    <ArtworkImage
                        asset={asset}
                        alt={piece.title}
                        priority={priority}
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                </div>
                <figcaption className="border-b border-foreground/10 px-1 py-4">
                    <h3 className="font-serif text-xl leading-tight text-foreground sm:text-2xl">{piece.title}</h3>
                    <p className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-foreground/50">View work</p>
                </figcaption>
            </figure>
        </Link>
    );
}
