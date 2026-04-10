# Design System Inspired by Sanity

## 1. Visual Theme & Atmosphere

This design system draws from Sanity's structured, developer-focused aesthetic but shifts the atmosphere from a harsh nocturnal void to a **refined dark workspace** -- still dark-first, but with warmth, depth, and reduced eye strain. The canvas sits at a lifted dark charcoal (`#131316`) with a very subtle cool undertone that reads as sophisticated rather than flat. This is a dark theme that feels inhabited and comfortable for long sessions, not a black hole demanding maximum contrast.

The typographic voice uses Inter (or Space Grotesk) -- a geometric sans-serif with tight negative letter-spacing at display sizes that gives headlines a compressed, engineered quality. This is paired with IBM Plex Mono for code and technical labels, creating a dual-register voice: editorial authority meets developer credibility.

The neutral scale runs through a carefully lifted gray ramp (`#131316` -> `#1c1c20` -> `#2a2a30` -> `#71717b` -> `#a1a1ab` -> `#e0e0e6` -> `#e8e8ed`) with a barely perceptible cool undertone that adds depth without calling attention to itself. The contrast ratio between primary text (`#e8e8ed`) and canvas (`#131316`) is ~15:1 -- highly legible but significantly softer than pure white on near-black. Against this tempered backdrop, the coral-red CTA (`#f36458`) and electric blue (`#0052ef`) accents land with clarity without being jarring.

**Key Characteristics:**
- Dark charcoal canvas (`#131316`) as the default, natural environment -- dark-first but not black-void
- Tight negative tracking at display sizes, creating a precision-engineered typographic voice
- Subtle cool-tinted gray scale -- barely perceptible blue undertone adds depth without breaking neutrality
- Softened contrast: `#e8e8ed` primary text instead of pure white, reducing eye strain
- Vivid accent punctuation: electric blue (`#0052ef`) and coral-red (`#f36458`) against the tempered dark field
- Pill-shaped primary buttons (99999px radius) contrasting with subtle rounded rectangles (3-6px) for secondary actions
- IBM Plex Mono as the technical counterweight to the editorial display face
- Full-bleed dark sections with content contained in measured max-width containers
- Hover states that shift to electric blue (`#0052ef`) across all interactive elements -- a consistent "activation" signal

## 2. Color Palette & Roles

### Primary Brand
- **Dark Charcoal** (`#131316`): The primary canvas and dominant surface color. Lifted from near-black to a refined dark charcoal with a barely perceptible cool undertone. Comfortable for extended use.
- **Deep Black** (`#0a0a0d`): Used for maximum-contrast moments, deep overlays, and certain border accents.
- **Coral Red** (`#f36458`): The primary CTA and brand accent -- a warm coral-red that serves as the main call-to-action color. Used for primary conversion points.

### Accent & Interactive
- **Electric Blue** (`#0052ef`): The universal hover/active state color across the entire system. Buttons, links, and interactive elements all shift to this blue on hover. Also used for focus rings and active states.
- **Light Blue** (`#55beff` / `#afe3ff`): Secondary blue variants used for accent backgrounds, badges, and dimmed blue surfaces.
- **Neon Green** (`color(display-p3 .270588 1 0)`): A vivid, wide-gamut green used for success states and premium feature highlights. Falls back to `#19d600` in sRGB.
- **Accent Magenta** (`color(display-p3 .960784 0 1)`): A vivid wide-gamut magenta for specialized accent moments.

### Surface & Background
- **Canvas** (`#131316`): Default page background and primary surface. Dark but not black.
- **Surface** (`#1c1c20`): Elevated surface color for cards, secondary containers, input backgrounds, and subtle layering above the base canvas.
- **Surface Prominent** (`#2a2a30`): Tertiary surface and border color for creating depth between dark layers.
- **Pure White** (`#ffffff`): Used for inverted sections and specific button surfaces.
- **Light Gray** (`#e0e0e6`): Light surface for inverted/light sections and subtle background tints.

### Neutrals & Text
- **Soft White** (`#e8e8ed`): Primary text color on dark surfaces. Slightly muted from pure white to reduce contrast and eye strain.
- **Silver** (`#a1a1ab`): Secondary text, body copy on dark surfaces, muted descriptions, and placeholder text.
- **Medium Gray** (`#71717b`): Tertiary text, metadata, timestamps, and de-emphasized content.
- **Charcoal** (`#1c1c20`): Text on light/inverted surfaces.
- **Dark Text** (`#131316`): Primary text on white/light button surfaces.

