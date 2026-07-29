# Technology Clientele Logos Update

## Objective
Update `technology.html` Our Clientele section to match Figma `199:4181` and the attached screenshot: centered tag + static row of 6 logos using Figma-exported images.

## Requirements
- Download logo asset(s) from Figma node `199:4181`
- Replace marquee with static 6-logo row (gap ~34px, logo ~151×64)
- Light grey section background `#f8f8f8`
- Centered “Our clientele” tag

## Assumptions
- Figma currently repeats the Ministry of Panchayati Raj placeholder across all 6 slots; use that export until unique logos replace it in Figma
- Shared `.pmc-clients` marquee on other pages should remain unchanged — use a tech-specific modifier class

## Affected modules
- Technology page — clientele

## Affected files
- `technology.html`
- `assets/css/style.css`
- `assets/images/clients/tech-clientele.png` (and copies if unique)

## Database / API
None

## Implementation phases
1. Download Figma logo(s)
2. Update markup to static grid
3. Add `.pmc-clients--static` styles
4. Browser QA

## Testing
- 6 logos visible in one row on desktop
- Tag centered; no marquee animation on tech page

## Security
None

## Risks
- If Figma only has placeholders, all 6 logos will look identical until design updates

## Completion checklist
- [x] Logo asset downloaded (`assets/images/clients/tech-clientele.png`)
- [x] Markup + CSS match Figma row (static 6 logos, 34px gap)
- [x] Other pages’ marquee unchanged
- [x] Browser verified

Note: Figma `199:4181` currently uses the same Ministry of Panchayati Raj image in all 6 slots — mirrored as designed.
