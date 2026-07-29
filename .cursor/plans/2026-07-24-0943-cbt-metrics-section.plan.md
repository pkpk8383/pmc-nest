# Capacity Building Metrics Section Fix

## Objective
Match the Impact Metrics (`#metrics`) block on `capacity-building.html` to Figma node `31:2197` and the attached screenshot.

## Requirements
- White metric cards: 20px radius, soft shadow, ~190px tall, 16px gap
- Values: `#DD6626`, 24px bold
- Card labels: `#111`, 16px
- Group titles: `#565658`, 14px regular (not orange/uppercase)
- Heading ~44px; section tag unchanged
- Subtle grid background
- Map with state pills + “Our reach” legend (Figma overlays)

## Assumptions
- Shared `.pmc-metrics` CSS may only be used on capacity-building; confirm before changing
- Existing `cbt-impact-map.png` is the base dotted map; pills may be HTML overlays if not baked in

## Affected modules
- Capacity Building page — Impact metrics

## Affected files
- `capacity-building.html`
- `assets/css/style.css`
- `assets/css/responsive.css`
- Possibly map/pin assets under `assets/images/`

## Database changes
None

## API changes
None

## Implementation phases
1. Restyle metric cards / typography / group labels
2. Add section grid background
3. Upgrade map markup (pins + legend) if image lacks them
4. Responsive tweaks
5. Browser QA

## Testing requirements
- Desktop 1440: two columns, 3+3 cards, map with labels
- Tablet/mobile: stack cleanly, cards readable

## Security considerations
None

## Risks and dependencies
- Figma asset download may need approval
- Absolute pin positions need tuning vs map crop

## Completion checklist
- [x] Cards match Figma (orange numbers, white cards, shadows)
- [x] Group labels grey, sentence case
- [x] Grid background present
- [x] Map + reach legend match design
- [x] Browser verified
