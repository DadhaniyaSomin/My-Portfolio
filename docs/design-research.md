# Design Research: lordsarcastic.com (blog.lordsarcastic.dev)

## Target URL
https://blog.lordsarcastic.dev

## Overview
Minimalist, typography-focused blog design with a warm paper-like aesthetic. Clean, readable layout with subtle animations and a refined color palette.

---

## Typography

### Font Families
- **Sans-serif**: Manrope (primary body text)
- **Serif**: Newsreader (headings, emphasis)
- **Monospace**: DM Mono (code, technical content)

### Text Sizes
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)
- 5xl: 3rem (48px)
- 6xl: 3.75rem (60px)
- 7xl: 4.5rem (72px)
- 8xl: 6rem (96px)

### Font Weights
- Normal: 400
- Medium: 500
- Semibold: 600

### Letter Spacing
- Tight: -0.025em
- Wider: 0.05em

### Line Heights
- Tight: 1.25
- Base: 1.5

---

## Colors

### Background Colors
- Paper (primary): #f2eee4 (warm off-white)
- Paper Deep: #e7e1d4 (slightly darker paper tone)

### Text Colors
- Ink (primary): #111815 (near black)
- Ink Soft: #24312b (softer dark green-gray)

### Accent Colors
- Acid: #dfff63 (bright yellow-green)
- Cobalt: #3d59ff (vibrant blue)
- Coral: #ff755c (warm orange-red)

### Neutral
- White: #ffffff

---

## Spacing System

### Base Unit
- Base spacing: 0.25rem (4px)

### Container Widths
- xl: 36rem (576px)
- 2xl: 42rem (672px)
- 3xl: 48rem (768px)
- 4xl: 56rem (896px)
- 5xl: 64rem (1024px)
- 6xl: 72rem (1152px)

---

## Border Radius
- xl: 0.75rem (12px)
- 2xl: 1rem (16px)
- 3xl: 1.5rem (24px)

---

## Animations

### Transitions
- Default duration: 0.15s
- Default timing function: cubic-bezier(0.4, 0, 0.2, 1)

### Keyframe Animations
- Pulse: 2s cubic-bezier(0.4, 0, 0.6, 1) infinite

### Scroll Behavior
- Smooth scrolling enabled
- Respects prefers-reduced-motion

---

## Layout & Structure

### Page Structure
- Fixed header with navigation
- Centered content with max-width containers
- Blog post cards with hover effects
- Footer with social links

### Responsive Behavior
- Mobile-first approach
- Breakpoints for tablet and desktop
- Fluid typography and spacing

---

## Components

### Navigation
- Minimal header with logo/name
- Navigation links with hover states
- Mobile menu with smooth toggle

### Cards
- Paper-colored backgrounds
- Subtle borders
- Hover lift effects
- Clean typography hierarchy

### Buttons
- Acid green accent color
- Rounded corners (xl)
- Smooth hover transitions
- Focus states for accessibility

### Links
- Underlined on hover
- Cobalt blue accent color
- Smooth color transitions

---

## Accessibility Features
- Reduced motion support
- Focus visible states
- Semantic HTML structure
- Proper color contrast ratios
- Keyboard navigation support

---

## Implementation Notes

### CSS Architecture
- CSS custom properties for theming
- Layer-based organization (theme, base, components, utilities)
- Utility-first approach for spacing and colors
- Component-specific styles for complex elements

### Performance
- Font display: swap for faster loading
- Preconnect to Google Fonts
- Optimized font loading with woff2 format
- CSS-in-JS or Tailwind for dynamic styling

---

## Design Principles

1. **Typography First**: Content readability is paramount
2. **Warm Aesthetic**: Paper-like background creates comfortable reading experience
3. **Subtle Interactions**: Animations enhance without distracting
4. **Minimal Color Palette**: Limited accent colors for emphasis
5. **Generous Whitespace**: Breathing room for content
6. **Responsive Design**: Seamless experience across devices
