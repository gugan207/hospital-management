# Sanjeevani Hospital Management System — Full Build Steps

Problem Statement 5: **Hospital Management System — Frontend UI**
Step-by-step guide to plan, design, and build the working frontend from scratch.

---

## Step 1 — Break down the brief into a checklist

Before writing any code, turn the problem statement into a literal checklist so nothing gets missed at submission:

- [ ] Hospital dashboard/homepage
- [ ] Section: Doctors
- [ ] Section: Departments
- [ ] Section: Patients
- [ ] Section: Appointments
- [ ] Section: Services
- [ ] Doctor directory — cards with specializations
- [ ] Appointment booking interface (mock/frontend data)
- [ ] Patient dashboard UI (appointments + basic records)
- [ ] Appointment calendar/schedule interface
- [ ] Hospital departments/services section
- [ ] Emergency/contact info shown prominently
- [ ] Clear typography, spacing, icons, visual hierarchy
- [ ] Responsive (desktop + mobile)
- [ ] Functional navigation
- [ ] Buttons/interactive elements give visual feedback
- [ ] Consistent typography and color system
- [ ] Relevant images/icons for the theme
- [ ] Login page (added requirement)
- [ ] Mock patient/doctor data only — no real backend needed

Keep this list open in a tab. Every later step should tick something off it.

---

## Step 2 — Decide the tech stack

For a **frontend-only** hackathon deliverable, don't over-engineer:

- **HTML5 + CSS3 + vanilla JavaScript** — zero build step, zero install, opens directly in a browser. Best choice when the judges need to see it working in seconds and you don't want npm/webpack failures live on stage.
- Alternative if the team is comfortable with it: **React** (via CDN or Vite) — only worth it if you need reusable components across a bigger app. For a single hackathon demo, plain HTML/CSS/JS is faster to ship and easier to debug under time pressure.
- No backend, no database, no API calls — every doctor, patient, and appointment is a hardcoded JavaScript array (mock data), exactly as the brief allows.

---

## Step 3 — Plan the information architecture

Map the required sections to actual pages/screens before touching CSS:

1. **Login** — role selection (Staff / Doctor / Patient) → routes into the app
2. **Dashboard** — the homepage: stats + today's snapshot + shortcuts
3. **Doctors** — directory, searchable, filterable by department
4. **Appointments** — two tabs: *Book* and *Schedule/Calendar*
5. **Patients** — a patient's own dashboard: profile, upcoming visits, records
6. **Departments** — services/departments grid

Decide navigation pattern: a persistent **sidebar** (desktop) that collapses into a **slide-in drawer** behind a hamburger button (mobile) is the standard pattern for an internal hospital system where staff live in the tool all day.

---

## Step 4 — Design before you build (see the companion UI/UX file)

Do not start writing CSS until you've picked, on paper:

- A color palette (primary + one accent reserved for emergencies)
- Two typefaces (a display face for headings, a body face for data)
- A layout grid (sidebar width, card grid columns, breakpoints)
- One "signature" visual element that makes it feel designed, not templated

Full details, with exact values, live in **`UI-UX-DESIGN.md`**. Build strictly against that spec so the two files stay in sync.

---

## Step 5 — Build the design system first (tokens before pages)

In your CSS, define everything as variables before styling a single page:

```css
:root{
  /* colors, spacing, radius, shadow, fonts — all named tokens */
}
```

Why first: every page (dashboard, doctors, appointments, patients, departments) reuses the same card style, button style, and badge style. If you hardcode colors per-page, changing the palette later means editing five places instead of one.

---

## Step 6 — Build the Login screen

1. Split-screen layout: brand/mission panel on one side, form on the other.
2. Role tabs (Staff / Doctor / Patient) — visually switch active state on click.
3. Two fields: Login ID, Password — both required.
4. Inline validation: show an error message under any empty field on submit attempt.
5. Fake "signing in" state: disable the button, show a spinner, wait ~700ms, then reveal the app shell. This is what makes a static mockup feel like working software.
6. Add a visible "demo credentials" hint since there's no real backend — judges should never be stuck wondering what to type.

---

## Step 7 — Build the app shell (sidebar + topbar)

1. Sidebar: logo/brand mark, current role label, nav list (Dashboard/Doctors/Appointments/Patients/Departments), a highlighted emergency-contact box, and a sign-out button.
2. Topbar: greeting text, an always-visible emergency pill/badge, and a user avatar.
3. Wire up navigation: clicking a sidebar item shows the matching page section and hides the rest — simplest way is one JS function that toggles an `active` class based on a `data-page` attribute.
4. Add the hamburger button for mobile — toggles a CSS class that slides the sidebar into view.

---

## Step 8 — Build the Dashboard (homepage)

