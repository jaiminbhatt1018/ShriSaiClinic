import React, { useState } from 'react';
import { FAQS } from '../../data/clinicData';
import { withSectionWrapper } from '../../hoc/withSectionWrapper';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FaqSectionBase: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {FAQS.map((faq) => {
        const isOpen = openId === faq.id;

        return (
          <div
            key={faq.id}
            className="faq-item bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
          >
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full px-6 py-4 text-left font-heading font-bold text-slate-900 flex justify-between items-center text-base sm:text-lg focus:outline-none hover:text-primary-600 transition cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="pr-4">{faq.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-primary-600"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const FaqSection = withSectionWrapper(FaqSectionBase, {
  id: 'faqs',
  background: 'slate-50',
  badge: 'Got Questions?',
  title: 'Frequently Asked Questions',
  subtitle: 'Clear, scientific information about individualized constitutional homeopathic care by Dr. Jay Bhatt (BHMS).',
  containerClassName: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
});

