---
name: artwork-publish
description: Publish a supplied artwork to the ArtGallery mainline from image, title, thoughts, and featured status.
---

# Artwork publish

Use this skill when the user supplies an artwork image and its display metadata
for the ArtGallery repository. The repository CLI performs the catalog update,
image derivatives, focused checks, commit, and push in one guarded command.

Inputs:

- source image path
- displayed title
- supplied thoughts/reference text
- featured or not-featured

From the `ArtGallery` checkout, run:

```sh
skills/artwork-publish/scripts/publish-artwork.sh \
  --image <path> \
  --title "<title>" \
  --thoughts "<thoughts>" \
  --not-featured \
  --publish
```

Use `--featured` instead when requested. The helper delegates to
`npm run artwork:add`, which edits only the catalog and drawing assets, verifies
the generated derivatives, TypeScript, production build, and rendered route,
then commits and pushes `origin/master`. Do not invent attribution or alter the
meaning of the supplied thoughts. Report the resulting commit and artwork
route; do not claim production deployment.

