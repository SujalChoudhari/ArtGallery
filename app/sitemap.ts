import type { MetadataRoute } from "next";
import { allArtPieces } from "@/lib/drawings";

const SITE_URL = "https://art.sujal.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: SITE_URL },
        { url: `${SITE_URL}/archive` },
        ...allArtPieces.map((piece) => ({
            url: `${SITE_URL}/art/${piece.slug}`,
        })),
    ];
}
