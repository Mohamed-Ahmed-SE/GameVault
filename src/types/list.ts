/**
 * Custom Collections / Lists Interfaces
 */

import { Game } from './game';
import { UserProfile } from './user';

export interface CustomListItem {
  id: string;
  listId: string;
  igdbId: number;
  customNote?: string;
  displayOrder: number;
  addedAt: string;
  game?: Game;
}

export interface CustomList {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isPrivate: boolean;
  likesCount: number;
  createdAt: string;
  itemsCount?: number;
  author?: UserProfile;
  items?: CustomListItem[];
}
