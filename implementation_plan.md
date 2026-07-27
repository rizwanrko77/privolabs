# Layout \u0026 UI Polish Plan

## Problem Assessment (Why the previous fixes resulted in a 3/10)
1. **Absurd Spacing**: I hardcoded --s-12 through --s-16 to massive pixel values (up to 512px). Applying 256px-384px padding to every single section made the site look completely empty, disjointed, and visually broken on normal screens.
2. **Dropdown Usability Bug**: The Services dropdown I added has an 8px physical gap (	ranslateY(8px)). When you try to move your mouse from the header link to the dropdown, the menu instantly vanishes because the mouse leaves the hoverable area.
3. **Cursor Ring Alignment**: The custom cursor ring alignment during hover states needed a pixel-perfect CSS correction to ensure the 1px border doesn't cause a visual ghost-box offset.

## User Review Required
Please review the revised spacing scale. Instead of massive 384px paddings, I will use responsive clamp() functions to ensure the layout breathes well on desktop without collapsing on mobile. 

## Proposed Changes

### 1. Spacing Scale Redux (tokens.css)
- Redefine --s-12 through --s-16 using responsive clamp() functions (e.g. clamp(96px, 10vw, 128px)) so sections have elegant, proportional padding rather than fixed 256px canyons.

### 2. Header Dropdown Usability (Header.astro)
- Replace 	ranslateY(8px) with padding-top: var(--s-3) on the invisible dropdown container. This maintains the visual gap but creates an invisible hover bridge, so the menu stays open when moving your mouse down.

### 3. Cursor Precision (Cursor.tsx)
- Ensure the interactive ring uses -50%, -50% transforms or precise ox-sizing to perfectly snap over buttons without any pixel bleed or offset.

## Verification Plan
- Verify dropdown remains open when moving mouse.
- Verify section padding feels premium and balanced.
- Verify cursor ring alignment.