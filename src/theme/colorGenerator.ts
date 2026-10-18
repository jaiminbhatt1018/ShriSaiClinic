/**
 * Modular Seed Color Palette Generator
 * Generates mathematically harmonic 11-step tonal scales (50-950)
 * and accessible contrast tokens based on any seed hex color.
 */

export interface TonalPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string; // Base seed reference
  700: string;
  800: string;
  900: string;
  950: string;
  contrastText: string;
  surfaceBorder: string;
  surfaceBadgeBg: string;
  surfaceBadgeText: string;
  glow: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  seed: string;
  description: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'botanical-green',
    name: 'Botanical Green (Default)',
    seed: '#146D46',
    description: 'Specialized clinical botanical green'
  },
  {
    id: 'healing-teal',
    name: 'Healing Teal',
    seed: '#039487',
    description: 'Calming, holistic botanical homoeopathic tone'
  },
  {
    id: 'clinical-sky',
    name: 'Clinical Sky',
    seed: '#0284C7',
    description: 'Crisp, trustworthy medical cyan-blue palette'
  },
  {
    id: 'sapphire-health',
    name: 'Sapphire Medical',
    seed: '#2563EB',
    description: 'Authoritative, vibrant clinical physician blue'
  },
  {
    id: 'vital-emerald',
    name: 'Vital Emerald',
    seed: '#059669',
    description: 'Natural herbal recovery & revitalizing energy'
  }
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  return '#' + [clamp(r), clamp(g), clamp(b)]
    .map(c => c.toString(16).padStart(2, '0'))
    .join('');
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

export function generateTonalPalette(seedHex: string): TonalPalette {
  if (seedHex.toLowerCase() === '#146d46') {
    return {
      50: '#effaf5',
      100: '#dbf5ea',
      200: '#b9e9d4',
      300: '#83d8b3',
      400: '#41c88d',
      500: '#289a68',
      600: '#146d46',
      700: '#105637',
      800: '#0e442c',
      900: '#0d3624',
      950: '#092419',
      contrastText: '#ffffff',
      surfaceBorder: '#b9e9d4',
      surfaceBadgeBg: '#effaf5',
      surfaceBadgeText: '#0e442c',
      glow: 'rgba(20, 109, 70, 0.25)'
    };
  }

  const rgb = hexToRgb(seedHex);
  const { h, s } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Calibrated lightness steps matching Tailwind UI proportions
  const lightnessMap: Record<keyof Omit<TonalPalette, 'contrastText' | 'surfaceBorder' | 'surfaceBadgeBg' | 'surfaceBadgeText' | 'glow'>, { l: number; sMod: number }> = {
    50: { l: 97, sMod: 0.95 },
    100: { l: 93, sMod: 0.92 },
    200: { l: 85, sMod: 0.88 },
    300: { l: 74, sMod: 0.85 },
    400: { l: 60, sMod: 0.90 },
    500: { l: 48, sMod: 0.98 },
    600: { l: 39, sMod: 1.00 }, // core primary
    700: { l: 32, sMod: 1.00 },
    800: { l: 25, sMod: 0.95 },
    900: { l: 19, sMod: 0.90 },
    950: { l: 12, sMod: 0.85 }
  };

  const palette = {} as Record<string, string>;

  for (const [key, config] of Object.entries(lightnessMap)) {
    const derivedRgb = hslToRgb(h, s * config.sMod, config.l);
    palette[key] = rgbToHex(derivedRgb.r, derivedRgb.g, derivedRgb.b);
  }

  // Calculate contrast ratio for primary button text
  const primaryRgb = hexToRgb(palette['600']);
  const yiq = (primaryRgb.r * 299 + primaryRgb.g * 587 + primaryRgb.b * 114) / 1000;
  const contrastText = yiq >= 140 ? '#0f172a' : '#ffffff';

  return {
    50: palette['50'],
    100: palette['100'],
    200: palette['200'],
    300: palette['300'],
    400: palette['400'],
    500: palette['500'],
    600: palette['600'],
    700: palette['700'],
    800: palette['800'],
    900: palette['900'],
    950: palette['950'],
    contrastText,
    surfaceBorder: palette['200'],
    surfaceBadgeBg: palette['50'],
    surfaceBadgeText: palette['800'],
    glow: `${palette['600']}40`
  };
}

export function applyThemeVariables(palette: TonalPalette): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // Set CSS Variables for Tailwind and global styles
  root.style.setProperty('--color-primary-50', palette[50]);
  root.style.setProperty('--color-primary-100', palette[100]);
  root.style.setProperty('--color-primary-200', palette[200]);
  root.style.setProperty('--color-primary-300', palette[300]);
  root.style.setProperty('--color-primary-400', palette[400]);
  root.style.setProperty('--color-primary-500', palette[500]);
  root.style.setProperty('--color-primary-600', palette[600]);
  root.style.setProperty('--color-primary-700', palette[700]);
  root.style.setProperty('--color-primary-800', palette[800]);
  root.style.setProperty('--color-primary-900', palette[900]);
  root.style.setProperty('--color-primary-950', palette[950]);

  // Legacy mappings for clinical compatibility
  root.style.setProperty('--primary-blue', palette[600]);
  root.style.setProperty('--primary-blue-hover', palette[700]);
  root.style.setProperty('--primary-blue-dark', palette[800]);
  root.style.setProperty('--border-blue', palette.surfaceBorder);
  root.style.setProperty('--badge-blue-bg', palette.surfaceBadgeBg);
  root.style.setProperty('--badge-blue-text', palette.surfaceBadgeText);
  root.style.setProperty('--primary-contrast', palette.contrastText);
  root.style.setProperty('--primary-glow', palette.glow);
}
