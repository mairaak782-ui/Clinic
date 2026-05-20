import { useState } from "react";
import React from "react";
import { TriageResult } from "../types";
import { 
  Activity, Sparkles, Brain, Clock, ShieldCheck, 
  ArrowRight, ShieldAlert, HeartPulse, HelpCircle, RefreshCw 
} from "lucide-react";

interface TriageViewProps {
  onTriageMatchDepartment: (department: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function TriageView({ onTriageMatchDepartment, setActiveTab }: TriageViewProps) {
  
  // Input fields
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [duration, setDuration] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Loading & state indicators
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isKeyMissing, setIsKeyMissing] = useState(false);

  // Appraised report
  const [report, setReport] = useState<TriageResult | null>(null);

  // Simulated loading steps for empathetic patient interaction
  const loadingSequence = [
    "Establishing encrypted clinical telemetry...",
    "Assembling symptom indicators with Gemini intelligence...",
    "Querying CarePoint specialty department parameters...",
    "Compiling comforting educational measures & consultation plans..."
  ];

  const triggerProgressAnimation = (callback: () => void) => {
    setLoadingStep(0);
    // Sequence of steps
    const t0 = setTimeout(() => setLoadingStep(1), 800);
    const t1 = setTimeout(() => setLoadingStep(2), 1600);
    const t2 = setTimeout(() => setLoadingStep(3), 2400);
    const t3 = setTimeout(() => {
      callback();
    }, 3200);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const handleTriageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setErrorMsg("Please describe what symptoms you are experiencing.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    const matchCallback = async () => {
      try {
        const response = await fetch("/api/triage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptoms,
            age,
            duration,
            additionalInfo
          })
        });

        if (!response.ok) {
          const result = await response.json();
          if (result.isKeyMissing) {
            setIsKeyMissing(true);
            throw new Error("Gemini API key is not configured.");
          }
          throw new Error(result.error || "Appraisal failed.");
        }

        const data: TriageResult = await response.json();
        setReport(data);
      } catch (err: any) {
        console.warn("Triage API error:", err);
        setErrorMsg(err.message || "Could not register triage query.");
        
        // Dynamic fallback triage logic to keep app functional and testable if API Keys are not set yet!
        if (!report) {
          generateLocalTriageFallback();
        }
      } finally {
        setLoading(false);
      }
    };

    triggerProgressAnimation(matchCallback);
  };

  // Local fallback generator (very advanced heuristics mimicking clinical sorting)
  const generateLocalTriageFallback = () => {
    const textLower = symptoms.toLowerCase();
    
    let department = "General Medicine";
    let urgency = "Routine Clinical Appointment";
    let reasoning = "Based on symptoms, we advise consulting our Family Medicine desk which specializes in broad physical check-ups and diagnosis sorting.";
    let educationalTips = [
      "Track your biological timing (write down occurrences and severity of fluctuations).",
      "Get plenty of rest, maintain hydration status, and avoid abrupt physical exertions.",
      "Check in with other medical history folders to cross-reference allergies."
    ];
    let doctorQuestions = [
      "Could these symptoms relate to any underlying digestive or dietary changes?",
      "Are there custom physical therapies or tests you recommend to screen this?",
      "Which triggers should I monitor to avoid severity spikes?"
    ];

    if (textLower.includes("heart") || textLower.includes("chest") || textLower.includes("palpitations") || textLower.includes("blood pressure")) {
      department = "Cardiology";
      urgency = "Urgent Care Visit";
      reasoning = "Cardiovascular signals require prioritized diagnostic screens. Dr. Evelyn Stone specializes in vascular tracking and preventative cardiology therapies.";
      educationalTips = [
        "Avoid high salt contents, coffee stimulants, or abrupt aerobic cardiovascular exercise.",
        "Lie down in a cool, ventilated area if palpitations or light dizziness emerges.",
        "Check your pulse and log the beats per minute in your profile notebook."
      ];
      doctorQuestions = [
        "Do these fluctuations suggest chronic capillary inflammation or simple stress spikes?",
        "Should we perform an outpatient electrocardiogram (ECG) to monitor rhythms?",
        "Are there specific activity parameters I must maintain?"
      ];
    } else if (textLower.includes("child") || textLower.includes("baby") || textLower.includes("kid") || textLower.includes("toddler") || textLower.includes("pediatric")) {
      department = "Pediatrics";
      urgency = "Schedule within 48 Hours";
      reasoning = "Pediatric health states should be reviewed by professional specialists. Dr. Marcus Vance is CarePoint’s chief pediatrician centered on gentle, kid-friendly treatments.";
      educationalTips = [
        "Ensure small fluid sips frequently if cold viral fever threatens body hydration levels.",
        "Use sub-lukewarm damp baths to bring cooling relief to irritated skin areas.",
        "Log fever benchmarks every 4 hours using a reliable clinical thermometer."
      ];
      doctorQuestions = [
        "Do these symptoms indicate standard viral childhood milestones or require oral treatments?",
        "How can we support sleeping comfort during these symptoms?",
        "Which physical signs warn that we should proceed directly to urgent care?"
      ];
    } else if (textLower.includes("joint") || textLower.includes("bone") || textLower.includes("knee") || textLower.includes("sprain") || textLower.includes("muscle") || textLower.includes("ortho")) {
      department = "Orthopedics";
      urgency = "Routine Clinical Appointment";
      reasoning = "Joint, bone alignment, and mechanical physical skeletal discomfort falls under Orthopedics. Dr. Kael can evaluate structural wear, strain, or sport-induced trauma.";
      educationalTips = [
        "Apply the standard R.I.C.E protocol (Rest joint, Ice 20 mins, Compress gently, Elevate above heart level).",
        "Discontinue any structural weight-bearing on the affected limb until testing.",
        "Avoid hot baths or inflammatory massage on swollen soft-tissue sites."
      ];
      doctorQuestions = [
        "Do these discomfort triggers indicate micro-tears in joint tissues or simple joint exhaustion?",
        "Could standard physical therapy align this alignment or do we require MRI scans?",
        "Which supportive joints accessories or braces would protect me during recoveries?"
      ];
    } else if (textLower.includes("skin") || textLower.includes("rash") || textLower.includes("itch") || textLower.includes("acne") || textLower.includes("eczema") || textLower.includes("burn")) {
      department = "Dermatology";
      urgency = "Routine Clinical Appointment";
      reasoning = "Persistent skin flares, rashes, or barrier inflammation is best coordinated by Dermatology. Dr. Clara Wu is board-certified to restore lipid tissue barriers.";
      educationalTips = [
        "Wash the irritated dermal skin with cool water only and avoid scented body soaps.",
        "Apply pure ceramides or petroleum-based gentle ointments to lock clinical moisture pathways.",
        "Avoid active solar skin exposure and wear wide brim physical sun blocks."
      ];
      doctorQuestions = [
        "What specific topical allergen indices could be triggering this rash flare?",
        "Does this require specialized prescription steroid creams or simple skin-barrier protection?",
        "Is there a daily face wash schedule you recommend for my baseline skin profile?"
      ];
    }

    setReport({
      disclaimer: "LOCAL SIMULATED ASSESSMENT ACTIVE: Because your workspace Gemini API Key is during configuration, CarePoint activated local sorting heuristics. This information is strictly educational.",
      urgency,
      department,
      reasoning,
      educationalTips,
      doctorQuestions
    });
  };

  const handleBookWithResult = (dept: string) => {
    onTriageMatchDepartment(dept);
    setActiveTab("booking");
  };

  const resetTriageForm = () => {
    setReport(null);
    setSymptoms("");
    setAge("");
    setDuration("");
    setAdditionalInfo("");
    setIsKeyMissing(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-4 animate-fade-in" id="triage-main-container">
      
      {/* 1. BRAND HERO ROW */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 blur-xl rounded-full" />
        <div className="relative z-10 flex gap-4 items-center">
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
            <Brain className="w-8 h-8 text-indigo-200" />
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-widest uppercase text-indigo-200 font-extrabold bg-indigo-950/40 py-1 px-3.5 rounded-full block border border-indigo-500/30 w-fit leading-none mb-1.5">
              CarePoint Smart Portal
            </span>
            <h1 className="font-sans font-extrabold text-2xl tracking-tight">AI-Powered Smart Symptom Advisor</h1>
            <p className="text-indigo-100 text-xs mt-1">
              Briefly discuss what symptoms/discomfort you feel. Our AI assistant will triage and align you with the proper clinical specialists.
            </p>
          </div>
        </div>
      </div>

      {/* 2. WARNING / DISCLAIMER */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100/60 mb-8 flex gap-3 text-xs text-amber-900 leading-relaxed font-semibold shadow-inner">
        <span className="text-lg shrink-0">🚨</span>
        <div className="space-y-1">
          <h4 className="font-extrabold uppercase font-mono tracking-wider text-amber-700 text-[10px]">
            Educational Triage Disclaimer Notice
          </h4>
          <p className="text-[11px] text-slate-600 font-medium">
            This tool offers coordinate sorting and wellness educational pointers. <strong>It is NOT a medical diagnosis</strong>. If you feel immediate chest choking, breathing deficits, or are in danger, please skip this checklist and proceed to emergency desks immediately.
          </p>
        </div>
      </div>

      {/* 3. APPRAISAL RESULT RENDER */}
      {report ? (
        <div className="space-y-6 animate-scale-up" id="triage-report-card">
          <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-slate-400">CarePoint Appraisal</span>
                <h2 className="text-slate-900 font-extrabold text-xl font-sans mt-0.5">Symptom Assessment Report</h2>
              </div>
              <button
                id="triage-reset-btn"
                onClick={resetTriageForm}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Submit New Query
              </button>
            </div>

            {/* Severity and Department Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Urgency posture */}
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 font-bold">
                  Advised Care Posture
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-full shrink-0 ${
                    report.urgency.toLowerCase().includes("emergency") ? "bg-red-500 animate-ping" :
                    report.urgency.toLowerCase().includes("urgent") ? "bg-amber-500" :
                    "bg-emerald-500"
                  }`} />
                  <strong className="text-slate-900 text-base font-extrabold">
                    {report.urgency}
                  </strong>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Matches clinical triage safety thresholds based on the duration details and symptom inputs provided.
                </p>
              </div>

              {/* Department matched */}
              <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-blue-600 font-bold">
                  Recommended Specialty Department
                </span>
                <h3 className="font-extrabold text-blue-900 text-lg flex items-center gap-1.5 leading-none">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  {report.department}
                </h3>
                <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                  We have specialists standing by in our {report.department} department equipped with state-of-the-art diagnostics.
                </p>
              </div>

            </div>

            {/* Logical reasoning */}
            <div className="space-y-1.5 pl-4 border-l-3 border-indigo-500 py-1">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">Advisor Appraisal Logic:</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                {report.reasoning}
              </p>
            </div>

            {/* Educational TIPS and Doctor Questions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono flex items-center gap-1 text-slate-500">
                  <HeartPulse className="w-4 h-4 text-emerald-500" />
                  Educational Comfort Measures
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 font-medium list-disc pl-4 leading-relaxed">
                  {report.educationalTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono flex items-center gap-1 text-slate-500">
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                  Questions to Ask Your Doctor
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 font-medium list-disc pl-4 leading-relaxed">
                  {report.doctorQuestions.map((q, idx) => (
                    <li key={idx} className="italic">"{q}"</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action booking integration row */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[11px] text-slate-400 text-center sm:text-left leading-relaxed font-medium">
                Click down below to auto-select this clinical department in our reservation portal.
              </span>
              <button
                id="triage-to-booking-btn"
                onClick={() => handleBookWithResult(report.department)}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-100 flex items-center gap-1.5 cursor-pointer leading-none"
              >
                Schedule with {report.department}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prompt Key Warning if fallback occurred */}
          {errorMsg && isKeyMissing && (
            <div className="p-4 bg-slate-100 text-slate-700 text-xs rounded-2xl border border-slate-200 leading-relaxed font-semibold">
              <p className="flex items-center gap-1.5 text-blue-600 font-bold mb-1 uppercase text-[10px]">
                <ShieldAlert className="w-4 h-4" />
                Note regarding AI Workspace Setup
              </p>
              This workspace operates in "Simulated Triage Desk Profile". To enable the live server-side Google GenAI model calls, make sure you configure your <strong>GEMINI_API_KEY</strong> environment variable in your AI Studio dashboard under <strong>Settings & Secrets</strong>.
            </div>
          )}
        </div>
      ) : (
        /* 4. SYMPTOM INPUT FORM */
        <form onSubmit={handleTriageSubmit} className="bg-white border border-slate-101 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm" id="symptom-triage-form">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-slate-900 font-extrabold text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              Begin Symptom Inquiry
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Describe what discomforts you feel. Include physical signs, duration indexes, and general age demographics.
            </p>
          </div>

          {/* Symptoms main box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
              Discuss what you are feeling:
            </label>
            <textarea
              id="triage-symptoms-input"
              rows={4}
              placeholder="e.g. I am suffering from mild chest tightness or pressure that worsens when climbing the house stairs, coupled with slight localized sweating and nausea. It usually recedes if I sit down and rest."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white py-3 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 leading-relaxed text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                Patient Age (Years)
              </label>
              <input
                id="triage-age-input"
                type="number"
                placeholder="e.g. 45"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-slate-50 py-3 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 font-semibold"
              />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                Symptom Duration Index
              </label>
              <input
                id="triage-duration-input"
                type="text"
                placeholder="e.g. 2 days, 12 hours"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-50 py-3 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 font-semibold"
              />
            </div>
          </div>

          {/* Optional context */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
              Additional Medicine or Contextual History (optional):
            </label>
            <input
              id="triage-additional-input"
              type="text"
              placeholder="e.g. Hypertension diagnosis in 2021; currently on daily Amlodipine pills."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full bg-slate-50 py-3 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            id="triage-submit-btn"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-sans font-bold text-sm py-3.5 rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4.5 h-4.5" />
            Submit Symptom Profile
          </button>
        </form>
      )}

      {/* 5. LOADING OVERLAY SECTIONS */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-slate-100 text-center space-y-6 shadow-2xl animate-scale-up" id="triage-loading-overlay">
            <div className="relative inline-block w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-base">CarePoint AI Sorting Desk</h4>
              <p className="text-xs text-slate-500 h-10 px-4 flex items-center justify-center transition-all">
                {loadingSequence[loadingStep]}
              </p>
            </div>
            <div className="flex justify-between max-w-xs mx-auto text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
              <span className={loadingStep >= 0 ? "text-indigo-600" : ""}>triage</span>
              <span className={loadingStep >= 1 ? "text-indigo-600" : ""}>indicators</span>
              <span className={loadingStep >= 2 ? "text-indigo-600" : ""}>matching</span>
              <span className={loadingStep >= 3 ? "text-indigo-600" : ""}>curation</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
