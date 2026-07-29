# Career Talent Network CTA Fix

## Objective
Match `career.html` `.pmc-talent` to Figma node `199:9315` and the attached screenshot.

## Requirements
- Centered headline ~44px, body 16px/30px `#565658`, max ~560px
- Soft peach left + soft gray right blurred decorative circles
- Black pill CTA: “Share your resume” + orange double chevrons
- Keep apply modal wiring (`#applyModal`)

## Assumptions
- Existing `.pmc-btn--dark` + `chevron-double.svg` are sufficient for the CTA

## Affected modules
- Career — Talent network CTA

## Affected files
- `career.html`
- `assets/css/style.css`
- (optional) `assets/css/responsive.css`

## Database / API
None

## Implementation phases
1. Update button icon to orange double chevrons
2. Refine typography, spacing, decorative circles
3. Browser QA

## Testing
- Section matches Figma layout on desktop
- Modal still opens on CTA click

## Security
None

## Risks
Low — isolated visual section

## Completion checklist
- [x] Markup/CTA icon updated
- [x] Styles match Figma
- [x] Browser verified
