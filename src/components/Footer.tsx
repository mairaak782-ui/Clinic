import { HeartPulse, Mail, Phone, MapPin, Shield, CheckCircle2 } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800" id="main-footer">
      {/* Primary Footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Clinic Branding & Moto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">CarePoint Clinic</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              CarePoint Medical Clinic provides elite therapeutic healing, primary preventative medicine, and personalized specialized care guided by certified healthcare pioneers.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold bg-slate-800/60 p-2.5 rounded-lg border border-slate-800 w-fit">
              <Shield className="w-4 h-4" />
              HIPAA Compliant Electronic Records
            </div>
          </div>

          {/* Column 2: Hours and Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Clinic Hours</h3>
            <ul className="space-y-2 text-sm text-slate-400 font-medium">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="text-slate-200">8:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-slate-200">8:00 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-emerald-400 font-semibold">Urgent Clinic Only</span>
              </li>
              <li className="pt-2 border-t border-slate-800 text-xs text-slate-500">
                *Walk-in diagnostic imaging & labs open at 7:00 AM weekdays.
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Patient Center</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button 
                  onClick={() => setActiveTab("booking")}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                  id="footer-link-booking"
                >
                  Schedule an Appointment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("triage")}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                  id="footer-link-triage"
                >
                  AI-Powered Symptom Triage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("blog")}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                  id="footer-link-blog"
                >
                  Wellness & Health Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("portal")}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                  id="footer-link-portal"
                >
                  My Digital Health Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Emergency */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Contact Info</h3>
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <span>
                1200 Healthcare Parkway,<br />
                Suite 400, Chicago, IL 60611
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="font-semibold text-slate-200">(555) 120-CARE</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <span>caredesk@carepointclinic.com</span>
            </div>
          </div>
        </div>

        {/* Clinical Disclaimer Area */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center space-y-4">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-left md:text-center">
            <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1 flex items-center gap-2 md:justify-center">
              🚨 Critical Safety Information Warning
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed max-w-5xl mx-auto">
              If you are undergoing severe chest pains, respiratory trauma, heavy active arterial bleeding, or other acute conditions, do NOT rely on this website or our AI Triage assistant. Call <strong>911</strong> or proceed directly to your closest physical emergency trauma center immediately. Our digital tools offer simulated health tips and coordination and do NOT construct clinical diagnoses.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {currentYear} CarePoint Family Medical Practice, Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Privacy Agreement</span>
              <span>Terms of Portal</span>
              <span>Patient Legal Bill of Rights</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
