import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { defaultSiteData } from '../data/siteData';
import type { SiteData } from '../data/siteData';

export interface ThemePreset {
  name: string;
  primaryBlue: string;
  mediumBlue: string;
  lightBlue: string;
  accentGold: string;
  brightBlue: string;
}

const themePresets: Record<string, ThemePreset> = {
  oceanic: {
    name: 'Oceanic Blue',
    primaryBlue: '#002147',
    mediumBlue: '#0056A4',
    lightBlue: '#0071CE',
    accentGold: '#EAAA00',
    brightBlue: '#002147',
  },
  forest: {
    name: 'Forest Green',
    primaryBlue: '#1B3A2A',
    mediumBlue: '#3D6B4F',
    lightBlue: '#5BA86C',
    accentGold: '#C8A96E',
    brightBlue: '#1B3A2A',
  },
  terracotta: {
    name: 'Warm Terracotta',
    primaryBlue: '#5C2E15',
    mediumBlue: '#B85C2E',
    lightBlue: '#D4825A',
    accentGold: '#E0A030',
    brightBlue: '#5C2E15',
  },
};

interface ThemeContextValue {
  theme: string;
  setTheme: (theme: string) => void;
  themePresets: Record<string, ThemePreset>;
  siteData: SiteData;
  updateSiteData: (data: Partial<SiteData>) => void;
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('mgd-theme');
      return saved && themePresets[saved] ? saved : 'oceanic';
    } catch {
      return 'oceanic';
    }
  });

  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem('mgd-site-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultSiteData, ...parsed };
      }
    } catch {
      // ignore
    }
    return defaultSiteData;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mgd-admin') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const preset = themePresets[theme];
    if (!preset) return;
    const root = document.documentElement;
    root.style.setProperty('--primary-blue', preset.primaryBlue);
    root.style.setProperty('--medium-blue', preset.mediumBlue);
    root.style.setProperty('--light-blue', preset.lightBlue);
    root.style.setProperty('--accent-gold', preset.accentGold);
    root.style.setProperty('--bright-blue', preset.brightBlue);
    root.style.setProperty('--accent', preset.accentGold);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('mgd-theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('mgd-site-data', JSON.stringify(siteData));
    } catch {
      // ignore
    }
  }, [siteData]);

  useEffect(() => {
    try {
      localStorage.setItem('mgd-admin', String(isAdmin));
    } catch {
      // ignore
    }
  }, [isAdmin]);

  const setTheme = useCallback((newTheme: string) => {
    if (themePresets[newTheme]) {
      setThemeState(newTheme);
    }
  }, []);

  const updateSiteData = useCallback((partial: Partial<SiteData>) => {
    setSiteData((prev) => ({ ...prev, ...partial }));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themePresets,
        siteData,
        updateSiteData,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