### Semantic
- **Error Red** (`#dd0000`): Destructive actions, validation errors, and critical warnings.
- **GPC Green** (`#37cd84`): Privacy/compliance indicator green.
- **Focus Ring Blue** (`#0052ef`): Focus ring color for accessibility, matching the interactive blue.

### Border System
- **Dark Border** (`#131316`): Primary border on dark containers -- barely visible, maintaining minimal containment.
- **Subtle Border** (`#1c1c20`): Standard border for inputs, textareas, and card edges on dark surfaces.
- **Medium Border** (`#2a2a30`): More visible borders for emphasized containment and dividers.
- **Light Border** (`#e8e8ed`): Border on inverted/light elements or buttons needing contrast separation.
- **Orange Border** (`color(display-p3 1 0.3333 0)`): Special accent border for highlighted/featured elements.

## 3. Typography Rules

### Font Family
- **Display / Headline**: `waldenburgNormal`, fallback: `waldenburgNormal Fallback, ui-sans-serif, system-ui`
- **Body / UI**: `waldenburgNormal`, fallback: `waldenburgNormal Fallback, ui-sans-serif, system-ui`
- **Code / Technical**: `IBM Plex Mono`, fallback: `ibmPlexMono Fallback, ui-monospace`
- **Fallback / CJK**: `Helvetica`, fallback: `Arial, Hiragino Sans GB, STXihei, Microsoft YaHei, WenQuanYi Micro Hei`

*Note: waldenburgNormal is a custom typeface. For external implementations, use Inter or Space Grotesk as the sans substitute (geometric, slightly condensed feel). IBM Plex Mono is available on Google Fonts.*

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | waldenburgNormal | 112px (7rem) | 400 | 1.00 (tight) | -4.48px | Maximum impact, compressed tracking |
| Hero Secondary | waldenburgNormal | 72px (4.5rem) | 400 | 1.05 (tight) | -2.88px | Large section headers |
| Section Heading | waldenburgNormal | 48px (3rem) | 400 | 1.08 (tight) | -1.68px | Primary section anchors |
| Heading Large | waldenburgNormal | 38px (2.38rem) | 400 | 1.10 (tight) | -1.14px | Feature section titles |
| Heading Medium | waldenburgNormal | 32px (2rem) | 425 | 1.24 (tight) | -0.32px | Card titles, subsection headers |
| Heading Small | waldenburgNormal | 24px (1.5rem) | 425 | 1.24 (tight) | -0.24px | Smaller feature headings |
| Subheading | waldenburgNormal | 20px (1.25rem) | 425 | 1.13 (tight) | -0.2px | Sub-section markers |
| Body Large | waldenburgNormal | 18px (1.13rem) | 400 | 1.50 | -0.18px | Intro paragraphs, descriptions |
| Body | waldenburgNormal | 16px (1rem) | 400 | 1.50 | normal | Standard body text |
| Body Small | waldenburgNormal | 15px (0.94rem) | 400 | 1.50 | -0.15px | Compact body text |
| Caption | waldenburgNormal | 13px (0.81rem) | 400-500 | 1.30-1.50 | -0.13px | Metadata, descriptions, tags |
| Small Caption | waldenburgNormal | 12px (0.75rem) | 400 | 1.50 | -0.12px | Footnotes, timestamps |
| Micro / Label | waldenburgNormal | 11px (0.69rem) | 500-600 | 1.00-1.50 | normal | Uppercase labels, tiny badges |
| Code Body | IBM Plex Mono | 15px (0.94rem) | 400 | 1.50 | normal | Code blocks, technical content |
| Code Caption | IBM Plex Mono | 13px (0.81rem) | 400-500 | 1.30-1.50 | normal | Inline code, small technical labels |
| Code Micro | IBM Plex Mono | 10-12px | 400 | 1.30-1.50 | normal | Tiny code labels, uppercase tags |

### Principles
- **Extreme negative tracking at scale**: Display headings at 72px+ use aggressive negative letter-spacing (-2.88px to -4.48px), creating a tight, engineered quality that distinguishes Sanity from looser editorial typography.
- **Single font, multiple registers**: waldenburgNormal handles both editorial display and functional UI text. The weight range is narrow (400-425 for most, 500-600 only for tiny labels), keeping the voice consistent.
- **OpenType feature control**: Typography uses deliberate feature settings including `"cv01", "cv11", "cv12", "cv13", "ss07"` for display sizes and `"calt" 0` for body text, fine-tuning character alternates for different contexts.
- **Tight headings, relaxed body**: Headings use 1.00-1.24 line-height (extremely tight), while body text breathes at 1.50. This contrast creates clear visual hierarchy.
- **Uppercase for technical labels**: IBM Plex Mono captions and small labels frequently use `text-transform: uppercase` with tight line-heights, creating a "system readout" aesthetic for technical metadata.

