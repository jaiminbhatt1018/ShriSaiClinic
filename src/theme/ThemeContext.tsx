import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TonalPalette, 
  ThemePreset, 
  THEME_PRESETS, 
  generateTonalPalette, 
  applyThemeVariables 
} from './colorGenerator';

interface ThemeContextType {
  seedColor: string;
  palette: TonalPalette;
  setSeedColor: (hex: string) => void;
  presets: ThemePreset[];
  activePresetId?: string;
  selectPreset: (id: string) => void;
  resetDefault: () => void;
}

const DEFAULT_SEED = '#146D46';
const STORAGE_KEY = 'shri_sai_clinic_theme_seed';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seedColor, setSeedColorState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      // Migrate away from old blue (#0284C7) or teal (#039487) to Botanical Green (#146D46)
      if (
        stored &&
        stored.toLowerCase() !== '#0284c7' &&
        stored.toLowerCase() !== '#039487' &&
        /^#[0-9A-Fa-f]{6}$/.test(stored)
      ) {
        return stored;
      }
    }
    return DEFAULT_SEED;
  });

  const [palette, setPalette] = useState<TonalPalette>(() => generateTonalPalette(seedColor));

  useEffect(() => {
    const newPalette = generateTonalPalette(seedColor);
    setPalette(newPalette);
    applyThemeVariables(newPalette);
    try {
      localStorage.setItem(STORAGE_KEY, seedColor);
    } catch {
      // ignore storage errors
    }
  }, [seedColor]);

  const setSeedColor = (hex: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      setSeedColorState(hex);
    }
  };

  const selectPreset = (id: string) => {
    const found = THEME_PRESETS.find(p => p.id === id);
    if (found) {
      setSeedColorState(found.seed);
    }
  };

  const resetDefault = () => {
    setSeedColorState(DEFAULT_SEED);
  };

  const activePreset = THEME_PRESETS.find(p => p.seed.toLowerCase() === seedColor.toLowerCase());

  return (
    <ThemeContext.Provider
      value={{
        seedColor,
        palette,
        setSeedColor,
        presets: THEME_PRESETS,
        activePresetId: activePreset?.id,
        selectPreset,
        resetDefault
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
