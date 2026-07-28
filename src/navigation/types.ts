/**
 * Navigation Type Definitions for React Navigation
 */

import { Game } from '@/types/game';

export type RootStackParamList = {
  MainTabs: undefined;
  Details: { game: Game };
  Login: undefined;
  WriteReview: { game: Game };
  CreateList: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
  Wishlist: undefined;
  Profile: undefined;
};
