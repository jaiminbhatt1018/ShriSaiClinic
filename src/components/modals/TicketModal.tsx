import React from 'react';
import { useAppointment } from '../../context/AppointmentContext';
import { CLINIC_INFO } from '../../data/clinicData';
import { withModal } from '../../hoc/withModal';
import { CheckCircle, ExternalLink, Calendar, Clock, User, Phone, Stethoscope } from 'lucide-react';

interface TicketModalContentProps {
  onClose: () => void;
}

const TicketModalContent: React.FC<TicketModalContentProps> = ({ onClose }) => {
  const { activeTicket, getWhatsAppShareUrl } = useAppointment();

  if (!activeTicket) return null;

  const whatsappUrl = getWhatsAppShareUrl(activeTicket);

  return (
    <div>
      {/* Appointment Receipt Card */}
      <div 
        className="border-2 border-dashed border-primary-300 rounded-2xl p-5 sm:p-6 bg-primary-50/40 text-left space-y-4"
      >
        {/* Receipt Clinic Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xl text-slate-900 tracking-tight">
                {CLINIC_INFO.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Booking Confirmed
              </span>
            </div>
            <p className="text-xs font-semibold text-primary-700 mt-0.5">
              {CLINIC_INFO.doctor} ({CLINIC_INFO.qualifications.split('•')[0].trim()}) &bull; General Physician
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Samrudhi Complex, Vansda, Gujarat &bull; Doctor Contact: +91 90545 20603
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Token ID
            </span>
            <span className="font-mono text-xs sm:text-sm font-extrabold text-primary-700 bg-white px-2.5 py-1 rounded-lg border border-primary-200 inline-block mt-0.5 shadow-xs">
              {activeTicket.tokenId}
            </span>
          </div>
        </div>

        {/* Patient Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <User className="w-3 h-3 text-primary-600" /> Patient Name
            </span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block truncate">
              {activeTicket.patientName}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Phone className="w-3 h-3 text-primary-600" /> Mobile No.
            </span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">
              {activeTicket.patientPhone}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-primary-600" /> Appointment Date
            </span>
            <span className="font-bold text-primary-700 text-sm mt-0.5 block">
              {activeTicket.appointmentDate}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary-600" /> Session Slot
            </span>
            <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block truncate">
              {activeTicket.sessionSlot}
            </span>
          </div>
        </div>

        {/* Clinical Concern & Notes */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
            <Stethoscope className="w-3 h-3 text-primary-600" /> Primary Concern
          </span>
          <p className="font-bold text-slate-900">
            {activeTicket.specialtyConcern}
          </p>
          {activeTicket.patientNotes && (
            <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100">
              "{activeTicket.patientNotes}"
            </p>
          )}
        </div>

        {/* Booking Note */}
        <div className="pt-1 text-[11px] text-slate-500 text-center leading-relaxed">
          Your appointment enquiry has been recorded. Send it directly to Dr. Jay Bhatt (+91 90545 20603) via WhatsApp to confirm your priority OPD slot.
        </div>
      </div>

      {/* Primary WhatsApp Action (No Print Slip) */}
      <div className="mt-5 space-y-2.5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition shadow-sm active:scale-98 cursor-pointer"
        >
          <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>Send Booking to Doctor on WhatsApp (+91 90545 20603)</span>
          <ExternalLink className="w-4 h-4 ml-0.5" />
        </a>

        <p className="text-[11px] text-slate-500 text-center leading-relaxed">
          WhatsApp will open with your pre-drafted receipt message ready to send to Dr. Jay Bhatt.
        </p>

        <div className="text-center pt-1">
          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800 transition underline cursor-pointer"
          >
            Done / Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

const WrappedTicketModal = withModal(TicketModalContent, { maxWidthClass: 'max-w-xl' });

export const TicketModal: React.FC = () => {
  const { activeTicket, closeTicket } = useAppointment();

  return (
    <WrappedTicketModal
      isOpen={!!activeTicket}
      onClose={closeTicket}
    />
  );
};
