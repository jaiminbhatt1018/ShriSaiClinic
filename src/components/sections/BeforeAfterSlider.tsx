import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppointment } from '../../context/AppointmentContext';
import { CLINICAL_CASES } from '../../data/clinicData';
import { withSectionWrapper } from '../../hoc/withSectionWrapper';
import { 
  ChevronsLeftRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  CalendarCheck, 
  Info 
} from 'lucide-react';

const BeforeAfterSliderBase: React.FC = () => {
  const { openBooking } = useAppointment();
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CLINICAL_CASES[currentCaseIndex];

  const prevCase = useCallback(() => {
    setCurrentCaseIndex((prev) => (prev === 0 ? CLINICAL_CASES.length - 1 : prev - 1));
    setSliderPos(50);
  }, []);

  const nextCase = useCallback(() => {
    setCurrentCaseIndex((prev) => (prev === CLINICAL_CASES.length - 1 ? 0 : prev + 1));
    setSliderPos(50);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        prevCase();
      } else if (e.key === 'ArrowRight') {
        nextCase();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevCase, nextCase]);

  // Automatic scrolling ticker (4.5s)
  useEffect(() => {
    if (isPaused || isDragging) return;
    const timer = setInterval(() => {
      nextCase();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, isDragging, nextCase]);

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const positionX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (positionX / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-md"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        
        {/* Left Column: Interactive Slider Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div
            ref={containerRef}
            className="before-after-container"
            style={{ 
              aspectRatio: activeCase.aspectRatio || '600 / 675',
              '--slider-pos': `${sliderPos}%`
            } as React.CSSProperties}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Badges */}
            <span className="slider-badge-before">Before</span>
            <span className="slider-badge-after">After</span>

            {/* Base Image (After) */}
            <picture key={`after-pic-${activeCase.id}`} className="contents">
              <source srcSet={activeCase.afterImg.replace(/\.(jpg|jpeg|png)$/, '.webp')} type="image/webp" />
              <img
                key={`after-img-${activeCase.id}`}
                src={activeCase.afterImg}
                alt={`Clinical Recovery After Treatment - ${activeCase.title} by Dr. Jaykumar Bhatt at Shree Sai Clinic`}
                width={600}
                height={675}
                loading="lazy"
                decoding="async"
                className="before-after-img after-layer"
              />
            </picture>

            {/* Clipped Overlay Image (Before) */}
            <picture key={`before-pic-${activeCase.id}`} className="contents">
              <source srcSet={activeCase.beforeImg.replace(/\.(jpg|jpeg|png)$/, '.webp')} type="image/webp" />
              <img
                key={`before-img-${activeCase.id}`}
                src={activeCase.beforeImg}
                alt={`Clinical Presentation Before Treatment - ${activeCase.title} - Shree Sai Clinic`}
                width={600}
                height={675}
                loading="lazy"
                decoding="async"
                className="before-after-img before-layer"
              />
            </picture>

            {/* Draggable Divider Handle */}

            <div
              className="before-after-divider"
              style={{ left: `${sliderPos}%` }}
            >
              <div
                className="before-after-handle"
                aria-label="Slide handle to compare before and after"
              >
                <ChevronsLeftRight className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Accessible Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(parseFloat(e.target.value))}
              className="before-after-range"
              aria-label="Before and after slider position"
            />
          </div>

          {/* Slider Controls & Carousel Dots */}
          <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-primary-600 shrink-0" />
              <span>Drag divider left/right</span>
            </span>

            {/* Carousel Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevCase}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-primary-50 text-slate-600 hover:text-primary-700 transition cursor-pointer"
                title="Previous Case (Left Arrow)"
                aria-label="Previous Case"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 px-1.5">
                {CLINICAL_CASES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentCaseIndex(idx);
                      setSliderPos(50);
                    }}
                    className={`carousel-dot ${idx === currentCaseIndex ? 'active' : ''}`}
                    aria-label={`Jump to case ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextCase}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-primary-50 text-slate-600 hover:text-primary-700 transition cursor-pointer"
                title="Next Case (Right Arrow)"
                aria-label="Next Case"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Case Clinical Details (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            {/* Top Row: Category */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                {activeCase.category}
              </span>
            </div>

            {/* Main Case Title */}
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 mt-2.5 sm:mt-3">
              {activeCase.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5 sm:mt-2 whitespace-pre-line">
              {activeCase.description}
            </p>

            {/* 3-Box Clinical Metric Facts */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3.5 sm:mt-4 text-center">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 sm:p-2.5">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Duration
                </span>
                <span className="font-heading font-bold text-xs text-slate-900 mt-0.5 block truncate">
                  {activeCase.duration}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 sm:p-2.5">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Method
                </span>
                <span className="font-heading font-bold text-xs text-primary-700 mt-0.5 block truncate">
                  {activeCase.method}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 sm:p-2.5">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Outcome
                </span>
                <span className="font-heading font-bold text-xs text-emerald-600 mt-0.5 block truncate">
                  {activeCase.recovery}
                </span>
              </div>
            </div>

            {/* Clinical Highlights */}
            <div className="space-y-1.5 mt-4 text-xs text-slate-700">
              {activeCase.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => openBooking(activeCase.bookingSubject)}
              className="w-full py-3 rounded-xl btn-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>Consult for This Condition</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export const BeforeAfterSlider = withSectionWrapper(BeforeAfterSliderBase, {
  id: 'clinical-results',
  background: 'slate-50',
  badge: 'Clinical Case Studies',
  title: 'Proven Homeopathic Recovery',
  subtitle: 'Real patient results and long-term healing journeys led by Dr. Jaykumar Bhatt.'
});

