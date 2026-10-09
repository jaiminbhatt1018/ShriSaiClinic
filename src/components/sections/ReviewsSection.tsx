import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TESTIMONIALS } from '../../data/clinicData';
import { Testimonial } from '../../types';
import { withSectionWrapper } from '../../hoc/withSectionWrapper';
import { withCardHover } from '../../hoc/withCardHover';
import { Star, CheckCircle, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';

const ReviewCardBase: React.FC<{ item: Testimonial }> = ({ item }) => {
  return (
    <div className="medical-card p-4 sm:p-5 flex flex-col justify-between h-full bg-white border border-slate-200 rounded-2xl shadow-xs transition duration-200 hover:border-primary-300">
      <div>
        {/* Top: Star Rating & Condition Pill */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: item.stars }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary-50 text-primary-800 border border-primary-200">
            {item.badge}
          </span>
        </div>

        {/* Story Title */}
        <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base mb-1.5 line-clamp-1">
          {item.title}
        </h4>

        {/* Compact Review Quote */}
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 italic">
          "{item.review}"
        </p>
      </div>

      {/* Patient Signature Footer */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
          {item.initials}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1 truncate">
            <span>{item.name}</span>
            <CheckCircle className="w-3.5 h-3.5 text-primary-600 shrink-0" />
          </p>
          <p className="text-[10px] sm:text-xs text-primary-600 font-medium truncate">
            {item.condition}
          </p>
        </div>
      </div>
    </div>
  );
};

const ReviewCardWithHover = withCardHover(ReviewCardBase, { liftPx: -3 });

const ReviewsSectionBase: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return 300;
    const firstCard = trackRef.current.querySelector('.reviews-carousel-card') as HTMLElement;
    return firstCard ? firstCard.offsetWidth + 20 : 300; // 20px gap
  }, []);

  const updateCounter = useCallback(() => {
    if (!trackRef.current) return;
    const cardWidth = getCardWidth();
    const idx = Math.min(TESTIMONIALS.length - 1, Math.max(0, Math.round(trackRef.current.scrollLeft / cardWidth)));
    setCurrentIndex(idx);
  }, [getCardWidth]);

  const scrollStories = useCallback((direction: 'next' | 'prev') => {
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

  // Automatic scrolling ticker (4.5s)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      scrollStories('next');
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, scrollStories]);

  return (
    <div>
      {/* Top Header Controls */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <MessageSquareQuote className="w-4 h-4 text-primary-600" />
          <span>Verified Recoveries</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {currentIndex + 1} of {TESTIMONIALS.length}
          </span>
          <button
            onClick={() => scrollStories('prev')}
            className="p-2 rounded-xl bg-white hover:bg-primary-50 text-slate-700 hover:text-primary-700 border border-slate-200 shadow-xs transition active:scale-95 cursor-pointer"
            aria-label="Previous Story"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollStories('next')}
            className="p-2 rounded-xl bg-white hover:bg-primary-50 text-slate-700 hover:text-primary-700 border border-slate-200 shadow-xs transition active:scale-95 cursor-pointer"
            aria-label="Next Story"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Auto-Scrollable Carousel Track */}
      <div
        ref={trackRef}
        className="reviews-carousel-track"
        onScroll={updateCounter}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {TESTIMONIALS.map((item, idx) => (
          <div key={idx} className="reviews-carousel-card">
            <ReviewCardWithHover item={item} />
          </div>
        ))}
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToCard(idx)}
            className={
              idx === currentIndex
                ? 'w-5 h-1.5 rounded-full bg-primary-600 transition-all'
                : 'w-1.5 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer'
            }
            aria-label={`Jump to review ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const ReviewsSection = withSectionWrapper(ReviewsSectionBase, {
  id: 'testimonials',
  background: 'slate-50',
  badge: 'Patient Stories',
  title: 'What Our Patients Say About Shri Sai Clinic',
  subtitle: 'Read authentic recovery experiences from patients treated through classical homeopathy.',
  overflowHidden: true
});
