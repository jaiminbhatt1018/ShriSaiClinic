import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppointment } from '../../context/AppointmentContext';
import { SERVICES } from '../../data/clinicData';
import { ServiceItem } from '../../types';
import { withSectionWrapper } from '../../hoc/withSectionWrapper';
import { withCardHover } from '../../hoc/withCardHover';
import { 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck,
  Sun, 
  Feather, 
  Wind, 
  Heart, 
  Activity, 
  Baby, 
  Flower2,
  ArrowRight, 
  Check, 
  MousePointer 
} from 'lucide-react';

const FaceGlowIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" />
    <path d="M9 11h.01" />
    <path d="M15 11h.01" />
    <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
    <path d="M19 4v2" />
    <path d="M20 5h-2" />
    <path d="M4 19v2" />
    <path d="M5 20H3" />
    <path d="M20 18v2" />
    <path d="M21 19h-2" />
  </svg>
);

const ServiceIconMap: Record<string, React.FC<{ className?: string }>> = {
  FaceGlow: FaceGlowIcon,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Feather,
  Flower2,
  Wind,
  Heart,
  Activity,
  Baby
};

interface ServiceCardProps {
  service: ServiceItem;
  onBook: (subject: string) => void;
  globalSlideTick?: number;
}

const ServiceCardBase: React.FC<ServiceCardProps> = ({ service, onBook, globalSlideTick = 0 }) => {
  const IconComponent = ServiceIconMap[service.iconName] || Activity;
  const isWomenHealth = service.departmentBadge.toLowerCase().includes('women') || service.id === 'pcod';
  const hasSlides = Boolean(service.slides && service.slides.length > 0);
  const numSlides = service.slides?.length || 1;

  const [manualSlideIndex, setManualSlideIndex] = useState<number | null>(null);

  // Synchronize with global ticker: reset manual override when next global tick arrives
  useEffect(() => {
    setManualSlideIndex(null);
  }, [globalSlideTick]);

  const currentSlideIndex = manualSlideIndex !== null ? manualSlideIndex : (globalSlideTick % numSlides);

  // Immersive Mayo Clinic-style card with rotating background imagery and text overlay
  if (hasSlides && service.slides) {
    return (
      <div
        className={`medical-card relative flex flex-col justify-between h-full rounded-3xl overflow-hidden shadow-xs border ${
          isWomenHealth ? 'border-pink-200/80 hover:border-pink-400' : 'border-slate-200 hover:border-primary-300'
        } group transition-all duration-300 min-h-[420px] bg-slate-50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Layer 1: 5s Rotating Background Images (Bright and clearly visible) */}
        <div className="absolute inset-0 overflow-hidden bg-slate-100">
          {service.slides.map((slide, idx) => (
            <img
              key={idx}
              src={slide.image}
              alt={slide.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                idx === currentSlideIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
              loading="lazy"
            />
          ))}

        </div>

        {/* Layer 3: Interactive & Content Layer overlaid on image with black font */}
        <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full text-slate-900">
          {/* Top Row: Disease Name (left) & Chronic Care Badge + 5s Dots (right) */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight drop-shadow-2xs">
              {service.title}
            </h3>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-extrabold shadow-2xs backdrop-blur-sm ${
                isWomenHealth
                  ? 'bg-pink-100 text-pink-700 border border-pink-200'
                  : 'bg-primary-100 text-primary-800 border border-primary-200/80'
              }`}>
                {service.departmentBadge}
              </span>

              {/* 5-second progress indicators */}
              <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md px-2 py-1 rounded-full border border-slate-200/90 shadow-2xs">
                {service.slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setManualSlideIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentSlideIndex
                        ? isWomenHealth ? 'w-4 bg-pink-500 shadow-xs' : 'w-4 bg-primary-600 shadow-xs'
                        : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Switch to slide ${idx + 1}`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Area: Book Consultation CTA */}
          <div>
            {/* Book Consultation Button (Black font on crisp white) */}
            <button
              onClick={() => onBook(service.bookingSubject)}
              className={`w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95 bg-white/95 hover:bg-white text-slate-900 ${
                isWomenHealth ? 'hover:text-pink-700 hover:border-pink-300' : 'hover:text-primary-700'
              } font-bold shadow-xs border border-slate-300/90`}
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`medical-card p-6 sm:p-7 flex flex-col justify-between h-full bg-white border ${
      isWomenHealth ? 'border-pink-200/80 hover:border-pink-400' : 'border-slate-200 hover:border-primary-300'
    } rounded-3xl shadow-xs transition duration-300`}>
      <div>
        {/* Icon & Badge */}
        <div className={`w-12 h-12 rounded-xl ${
          isWomenHealth ? 'bg-pink-50 text-pink-500 border-pink-200' : 'bg-primary-50 text-primary-600 border-primary-200'
        } flex items-center justify-center mb-4 border`}>
          <IconComponent className="w-6 h-6" />
        </div>

        <div className="flex items-center justify-between mb-2 gap-2">
          <h3 className="font-heading font-bold text-xl text-slate-900">
            {service.title}
          </h3>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold shrink-0 ${
            isWomenHealth 
              ? 'bg-pink-50 text-pink-600 border border-pink-200 shadow-xs' 
              : 'bg-primary-100 text-primary-800'
          }`}>
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
              <Check className={`w-3.5 h-3.5 shrink-0 ${isWomenHealth ? 'text-pink-500' : 'text-primary-600'}`} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Book Care Button */}
      <button
        onClick={() => onBook(service.bookingSubject)}
        className={`w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95 ${
          isWomenHealth 
            ? 'bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-300 font-bold' 
            : 'btn-secondary'
        }`}
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
  const [globalSlideTick, setGlobalSlideTick] = useState(0);

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

  // Unified Synchronized Timer:
  // - Every 5 seconds: All cards simultaneously flip to their next image
  // - Every 10 seconds (every 2nd tick): The cards track smoothly advances
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setGlobalSlideTick((prevTick) => {
        const nextTick = prevTick + 1;
        // On every 2nd tick (10s), advance to next card
        if (nextTick % 2 === 0) {
          scrollServices('next');
        }
        return nextTick;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, scrollServices]);

  return (
    <div>
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
              globalSlideTick={globalSlideTick}
            />
          </div>
        ))}
      </div>

      {/* Bottom Progress Indicator Dots */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-200/60">
        <div className="flex items-center gap-2 text-xs text-slate-500 text-center sm:text-left">
          <MousePointer className="w-3.5 h-3.5 text-primary-600 shrink-0" />
          <span>Auto-advances every 10s &bull; Swipe or click dots to explore all {SERVICES.length} clinical departments</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {SERVICES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={
                idx === currentIndex
                  ? 'w-6 h-2 rounded-full bg-primary-600 transition-all duration-300'
                  : 'w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all duration-300 cursor-pointer'
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
  title: 'Specialized Clinical Departments',
  subtitle: 'Individualized constitutional homeopathic care adhering to official Homoeopathic Pharmacopoeia of India standards.',
  overflowHidden: true
});

