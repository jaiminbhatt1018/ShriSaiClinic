import React from 'react';
import { CLINIC_INFO } from '../../data/clinicData';
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Clinic Overview & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 p-1 flex items-center justify-center shrink-0 shadow-sm border border-white/10">
                <img
                  src="/assets/images/logo.png"
                  alt="Shri Sai Clinic Logo"
                  className="w-full h-full object-contain filter drop-shadow-xs"
                />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                {CLINIC_INFO.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dr. Jay Bhatt (BHMS) provides pure classical constitutional homeopathy and clinical dermatological therapies for deep-rooted pathology and lasting cure.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Non-Steroidal Classical Care</span>
            </div>
          </div>

          {/* Column 2: OPD Hours */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-400" />
              <span>OPD Visiting Hours</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              {CLINIC_INFO.opdHours.map((slot, idx) => (
                <div key={idx} className="pb-1.5 border-b border-slate-800/80">
                  <p className="text-slate-300 font-medium">{slot.label}</p>
                  <p className="text-primary-300 font-bold">{slot.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#clinical-results" className="hover:text-primary-400 transition">
                  Clinical Before &amp; After Cases
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary-400 transition">
                  Specialized Treatments Carousel
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary-400 transition">
                  Verified Patient Testimonials
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-primary-400 transition">
                  Book Consultation Slot
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-primary-400 transition">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Google Maps */}
          <div className="space-y-3.5">
            <h4 className="font-heading font-bold text-white text-sm">
              Clinic Contact &amp; Reach
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                <p className="leading-snug">{CLINIC_INFO.address}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href={CLINIC_INFO.phoneTel} className="hover:text-white font-semibold transition">
                  {CLINIC_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white transition">
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CLINIC_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-primary-300 text-xs font-semibold border border-slate-700 transition"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {CLINIC_INFO.name}. All Rights Reserved. Vansda, Gujarat.
          </p>
          <p className="italic text-[11px] text-slate-500">
            Dr. Jay Bhatt (BHMS) &bull; Classical Homoeopathy &bull; General Physician
          </p>
        </div>

      </div>
    </footer>
  );
};
