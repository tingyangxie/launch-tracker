@AGENTS.md
@DESIGN.md

## Design Style

This project uses a **Sanity-inspired** design system with a **refined dark** palette. All UI work must follow the DESIGN.md specification:

- **Dark-first**: Dark charcoal canvas (#131316) is the natural state -- dark but not black-void
- **Fonts**: Inter/Space Grotesk (sans) + IBM Plex Mono (code/technical labels)
- **Colors**: Coral-red (#f36458) CTAs, electric blue (#0052ef) for ALL hover/interactive states, subtle cool-tinted gray scale (#131316 → #1c1c20 → #2a2a30 → #71717b → #a1a1ab → #e0e0e6 → #e8e8ed)
- **Contrast**: Soft white (#e8e8ed) text on dark -- never pure #ffffff for text, never #0b0b0b for backgrounds
- **Buttons**: Pill-shaped (99999px) for primary/secondary/outline; subtle 5px radius for ghost
- **Cards**: #1c1c20 surface, 1px solid #2a2a30 border, 6px radius
- **Inputs**: 3px radius, #1c1c20 border, blue focus ring
- **Badges**: Full pill shape
- **Typography**: font-medium max for headings (never bold/700+), tracking-tight on all headings, IBM Plex Mono uppercase for technical labels
- **Depth**: Colorimetric (surface color shifts), NOT shadows. Ring/border containment only
- **Spacing**: 8px base unit, generous vertical section gaps (64-120px)
