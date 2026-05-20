export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviews: number;
  education: string;
  languages: string[];
  availability: string;
  nextSlot: string;
  imageUrl: string;
  bio: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImg: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientDob: string;
  reason: string;
  notes?: string;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: string;
}

export interface PatientProfile {
  name: string;
  dob: string;
  email: string;
  phone: string;
  bloodType: string;
  allergies: string[];
  medications: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface TriageResult {
  disclaimer: string;
  urgency: string;
  department: string;
  reasoning: string;
  educationalTips: string[];
  doctorQuestions: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Cardiology" | "Pediatrics" | "Lifestyle" | "Dermatology" | "General Health";
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  imageUrl: string;
  likes: number;
  hasLiked?: boolean;
}
