/**
 * Review & Rating Interfaces
 */

import { UserProfile } from './user';
import { Game } from './game';

export interface GameReview {
  id: string;
  userId: string;
  igdbId: number;
  content: string;
  rating?: number;
  containsSpoilers: boolean;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  author?: UserProfile;
  game?: Game;
}
