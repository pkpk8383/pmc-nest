# Technology Capabilities 6-Slide Carousel

## Objective
Replace the static capabilities block on `technology.html` with a working 6-slide carousel matching Figma `199:3972` layout and variant set `199:4801` (Default–Variant6).

## Requirements
- Layout: centered title, image left + copy/CTA right, side arrows, 6 dots
- Six slides with Figma images + copy from Core Services Tech variants
- Reuse existing `pmc-whatwedo` carousel pattern + `data-whatwedo` JS
- CTA style per Figma (outline / primary as designed)

## Assumptions
- Slide content comes from Figma variants (second screenshot confirms topics)
- Existing `initWhatWeDoCarousel` works when section has `data-whatwedo`

## Affected modules
- Technology page — capabilities section

## Affected files
- `technology.html`
- `assets/css/style.css` (minor tech-specific tweaks if needed)
- `assets/js/main.js` (only if multi-root init needed)
- `assets/images/tech-cap-1.jpg` … `tech-cap-6.jpg`

## Database changes
None

## API changes
None

## Implementation phases
1. Pull all 6 variant texts + image URLs from Figma
2. Download images locally
3. Rebuild markup as carousel with 6 slides
4. Style tweaks + cache bust
5. Browser QA (arrows, dots, all slides)

## Testing requirements
- Prev/next cycles all 6 slides
- Dots sync with active slide
- Images load; responsive stack works

## Security considerations
None

## Risks and dependencies
- Figma asset URLs expire ~7 days — must download
- CTA label may differ per variant (Schedule a demo vs More details)

## Completion checklist
- [x] 6 images downloaded (`tech-cap-1`…`6` from Figma variants)
- [x] Markup + JS wired (`data-whatwedo` carousel)
- [x] Matches Figma layout (arrows, dots, Schedule a demo)
- [x] Browser verified (6 slides; next/dots work)

Note: Figma variant titles (Citizen Services & Portals, etc.) used as source of truth over the alternate “Cloud & Infrastructure” mock screenshot. Image files are large (~2–7MB); compress later if needed.
