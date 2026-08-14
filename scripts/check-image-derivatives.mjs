import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const drawingsDir = path.join(projectRoot, "public", "drawings");
const derivativeDir = path.join(drawingsDir, "derivatives");
const manifestPath = path.join(derivativeDir, "manifest.json");
const sourceExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function isSourceFile(name) {
    return sourceExtensions.has(path.extname(name).toLowerCase());
}

function publicPath(filePath) {
    return `/${path.relative(path.join(projectRoot, "public"), filePath).split(path.sep).join("/")}`;
}

async function main() {
    let manifest;
    try {
        manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    } catch (error) {
        throw new Error(`Cannot read ${manifestPath}. Run npm run images:generate first. ${error instanceof Error ? error.message : error}`);
    }

    const entries = (await readdir(drawingsDir, { withFileTypes: true }))
        .filter((entry) => entry.isFile() && sourceExtensions.has(path.extname(entry.name).toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name, "en"));
    const expectedOriginals = new Set(entries.map((entry) => publicPath(path.join(drawingsDir, entry.name))));
    const manifestOriginals = new Set(Object.keys(manifest.assets ?? {}));
    const problems = [];

    for (const originalPath of expectedOriginals) {
        const asset = manifest.assets?.[originalPath];
        if (!asset) {
            problems.push(`manifest missing original: ${originalPath}`);
            continue;
        }
        const originalFile = path.join(projectRoot, "public", originalPath.slice(1));
        const originalStat = await stat(originalFile).catch(() => null);
        if (!originalStat) {
            problems.push(`original missing: ${originalPath}`);
        } else if (originalStat.size !== asset.original.bytes) {
            problems.push(`original byte mismatch: ${originalPath} manifest=${asset.original.bytes} actual=${originalStat.size}`);
        }
        for (const key of ["thumb", "detail"]) {
            const derivative = asset[key];
            if (!derivative?.path) {
                problems.push(`${originalPath} missing ${key} metadata`);
                continue;
            }
            const derivativeFile = path.join(projectRoot, "public", derivative.path.slice(1));
            const derivativeStat = await stat(derivativeFile).catch(() => null);
            if (!derivativeStat || derivativeStat.size === 0) {
                problems.push(`${key} missing or empty: ${derivative.path}`);
                continue;
            }
            if (derivativeStat.size !== derivative.bytes) {
                problems.push(`${key} byte mismatch: ${derivative.path} manifest=${derivative.bytes} actual=${derivativeStat.size}`);
            }
            const metadata = await sharp(derivativeFile, { failOn: "error" }).metadata().catch(() => null);
            if (!metadata || metadata.format !== "webp") problems.push(`${key} is not readable WebP: ${derivative.path}`);
        }
    }

    for (const originalPath of manifestOriginals) {
        if (!expectedOriginals.has(originalPath)) problems.push(`manifest has unexpected original: ${originalPath}`);
    }

    const derivativeEntries = await readdir(derivativeDir, { withFileTypes: true });
    const expectedDerivativePaths = new Set(
        [...expectedOriginals].flatMap((originalPath) => [manifest.assets[originalPath]?.thumb?.path, manifest.assets[originalPath]?.detail?.path]).filter(Boolean),
    );
    for (const entry of derivativeEntries) {
        if (!entry.isFile() || entry.name === "manifest.json") continue;
        const assetPath = publicPath(path.join(derivativeDir, entry.name));
        if (!expectedDerivativePaths.has(assetPath)) problems.push(`orphan derivative: ${assetPath}`);
    }

    if (problems.length > 0) {
        console.error(`Image derivative check failed (${problems.length} issue${problems.length === 1 ? "" : "s"}):`);
        for (const problem of problems) console.error(`- ${problem}`);
        process.exitCode = 1;
        return;
    }

    console.log(`Image derivative check passed: ${entries.length} originals preserved, ${entries.length * 2} readable WebP derivatives present.`);
}

main().catch((error) => {
    console.error(`Image derivative check failed: ${error instanceof Error ? error.message : error}`);
    process.exitCode = 1;
});
