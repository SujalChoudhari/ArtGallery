# Image derivatives

The gallery keeps every source image in `public/drawings/` unchanged and serves generated WebP derivatives from `public/drawings/derivatives/`.

- `thumb`: max 640px wide, used by archive and selected-work cards.
- `detail`: max 1800px wide, used by the homepage hero and artwork detail pages.
- `manifest.json`: deterministic source/derivative paths plus dimensions and byte sizes.

## Commands

```bash
npm run images:generate  # create/update all derivatives and the manifest
npm run images:report    # show counts, total bytes, and savings
npm run images:check     # fail if originals, manifest entries, or derivatives are missing
```

Generation is explicit and idempotent; the Next.js build does not download or regenerate images. Run `images:generate` after adding or replacing an original, then run `images:check` before a build. The UI uses a WebP `<source>` with the unchanged original JPEG/MPO as the `<img>` fallback, so browsers without WebP support still receive the original asset.
