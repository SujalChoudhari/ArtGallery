import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const manifestPath = path.join(projectRoot, "public", "drawings", "derivatives", "manifest.json");

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KiB`;
    return `${(bytes / 1024 ** 2).toFixed(2)} MiB`;
}

async function main() {
    let manifest;
    try {
        manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    } catch (error) {
        throw new Error(`Cannot read ${manifestPath}. Run npm run images:generate first. ${error instanceof Error ? error.message : error}`);
    }

    const assets = Object.values(manifest.assets ?? {});
    const originalBytes = assets.reduce((sum, asset) => sum + asset.original.bytes, 0);
    const thumbBytes = assets.reduce((sum, asset) => sum + asset.thumb.bytes, 0);
    const detailBytes = assets.reduce((sum, asset) => sum + asset.detail.bytes, 0);
    const derivativeBytes = thumbBytes + detailBytes;
    const thumbSaved = originalBytes - thumbBytes;
    const detailSaved = originalBytes - detailBytes;
    const bothSaved = originalBytes * 2 - derivativeBytes;

    console.log(`Image derivative report (${assets.length} originals)`);
    console.log(`  Originals: ${originalBytes} bytes (${formatBytes(originalBytes)})`);
    console.log(`  Thumbs:    ${assets.length} files · ${thumbBytes} bytes (${formatBytes(thumbBytes)}) · ${thumbSaved} bytes saved (${formatBytes(thumbSaved)}, ${((thumbSaved / originalBytes) * 100).toFixed(1)}%)`);
    console.log(`  Details:   ${assets.length} files · ${detailBytes} bytes (${formatBytes(detailBytes)}) · ${detailSaved} bytes saved (${formatBytes(detailSaved)}, ${((detailSaved / originalBytes) * 100).toFixed(1)}%)`);
    console.log(`  Both sets: ${assets.length * 2} files · ${derivativeBytes} bytes (${formatBytes(derivativeBytes)}) · ${bothSaved} bytes saved vs two original copies`);
    console.log(`  Manifest:  ${path.relative(projectRoot, manifestPath)}`);

    await stat(manifestPath);
}

main().catch((error) => {
    console.error(`Image derivative report failed: ${error instanceof Error ? error.message : error}`);
    process.exitCode = 1;
});