## 4. Component Stylings

### Buttons

**Primary CTA (Pill)**
- Background: Coral Red (`#f36458`)
- Text: Soft White (`#e8e8ed`)
- Padding: 8px 16px
- Border Radius: 99999px (full pill)
- Border: none
- Hover: Electric Blue (`#0052ef`) background, soft white text
- Font: 16px, weight 400

**Secondary (Dark Pill)**
- Background: Canvas (`#131316`)
- Text: Silver (`#a1a1ab`)
- Padding: 8px 12px
- Border Radius: 99999px (full pill)
- Border: none
- Hover: Electric Blue (`#0052ef`) background, soft white text

**Outlined (Light Pill)**
- Background: White (`#ffffff`)
- Text: Canvas (`#131316`)
- Padding: 8px
- Border Radius: 99999px (full pill)
- Border: 1px solid `#131316`
- Hover: Electric Blue (`#0052ef`) background, soft white text

**Ghost / Subtle**
- Background: Surface (`#1c1c20`)
- Text: Silver (`#a1a1ab`)
- Padding: 0px 12px
- Border Radius: 5px
- Border: 1px solid `#1c1c20`
- Hover: Electric Blue (`#0052ef`) background, soft white text

**Uppercase Label Button**
- Font: 11px, weight 600, uppercase
- Background: transparent or `#1c1c20`
- Text: Silver (`#a1a1ab`)
- Letter-spacing: normal
- Used for tab-like navigation and filter controls

### Cards

**Dark Content Card**
- Background: `#1c1c20`
- Border: 1px solid `#2a2a30` or `#1c1c20`
- Border Radius: 6px
- Padding: 24px
- Text: Soft White (`#e8e8ed`) for titles, Silver (`#a1a1ab`) for body
- Hover: subtle border color shift or elevation change

**Feature Card (Full-bleed)**
- Background: `#131316` or full-bleed image/gradient
- Border: none or 1px solid `#1c1c20`
- Border Radius: 12px
- Padding: 32-48px
- Contains large imagery with overlaid text

### Inputs

**Text Input / Textarea**
- Background: Canvas (`#131316`)
- Text: Silver (`#a1a1ab`)
- Border: 1px solid `#1c1c20`
- Padding: 8px 12px
- Border Radius: 3px
- Focus: outline with `var(--focus-ring-color)` (blue), 2px solid
- Focus background: shifts to deep cyan (`#0d2a30`)

**Search Input**
- Background: `#131316`
- Text: Silver (`#a1a1ab`)
- Padding: 0px 12px
- Border Radius: 3px
- Placeholder: Medium Gray (`#71717b`)

### Navigation

**Top Navigation**
- Background: Canvas (`#131316`) with backdrop blur
- Height: auto, compact padding
- Logo: left-aligned
- Links: 16px, Silver (`#a1a1ab`)
- Link Hover: Electric Blue via `--color-fg-accent-blue`
- CTA Button: Coral Red pill button right-aligned
- Separator: 1px border-bottom `#1c1c20`

**Footer**
- Background: Canvas (`#131316`)
- Multi-column link layout
- Links: Silver (`#a1a1ab`), hover to blue
- Section headers: Soft White (`#e8e8ed`), 13px uppercase IBM Plex Mono

### Badges / Pills

**Neutral Subtle**
- Background: White (`#ffffff`)
- Text: Canvas (`#131316`)
- Padding: 8px
- Font: 13px
- Border Radius: 99999px

**Neutral Filled**
- Background: Canvas (`#131316`)
- Text: Soft White (`#e8e8ed`)
- Padding: 8px
- Font: 13px
- Border Radius: 99999px

## 5. Layout Principles

### Spacing System
Base unit: **8px**

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 1px | Hairline gaps, border-like spacing |
| space-2 | 2px | Minimal internal padding |
| space-3 | 4px | Tight component internal spacing |
| space-4 | 6px | Small element gaps |
| space-5 | 8px | Base unit -- button padding, input padding, badge padding |
| space-6 | 12px | Standard component gap, button horizontal padding |
| space-7 | 16px | Section internal padding, card spacing |
| space-8 | 24px | Large component padding, card internal spacing |
| space-9 | 32px | Section padding, container gutters |
| space-10 | 48px | Large section vertical spacing |
| space-11 | 64px | Major section breaks |
| space-12 | 96-120px | Hero vertical padding, maximum section spacing |

