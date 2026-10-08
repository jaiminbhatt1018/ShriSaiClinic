import React, { createContext, useContext, useState, useEffect } from 'react';
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
  printTicket: () => void;
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

    setActiveTicket(newTicket);
    closeBooking();
    return newTicket;
  };

  const printTicket = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const getWhatsAppShareUrl = (ticket: AppointmentData): string => {
    const text = encodeURIComponent(
      `*Shri Sai Clinic - Appointment Token Slip*\n` +
      `🎫 *Token ID:* ${ticket.tokenId}\n` +
      `👤 *Patient:* ${ticket.patientName}\n` +
      `📱 *Phone:* ${ticket.patientPhone}\n` +
      `📅 *Date:* ${ticket.appointmentDate}\n` +
      `⏰ *Session:* ${ticket.sessionSlot}\n` +
      `🩺 *Concern:* ${ticket.specialtyConcern}\n` +
      (ticket.patientNotes ? `📝 *Notes:* ${ticket.patientNotes}\n` : '') +
      `\nClinic: Samrudhi Complex, Vansda, Gujarat\nContact: +91 76002 39816`
    );
    return `https://wa.me/917600239816?text=${text}`;
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
        printTicket,
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
