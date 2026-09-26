#!/usr/bin/env node

import { copyFile, mkdtemp, readFile, rm, stat, symlink, writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const rootResult = spawnSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" });
const projectRoot = rootResult.status === 0 ? rootResult.stdout.trim() : "";
const args = parseArgs(process.argv.slice(2));
const extensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function parseArgs(argv) {
    const options = { publish: false, serve: false, featured: false, featuredSet: false, port: "4175" };
    for (let i = 0; i < argv.length; i += 1) {
        const token = argv[i];
        if (token === "--publish") options.publish = true;
        else if (token === "--serve") options.serve = true;
        else if (token === "--featured") {
            if (options.featuredSet && !options.featured) throw new Error("Use either --featured or --not-featured");
            options.featured = true; options.featuredSet = true;
        } else if (token === "--not-featured") {
            if (options.featuredSet && options.featured) throw new Error("Use either --featured or --not-featured");
            options.featured = false; options.featuredSet = true;
        } else if (["--image", "--title", "--slug", "--thoughts", "--port"].includes(token)) {
            const value = argv[++i];
            if (!value || value.startsWith("--")) throw new Error(`${token} requires a value`);
            options[token.slice(2)] = value;
        } else if (token === "--help" || token === "-h") {
            printHelp(); process.exit(0);
        } else throw new Error(`Unknown option: ${token}`);
    }
    if (!options.image || !options.title) throw new Error("--image and --title are required");
    if (options.publish && options.serve) throw new Error("Use either --publish or --serve, not both");
    if (!/^\d+$/.test(options.port) || Number(options.port) < 1024 || Number(options.port) > 65535) throw new Error("--port must be 1024–65535");
    return options;
}

function printHelp() {
    console.log(`Usage:
  npm run artwork:add -- --image <path> --title <title> [options]

Options:
  --slug <slug>       Optional URL slug; defaults to title
  --thoughts <text>   Optional thoughts
  --featured          Include in featured collection
  --not-featured      Keep out of featured collection (default)
  --serve             Verify and keep a local preview running
  --publish           Verify, commit, and push to origin/master
  --port <port>       Preview port (default: 4175)`);
}

function run(command, args, cwd, label) {
    const result = spawnSync(command, args, { cwd, encoding: "utf8", stdio: "pipe" });
    if (result.status !== 0) throw new Error(`${label} failed (exit ${result.status}):\n${result.stdout}\n${result.stderr}`.trim());
    return result.stdout.trim();
}

function quiet(command, args, cwd) {
    const result = spawnSync(command, args, { cwd, encoding: "utf8", stdio: "pipe" });
    return { status: result.status, stdout: result.stdout.trim(), stderr: result.stderr.trim() };
}

function slugify(value) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function fileStem(value) { return value.trim().replace(/[^a-zA-Z0-9_-]+/g, "_").replace(/^_+|_+$/g, "") || "artwork"; }
function quoted(value) { return JSON.stringify(value); }
function escapeHtml(value) { return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }

async function getPage(url, timeoutMs = 30000) {
    const deadline = Date.now() + timeoutMs;
    let last = "not attempted";
    while (Date.now() < deadline) {
        try {
            const response = await fetch(url);
            const body = await response.text();
            if (response.ok) return { status: response.status, body };
            last = `HTTP ${response.status}`;
        } catch (error) { last = error instanceof Error ? error.message : String(error); }
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
    throw new Error(`Preview did not become ready: ${last}`);
}

async function preview(worktree, slug) {
    const child = spawn("npm", ["run", "start", "--", "-H", "127.0.0.1", "-p", args.port], { cwd: worktree, stdio: "ignore" });
    child.unref();
    try {
        const url = `http://127.0.0.1:${args.port}/art/${slug}`;
        const result = await getPage(url);
        if (!result.body.includes(`>${escapeHtml(args.title.trim())}<`) || !result.body.includes("/drawings/")) throw new Error("Preview did not contain the requested title and image");
        console.log(`Preview verified: ${url} (HTTP ${result.status})`);
        return { child, url };
    } catch (error) {
        child.kill("SIGTERM");
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

async function main() {
    if (!projectRoot) throw new Error("Run inside the art-gallery Git repository");
    const source = path.resolve(args.image);
    const sourceStat = await stat(source).catch(() => null);
    if (!sourceStat?.isFile()) throw new Error(`Image does not exist: ${source}`);
    const extension = path.extname(source).toLowerCase();
    if (!extensions.has(extension)) throw new Error(`Unsupported image extension: ${extension}`);
    await sharp(source, { failOn: "error" }).metadata();
    const title = args.title.trim();
    if (title.length < 1 || title.length > 120) throw new Error("Title must be 1–120 characters");

    const base = run("git", ["rev-parse", "origin/master"], projectRoot, "remote branch lookup");
    const slug = args.slug ? slugify(args.slug) : slugify(title);
    if (!slug) throw new Error("Title/slug must contain a letter or number");
    const worktree = await mkdtemp(path.join(os.tmpdir(), `art-gallery-${slug}-`));
    let runningPreview;
    try {
        run("git", ["worktree", "add", "--detach", worktree, base], projectRoot, "isolated worktree creation");
        const dependencies = path.join(projectRoot, "node_modules");
        if (!(await stat(dependencies).catch(() => null))?.isDirectory()) throw new Error("Dependencies are not installed; run npm install in the art-gallery checkout first");
        await symlink(dependencies, path.join(worktree, "node_modules"), "dir");
        const catalogPath = path.join(worktree, "lib", "drawings.ts");
        let catalog = await readFile(catalogPath, "utf8");
        if (catalog.includes(`slug: ${quoted(slug)}`)) throw new Error(`Slug already exists: ${slug}`);
        const ids = [...catalog.matchAll(/\bid:\s*(\d+)/g)].map((match) => Number(match[1]));
        const featuredOrders = [...catalog.matchAll(/\bfeaturedOrder:\s*(\d+)/g)].map((match) => Number(match[1]));
        const id = Math.max(...ids, 0) + 1;
        const fileName = `${String(id).padStart(2, "0")}_${fileStem(title)}${extension}`;
        await copyFile(source, path.join(worktree, "public", "drawings", fileName));
        const entry = [
            "    {", `        id: ${id},`, `        slug: ${quoted(slug)},`, `        title: ${quoted(title)},`, `        image: ${quoted(`/drawings/${fileName}`)},`,
            ...(args.featured ? ["        isFeatured: true,", `        featuredOrder: ${Math.max(...featuredOrders, 0) + 1},`] : []),
            ...(args.thoughts?.trim() ? [`        thoughts: ${quoted(args.thoughts.trim())},`] : []), "    },",
        ].join("\n");
        const marker = "\n];\n\nexport const allArtPieces";
        if (!catalog.includes(marker)) throw new Error("Catalog shape not recognized; refusing to edit");
        await writeFile(catalogPath, catalog.replace(marker, `\n${entry}\n];\n\nexport const allArtPieces`), "utf8");

        run("npm", ["run", "images:generate"], worktree, "image derivative generation");
        run("npm", ["run", "images:check"], worktree, "image derivative verification");
        run("npx", ["tsc", "--noEmit"], worktree, "TypeScript verification");
        run("npm", ["run", "build"], worktree, "production build");
        run("git", ["diff", "--check"], worktree, "diff verification");
        runningPreview = await preview(worktree, slug);

        if (args.serve) {
            const ip = quiet("hostname", ["-I"], worktree).stdout.split(/\s+/)[0] || "127.0.0.1";
            console.log(`Preview kept running: http://${ip}:${args.port}/art/${slug}`);
            await new Promise((resolve) => {
                const stop = () => { runningPreview.child.kill("SIGTERM"); resolve(); };
                process.once("SIGINT", stop); process.once("SIGTERM", stop);
            });
        } else if (args.publish) {
            const remote = run("git", ["ls-remote", "origin", "refs/heads/master"], worktree, "remote state check").split(/\s+/)[0];
            if (remote !== base) throw new Error(`Remote changed during run (${base} → ${remote}); refusing to publish`);
            run("git", ["add", "--", "lib/drawings.ts", "public/drawings"], worktree, "staging allowlist");
            const changed = run("git", ["diff", "--cached", "--name-only"], worktree, "staged file inspection").split("\n").filter(Boolean);
            if (changed.some((file) => file !== "lib/drawings.ts" && !file.startsWith("public/drawings/"))) throw new Error(`Unexpected staged paths: ${changed.join(", ")}`);
            run("git", ["commit", "-m", `Add ${title} to art gallery`], worktree, "commit");
            const commit = run("git", ["rev-parse", "HEAD"], worktree, "commit read-back");
            run("git", ["push", "origin", "HEAD:master"], worktree, "publish");
            const published = run("git", ["ls-remote", "origin", "refs/heads/master"], worktree, "publish read-back").split(/\s+/)[0];
            if (published !== commit) throw new Error(`Publish read-back mismatch: expected ${commit}, got ${published}`);
            console.log(`Published ${title} as ${commit}`);
            console.log(`Artwork: https://art.sujal.xyz/art/${slug}`);
        } else console.log("Preview-only run complete. Add --publish to commit and push after verification.");
    } finally {
        if (runningPreview?.child && !args.serve) runningPreview.child.kill("SIGTERM");
        if (args.serve && runningPreview) runningPreview?.child.kill("SIGTERM");
        quiet("git", ["worktree", "remove", "--force", worktree], projectRoot);
        await rm(worktree, { recursive: true, force: true });
    }
}

main().catch((error) => { console.error(`Artwork pipeline blocked: ${error instanceof Error ? error.message : error}`); process.exitCode = 1; });
