# GUGAN — Hospital Management System

*"Care that keeps its word."*

A calm, trustworthy frontend for a hospital staff/doctor/patient portal — built as a static, zero-dependency HTML/CSS/JS application with mock data. No backend, no build step, no install: open it and it works.

![Static Badge](https://img.shields.io/badge/stack-HTML5%20%C2%B7%20CSS3%20%C2%B7%20Vanilla%20JS-2A9D8F)
![Static Badge](https://img.shields.io/badge/backend-none%20(mock%20data)-10454F)
![Static Badge](https://img.shields.io/badge/build%20step-none-E76F51)

---

## Table of contents

- [Overview](#overview)
- [Product & Tools Summary](PRODUCT-SUMMARY.md)
- [Features](#features)
- [Design system](#design-system)
- [Project structure](#project-structure)
- [Running it locally](#running-it-locally)
- [Demo walkthrough](#demo-walkthrough)
- [Mock data](#mock-data)
- [Accessibility](#accessibility)
- [Responsive behavior](#responsive-behavior)
- [Deploying](#deploying)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)

---

## Overview

Sanjeevani is a frontend-only hospital management prototype covering the full patient/staff journey: signing in, scanning the day at a glance, finding a doctor, booking a slot, and reviewing a patient's own record. Every screen is built against a single design spec (`UI-UX-DESIGN.md`) so color, type, spacing, and interaction stay consistent across the app — nothing is one-off or hardcoded per page.

There is no server, no database, and no real authentication. Every doctor, patient, appointment, and department is a hardcoded JavaScript array in `js/data.js`, exactly as a frontend-only deliverable calls for. The login screen accepts any non-empty ID/password — it's a mock gate, not real auth.

For a full breakdown of all tools, design system tokens, and full product documentation, see **[PRODUCT-SUMMARY.md](PRODUCT-SUMMARY.md)**.

## Features

- **Login** — role selection (Staff / Doctor / Patient), inline validation, a fake "signing in" loading state, and a visible demo-credentials hint so no one gets stuck.
- **Dashboard** — stat cards (doctors, today's appointments, patients, beds available), a live "today's appointments" table with status badges, quick-access shortcuts, and an always-visible emergency banner.
- **Doctors** — a searchable, department-filterable directory. Search and filter apply simultaneously and re-render live as you type. Every card's "Book appointment" button jumps to the booking form with that doctor pre-selected.
- **Appointments** — two tabs in one page: *Book* (cascading Department → Doctor selects, a real slot grid with taken/available/selected states, inline confirmation on submit) and *Upcoming Schedule* (a date-badge list of booked visits).
- **Patients** — a read-only patient dashboard: profile card (avatar, ID, age/sex, blood group, phone, last visit) alongside upcoming appointments and recent records.
- **Departments** — an 8-department grid (Cardiology, Neurology, Orthopedics, Pediatrics, General Medicine, Dermatology, ENT, Emergency & Trauma) with icon, description, and specialist count.
- **Persistent emergency access** — a dedicated sidebar box, a pulsing topbar pill, and the dashboard banner — the one place color is used to signal urgency rather than decoration.
- **Consolidated identity in the sidebar** — avatar, name, role, and sign-out all live together as one card pinned to the bottom of the sidebar, so the topbar stays focused on page context.

## Design system

Full source of truth: **`UI-UX-DESIGN.md`**. Summary:

| Aspect | Choice |
|---|---|
| Color | A disciplined teal system (`#0B2E32` → `#E4F3EF`) for the entire interface; coral (`#E76F51`) reserved *exclusively* for emergency UI — sidebar box, topbar pill, dashboard banner. |
| Type | **Fraunces** (serif) for headings/display, **Inter** for body/UI text, **IBM Plex Mono** for data — IDs, dates, time slots. |
| Layout | 4px baseline grid, 230px fixed sidebar (collapses to a drawer under 980px), content capped at ~1180px. |
| Shape | One consistent radius scale — 8px inputs/buttons, 14px cards, 22px banners — never mixed arbitrarily. |
| Shadow | A single soft elevation (`0 1px 2px … , 0 8px 24px …`) used everywhere, deepened slightly on hover for interactive cards. |
| Signature element | A hand-drawn, stroke-animated heartbeat/vitals line (inline SVG) on the login brand panel — the one deliberately expressive touch in an otherwise restrained system. |
| Motion | Subtle, purposeful: card hover-lift, a frosted sticky topbar, a soft page-transition fade, and a pulsing emergency dot — all wrapped in `prefers-reduced-motion` guards. |

## Project structure

```
HOSPITALMANAGEMENT/
├── index.html            Markup for every screen (login + all app sections)
├── css/
│   └── styles.css        Design tokens + all styling, mobile-first breakpoints
├── js/
│   ├── data.js            Mock departments, doctors, patients, appointments, slots
│   └── app.js              Login flow, navigation, search/filter, booking logic
├── BUILD-STEPS.md          The 17-step build plan this project followed
├── UI-UX-DESIGN.md         The design spec — single source of truth for every value
├── PRODUCT-SUMMARY.md      Tools used, design system, and complete product summary
└── README.md               You are here
```

No `package.json`, no bundler, no `node_modules`. The only external requests are Google Fonts (Fraunces, Inter, IBM Plex Mono).

## Running it locally

Nothing to install. Pick either:

**A. Just open it**
Double-click `index.html` — it runs directly in the browser from disk.

**B. Serve it (recommended, closer to production)**
```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```
Then visit `http://localhost:8000`.

## Demo walkthrough

A ~2 minute path that exercises every section:

1. **Login** — pick a role tab, type anything into ID/Password (e.g. `demo` / `demo123`), submit.
2. **Dashboard** — scan the stat cards and today's appointment table.
3. **Doctors** — search "cardio" or filter by *Cardiology*, then click **Book appointment** on a card.
4. **Appointments → Book** — the doctor/department arrive pre-filled; fill in the rest, pick an open time slot, submit — watch the inline confirmation appear.
5. **Appointments → Upcoming Schedule** — see the date-badge list of booked visits.
6. **Patients** — review the read-only profile, appointments, and records.
7. **Departments** — browse the full service grid.
8. **Sidebar** — try the emergency box, the identity card, and sign out.

## Mock data

Everything lives in `js/data.js`:

| Array | Contents |
|---|---|
| `DEPARTMENTS` | 8 departments with icon key, specialist count, description |
| `DOCTORS` | 12 doctors spanning all departments, with rating and years of experience |
| `TIME_SLOTS` | 12 slots per day, several pre-marked `taken` to demonstrate real scheduling constraints |
| `TODAY_APPOINTMENTS` | Rows for the dashboard table, mixed `completed` / `upcoming` |
| `UPCOMING_SCHEDULE` | Rows for the Appointments → Schedule tab |
| `CURRENT_PATIENT` | The patient shown on the Patients page: profile, appointments, records |

To add a doctor, department, or slot, edit the relevant array — every page re-renders from these on load, so there's exactly one place to change.

## Accessibility

- Visible focus rings on every interactive element (`:focus-visible`, never removed without replacement).
- Status and state are never color-only: badges pair color with text, disabled time slots pair muting with a real `disabled` attribute.
- All animations (vitals line, page transitions, emergency pulse) respect `prefers-reduced-motion`.
- Icons that carry meaning (emergency, departments, nav) always sit beside a text label.
- Semantic roles/attributes on tabs (`role="tab"`, `aria-selected`) and labelled landmark sections (`aria-labelledby`).

## Responsive behavior

| Breakpoint | Sidebar | Card grids | Forms |
|---|---|---|---|
| Desktop (>980px) | Fixed, always visible | Full column count | Two-column |
| Tablet (620–980px) | Hidden, opens as a drawer via the hamburger | 2 columns | Two-column |
| Mobile (<620px) | Drawer | 1 column | Single column, stacked |

## Deploying

Zero-config static hosts all work as-is: **Netlify Drop**, **GitHub Pages**, or **Vercel**. Drag the folder in (or point at the repo) — there's no build command to configure.

## Known limitations

- No real backend — nothing persists between page loads (a booking confirmation is visual only, not stored).
- Login accepts any non-empty credentials; role selection changes greeting/landing page only, not permissions.
- The Patients page shows a single mock patient record rather than a full multi-patient lookup, per the brief's "dashboard UI," not "full CRUD," requirement.

## Roadmap

Ideas beyond the current mock-data scope, not required by the brief:

- Persist bookings to `localStorage` so a confirmed slot actually shows as taken on reload.
- A real multi-patient search on the Patients page.
- Dark mode using the same teal/coral token system.
