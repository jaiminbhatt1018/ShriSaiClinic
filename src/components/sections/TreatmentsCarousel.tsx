import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppointment } from '../../context/AppointmentContext';
import { SERVICES } from '../../data/clinicData';
import { ServiceItem } from '../../types';
import { withSectionWrapper } from '../../hoc/withSectionWrapper';
import { withCardHover } from '../../hoc/withCardHover';
import { 
  Sparkles, 
  ShieldAlert, 
  Sun, 
  Feather, 
  Wind, 
  Heart, 
  Activity, 
  Baby, 
  ArrowRight, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  MousePointer 
} from 'lucide-react';

const ServiceIconMap: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  ShieldAlert,
  Sun,
  Feather,
  Wind,
  Heart,
  Activity,
  Baby
};

interface ServiceCardProps {
  service: ServiceItem;
  onBook: (subject: string) => void;
}

const ServiceCardBase: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const IconComponent = ServiceIconMap[service.iconName] || Activity;

  return (
    <div className="medical-card p-6 sm:p-7 flex flex-col justify-between h-full bg-white border border-slate-200 rounded-3xl shadow-xs hover:border-primary-300 transition duration-300">
      <div>
        {/* Icon & Badge */}
        <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 border border-primary-200">
          <IconComponent className="w-6 h-6" />
        </div>

        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-bold text-xl text-slate-900">
            {service.title}
          </h3>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800 font-bold shrink-0">
            {service.departmentBadge}
          </span>
        </div>

        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Clinical Bullets */}
        <ul className="text-xs text-slate-600 space-y-1.5 mb-6">
          {service.bulletPoints.map((bullet, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-primary-600 shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Book Care Button */}
      <button
        onClick={() => onBook(service.bookingSubject)}
        className="w-full py-2.5 rounded-xl btn-secondary text-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
      >
        <span>Book Consultation</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

const ServiceCardWithHover = withCardHover(ServiceCardBase, { liftPx: -4 });

export const TreatmentsCarouselBase: React.FC = () => {
  const { openBooking } = useAppointment();
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return 320;
    const firstCard = trackRef.current.querySelector('.service-carousel-card') as HTMLElement;
    return firstCard ? firstCard.offsetWidth + 24 : 320; // 24px is gap-6
  }, []);

  const updateCounter = useCallback(() => {
    if (!trackRef.current) return;
    const cardWidth = getCardWidth();
    const idx = Math.min(SERVICES.length - 1, Math.max(0, Math.round(trackRef.current.scrollLeft / cardWidth)));
    setCurrentIndex(idx);
  }, [getCardWidth]);

  const scrollServices = useCallback((direction: 'next' | 'prev') => {
    if (!trackRef.current) return;
    const cardWidth = getCardWidth();
    const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;

    if (direction === 'next') {
      if (trackRef.current.scrollLeft >= maxScroll - 15) {
        trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        trackRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    } else {
      if (trackRef.current.scrollLeft <= 15) {
        trackRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        trackRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    }
  }, [getCardWidth]);

  const scrollToCard = (index: number) => {
    if (!trackRef.current) return;
    const cardWidth = getCardWidth();
    trackRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  };

  // Auto-scroll ticker
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      scrollServices('next');
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused, scrollServices]);

  return (
    <div>
      {/* Top Controls Row */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">
          {currentIndex + 1} of {SERVICES.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollServices('prev')}
            className="p-2.5 rounded-xl bg-white hover:bg-primary-50 text-slate-700 hover:text-primary-700 border border-slate-200 shadow-xs transition active:scale-95 cursor-pointer"
            title="Previous Specialty"
            aria-label="Previous Specialty"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollServices('next')}
            className="p-2.5 rounded-xl bg-white hover:bg-primary-50 text-slate-700 hover:text-primary-700 border border-slate-200 shadow-xs transition active:scale-95 cursor-pointer"
            title="Next Specialty"
            aria-label="Next Specialty"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Auto-Scrollable Carousel Track */}
      <div
        ref={trackRef}
        className="services-carousel-track"
        onScroll={updateCounter}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {SERVICES.map((service) => (
          <div key={service.id} className="service-carousel-card">
            <ServiceCardWithHover
              service={service}
              onBook={(sub) => openBooking(sub)}
            />
          </div>
        ))}
      </div>

      {/* Bottom Progress Indicator Dots */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200/60">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <MousePointer className="w-3.5 h-3.5 text-primary-600" />
          <span>Swipe or click arrows to explore all {SERVICES.length} clinical departments</span>
        </div>

        <div className="flex items-center gap-1.5">
          {SERVICES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={
                idx === currentIndex
                  ? 'w-5 h-2 rounded-full bg-primary-600 transition-all'
                  : 'w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer'
              }
              aria-label={`Jump to specialty ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const TreatmentsCarousel = withSectionWrapper(TreatmentsCarouselBase, {
  id: 'services',
  background: 'white',
  badge: 'Clinical Departments',
  title: 'Specialized Homoeopathy & Advanced Skin Therapies',
  subtitle: 'Every individual is biochemically unique. We prescribe remedies based on your constitution and underlying pathology to deliver lasting relief without suppressing symptoms.',
  overflowHidden: true
});
