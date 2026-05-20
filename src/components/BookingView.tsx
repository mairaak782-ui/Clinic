import { useState, useEffect } from "react";
import React from "react";
import { Doctor, Appointment } from "../types";
import { CLINIC_DOCTORS, CLINIC_SPECIALTIES } from "../data";
import { 
  Calendar, Clock, User, Clipboard, CheckCircle, 
  ArrowLeft, ArrowRight, Star, HeartPulse, Sparkles, Info 
} from "lucide-react";

interface BookingViewProps {
  doctorPreselectId: string | null;
  specialtyPreselect: string | null;
  onResetPreselects: () => void;
  onBookingSuccess: (booking: Appointment) => void;
  setActiveTab: (tab: string) => void;
}

export default function BookingView({ 
  doctorPreselectId, 
  specialtyPreselect, 
  onResetPreselects,
  onBookingSuccess,
  setActiveTab
}: BookingViewProps) {
  
  // Custom multi-step form progress
  const [step, setStep] = useState(1);

  // Form Fields State
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientDob, setPatientDob] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [patientNotes, setPatientNotes] = useState("");

  // Error validations
  const [errorMsg, setErrorMsg] = useState("");

  // Booking result storage back to render receipt screen
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Available sample time slots
  const timeSlots = [
    "08:30 AM", "09:15 AM", "10:00 AM", "10:45 AM", 
    "11:30 AM", "01:30 PM", "02:15 PM", "03:00 PM", 
    "03:45 PM", "04:30 PM", "05:15 PM"
  ];

  // Pick Doctor or filter dynamically when preselects are updated
  useEffect(() => {
    if (doctorPreselectId) {
      const match = CLINIC_DOCTORS.find(d => d.id === doctorPreselectId);
      if (match) {
        setSelectedDoctor(match);
        setSelectedSpecialty(match.specialty);
        setStep(2); // Jump direct to time slot picker!
      }
    } else if (specialtyPreselect) {
      setSelectedSpecialty(specialtyPreselect);
      setSelectedDoctor(null);
      setStep(1); // Stay on step 1 but filters apply
    }
  }, [doctorPreselectId, specialtyPreselect]);

  // Clean filters when leaving page
  useEffect(() => {
    return () => {
      onResetPreselects();
    };
  }, []);

  // Filter doctor list
  const filteredDoctors = selectedSpecialty 
    ? CLINIC_DOCTORS.filter(d => d.specialty === selectedSpecialty)
    : CLINIC_DOCTORS;

  // Handles navigation between steps
  const validateStep = (currentStep: number) => {
    setErrorMsg("");
    if (currentStep === 1) {
      if (!selectedDoctor) {
        return "Please select a health provider or specialty to continue.";
      }
    } else if (currentStep === 2) {
      if (!selectedDate) {
        return "Please select a clinical appointment date.";
      }
      if (!selectedTime) {
        return "Please choose an available appointment time slot.";
      }
      // Date verification: must not be in the past
      const todayDateStr = new Date().toISOString().split("T")[0];
      if (selectedDate < todayDateStr) {
        return "Appointment date cannot reside in the past. Select a current or future day.";
      }
    } else if (currentStep === 3) {
      if (!patientName.trim()) return "Patient name is required.";
      if (!patientDob) return "Patient birth date is required for therapeutic record alignment.";
      if (!patientPhone.trim()) return "Contact phone number is required.";
      if (!patientEmail.trim()) return "Notification email is required.";
      if (!visitReason.trim()) return "Please state the main symptoms or appointment reason.";
    }
    return "";
  };

  const nextStep = () => {
    const error = validateStep(step);
    if (error) {
      setErrorMsg(error);
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setErrorMsg("");
    setStep(prev => prev - 1);
  };

  // Submit & Book
  const handleBookingSubmit = () => {
    if (!selectedDoctor) return;
    
    const randomId = "CP-" + Math.floor(100000 + Math.random() * 900000);
    const appointmentObj: Appointment = {
      id: randomId,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      doctorImg: selectedDoctor.imageUrl,
      date: selectedDate,
      timeSlot: selectedTime,
      patientName,
      patientPhone,
      patientEmail,
      patientDob,
      reason: visitReason,
      notes: patientNotes,
      status: "upcoming",
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(appointmentObj);
    onBookingSuccess(appointmentObj);
    setStep(5); // Receipt state
  };

  // Clear receipt and book again
  const handleResetForm = () => {
    setStep(1);
    setSelectedDoctor(null);
    setSelectedSpecialty("");
    setSelectedDate("");
    setSelectedTime("");
    setPatientName("");
    setPatientEmail("");
    setPatientPhone("");
    setPatientDob("");
    setVisitReason("");
    setPatientNotes("");
    setConfirmedBooking(null);
    onResetPreselects();
  };

  // Format Helper
  const formatDateFriendly = (dateStr: string) => {
    const opts: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, opts);
  };

  return (
    <div className="max-w-4xl mx-auto py-4" id="booking-container-view">
      {/* Visual Booking Banner */}
      <div className="bg-blue-600 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-md relative overflow-hidden" style={{ backgroundColor: '#0f766e' }}>
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 blur-2xl rounded-full" />
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight">Clinic Appointment Portal</h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1">
              Select your preferred specialist and coordinate a consultation slot in real-time.
            </p>
          </div>
          {step < 5 && (
            <div className="bg-white/10 px-4 py-1.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider backdrop-blur-md shrink-0">
              Step {step} of 4: {
                step === 1 ? "Staff Selector" : 
                step === 2 ? "Schedule Slot" : 
                step === 3 ? "Patient Info" : "Verify Booking"
              }
            </div>
          )}
        </div>
      </div>

      {/* Progress Line */}
      {step < 5 && (
        <div className="mb-8 px-2">
          <div className="relative flex justify-between items-center">
            {/* Progress Bar background line */}
            <div className="absolute left-0 right-0 h-1 bg-slate-100 top-1/2 -translate-y-1/2 -z-10 rounded-full" />
            <div 
              className="absolute left-0 h-1 bg-blue-600 top-1/2 -translate-y-1/2 -z-10 rounded-full transition-all duration-300" 
              style={{ width: `${((step - 1) / 3) * 100}%`, backgroundColor: '#0f766e' }}
            />
            
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all duration-300 ${
                  step > num ? "bg-emerald-500 text-white" :
                  step === num ? "bg-blue-600 text-white scale-110 shadow-lg shadow-blue-100" :
                  "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                {step > num ? "✓" : num}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-2 font-mono">
            <span>Specialist</span>
            <span>Date & Time</span>
            <span>Registration</span>
            <span>Confirmation</span>
          </div>
        </div>
      )}

      {/* Error Feedback */}
      {errorMsg && (
        <div className="bg-red-50 text-red-700 text-xs p-3.5 rounded-xl border border-red-100 mb-6 flex items-center gap-2 font-medium" id="booking-error-feedback">
          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* 5. MULTI-STEP SHADOW CONTAINER */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 sm:p-8">
        
        {/* ================= STEP 1: CHOOSE DOCTOR OR SPECIALTY ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-slate-900 font-extrabold text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Select Your Care Specialist
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                Filter by clinical department or browse our resident healthcare professionals.
              </p>
            </div>

            {/* Department Specialty Filter row */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-mono">
                Department Specialty Filter
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedSpecialty("");
                    setSelectedDoctor(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                    selectedSpecialty === ""
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  All Departaments
                </button>
                {CLINIC_SPECIALTIES.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => {
                      setSelectedSpecialty(spec.id);
                      setSelectedDoctor(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                      selectedSpecialty === spec.id
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {spec.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDoctors.map((doc) => {
                const isSelected = selectedDoctor?.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setErrorMsg("");
                    }}
                    id={`select-doc-card-${doc.id}`}
                    type="button"
                    className={`text-left p-4 rounded-2xl border transition-all hover:scale-101 flex gap-4 cursor-pointer focus:outline-none ${
                      isSelected 
                        ? "bg-blue-50/50 border-blue-500 shadow-md shadow-blue-50" 
                        : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-100 shrink-0 overflow-hidden border border-slate-100">
                      <img src={doc.imageUrl} alt={doc.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h4>
                        <span className="bg-slate-100 text-slate-700 font-mono text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
                          {doc.specialty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium truncate">{doc.title}</p>
                      <div className="flex items-center gap-1.5 pt-1 text-[10px] text-slate-400 font-medium">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span className="text-amber-700 font-bold">{doc.rating}</span>
                        <span>({doc.reviews} reviews)</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected feedback indicator */}
            {selectedDoctor && (
              <div className="bg-emerald-50 text-emerald-800 text-xs py-3 px-4 rounded-xl border border-emerald-100/50 flex items-center justify-between font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Selected Provider: <strong>{selectedDoctor.name} ({selectedDoctor.specialty})</strong>
                </span>
                <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded-md uppercase font-bold text-emerald-800">
                  Confirmed
                </span>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 2: CHOOSE DAY & SLOT ================= */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-slate-900 font-extrabold text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Select Appointment Date & Time
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                Choose an available slot for <strong>{selectedDoctor?.name}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Date Select */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-mono">
                  1. Pick a Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    id="booking-date-input"
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setErrorMsg("");
                    }}
                    className="w-full bg-slate-50 hover:bg-slate-100/70 py-3.5 px-4 rounded-xl border border-slate-200 text-sm font-sans font-semibold text-slate-700 focus:outline-none focus:border-blue-500 text-center"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                {selectedDate && (
                  <div className="p-3 bg-blue-50 text-blue-800 border border-blue-100 text-xs font-semibold rounded-xl text-center">
                    🗓️ Preferred: {formatDateFriendly(selectedDate)}
                  </div>
                )}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                    Typical Hours of availability:
                  </span>
                  <p className="text-xs text-slate-600 font-medium">
                    {selectedDoctor?.availability}
                  </p>
                  <span className="text-[10px] text-blue-600 font-bold block">
                    ⚡ Recommended Next Open: {selectedDoctor?.nextSlot}
                  </span>
                </div>
              </div>

              {/* Right Column: Time Slots Grid */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-mono">
                  2. Choose an Available Time
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {timeSlots.map((ts) => {
                    const isSelectedTS = selectedTime === ts;
                    return (
                      <button
                        key={ts}
                        id={`time-slot-${ts.replace(/\s/g, '-')}`}
                        onClick={() => {
                          setSelectedTime(ts);
                          setErrorMsg("");
                        }}
                        className={`py-3 px-2 rounded-xl text-xs font-bold font-mono tracking-tight cursor-pointer border text-center transition-all ${
                          isSelectedTS
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100 scale-102"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 mx-auto mb-1 text-inherit" />
                        {ts}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PATIENT INFORMATION ================= */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-slate-900 font-extrabold text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Patient Registration & Symptoms
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                Align diagnostic records by providing your general information and visit symptoms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Emma Johnson"
                  value={patientName}
                  id="patient-name-input"
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 py-3 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={patientDob}
                  id="patient-dob-input"
                  onChange={(e) => setPatientDob(e.target.value)}
                  className="w-full bg-slate-50 py-3 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(555) 789-0123"
                  value={patientPhone}
                  id="patient-phone-input"
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full bg-slate-50 py-3 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="emma@example.com"
                  value={patientEmail}
                  id="patient-email-input"
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full bg-slate-50 py-3 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                Reason for Appointment / Symptoms
              </label>
              <textarea
                rows={3}
                placeholder="Please describe what you are feeling (e.g. persistent throat swelling, mild chest tightening during light exercise)"
                value={visitReason}
                id="patient-reason-input"
                onChange={(e) => setVisitReason(e.target.value)}
                className="w-full bg-slate-50 py-3 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                Medical History Notes (Allergies, Medications) - Optional
              </label>
              <textarea
                rows={2}
                placeholder="Penicillin allergy; taking vitamin D supplements daily."
                value={patientNotes}
                id="patient-notes-input"
                onChange={(e) => setPatientNotes(e.target.value)}
                className="w-full bg-slate-50 py-3 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 4: VERIFY BOOKING SUMMARY ================= */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-slate-900 font-extrabold text-lg flex items-center gap-2">
                <Clipboard className="w-5 h-5 text-blue-500" />
                Review & Confirm Booking Details
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                Please verify that all clinical scheduling targets match your schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
              {/* Doctor summary */}
              <div className="space-y-4">
                <h3 className="text-slate-500 text-[10px] uppercase font-mono tracking-widest font-bold">
                  Care Provider & Specialty
                </h3>
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                    <img src={selectedDoctor?.imageUrl} alt={selectedDoctor?.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{selectedDoctor?.name}</h4>
                    <span className="text-xs text-blue-600 font-semibold">{selectedDoctor?.title}</span>
                    <span className="block text-xs text-slate-400 font-medium font-mono uppercase tracking-widest mt-1">
                      {selectedDoctor?.specialty}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-200/50 pt-4 space-y-2">
                  <h3 className="text-slate-500 text-[10px] uppercase font-mono tracking-widest font-bold">
                    Target Clock & Day
                  </h3>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-4.5 h-4.5 text-blue-500" />
                    {selectedDate && formatDateFriendly(selectedDate)}
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4.5 h-4.5 text-blue-500" />
                    {selectedTime}
                  </p>
                </div>
              </div>

              {/* Patient summary */}
              <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-200/50 pt-4 md:pt-0 md:pl-6">
                <h3 className="text-slate-500 text-[10px] uppercase font-mono tracking-widest font-bold">
                  Patient Profile Demographics
                </h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">{patientName}</p>
                  <p className="text-xs">DOB: <strong>{patientDob}</strong></p>
                  <p className="text-xs">Phone: <strong>{patientPhone}</strong></p>
                  <p className="text-xs text-wrap">Email: <strong>{patientEmail}</strong></p>
                </div>

                <div className="border-t border-slate-200/50 pt-4 space-y-1.5 text-xs text-slate-600">
                  <h4 className="font-semibold text-slate-950 uppercase tracking-widest text-[9px] font-mono text-slate-400">
                    Stated Symptoms & Reason
                  </h4>
                  <p className="italic font-medium leading-relaxed bg-white border border-slate-200/60 p-2.5 rounded-lg text-slate-500">
                    "{visitReason}"
                  </p>
                  {patientNotes && (
                    <p className="text-[11px] leading-relaxed text-slate-400 mt-1">
                      Med Profile Notes: {patientNotes}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2.5 text-xs text-amber-800 leading-relaxed font-semibold">
              <span className="shrink-0 text-base">⚠️</span>
              Closing confirmation reserves the clinical cycle. If you need to cancel later, you can manage reservation state directly in your digital dashboard under the Patient Portal.
            </div>
          </div>
        )}

        {/* ================= STEP 5: BOOKING SUCCESS RECEIPT ================= */}
        {step === 5 && confirmedBooking && (
          <div className="text-center py-6 space-y-6 animate-scale-up" id="booking-success-container">
            <div className="mx-auto bg-emerald-100 p-4 rounded-full text-emerald-600 w-16 h-16 flex items-center justify-center animate-bounce shadow-md">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1.5 max-w-lg mx-auto">
              <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
                Appointment Scheduled Successfully!
              </h2>
              <p className="text-slate-600 text-sm">
                Your medical checkout is locked. A clinical reminder invitation is dispatched to your provided email: <strong>{confirmedBooking.patientEmail}</strong>.
              </p>
            </div>

            {/* Receipt Card Visual */}
            <div className="max-w-md mx-auto bg-slate-50 border border-slate-100 p-6 rounded-2xl relative shadow-inner overflow-hidden text-left">
              {/* Receipt Barcode Visual Accent */}
              <div className="absolute right-6 top-6 opacity-10 flex flex-col items-center">
                <div className="w-12 h-6 bg-slate-950 flex gap-0.5">
                  <div className="w-1 bg-white"></div>
                  <div className="w-2 bg-white"></div>
                  <div className="w-0.5 bg-white"></div>
                  <div className="w-1 bg-white"></div>
                </div>
                <span className="text-[6px] font-mono mt-0.5">MEMBER-ID</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                  <div>
                    <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-widest font-extrabold">Appointment ID</span>
                    <strong className="text-slate-900 font-mono text-sm tracking-widest">{confirmedBooking.id}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-mono text-emerald-600 font-bold block bg-emerald-100/60 px-2 py-0.5 rounded-full">
                      Clinic Authorized
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-widest font-extrabold">Specialist</span>
                  <p className="font-bold text-slate-900 text-base">{confirmedBooking.doctorName}</p>
                  <p className="text-xs text-blue-600 font-semibold leading-none">{confirmedBooking.doctorSpecialty} clinic</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-widest font-semibold">Scheduled Date</span>
                    <strong className="text-slate-800 text-xs font-semibold">{formatDateFriendly(confirmedBooking.date)}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-widest font-semibold">Time Slot</span>
                    <strong className="text-slate-800 text-xs font-mono font-extrabold">{confirmedBooking.timeSlot}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed font-medium">
                  <strong>Check-In Instructions:</strong> Proceed to suite 400. You may use our reception kiosk to check-in using the Virtual Barcode Pass found in your Digital Health Portal.
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button
                id="view-portal-appointment-btn"
                onClick={() => setActiveTab("portal")}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 px-6 rounded-xl transition-colors cursor-pointer"
              >
                Go to My Patient Portal
              </button>
              <button
                id="book-another-btn"
                onClick={handleResetForm}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs py-3 px-6 rounded-xl transition-all cursor-pointer"
              >
                Schedule Another Care
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP BUTTON CONTROLS ================= */}
        {step < 5 && (
          <div className="flex justify-between pt-6 mt-8 border-t border-slate-100">
            {step > 1 ? (
              <button
                id="booking-back-btn"
                onClick={prevStep}
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-sans font-semibold text-xs py-2.5 px-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Step
              </button>
            ) : (
              <div /> // spacer
            )}

            {step < 4 ? (
              <button
                id="booking-next-btn"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold text-xs py-2.5 px-6 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-blue-100 hover:scale-102 cursor-pointer"
              >
                Continue Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="booking-submit-confirm-btn"
                onClick={handleBookingSubmit}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs py-3 px-8 rounded-xl transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer"
                style={{ backgroundColor: '#10b981', borderRadius: '4px' }}
              >
                <CheckCircle className="w-4.5 h-4.5" />
                Confirm Clinic Appointment
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
