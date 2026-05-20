import { useState } from "react";
import React from "react";
import { Appointment, PatientProfile } from "../types";
import { 
  User, Calendar, Clock, Edit2, Shield, Plus, 
  Trash2, Award, Printer, HeartPulse, RefreshCw, 
  X, Check, Eye 
} from "lucide-react";

interface PortalViewProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string, newDate: string, newTime: string) => void;
  profile: PatientProfile;
  onUpdateProfile: (updated: PatientProfile) => void;
  setActiveTab: (tab: string) => void;
}

export default function PortalView({ 
  appointments, 
  onCancelAppointment, 
  onRescheduleAppointment,
  profile,
  onUpdateProfile,
  setActiveTab
}: PortalViewProps) {
  
  // Profile edit toggle
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Local states for editing fields
  const [editedName, setEditedName] = useState(profile.name);
  const [editedDob, setEditedDob] = useState(profile.dob);
  const [editedEmail, setEditedEmail] = useState(profile.email);
  const [editedPhone, setEditedPhone] = useState(profile.phone);
  const [editedBlood, setEditedBlood] = useState(profile.bloodType);
  const [allergyDraft, setAllergyDraft] = useState("");
  const [allergiesList, setAllergiesList] = useState<string[]>(profile.allergies);
  const [medDraft, setMedDraft] = useState("");
  const [medsList, setMedsList] = useState<string[]>(profile.medications);
  const [editedContactName, setEditedContactName] = useState(profile.emergencyContact.name);
  const [editedContactRelation, setEditedContactRelation] = useState(profile.emergencyContact.relationship);
  const [editedContactPhone, setEditedContactPhone] = useState(profile.emergencyContact.phone);

  // Rescheduling state manager
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState("");
  const [newRescheduleTime, setNewRescheduleTime] = useState("");

  const activeAppts = appointments.filter(a => a.status === "upcoming");
  const completedOrCancelledAppts = appointments.filter(a => a.status !== "upcoming");

  // Save profile updates
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PatientProfile = {
      name: editedName,
      dob: editedDob,
      email: editedEmail,
      phone: editedPhone,
      bloodType: editedBlood,
      allergies: allergiesList,
      medications: medsList,
      emergencyContact: {
        name: editedContactName,
        relationship: editedContactRelation,
        phone: editedContactPhone
      }
    };
    onUpdateProfile(updated);
    setIsEditingProfile(false);
  };

  // Allergy / Med tags additions
  const addAllergy = () => {
    if (allergyDraft.trim() && !allergiesList.includes(allergyDraft.trim())) {
      setAllergiesList([...allergiesList, allergyDraft.trim()]);
      setAllergyDraft("");
    }
  };

  const removeAllergy = (index: number) => {
    setAllergiesList(allergiesList.filter((_, i) => i !== index));
  };

  const addMed = () => {
    if (medDraft.trim() && !medsList.includes(medDraft.trim())) {
      setMedsList([...medsList, medDraft.trim()]);
      setMedDraft("");
    }
  };

  const removeMed = (index: number) => {
    setMedsList(medsList.filter((_, i) => i !== index));
  };

  // Reschedule submission
  const handleRescheduleSubmit = (apptId: string) => {
    if (!newRescheduleDate || !newRescheduleTime) return;
    onRescheduleAppointment(apptId, newRescheduleDate, newRescheduleTime);
    setReschedulingId(null);
    setNewRescheduleDate("");
    setNewRescheduleTime("");
  };

  return (
    <div className="space-y-12 py-4 animate-fade-in" id="portal-view-container">
      
      {/* 2. OVERALL GRID FOR PASS & UPCOMING */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left column (Digital Clinic Pass card + Emergency Contacts) */}
        <div className="space-y-6">
          <div className="border border-slate-100 bg-white p-5 rounded-3xl shadow-sm text-center">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mb-4 text-left">
              Clinic Quick Identification Pass
            </h3>
            
            {/* Health Pass Visual */}
            <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-2xl p-5 text-white relative shadow-lg text-left overflow-hidden border border-slate-800">
              <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 blur-xl rounded-full" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-widest leading-none">CarePass member</span>
                  <span className="font-extrabold text-sm tracking-tight font-sans mt-1 block">CarePoint Medical</span>
                </div>
                <div className="bg-blue-600/90 text-white p-1.5 rounded-lg shrink-0">
                  <HeartPulse className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <p className="font-extrabold text-base tracking-tight leading-normal truncate">
                  {profile.name}
                </p>
                <div className="flex justify-between gap-4">
                  <div>
                    <span className="text-[8px] text-slate-400 uppercase font-mono tracking-widest leading-none font-semibold">Born</span>
                    <p className="text-xs font-semibold text-slate-200 mt-0.5">{profile.dob || "Unspecified"}</p>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 uppercase font-mono tracking-widest leading-none font-semibold">Blood type</span>
                    <p className="text-xs font-bold text-blue-400 mt-0.5">{profile.bloodType || "O+"}</p>
                  </div>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="border-t border-slate-700/60 pt-4 mt-5 flex justify-between items-center bg-black/10 p-3 rounded-xl border border-white/5">
                <div className="space-y-0.5">
                  <span className="text-[7px] text-slate-400 uppercase tracking-widest block leading-none font-mono">Record ID</span>
                  <strong className="text-xs font-mono tracking-wider font-bold text-indigo-300">CP-PAT-78219</strong>
                </div>
                <div className="flex flex-col items-center shrink-0">
                  {/* Visual simulated Barcode barcode */}
                  <div className="flex gap-0.5 bg-white p-1 rounded-sm w-16 h-8 items-center justify-center">
                    <div className="w-0.5 h-full bg-slate-950"></div>
                    <div className="w-1 h-full bg-slate-950"></div>
                    <div className="w-0.5 h-full bg-slate-950"></div>
                    <div className="w-1.5 h-full bg-slate-950"></div>
                    <div className="w-0.5 h-full bg-slate-950"></div>
                    <div className="w-1 h-full bg-slate-950"></div>
                    <div className="w-0.5 h-full bg-slate-950"></div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed font-semibold mt-3">
              Scan your virtual pass at the reception kiosk to check-in instantly, bypass queries, and sit back in comfort lobby.
            </p>
            <button
              onClick={() => alert("Digital Member Check-In sheet generated. Saving to dashboard print caches.")}
              className="mt-4 w-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 py-2 rounded-xl text-xs font-bold justify-center flex items-center gap-1.5 cursor-pointer"
              id="printPassBtn"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              Download Printable Pass
            </button>
          </div>

          {/* Emergency medical contact summary block */}
          <div className="border border-slate-100 bg-white p-5 rounded-3xl shadow-sm space-y-3.5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
              Clinical Emergency Contacts
            </h3>
            
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 text-slate-700">
              <span className="text-[9px] uppercase font-mono text-rose-500 block font-bold">Emergency Contact Name</span>
              <p className="font-bold text-rose-950 text-sm mt-0.5">{profile.emergencyContact.name}</p>
              <p className="text-xs text-rose-800 font-medium">relationship: <strong>{profile.emergencyContact.relationship}</strong></p>
              <div className="border-t border-rose-200/50 pt-2 mt-2 flex justify-between items-center text-xs font-mono font-bold text-rose-950">
                <span>Immediate Call:</span>
                <span>{profile.emergencyContact.phone}</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-2xl text-[10.5px] text-slate-500 leading-relaxed">
              *Emergency files are compiled in CarePoint registries. If edits are made below, they map directly into the clinic's local Electronic Health Records (EHR).
            </div>
          </div>
        </div>

        {/* Right Columns: Upcoming & Historic Appointment lists */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-slate-100 bg-white p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-slate-900 font-extrabold text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  My Scheduled Appointments
                </h2>
                <p className="text-slate-500 text-xs mt-0.5">
                  Manage timing details or remove registered care slots here.
                </p>
              </div>
              <button
                id="portal-new-booking-btn"
                onClick={() => setActiveTab("booking")}
                className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold text-xs py-2 px-3.5 rounded-xl border border-blue-100 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Book New
              </button>
            </div>

            {/* Upcoming List */}
            <div className="space-y-4">
              {activeAppts.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100/70 py-12" id="no-appointments-feedback">
                  <span className="text-2xl block mb-2">🗓️</span>
                  <h4 className="font-bold text-slate-800 text-sm">No Upcoming Appointments Currently</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    You have not registered any care slots yet. Search clinical departments or pick a resident healer down on the Home dashboard.
                  </p>
                  <button
                    id="find-doctor-empty-state-btn"
                    onClick={() => setActiveTab("booking")}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-5 rounded-lg transition-all"
                  >
                    Find a Doctor Now
                  </button>
                </div>
              ) : (
                activeAppts.map((appt) => {
                  const isReschedulingThis = reschedulingId === appt.id;
                  return (
                    <div 
                      key={appt.id}
                      className="border border-slate-100 hover:border-slate-200 hover:shadow-sm p-4 rounded-2xl bg-white transition-all space-y-4"
                      id={`appt-row-${appt.id}`}
                    >
                      {/* Top bar info */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                            <img src={appt.doctorImg} alt={appt.doctorName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{appt.doctorName}</h4>
                            <span className="text-xs text-blue-600 font-semibold">{appt.doctorSpecialty} department</span>
                          </div>
                        </div>
                        <div className="text-right flex flex-row sm:flex-col gap-2 sm:gap-0 font-medium">
                          <span className="text-[10px] text-slate-400 block font-mono">Reference NO.</span>
                          <span className="font-mono text-xs font-black text-slate-800">{appt.id}</span>
                        </div>
                      </div>

                      {/* Diagnostic schedule coordinates */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-600">
                        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                          <span>Date: <strong className="text-slate-900">{appt.date}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                          <span>Time: <strong className="text-slate-900">{appt.timeSlot}</strong></span>
                        </div>
                      </div>

                      {/* Symptoms reason */}
                      <div className="text-xs leading-relaxed text-slate-500 pl-1 p-2 bg-slate-50/50 rounded-lg">
                        Reason for Visit: <strong>"{appt.reason}"</strong>
                      </div>

                      {/* Action Triggers */}
                      <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
                        <div className="flex gap-2">
                          <button
                            id={`reschedule-btn-${appt.id}`}
                            onClick={() => {
                              setReschedulingId(isReschedulingThis ? null : appt.id);
                              setNewRescheduleDate(appt.date);
                              setNewRescheduleTime(appt.timeSlot);
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2 px-3.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                            Reschedule
                          </button>
                          <button
                            id={`cancel-btn-${appt.id}`}
                            onClick={() => {
                              if (confirm("Are you sure you want to cancel this appointment slot?")) {
                                onCancelAppointment(appt.id);
                              }
                            }}
                            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold text-xs py-2 px-3.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            Cancel Appointment
                          </button>
                        </div>
                        <span className="text-[10px] uppercase font-mono bg-blue-100/60 text-blue-800 font-bold px-2.5 py-1 rounded-full border border-blue-100">
                          Confirmed Slot
                        </span>
                      </div>

                      {/* Rescheduling Panel inside Row */}
                      {isReschedulingThis && (
                        <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 space-y-4 animate-scale-up" id="reschedule-form-block">
                          <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                            Coordinate Reschedulings for {appt.id}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase font-mono block">New Date</label>
                              <input 
                                type="date" 
                                value={newRescheduleDate}
                                id="new-reschedule-date"
                                onChange={(e) => setNewRescheduleDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full bg-white border border-slate-200 py-1.5 px-2.5 rounded-lg text-xs font-semibold focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase font-mono block">New Time Slot</label>
                              <select 
                                value={newRescheduleTime}
                                id="new-reschedule-time-picker"
                                onChange={(e) => setNewRescheduleTime(e.target.value)}
                                className="w-full bg-white border border-slate-200 py-1.5 px-2.5 rounded-lg text-xs font-semibold focus:outline-none"
                              >
                                {["08:30 AM", "09:15 AM", "10:00 AM", "10:45 AM", "11:30 AM", "01:30 PM", "02:15 PM", "03:00 PM", "04:30 PM"].map((t) => (
                                  <option key={t} value={t}>{t}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 text-xs pt-1">
                            <button
                              id="cancel-reschedule-action-btn"
                              onClick={() => setReschedulingId(null)}
                              className="bg-white border border-slate-200 py-1 px-3 rounded-lg text-slate-700 font-semibold"
                            >
                              Cancel
                            </button>
                            <button
                              id="confirm-reschedule-action-btn"
                              onClick={() => handleRescheduleSubmit(appt.id)}
                              className="bg-blue-600 text-white py-1 px-4 rounded-lg font-bold hover:bg-blue-700"
                            >
                              Save New Time
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Past visit history */}
          {completedOrCancelledAppts.length > 0 && (
            <div className="border border-slate-100 bg-white p-5 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                Historic clinic Log & Record Amendments
              </h3>
              <div className="space-y-3">
                {completedOrCancelledAppts.map((past) => (
                  <div key={past.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl text-xs font-medium">
                    <div>
                      <h4 className="font-bold text-slate-850 text-xs text-slate-800">{past.doctorName}</h4>
                      <p className="text-[10px] text-slate-500">{past.date} • {past.timeSlot}</p>
                    </div>
                    <div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest font-mono ${
                        past.status === "completed" 
                          ? "bg-slate-200 text-slate-700" 
                          : "bg-rose-100 text-rose-800"
                      }`}>
                        {past.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. PATIENT REGISTRATION CARD DETAIL EDITING */}
      <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="text-slate-900 font-extrabold text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              Patient Electronic Health Records (EHR) Profile
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Edit personal medical profiles and register immediate allergy warning items.
            </p>
          </div>
          {!isEditingProfile && (
            <button
              id="edit-profile-trigger-btn"
              onClick={() => setIsEditingProfile(true)}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 font-semibold text-xs py-2 px-4 rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
              Edit Registry Profile
            </button>
          )}
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleProfileSave} className="space-y-6" id="patient-profile-edit-form">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Profile Block */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-blue-600 block border-b pb-1">
                  1. Demographics
                </span>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Patient Name</label>
                  <input 
                    type="text" 
                    value={editedName} 
                    id="edit-profile-name"
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full bg-slate-50 border py-2 px-3 rounded-lg text-xs text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Date of Birth</label>
                  <input 
                    type="date" 
                    value={editedDob} 
                    id="edit-profile-dob"
                    onChange={(e) => setEditedDob(e.target.value)}
                    className="w-full bg-slate-50 border py-2 px-3 rounded-lg text-xs text-slate-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Contact Phone</label>
                  <input 
                    type="tel" 
                    value={editedPhone} 
                    id="edit-profile-phone"
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className="w-full bg-slate-50 border py-2 px-3 rounded-lg text-xs text-slate-850"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Patient Email</label>
                  <input 
                    type="email" 
                    value={editedEmail} 
                    id="edit-profile-email"
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="w-full bg-slate-50 border py-2 px-3 rounded-lg text-xs text-slate-850"
                  />
                </div>
              </div>

              {/* Background tags block */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-blue-600 block border-b pb-1">
                  2. Critical Allergies & Meds
                </span>
                
                {/* Blood picker */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Blood Group</label>
                  <select 
                    value={editedBlood} 
                    id="edit-profile-blood"
                    onChange={(e) => setEditedBlood(e.target.value)}
                    className="w-full bg-slate-50 border py-2 px-3 rounded-lg text-xs"
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(blood => (
                      <option key={blood} value={blood}>{blood}</option>
                    ))}
                  </select>
                </div>

                {/* Allergies list editor */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Active Allergies List</label>
                  <div className="flex gap-1.5 pb-2">
                    <input 
                      type="text" 
                      placeholder="e.g. Peanuts" 
                      value={allergyDraft}
                      id="allergy-draft-input"
                      onChange={(e) => setAllergyDraft(e.target.value)}
                      className="flex-1 bg-slate-50 border py-1.5 px-2.5 rounded-lg text-[11px]"
                    />
                    <button 
                      type="button"
                      id="add-allergy-draft-btn"
                      onClick={addAllergy}
                      className="bg-blue-600 text-white rounded-lg px-2 text-xs font-bold"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 bg-slate-50 p-2 rounded-lg border min-h-[44px]">
                    {allergiesList.map((al, idx) => (
                      <span key={idx} className="bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-md text-[10px] flex items-center gap-1">
                        {al}
                        <button type="button" onClick={() => removeAllergy(idx)} className="text-[10px] cursor-pointer text-amber-500 font-bold">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meds list editor */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Active Medications</label>
                  <div className="flex gap-1.5 pb-2">
                    <input 
                      type="text" 
                      placeholder="e.g. Albuterol" 
                      value={medDraft}
                      id="meds-draft-input"
                      onChange={(e) => setMedDraft(e.target.value)}
                      className="flex-1 bg-slate-50 border py-1.5 px-2.5 rounded-lg text-[11px]"
                    />
                    <button 
                      type="button"
                      id="add-meds-draft-btn"
                      onClick={addMed}
                      className="bg-blue-600 text-white rounded-lg px-2 text-xs font-bold"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 bg-slate-50 p-2 rounded-lg border min-h-[44px]">
                    {medsList.map((m, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-900 font-semibold px-2 py-0.5 rounded-md text-[10px] flex items-center gap-1">
                        {m}
                        <button type="button" onClick={() => removeMed(idx)} className="text-[10px] cursor-pointer text-blue-500 font-bold">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency block */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-blue-600 block border-b pb-1">
                  3. Emergency Contacts
                </span>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Contact Full Name</label>
                  <input 
                    type="text" 
                    value={editedContactName} 
                    id="edit-profile-contact-name"
                    onChange={(e) => setEditedContactName(e.target.value)}
                    className="w-full bg-slate-50 border py-2 px-3 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">relationship</label>
                  <input 
                    type="text" 
                    value={editedContactRelation} 
                    id="edit-profile-contact-relation"
                    onChange={(e) => setEditedContactRelation(e.target.value)}
                    className="w-full bg-slate-50 border py-2 px-3 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Emergency Contact Phone</label>
                  <input 
                    type="tel" 
                    value={editedContactPhone} 
                    id="edit-profile-contact-phone"
                    onChange={(e) => setEditedContactPhone(e.target.value)}
                    className="w-full bg-slate-50 border py-2 px-3 rounded-lg text-xs"
                  />
                </div>
              </div>

            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                id="cancel-profile-btn"
                onClick={() => {
                  setIsEditingProfile(false);
                  // Reset form fields back to profile
                  setEditedName(profile.name);
                  setEditedDob(profile.dob);
                  setEditedEmail(profile.email);
                  setEditedPhone(profile.phone);
                  setEditedBlood(profile.bloodType);
                  setAllergiesList(profile.allergies);
                  setMedsList(profile.medications);
                  setEditedContactName(profile.emergencyContact.name);
                  setEditedContactRelation(profile.emergencyContact.relationship);
                  setEditedContactPhone(profile.emergencyContact.phone);
                }}
                className="bg-white border text-slate-700 py-2.5 px-6 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel Changes
              </button>
              <button
                type="submit"
                id="save-profile-btn"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-8 rounded-xl text-xs font-bold shadow-md shadow-indigo-100 cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4.5 h-4.5" />
                Commit EHR Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Demographics view */}
            <div className="p-4 bg-slate-50 rounded-2xl space-y-3 font-medium text-slate-700">
              <span className="text-[9px] uppercase font-bold tracking-widest font-mono text-slate-400 block border-b pb-1">
                EHR Demographics
              </span>
              <div className="text-xs space-y-1.5">
                <p>Register Name: <strong className="text-slate-900 text-sm block font-sans font-bold">{profile.name}</strong></p>
                <p>DOB Record: <strong className="text-slate-900">{profile.dob || "Unspecified"}</strong></p>
                <p>Phone Line: <strong className="text-slate-900">{profile.phone || "Unspecified"}</strong></p>
                <p>Secure Mail: <strong className="text-slate-800 text-wrap truncate block">{profile.email || "Unspecified"}</strong></p>
              </div>
            </div>

            {/* Background credentials view */}
            <div className="p-4 bg-slate-50 rounded-2xl space-y-3">
              <span className="text-[9px] uppercase font-bold tracking-widest font-mono text-slate-400 block border-b pb-1">
                Clinical Backdoor Summary
              </span>
              <div className="text-xs space-y-3 text-slate-700 font-medium">
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Allergy list Warnings:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.allergies.length === 0 ? (
                      <span className="text-slate-400 text-[11px] italic">No active allergy records.</span>
                    ) : (
                      profile.allergies.map((al, idx) => (
                        <span key={idx} className="bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                          {al}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Routine Prescriptions:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.medications.length === 0 ? (
                      <span className="text-slate-400 text-[11px] italic">No active prescription treatments.</span>
                    ) : (
                      profile.medications.map((m, idx) => (
                        <span key={idx} className="bg-blue-100/70 text-blue-950 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                          {m}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Audit log details */}
            <div className="p-4 bg-slate-50 rounded-2xl space-y-3 shrink-0">
              <span className="text-[9px] uppercase font-bold tracking-widest font-mono text-slate-400 block border-b pb-1">
                HIPAA & EHR Information
              </span>
              <div className="space-y-4 text-[10.5px] text-slate-500 leading-relaxed font-medium">
                <p className="flex items-center gap-1 text-emerald-600 font-bold">
                  <Shield className="w-3.5 h-3.5" />
                  EHR Encryption Active
                </p>
                <p>
                  Updates here synchronize in client localStorage under full diagnostic audits. To reset physical databases completely, clear browser local cache.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
