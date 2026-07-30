/**
 * GameVault Red-Themed Design System - Color Palette
 * Deep Obsidian Dark UI with Crimson Red Brand Accents
 */

export const colors = {
  background: {
    primary: '#0A090D',   // Deepest obsidian black background
    secondary: '#13111A', // Surface cards and elevated containers
    tertiary: '#1C1926',  // Modals, popovers, input backgrounds
    elevated: '#252133',  // Elevated highlights and hover borders
    glass: 'rgba(19, 17, 26, 0.85)',
    glassDark: 'rgba(10, 9, 13, 0.90)',
    glassLight: 'rgba(255, 255, 255, 0.06)',
    cardOverlay: 'rgba(0, 0, 0, 0.75)',
  },
  accent: {
    primary: '#E50914',   // Signature Crimson Red
    glow: '#FF2E4D',      // Bright Ruby Red for active highlights and glows
    dark: '#90060D',      // Deep Maroon/Crimson for pressed states
    light: '#FF5E78',     // Soft Red text link accent
    darkSubtle: '#290509',// Subtle red tint background
    neon: '#FF1744',      // Vibrant neon accent
  },
  text: {
    primary: '#FFFFFF',   // Main headings
    secondary: '#A8A3B8', // Subtitles and metadata
    muted: '#6B657A',     // Captions and placeholder text
    inverse: '#0A090D',   // Dark text for bright badges
    red: '#FF4D6D',       // Highlighted stats text
    gold: '#FFD700',      // Trophy text
  },
  border: {
    subtle: '#221E2E',
    default: '#302A3F',
    active: '#E50914',
    glow: 'rgba(255, 46, 77, 0.45)',
    gold: 'rgba(255, 215, 0, 0.4)',
  },
  status: {
    playing: '#3B82F6',    // Blue: ▶ Playing
    completed: '#10B981',  // Emerald Green: ✔ Completed
    backlog: '#F59E0B',    // Amber: ⏳ Backlog
    paused: '#8B5CF6',     // Purple: ⏸ Paused
    dropped: '#EF4444',    // Red: ❌ Dropped
    wishlist: '#EC4899',   // Pink: 📌 Wishlist
  },
  rating: {
    star: '#FFB800',       // Vibrant Gold Star
    unrated: '#383347',
    metacriticHigh: '#66CC33', // Green
    metacriticMedium: '#FFCC33', // Yellow
  }
};
