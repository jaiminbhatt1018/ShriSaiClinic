import React, { lazy, Suspense } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Hero } from '../components/sections/Hero';
import { StatsBanner } from '../components/sections/StatsBanner';
import { SectionSkeleton } from '../components/common/SectionSkeleton';


// Code Splitting with React.lazy
const BeforeAfterSlider = lazy(() =>
  import('../components/sections/BeforeAfterSlider').then((module) => ({
    default: module.BeforeAfterSlider
  }))
);

const TreatmentsCarousel = lazy(() =>
  import('../components/sections/TreatmentsCarousel').then((module) => ({
    default: module.TreatmentsCarousel
  }))
);

const ReviewsSection = lazy(() =>
  import('../components/sections/ReviewsSection').then((module) => ({
    default: module.ReviewsSection
  }))
);

const AppointmentSection = lazy(() =>
  import('../components/sections/AppointmentSection').then((module) => ({
    default: module.AppointmentSection
  }))
);

const FaqSection = lazy(() =>
  import('../components/sections/FaqSection').then((module) => ({
    default: module.FaqSection
  }))
);

export const HomePage: React.FC = () => {
  return (
    <div className="flex-grow">
      {/* Dynamic SEO Meta & Structured Data */}
      <SEOHead />

      {/* 1. Hero Showcase (Eagerly Loaded) */}

      <Hero />

      {/* 2. Micro-Animated Stats Banner (Eagerly Loaded) */}
      <StatsBanner />

      {/* 3. Clinical Results Before & After Slider (Lazy Loaded) */}
      <Suspense fallback={<SectionSkeleton rows={2} />}>
        <BeforeAfterSlider />
      </Suspense>

      {/* 4. Specialized Homoeopathy Treatments Carousel (Lazy Loaded) */}
      <Suspense fallback={<SectionSkeleton rows={3} />}>
        <TreatmentsCarousel />
      </Suspense>

      {/* 5. Patient Testimonials & Stories (Lazy Loaded) */}
      <Suspense fallback={<SectionSkeleton rows={3} />}>
        <ReviewsSection />
      </Suspense>

      {/* 6. OPD Hours & Instant Token Generator (Lazy Loaded) */}
      <Suspense fallback={<SectionSkeleton rows={2} />}>
        <AppointmentSection />
      </Suspense>

      {/* 7. Frequently Asked Questions Accordion (Lazy Loaded) */}
      <Suspense fallback={<SectionSkeleton rows={1} />}>
        <FaqSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
