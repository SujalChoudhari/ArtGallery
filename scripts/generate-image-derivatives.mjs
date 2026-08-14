import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const drawingsDir = path.join(projectRoot, "public", "drawings");
const derivativeDir = path.join(drawingsDir, "derivatives");
const manifestPath = path.join(derivativeDir, "manifest.json");

const presets = {
    thumb: { width: 640, quality: 78 },
    detail: { width: 1800, quality: 84 },
};

const sourceExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function isSourceFile(name) {
    return sourceExtensions.has(path.extname(name).toLowerCase());
}

function derivativeStem(fileName) {
    const withoutExtension = path.basename(fileName, path.extname(fileName));
    const safeName = withoutExtension.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "image";
    const suffix = createHash("sha1").update(fileName).digest("hex").slice(0, 8);
    return `${safeName}-${suffix}`;
}

function publicPath(filePath) {
    return `/${path.relative(path.join(projectRoot, "public"), filePath).split(path.sep).join("/")}`;
}

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KiB`;
    return `${(bytes / 1024 ** 2).toFixed(2)} MiB`;
}

async function writeDerivative(sourcePath, outputPath, preset) {
    const temporaryPath = `${outputPath}.tmp`;
    const info = await sharp(sourcePath, { failOn: "error" })
        .rotate()
        .resize({ width: preset.width, height: preset.width, fit: "inside", withoutEnlargement: true })
        .webp({ quality: preset.quality, effort: 5 })
        .toFile(temporaryPath);
    await rename(temporaryPath, outputPath);
    return {
        path: publicPath(outputPath),
        width: info.width,
        height: info.height,
        bytes: info.size,
        format: "webp",
    };
}

async function main() {
    const entries = (await readdir(drawingsDir, { withFileTypes: true }))
        .filter((entry) => entry.isFile() && isSourceFile(entry.name))
        .sort((a, b) => a.name.localeCompare(b.name, "en"));

    if (entries.length === 0) {
        throw new Error(`No source images found in ${drawingsDir}`);
    }

    await mkdir(derivativeDir, { recursive: true });
    const assets = {};
    let originalBytes = 0;
    let thumbBytes = 0;
    let detailBytes = 0;

    for (const entry of entries) {
        const sourcePath = path.join(drawingsDir, entry.name);
        const sourceBytes = (await stat(sourcePath)).size;
        const sourceMetadata = await sharp(sourcePath, { failOn: "error" }).metadata();
        const stem = derivativeStem(entry.name);
        const thumbPath = path.join(derivativeDir, `${stem}.thumb.webp`);
        const detailPath = path.join(derivativeDir, `${stem}.detail.webp`);
        const thumb = await writeDerivative(sourcePath, thumbPath, presets.thumb);
        const detail = await writeDerivative(sourcePath, detailPath, presets.detail);

        assets[publicPath(sourcePath)] = {
            original: {
                path: publicPath(sourcePath),
                width: sourceMetadata.width ?? 0,
                height: sourceMetadata.height ?? 0,
                bytes: sourceBytes,
                format: sourceMetadata.format ?? "unknown",
            },
            thumb,
            detail,
        };
        originalBytes += sourceBytes;
        thumbBytes += thumb.bytes;
        detailBytes += detail.bytes;
    }

    const manifest = {
        version: 1,
        presets,
        assets,
    };
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

    const derivativeBytes = thumbBytes + detailBytes;
    console.log(`Generated ${entries.length} originals → ${entries.length * 2} WebP derivatives.`);
    console.log(`Originals: ${formatBytes(originalBytes)} total`);
    console.log(`Thumbs:    ${formatBytes(thumbBytes)} total (${formatBytes(originalBytes - thumbBytes)} saved vs originals)`);
    console.log(`Details:   ${formatBytes(detailBytes)} total (${formatBytes(originalBytes - detailBytes)} saved vs originals)`);
    console.log(`Both sets: ${formatBytes(derivativeBytes)} total (${formatBytes(originalBytes * 2 - derivativeBytes)} saved vs two original copies)`);
    console.log(`Manifest:  ${path.relative(projectRoot, manifestPath)}`);
}

main().catch((error) => {
    console.error(`Image derivative generation failed: ${error instanceof Error ? error.message : error}`);
    process.exitCode = 1;
});
