/**
 * Theme & UI Appearance State Store
 */

import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean; // Always true for GameVault default
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
