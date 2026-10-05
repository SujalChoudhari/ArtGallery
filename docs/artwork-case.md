# Artwork publishing case

Use the gallery CLI for every new artwork. The case inputs are:

- `--image <path>` — source image to add
- `--title <title>` — displayed artwork title
- `--thoughts <text>` — the artist's supplied thought/reference, kept verbatim after copy approval
- exactly one of `--featured` or `--not-featured` — whether the artwork appears in the featured collection

## Run

From `ArtGallery/`:

```sh
npm run artwork:add -- \
  --image <path> \
  --title "<title>" \
  --thoughts "<thoughts>" \
  --not-featured \
  --publish
```

Replace `--not-featured` with `--featured` when the work belongs in the featured collection. The command creates the catalog entry, copies the source image, generates and checks image derivatives, runs TypeScript and production-build checks, verifies the rendered artwork route, then commits and pushes to `origin/master` when `--publish` is supplied.

## Acceptance

- The supplied image is used without inventing attribution or changing the approved thought.
- The title and thought appear on the artwork route.
- The featured flag controls membership in the featured collection.
- Image derivatives, TypeScript, build, rendered route, and remote push read-back pass before reporting completion.
- Publishing is to the repository's mainline only; production deployment remains a separate approval.
