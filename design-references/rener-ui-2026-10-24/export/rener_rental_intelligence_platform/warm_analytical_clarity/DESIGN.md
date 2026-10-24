---
name: Warm Analytical Clarity
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#dfe8ff'
  surface-container-highest: '#d9e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#3f4945'
  inverse-surface: '#273143'
  inverse-on-surface: '#ecf0ff'
  outline: '#6f7975'
  outline-variant: '#bec9c4'
  surface-tint: '#116b59'
  primary: '#005243'
  on-primary: '#ffffff'
  primary-container: '#146c5a'
  on-primary-container: '#9bead3'
  inverse-primary: '#87d5bf'
  secondary: '#575f6d'
  on-secondary: '#ffffff'
  secondary-container: '#d8e0f0'
  on-secondary-container: '#5b6371'
  tertiary: '#005424'
  on-tertiary: '#ffffff'
  tertiary-container: '#006f31'
  on-tertiary-container: '#8df09f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a3f2db'
  primary-fixed-dim: '#87d5bf'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#005142'
  secondary-fixed: '#dbe3f3'
  secondary-fixed-dim: '#bfc7d7'
  on-secondary-fixed: '#141c28'
  on-secondary-fixed-variant: '#3f4754'
  tertiary-fixed: '#95f8a7'
  tertiary-fixed-dim: '#79db8d'
  on-tertiary-fixed: '#00210a'
  on-tertiary-fixed-variant: '#005323'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d9e3fb'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 52px
  display-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  price-hero:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
  price-card:
    fontFamily: Be Vietnam Pro
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
  ner-tag:
    fontFamily: Be Vietnam Pro
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system is tailored for an AI-driven student housing intelligence platform that processes unstructured social media listings (specifically Facebook groups) into structured, verifiable market data.

### Brand Personality & Emotional Targets
- **Trustworthy & Authoritative:** Evoking the fiscal discipline and data integrity of modern fintech tools (e.g., Stripe) combined with the approachable hospitality of rental platforms (e.g., Airbnb).
- **Relief & Clarity:** Relieving student anxiety around rental scams, opaque pricing, and information overload through structural cleanliness, soft warm surfaces, and transparent metrics.
- **Analytical & Pragmatic:** Prioritizing high visual hierarchy for extracted named entities (NER tags) and comparative pricing evaluations without visual clutter.

### Design Style
The system adopts an **editorial-fintech hybrid** model:
- Warm ivory foundation layers paired with clinical, pure-white cards for high-density legibility.
- Ultra-soft, low-opacity ambient shadows to give elevated components an unhurried, tangible presence.
- Strict tokenization for data labels, pricing comparison chips, and named-entity text markers.

## Colors

The palette establishes an immediate sense of institutional reliability tempered by natural warmth. Surfaces are intentionally separated between the canvas background and dynamic card panels.

### Foundation & Text Tokens
- **Canvas Base:** `#FAFAF7` (warm ivory, minimizing eye fatigue during long reading sessions).
- **Surface Elevation (Cards, Modals):** `#FFFFFF` (crisp white creating high-contrast depth against the ivory canvas).
- **Text Primary:** `#1C2430` (deep ink navy, providing maximum legibility without the harshness of pure black).
- **Text Secondary & Muted:** `#667085` (neutral slate, reserved for metadata, timestamps, and secondary labels).
- **Border Default:** `#E4E7EC` (subtle framing for unselected states and card perimeters).

### Primary Interactive Tokens
- **Brand Primary:** `#146C5A` (deep forest teal). Applied to primary call-to-actions, active filter segments, link underlines, and focused input rings.
- **Primary Hover / Pressed:** `#0E4F42` (deepened state).
- **Primary Subtle / Active Surface:** `#E6F4F1` (for selected icon backgrounds and subtle active highlights).

