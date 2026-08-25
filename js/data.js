/* =========================================================
   Sanjeevani — mock data (no backend, per brief)
========================================================= */

const DEPARTMENTS = [
  { id: "cardiology",   name: "Cardiology",           icon: "icon-heart",       specialists: 9,  desc: "Heart rhythm, blood pressure, and long-term cardiac care." },
  { id: "neurology",    name: "Neurology",            icon: "icon-brain",       specialists: 6,  desc: "Brain, spine, and nervous-system conditions." },
  { id: "orthopedics",  name: "Orthopedics",          icon: "icon-bone",        specialists: 8,  desc: "Bones, joints, ligaments, and sports injuries." },
  { id: "pediatrics",   name: "Pediatrics",           icon: "icon-baby",        specialists: 7,  desc: "Care for infants, children, and adolescents." },
  { id: "general",      name: "General Medicine",     icon: "icon-stethoscope", specialists: 12, desc: "Everyday illness, checkups, and referrals." },
  { id: "dermatology",  name: "Dermatology",          icon: "icon-droplet",     specialists: 5,  desc: "Skin, hair, and nail conditions." },
  { id: "ent",          name: "ENT",                  icon: "icon-ear",         specialists: 4,  desc: "Ear, nose, and throat treatment." },
  { id: "emergency",    name: "Emergency & Trauma",   icon: "icon-cross",       specialists: 11, desc: "24/7 critical and trauma care, no appointment needed." },
];

const DOCTORS = [
  { id: "d1",  name: "Dr. Ananya Rao",       dept: "cardiology",  spec: "Interventional Cardiologist", rating: 4.9, exp: 14 },
  { id: "d2",  name: "Dr. Vikram Shah",      dept: "cardiology",  spec: "Cardiac Electrophysiologist",  rating: 4.7, exp: 11 },
  { id: "d3",  name: "Dr. Meera Iyer",       dept: "neurology",   spec: "Neurologist",                  rating: 4.8, exp: 16 },
  { id: "d4",  name: "Dr. Rohan Kapoor",     dept: "neurology",   spec: "Neurosurgeon",                 rating: 4.6, exp: 13 },
  { id: "d5",  name: "Dr. Priya Nair",       dept: "orthopedics", spec: "Orthopedic Surgeon",           rating: 4.9, exp: 10 },
  { id: "d6",  name: "Dr. Arjun Mehta",      dept: "orthopedics", spec: "Sports Medicine Specialist",   rating: 4.5, exp: 8  },
  { id: "d7",  name: "Dr. Kavya Reddy",      dept: "pediatrics",  spec: "Pediatrician",                 rating: 4.9, exp: 12 },
  { id: "d8",  name: "Dr. Sana Malhotra",    dept: "general",     spec: "General Physician",            rating: 4.6, exp: 9  },
  { id: "d9",  name: "Dr. Karan Chawla",     dept: "general",     spec: "Family Medicine",              rating: 4.4, exp: 6  },
  { id: "d10", name: "Dr. Ishita Bose",      dept: "dermatology", spec: "Dermatologist",                rating: 4.7, exp: 7  },
  { id: "d11", name: "Dr. Farhan Sheikh",    dept: "ent",         spec: "ENT Surgeon",                  rating: 4.5, exp: 15 },
  { id: "d12", name: "Dr. Naveen Pillai",    dept: "emergency",   spec: "Trauma & Emergency Medicine",  rating: 4.8, exp: 10 },
];

const AVATAR_COLORS = ["#10454F", "#1B6E76", "#2A9D8F", "#5B8FBF", "#8A6D9C"];

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
  { time: "09:00 AM", patient: "Rahul Sen",       doctor: "Dr. Ananya Rao",   status: "completed" },
  { time: "09:30 AM", patient: "Divya Krishnan",  doctor: "Dr. Meera Iyer",   status: "completed" },
  { time: "10:30 AM", patient: "Aman Verma",      doctor: "Dr. Priya Nair",   status: "completed" },
  { time: "11:30 AM", patient: "Sneha Patil",     doctor: "Dr. Sana Malhotra",status: "upcoming"  },
  { time: "02:00 PM", patient: "Imran Qureshi",   doctor: "Dr. Kavya Reddy",  status: "upcoming"  },
  { time: "03:00 PM", patient: "Ritu Desai",      doctor: "Dr. Ishita Bose",  status: "upcoming"  },
  { time: "04:00 PM", patient: "Karthik Iyer",    doctor: "Dr. Vikram Shah",  status: "upcoming"  },
];

const UPCOMING_SCHEDULE = [
  { day: "26", month: "Aug", doctor: "Dr. Ananya Rao",  dept: "Cardiology",  patient: "Aditi Rao",      time: "09:30 AM" },
  { day: "27", month: "Aug", doctor: "Dr. Rohan Kapoor",dept: "Neurology",   patient: "Suresh Nambiar", time: "11:00 AM" },
  { day: "28", month: "Aug", doctor: "Dr. Priya Nair",  dept: "Orthopedics", patient: "Neha Joshi",     time: "02:30 PM" },
  { day: "29", month: "Aug", doctor: "Dr. Kavya Reddy", dept: "Pediatrics",  patient: "Master Aryan",   time: "10:00 AM" },
  { day: "01", month: "Sep", doctor: "Dr. Ishita Bose", dept: "Dermatology", patient: "Pooja Hegde",    time: "04:00 PM" },
];

const CURRENT_PATIENT = {
  name: "Ananya Kulkarni",
  id: "PT-2026-0417",
  age: 34,
  sex: "Female",
  blood: "B+",
  phone: "+91 98765 43210",
  lastVisit: "12 Aug 2026",
  appointments: [
    { day: "27", month: "Aug", doctor: "Dr. Ananya Rao", dept: "Cardiology", patient: "Ananya Kulkarni", time: "10:30 AM" },
    { day: "09", month: "Sep", doctor: "Dr. Sana Malhotra", dept: "General Medicine", patient: "Ananya Kulkarni", time: "09:00 AM" },
  ],
  records: [
    { label: "Annual health checkup", doctor: "Dr. Sana Malhotra", date: "12 Aug 2026" },
    { label: "ECG & lipid profile",   doctor: "Dr. Ananya Rao",    date: "03 Jun 2026" },
    { label: "Skin allergy consult",  doctor: "Dr. Ishita Bose",   date: "21 Feb 2026" },
    { label: "Flu & fever treatment", doctor: "Dr. Karan Chawla",  date: "14 Nov 2025" },
  ],
};

const HOSPITAL_STATS = {
  bedsAvailable: 47,
};
