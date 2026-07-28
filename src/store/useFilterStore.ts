/**
 * Search & Catalog Filter State Store
 */

import { create } from 'zustand';

interface FilterState {
  searchQuery: string;
  selectedGenreId: number | null;
  selectedPlatformId: number | null;
  minRating: number;
  releaseYear: number | null;
  setSearchQuery: (query: string) => void;
  setGenreFilter: (genreId: number | null) => void;
  setPlatformFilter: (platformId: number | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  selectedGenreId: null,
  selectedPlatformId: null,
  minRating: 0,
  releaseYear: null,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setGenreFilter: (selectedGenreId) => set({ selectedGenreId }),
  setPlatformFilter: (selectedPlatformId) => set({ selectedPlatformId }),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedGenreId: null,
      selectedPlatformId: null,
      minRating: 0,
      releaseYear: null,
    }),
}));
