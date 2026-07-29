# Landing Sectors Mobile/Tablet Fix

## Objective
Match `index.html` `#sectors` to Figma Android Compact `89:546` on mobile/tablet only; keep desktop expanding gallery.

## Requirements
- Mobile/tablet: stacked tag → title → intro → one full-width sector card carousel → centered CTA
- Next arrow on card’s right edge
- CTA: outline pill + orange double chevrons
- Desktop: unchanged horizontal expand-on-hover gallery

## Assumptions
- Breakpoint ≤991.98px (existing tablet/mobile)
- Reuse `initSectorSlider` with `data-sector-*` markup

## Affected modules
- Landing — Sectors

## Affected files
- `index.html`
- `assets/css/style.css`
- `assets/css/responsive.css`
- `assets/js/main.js` (if needed)

## Database / API
None

## Implementation phases
1. Restructure markup (slider + CTA placement)
2. Desktop grid layout for head/CTA
3. Mobile carousel scroll-snap + arrow
4. Browser QA at mobile width

## Testing
- ≤991px: one card, arrow advances, CTA centered
- ≥992px: expanding gallery unchanged

## Security
None

## Risks
Low — responsive-only behavior

## Completion checklist
- [x] Markup + slider wired
- [x] Mobile matches Figma
- [x] Desktop unchanged
- [x] Browser verified
