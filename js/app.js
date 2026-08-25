/* =========================================================
   Sanjeevani — Hospital Management System
   Unified Client-side Logic (Vanilla JavaScript)
========================================================= */

(function () {
  "use strict";

  const state = {
    role: "staff",
    selectedDept: "",
    selectedDoctor: "",
    selectedSlot: null,
  };

  const deptName = (id) => DEPARTMENTS.find((d) => d.id === id)?.name || id;
  const initials = (name) =>
    name.replace(/^Dr\.\s*/, "").split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const avatarColor = (seed) => AVATAR_COLORS[seed % AVATAR_COLORS.length];

  const DEPT_ICONS = {
    cardiology: "icon-heart",
    neurology: "icon-brain",
    orthopedics: "icon-bone",
    pediatrics: "icon-baby",
    general: "icon-stethoscope",
    dermatology: "icon-droplet",
    ent: "icon-ear",
    emergency: "icon-emergency",
  };

  /* ---------------- 1. LOGIN & AUTH GATEWAY ---------------- */
  const loginScreen = document.getElementById("login-screen");
  const appShell = document.getElementById("app-shell");
  const roleTabs = document.querySelectorAll(".role-tab");
  const loginForm = document.getElementById("login-form");
  const loginSubmit = document.getElementById("login-submit");
  const loginIdField = document.getElementById("login-id");
  const loginPwField = document.getElementById("login-pw");
  const pwToggle = document.getElementById("pw-toggle");
  const pwToggleIcon = document.getElementById("pw-toggle-icon");
  const demoCodeHint = document.getElementById("demo-code-hint");

  // Role switching on login screen
  roleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      roleTabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      state.role = tab.dataset.role;

      if (state.role === "staff") {
        loginIdField.value = "admin";
        loginPwField.value = "admin123";
        if (demoCodeHint) demoCodeHint.textContent = "admin / admin123";
      } else if (state.role === "doctor") {
        loginIdField.value = "dr.sharma";
        loginPwField.value = "doctor123";
        if (demoCodeHint) demoCodeHint.textContent = "dr.sharma / doctor123";
      } else {
        loginIdField.value = "ananya.k";
        loginPwField.value = "patient123";
        if (demoCodeHint) demoCodeHint.textContent = "ananya.k / patient123";
      }
    });
  });

  // Password visibility toggle
  if (pwToggle && pwToggleIcon) {
    pwToggle.addEventListener("click", () => {
      const isPw = loginPwField.type === "password";
      loginPwField.type = isPw ? "text" : "password";
      pwToggleIcon.innerHTML = `<use href="#${isPw ? "icon-eye-off" : "icon-eye"}"/>`;
    });
  }

  function validateLoginField(input) {
    const field = input.closest(".field");
    const ok = input.value.trim().length > 0;
    field.classList.toggle("has-error", !ok);
    return ok;
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const idOk = validateLoginField(loginIdField);
    const pwOk = validateLoginField(loginPwField);
    if (!idOk || !pwOk) return;

    loginSubmit.disabled = true;
    loginSubmit.classList.add("is-loading");

    setTimeout(() => {
      loginSubmit.disabled = false;
      loginSubmit.classList.remove("is-loading");
      enterApp();
    }, 700);
  });

  function roleLabel() {
    return { staff: "Staff", doctor: "Doctor", patient: "Patient" }[state.role];
  }

  function roleDisplayName() {
    if (state.role === "patient") return CURRENT_PATIENT.name;
    if (state.role === "doctor") return "Dr. A. Sharma";
    return "Staff Desk";
  }

  function enterApp() {
    loginScreen.classList.add("hidden");
    appShell.classList.remove("hidden");

    const dispName = roleDisplayName();
    const userInitials = initials(dispName);

    const sidebarAvatar = document.getElementById("sidebar-avatar");
    const sidebarName = document.getElementById("sidebar-user-name");
    const sidebarRole = document.getElementById("sidebar-user-role");
    const topbarHello = document.getElementById("topbar-hello");
    const topbarAvatar = document.getElementById("topbar-avatar");
    const topbarTitle = document.getElementById("topbar-user-title");

    if (sidebarAvatar) sidebarAvatar.textContent = userInitials;
    if (sidebarName) sidebarName.textContent = dispName;
    if (sidebarRole) sidebarRole.textContent = roleLabel() + " Portal • Active";
    if (topbarHello) topbarHello.textContent = "Good day, " + (state.role === "doctor" ? "Dr. Sharma" : roleLabel());
    if (topbarAvatar) topbarAvatar.textContent = userInitials;
    if (topbarTitle) topbarTitle.textContent = state.role === "doctor" ? "Chief of Medicine" : (state.role === "patient" ? "Patient ID " + CURRENT_PATIENT.id : "Administrator");

    const landing = state.role === "patient" ? "patients" : "dashboard";
    goToPage(landing);
  }

  /* ---------------- 2. NAVIGATION & ROUTING ---------------- */
  const navItems = document.querySelectorAll(".nav__item");
  const pages = document.querySelectorAll(".page");
  const appShellEl = document.getElementById("app-shell");
  const hamburger = document.getElementById("hamburger");
  const drawerClose = document.getElementById("drawer-close");
  const drawerScrim = document.getElementById("drawer-scrim");

  function goToPage(pageId) {
    navItems.forEach((n) => n.classList.toggle("is-active", n.dataset.page === pageId));
    pages.forEach((p) => p.classList.toggle("is-active", p.dataset.page === pageId));
    closeDrawer();
    const content = document.getElementById("content");
    if (content) content.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  navItems.forEach((item) => item.addEventListener("click", () => goToPage(item.dataset.page)));

  document.querySelectorAll("[data-page-link]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      goToPage(el.dataset.pageLink);
    })
  );

  function openDrawer() { appShellEl.classList.add("drawer-open"); }
  function closeDrawer() { appShellEl.classList.remove("drawer-open"); }
  if (hamburger) hamburger.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawerScrim) drawerScrim.addEventListener("click", closeDrawer);

  document.getElementById("signout-btn").addEventListener("click", () => {
    appShellEl.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    document.querySelectorAll(".field").forEach((f) => f.classList.remove("has-error"));
  });

  // Topbar date display
  const topbarDateEl = document.getElementById("topbar-date");
  if (topbarDateEl) {
    topbarDateEl.textContent = new Date().toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "short", day: "numeric",
    });
  }

  /* ---------------- 3. DASHBOARD MODULE ---------------- */
  function renderDashboard() {
    const docCountEl = document.getElementById("stat-doctors");
    const aptCountEl = document.getElementById("stat-appointments");
    const bedCountEl = document.getElementById("stat-beds");

    if (docCountEl) docCountEl.textContent = DOCTORS.length;
    if (aptCountEl) aptCountEl.textContent = TODAY_APPOINTMENTS.length;
    if (bedCountEl) bedCountEl.textContent = HOSPITAL_STATS.bedsAvailable;

    const body = document.getElementById("today-table-body");
    if (body) {
      body.innerHTML = TODAY_APPOINTMENTS.map((a, i) => {
        const pInit = a.patient.split(" ").map(p => p[0]).join("").toUpperCase();
        const badgeClass = a.status === "completed" ? "badge--completed" : (a.status === "in-progress" ? "badge--in-progress" : "badge--upcoming");
        const statusLabel = a.status === "completed" ? "Completed" : (a.status === "in-progress" ? "In Progress" : "Upcoming");

        return `
          <tr>
            <td class="table-time">${a.time}</td>
            <td>
              <div class="table-patient-cell">
                <div class="avatar" style="width: 32px; height: 32px; font-size: 0.8rem; background: ${avatarColor(i)}; color: #fff;">${pInit}</div>
                <span>${a.patient}</span>
              </div>
            </td>
            <td><span class="meta-pill meta-pill--dept">${a.dept || "General"}</span></td>
            <td>${a.doctor}</td>
            <td style="text-align: right;">
              <span class="badge ${badgeClass}">${statusLabel}</span>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  /* ---------------- 4. DOCTORS DIRECTORY MODULE ---------------- */
  const doctorGrid = document.getElementById("doctor-grid");
  const doctorEmpty = document.getElementById("doctor-empty");
  const doctorSearch = document.getElementById("doctor-search");
  const doctorDeptFilter = document.getElementById("doctor-dept-filter");

  function initDoctorDeptFilter() {
    if (!doctorDeptFilter) return;
    doctorDeptFilter.innerHTML = '<option value="all">All Departments</option>' +
      DEPARTMENTS.map((d) => `<option value="${d.id}">${d.name}</option>`).join("");
  }

  function renderDoctors() {
    if (!doctorGrid) return;
    const query = (doctorSearch?.value || "").trim().toLowerCase();
    const dept = doctorDeptFilter?.value || "all";

    const filtered = DOCTORS.filter((doc) => {
      const matchesDept = dept === "all" || doc.dept === dept;
      const matchesQuery = !query ||
        doc.name.toLowerCase().includes(query) ||
        doc.spec.toLowerCase().includes(query) ||
        deptName(doc.dept).toLowerCase().includes(query);
      return matchesDept && matchesQuery;
    });

    if (filtered.length === 0) {
      doctorGrid.innerHTML = "";
      if (doctorEmpty) doctorEmpty.hidden = false;
      return;
    }

    if (doctorEmpty) doctorEmpty.hidden = true;
    doctorGrid.innerHTML = filtered.map((doc, idx) => {
      const docInitials = initials(doc.name);
      return `
        <article class="doctor-card" data-doc-id="${doc.id}">
          <div class="doctor-card__header">
            <div class="doctor-avatar" style="background: ${avatarColor(idx)};">
              ${docInitials}
            </div>
            <div class="doctor-info">
              <h3 class="doctor-name">${doc.name}</h3>
              <p class="doctor-spec">${doc.spec}</p>
              <div class="doctor-rating">
                <svg width="15" height="15" style="color: var(--star-amber);"><use href="#icon-star"/></svg>
                <span>${doc.rating}</span>
                <span class="reviews-count">(${doc.reviews || 95} reviews)</span>
              </div>
            </div>
          </div>
          <div class="doctor-meta-row">
            <span class="meta-pill meta-pill--dept">${deptName(doc.dept)}</span>
            <span class="meta-pill meta-pill--exp">
              <svg width="14" height="14" style="color: var(--on-surface-variant);"><use href="#icon-badge"/></svg>
              ${doc.exp} yrs exp
            </span>
          </div>
          <button type="button" class="btn btn--ghost btn--block book-doctor-btn" data-doc-id="${doc.id}" data-dept-id="${doc.dept}">
            <span>Book Appointment</span>
            <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
          </button>
        </article>
      `;
    }).join("");

    // Wire up "Book Appointment" triggers
    doctorGrid.querySelectorAll(".book-doctor-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const docId = btn.dataset.docId;
        const deptId = btn.dataset.deptId;
        startBookingWithDoctor(deptId, docId);
      });
    });
  }

  if (doctorSearch) doctorSearch.addEventListener("input", renderDoctors);
  if (doctorDeptFilter) doctorDeptFilter.addEventListener("change", renderDoctors);

  /* ---------------- 5. APPOINTMENTS MODULE ---------------- */
  const bookDeptSelect = document.getElementById("book-dept");
  const bookDoctorSelect = document.getElementById("book-doctor");
  const bookDateInput = document.getElementById("book-date");
  const slotGrid = document.getElementById("slot-grid");
  const bookingForm = document.getElementById("booking-form");
  const bookingConfirmation = document.getElementById("booking-confirmation");
  const bookingConfirmationText = document.getElementById("booking-confirmation-text");
  const scheduleList = document.getElementById("schedule-list");
  const appointmentTabs = document.querySelectorAll(".tab[data-tab]");
  const appointmentPanels = document.querySelectorAll(".tab-panel");

  // Tab switching for Appointments
  appointmentTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      appointmentTabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      appointmentPanels.forEach((p) => p.classList.remove("is-active"));

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      const targetPanel = document.querySelector(`.tab-panel[data-tab-panel="${tab.dataset.tab}"]`);
      if (targetPanel) targetPanel.classList.add("is-active");
    });
  });

  function initBookingForm() {
    if (!bookDeptSelect) return;
    bookDeptSelect.innerHTML = '<option value="">Select Department</option>' +
      DEPARTMENTS.map((d) => `<option value="${d.id}">${d.name}</option>`).join("");

    // Set min date to today
    if (bookDateInput) {
      const todayISO = new Date().toISOString().split("T")[0];
      bookDateInput.min = todayISO;
      bookDateInput.value = todayISO;
    }

    renderTimeSlots();
  }

  function updateDoctorOptions(deptId, preselectDocId) {
    if (!bookDoctorSelect) return;
    if (!deptId) {
      bookDoctorSelect.innerHTML = '<option value="">Select department first</option>';
      bookDoctorSelect.disabled = true;
      return;
    }

    const availableDocs = DOCTORS.filter((d) => d.dept === deptId);
    bookDoctorSelect.disabled = false;
    bookDoctorSelect.innerHTML = '<option value="">Select Doctor</option>' +
      availableDocs.map((d) => `<option value="${d.id}">${d.name} (${d.spec})</option>`).join("");

    if (preselectDocId) {
      bookDoctorSelect.value = preselectDocId;
    }
  }

  if (bookDeptSelect) {
    bookDeptSelect.addEventListener("change", () => {
      updateDoctorOptions(bookDeptSelect.value);
    });
  }

  function renderTimeSlots() {
    if (!slotGrid) return;
    slotGrid.innerHTML = TIME_SLOTS.map((slot) => {
      const isSel = state.selectedSlot === slot.time;
      return `
        <button type="button" class="slot-chip ${isSel ? "is-selected" : ""}" ${slot.taken ? "disabled" : ""} data-time="${slot.time}">
          ${slot.time}
        </button>
      `;
    }).join("");

    slotGrid.querySelectorAll(".slot-chip:not(:disabled)").forEach((chip) => {
      chip.addEventListener("click", () => {
        state.selectedSlot = chip.dataset.time;
        renderTimeSlots();
        const slotError = document.getElementById("slot-error");
        if (slotError) slotError.closest(".field")?.classList.remove("has-error");
      });
    });
  }

  function startBookingWithDoctor(deptId, docId) {
    goToPage("appointments");
    // Switch to book tab
    const bookTab = document.querySelector('.tab[data-tab="book"]');
    if (bookTab) bookTab.click();

    if (bookDeptSelect) bookDeptSelect.value = deptId;
    updateDoctorOptions(deptId, docId);
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let valid = true;
      const deptOk = !!bookDeptSelect.value;
      const docOk = !!bookDoctorSelect.value;
      const nameField = document.getElementById("book-name");
      const phoneField = document.getElementById("book-phone");
      const dateOk = !!bookDateInput.value;
      const slotOk = !!state.selectedSlot;

      const setFieldError = (input, ok) => {
        const f = input?.closest(".field");
        if (f) f.classList.toggle("has-error", !ok);
        if (!ok) valid = false;
      };

      setFieldError(bookDeptSelect, deptOk);
      setFieldError(bookDoctorSelect, docOk);
      setFieldError(nameField, nameField.value.trim().length > 0);
      setFieldError(phoneField, phoneField.value.trim().length >= 7);
      setFieldError(bookDateInput, dateOk);

      const slotField = slotGrid?.closest(".field");
      if (slotField) slotField.classList.toggle("has-error", !slotOk);
      if (!slotOk) valid = false;

      if (!valid) return;

      // Show confirmation receipt
      const chosenDoc = DOCTORS.find((d) => d.id === bookDoctorSelect.value);
      const chosenDept = DEPARTMENTS.find((d) => d.id === bookDeptSelect.value);
      const randomID = "APT-" + Math.floor(1000 + Math.random() * 9000);

      bookingConfirmationText.innerHTML = `
        <div style="font-weight: 700; font-size: 1rem; color: var(--secondary);">Appointment Confirmed (${randomID})</div>
        <div style="font-size: 0.88rem; margin-top: 2px; color: var(--on-surface);">
          <strong>${nameField.value.trim()}</strong> with <strong>${chosenDoc?.name}</strong> (${chosenDept?.name}) on <strong>${bookDateInput.value}</strong> at <strong>${state.selectedSlot}</strong>.
        </div>
      `;
      bookingConfirmation.hidden = false;

      // Add to upcoming schedule mock array
      const parsedDate = new Date(bookDateInput.value);
      UPCOMING_SCHEDULE.unshift({
        day: String(parsedDate.getDate()).padStart(2, "0"),
        month: parsedDate.toLocaleDateString("en-US", { month: "short" }),
        doctor: chosenDoc?.name || "Dr. Assigned",
        dept: chosenDept?.name || "General",
        patient: nameField.value.trim(),
        time: state.selectedSlot,
        status: "Confirmed",
      });

      renderScheduleList();
      bookingForm.reset();
      state.selectedSlot = null;
      renderTimeSlots();
    });

    const resetBtn = document.getElementById("booking-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        bookingForm.reset();
        state.selectedSlot = null;
        renderTimeSlots();
        if (bookingConfirmation) bookingConfirmation.hidden = true;
        document.querySelectorAll(".field").forEach((f) => f.classList.remove("has-error"));
      });
    }
  }

  function renderScheduleList() {
    if (!scheduleList) return;
    scheduleList.innerHTML = UPCOMING_SCHEDULE.map((s) => `
      <div class="date-row">
        <div class="date-badge">
          <div class="date-badge__month">${s.month}</div>
          <div class="date-badge__day">${s.day}</div>
        </div>
        <div class="date-row__info">
          <div class="date-row__title">${s.doctor}</div>
          <div class="date-row__sub">${s.dept} • Patient: ${s.patient}</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
          <div class="date-row__time">
            <svg width="15" height="15" style="color: var(--secondary);"><use href="#icon-clock"/></svg>
            <span>${s.time}</span>
          </div>
          <span class="badge badge--confirmed">${s.status || "Confirmed"}</span>
        </div>
      </div>
    `).join("");
  }

  /* ---------------- 6. PATIENT DASHBOARD MODULE ---------------- */
  function renderPatientDashboard() {
    const p = CURRENT_PATIENT;
    const nameEl = document.getElementById("patient-name");
    const idEl = document.getElementById("patient-id");
    const avatarEl = document.getElementById("patient-avatar");
    const detailsEl = document.getElementById("patient-details");
    const aptsEl = document.getElementById("patient-appointments");
    const recordsTableBody = document.getElementById("patient-records-table-body");

    if (nameEl) nameEl.textContent = p.name;
    if (idEl) idEl.textContent = p.id;
    if (avatarEl) avatarEl.textContent = initials(p.name);

    if (detailsEl) {
      detailsEl.innerHTML = `
        <div class="vitals-row">
          <span class="vitals-label">Age / Gender</span>
          <span class="vitals-value">${p.age} yrs • ${p.sex}</span>
        </div>
        <div class="vitals-row">
          <span class="vitals-label">Blood Type</span>
          <span class="vitals-value" style="color: var(--error); display: flex; align-items: center; gap: 4px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--error); display: inline-block;"></span>
            ${p.blood}
          </span>
        </div>
        <div class="vitals-row">
          <span class="vitals-label">Contact Phone</span>
          <span class="vitals-value">${p.phone}</span>
        </div>
        <div class="vitals-row">
          <span class="vitals-label">Primary Location</span>
          <span class="vitals-value">${p.location || "Central Wing"}</span>
        </div>
      `;
    }

    if (aptsEl) {
      aptsEl.innerHTML = p.appointments.map((a) => `
        <div class="date-row">
          <div class="date-badge">
            <div class="date-badge__month">${a.month}</div>
            <div class="date-badge__day">${a.day}</div>
          </div>
          <div class="date-row__info">
            <div class="date-row__title">${a.doctor}</div>
            <div class="date-row__sub">${a.dept}</div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
            <div class="date-row__time">
              <svg width="15" height="15" style="color: var(--secondary);"><use href="#icon-clock"/></svg>
              <span>${a.time}</span>
            </div>
            <span class="badge badge--confirmed">${a.status || "Confirmed"}</span>
          </div>
        </div>
      `).join("");
    }

    if (recordsTableBody) {
      recordsTableBody.innerHTML = p.records.map((r) => `
        <tr>
          <td>
            <div style="font-weight: 600; color: var(--on-surface);">${r.label}</div>
            <div style="font-size: 0.75rem; color: var(--outline); font-family: var(--font-mono);">${r.size || "1.2 MB"} • PDF Document</div>
          </td>
          <td><span class="record-type-pill">${r.type || "Clinical Note"}</span></td>
          <td>${r.doctor}</td>
          <td style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--on-surface-variant);">${r.date}</td>
          <td style="text-align: right;">
            <button type="button" class="btn btn--secondary" style="padding: 4px 10px; font-size: 0.78rem;" onclick="alert('Downloading ${r.label} (Encrypted PDF)...')">
              <svg width="15" height="15" style="color: var(--primary);"><use href="#icon-download"/></svg>
              <span>Get</span>
            </button>
          </td>
        </tr>
      `).join("");
    }

    const downloadAllBtn = document.getElementById("download-records-btn");
    if (downloadAllBtn) {
      downloadAllBtn.addEventListener("click", () => {
        alert("Downloading complete patient medical dossier (PT-2026-0417-AllRecords.pdf)...");
      });
    }
  }

  /* ---------------- 7. CLINICAL DEPARTMENTS MODULE ---------------- */
  const deptGrid = document.getElementById("dept-grid");

  function renderDepartments() {
    if (!deptGrid) return;
    deptGrid.innerHTML = DEPARTMENTS.map((dept) => {
      const isEmergency = dept.id === "emergency";
      const iconId = DEPT_ICONS[dept.id] || "icon-cross";
      return `
        <div class="dept-card ${isEmergency ? "dept-card--emergency" : ""}" data-dept-id="${dept.id}">
          <div class="dept-icon-box">
            <svg width="28" height="28"><use href="#${iconId}"/></svg>
          </div>
          <h3 class="dept-name">${dept.name}</h3>
          <p class="dept-desc">${dept.desc}</p>
          <div class="dept-footer">
            <span class="dept-specialists">${dept.specialists} Specialists</span>
            <div class="dept-arrow">
              <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
            </div>
          </div>
        </div>
      `;
    }).join("");

    deptGrid.querySelectorAll(".dept-card").forEach((card) => {
      card.addEventListener("click", () => {
        const dId = card.dataset.deptId;
        goToPage("doctors");
        if (doctorDeptFilter) {
          doctorDeptFilter.value = dId;
          renderDoctors();
        }
      });
    });
  }

  /* ---------------- INITIALIZATION ---------------- */
  function init() {
    initDoctorDeptFilter();
    initBookingForm();
    renderDashboard();
    renderDoctors();
    renderScheduleList();
    renderPatientDashboard();
    renderDepartments();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
