import React from 'react';
import { motion } from 'framer-motion';
import { useAppointment } from '../../context/AppointmentContext';
import { CLINIC_INFO } from '../../data/clinicData';
import { withModal } from '../../hoc/withModal';
import { CheckCircle, Calendar, Clock, User, Phone, Stethoscope, Download } from 'lucide-react';

interface TicketModalContentProps {
  onClose: () => void;
}

const TicketModalContent: React.FC<TicketModalContentProps> = ({ onClose }) => {
  const { activeTicket, getWhatsAppShareUrl } = useAppointment();

  if (!activeTicket) return null;

  const whatsappUrl = getWhatsAppShareUrl(activeTicket);

  const handleDownloadReceipt = () => {
    window.print();
  };

  return (
    <div>
      {/* Print Stylesheet for Clean Slip Export */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-receipt-card, #printable-receipt-card * {
            visibility: visible !important;
          }
          #printable-receipt-card {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 30px !important;
            border: 2px solid #0d9488 !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border-radius: 12px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Animated Green Checkmark Header */}
      <div className="text-center mb-5 no-print">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/10"
        >
          <motion.svg
            className="w-9 h-9 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
        
        <h3 className="font-heading font-extrabold text-xl text-slate-900 tracking-tight">
          Inquiry Successfully Submitted!
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Appointment inquiry receipt has been generated &amp; dispatched to clinic desk via email.
        </p>
      </div>

      {/* Appointment Receipt Card (Print Target) */}
      <div 
        id="printable-receipt-card"
        className="border-2 border-dashed border-teal-300 rounded-2xl p-5 sm:p-6 bg-teal-50/40 text-left space-y-4 shadow-xs"
      >
        {/* Receipt Clinic Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3.5 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-teal-200 shadow-xs shrink-0 flex items-center justify-center">
              <img
                src="/assets/images/logo.png"
                alt="Shri Sai Clinic Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  {CLINIC_INFO.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-teal-700" /> ✅ Completed Enquiry
                </span>
              </div>
              <p className="text-xs font-semibold text-teal-700 mt-0.5">
                {CLINIC_INFO.doctor} ({CLINIC_INFO.qualifications.split('•')[0].trim()}) &bull; General Physician
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Samrudhi Complex, Vansda, Gujarat &bull; Doctor Contact: +91 90545 20603
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col justify-between items-center sm:items-end shrink-0 bg-white sm:bg-transparent p-2 sm:p-0 rounded-xl border sm:border-0 border-teal-200/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Token ID
            </span>
            <span className="font-mono text-xs sm:text-sm font-extrabold text-teal-700 bg-white px-2.5 py-1 rounded-lg border border-teal-200 inline-block mt-0.5 shadow-xs">
              {activeTicket.tokenId}
            </span>
          </div>
        </div>

        {/* Patient Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <User className="w-3 h-3 text-teal-600" /> Patient Name
            </span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block truncate">
              {activeTicket.patientName}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Phone className="w-3 h-3 text-teal-600" /> Mobile No.
            </span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">
              {activeTicket.patientPhone}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-teal-600" /> Appointment Date
            </span>
            <span className="font-bold text-teal-700 text-sm mt-0.5 block">
              {activeTicket.appointmentDate}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-teal-600" /> Session Slot
            </span>
            <span className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block truncate">
              {activeTicket.sessionSlot}
            </span>
          </div>
        </div>

        {/* Clinical Concern & Notes */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
            <Stethoscope className="w-3 h-3 text-teal-600" /> Primary Concern
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
          Your appointment enquiry has been recorded and submitted to our clinic desk. Our staff will review your request and contact you to confirm your consultation slot.
        </div>
      </div>

      {/* Patient Action Buttons */}
      <div className="mt-5 space-y-2.5 no-print">
        {/* Download Receipt Button */}
        <button
          onClick={handleDownloadReceipt}
          className="w-full py-3.5 px-4 rounded-xl btn-primary text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm active:scale-98 cursor-pointer"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Download Receipt (PDF / Print)</span>
        </button>

        {/* Optional WhatsApp Button (Preserved for future phase) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl border border-emerald-500 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4 fill-emerald-600 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>Share / Chat on WhatsApp (Optional)</span>
        </a>

        {/* Done / Close Button */}
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