### Named Entity Recognition (NER) Syntax Highlighting
Text entities extracted from raw social posts utilize paired tint backgrounds and dark ink colors to maintain WCAG AAA compliance:
1. **GIA (Price):** Background `#FDE68A` | Text `#854D0E`
2. **DT (Square Footage):** Background `#BFDBFE` | Text `#1E40AF`
3. **VT (Location):** Background `#BBF7D0` | Text `#166534`
4. **PN (Bedrooms):** Background `#DDD6FE` | Text `#5B21B6`
5. **PHI (Utility & Extra Fees):** Background `#FED7AA` | Text `#9A3412`

### Valuation Diagnostic Tokens (Price Assessment)
Evaluates rental listings against calculated regional medians:
- **Rẻ hơn (Below Market):** Fill `#DCFCE7`, Border `#86EFAC`, Text `#15803D`.
- **Gần mức phổ biến (Market Average):** Fill `#F1F5F9`, Border `#CBD5E1`, Text `#475569`.
- **Đắt hơn (Above Market):** Fill `#FFEDD5`, Border `#FDBA74`, Text `#C2410C`.

## Typography

The typography is built around **Be Vietnam Pro**, optimized for Vietnamese diacritics, geometric balance, and high technical legibility.

### Hierarchy & Usage Rules
- **Numerical Prominence:** Rental rates and price per square meter are hero data points. They must always render in bold weight (`700`) using tabular figures (`font-variant-numeric: tabular-nums`) to prevent shifting when scanning comparative lists.
- **Raw Listing Text:** Body content parsing unprocessed Facebook listings uses `body-md` (14px/20px) with comfortable line height to accommodate inline NER highlight chips without clipping or vertical overlapping.
- **Entity Badges (`ner-tag`):** Rendered at 11px uppercase with `fontWeight: 700` to serve as instant visual cues in structured breakdown modules.

## Layout & Spacing

### Layout Model
- **Container Framework:** Centered layout locked to a max-width of `1200px` with fluid edge safety gutters.
- **Grid Architecture:** 12-column responsive layout system.
  - **Desktop (>= 1024px):** 12 columns, `1.5rem` (24px) gutters, `2rem` (32px) margins. Typical split: 7 cols for the raw/parsed listing analyzer, 5 cols for price distribution analytics and market comparisons.
  - **Tablet (768px - 1023px):** 8 columns, `1rem` (16px) gutters, `1.5rem` (24px) margins. Stacked analysis view with sticky market indicators.
  - **Mobile (< 768px):** 4 columns, `1rem` (16px) gutters, `1rem` (16px) margins. Full-width stacked cards.

### Spacing Tokens
- `space-xs` (4px): Micro-spacing between NER icon and entity label.
- `space-sm` (8px): Gaps between inline metadata chips, tags, and radio pill options.
- `space-md` (16px): Internal padding for compact cards, input field interiors, and standard stacked elements.
- `space-lg` (24px): Primary padding inside container cards, modal boundaries, and section separations.
- `space-xl` (40px): Page section separators and hero banner bounds.

## Elevation & Depth

This design system avoids heavy drop shadows, relying on layered warmth, crisp white surfaces, and refined ambient light distribution.

### Elevation Levels
- **Level 0 (Canvas):** Flat `#FAFAF7` surface with no shadow. Houses structural page sections.
- **Level 1 (Default Card & Search Bar):**
  - Surface: `#FFFFFF`
  - Border: 1px solid `#E4E7EC`
  - Shadow: `0px 1px 3px rgba(16, 24, 40, 0.05), 0px 1px 2px rgba(16, 24, 40, 0.03)`
- **Level 2 (Hovered Card & Dropdowns):**
  - Surface: `#FFFFFF`
  - Border: 1px solid `#D0D5DD`
  - Shadow: `0px 4px 8px -2px rgba(16, 24, 40, 0.06), 0px 2px 4px -2px rgba(16, 24, 40, 0.04)`
