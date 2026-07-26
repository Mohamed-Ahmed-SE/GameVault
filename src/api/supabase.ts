/**
 * Supabase Client Initialization & Auth Persistence setup
 */

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  'https://bggippktqfrplrurvihp.supabase.co';
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZ2lwcGt0cWZycGxydXJ2aWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwMDc0MTIsImV4cCI6MjEwMDU4MzQxMn0.jDYYwjqa5tmPlzoYkBHQ8OMDIOG7rzErvFTHWbZHEls';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
