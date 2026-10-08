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
  Ticket, 
  User, 
  Calendar, 
  Stethoscope, 
  MessageSquare 
} from 'lucide-react';

const AppointmentSectionBase: React.FC = () => {
  const { generateTicket } = useAppointment();

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    appointmentDate: todayStr,
    sessionSlot: 'Morning (10:00 AM - 1:30 PM)',
    specialtyConcern: 'Skin Care & Dermatology',
    patientNotes: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

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
    if (!formData.appointmentDate) {
      setErrorMsg('Please select an appointment date.');
      return;
    }

    setErrorMsg('');
    generateTicket(formData);
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
              <span className="font-medium text-slate-700">Mon – Sat (Morning Session)</span>
              <span className="font-bold text-primary-700">10:00 AM – 1:30 PM</span>
            </div>
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
              <span className="font-medium text-slate-700">Mon – Sat (Evening Session)</span>
              <span className="font-bold text-primary-700">5:30 PM – 9:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-700">Sunday (Special Batch)</span>
              <span className="font-bold text-slate-900">10:00 AM – 1:00 PM</span>
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
              <h4 className="font-bold text-slate-900 text-sm">Clinic Address</h4>
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
              href="https://wa.me/917600239816?text=Hello%20Shri%20Sai%20Clinic,%20I%20need%20location%20directions%20and%20OPD%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl border border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-emerald-100 transition shadow-xs"
            >
              <svg className="w-4 h-4 fill-emerald-600 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Direct WhatsApp Consultation Query</span>
            </a>
          </div>

        </div>

      </div>

      {/* Right Column: Instant Token Generator Form (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-slate-200">
        
        <div className="mb-6 pb-4 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200 inline-block">
            Instant Token Generator
          </span>
          <h3 className="font-heading font-extrabold text-2xl text-slate-900 mt-2">
            Book Doctor Consultation Slot
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select date and session. Walk out with a verifiable digital token slip.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-sm transition bg-white"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-primary-600" />
                <span>WhatsApp Mobile *</span>
              </label>
              <input
                type="tel"
                required
                value={formData.patientPhone}
                onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                placeholder="10-digit phone number"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-sm transition bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-sm transition bg-white"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-sm transition bg-white"
              >
                <option value="Morning (10:00 AM - 1:30 PM)">Morning (10:00 AM – 1:30 PM)</option>
                <option value="Evening (5:30 PM - 9:00 PM)">Evening (5:30 PM – 9:00 PM)</option>
                <option value="Sunday Batch (10:00 AM - 1:00 PM)">Sunday Batch (10:00 AM – 1:00 PM)</option>
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-sm transition bg-white"
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-200 outline-none text-sm transition bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl btn-primary text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-98 cursor-pointer"
          >
            <Ticket className="w-4 h-4 text-white" />
            <span>Generate &amp; Print Consultation Slip</span>
          </button>

          <p className="text-[11px] text-slate-400 text-center">
            * Prior token gives priority turn in the consultation queue. Zero advance payment required.
          </p>

        </form>

      </div>

    </div>
  );
};

export const AppointmentSection = withSectionWrapper(AppointmentSectionBase, {
  id: 'booking',
  background: 'white',
  badge: 'Book Consultation • OPD Hours',
  title: 'Schedule Your Consultation & Visiting Hours',
  subtitle: 'Select an appointment slot below for instant verifiable token slip generation, or visit during open OPD hours.'
});
