/**
 * User Library Entry & Game Tracking Status Types
 */

import { Game } from './game';

export type GameStatus =
  | 'playing'
  | 'completed'
  | 'backlog'
  | 'paused'
  | 'dropped'
  | 'wishlist';

export interface LibraryEntry {
  id: string; // UUID in Supabase
  userId: string;
  igdbId: number;
  status: GameStatus;
  userRating?: number; // 0.5 to 5.0 or 1 to 10 scale
  hoursPlayed: number;
  favorite: boolean;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  gameData?: Game; // Hydrated game metadata from cache or IGDB
}

export interface LibraryFilterOptions {
  status?: GameStatus | 'all';
  searchQuery?: string;
  sortBy?: 'date_added' | 'rating' | 'release_date' | 'title' | 'hours';
  sortOrder?: 'asc' | 'desc';
}
