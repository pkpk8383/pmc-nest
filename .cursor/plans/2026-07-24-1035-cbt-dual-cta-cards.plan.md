# Capacity Building Dual CTA Cards Fix

## Objective
Match the Contact Us / dual CTA block on `capacity-building.html` to Figma node `31:2573` and the attached screenshot.

## Requirements
- Two unequal cards (~702 / 525) with ~52px gap
- Left: frosted glass card + orange inner glow; orange “Get in touch” pill + white double chevrons
- Right: solid white card + shadow; black “Become our master trainer” pill + orange double chevrons
- Soft orange blur blobs + geometric orange bars behind cards
- Titles ~44px; body 16px / 30px; tags 16px orange

## Assumptions
- Decorative assets exported from Figma will be committed under `assets/images/`
- Reuse `.pmc-btn--primary` and `.pmc-btn--dark` with CTA-specific arrow assets

## Affected modules
- Capacity Building — dual CTA section

## Affected files
- `capacity-building.html`
- `assets/css/style.css`
- `assets/css/responsive.css`
- New images: CTA card backgrounds, blobs, chevrons, geometric bars

## Database changes
None

## API changes
None

## Implementation phases
1. Download Figma decorative assets
2. Update markup (decor + button variants)
3. Restyle `.pmc-cta2*` to match Figma
4. Responsive stack
5. Browser QA

## Testing requirements
- Desktop 1440: unequal cards, correct button colors/arrows, decor visible
- Mobile: stacked cards, readable CTAs

## Security considerations
None

## Risks and dependencies
- Figma asset URLs expire in ~7 days — download locally
- Card background SVGs/PNGs may need `overflow: visible` for glow

## Completion checklist
- [x] Assets saved (`cbt-cta-blob.svg`, `cbt-cta-geo.svg`, chevron double icons)
- [x] Cards + buttons match Figma/screenshot
- [x] Background decor present
- [x] Browser verified
