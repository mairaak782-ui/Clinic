import { useState } from "react";
import { HeartPulse, Clock, PhoneCall, Calendar, Activity, BookOpen, Stethoscope, User, Menu, X } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clinic coordinates & hours
  const waitTime = "12 min wait";
  const hours = "Open Today: 8:00 AM - 7:00 PM";

  const navItems = [
    { id: "home", label: "Home", icon: Stethoscope },
    { id: "booking", label: "Book Appointment", icon: Calendar },
    { id: "triage", label: "AI Symptom Triage", icon: Activity },
    { id: "blog", label: "Health Tips Blog", icon: BookOpen },
    { id: "portal", label: "Patient Portal", icon: User },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      {/* Top Clinical Ribbon */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              {hours}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Walk-in Clinic: {waitTime}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              Emergency: (555) 120-CARE
            </span>
          </div>
        </div>
      </div>

      {/* Primary Brand Navigation Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center h-14">
          {/* Clinic Brand logo */}
          <button 
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            id="logo-button"
          >
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-md shadow-blue-100 group-hover:scale-105 transition-transform duration-300">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                CarePoint
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-mono text-slate-500 font-semibold leading-none mt-0.5">
                Medical Clinic
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-sans">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Schedule Button */}
          <div className="hidden sm:flex items-center">
            <button
              id="header-quick-book-btn"
              onClick={onOpenBooking}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-sans text-sm font-semibold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 cursor-pointer"
            >
              Book Care Now
            </button>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 shadow-lg px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <IconComponent className="w-5 h-5 text-slate-400" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-slate-100">
            <button
              id="mobile-quick-book-btn"
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-sans font-semibold py-3 rounded-lg transition-all shadow-md cursor-pointer"
            >
              Book Care Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