- **Level 3 (Sticky Evaluation Bar & Overlays):**
  - Surface: `#FFFFFF`
  - Shadow: `0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)`

### Interactive Overlays
For interactive modal dialogs and inspect-view sheets, apply a soft scrim: `rgba(28, 36, 48, 0.4)` paired with a subtle background blur (`backdrop-filter: blur(4px)`).

## Shapes

The design system employs a hybrid corner-radius standard that balances modern architectural containment with fluid pill-shaped tags:
- **Containers, Input Fields, and Cards:** Set to `12px` (equivalent to `rounded-lg` under Level 2 token settings). This provides a friendly yet structured enclosure reminiscent of modern financial dashboards.
- **Interactive Badges, NER Highlights, and Price Indicators:** Enforced full pill shape (`roundedness: 999px` / `rounded-full`). Circular bounds ensure that categorical tags remain easily distinguishable from clickable buttons and structured data cards.
- **Avatars & Score Indicators:** Geometric circles (`border-radius: 50%`).

## Components

### Buttons
- **Primary:** Background `#146C5A`, text `#FFFFFF`, border-radius `12px`, padding `12px 20px`. Hover: `#0E4F42`. Active focus: outline ring 4px of `rgba(20, 108, 90, 0.15)`. Font: `label-md`.
- **Secondary:** Background `#FFFFFF`, text `#1C2430`, border `1px solid #D0D5DD`, border-radius `12px`. Hover: background `#F9FAFB`.
- **Ghost:** Background transparent, text `#146C5A`. Hover: background `#E6F4F1`.

### NER Chips & Highlight Wrappers
- **Inline Extraction Mark:** Inside post body copy, extracted words are wrapped in a `<mark>` container with 2px horizontal padding, 2px border radius, and the respective entity's background color.
- **Entity Category Badge:** Compact pill (`rounded-full`), padding `2px 8px`, font size `11px`, bold. Displays the label code (e.g., `GIÁ`, `DT`, `VT`) followed by the extracted string.

### Price Valuation Badge (Diagnostic Card)
- Used as the decisive market indicator at the top of listing analyses.
- Structure: Full pill badge or full-width notification banner with left accent border (4px).
- Pairings:
  - **Rẻ hơn:** Background `#DCFCE7`, border `#86EFAC`, text `#15803D`, accompanied by an upward trend or checkmark icon.
  - **Gần mức phổ biến:** Background `#F1F5F9`, border `#CBD5E1`, text `#475569`, accompanied by an equalizing balanced scale icon.
  - **Đắt hơn:** Background `#FFEDD5`, border `#FDBA74`, text `#C2410C`, accompanied by an alert icon and percentage differential.

### Input Fields & Search Bars
- Background `#FFFFFF`, height `48px`, border `1px solid #D0D5DD`, border-radius `12px`, horizontal padding `16px`.
- Placeholder text in `#667085`.
- Focus state: border `#146C5A`, box-shadow `0 0 0 3px rgba(20, 108, 90, 0.12)`.
- Input URL paste state includes an automatic "Phân tích ngay" button anchored inside the right-hand padding.

### Listing & Intelligence Cards
- Background `#FFFFFF`, border `1px solid #E4E7EC`, border-radius `12px`, padding `20px`.
- Structure:
  - Top: Source label (Facebook Post), timestamp, and Price Valuation Badge.
  - Center: Highlighted listing excerpt with inline NER tags.
  - Bottom: Key metrics strip (Grid 3-col: Giá phòng, Diện tích, Giá/m² vs khu vực) separated by hairline border `#F2F4F7`.

### Selection Controls (Checkboxes & Radios)
- Radio / Checkbox active state: `#146C5A` fill with white check/dot. Unchecked: 1.5px border `#D0D5DD`.
- Filter selection tags: Toggleable pill buttons that switch between neutral outline (`#E4E7EC`) and active primary tint (`background: #E6F4F1, border: #146C5A, text: #146C5A`).