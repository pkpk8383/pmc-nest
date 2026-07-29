# Technology Featured Solutions Carousel

## Objective
Turn `#solutions` on `technology.html` into a 2-card-per-view slider with 6 solution cards from Figma Case studies component `199:13710` (Default / Variant2 / Variant3).

## Requirements
- Header: Featured solutions + Schedule a demo CTA
- Side prev/next arrows; show 2 cards at a time; 3 pages (6 cards)
- Grid background; white cards with image left + copy right
- Download 6 card images from Figma variants

## Assumptions
- User link `199-4801` was Core Services; correct set is Case studies `199:13710`
- Slide copy/images from Figma take priority; 2nd screenshot aligns with those 6 titles

## Affected modules
- Technology Featured Solutions

## Affected files
- `technology.html`
- `assets/css/style.css`, `responsive.css`
- `assets/js/main.js` (`initSolutionsCarousel`)
- `assets/images/tech-sol-1.jpg` … `tech-sol-6.jpg`

## Database / API
None

## Implementation phases
1. Pull Variant2/3 texts + image URLs
2. Download 6 images
3. Markup carousel (3 slides × 2 cards)
4. CSS + JS
5. Browser QA

## Testing
- Arrows cycle pages 1→2→3→1
- Schedule a demo links to contact
- Responsive stacks cards

## Security
None

## Risks
- Large image assets; compress later if needed

## Completion checklist
- [x] 6 images downloaded (`tech-sol-1`…`6`)
- [x] Carousel wired (`data-cs2-slider`, 3 pages × 2 cards)
- [x] Matches Figma layout (Schedule a demo, arrows, grid bg)
- [x] Browser verified