1. Stat cards row: total doctors, today's appointments, total patients, beds available.
2. "Today's appointments" table: time, patient, doctor, status badge (Completed/Upcoming).
3. "Quick access" card: buttons that jump straight to Doctors / Appointments / Patients / Departments.
4. Emergency banner at the bottom: short message + a call-to-action button — this satisfies "include emergency/contact information prominently" at the homepage level, in addition to the persistent sidebar/topbar mentions.

---

## Step 9 — Build the Doctor Directory

1. Toolbar: a text search input + a department filter dropdown.
2. Doctor cards: avatar (initials in a colored circle — no broken image placeholders), name, specialization, department tag, star rating, years of experience, and a "Book appointment" button.
3. Filtering logic: on every keystroke/change, re-filter the mock doctor array by name/specialization text match AND selected department, then re-render the grid.
4. Make "Book appointment" functional: clicking it should jump to the Appointments page with that doctor and department pre-selected — small touch, big credibility boost with judges.

---

## Step 10 — Build the Appointment Booking interface

1. Two tabs: **Book Appointment** and **Upcoming Schedule** — simple tab-switch, not separate pages.
2. Booking form fields: Department (select) → Doctor (select, filtered by chosen department) → Patient name → Phone → Date (date picker, minimum = today) → Time slot.
3. Time slots: render as a clickable grid of buttons from a mock list of slots; mark a couple as "taken" (disabled, muted style) so the UI demonstrates real scheduling constraints, not just a free-for-all.
4. On submit: validate required fields, then show a confirmation message inline (not a browser `alert()` — it breaks immersion) summarizing what was booked.
5. Schedule tab: render a list of upcoming mock appointments as date-badge rows (day + month block, doctor, department, patient, time) — this is your "calendar/schedule interface" requirement.

---

## Step 11 — Build the Patient Dashboard

1. Left column: patient profile card — avatar initials, name, patient ID, age/sex, blood group, phone, last visit.
2. Right column: two cards — "Upcoming appointments" (reuse the same date-badge row component from Step 10) and "Recent records" (a simple list: record label, doctor, date).
3. Keep it read-only for this prototype — the brief asks for a dashboard *showing* appointments and basic records, not full CRUD.

---

## Step 12 — Build the Departments & Services section

1. Grid of department cards: icon, name, one-line description of what the department treats, and a specialist count.
2. Cover at least: Cardiology, Neurology, Orthopedics, Pediatrics, General Medicine, Dermatology, ENT, Emergency & Trauma — broad enough to look like a real hospital, not a toy example.

---

## Step 13 — Responsive pass

1. Test at three widths: desktop (~1200px+), tablet (~768–980px), mobile (~375–480px).
2. Sidebar becomes a hidden drawer below ~980px, toggled by the hamburger.
3. Card grids collapse: 4 columns → 2 columns → 1 column as the screen narrows.
4. Forms stack to a single column on mobile.
5. Check tap targets are large enough on mobile (buttons, slot grid, nav items).

---

## Step 14 — Accessibility and polish pass

1. Visible focus outlines on every interactive element (don't remove `outline` without replacing it).
2. Respect `prefers-reduced-motion` — wrap any animation in a media query that disables it for users who've asked for less motion.
3. Sufficient color contrast between text and background (check your palette against WCAG AA, especially small gray text).
4. Every icon that conveys meaning (emergency, department icons) should sit next to a text label, not stand alone.

---

## Step 15 — Final QA against the Step 1 checklist

Go back to the checklist from Step 1 and tick off every item. Anything unticked is a gap the judges will find before you do.

---

## Step 16 — Prepare the submission package

The brief's "Common Prerequisites" section asks for:

1. **Source code** — the project files themselves.
2. **Live website/demo link** — deploy the static frontend (Netlify Drop, GitHub Pages, or Vercel all work with zero config since there's no backend).
3. **Project title** — e.g. "Sanjeevani — Hospital Management System."
4. **Short project description** — 2–3 sentences covering what it does and who it's for.
5. **Technologies used** — HTML5, CSS3, JavaScript (or your chosen stack).
6. **Brief presentation/demo** — record a short screen walkthrough: Login → Dashboard → Doctors (search & filter) → Book an appointment → Patient dashboard → Departments → Emergency banner. Keep it under 3 minutes and narrate what each screen is doing.

---

## Step 17 — Rehearse the live demo

1. Pick one realistic path through the app (e.g., "a patient searches for a cardiologist and books a slot") and rehearse it end to end without stumbling.
2. Have a backup: a recorded video or screenshots, in case the live link or Wi-Fi fails during judging.
3. Be ready to explain, in one sentence each, why you chose your color system, your layout, and your one "signature" design element (see `UI-UX-DESIGN.md`) — judges reward intentional decisions over "it just looked nice."
