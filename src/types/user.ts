/**
 * User Profile & Gaming Statistics Types
 */

export interface UserProfile {
  id: string; // Supabase auth UUID
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  favoriteGenres: string[];
  primaryPlatform?: string;
  totalGamesPlayed: number;
  totalHoursLogged: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface GamingStats {
  totalPlayed: number;
  completedCount: number;
  playingCount: number;
  backlogCount: number;
  wishlistCount: number;
  droppedCount: number;
  averageRating: number;
  totalHoursPlayed: number;
  topGenres: { genre: string; count: number }[];
}
