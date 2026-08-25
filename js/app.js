/* =========================================================
   Sanjeevani — app logic (vanilla JS, no framework/build step)
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

  /* ---------------- LOGIN ---------------- */
  const loginScreen = document.getElementById("login-screen");
  const appShell = document.getElementById("app-shell");
  const roleTabs = document.querySelectorAll(".role-tab");
  const loginForm = document.getElementById("login-form");
  const loginSubmit = document.getElementById("login-submit");
  const loginIdField = document.getElementById("login-id");
  const loginPwField = document.getElementById("login-pw");

  roleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      roleTabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      state.role = tab.dataset.role;
    });
  });

  function validateLoginField(input, errorId) {
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
    if (state.role === "doctor") return "Dr. On Duty";
    return "Staff Desk";
  }

  function enterApp() {
    loginScreen.classList.add("hidden");
    appShell.classList.remove("hidden");

    document.getElementById("sidebar-avatar").textContent = initials(roleDisplayName());
    document.getElementById("sidebar-user-name").textContent = roleDisplayName();
    document.getElementById("sidebar-user-role").textContent = roleLabel() + " portal";
    document.getElementById("topbar-hello").textContent = "Good day, " + roleLabel();

    const landing = state.role === "patient" ? "patients" : "dashboard";
    goToPage(landing);
  }

  /* ---------------- NAVIGATION ---------------- */
  const navItems = document.querySelectorAll(".nav__item");
  const pages = document.querySelectorAll(".page");
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  const drawerClose = document.getElementById("drawer-close");
  const drawerScrim = document.getElementById("drawer-scrim");

  function goToPage(pageId) {
    navItems.forEach((n) => n.classList.toggle("is-active", n.dataset.page === pageId));
    pages.forEach((p) => p.classList.toggle("is-active", p.dataset.page === pageId));
    closeDrawer();
    document.getElementById("content").scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  navItems.forEach((item) => item.addEventListener("click", () => goToPage(item.dataset.page)));
  document.querySelectorAll("[data-page-link]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      goToPage(el.dataset.pageLink);
    })
  );

  function openDrawer() { appShell.classList.add("drawer-open"); }
  function closeDrawer() { appShell.classList.remove("drawer-open"); }
  hamburger.addEventListener("click", openDrawer);
  drawerClose.addEventListener("click", closeDrawer);
  drawerScrim.addEventListener("click", closeDrawer);

  document.getElementById("signout-btn").addEventListener("click", () => {
    appShell.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    loginForm.reset();
    document.querySelectorAll(".field").forEach((f) => f.classList.remove("has-error"));
  });

  /* ---------------- TOPBAR DATE ---------------- */
  document.getElementById("topbar-date").textContent = new Date().toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  /* ---------------- DASHBOARD ---------------- */
  function renderDashboard() {
    document.getElementById("stat-doctors").textContent = DOCTORS.length;
    document.getElementById("stat-appointments").textContent = TODAY_APPOINTMENTS.length;
    document.getElementById("stat-patients").textContent = "1,284";
    document.getElementById("stat-beds").textContent = HOSPITAL_STATS.bedsAvailable;

    const body = document.getElementById("today-table-body");
    body.innerHTML = TODAY_APPOINTMENTS.map((a) => `
      <tr>
        <td>${a.time}</td>
        <td>${a.patient}</td>
        <td>${a.doctor}</td>
        <td><span class="badge badge--${a.status}">${a.status === "completed" ? "Completed" : "Upcoming"}</span></td>
      </tr>
    `).join("");
  }

  /* ---------------- DOCTORS ---------------- */
  const doctorGrid = document.getElementById("doctor-grid");
  const doctorEmpty = document.getElementById("doctor-empty");
  const doctorSearch = document.getElementById("doctor-search");
  const doctorDeptFilter = document.getElementById("doctor-dept-filter");

  function populateDeptSelects() {
    const optionsHtml = DEPARTMENTS.map((d) => `<option value="${d.id}">${d.name}</option>`).join("");
    doctorDeptFilter.insertAdjacentHTML("beforeend", optionsHtml);
    document.getElementById("book-dept").insertAdjacentHTML("beforeend", optionsHtml);
  }

  function doctorCard(doc, index) {
    return `
      <article class="doctor-card">
        <div class="doctor-card__top">
          <div class="avatar" style="background:${avatarColor(index)}">${initials(doc.name)}</div>
          <div>
            <p class="doctor-card__name">${doc.name}</p>
            <p class="doctor-card__spec">${doc.spec}</p>
          </div>
        </div>
        <span class="doctor-card__tag">${deptName(doc.dept)}</span>
        <div class="doctor-card__meta">
          <span class="doctor-card__rating"><svg width="14" height="14"><use href="#icon-star"/></svg>${doc.rating.toFixed(1)}</span>
          <span>${doc.exp} yrs experience</span>
        </div>
        <button class="btn btn--primary" data-book-doctor="${doc.id}">Book appointment</button>
      </article>
    `;
  }

  function renderDoctors() {
    const q = doctorSearch.value.trim().toLowerCase();
    const dept = doctorDeptFilter.value;
    const filtered = DOCTORS.filter((d) => {
      const matchesText = !q || d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q);
      const matchesDept = dept === "all" || d.dept === dept;
      return matchesText && matchesDept;
    });

    doctorGrid.innerHTML = filtered.map((d, i) => doctorCard(d, DOCTORS.indexOf(d))).join("");
    doctorEmpty.hidden = filtered.length > 0;
    doctorGrid.hidden = filtered.length === 0;

    doctorGrid.querySelectorAll("[data-book-doctor]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const doc = DOCTORS.find((d) => d.id === btn.dataset.bookDoctor);
        goToPage("appointments");
        switchAppointmentTab("book");
        document.getElementById("book-dept").value = doc.dept;
        populateDoctorSelect(doc.dept);
        document.getElementById("book-doctor").value = doc.id;
      });
    });
  }

  doctorSearch.addEventListener("input", renderDoctors);
  doctorDeptFilter.addEventListener("change", renderDoctors);

  /* ---------------- APPOINTMENTS: tabs ---------------- */
  const tabs = document.querySelectorAll(".tab");
  function switchAppointmentTab(tabId) {
    tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.tab === tabId));
    tabs.forEach((t) => t.setAttribute("aria-selected", t.dataset.tab === tabId));
    document.querySelectorAll(".tab-panel").forEach((p) =>
      p.classList.toggle("is-active", p.dataset.tabPanel === tabId)
    );
  }
  tabs.forEach((t) => t.addEventListener("click", () => switchAppointmentTab(t.dataset.tab)));

  /* ---------------- BOOKING FORM ---------------- */
  const bookDeptSelect = document.getElementById("book-dept");
  const bookDoctorSelect = document.getElementById("book-doctor");
  const slotGrid = document.getElementById("slot-grid");
  const bookingForm = document.getElementById("booking-form");
  const bookingConfirmation = document.getElementById("booking-confirmation");
  const dateInput = document.getElementById("book-date");

  dateInput.min = new Date().toISOString().split("T")[0];

  function populateDoctorSelect(deptId) {
    bookDoctorSelect.innerHTML = "";
    if (!deptId) {
      bookDoctorSelect.innerHTML = `<option value="">Select department first</option>`;
      return;
    }
    const options = DOCTORS.filter((d) => d.dept === deptId)
      .map((d) => `<option value="${d.id}">${d.name} — ${d.spec}</option>`)
      .join("");
    bookDoctorSelect.innerHTML = `<option value="">Select doctor</option>` + options;
  }

  bookDeptSelect.addEventListener("change", () => populateDoctorSelect(bookDeptSelect.value));

  function renderSlots() {
    slotGrid.innerHTML = TIME_SLOTS.map((s) => `
      <button type="button" class="slot-btn" data-time="${s.time}" ${s.taken ? "disabled" : ""}>${s.time}</button>
    `).join("");
    slotGrid.querySelectorAll(".slot-btn:not([disabled])").forEach((btn) => {
      btn.addEventListener("click", () => {
        slotGrid.querySelectorAll(".slot-btn").forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        state.selectedSlot = btn.dataset.time;
        document.getElementById("slot-error").parentElement.classList.remove("has-error");
      });
    });
  }

  function requireField(input) {
    const field = input.closest(".field");
    const ok = input.value.trim().length > 0;
    field.classList.toggle("has-error", !ok);
    return ok;
  }

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    bookingConfirmation.hidden = true;

    const deptOk = requireField(bookDeptSelect);
    const doctorOk = requireField(bookDoctorSelect);
    const nameOk = requireField(document.getElementById("book-name"));
    const phoneOk = requireField(document.getElementById("book-phone"));
    const dateOk = requireField(dateInput);
    const slotField = document.getElementById("slot-error").parentElement;
    const slotOk = !!state.selectedSlot;
    slotField.classList.toggle("has-error", !slotOk);

    if (!(deptOk && doctorOk && nameOk && phoneOk && dateOk && slotOk)) return;

    const doc = DOCTORS.find((d) => d.id === bookDoctorSelect.value);
    const patientName = document.getElementById("book-name").value.trim();
    const dateLabel = new Date(dateInput.value + "T00:00:00").toLocaleDateString(undefined, {
      weekday: "long", month: "long", day: "numeric",
    });

    document.getElementById("booking-confirmation-text").innerHTML =
      `<strong>Booked:</strong> ${patientName} with ${doc.name} (${deptName(doc.dept)}) on ${dateLabel} at ${state.selectedSlot}.`;
    bookingConfirmation.hidden = false;
  });

  /* ---------------- SCHEDULE TAB ---------------- */
  function dateRow(item) {
    return `
      <div class="date-row">
        <div class="date-badge">
          <span class="date-badge__day">${item.day}</span>
          <span class="date-badge__month">${item.month}</span>
        </div>
        <div class="date-row__body">
          <p class="date-row__doctor">${item.doctor}</p>
          <p class="date-row__meta">${item.dept} · ${item.patient}</p>
        </div>
        <span class="date-row__time">${item.time}</span>
      </div>
    `;
  }

  function renderSchedule() {
    document.getElementById("schedule-list").innerHTML = UPCOMING_SCHEDULE.map(dateRow).join("");
  }

  /* ---------------- PATIENTS ---------------- */
  function renderPatient() {
    const p = CURRENT_PATIENT;
    document.getElementById("patient-avatar").textContent = initials(p.name);
    document.getElementById("patient-name").textContent = p.name;
    document.getElementById("patient-id").textContent = p.id;

    document.getElementById("patient-details").innerHTML = `
      <div><dt>Age / Sex</dt><dd>${p.age} · ${p.sex}</dd></div>
      <div><dt>Blood group</dt><dd>${p.blood}</dd></div>
      <div><dt>Phone</dt><dd>${p.phone}</dd></div>
      <div><dt>Last visit</dt><dd>${p.lastVisit}</dd></div>
    `;

    document.getElementById("patient-appointments").innerHTML = p.appointments.map(dateRow).join("");

    document.getElementById("patient-records").innerHTML = p.records.map((r) => `
      <li>
        <div>
          <p class="record-label">${r.label}</p>
          <p class="record-meta">${r.doctor}</p>
        </div>
        <span class="record-date">${r.date}</span>
      </li>
    `).join("");
  }

  /* ---------------- DEPARTMENTS ---------------- */
  function renderDepartments() {
    document.getElementById("dept-grid").innerHTML = DEPARTMENTS.map((d) => `
      <article class="dept-card">
        <div class="dept-card__icon"><svg width="22" height="22"><use href="#${d.icon}"/></svg></div>
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <span class="dept-card__count">${d.specialists} specialists</span>
      </article>
    `).join("");
  }

  /* ---------------- INIT ---------------- */
  populateDeptSelects();
  renderDashboard();
  renderDoctors();
  renderSlots();
  renderSchedule();
  renderPatient();
  renderDepartments();
})();