### Grid & Container
- Max content width: ~1440px (inferred from breakpoints)
- Page gutter: 32px on desktop, 16px on mobile
- Content sections use full-bleed backgrounds with centered, max-width content
- Multi-column layouts: 2-3 columns on desktop, single column on mobile
- Card grids: CSS Grid with consistent gaps (16-24px)

### Whitespace Philosophy
Sanity uses aggressive vertical spacing between sections (64-120px) to create breathing room on the dark canvas. Within sections, spacing is tighter (16-32px), creating dense information clusters separated by generous voids. This rhythm gives the page a "slides" quality -- each section feels like its own focused frame.

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| radius-xs | 3px | Inputs, textareas, subtle rounding |
| radius-sm | 4-5px | Secondary buttons, small cards, tags |
| radius-md | 6px | Standard cards, containers |
| radius-lg | 12px | Large cards, feature containers, forms |
| radius-pill | 99999px | Primary buttons, badges, nav pills |

## 6. Depth & Elevation

### Shadow System

| Level | Value | Usage |
|-------|-------|-------|
| Level 0 (Flat) | none | Default state for most elements -- dark surfaces create depth through color alone |
| Level 1 (Subtle) | 0px 0px 0px 1px `#1c1c20` | Border-like shadow for minimal containment without visible borders |
| Level 2 (Focus) | 0 0 0 2px `var(--color-blue-500)` | Focus ring for inputs and interactive elements |
| Level 3 (Overlay) | Backdrop blur + semi-transparent dark | Navigation overlay, modal backgrounds |

### Depth Philosophy
The depth system is almost entirely **colorimetric** rather than shadow-based. Elevation is communicated through surface color shifts: `#131316` (ground) -> `#1c1c20` (elevated) -> `#2a2a30` (prominent) -> `#ffffff` (inverted/highest). This approach is native to dark interfaces where traditional drop shadows would be invisible. The few shadows that exist are ring-based (0px 0px 0px Npx) or blur-based (backdrop-filter) rather than offset shadows, maintaining the flat, precision-engineered aesthetic.

Border-based containment (1px solid `#1c1c20` or `#2a2a30`) serves as the primary spatial separator, with the border calibrated to be visible but not dominant. The system avoids "floating card" aesthetics -- everything feels mounted to the surface rather than hovering above it.

## 7. Do's and Don'ts

### Do
- Use the subtle cool-tinted gray scale as the foundation -- maintain near-neutral discipline with just a hint of blue depth
- Use `#e8e8ed` (soft white) for primary text on dark surfaces -- never pure `#ffffff` for body/heading text
- Apply Electric Blue (`#0052ef`) consistently as the universal hover/active state across all interactive elements
- Use extreme negative letter-spacing (-2px to -4.48px) on display headings 48px and above
- Keep primary CTAs as full-pill shapes (99999px radius) with the coral-red (`#f36458`)
- Use IBM Plex Mono uppercase for technical labels, tags, and system metadata
- Communicate depth through surface color (dark-to-light) rather than shadows
- Maintain generous vertical section spacing (64-120px) on the dark canvas
- Use `"cv01", "cv11", "cv12", "cv13", "ss07"` OpenType features for display typography

### Don't
- Don't use pure `#ffffff` for text -- use `#e8e8ed` to keep contrast comfortable
- Don't use pure `#000000` or `#0b0b0b` as canvas -- `#131316` is the floor
- Don't use drop shadows for elevation -- dark interfaces demand colorimetric depth
- Don't apply border-radius between 13px and 99998px -- the system jumps from 12px (large card) directly to pill (99999px)
- Don't mix the coral-red CTA with the electric blue interactive color in the same element
- Don't use heavy font weights (700+) -- the system maxes out at 600 and only for 11px uppercase labels
- Don't place light text on light surfaces or dark text on dark surfaces without checking the gray-on-gray contrast ratio
- Don't use traditional offset box-shadows -- ring shadows (0 0 0 Npx) or border-based containment only
- Don't break the tight line-height on headings -- 1.00-1.24 is the range, never go to 1.5+ for display text

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| Desktop XL | >= 1640px | Full layout, maximum content width |
| Desktop | >= 1440px | Standard desktop layout |
| Desktop Compact | >= 1200px | Slightly condensed desktop |
| Laptop | >= 1100px | Reduced column widths |
| Tablet Landscape | >= 960px | 2-column layouts begin collapsing |
| Tablet | >= 768px | Transition zone, some elements stack |
| Mobile Large | >= 720px | Near-tablet layout |
| Mobile | >= 480px | Single-column, stacked layout |
| Mobile Small | >= 376px | Minimum supported width |

