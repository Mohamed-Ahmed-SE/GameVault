/**
 * User Library CRUD Service (Supabase & Local Hydration)
 */

import { supabase } from './supabase';
import { LibraryEntry, GameStatus } from '@/types/library';

export const fetchUserLibrary = async (userId: string): Promise<LibraryEntry[]> => {
  const { data, error } = await supabase
    .from('user_library')
    .select('*, games_cache(*)')
    .eq('user_id', userId);

  if (error) {
    console.warn('Error fetching user library from Supabase:', error.message);
    return [];
  }

  return (data || []).map(row => ({
    id: row.id,
    userId: row.user_id,
    igdbId: row.igdb_id,
    status: row.status as GameStatus,
    userRating: row.user_rating ? Number(row.user_rating) : undefined,
    hoursPlayed: Number(row.hours_played || 0),
    favorite: row.favorite || false,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    gameData: row.games_cache
      ? {
          id: row.games_cache.igdb_id,
          name: row.games_cache.name,
          slug: row.games_cache.slug,
          cover: { id: 0, image_id: row.games_cache.cover_url || '' },
          summary: row.games_cache.summary,
        }
      : undefined,
  }));
};

export const updateLibraryEntry = async (
  userId: string,
  igdbId: number,
  updates: Partial<Omit<LibraryEntry, 'id' | 'userId' | 'igdbId'>>
) => {
  const { data, error } = await supabase
    .from('user_library')
    .upsert({
      user_id: userId,
      igdb_id: igdbId,
      status: updates.status,
      user_rating: updates.userRating,
      hours_played: updates.hoursPlayed,
      favorite: updates.favorite,
      notes: updates.notes,
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) throw error;
  return data;
};
