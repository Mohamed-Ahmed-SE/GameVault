# CLAUDE.md - GameVault Quick Reference

## 🚀 Common Commands

```bash
# Start Expo development server
npx expo start

# Run on iOS Simulator
npx expo start --ios

# Run on Android Emulator
npx expo start --android

# Type Check
npx tsc --noEmit

# Lint code
npm run lint
```

## 🔑 Key API Console Links

- **RAWG API Key Console**: [https://rawg.io/apidocs](https://rawg.io/apidocs) (`EXPO_PUBLIC_RAWG_API_KEY`)
- **Twitch/IGDB Console**: [https://dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps) (`EXPO_PUBLIC_TWITCH_CLIENT_ID`)
- **IGDB Docs**: [https://api-docs.igdb.com/#account-setup](https://api-docs.igdb.com/#account-setup)
- **Supabase Dashboard**: [https://supabase.com/dashboard](https://supabase.com/dashboard) (`EXPO_PUBLIC_SUPABASE_URL`)

## 🎮 Key Features & Files Overview

- **Design Tokens**: `src/theme/colors.ts` (Red theme primary: `#E50914`, Dark: `#0F0E13`)
- **Database Schema**: `supabase/schema.sql` (PostgreSQL setup for profiles, library, reviews, lists, achievements)
- **API Services**:
  - `src/api/igdb.ts` -> RAWG Live API & IGDB fallback mapping client (500,000+ titles)
  - `src/api/supabase.ts` -> Supabase Client configuration
  - `src/api/auth.ts` -> Email/Password & Guest Auth service
  - `src/api/library.ts` -> User library database mutations
- **State Management**:
  - `src/store/useAuthStore.ts` -> User authentication session & guest state
  - `src/store/useLibraryStore.ts` -> Local library cache, wishlists & filter status
  - `src/store/useFilterStore.ts` -> Search filter criteria
- **Core Screens**:
  - `src/screens/Auth/LoginScreen.tsx` -> Email/Password & Guest Login
  - `src/screens/Home/HomeScreen.tsx` -> Trending, New Releases, High Metacritic games
  - `src/screens/Search/SearchScreen.tsx` -> Live game search with genre/platform filters
  - `src/screens/Details/DetailsScreen.tsx` -> Game metadata, screenshots gallery, ratings, review modal, hours logger
  - `src/screens/Library/LibraryScreen.tsx` & `WishlistScreen.tsx` -> Game collections by status
  - `src/screens/Profile/ProfileScreen.tsx` -> User stats, favorite games, custom lists, achievements

## 📌 Code Style Rules

1. **Imports**: Group imports as (1) React/React Native, (2) Libraries, (3) Internal modules (`@/components`, `@/theme`, etc.).
2. **Components**: Functional components with TypeScript interface props. Use React.memo for list items.
3. **Styling**: Use `StyleSheet.create` with tokens from `src/theme`. No inline hex strings.
