import { useState, useEffect } from "react";
import { Appointment, PatientProfile } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import BookingView from "./components/BookingView";
import TriageView from "./components/TriageView";
import BlogView from "./components/BlogView";
import PortalView from "./components/PortalView";

// Key definitions for local storage sync
const APPOINTMENTS_STORAGE_KEY = "carepoint_appointments";
const PROFILE_STORAGE_KEY = "carepoint_patient_profile";

// Helpful default historical visits so the patient portal displays realistic EHR audits
const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: "CP-402891",
    doctorId: "doc-3",
    doctorName: "Dr. Sarah Lin",
    doctorSpecialty: "General Medicine",
    doctorImg: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400",
    date: "2026-02-15",
    timeSlot: "10:30 AM",
    patientName: "Emma Johnson",
    patientPhone: "(555) 789-0123",
    patientEmail: "emma@example.com",
    patientDob: "1994-08-20",
    reason: "Annual Comprehensive Metabolic Physical Exam",
    notes: "No active ailments reported. Advised typical daily vitamin D checks.",
    status: "completed",
    createdAt: "2026-02-10T09:00:00.000Z"
  },
  {
    id: "CP-104921",
    doctorId: "doc-5",
    doctorName: "Dr. Clara Wu",
    doctorSpecialty: "Dermatology",
    doctorImg: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400",
    date: "2026-03-24",
    timeSlot: "02:15 PM",
    patientName: "Emma Johnson",
    patientPhone: "(555) 789-0123",
    patientEmail: "emma@example.com",
    patientDob: "1994-08-20",
    reason: "Eczema flare review on right wrist area",
    notes: "Prescribed pure ceramide healing moisture lock barrier blocks.",
    status: "completed",
    createdAt: "2026-03-20T11:30:00.000Z"
  }
];

const DEFAULT_PROFILE: PatientProfile = {
  name: "Emma Johnson",
  dob: "1994-08-20",
  email: "emma.johnson@example.com",
  phone: "(555) 789-0123",
  bloodType: "O+",
  allergies: ["Peanuts", "Penicillin"],
  medications: ["Albuterol Inhaler (PRN)", "Vitamin D3"],
  emergencyContact: {
    name: "John Johnson",
    relationship: "Spouse",
    phone: "(555) 120-1925"
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");

  // Pre-selection states when routed from Home or AI Triage advisor
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);
  const [preselectedSpecialty, setPreselectedSpecialty] = useState<string | null>(null);

  // Unified appointments lists loaded from client caches
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<PatientProfile>(DEFAULT_PROFILE);

  // Sync client databases on startup
  useEffect(() => {
    try {
      const cachedAppts = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (cachedAppts) {
        setAppointments(JSON.parse(cachedAppts));
      } else {
        // Hydrate with historical medical reports
        setAppointments(DEFAULT_APPOINTMENTS);
        localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(DEFAULT_APPOINTMENTS));
      }

      const cachedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (cachedProfile) {
        setProfile(JSON.parse(cachedProfile));
      } else {
        setProfile(DEFAULT_PROFILE);
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
      }
    } catch (e) {
      console.warn("Could not load client database. Check browser support.", e);
    }
  }, []);

  // Save actions
  const handleBookingSuccess = (newBooking: Appointment) => {
    const updated = [newBooking, ...appointments];
    setAppointments(updated);
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.map(appt => {
      if (appt.id === id) {
        return { ...appt, status: "cancelled" as const };
      }
      return appt;
    });
    setAppointments(updated);
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleRescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    const updated = appointments.map(appt => {
      if (appt.id === id) {
        return { ...appt, date: newDate, timeSlot: newTime };
      }
      return appt;
    });
    setAppointments(updated);
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleUpdateProfile = (updated: PatientProfile) => {
    setProfile(updated);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleResetPreselects = () => {
    setPreselectedDoctorId(null);
    setPreselectedSpecialty(null);
  };

  // Safe routing callback when symptoms matched via AI
  const handleTriageMatchDepartment = (matchedDept: string) => {
    // Translate standard department descriptive terms into key clinic specialty IDs
    let specialtyKey = "General Medicine";
    const mapped = matchedDept.toLowerCase();

    if (mapped.includes("cardio")) specialtyKey = "Cardiology";
    if (mapped.includes("pediatric")) specialtyKey = "Pediatrics";
    if (mapped.includes("ortho")) specialtyKey = "Orthopedics";
    if (mapped.includes("derm")) specialtyKey = "Dermatology";
    if (mapped.includes("neuro")) specialtyKey = "Neurology";
    if (mapped.includes("ob-gyn") || mapped.includes("obstetrics")) specialtyKey = "OB-GYN";

    setPreselectedSpecialty(specialtyKey);
    setPreselectedDoctorId(null);
  };

  // Quick action from Header book button triggers
  const handleOpenQuickBooking = () => {
    setPreselectedDoctorId(null);
    setPreselectedSpecialty(null);
    setActiveTab("booking");
  };

  // Formatted scroll window helper
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between font-sans text-slate-700 antialiased selection:bg-blue-100 selection:text-blue-900 leading-normal">
      
      {/* Clinic Header Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenBooking={handleOpenQuickBooking} 
      />

      {/* Main viewport canvas */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === "home" && (
          <HomeView 
            setActiveTab={setActiveTab}
            setSelectedDoctorId={setPreselectedDoctorId}
            setSelectedSpecialty={setPreselectedSpecialty}
          />
        )}

        {activeTab === "booking" && (
          <BookingView 
            doctorPreselectId={preselectedDoctorId}
            specialtyPreselect={preselectedSpecialty}
            onResetPreselects={handleResetPreselects}
            onBookingSuccess={handleBookingSuccess}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "triage" && (
          <TriageView 
            onTriageMatchDepartment={handleTriageMatchDepartment}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "blog" && (
          <BlogView />
        )}

        {activeTab === "portal" && (
          <PortalView 
            appointments={appointments}
            onCancelAppointment={handleCancelAppointment}
            onRescheduleAppointment={handleRescheduleAppointment}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            setActiveTab={setActiveTab}
          />
        )}

      </main>

      {/* Clinic Footer area and Emergency Policy disclaimer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
