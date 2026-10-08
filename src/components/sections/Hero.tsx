import React from 'react';
import { useAppointment } from '../../context/AppointmentContext';
import { CLINIC_INFO } from '../../data/clinicData';
import { 
  ShieldCheck, 
  Award, 
  CalendarPlus, 
  Compass, 
  Check, 
  BadgeCheck, 
  Star 
} from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { openBooking } = useAppointment();

  return (
    <section id="home" className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20 border-b border-slate-200">
      
      {/* Subtle Background Radial Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-3xl pointer-events-none opacity-40 -z-10"
        style={{
          background: 'radial-gradient(circle, var(--color-primary-100) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Verified Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-800 border border-primary-200 text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
              <span>Holistic Clinical Healing &bull; Vansda, Gujarat</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Gentle Healing,{' '}
              <span className="text-primary-600 block sm:inline">
                Lasting Relief
              </span>{' '}
              Through Scientific Homoeopathy
            </h1>

            {/* Subheadline with Doctor Identity */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Led by <span className="font-bold text-slate-800">{CLINIC_INFO.doctor} ({CLINIC_INFO.qualifications.split('•')[0].trim()})</span>, General Physician. Personalized constitutional treatment for stubborn skin ailments, chronic hair fall, and deep pathology — completely free from steroid side effects.
            </p>

            {/* Two Key Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm font-bold text-slate-800 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-primary-600 shrink-0" />
                <span>Zero Side Effects</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-xs">
                <Award className="w-4 h-4 text-primary-600 shrink-0" />
                <span>Safe for All Ages</span>
              </div>
            </div>

            {/* Hero Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => openBooking('General Consultation')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl btn-primary text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarPlus className="w-5 h-5 text-white" />
                <span>Request Consultation</span>
              </button>
              
              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-4 rounded-xl btn-secondary text-base flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5 text-primary-600" />
                <span>Explore Treatments</span>
              </a>
            </div>

            {/* Doctor Availability Footer Note */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500 pt-2">
              <BadgeCheck className="w-4 h-4 text-primary-600 shrink-0" />
              <span>Walk-ins welcome &bull; Priority for booked appointments &bull; In-Clinic &amp; Video Consultations</span>
            </div>

          </div>

          {/* Right Doctor Identity Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-3xl p-3 bg-slate-100 shadow-xl border border-slate-200">
                
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-200">
                  {/* Authentic Clinical Doctor Photo */}
                  <img
                    src="/assets/images/dr-jay-bhatt.jpeg"
                    alt={`${CLINIC_INFO.doctor} - General Physician & Classical Homoeopath`}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Bottom Caption inside photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-600 text-white mb-1.5 shadow-xs">
                      <Check className="w-3 h-3 text-white" /> Verified Medical Practitioner
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-white">
                      {CLINIC_INFO.doctor}
                    </h3>
                    <p className="text-xs text-slate-200">
                      {CLINIC_INFO.qualifications}
                    </p>
                  </div>
                </div>

                {/* Floating Badge 1: Experience (Left-Center) with gentle Motion Float */}
                <motion.div
                  className="absolute top-1/2 -left-6 -translate-y-1/2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-2.5 z-10"
                  animate={{ y: [-2, 4, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {CLINIC_INFO.stats.yearsExperience}+ Years
                    </p>
                    <p className="text-[10px] text-slate-500">Clinical Practice</p>
                  </div>
                </motion.div>

                {/* Floating Badge 2: Happy Patients (Bottom-Right) with gentle Motion Float */}
                <motion.div
                  className="absolute -bottom-5 right-6 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-2.5 z-10"
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div className="border-l border-slate-200 pl-2">
                    <p className="text-xs font-bold text-slate-900">
                      {CLINIC_INFO.stats.treatedPatients.toLocaleString()}+ Patients
                    </p>
                    <p className="text-[10px] text-primary-600 font-semibold">
                      {CLINIC_INFO.stats.reliefRate}% Satisfaction
                    </p>
                  </div>
                </motion.div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
