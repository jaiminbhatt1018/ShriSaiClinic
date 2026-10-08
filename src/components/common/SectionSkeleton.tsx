import React from 'react';

export const SectionSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Skeleton Header */}
      <div className="max-w-md mx-auto text-center space-y-3 mb-10">
        <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto" />
        <div className="h-9 w-3/4 bg-slate-200 rounded-2xl mx-auto" />
        <div className="h-4 w-5/6 bg-slate-100 rounded-lg mx-auto" />
      </div>

      {/* Skeleton Content Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${rows} gap-6`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-64 bg-slate-100 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-200" />
              <div className="h-5 w-2/3 bg-slate-200 rounded-md" />
              <div className="h-3.5 w-full bg-slate-200/80 rounded" />
              <div className="h-3.5 w-4/5 bg-slate-200/80 rounded" />
            </div>
            <div className="h-10 w-full bg-slate-200 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};
