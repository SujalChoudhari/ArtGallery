import manifest from "@/public/drawings/derivatives/manifest.json";

export type ImageAssetVariant = {
    path: string;
    width: number;
    height: number;
    bytes: number;
    format: string;
};

export type ImageAsset = {
    original: ImageAssetVariant;
    thumb: ImageAssetVariant;
    detail: ImageAssetVariant;
};

type ImageManifest = {
    version: number;
    presets: Record<string, { width: number; quality: number }>;
    assets: Record<string, ImageAsset>;
};

const imageManifest = manifest as ImageManifest;

export function getImageAsset(originalPath: string): ImageAsset {
    const asset = imageManifest.assets[originalPath];

    if (!asset) {
        throw new Error(`Missing generated image derivatives for ${originalPath}. Run npm run images:generate.`);
    }

    return asset;
}
