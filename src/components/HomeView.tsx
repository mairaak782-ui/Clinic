import { Doctor } from "../types";
import { CLINIC_DOCTORS, CLINIC_SPECIALTIES } from "../data";
import { 
  Heart, Calendar, Activity, ShieldCheck, Star, 
  MapPin, Clock, ArrowRight, Ambulance, UserCheck, 
  Sparkles, Check, ChevronRight, MessageSquare 
} from "lucide-react";

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setSelectedDoctorId: (id: string | null) => void;
  setSelectedSpecialty: (specialty: string | null) => void;
}

export default function HomeView({ setActiveTab, setSelectedDoctorId, setSelectedSpecialty }: HomeViewProps) {
  
  const handleDocBookClick = (docId: string) => {
    setSelectedDoctorId(docId);
    setActiveTab("booking");
  };

  const handleSpecialtyClick = (specialtyName: string) => {
    setSelectedSpecialty(specialtyName);
    setActiveTab("booking");
  };

  return (
    <div className="space-y-16 py-4 animate-fade-in" id="home-view-container">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative overflow-hidden bg-slate-100 rounded-3xl border border-slate-200 p-8 sm:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 max-w-xl">
            {/* Wellness Badge */}
            <div className="inline-flex items-center gap-1.5 bg-blue-100/70 border border-blue-200/50 py-1.5 px-3.5 rounded-full text-blue-700 font-sans text-xs font-semibold leading-none shadow-sm shadow-blue-50">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Empowering Better Health Journeys
            </div>
            
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-5xl text-slate-900 tracking-tight leading-none">
              Your Health, <br />
              <span className="text-blue-600 font-extrabold" style={{ color: '#0f766e' }}>Our Trusted Priority</span>
            </h1>
            
            <p className="text-slate-600 text-base leading-relaxed">
              Experience modern healthcare centered entirely around you. Carey Medical’s custom medical portal bridges certified diagnostics, seamless clinic scheduling, and advanced AI-powered symptom coordination.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-book-btn"
                onClick={() => setActiveTab("booking")}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-7 rounded-xl transition-all shadow-md shadow-blue-100 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4.5 h-4.5" />
                Schedule Appointment
              </button>
              <button
                id="hero-triage-btn"
                onClick={() => setActiveTab("triage")}
                className="bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3.5 px-7 rounded-xl transition-all border border-slate-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Activity className="w-4.5 h-4.5 text-blue-600" />
                Check Symptoms (AI)
              </button>
            </div>

            {/* Quality Accents */}
            <div className="grid grid-cols-3 gap-4 pt-6 text-slate-700 border-t border-slate-100/80">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                <span>Certified Doctors</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Star className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                <span>4.9 Star Rating</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Ambulance className="w-4.5 h-4.5 text-red-500 shrink-0" />
                <span>Urgent Ready</span>
              </div>
            </div>
          </div>

          {/* Right illustration / clinic statistics panel */}
          <div className="relative">
            {/* Visual background blob */}
            <div className="absolute inset-0 bg-blue-400/10 blur-3xl rounded-3xl" />
            
            <div className="relative bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <span className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">
                  Live Clinic Wait Times
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded-full">
                  Normal Operations
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white transition-all">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2.5 rounded-lg text-blue-700">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">General Medicine Clinic</h4>
                      <p className="text-xs text-slate-500">Walk-ins / Triage Desk</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 block leading-none">12 mins</span>
                    <span className="text-[10px] text-emerald-600 font-semibold uppercase font-mono">Very Fast</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white transition-all">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2.5 rounded-lg text-amber-700">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Diagnostic Imaging & Labs</h4>
                      <p className="text-xs text-slate-500">X-Ray, Ultrasound, Bloodwork</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 block leading-none">5 mins</span>
                    <span className="text-[10px] text-emerald-600 font-semibold uppercase font-mono">Immediate</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white transition-all">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2.5 rounded-lg text-purple-700">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Pediatrics Corner</h4>
                      <p className="text-xs text-slate-500">Kid-Friendly Lobby</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 block leading-none">18 mins</span>
                    <span className="text-[10px] text-amber-600 font-semibold uppercase font-mono">Moderate</span>
                  </div>
                </div>
              </div>

              {/* Patient satisfaction stat info card */}
              <div className="bg-slate-900 p-4 rounded-xl text-white flex justify-between items-center shadow-lg" style={{ backgroundColor: '#0f172a' }}>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">Patient Trust Score</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black">99.4%</span>
                    <span className="text-xs text-blue-400 font-semibold">Satisfaction</span>
                  </div>
                </div>
                <div className="text-right bg-white/10 p-2 rounded-lg backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 block font-semibold leading-none">Total Patients Served</span>
                  <span className="text-lg font-bold block mt-1">48,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLINIC SPECIALTIES */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-sans font-extrabold text-3xl text-slate-900 tracking-tight">Our Medical Specialties</h2>
          <p className="text-slate-500 text-sm">
            We provide specialized medicine handled by industry leaders. Click a medical department to coordinate a reservation directly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="specialties-grid">
          {CLINIC_SPECIALTIES.map((spec) => (
            <button
              key={spec.id}
              onClick={() => handleSpecialtyClick(spec.id)}
              className="group text-left bg-white border border-slate-100 hover:border-blue-500/30 hover:shadow-lg p-5 rounded-2xl transition-all hover:scale-102 cursor-pointer focus:outline-none"
              id={`specialty-card-${spec.id}`}
            >
              <div className="bg-slate-50 group-hover:bg-blue-50 p-3 rounded-xl text-slate-700 group-hover:text-blue-600 w-fit transition-colors">
                {/* Dynamically assign icons or generic fallback */}
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-4 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                {spec.name}
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-500 mt-1 lines-2 leading-relaxed">
                {spec.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 3. OUR CARE PROVIDERS (DOCTORS) */}
      <section className="space-y-6" id="doctors-section">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2.5">
          <div>
            <h2 className="font-sans font-extrabold text-3xl text-slate-900 tracking-tight">Meet Our Medical Staff</h2>
            <p className="text-slate-500 text-sm mt-1">
              CarePoint’s physicians are board-certified and come from top academic medical institutions.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab("booking")}
            className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 flex items-center gap-1.5 p-1 group cursor-pointer"
          >
            All Scheduling Options
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_DOCTORS.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md overflow-hidden flex flex-col transition-all"
              id={`doctor-card-${doc.id}`}
            >
              <div className="relative h-48 bg-slate-100 shrink-0">
                <img 
                  src={doc.imageUrl} 
                  alt={doc.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-blue-600 shadow-xs uppercase tracking-wider font-mono">
                  {doc.specialty}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{doc.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{doc.title}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-md border border-amber-100">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {doc.rating}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal italic">
                    "{doc.bio}"
                  </p>

                  <div className="pt-2 text-[11px] text-slate-500 space-y-1.5 font-medium">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                      <span>{doc.education}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>{doc.availability}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Next Available Check:</span>
                    <span className="text-xs font-bold text-slate-800">{doc.nextSlot}</span>
                  </div>
                  <button
                    id={`book-doctor-${doc.id}`}
                    onClick={() => handleDocBookClick(doc.id)}
                    className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    Select & Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CLINIC ADVANTAGE GRID (HUMAN-CENTERED ACCENTS) */}
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-950 shadow-xl relative overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
        {/* Visual geometric accent grids */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="bg-blue-500 text-white text-[10px] uppercase font-mono tracking-widest font-extrabold px-3 py-1 rounded-full">
              Why CarePoint Clinic
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
              A Complete Modern Healthcare Ecosystem Designed For You
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We focus on clinical accuracy, patient experience empathy, and modern digital integration. With us, booking takes seconds, health portals protect your records, and our smart triage keeps you informed before doctor consultations.
            </p>
            <div className="space-y-3 font-medium text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <Check className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                <span>Immediate access to Board-Certified specialist networks.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                <span>Secure digital portals synced on physical clinic self-scanners.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                <span>Responsive AI coordinator helper explaining preliminary tips.</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3 backdrop-blur-md">
              <span className="text-3xl font-black text-blue-400">100%</span>
              <h4 className="text-base font-bold text-white">Encrypted Files</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Patient records are locked behind military-grade client-to-server data protection and full HIPAA guidelines.
              </p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3 backdrop-blur-md">
              <span className="text-3xl font-black text-blue-400">4.9/5</span>
              <h4 className="text-base font-bold text-white">Patient Rating</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Averaged across 12,000+ verified customer reviews regarding bedside manner and general practice efficacy.
              </p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3 backdrop-blur-md">
              <span className="text-3xl font-black text-blue-400">24/7</span>
              <h4 className="text-base font-bold text-white">Emergency Center</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Immediate access to walk-in operations and ambulance coordination directly through our direct care helpline.
              </p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3 backdrop-blur-md">
              <span className="text-3xl font-black text-blue-400">12 min</span>
              <h4 className="text-base font-bold text-white">Avg. Wait Time</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Spend less time in reception rooms. Our queue structures prioritize appointments and manage walk-ins swiftly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6 max-w-3xl mx-auto" id="faq-section">
        <div className="text-center space-y-2">
          <h2 className="font-sans font-extrabold text-3xl text-slate-900 tracking-tight">FAQ & Clinic Policies</h2>
          <p className="text-slate-500 text-sm">
            Answers to common queries regarding records, booking amendments, and self-checks.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-100 p-5 rounded-2xl">
            <h4 className="font-bold text-slate-900 text-base">How do I verify or reschedule my appointments?</h4>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              All appointments are tracked on your machine and compiled in the <strong>Patient Portal</strong> tab. You can view, reschedule, cancel, or print your clinic member barcoded check-in passes anytime. No password required for personal storage!
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-2xl">
            <h4 className="font-bold text-slate-900 text-base">What is the "AI Symptom Triage" and is it safe?</h4>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Our Smart Symptom Guide uses Gemini block intelligence on the server to help identify which department (e.g., Cardiology, Dermatology, General Practice) you need most. It provides clear educational tips and questions for doctor consultations. <em>This is an educational navigator and does NOT construct medical prescriptions.</em>
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-2xl">
            <h4 className="font-bold text-slate-900 text-base">Do you accept primary health insurance policies?</h4>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Yes. CarePoint Clinic is partnered with BlueCross BlueShield, Aetna, Cigna, Medicare, and UnitedHealth. Please bring your insurance card to the clinic slot or register it directly during digital desk checkout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
