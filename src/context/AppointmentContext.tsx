import React, { createContext, useContext, useState } from 'react';
import { AppointmentData, AppointmentFormData } from '../types';

interface AppointmentContextType {
  isBookingOpen: boolean;
  preselectedService?: string;
  openBooking: (service?: string) => void;
  closeBooking: () => void;
  activeTicket: AppointmentData | null;
  openTicket: (ticket: AppointmentData) => void;
  closeTicket: () => void;
  generateTicket: (formData: AppointmentFormData) => Promise<AppointmentData>;
  getWhatsAppShareUrl: (ticket: AppointmentData) => string;
}

const STORAGE_KEY = 'shri_sai_clinic_tickets';

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [activeTicket, setActiveTicket] = useState<AppointmentData | null>(null);

  const openBooking = (service?: string) => {
    setPreselectedService(service);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setPreselectedService(undefined);
  };

  const openTicket = (ticket: AppointmentData) => {
    setActiveTicket(ticket);
  };

  const closeTicket = () => {
    setActiveTicket(null);
  };

  const getWhatsAppShareUrl = (ticket: AppointmentData): string => {
    const text = encodeURIComponent(
      `🏥 *SHRI SAI CLINIC — APPOINTMENT BOOKING*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 *Token ID:* ${ticket.tokenId}\n` +
      `📅 *Booking Time:* ${ticket.createdAt}\n\n` +
      `👤 *PATIENT INFORMATION*\n` +
      `• *Full Name:* ${ticket.patientName}\n` +
      `• *Mobile Number:* ${ticket.patientPhone}\n\n` +
      `🗓️ *REQUESTED SCHEDULE*\n` +
      `• *Preferred Date:* ${ticket.appointmentDate}\n` +
      `• *Session Slot:* ${ticket.sessionSlot}\n\n` +
      `🩺 *CLINICAL INQUIRY*\n` +
      `• *Primary Concern:* ${ticket.specialtyConcern}\n` +
      `• *Symptoms / Notes:* ${ticket.patientNotes ? ticket.patientNotes : 'None provided'}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *Clinic:* Samrudhi Complex, Opp. Palace Gate, Vansda, Gujarat\n` +
      `👨‍⚕️ *Doctor:* Dr. Jay Bhatt (BHMS)\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Submitted via Shri Sai Clinic Online Portal_`
    );
    return `https://wa.me/919054520603?text=${text}`;
  };

  const generateTicket = async (formData: AppointmentFormData): Promise<AppointmentData> => {
    const now = new Date();
    
    // Generate optimistic reference ID in IST format: DD-MM-YYYY/1
    const istDateParts = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).formatToParts(now);

    const day = istDateParts.find((p) => p.type === "day")?.value || "10";
    const month = istDateParts.find((p) => p.type === "month")?.value || "10";
    const year = istDateParts.find((p) => p.type === "year")?.value || "2026";
    const optimisticTokenId = `${day}-${month}-${year}/1`;

    let canonicalTokenId = optimisticTokenId;

    // Asynchronously dispatch appointment inquiry to Supabase backend & Edge Function email trigger
    const supabaseUrl = (import.meta.env && import.meta.env.VITE_SUPABASE_URL) || 'https://alehmbxzlsqiryhizrtp.supabase.co';
    const supabaseAnonKey = (import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZWhtYnh6bHNxaXJ5aGl6cnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NjQ0NzYsImV4cCI6MjEwNzE0MDQ3Nn0.PnI2DCt1V2UObazVhkSkhtMpiZfzM2kXSsOwl4PZKaw';

    if (typeof window !== 'undefined' && supabaseUrl) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/patient_inquiries`, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
          },
          body: JSON.stringify({
            reference_id: optimisticTokenId,
            name: formData.patientName.trim(),
            phone: formData.patientPhone.trim(),
            appointment_date: formData.appointmentDate,
            appointment_time: formData.sessionSlot,
            doctor_or_service: formData.specialtyConcern,
            symptoms_notes: formData.patientNotes?.trim() || '',
          }),
        });

        if (response.ok) {
          const insertedData = await response.json();
          const firstRow = Array.isArray(insertedData) ? insertedData[0] : insertedData;
          if (firstRow?.reference_id) {
            canonicalTokenId = firstRow.reference_id;
          }
        }
      } catch (err) {
        console.warn('Failed to send appointment inquiry to Supabase:', err);
      }
    }

    const newTicket: AppointmentData = {
      tokenId: canonicalTokenId,
      patientName: formData.patientName.trim(),
      patientPhone: formData.patientPhone.trim(),
      appointmentDate: formData.appointmentDate,
      sessionSlot: formData.sessionSlot,
      specialtyConcern: formData.specialtyConcern,
      patientNotes: formData.patientNotes?.trim() || undefined,
      createdAt: now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };

    // Store in history
    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      const list: AppointmentData[] = existingStr ? JSON.parse(existingStr) : [];
      list.unshift(newTicket);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 20)));
    } catch {
      // ignore storage error
    }

    setActiveTicket(newTicket);
    closeBooking();
    return newTicket;
  };

  return (
    <AppointmentContext.Provider
      value={{
        isBookingOpen,
        preselectedService,
        openBooking,
        closeBooking,
        activeTicket,
        openTicket,
        closeTicket,
        generateTicket,
        getWhatsAppShareUrl
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};
