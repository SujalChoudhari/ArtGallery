#!/usr/bin/env node

import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = path.resolve(import.meta.dirname, "..");
const drawingsPath = path.join(projectRoot, "lib", "drawings.ts");

async function main() {
  console.log("Checking ArtGallery catalog integrity...");
  const content = await readFile(drawingsPath, "utf8");

  // Parse artPieces array entries
  const pieceRegex = /\{\s*id:\s*(\d+),\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*image:\s*"([^"]+)"/g;
  let match;
  const pieces = [];
  const ids = new Set();
  const slugs = new Set();
  const duplicateIds = [];
  const duplicateSlugs = [];

  while ((match = pieceRegex.exec(content)) !== null) {
    const id = parseInt(match[1], 10);
    const slug = match[2];
    const title = match[3];
    const image = match[4];

    if (ids.has(id)) duplicateIds.push(id);
    else ids.add(id);

    if (slugs.has(slug)) duplicateSlugs.push(slug);
    else slugs.add(slug);

    pieces.push({ id, slug, title, image });
  }

  let errors = 0;

  if (duplicateIds.length > 0) {
    console.error(`\x1b[31m✖ Duplicate IDs found:\x1b[0m ${duplicateIds.join(", ")}`);
    errors++;
  }

  if (duplicateSlugs.length > 0) {
    console.error(`\x1b[31m✖ Duplicate slugs found:\x1b[0m ${duplicateSlugs.join(", ")}`);
    errors++;
  }

  // Check existence of all referenced images
  let missingImages = 0;
  for (const piece of pieces) {
    const relativeImagePath = piece.image.startsWith("/") ? piece.image.slice(1) : piece.image;
    const fullPath = path.join(projectRoot, "public", relativeImagePath);
    const s = await stat(fullPath).catch(() => null);
    if (!s || !s.isFile()) {
      console.error(`\x1b[31m✖ Missing image for #${piece.id} (${piece.title}):\x1b[0m ${piece.image}`);
      missingImages++;
      errors++;
    }
  }

  // Check required key pieces
  const requiredSlugs = ["kanheri-in-warli", "amaze-amaze-amaze", "tree-at-sunset", "goku"];
  for (const req of requiredSlugs) {
    if (!slugs.has(req)) {
      console.warn(`\x1b[33m⚠ Warning: Expected key slug "${req}" not found in catalog\x1b[0m`);
    }
  }

  if (errors > 0) {
    console.error(`\n\x1b[31mCatalog check failed with ${errors} error(s).\x1b[0m`);
    process.exit(1);
  }

  console.log(`\x1b[32m✔ Catalog check passed:\x1b[0m ${pieces.length} art pieces verified. All images present, no duplicate IDs or slugs.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
