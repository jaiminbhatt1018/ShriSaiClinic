import React from 'react';
import { TESTIMONIALS } from '../../data/clinicData';
import { Testimonial } from '../../types';
import { withSectionWrapper } from '../../hoc/withSectionWrapper';
import { withCardHover } from '../../hoc/withCardHover';
import { Star, CheckCircle } from 'lucide-react';

const ReviewCardBase: React.FC<{ item: Testimonial }> = ({ item }) => {
  return (
    <div className="medical-card p-6 sm:p-8 flex flex-col justify-between h-full bg-white border border-slate-200 rounded-3xl shadow-xs">
      <div>
        {/* Rating Stars & Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: item.stars }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary-50 text-primary-800 border border-primary-200">
            {item.badge}
          </span>
        </div>

        <h4 className="font-heading font-bold text-slate-900 text-lg mb-2">
          {item.title}
        </h4>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {item.review}
        </p>
      </div>

      {/* Patient Avatar Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-sm shadow-xs">
          {item.initials}
        </div>
        <div>
          <p className="font-bold text-sm text-slate-900 flex items-center gap-1">
            <span>{item.name}</span>
            <CheckCircle className="w-3.5 h-3.5 text-primary-600" />
          </p>
          <p className="text-xs text-primary-600 font-medium">
            {item.condition}
          </p>
        </div>
      </div>
    </div>
  );
};

const ReviewCardWithHover = withCardHover(ReviewCardBase, { liftPx: -4 });

const ReviewsSectionBase: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {TESTIMONIALS.map((item, idx) => (
        <ReviewCardWithHover key={idx} item={item} />
      ))}
    </div>
  );
};

export const ReviewsSection = withSectionWrapper(ReviewsSectionBase, {
  id: 'testimonials',
  background: 'slate-50',
  badge: 'Patient Stories',
  title: 'What Our Patients Say About Shri Sai Clinic',
  subtitle: 'Read authentic testimonials from patients who recovered from stubborn chronic conditions.'
});
