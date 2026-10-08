import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export interface ModalHocProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  maxWidthClass?: string;
}

/**
 * Higher-Order Component (HOC) to manage modal accessibility,
 * backdrop blur, Escape dismissal, body scroll lock, and spring motion transitions.
 */
export function withModal<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  defaultConfig?: { maxWidthClass?: string }
) {
  const WithModalComponent: React.FC<P & ModalHocProps> = ({
    isOpen,
    onClose,
    title,
    subtitle,
    maxWidthClass = defaultConfig?.maxWidthClass || 'max-w-xl',
    ...restProps
  }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Escape key listener & Body scroll lock
    useEffect(() => {
      if (!isOpen) return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, onClose]);

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Modal Dialog Position Container */}
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
              <motion.div
                ref={modalRef}
                className={`relative w-full ${maxWidthClass} transform rounded-3xl bg-white p-6 sm:p-8 text-left shadow-2xl transition-all border border-slate-200 z-10`}
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                role="dialog"
                aria-modal="true"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition active:scale-95 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Optional Title Header */}
                {(title || subtitle) && (
                  <div className="mb-6 pb-4 border-b border-slate-100 pr-8">
                    {title && (
                      <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                        {title}
                      </h3>
                    )}
                    {subtitle && (
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        {subtitle}
                      </p>
                    )}
                  </div>
                )}

                {/* Wrapped Modal Body */}
                <WrappedComponent onClose={onClose} {...(restProps as P)} />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    );
  };

  WithModalComponent.displayName = `withModal(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithModalComponent;
}
