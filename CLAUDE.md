@AGENTS.md
@DESIGN.md

## Design Style

This project uses a **Sanity-inspired** design system. All UI work must follow the DESIGN.md specification:

- **Dark-first**: Near-black canvas (#0b0b0b) is the natural state, not a toggle
- **Fonts**: Inter (sans) + IBM Plex Mono (code/technical labels)
- **Colors**: Coral-red (#f36458) CTAs, electric blue (#0052ef) for ALL hover/interactive states, achromatic gray scale (#0b0b0b → #212121 → #353535 → #797979 → #b9b9b9 → #ededed → #ffffff)
- **Buttons**: Pill-shaped (99999px) for primary/secondary/outline; subtle 5px radius for ghost
- **Cards**: #212121 surface, 1px solid #353535 border, 6px radius
- **Inputs**: 3px radius, #212121 border, blue focus ring
- **Badges**: Full pill shape
- **Typography**: font-medium max for headings (never bold/700+), tracking-tight on all headings, IBM Plex Mono uppercase for technical labels
- **Depth**: Colorimetric (surface color shifts), NOT shadows. Ring/border containment only
- **Spacing**: 8px base unit, generous vertical section gaps (64-120px)
