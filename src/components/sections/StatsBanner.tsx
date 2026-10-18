import React, { useEffect, useState, useRef } from 'react';
import { CLINIC_INFO } from '../../data/clinicData';
import { Clock, Users, Layers, ShieldCheck } from 'lucide-react';
import { motion, useInView } from 'motion/react';

function useCounter(target: number, isVisible: boolean, duration: number = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(ease * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    const reqId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(reqId);
  }, [target, isVisible, duration]);

  return count;
}

export const StatsBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const years = useCounter(CLINIC_INFO.stats.yearsExperience, isInView);
  const patients = useCounter(CLINIC_INFO.stats.treatedPatients, isInView);
  const departments = useCounter(CLINIC_INFO.stats.clinicalDepartments, isInView);

  return (
    <section id="stats-section" ref={ref} className="border-b border-slate-200 bg-white py-8 sm:py-10 shadow-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center lg:divide-x divide-slate-100">
          
          {/* Stat 1: Years */}
          <motion.div
            className="space-y-1.5 pt-2 sm:pt-4 lg:pt-0"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-2 border border-primary-100">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              <span>{Math.round(years)}</span>+
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
              Years Clinical Practice
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Classical Homeopathy Foundation</p>
          </motion.div>

          {/* Stat 2: Patients */}
          <motion.div
            className="space-y-1.5 pt-2 sm:pt-4 lg:pt-0"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-2 border border-primary-100">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              <span>{Math.round(patients).toLocaleString()}</span>+
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
              Treated Patients
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Skin, Hair &amp; Chronic Ailments</p>
          </motion.div>

          {/* Stat 3: Clinical Departments */}
          <motion.div
            className="space-y-1.5 pt-2 sm:pt-4 lg:pt-0"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-2 border border-primary-100">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              <span>{Math.round(departments)}</span>
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
              Specialized Departments
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Skin, Hair, Respiratory &amp; Chronic Care</p>
          </motion.div>

          {/* Stat 4: HPI Standards */}
          <motion.div
            className="space-y-1.5 pt-2 sm:pt-4 lg:pt-0"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-2 border border-primary-100">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              HPI
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
              Pharmacopoeia Standard
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Non-Steroidal Micro-Dose Remedies</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
