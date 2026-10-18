import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { Palette, Check, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ThemeSeedSelector: React.FC = () => {
  const { seedColor, setSeedColor, presets, activePresetId, selectPreset, resetDefault } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition active:scale-95 cursor-pointer"
        title="Custom Seed Color Theme Framework"
        aria-label="Customize theme colors"
      >
        <span 
          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-inner" 
          style={{ backgroundColor: seedColor }}
        />
        <Palette className="w-3.5 h-3.5 text-slate-500" />
        <span className="hidden sm:inline">Theme</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              className="absolute right-0 mt-2 w-72 rounded-2xl bg-white p-4 shadow-xl border border-slate-200 z-50 text-xs"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
                <span className="font-heading font-bold text-slate-900 text-sm">
                  Seed Color Framework
                </span>
                <button
                  onClick={resetDefault}
                  className="text-[11px] text-slate-500 hover:text-primary-600 flex items-center gap-1 transition cursor-pointer"
                  title="Reset to default Botanical Green"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                Generates harmonic 50–950 tonal scales, surfaces, and contrast tokens dynamically based on a seed color.
              </p>

              {/* Presets */}
              <div className="space-y-1.5 mb-4">
                {presets.map((preset) => {
                  const isSelected = activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => selectPreset(preset.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition cursor-pointer text-left ${
                        isSelected 
                          ? 'bg-primary-50 text-primary-900 font-bold border border-primary-200' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-4 h-4 rounded-full border border-black/10 shadow-sm shrink-0" 
                          style={{ backgroundColor: preset.seed }}
                        />
                        <div>
                          <p className="font-medium">{preset.name}</p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-primary-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Seed Hex Input */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Custom Seed Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={seedColor}
                    onChange={(e) => setSeedColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={seedColor.toUpperCase()}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.startsWith('#') && val.length <= 7) {
                        setSeedColor(val);
                      }
                    }}
                    placeholder="#146D46"
                    className="flex-grow px-2.5 py-1.5 font-mono text-xs rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 outline-none uppercase"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
