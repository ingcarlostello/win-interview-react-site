import { createContext, type ReactNode } from 'react';
import type { Theme } from '@/types/theme.type';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme: Theme;
}
