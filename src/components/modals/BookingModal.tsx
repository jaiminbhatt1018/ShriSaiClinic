import React, { useState, useEffect } from 'react';
import { useAppointment } from '../../context/AppointmentContext';
import { withModal } from '../../hoc/withModal';
import { User, Phone, Calendar, Clock, Stethoscope, MessageSquare } from 'lucide-react';

interface BookingModalContentProps {
  onClose: () => void;
}

const BookingModalContent: React.FC<BookingModalContentProps> = ({ onClose }) => {
  const { preselectedService, generateTicket } = useAppointment();
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    appointmentDate: todayStr,
    sessionSlot: 'Morning (10:00 AM - 1:30 PM)',
    specialtyConcern: preselectedService || 'General Consultation',
    patientNotes: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        specialtyConcern: preselectedService
      }));
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName.trim()) {
      setErrorMsg('Please enter the patient name.');
      return;
    }
    if (!formData.patientPhone.trim() || formData.patientPhone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg('');
    generateTicket(formData);
    onClose();
  };

  return (
    <div>
      <div className="mb-5 pb-3 border-b border-slate-100 pr-6">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200 inline-block">
          Quick Priority Booking
        </span>
        <h3 className="font-heading font-extrabold text-2xl text-slate-900 mt-2">
          Schedule Consultation Slot
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Book an appointment slot and connect directly with Dr. Jay Bhatt on WhatsApp.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Patient Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary-600" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              placeholder="e.g. Ramesh Patel"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-xs sm:text-sm bg-white"
            />
          </div>

          {/* Mobile No */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary-600" />
              <span>WhatsApp Mobile *</span>
            </label>
            <input
              type="tel"
              required
              value={formData.patientPhone}
              onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
              placeholder="10-digit number"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-xs sm:text-sm bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary-600" />
              <span>Preferred Date *</span>
            </label>
            <input
              type="date"
              required
              min={todayStr}
              value={formData.appointmentDate}
              onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-xs sm:text-sm bg-white"
            />
          </div>

          {/* Session Slot */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary-600" />
              <span>Session Slot *</span>
            </label>
            <select
              value={formData.sessionSlot}
              onChange={(e) => setFormData({ ...formData, sessionSlot: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-xs sm:text-sm bg-white"
            >
              <option value="Morning (10:00 AM - 1:30 PM)">Morning (10:00 AM – 1:30 PM)</option>
              <option value="Evening (5:30 PM - 9:00 PM)">Evening (5:30 PM – 9:00 PM)</option>
              <option value="Sunday Batch (10:00 AM - 1:00 PM)">Sunday Batch (10:00 AM – 1:00 PM)</option>
            </select>
          </div>
        </div>

        {/* Concern */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-primary-600" />
            <span>Health Concern / Specialty *</span>
          </label>
          <input
            type="text"
            required
            value={formData.specialtyConcern}
            onChange={(e) => setFormData({ ...formData, specialtyConcern: e.target.value })}
            placeholder="e.g. Scalp Psoriasis, Alopecia, Acne, Allergies"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-xs sm:text-sm bg-white"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-primary-600" />
            <span>Symptoms / Notes (Optional)</span>
          </label>
          <textarea
            rows={2}
            value={formData.patientNotes}
            onChange={(e) => setFormData({ ...formData, patientNotes: e.target.value })}
            placeholder="Duration of illness or previous treatments..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-xs sm:text-sm bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold flex items-center justify-center gap-2.5 shadow-sm cursor-pointer active:scale-98 transition"
        >
          <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>Confirm &amp; Book via WhatsApp</span>
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          * Opens WhatsApp directly with pre-drafted booking details to send to Dr. Jay Bhatt.
        </p>
      </form>
    </div>
  );
};

const WrappedBookingModal = withModal(BookingModalContent, { maxWidthClass: 'max-w-lg' });

export const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking } = useAppointment();

  return (
    <WrappedBookingModal
      isOpen={isBookingOpen}
      onClose={closeBooking}
    />
  );
};
