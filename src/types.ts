export interface ClinicalCase {
  id: string;
  category: string;
  title: string;
  aspectRatio: string;
  duration: string;
  method: string;
  recovery: string;
  description: string;
  highlights: string[];
  beforeImg: string;
  afterImg: string;
  disclaimer: string;
  bookingSubject: string;
}

export interface ServiceSlide {
  image: string;
  alt: string;
  captionBadge: string;
}

export interface ServiceItem {
  id: string;
  category: string;
  iconName: string;
  title: string;
  departmentBadge: string;
  description: string;
  bulletPoints: string[];
  bookingSubject: string;
  slides?: ServiceSlide[];
}

export interface AppointmentFormData {
  patientName: string;
  patientPhone: string;
  appointmentDate: string;
  sessionSlot: string;
  specialtyConcern: string;
  patientNotes?: string;
}

export interface AppointmentData {
  tokenId: string;
  patientName: string;
  patientPhone: string;
  appointmentDate: string;
  sessionSlot: string;
  specialtyConcern: string;
  patientNotes?: string;
  createdAt: string;
}

export interface Testimonial {
  name: string;
  initials: string;
  condition: string;
  badge: string;
  title: string;
  stars: number;
  review: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface ClinicStats {
  yearsExperience: number;
  treatedPatients: number;
  clinicalDepartments: number;
  pharmacopoeia: string;
}