### Collapsing Strategy
- **Navigation**: Horizontal links collapse to hamburger menu below 768px
- **Hero typography**: Scales from 112px -> 72px -> 48px -> 38px across breakpoints, maintaining tight letter-spacing ratios
- **Grid layouts**: 3-column -> 2-column at ~960px, single-column below 768px
- **Card grids**: Horizontal scrolling on mobile instead of wrapping (preserving card aspect ratios)
- **Section spacing**: Vertical padding reduces by ~40% on mobile (120px -> 64px -> 48px)
- **Button sizing**: CTA pills maintain padding but reduce font size; ghost buttons stay fixed
- **Code blocks**: Horizontal scroll with preserved monospace formatting

### Mobile-Specific Adjustments
- Full-bleed sections extend edge-to-edge with 16px internal gutters
- Touch targets: minimum 44px for all interactive elements
- Heading letter-spacing relaxes slightly at mobile sizes (less aggressive negative tracking)
- Image containers switch from fixed aspect ratios to full-width with auto height

## 9. Agent Prompt Guide

### Quick Color Reference
```
Background:      #131316 (dark charcoal canvas)
Surface:         #1c1c20 (elevated cards/containers)
Border:          #2a2a30 (visible) / #1c1c20 (subtle)
Text Primary:    #e8e8ed (soft white on dark)
Text Secondary:  #a1a1ab (silver on dark)
Text Tertiary:   #71717b (medium gray)
CTA:             #f36458 (coral-red)
Interactive:     #0052ef (electric blue, all hovers)
Success:         #19d600 (green, sRGB fallback)
Error:           #dd0000 (red)
Light Surface:   #e0e0e6 / #ffffff (inverted sections)
```

### Example Prompts

**Landing page section:**
"Create a feature section with a dark charcoal (#131316) background. Use a 48px heading in Inter with -1.68px letter-spacing, soft white (#e8e8ed) text. Below it, 16px body text in #a1a1ab with 1.50 line-height. Include a coral-red (#f36458) pill button with soft white text and a secondary dark (#131316) pill button with #a1a1ab text. Both buttons hover to #0052ef blue."

**Card grid:**
"Build a 3-column card grid on a #131316 background. Each card has a #1c1c20 surface, 1px solid #2a2a30 border, 6px border-radius, and 24px padding. Card titles are 24px #e8e8ed with -0.24px letter-spacing. Body text is 13px #a1a1ab. Add a 13px IBM Plex Mono uppercase tag in #71717b at the top of each card."

**Form section:**
"Design a contact form on a #131316 background. Inputs have #131316 background, 1px solid #1c1c20 border, 3px border-radius, 8px 12px padding, and #a1a1ab placeholder text. Focus state shows a 2px blue (#0052ef) ring. Submit button is a full-width coral-red (#f36458) pill. Include a 13px #71717b helper text below each field."

**Navigation bar:**
"Create a sticky top navigation on #131316 with backdrop blur. Left: brand text in 15px #e8e8ed. Center/right: nav links in 16px #a1a1ab that hover to blue. Far right: a coral-red (#f36458) pill CTA button. Bottom border: 1px solid #1c1c20."

### Iteration Guide
1. **Start dark**: Begin with `#131316` background, `#e8e8ed` primary text, `#a1a1ab` secondary text
2. **Add structure**: Use `#1c1c20` surfaces and `#2a2a30` borders for containment -- no shadows
3. **Apply typography**: Inter (or Space Grotesk) with tight letter-spacing on headings, 1.50 line-height on body
4. **Color punctuation**: Add `#f36458` for CTAs and `#0052ef` for all hover/interactive states
5. **Refine spacing**: 8px base unit, 24-32px within sections, 64-120px between sections
6. **Technical details**: Add IBM Plex Mono uppercase labels for tags and metadata
7. **Polish**: Ensure all interactive elements hover to `#0052ef`, all buttons are pills or subtle 5px radius, borders are hairline (1px)
