# 🎮 GameVault — Video Game Tracking & Discovery Platform

> **The "Letterboxd for Video Games"** — Discover 500,000+ titles, track your gaming backlog, rate & review games, build custom lists, and analyze your gaming statistics in a sleek, high-contrast Obsidian & Crimson Red UI.

---

## 🌟 Key Features

- 🔍 **500,000+ Games Database**: Instant live search and detailed game information powered by the **RAWG API** and **IGDB API**.
- 🔥 **Discovery Engine**: Carousels for Trending Games, New Releases, Most Anticipated, and High-Metacritic recommendations.
- 📖 **Comprehensive Game Details**: Dynamic backdrop header, screenshot gallery modal, Metacritic & user ratings, storyline, release dates, platforms, genres, and recommended titles.
- 📚 **Personal Library & Backlog Management**:
  - Filter games by status: **Playing**, **Completed**, **Backlog**, **Paused**, **Dropped**, and **Wishlist**.
  - Track total hours played per game.
  - Rate games (1 to 10 stars) and write detailed reviews with spoiler toggles.
- 📊 **Gaming Stats & Profile**:
  - Personal gaming dashboard with total games completed, total hours logged, and top genres breakdown.
  - Interactive custom list builder (e.g. *"Top 10 RPGs of All Time"*).
  - Achievements and unlockable gaming badges.
- 🔐 **Supabase Authentication**: Email/Password authentication + instant Guest Mode for quick exploration.

---

## 🔑 API Credentials & Links Guide

GameVault utilizes external APIs for game data and backend database services. Here are the exact links and steps to get your API keys:

### 1. RAWG API Key (Primary Live Game Database)
- 🔗 **API Console Link**: [https://rawg.io/apidocs](https://rawg.io/apidocs)
- **How to Get**:
  1. Go to [https://rawg.io/apidocs](https://rawg.io/apidocs) and sign up for a free RAWG account.
  2. Click **"Get an API Key"**.
  3. Copy your API Key.
  4. Paste it into your `.env` file:
     ```env
     EXPO_PUBLIC_RAWG_API_KEY=your_rawg_api_key_here
     ```

### 2. Twitch / IGDB Developer API (Optional / Alternative Game Data)
- 🔗 **Twitch Console Link**: [https://dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps)
- 🔗 **IGDB Documentation Link**: [https://api-docs.igdb.com/#account-setup](https://api-docs.igdb.com/#account-setup)
- **How to Get**:
  1. Log in to the [Twitch Developer Console](https://dev.twitch.tv/console/apps).
  2. Click **"Register Your Application"**.
  3. Enter application details (Name, Redirect URL e.g. `http://localhost`, Category: *Application*).
  4. Obtain your **Client ID** and generate a **Client Secret**.
  5. Add them to your `.env` file:
     ```env
     EXPO_PUBLIC_TWITCH_CLIENT_ID=your_twitch_client_id
     EXPO_PUBLIC_TWITCH_CLIENT_SECRET=your_twitch_client_secret
     ```

### 3. Supabase Cloud Database & Auth
- 🔗 **Supabase Dashboard**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
- **How to Get**:
  1. Create a project at [supabase.com](https://supabase.com).
  2. Go to **Project Settings** ➔ **API**.
  3. Copy the **Project URL** and **`anon` `public` API key**.
  4. Paste into `.env`:
     ```env
     EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

---

## 🛠️ Environment Variables Configuration

Create a `.env` file in the root directory:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://bggippktqfrplrurvihp.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# IGDB & Twitch Developer API
EXPO_PUBLIC_TWITCH_CLIENT_ID=your_twitch_client_id
EXPO_PUBLIC_TWITCH_CLIENT_SECRET=your_twitch_client_secret

# RAWG API Key
EXPO_PUBLIC_RAWG_API_KEY=c542e67aec3a4340908f9d9e860e66af
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm
- Expo Go App on mobile OR iOS Simulator / Android Emulator

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run TypeScript check
npx tsc --noEmit

# 3. Start Expo development server
npx expo start

# Run directly on iOS or Android:
npx expo start --ios
npx expo start --android
```

---

## 📐 Project Architecture & Tech Stack

| Component | Technology |
| :--- | :--- |
| **Mobile Framework** | React Native (Expo SDK 52) |
| **Language** | TypeScript (Strict mode) |
| **Design Tokens** | Custom Red Theme System (`src/theme`) |
| **State Management** | Zustand (Global Client State & Persistence) |
| **Server Data** | TanStack Query & RAWG API / IGDB SDK |
| **Backend & Auth** | Supabase (PostgreSQL & Row Level Security) |
| **Storage** | Async Storage & Local JSON Persistence |

---

## 📁 Directory Structure

```
GameVault/
├── assets/                 # App icon, splash screen, static assets
├── src/
│   ├── api/                # RAWG, IGDB & Supabase API Client services
│   ├── components/         # Game Cards, Badges, Search Filters, Modals
│   ├── navigation/         # Tab Navigator & Stack Navigation
│   ├── screens/            # Auth, Home, Search, Details, Library, Profile
│   ├── services/           # Local Storage persistence
│   ├── store/              # Zustand global state (Auth, Library, Theme)
│   ├── theme/              # Design System (Colors, Typography, Shadows)
│   ├── types/              # TypeScript interface definitions
│   └── utils/              # Formatter helpers & helpers
├── supabase/               # Database SQL schema (`schema.sql`)
├── AGENTS.md               # Code conventions & AI instructions
├── CLAUDE.md               # Quick command reference
├── DESIGN_SYSTEM.md        # UI/UX Crimson Red design system specs
└── PHASES.md               # Implementation roadmap & completed phases
```

---

## 🎨 Design System

GameVault uses a **Crimson Red** high-contrast dark aesthetic:
- **Primary Background**: `#0F0E13` (Obsidian Dark)
- **Secondary Surface**: `#16141D` (Elevated Charcoal)
- **Primary Accent**: `#E50914` (Crimson Red)
- **Highlight Glow**: `#FF2E4D` (Ruby Red)

---

## 📄 License

MIT License — feel free to customize and expand GameVault!