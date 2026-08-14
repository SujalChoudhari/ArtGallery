"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageAsset, ImageAssetVariant } from "@/lib/image-assets";
import { cn } from "@/lib/utils";

type ArtworkImageProps = {
    asset: ImageAsset;
    alt: string;
    priority?: boolean;
    sizes: string;
    variant?: "thumb" | "detail";
    fit?: "contain" | "cover";
    className?: string;
};

export default function ArtworkImage({
    asset,
    alt,
    priority = false,
    sizes,
    variant = "thumb",
    fit = "contain",
    className,
}: ArtworkImageProps) {
    const derivative: ImageAssetVariant = asset[variant];
    const [useOriginal, setUseOriginal] = useState(false);
    const [phase, setPhase] = useState<"loading" | "loaded" | "error">("loading");

    const handleError = () => {
        if (!useOriginal) {
            setUseOriginal(true);
            setPhase("loading");
            return;
        }
        setPhase("error");
    };

    if (phase === "error") {
        return (
            <div className={cn("flex h-full w-full items-center justify-center bg-zinc-100 px-5 text-center font-sans text-xs uppercase tracking-[0.16em] text-foreground/50", className)} role="img" aria-label={alt}>
                Image unavailable
            </div>
        );
    }

    return (
        <div
            className={cn("relative h-full w-full overflow-hidden", className)}
            data-image-state={phase}
            aria-busy={phase === "loading"}
        >
            {phase === "loading" && <div className="artwork-image-skeleton absolute inset-0" aria-hidden="true" />}
            <picture className="absolute inset-0 block h-full w-full">
                {!useOriginal && <source type="image/webp" srcSet={derivative.path} sizes={sizes} />}
                <Image
                    src={asset.original.path}
                    alt={alt}
                    fill
                    priority={priority}
                    loading={priority ? undefined : "lazy"}
                    sizes={sizes}
                    unoptimized
                    onLoad={() => setPhase("loaded")}
                    onError={handleError}
                    className={cn("artwork-image-media transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.025]", fit === "cover" ? "object-cover" : "object-contain")}
                />
            </picture>
        </div>
    );
}
