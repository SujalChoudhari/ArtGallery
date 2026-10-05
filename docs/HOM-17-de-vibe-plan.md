# HOM-17 — De-vibe the art website

## Brief

Make the site read like a person sharing their art, not like a generated gallery template. Keep the artwork, titles, image treatment, navigation, and ownership information intact while removing labels that sound like metadata or marketing filler.

## Evidence from the current site

- Homepage hero footer: `Selected work · Kanheri, in Warli`.
- Homepage section eyebrow/heading: `A considered selection` / `Selected works`.
- Homepage section description: `A small doorway into the collection...`.
- Archive metadata line: `{count} works · thoughts first · newest within each group`.
- Card action on every artwork: `View work`.
- Artwork detail metadata: `Lines & Feelings · {id}` and the generic `Thoughts` label.
- Site-wide metadata calls the collection “curated”; this is acceptable for search metadata only if it is not shown as visible editorial copy.
- `components/FeaturedSection.tsx` contains a separate, unused-looking presentation with generic phrases (`Imperfection is Beautiful`, `Beyond the Highlights`, `Explore the Archive`) and should be checked before editing or removing it.

## Proposed voice and content direction

Use plain, specific language anchored in the artist’s practice. Prefer a work’s title, subject, place, material, or the artist’s own note over gallery jargon. Avoid “selected,” “curated,” “highlights,” “collection,” “unlock,” “considered,” and bare system labels unless they communicate something the visitor actually needs.

Suggested visible replacements:

| Current | Proposed direction |
| --- | --- |
| `Selected work · {title}` | `{title}` or `From the studio: {title}` |
| `Scroll to selected works` | `See a few drawings` |
| `A considered selection` / `Selected works` | `A few things I’ve made` |
| `A small doorway into the collection...` | `Start with these, then wander through the rest.` |
| `The complete collection` / `Take the long way through.` | `There’s more to see` / `Browse all the drawings` |
| `thoughts first · newest within each group` | Remove; expose only a useful count or a natural sorting description if the UI actually supports it |
| `View work` | `Open {title}` or remove the repeated action because the title/card is already the link |
| `Thoughts` | `About this drawing` when a note exists; omit the label if the note can stand alone |
| `Lines & Feelings · {id}` | `No. {id}` only if numbering matters to the artist; otherwise remove |
| `Keep looking` / `Latest works` | `More drawings` / `More from the studio` |

These are editorial proposals, not approval to change the artist’s voice blindly. Senior Engineer/Venus should confirm the final wording before implementation.

## Implementation scope

1. Coder updates visible copy in `app/page.tsx`, `app/archive/page.tsx`, `app/art/[slug]/page.tsx`, `components/ArtworkCard.tsx`, and `components/SiteHeader.tsx` as needed.
2. Coder audits `components/FeaturedSection.tsx` for live references before changing or deleting any text; do not remove it solely because it is not imported in the first-pass route audit.
3. Preserve the existing image assets, artwork titles, artwork notes, attribution, route structure, structured metadata, and image alt text unless a separate content correction is approved.
4. Keep labels useful for accessibility: every image remains meaningfully named, links remain understandable out of context, and the archive remains keyboard navigable.
5. Do not introduce new animation, decorative copy, filters, or taxonomy as part of this cleanup.

## Acceptance criteria

- No visible occurrence remains of the exact phrases `Selected work`, `Selected works`, `A considered selection`, `thoughts first`, or `View work` after the copy pass.
- Visible text describes what a visitor can see or do in natural language; repeated generic labels are removed or made specific to the artwork.
- Homepage, archive, and artwork detail pages retain clear page titles, useful headings, working links, and attribution.
- Artwork image alt text remains title-based or explicitly descriptive; decorative hero imagery stays empty-alt and does not become noisy to screen readers.
- No image files, artwork records, route paths, or ownership claims are changed in this task.
- Focused checks pass: repository lint/type/build check appropriate to the changed files, plus a rendered review of `/`, `/archive`, and one `/art/[slug]` page at mobile and desktop widths if a local preview is available.
- The final handoff records which phrases were changed, the exact check command(s), and whether rendered visual verification was completed. Unpublished work must not be described as live.

## Handoff and dependencies

This is a content/UX brief for implementation by Coder through Senior Engineer. The Art Website Manager will verify the rendered copy, image prominence, accessibility, attribution, and focused checks after implementation. Venus owns final scope/voice approval; Senior Engineer owns technical review.

Next action after approval: create or route the implementation task to Coder with this brief attached, then review the resulting diff and rendered pages.
