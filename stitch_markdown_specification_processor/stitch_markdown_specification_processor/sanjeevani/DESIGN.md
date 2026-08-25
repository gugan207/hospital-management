---
name: Sanjeevani
colors:
  surface: '#f5faf8'
  surface-dim: '#d6dbd9'
  surface-bright: '#f5faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f5f3'
  surface-container: '#eaefed'
  surface-container-high: '#e4e9e7'
  surface-container-highest: '#dee4e2'
  on-surface: '#171d1c'
  on-surface-variant: '#40484a'
  inverse-surface: '#2c3130'
  inverse-on-surface: '#edf2f0'
  outline: '#71787b'
  outline-variant: '#c0c8ca'
  surface-tint: '#366570'
  primary: '#002e36'
  on-primary: '#ffffff'
  primary-container: '#10454f'
  on-primary-container: '#83b2bd'
  inverse-primary: '#9fceda'
  secondary: '#006a60'
  on-secondary: '#ffffff'
  secondary-container: '#8cf5e4'
  on-secondary-container: '#007166'
  tertiary: '#540e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#781e07'
  on-tertiary-container: '#ff896c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#baebf7'
  primary-fixed-dim: '#9fceda'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#1b4d57'
  secondary-fixed: '#8cf5e4'
  secondary-fixed-dim: '#6fd8c8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a2'
  on-tertiary-fixed: '#3c0700'
  on-tertiary-fixed-variant: '#83260e'
  background: '#f5faf8'
  on-background: '#171d1c'
  surface-variant: '#dee4e2'
typography:
  display-lg:
    fontFamily: Literata
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-page: 32px
  card-padding: 24px
  container-max: 1440px
---

## Brand & Style

The design system is built on a "Human-Centric Clinical" philosophy. It moves away from the cold, intimidating aesthetics of traditional hospital software towards a digital environment that feels supportive and serene. The objective is to reduce cognitive load for medical staff while providing a sense of stability for patients.

The visual style blends **Modern Professionalism** with **Tactile Warmth**. It utilizes a soft-layered approach where surfaces feel substantial but approachable. The primary narrative focuses on "The Pulse of Care"—evidenced by organic dividers and a high-contrast relationship between deep institutional colors and fresh, life-affirming accents.

## Colors

The palette is anchored by deep, grounded tones to establish authority without the sterility of pure blue.

- **Primary (Deep Teal):** Used for structural elements like navigation sidebars, primary action buttons, and major headers. It provides the "weight" of the application.
- **Accent (Fresh Teal):** Reserved for interactive states, progress indicators, and active navigation links. It represents movement and health.
- **Background (Soft Mint):** A tinted off-white that reduces screen glare, making the interface more comfortable for long-duration use by staff.
- **Critical (Warm Coral):** A high-visibility but non-aggressive red-orange. Use this exclusively for emergency room status, critical alerts, and destructive actions (e.g., deleting a patient record).
- **Typography:** Primary text uses "Ink" for maximum legibility. Secondary text uses "Muted Gray-Teal" to de-emphasize metadata while maintaining a cohesive color temperature.

## Typography

This design system uses a sophisticated typographic pairing to balance heritage with efficiency.

- **Headings (Literata):** A warm, bookish serif that adds a layer of humanity and wisdom to page titles. It should be used for patient names, section headers, and high-level summaries.
- **UI & Body (Inter):** A precise sans-serif used for all functional elements, forms, and general reading. It ensures clarity in dense medical charts.
- **Metadata (IBM Plex Mono):** Strictly for non-prose data. Use this for Patient IDs, timestamps, vital sign readings, and dosages to ensure characters are distinct and vertically aligned for easy scanning.

## Layout & Spacing

The layout follows a **structured fluid grid** that prioritizes information density without crowding.

- **System:** 12-column grid for desktop with 24px gutters.
- **Responsiveness:** On tablet (under 1024px), margins reduce to 24px. On mobile (under 600px), margins reduce to 16px and columns collapse to a single stack.
- **Rhythm:** All spacing is based on a 4px baseline. Use 16px (4 units) for internal component spacing and 24px (6 units) for external layout gaps.
- **Signature Detail:** Use a 1px "Heartbeat" line (SVG) as a horizontal divider between major sections of a patient file. The line should be the Accent color at 30% opacity.

## Elevation & Depth

Depth is used to distinguish the "Work Surface" from the "Environment."

- **Base Layer:** The Soft Mint background is the lowest level.
- **Card Layer:** All content sits on White cards. These use a "Soft Clinical Shadow": `0px 4px 20px rgba(16, 69, 79, 0.06)`. This subtle teal-tinted shadow prevents the UI from feeling flat while maintaining a clean look.
- **Interactive Layer:** Hover states on cards should slightly increase the shadow spread and lift the element by 2px to provide tactile feedback.
- **Navigation:** The primary sidebar uses a solid fill (Deep Teal) with no shadow, acting as a structural anchor.

## Shapes

The shape language focuses on "Approachability."

- **Containers:** Large surfaces like cards and modals use a 14px radius. This softens the interface and makes the data feel more "contained" and safe.
- **Components:** Buttons, input fields, and selection chips use an 8px radius. This provides a clear distinction between the "frame" (card) and the "tool" (button).
- **Icons:** Use rounded-corner iconography styles to match the border radius of the components. Avoid sharp-edged icons.

## Components

### Buttons & Inputs
- **Primary Action:** Solid Deep Teal with white text. 8px radius.
- **Secondary Action:** Ghost style with Fresh Teal borders and text.
- **Inputs:** 1px border in Muted Gray-Teal. Focus state uses a 2px Fresh Teal glow.

### Cards
- **Patient Record Card:** White background, 14px radius, soft teal shadow. Should include a 4px Deep Teal left-border accent for "active" or "checked-in" status.

### Medical Specifics
- **Status Chips:** 
  - *Stable:* Fresh Teal background (10% opacity) with Fresh Teal text.
  - *Critical:* Warm Coral background (10% opacity) with Warm Coral text.
- **Vitals Monitor:** Use a dark-mode variant (Deep Teal background) for charts and graphs to make data lines pop, providing a "medical monitor" feel within the light interface.

### Lists
- Use "Zebra striping" on tables with a very faint tint of the Soft Mint background to assist in horizontal scanning of rows.