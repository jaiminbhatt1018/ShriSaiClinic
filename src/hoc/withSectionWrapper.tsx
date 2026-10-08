import React from 'react';
import { motion } from 'motion/react';

export interface SectionWrapperConfig {
  id: string;
  background: 'white' | 'slate-50';
  badge?: string;
  title?: string;
  subtitle?: string;
  headerControls?: React.ReactNode;
  containerClassName?: string;
  overflowHidden?: boolean;
}

/**
 * Higher-Order Component (HOC) to encapsulate section layout,
 * alternating backgrounds, clinical headers, and scroll-into-view animations.
 */
export function withSectionWrapper<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  config: SectionWrapperConfig
) {
  const WithSectionWrapperComponent: React.FC<P> = (props) => {
    const bgClass = config.background === 'white' ? 'bg-white' : 'bg-slate-50';
    const overflowClass = config.overflowHidden ? 'overflow-hidden' : '';

    return (
      <motion.section
        id={config.id}
        className={`py-20 ${bgClass} border-b border-slate-200 ${overflowClass}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={config.containerClassName || 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
          {/* Render Header if specified */}
          {(config.badge || config.title || config.subtitle) && (
            <div className={`mb-12 ${config.headerControls ? 'flex flex-col md:flex-row md:items-end md:justify-between gap-6' : 'text-center max-w-3xl mx-auto'}`}>
              <div className={config.headerControls ? 'max-w-2xl' : ''}>
                {config.badge && (
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-primary-700 uppercase bg-primary-50 px-3 py-1 rounded-full border border-primary-200 inline-block">
                    {config.badge}
                  </span>
                )}
                {config.title && (
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                    {config.title}
                  </h2>
                )}
                {config.subtitle && (
                  <p className="text-slate-600 text-sm sm:text-base mt-2">
                    {config.subtitle}
                  </p>
                )}
              </div>

              {/* Optional Header Controls (e.g. Carousel Prev/Next & Counter) */}
              {config.headerControls && (
                <div className="shrink-0">
                  {config.headerControls}
                </div>
              )}
            </div>
          )}

          {/* Render Actual Section Body */}
          <WrappedComponent {...props} />
        </div>
      </motion.section>
    );
  };

  WithSectionWrapperComponent.displayName = `withSectionWrapper(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithSectionWrapperComponent;
}
