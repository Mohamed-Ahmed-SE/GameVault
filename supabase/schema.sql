-- GameVault Supabase PostgreSQL Database Schema
-- Fully Idempotent Script for Safe Multi-Execution in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. ENUMS (Safe Idempotent Creation)
-- ============================================================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'game_status') THEN
        CREATE TYPE game_status AS ENUM ('playing', 'completed', 'backlog', 'paused', 'dropped', 'wishlist');
    END IF;
END $$;

-- ============================================================================
-- 2. USERS & PROFILES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    favorite_genres TEXT[] DEFAULT '{}',
    primary_platform TEXT,
    total_games_played INT DEFAULT 0,
    total_hours_logged INT DEFAULT 0,
    average_rating NUMERIC(3, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- 3. CACHED IGDB GAMES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.games_cache (
    igdb_id INT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT,
    cover_url TEXT,
    summary TEXT,
    storyline TEXT,
    first_release_date TIMESTAMP WITH TIME ZONE,
    aggregated_rating NUMERIC(5, 2),
    genres JSONB DEFAULT '[]'::jsonb,
    platforms JSONB DEFAULT '[]'::jsonb,
    developers JSONB DEFAULT '[]'::jsonb,
    publishers JSONB DEFAULT '[]'::jsonb,
    screenshots JSONB DEFAULT '[]'::jsonb,
    videos JSONB DEFAULT '[]'::jsonb,
    cached_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.games_cache ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Game cache viewable by everyone" ON public.games_cache;
CREATE POLICY "Game cache viewable by everyone" ON public.games_cache FOR SELECT USING (true);

-- ============================================================================
-- 4. USER LIBRARY (Playing, Completed, Backlog, Paused, Dropped, Wishlist)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.user_library (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    igdb_id INT NOT NULL REFERENCES public.games_cache(igdb_id) ON DELETE CASCADE,
    status game_status NOT NULL DEFAULT 'backlog',
    user_rating NUMERIC(3, 1),
    hours_played NUMERIC(6, 1) DEFAULT 0.0,
    favorite BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, igdb_id)
);

ALTER TABLE public.user_library ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Library entries viewable by everyone" ON public.user_library;
CREATE POLICY "Library entries viewable by everyone" ON public.user_library FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert own library entries" ON public.user_library;
CREATE POLICY "Users can insert own library entries" ON public.user_library FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own library entries" ON public.user_library;
CREATE POLICY "Users can update own library entries" ON public.user_library FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own library entries" ON public.user_library;
CREATE POLICY "Users can delete own library entries" ON public.user_library FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- 5. REVIEWS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    igdb_id INT NOT NULL REFERENCES public.games_cache(igdb_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    rating NUMERIC(3, 1),
    contains_spoilers BOOLEAN DEFAULT FALSE,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Reviews viewable by everyone" ON public.reviews;
CREATE POLICY "Reviews viewable by everyone" ON public.reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can write reviews" ON public.reviews;
CREATE POLICY "Users can write reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can edit own reviews" ON public.reviews;
CREATE POLICY "Users can edit own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- 6. CUSTOM LISTS (Letterboxd Style)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.custom_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    is_private BOOLEAN DEFAULT FALSE,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.list_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    list_id UUID NOT NULL REFERENCES public.custom_lists(id) ON DELETE CASCADE,
    igdb_id INT NOT NULL REFERENCES public.games_cache(igdb_id) ON DELETE CASCADE,
    custom_note TEXT,
    display_order INT DEFAULT 0,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(list_id, igdb_id)
);

ALTER TABLE public.custom_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.list_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public custom lists viewable by everyone" ON public.custom_lists;
CREATE POLICY "Public custom lists viewable by everyone" ON public.custom_lists FOR SELECT USING (NOT is_private OR auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can manage own custom lists" ON public.custom_lists;
CREATE POLICY "Users can manage own custom lists" ON public.custom_lists FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "List items viewable by list access" ON public.list_items;
CREATE POLICY "List items viewable by list access" ON public.list_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can manage list items" ON public.list_items;
CREATE POLICY "Users can manage list items" ON public.list_items FOR ALL USING (
    EXISTS (SELECT 1 FROM public.custom_lists WHERE id = list_items.list_id AND user_id = auth.uid())
);

-- ============================================================================
-- 7. ACHIEVEMENTS & GAMIFICATION
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    required_count INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id TEXT REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, achievement_id)
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Achievements viewable by everyone" ON public.achievements;
CREATE POLICY "Achievements viewable by everyone" ON public.achievements FOR SELECT USING (true);
DROP POLICY IF EXISTS "User achievements viewable by everyone" ON public.user_achievements;
CREATE POLICY "User achievements viewable by everyone" ON public.user_achievements FOR SELECT USING (true);

INSERT INTO public.achievements (id, name, description, icon_name, required_count) VALUES
('first_game', 'First Step', 'Add your first game to your library', 'gamepad-variant', 1),
('collector_10', 'Game Collector', 'Add 10 games to your library', 'archive', 10),
('finisher_10', 'Game Finisher', 'Complete 10 games', 'trophy-award', 10),
('reviewer', 'Critic in the Making', 'Write your first game review', 'pencil-box-multiple', 1),
('hundred_hours', 'Century Club', 'Log 100 total hours of gameplay', 'clock-fast', 100)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 8. PROFILE AUTO CREATION TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'gamer_' || substr(NEW.id::text, 1, 8)),
        COALESCE(NEW.raw_user_meta_data->>'display_name', 'Gamer'),
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
