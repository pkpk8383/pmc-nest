# Contact Map Section Fix

## Objective
Match `contact.html` `.pmc-contact-map` to Figma `199:8463` and the attached screenshot, including background color.

## Requirements
- Section background `#f8f8f8` with soft peach/orange glows
- White office card: 15px radius, soft shadow, divider, orange underlined email
- Dotted India map + pill labels with location pin icons
- Decorative double-chevron bottom-right

## Assumptions
- Reuse project `location-pin.svg` pattern from `index.html` unless Figma export is clearer
- Download map/domino/arrows from Figma if current assets differ

## Affected modules
- Contact — office + map

## Affected files
- `contact.html`
- `assets/css/style.css`, `responsive.css`
- `assets/images/` (map, domino, arrows as needed)

## Database / API
None

## Implementation phases
1. Download/update assets from Figma
2. Update markup (pins + divider structure)
3. CSS: bg `#f8f8f8`, glows, card, map
4. Browser QA

## Testing
- Background matches Figma/screenshot
- Card + map layout on desktop; stacks on mobile

## Security
None

## Risks
Map pin positions may need fine-tuning after asset swap

## Completion checklist
- [x] Assets updated
- [x] Background + card styles match
- [x] Browser verified
