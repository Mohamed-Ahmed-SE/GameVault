/**
 * Auth Session & User Profile State Store
 */

import { create } from 'zustand';
import { UserProfile } from '@/types/user';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  setUser: (user: UserProfile | null) => void;
  setGuestMode: (isGuest: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'demo-user-1',
    username: 'alex_gamer',
    displayName: 'Alex Rivers',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    bio: 'Avid RPG & Souls-like enthusiast. Currently grinding Elden Ring DLC.',
    favoriteGenres: ['RPG', 'Action', 'Adventure'],
    primaryPlatform: 'PlayStation 5',
    totalGamesPlayed: 52,
    totalHoursLogged: 680,
    averageRating: 4.6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  isAuthenticated: true,
  isGuest: false,

  setUser: (user) => set({ user, isAuthenticated: !!user, isGuest: false }),
  setGuestMode: (isGuest) => set({ isGuest, isAuthenticated: !isGuest, user: null }),
  logout: () => set({ user: null, isAuthenticated: false, isGuest: false }),
}));
