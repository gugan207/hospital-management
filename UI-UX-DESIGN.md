# Sanjeevani Hospital Management System — UI/UX Design Spec

Design reference for Problem Statement 5: Hospital Management System — Frontend UI.
Use this as the single source of truth while building — every color, font, and spacing value should trace back to this file.

---

## 1. Design direction

**Brief interpreted as:** a hospital staff/patient portal that needs to feel calm and trustworthy rather than sterile or corporate. Most hospital-system mockups default to plain white-and-blue "enterprise software" looks — this design deliberately avoids that by pairing a warm serif display face with a disciplined teal system, and reserving a single warm accent color exclusively for emergencies, so urgency actually reads as urgent.

**One-line concept:** *"Care that keeps its word"* — every screen should feel organized enough that a stressed patient or a rushed nurse trusts it immediately.

---

## 2. Color system

| Token | Hex | Use |
|---|---|---|
| `teal-950` | `#0B2E32` | Deepest background (login brand panel) |
| `teal-900` | `#10454F` | Sidebar background, primary buttons, headings |
| `teal-700` | `#1B6E76` | Hover states, secondary emphasis |
| `teal-500` | `#2A9D8F` | Active nav item, links, primary accent |
| `teal-200` | `#BFE3DC` | Muted text on dark backgrounds |
| `teal-100` | `#E4F3EF` | Tag/badge backgrounds, subtle fills |
| `mint-bg` | `#F3F8F6` | Page background |
| `coral` | `#E76F51` | **Emergency and critical actions only** — never decorative |
| `coral-dark` | `#C2502F` | Emergency hover / error text |
| `ink` | `#17262A` | Primary body text |
| `ink-soft` | `#5B6D6C` | Secondary/muted text |
| `line` | `#DCE7E3` | Borders, dividers |
| `white` | `#FFFFFF` | Cards, form fields on focus |

**Rule of discipline:** teal carries the entire interface. Coral appears in exactly three places — the emergency sidebar box, the topbar emergency pill, and the dashboard emergency banner/call button — nowhere else. This is what makes emergency information "prominent" per the brief, instead of just one color among many.

---

## 3. Typography

| Role | Typeface | Notes |
|---|---|---|
| Display / headings | **Fraunces** (serif, variable) | Used sparingly for page titles, the login headline, and card headers — gives warmth against the sterile-hospital-software cliché |
| Body / UI text | **Inter** | All paragraphs, labels, buttons, nav items — optimized for legibility at small sizes |
| Data / mono | **IBM Plex Mono** | Patient IDs, dates on appointment cards, demo credentials — signals "this is a record," not prose |

**Type scale (approx.):**
- Page title: 1.55rem / 600 weight
- Card heading: 1.05rem / 600 weight
- Body text: 0.9–0.95rem / 400
- Labels/eyebrows: 0.75–0.8rem / 600, uppercase, letter-spacing 0.03–0.06em

---

## 4. Layout system

- **Grid unit:** 4px baseline for spacing; cards use 16–22px internal padding.
- **Sidebar:** fixed 230px wide on desktop, becomes a slide-in drawer under 980px.
- **Content max-width:** ~1180px, centered under the topbar.
- **Card grids:**
  - Stat cards: 4 columns → 2 (tablet) → 2 (mobile)
  - Doctor cards: 3 columns → 2 (tablet) → 1 (mobile)
  - Department cards: 4 columns → 2 (tablet/mobile)
- **Corner radius:** 8px (inputs/buttons), 14px (cards), 22px (banners) — consistent scale, never mixed arbitrarily.
- **Shadow:** one soft card shadow used everywhere (`0 1px 2px rgba(16,69,79,.06), 0 8px 24px rgba(16,69,79,.08)`) — never a second, different shadow style.

---

## 5. Signature element

A hand-drawn **heartbeat/vitals line** (SVG), stroke-drawn once on page load (respecting reduced-motion preferences). Used on the login brand panel and reusable as a section divider. This is the one deliberately expressive element in an otherwise disciplined system — it ties visually to "hospital" without resorting to a stock photo of a stethoscope.

---

