import React, { useState, useEffect } from 'react';
import { useAppointment } from '../../context/AppointmentContext';
import { withModal } from '../../hoc/withModal';
import { User, Phone, Calendar, Clock, Stethoscope, MessageSquare, CheckCircle } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        specialtyConcern: preselectedService
      }));
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName.trim()) {
      setErrorMsg('Please enter the patient name.');
      return;
    }
    if (!formData.patientPhone.trim() || formData.patientPhone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');
      await generateTicket(formData);
      onClose();
    } catch {
      setErrorMsg('Failed to process booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          Book an appointment slot. Our clinic staff will review and confirm your consultation.
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
              className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-base sm:text-sm bg-white"
            />
          </div>

          {/* Mobile No */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary-600" />
              <span>Mobile Number *</span>
            </label>
            <input
              type="tel"
              required
              value={formData.patientPhone}
              onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
              placeholder="10-digit number"
              className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-base sm:text-sm bg-white"
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
              className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-base sm:text-sm bg-white"
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
              className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-base sm:text-sm bg-white"
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
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl btn-primary text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 transition disabled:opacity-75"
        >
          {isSubmitting ? (
            <span>Confirming Booking...</span>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-white shrink-0" />
              <span>Confirm Booking</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          * Your appointment request is automatically sent to the clinic desk via email for confirmation.
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
