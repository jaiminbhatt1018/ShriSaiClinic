import React, { useState } from 'react';
import { useAppointment } from '../../context/AppointmentContext';
import { CLINIC_INFO } from '../../data/clinicData';
import { withSectionWrapper } from '../../hoc/withSectionWrapper';
import { 
  Clock, 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  Stethoscope, 
  MessageSquare,
  CheckCircle 
} from 'lucide-react';

const AppointmentSectionBase: React.FC = () => {
  const { generateTicket } = useAppointment();

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    appointmentDate: todayStr,
    sessionSlot: 'Morning (9:00 AM - 12:00 PM)',
    specialtyConcern: 'Skin Care & Dermatology',
    patientNotes: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!formData.appointmentDate) {
      setErrorMsg('Please select an appointment date.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');
      await generateTicket(formData);
    } catch {
      setErrorMsg('Failed to process booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Clinic OPD Timings, Address & Direct Reach (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Visiting Hours Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary-600 text-white shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-lg">
                OPD Visiting Hours
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Prior token booking recommended
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
              <span className="font-medium text-slate-700">Mon – Sun (Morning Session)</span>
              <span className="font-bold text-primary-700">9:00 AM – 12:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-700">Mon – Sun (Evening Session)</span>
              <span className="font-bold text-primary-700">3:00 PM – 8:00 PM</span>
            </div>
          </div>
        </div>

        {/* Contact & Location Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-primary-100 text-primary-700 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Visit Our Clinic</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                {CLINIC_INFO.name}, {CLINIC_INFO.address}
              </p>
              <div className="mt-2.5">
                <a
                  href={CLINIC_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-100 text-primary-800 hover:bg-primary-200 border border-primary-200 text-xs font-semibold transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-primary-600" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-primary-100 text-primary-700 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Phone Number</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                <a href={CLINIC_INFO.phoneTel} className="hover:text-primary-600 font-semibold text-slate-900">
                  {CLINIC_INFO.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-primary-100 text-primary-700 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Email Address</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-primary-600">
                  {CLINIC_INFO.email}
                </a>
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={CLINIC_INFO.phoneTel}
              className="w-full py-3 rounded-xl border border-primary-500 bg-primary-50 text-primary-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-primary-100 transition shadow-xs"
            >
              <Phone className="w-4 h-4 text-primary-600 shrink-0" />
              <span>Call Clinic Desk (+91 76002 39816)</span>
            </a>
          </div>

        </div>

      </div>

      {/* Right Column: Instant Token Generator Form (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-md border border-slate-200">
        
        <div className="mb-5 sm:mb-6 pb-4 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200 inline-block">
            Direct Appointment Booking
          </span>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 mt-2">
            Book Doctor Consultation Slot
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select your preferred date &amp; session to submit your consultation inquiry directly to the clinic.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary-600" />
                <span>Patient Full Name *</span>
              </label>
              <input
                type="text"
                required
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="e.g. Ramesh Patel"
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-base sm:text-sm transition bg-white"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-primary-600" />
                <span>Mobile Number *</span>
              </label>
              <input
                type="tel"
                required
                value={formData.patientPhone}
                onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                placeholder="10-digit phone number"
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-base sm:text-sm transition bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary-600" />
                <span>Appointment Date *</span>
              </label>
              <input
                type="date"
                required
                min={todayStr}
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-base sm:text-sm transition bg-white"
              />
            </div>

            {/* Session Slot */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary-600" />
                <span>OPD Session Slot *</span>
              </label>
              <select
                value={formData.sessionSlot}
                onChange={(e) => setFormData({ ...formData, sessionSlot: e.target.value })}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-base sm:text-sm transition bg-white"
              >
                <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                <option value="Evening (3:00 PM - 8:00 PM)">Evening (3:00 PM – 8:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Specialty Concern */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-primary-600" />
              <span>Primary Health Concern *</span>
            </label>
            <select
              value={formData.specialtyConcern}
              onChange={(e) => setFormData({ ...formData, specialtyConcern: e.target.value })}
              className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-base sm:text-sm transition bg-white"
            >
              <option value="Skin Care & Dermatology">Skin Care &amp; Dermatology (Acne, Psoriasis, Eczema, Warts)</option>
              <option value="Hair Loss & Alopecia">Hair Loss, Alopecia &amp; Scalp Care</option>
              <option value="Chronic Allergies & Sinus">Chronic Allergies, Rhinitis &amp; Sinusitis</option>
              <option value="Women Health & PCOD">Women's Health (PCOD, Hormones, Thyroid)</option>
              <option value="Digestive & Acidity / IBS">Gastrointestinal (Acidity, Constipation, IBS)</option>
              <option value="Pediatric Child Immunity">Child Health &amp; Immunity Booster</option>
              <option value="General Consultation">General Classical Homoeopathic Consultation</option>
            </select>
          </div>

          {/* Patient Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-primary-600" />
              <span>Symptoms &amp; Prior Medicines (Optional)</span>
            </label>
            <textarea
              rows={3}
              value={formData.patientNotes}
              onChange={(e) => setFormData({ ...formData, patientNotes: e.target.value })}
              placeholder="Tell the doctor about your duration of illness, previous medicines, or specific queries..."
              className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-base sm:text-sm transition bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl btn-primary text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-98 cursor-pointer disabled:opacity-75"
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
            * This online request schedules an in-person clinical consultation. For acute medical emergencies, please contact emergency medical services directly.
          </p>

        </form>

      </div>

    </div>
  );
};

export const AppointmentSection = withSectionWrapper(AppointmentSectionBase, {
  id: 'booking',
  background: 'white',
  badge: 'Book Consultation',
  title: 'Book Your Consultation',
  subtitle: 'View OPD visiting hours and plan your visit to Shri Sai Clinic.'
});