## 6. Screen-by-screen UX notes

### 6.1 Login
- **Layout:** split screen — left panel = brand story + stats (beds managed, specialist doctors, 24/7 emergency desk), right panel = the form.
- **Role tabs:** Staff / Doctor / Patient — pill-style toggle, single active state.
- **Fields:** Login ID, Password — both required, inline error text appears only after a failed submit attempt (don't show errors before the user has tried).
- **Feedback:** button shows a spinner + "Signing in..." label for ~700ms before transitioning — communicates that *something* is happening, not an instant jump cut.
- **Escape hatch:** a visible demo-credentials hint, since this is a mock-data prototype with no real auth — never let a judge get stuck at the login screen.

### 6.2 Dashboard (homepage)
- **Purpose:** answer "what's happening right now" in under 3 seconds of scanning.
- **Order of information:** stat cards (numbers first) → today's appointment table (specifics) → quick-access shortcuts → emergency banner (always last, always visible without scrolling on most screens).
- **Status badges:** "Completed" vs "Upcoming" use color, not just text, so the table is scannable at a glance.

### 6.3 Doctors (directory)
- **Purpose:** find a doctor fast, book fast.
- **Search + filter live together** in one toolbar row — search narrows by name/specialization text, filter narrows by department; both apply simultaneously.
- **Card anatomy, top to bottom:** avatar + name + specialization → department tag → rating → experience → book button. This order matches how a patient actually decides ("who is this, what do they treat, are they good, how experienced, can I book").
- **Empty state:** if a search matches nothing, show a plain-language message instead of a blank grid.

### 6.4 Appointments
- **Two-tab pattern** (Book / Schedule) keeps booking and reviewing in one place without a page reload — matches how patients actually use the feature: "am I booking something new, or checking what I already have."
- **Booking form order:** Department → Doctor (cascading) → who/contact → when (date) → what time (slot grid) → why (reason). This mirrors a real intake conversation.
- **Slot grid, not a plain dropdown:** visually distinguishing available / taken / selected slots communicates real scheduling constraints — a dropdown would hide that entirely.
- **Confirmation:** inline message, not a browser alert — keeps the user inside the designed interface instead of breaking into a native OS dialog.

### 6.5 Patients (patient dashboard)
- **Two-column layout:** identity (who is this patient) stays fixed on the left; activity (appointments, records) scrolls on the right — standard "profile + activity feed" pattern, familiar and low-friction.
- **Read-only for this prototype** — the brief asks the UI to *show* appointments and records, not edit them.

### 6.6 Departments & Services
- **Purpose:** let a new patient orient themselves ("does this hospital treat what I need") without needing to already know a doctor's name.
- **Card anatomy:** icon (quick visual scan) → name → one-line plain-language description → specialist count (signals depth/credibility).

---

## 7. Interaction & feedback rules

- Every clickable element must visibly change on hover/focus (color shift or border) — never a static button that looks the same in every state.
- Disabled states (taken time slots) are visually muted **and** functionally disabled — both cues together, not just one.
- Form submission always gives feedback: either an inline error (what's missing) or an inline success message (what was booked) — never a silent no-op.
- Navigation is always one click from anywhere: sidebar items are present on every page, no dead ends.

---

## 8. Responsive behavior summary

| Breakpoint | Sidebar | Card grids | Forms |
|---|---|---|---|
| Desktop (>980px) | Fixed, always visible | Full column count | Two-column |
| Tablet (620–980px) | Hidden, opens as drawer via hamburger | Drop to 2 columns | Two-column |
| Mobile (<620px) | Drawer | Drop to 1 column | Single column, stacked |

---

## 9. Accessibility checklist

- [ ] Visible focus ring on every interactive element (inputs, buttons, nav items, cards with actions)
- [ ] Color is never the *only* signal (status badges pair color with text; disabled slots pair muting with a `disabled` state)
- [ ] Text contrast meets at least WCAG AA against its background, including `ink-soft` gray text
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Icons that carry meaning (emergency, department icons) always sit beside a text label
- [ ] Tap targets on mobile are large enough to hit reliably (buttons, nav items, slot grid cells)
