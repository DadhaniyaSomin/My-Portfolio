---
version: alpha
name: Karol Binkowski
description: A stark, developer-forward personal brand with neon-cyan accents, heavyweight typography, and sharp neo-brutalist framing.
colors:
  primary: "#00B8D4"
  secondary: "#0A0A0A"
  tertiary: "#FFFFFF"
  neutral: "#E5E7EB"
  surface: "#FFFFFF"
  on-surface: "#0A0A0A"
  error: "#D92D20"
  primary-contrast: "#0A0A0A"
  primary-soft: "#D9F7FB"
  border: "#0A0A0A"
  border-subtle: "#E5E7EB"
typography:
  headline-display:
    fontFamily: Inter
    fontSize: 88px
    fontWeight: 800
    lineHeight: 106px
    letterSpacing: -1.76px
  headline-lg:
    fontFamily: Inter
    fontSize: 41.6px
    fontWeight: 800
    lineHeight: 43.68px
    letterSpacing: -0.624px
  headline-md:
    fontFamily: Inter
    fontSize: 20.8px
    fontWeight: 700
    lineHeight: 24.96px
    letterSpacing: 0.208px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 600
    lineHeight: 22px
    letterSpacing: 0px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: 500
    lineHeight: 28px
    letterSpacing: 0.72px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0.96px
  body-sm:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  label-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.08em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0.12em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.14em
  caption:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.12em
  overline:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.16em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 6px
  sm: 14px
  md: 22px
  lg: 56px
  xl: 184px
  gutter: 22px
  section: 56px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-contrast}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-contrast}"
    rounded: "{rounded.none}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
    height: "48px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  chip:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
---

# Karol Binkowski

## Overview
This system feels direct, technical, and confidently opinionated. It uses a light canvas, hard black framing, and a bright cyan accent to create a builder-first personality that reads as professional without feeling corporate. The overall tone is energetic and sparse, with generous whitespace and oversized headlines that prioritize clarity over decoration.

## Colors
- **Primary (#00B8D4):** A vivid cyan used for attention moments, primary calls to action, highlighted text blocks, and status indicators. It gives the interface its signature high-voltage, maker-minded energy.
- **Secondary (#0A0A0A):** A near-black used for headlines, borders, UI framing, and footers. It provides the stark contrast that defines the brand’s neo-brutalist edge.
- **Surface (#FFFFFF):** The clean white base that keeps the layout airy and allows the cyan and black to feel especially crisp.
- **On-surface (#0A0A0A):** The default text color for readable content on white backgrounds. It should be used for most copy, labels, and controls.
- **Neutral (#E5E7EB):** A subtle divider and edge tone for lower-emphasis separation, especially in cards and form-like structures.
- **Primary-soft (#D9F7FB):** A lighter cyan support tone useful for hover, focus, or secondary highlight moments when the brand wants a softer emphasis.
- **Border (#0A0A0A):** A structural black border token for boxes, buttons, and strong separators.
- **Border-subtle (#E5E7EB):** A quieter rule color for cards or low-contrast content grouping.
- **Error (#D92D20):** Reserved for failures, invalid states, or destructive actions; keep it rare so the cyan remains the only loud accent.

## Typography
Inter drives the display and interface hierarchy, while JetBrains Mono carries the technical, code-adjacent body language. Headlines are extremely bold and compact, with negative letter spacing in the larger sizes to create a compressed, editorial punch. Body copy is intentionally monospaced and slightly spaced out, reinforcing the engineering identity and making paragraphs feel precise rather than conversational.

Use `headline-display` for the hero statement and any large marketing headers. Use `headline-lg`, `headline-md`, and `headline-sm` for section titles, cards, and compact labels. Use `body-lg` and `body-md` for descriptive copy, specs, and technical metadata; `body-sm` is best for plain supporting text. Labels and microcopy should lean into uppercase or near-uppercase treatment with wider letter spacing, especially in `label-md`, `label-sm`, and `overline`.

## Layout
The layout is centered around a spacious, fixed-max-width hero with large outer gutters and significant vertical breathing room. Content is arranged in clear, column-based zones rather than dense grids, with the main narrative on the left and a spec card on the right. The spacing rhythm is sparse and deliberate, using small local gaps for control and larger section gaps for major transitions.

Use the `spacing` scale to preserve the page’s cadence: `xs` for tight icon/text adjacency, `sm` for compact metadata rows, `md` for component internals, `lg` for section separation, and `xl` for major page breaks or oversized whitespace. Cards and controls should favor compact padding and strong edges rather than soft, roomy interior space. The layout should feel breathable, but never loose.

## Elevation & Depth
Depth is expressed with a neo-brutalist offset shadow rather than soft blur. Buttons and key panels use a hard 4px black drop shadow to create a cut-paper, tactile feel. Most surfaces remain flat, so hierarchy comes from contrast, borders, and shadowed offset rather than layered translucency or gradients.

Cards should typically stay minimal, with simple borders and white backgrounds. Reserve the shadow treatment for primary actions and a few high-priority framed elements. Avoid subtle material-style elevation; the system works best when surfaces are crisp and geometric.

## Shapes
The shape language is primarily square and architectural. Corners are usually sharp, with `rounded.none` and `rounded.sm` doing most of the work. Cards may soften slightly with `rounded.md`, but interactive controls and hero elements should keep their edges crisp to preserve the system’s directness.

This creates a visual feel that is sturdy, technical, and unapologetic. Any rounding should be subtle and functional rather than decorative.

## Components
**Buttons:** Primary buttons use `button-primary` with cyan fill, black text, a black border, and a square silhouette. Secondary buttons use `button-secondary` with white fill and the same black border treatment. Both should stay around 48px tall with generous horizontal padding and the hard offset shadow that gives the interface its signature weight. Hover states can shift to a lighter cyan using `button-primary-hover`, but should remain stark and high-contrast. Link-style actions should use `button-link` and remain visually lightweight, with no border or shadow.

**Cards:** Use the `card` pattern for panels like the engineer spec box. Cards should be white, bordered, and visually tidy, with modest padding and either no shadow or only the lightest structural treatment. Keep internal rows aligned and separated by thin rules.

**Inputs:** Form fields should feel like buttons without the shadow, using square edges, black borders, and generous vertical padding. Maintain strong text contrast and avoid overly rounded corners or soft placeholders.

**Chips and tags:** Use compact mono labels with uppercase styling and tight padding. They should feel like technical metadata, not decorative pills.

**Spec tables and lists:** Use thin horizontal dividers, compact row height, and mono labels for the left-hand column. Values can be slightly more prominent, but the overall treatment should stay sparse and utilitarian.

**Status indicators:** Small cyan or green dots can be used for live availability states, but they should remain minimal and never overpower the surrounding text.

## Do's and Don'ts
- Do keep typography bold, condensed, and high-contrast, especially for hero messages.
- Do use cyan sparingly as the single signature accent for calls to action and highlights.
- Do preserve square edges and hard borders for buttons, cards, and structural panels.
- Do rely on spacing and contrast for hierarchy instead of heavy shadows or gradients.
- Don't introduce soft shadows, glass effects, or rounded modern SaaS styling.
- Don't overuse cyan across large surfaces; it should punctuate, not flood.
- Don't set body copy in a proportional serif or overly decorative typeface.
- Don't crowd the layout; the design depends on deliberate whitespace and clear separation.