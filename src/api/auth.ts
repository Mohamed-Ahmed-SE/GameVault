/**
 * Authentication API Service via Supabase Auth
 */

import { supabase } from './supabase';
import { UserProfile } from '@/types/user';

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signUpWithEmail = async (email: string, password: string, username: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        display_name: username,
      },
    },
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.warn('Error fetching user profile:', error.message);
    return null;
  }
  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    favoriteGenres: data.favorite_genres || [],
    primaryPlatform: data.primary_platform,
    totalGamesPlayed: data.total_games_played || 0,
    totalHoursLogged: data.total_hours_logged || 0,
    averageRating: Number(data.average_rating || 0),
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};
