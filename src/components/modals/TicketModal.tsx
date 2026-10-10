import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppointment } from '../../context/AppointmentContext';
import { CLINIC_INFO } from '../../data/clinicData';
import { withModal } from '../../hoc/withModal';
import { Download, Sparkles, Printer, Loader2 } from 'lucide-react';
import {
  downloadReceiptImage,
  printReceiptSinglePage,
  shareReceiptImageToWhatsApp,
} from '../../utils/receiptGenerator';

interface TicketModalContentProps {
  onClose: () => void;
}

const TicketModalContent: React.FC<TicketModalContentProps> = ({ onClose }) => {
  const { activeTicket, getWhatsAppShareUrl } = useAppointment();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!activeTicket) return null;

  const whatsappFallbackUrl = getWhatsAppShareUrl(activeTicket);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadReceiptImage(activeTicket);
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = async () => {
    try {
      setIsPrinting(true);
      await printReceiptSinglePage(activeTicket);
    } catch (err) {
      console.error('Print preview failed', err);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleShareToWhatsApp = async () => {
    try {
      setIsSharing(true);
      const res = await shareReceiptImageToWhatsApp(activeTicket, whatsappFallbackUrl);
      if (res.message) {
        setToastMessage(res.message);
        setTimeout(() => setToastMessage(null), 5000);
      }
    } catch (err) {
      console.error('WhatsApp share failed', err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="text-center">
      {/* Toast Feedback for Desktop Copy/Download */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-3 p-2.5 rounded-xl bg-teal-50 border border-teal-300 text-teal-900 text-xs font-semibold shadow-sm text-left flex items-center gap-2"
        >
          <span className="text-teal-600">📋</span>
          <span className="leading-snug">{toastMessage}</span>
        </motion.div>
      )}

      {/* Compact Animated Success Icon & Heading */}
      <div>
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

      {/* Compact Clinic & Token Card (Prominently displayed) */}
      <div className="mt-3.5 border border-teal-200 rounded-2xl p-3.5 bg-teal-50/50 text-left space-y-2.5 shadow-xs">
        {/* Clinic Info Header */}
        <div className="flex items-center gap-3 pb-2 border-b border-teal-200/70">
          <div className="w-9 h-9 rounded-xl bg-white p-1 border border-teal-200 shadow-xs shrink-0 flex items-center justify-center">
            <img
              src="/assets/images/logo.png"
              alt="Shri Sai Clinic Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-snug">
              {CLINIC_INFO.name}
            </h4>
            <p className="text-[11px] font-semibold text-teal-700 leading-tight">
              {CLINIC_INFO.doctor} ({CLINIC_INFO.qualifications.split('•')[0].trim()})
            </p>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">
              Samrudhi Complex, Vansda, Gujarat &bull; +91 76002 39816
            </p>
          </div>
        </div>

        {/* Token Number Box */}
        <div className="bg-white rounded-xl p-2.5 border border-teal-200 shadow-xs text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
            Official Consultation Token
          </span>
          <div className="font-heading font-extrabold text-2xl text-teal-600 tracking-tight my-0.5">
            #{activeTicket.tokenId}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <Sparkles className="w-3 h-3 text-emerald-600" /> Confirmed Inquiry
          </span>
        </div>

        {/* OPD Note */}
        <p className="text-[10px] text-slate-500 text-center leading-normal">
          Present this token at clinic reception or quote it on phone/WhatsApp inquiry.
        </p>
      </div>

      {/* Action Buttons (Immediately visible without scrolling on mobile) */}
      <div className="mt-3.5 space-y-2">
        {/* 1. Download Receipt Slip (Guaranteed 1-Page Image Card) */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full py-2.5 px-4 rounded-xl btn-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm active:scale-98 cursor-pointer disabled:opacity-75"
        >
          {isDownloading ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Download className="w-4 h-4 text-white" />
          )}
          <span>Download Receipt Slip</span>
        </button>

        {/* Secondary: Print / Save PDF slip */}
        <div className="text-center">
          <button
            type="button"
            onClick={handlePrint}
            disabled={isPrinting}
            className="text-[11px] font-medium text-teal-700 hover:text-teal-900 transition inline-flex items-center gap-1 cursor-pointer"
          >
            {isPrinting ? (
              <Loader2 className="w-3 h-3 animate-spin text-teal-600" />
            ) : (
              <Printer className="w-3 h-3 text-teal-600" />
            )}
            <span>or Print / Save as PDF</span>
          </button>
        </div>

        {/* 2. Direct WhatsApp Image Share Button */}
        <button
          type="button"
          onClick={handleShareToWhatsApp}
          disabled={isSharing}
          className="w-full py-2.5 px-4 rounded-xl border border-emerald-500 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs active:scale-98 cursor-pointer disabled:opacity-75"
        >
          {isSharing ? (
            <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
          ) : (
            <svg className="w-4 h-4 fill-emerald-600 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          )}
          <span>Send Receipt Image to WhatsApp</span>
        </button>

        {/* Close Button */}
        <div className="pt-0.5">
          <button
            type="button"
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
