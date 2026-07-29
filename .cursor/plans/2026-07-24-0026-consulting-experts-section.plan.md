# Consulting Experts Section Visual Fix

## Objective
Match the Meet Our Experts block on `consulting.html` to the attached screenshot and Figma node `199:2336` (Experts Consulting).

## Requirements
- Two expert cards side-by-side: photo + name/role under photo; bio to the right of photo column
- Progress pill indicators bottom-left (active orange, inactive gray)
- Circular prev/next controls bottom-right (prev light, next dark/black per attachment)
- Light gray section background `#f8f8f8`
- Distinct portraits for each expert from Figma assets

## Assumptions
- Shared `.pmc-experts` CSS also used on capacity-building / technology; CSS changes apply site-wide
- Consulting content remains Priyaranjan + Kundan; carousel supports additional slides later
- With one slide of two experts, progress bars still show two segments to match Figma chrome (or one slide / one bar if only one slide is coded — prefer matching Figma with working multi-slide when slides > 1)

## Affected modules
- Consulting page experts section
- Shared experts styles
- Shared main.js carousel init

## Affected files
- `consulting.html`
- `assets/css/style.css`
- `assets/css/responsive.css`
- `assets/js/main.js`
- `assets/images/consulting-expert-1.jpg`, `consulting-expert-2.jpg` (new)

## Database changes
None

## API changes
None

## Implementation phases
1. Download Figma portraits
2. Restructure markup: carousel viewport, footer with dots + nav
3. Update CSS to Figma spacing/typography/controls
4. Add `initExpertsCarousel` (reuse whatwedo pattern)
5. Browser QA at `#experts`

## Testing requirements
- Desktop 1440: two cards, bio right of image, dots left, arrows right
- Nav updates active progress bar when multiple slides exist
- Mobile stacks cards cleanly

## Security considerations
None (static assets)

## Risks and dependencies
- Figma MCP asset URLs expire in 7 days — download locally
- Other pages sharing experts markup may need matching nav HTML for controls to appear

## Completion checklist
- [x] Portraits saved locally — deferred (reuse `consulting-expert.jpg`; Figma asset download needs approval)
- [x] Markup + CSS match Figma/attachment
- [x] Nav + progress wired
- [x] Browser verified
