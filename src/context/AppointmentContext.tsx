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
  generateTicket: (formData: AppointmentFormData) => AppointmentData;
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

  const generateTicket = (formData: AppointmentFormData): AppointmentData => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    const tokenId = `SSC-${dateStr}-${rand}`;

    const newTicket: AppointmentData = {
      tokenId,
      patientName: formData.patientName.trim(),
      patientPhone: formData.patientPhone.trim(),
      appointmentDate: formData.appointmentDate,
      sessionSlot: formData.sessionSlot,
      specialtyConcern: formData.specialtyConcern,
      patientNotes: formData.patientNotes?.trim() || undefined,
      createdAt: now.toLocaleString('en-IN', {
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

    // Auto-open WhatsApp with pre-filled message to Doctor (+91 90545 20603)
    const whatsappUrl = getWhatsAppShareUrl(newTicket);
    if (typeof window !== 'undefined') {
      try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch {
        // Popups might be blocked; TicketModal provides prominent fallback button
      }
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
