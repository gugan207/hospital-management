/* =========================================================
   Sanjeevani — mock data (no backend, per brief)
========================================================= */

const DEPARTMENTS = [
  { id: "cardiology",   name: "Cardiology",           icon: "favorite",        specialists: 9,  desc: "Heart rhythm, blood pressure, and long-term cardiovascular care.", color: "#006A60" },
  { id: "neurology",    name: "Neurology",            icon: "psychology",      specialists: 6,  desc: "Brain, spine, and complex central nervous-system conditions.", color: "#10454F" },
  { id: "orthopedics",  name: "Orthopedics",          icon: "accessibility_new", specialists: 8,  desc: "Bones, joints, ligaments, and sports injuries rehabilitation.", color: "#1B6E76" },
  { id: "pediatrics",   name: "Pediatrics",           icon: "child_care",      specialists: 7,  desc: "Compassionate care for infants, children, and adolescents.", color: "#2A9D8F" },
  { id: "general",      name: "General Medicine",     icon: "stethoscope",     specialists: 12, desc: "Primary health, chronic disease management, and checkups.", color: "#006A60" },
  { id: "dermatology",  name: "Dermatology",          icon: "dermatology",     specialists: 5,  desc: "Diagnosis and therapy for skin, hair, and nail conditions.", color: "#1B6E76" },
  { id: "ent",          name: "ENT",                  icon: "hearing",         specialists: 4,  desc: "Otolaryngology care for ear, nose, throat, head and neck.", color: "#10454F" },
  { id: "emergency",    name: "Emergency & Trauma",   icon: "emergency",       specialists: 11, desc: "24/7 critical, ICU, and trauma care with rapid response.", color: "#E76F51" },
];

const DOCTORS = [
  { id: "d1",  name: "Dr. Ananya Rao",       dept: "cardiology",  spec: "Interventional Cardiologist", rating: 4.9, reviews: 142, exp: 14 },
  { id: "d2",  name: "Dr. Vikram Shah",      dept: "cardiology",  spec: "Cardiac Electrophysiologist",  rating: 4.7, reviews: 98,  exp: 11 },
  { id: "d3",  name: "Dr. Meera Iyer",       dept: "neurology",   spec: "Consultant Neurologist",       rating: 4.8, reviews: 116, exp: 16 },
  { id: "d4",  name: "Dr. Rohan Kapoor",     dept: "neurology",   spec: "Neurosurgeon",                 rating: 4.6, reviews: 84,  exp: 13 },
  { id: "d5",  name: "Dr. Priya Nair",       dept: "orthopedics", spec: "Orthopedic Surgeon",           rating: 4.9, reviews: 210, exp: 10 },
  { id: "d6",  name: "Dr. Arjun Mehta",      dept: "orthopedics", spec: "Sports Medicine Specialist",   rating: 4.5, reviews: 76,  exp: 8  },
  { id: "d7",  name: "Dr. Kavya Reddy",      dept: "pediatrics",  spec: "Senior Pediatrician",          rating: 4.9, reviews: 189, exp: 12 },
  { id: "d8",  name: "Dr. Sana Malhotra",    dept: "general",     spec: "General Physician",            rating: 4.6, reviews: 92,  exp: 9  },
  { id: "d9",  name: "Dr. Karan Chawla",     dept: "general",     spec: "Family Medicine Specialist",   rating: 4.4, reviews: 63,  exp: 6  },
  { id: "d10", name: "Dr. Ishita Bose",      dept: "dermatology", spec: "Consultant Dermatologist",     rating: 4.7, reviews: 104, exp: 7  },
  { id: "d11", name: "Dr. Farhan Sheikh",    dept: "ent",         spec: "ENT Surgeon",                  rating: 4.5, reviews: 88,  exp: 15 },
  { id: "d12", name: "Dr. Naveen Pillai",    dept: "emergency",   spec: "Trauma & Critical Care Lead",  rating: 4.8, reviews: 155, exp: 10 },
];

const AVATAR_COLORS = ["#10454F", "#1B6E76", "#2A9D8F", "#366570", "#006A60"];

