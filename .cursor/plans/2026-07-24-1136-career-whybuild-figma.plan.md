# Career Why Build Section Fix

## Objective
Match `career.html` `#why` / `.pmc-whybuild` to Figma Core Services `199:9055` and the attached screenshot.

## Requirements
- Title: Build Your Career. (ink) + Build India. (primary)
- Frosted white card: border-white 4px, radius 20px, soft shadow
- Soft orange radial glows behind card
- 5 equal columns; solid `#dd6626` number circles (51px)
- Full body copy visible (no clip); Figma copy for item 2
- Typography: title ~44px; step titles 16px semibold; body 14px/25px

## Assumptions
- Markup structure can stay; CSS + minor copy updates
- Decorative glows via CSS (no asset download required)

## Affected modules
- Career — Why build

## Affected files
- `career.html`
- `assets/css/style.css`
- `assets/css/responsive.css`

## Database / API
None

## Implementation phases
1. Update CSS to Figma specs + glows
2. Sync item-2 copy from Figma
3. Responsive tweaks
4. Browser QA

## Testing
- Desktop: full text visible, 5 columns
- Tablet/mobile: stacked/2-col without clip

## Security
None

## Risks
Low — isolated section styles

## Completion checklist
- [x] Styles match Figma
- [x] Copy updated
- [x] Browser verified
