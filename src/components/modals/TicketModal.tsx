import React from 'react';
import { motion } from 'framer-motion';
import { useAppointment } from '../../context/AppointmentContext';
import { CLINIC_INFO } from '../../data/clinicData';
import { withModal } from '../../hoc/withModal';
import { Download, Sparkles } from 'lucide-react';

interface TicketModalContentProps {
  onClose: () => void;
}

const TicketModalContent: React.FC<TicketModalContentProps> = ({ onClose }) => {
  const { activeTicket, getWhatsAppShareUrl } = useAppointment();

  if (!activeTicket) return null;

  const whatsappUrl = getWhatsAppShareUrl(activeTicket);

  const handleDownloadReceipt = () => {
    document.body.classList.add('is-printing-receipt');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('is-printing-receipt');
    }, 1200);
  };

  return (
    <div className="text-center">
      {/* Print Stylesheet guaranteeing exactly 1 single printed receipt slip */}
      <style>{`
        @media print {
          @page {
            size: A5 portrait;
            margin: 8mm;
          }
          html, body {
            height: auto !important;
            min-height: 0 !important;
            max-height: 100% !important;
            overflow: visible !important;
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* Hide all app navigation, headers, and footers from print layout */
          header, main, footer, aside, #mobileMenu, .no-print, [role="dialog"] > button {
            display: none !important;
            height: 0 !important;
            overflow: hidden !important;
            visibility: hidden !important;
          }
          body * {
            visibility: hidden !important;
          }
          #printable-receipt-card, #printable-receipt-card * {
            visibility: visible !important;
          }
          #printable-receipt-card {
            position: relative !important;
            display: block !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 440px !important;
            margin: 0 auto !important;
            padding: 24px !important;
            border: 2px solid #0d9488 !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border-radius: 14px !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
            page-break-inside: avoid !important;
            break-after: avoid !important;
            break-before: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Compact Animated Success Icon & Heading */}
      <div className="no-print">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-2 shadow-sm"
        >
          <motion.svg
            className="w-7 h-7 text-emerald-600"
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
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>

        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
          Inquiry Submitted Successfully!
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Sent directly to Shri Sai Clinic desk via email.
        </p>
      </div>

      {/* Compact Clinic & Token Card (The Printable Receipt) */}
      <div
        id="printable-receipt-card"
        className="mt-3.5 border border-teal-200 rounded-2xl p-4 bg-teal-50/50 text-left space-y-3 shadow-xs"
      >
        {/* Clinic Info Header */}
        <div className="flex items-center gap-3 pb-2.5 border-b border-teal-200/70">
          <div className="w-10 h-10 rounded-xl bg-white p-1 border border-teal-200 shadow-xs shrink-0 flex items-center justify-center">
            <img
              src="/assets/images/logo.png"
              alt="Shri Sai Clinic Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-heading font-extrabold text-base text-slate-900 tracking-tight leading-snug">
              {CLINIC_INFO.name}
            </h4>
            <p className="text-xs font-semibold text-teal-700 leading-tight">
              {CLINIC_INFO.doctor} ({CLINIC_INFO.qualifications.split('•')[0].trim()})
            </p>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">
              Samrudhi Complex, Vansda, Gujarat &bull; +91 90545 20603
            </p>
          </div>
        </div>

        {/* Token Number Box (Prominent) */}
        <div className="bg-white rounded-xl p-3 border border-teal-200 shadow-xs text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
            Official Consultation Token
          </span>
          <div className="font-heading font-extrabold text-2xl text-teal-600 tracking-tight my-0.5">
            #{activeTicket.tokenId}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <Sparkles className="w-3 h-3 text-emerald-600" /> Confirmed Inquiry
          </span>
        </div>

        {/* OPD Note */}
        <p className="text-[10px] text-slate-500 text-center leading-normal">
          Present this token at clinic reception or quote it on phone/WhatsApp inquiry.
        </p>
      </div>

      {/* Patient Action Buttons (Immediately Visible on mobile without scrolling!) */}
      <div className="mt-4 space-y-2 no-print">
        {/* Download Receipt Button */}
        <button
          onClick={handleDownloadReceipt}
          className="w-full py-3 px-4 rounded-xl btn-primary text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm active:scale-98 cursor-pointer"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Download Receipt (PDF / Print)</span>
        </button>

        {/* Optional WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl border border-emerald-500 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4 fill-emerald-600 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>Share on WhatsApp (Optional)</span>
        </a>

        {/* Close Button */}
        <div className="pt-0.5">
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

const WrappedTicketModal = withModal(TicketModalContent, { maxWidthClass: 'max-w-md' });

export const TicketModal: React.FC = () => {
  const { activeTicket, closeTicket } = useAppointment();

  return (
    <WrappedTicketModal
      isOpen={!!activeTicket}
      onClose={closeTicket}
    />
  );
};