const TIME_SLOTS = [
  { time: "09:00 AM", taken: false },
  { time: "09:30 AM", taken: true  },
  { time: "10:00 AM", taken: false },
  { time: "10:30 AM", taken: false },
  { time: "11:00 AM", taken: true  },
  { time: "11:30 AM", taken: false },
  { time: "02:00 PM", taken: false },
  { time: "02:30 PM", taken: false },
  { time: "03:00 PM", taken: true  },
  { time: "03:30 PM", taken: false },
  { time: "04:00 PM", taken: false },
  { time: "04:30 PM", taken: false },
];

const TODAY_APPOINTMENTS = [
  { time: "09:00 AM", patient: "Rahul Sen",       doctor: "Dr. Ananya Rao",   status: "completed",  dept: "Cardiology" },
  { time: "09:30 AM", patient: "Divya Krishnan",  doctor: "Dr. Meera Iyer",   status: "in-progress",dept: "Neurology" },
  { time: "10:30 AM", patient: "Aman Verma",      doctor: "Dr. Priya Nair",   status: "completed",  dept: "Orthopedics" },
  { time: "11:30 AM", patient: "Sneha Patil",     doctor: "Dr. Sana Malhotra",status: "upcoming",   dept: "General Medicine" },
  { time: "02:00 PM", patient: "Imran Qureshi",   doctor: "Dr. Kavya Reddy",  status: "upcoming",   dept: "Pediatrics" },
  { time: "03:00 PM", patient: "Ritu Desai",      doctor: "Dr. Ishita Bose",  status: "upcoming",   dept: "Dermatology" },
  { time: "04:00 PM", patient: "Karthik Iyer",    doctor: "Dr. Vikram Shah",  status: "upcoming",   dept: "Cardiology" },
];

const UPCOMING_SCHEDULE = [
  { day: "26", month: "Aug", doctor: "Dr. Ananya Rao",  dept: "Cardiology",  patient: "Aditi Rao",      time: "09:30 AM", status: "Confirmed" },
  { day: "27", month: "Aug", doctor: "Dr. Rohan Kapoor",dept: "Neurology",   patient: "Suresh Nambiar", time: "11:00 AM", status: "Scheduled" },
  { day: "28", month: "Aug", doctor: "Dr. Priya Nair",  dept: "Orthopedics", patient: "Neha Joshi",     time: "02:30 PM", status: "Confirmed" },
  { day: "29", month: "Aug", doctor: "Dr. Kavya Reddy", dept: "Pediatrics",  patient: "Master Aryan",   time: "10:00 AM", status: "Confirmed" },
  { day: "01", month: "Sep", doctor: "Dr. Ishita Bose", dept: "Dermatology", patient: "Pooja Hegde",    time: "04:00 PM", status: "Scheduled" },
];

const CURRENT_PATIENT = {
  name: "Ananya Kulkarni",
  id: "PT-2026-0417",
  age: 34,
  sex: "Female",
  blood: "B+ Positive",
  phone: "+91 98765 43210",
  location: "Indiranagar, BLR",
  lastVisit: "12 Aug 2026",
  lastDoctor: "Dr. Ananya Rao • Cardiology",
  appointments: [
    { day: "27", month: "Aug", doctor: "Dr. Ananya Rao", dept: "Cardiology", patient: "Ananya Kulkarni", time: "10:30 AM", status: "Confirmed" },
    { day: "09", month: "Sep", doctor: "Dr. Sana Malhotra", dept: "General Medicine", patient: "Ananya Kulkarni", time: "09:00 AM", status: "Scheduled" },
  ],
  records: [
    { label: "Annual Health Assessment & Lipid Profile", type: "Lab Report", doctor: "Dr. Sana Malhotra", date: "12 Aug 2026", size: "2.4 MB" },
    { label: "12-Lead Resting ECG & Echocardiogram",     type: "Scan Report", doctor: "Dr. Ananya Rao",    date: "03 Jun 2026", size: "4.8 MB" },
    { label: "Skin Patch Allergy Consultation Notes",    type: "Clinical Note", doctor: "Dr. Ishita Bose", date: "21 Feb 2026", size: "1.1 MB" },
    { label: "Post-Viral Recovery Prescription",        type: "Prescription", doctor: "Dr. Karan Chawla", date: "14 Nov 2025", size: "0.8 MB" },
  ],
};

const HOSPITAL_STATS = {
  bedsAvailable: 47,
  icuAvailable: 6,
  scheduledToday: 24,
  cancellations: 3,
};
