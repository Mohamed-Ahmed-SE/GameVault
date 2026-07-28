/**
 * User Library Local State & Mutation Store
 */

import { create } from 'zustand';
import { LibraryEntry, GameStatus } from '@/types/library';
import { Game } from '@/types/game';
import { MOCK_GAMES } from '@/api/igdb';

interface LibraryState {
  library: LibraryEntry[];
  activeFilter: GameStatus | 'all';
  setActiveFilter: (filter: GameStatus | 'all') => void;
  upsertEntry: (game: Game, status: GameStatus, rating?: number, hours?: number, favorite?: boolean) => void;
  toggleFavorite: (igdbId: number) => void;
  getEntryByIgdbId: (igdbId: number) => LibraryEntry | undefined;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  library: [
    {
      id: 'lib-1',
      userId: 'demo-user-1',
      igdbId: 119031,
      status: 'completed',
      userRating: 4.5,
      hoursPlayed: 120,
      favorite: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      gameData: MOCK_GAMES[0],
    },
    {
      id: 'lib-2',
      userId: 'demo-user-1',
      igdbId: 114283,
      status: 'playing',
      userRating: 5.0,
      hoursPlayed: 185,
      favorite: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      gameData: MOCK_GAMES[1],
    },
    {
      id: 'lib-3',
      userId: 'demo-user-1',
      igdbId: 250616,
      status: 'wishlist',
      hoursPlayed: 0,
      favorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      gameData: MOCK_GAMES[2],
    },
  ],
  activeFilter: 'all',

  setActiveFilter: (activeFilter) => set({ activeFilter }),

  upsertEntry: (game, status, rating, hours = 0, favorite = false) => {
    const { library } = get();
    const existingIndex = library.findIndex((e) => e.igdbId === game.id);

    if (existingIndex >= 0) {
      const updated = [...library];
      updated[existingIndex] = {
        ...updated[existingIndex],
        status,
        userRating: rating ?? updated[existingIndex].userRating,
        hoursPlayed: hours || updated[existingIndex].hoursPlayed,
        favorite: favorite !== undefined ? favorite : updated[existingIndex].favorite,
        updatedAt: new Date().toISOString(),
      };
      set({ library: updated });
    } else {
      const newEntry: LibraryEntry = {
        id: `lib-${Date.now()}`,
        userId: 'demo-user-1',
        igdbId: game.id,
        status,
        userRating: rating,
        hoursPlayed: hours,
        favorite,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        gameData: game,
      };
      set({ library: [newEntry, ...library] });
    }
  },

  toggleFavorite: (igdbId) => {
    const { library } = get();
    const updated = library.map((e) =>
      e.igdbId === igdbId ? { ...e, favorite: !e.favorite } : e
    );
    set({ library: updated });
  },

  getEntryByIgdbId: (igdbId) => {
    return get().library.find((e) => e.igdbId === igdbId);
  },
}));
