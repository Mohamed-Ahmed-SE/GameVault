# GameVault Design System (Crimson Red Dark Theme)

The GameVault Design System delivers an immersive, gaming-first aesthetic centered around high-contrast **Crimson Red**, deep **Obsidian** surfaces, and vibrant neon accents inspired by modern gaming UI consoles and platforms like Letterboxd & Steam.

---

## 🎨 Color Palette & Design Tokens

### Backgrounds & Surfaces
| Token Name | Hex Code | Purpose |
|---|---|---|
| `bgPrimary` | `#0F0E13` | Root view background (Obsidian Dark) |
| `bgSecondary` | `#16141D` | Surface cards, list items, search bars |
| `bgTertiary` | `#211E2B` | Modals, bottom sheets, elevated popovers |
| `bgElevated` | `#2A2737` | Input fields, active toggles, highlighted states |

### Brand & Crimson Accents
| Token Name | Hex Code | Purpose |
|---|---|---|
| `primaryRed` | `#E50914` | Main brand color, primary CTA buttons, active tabs |
| `rubyNeon` | `#FF2E4D` | Micro-animation glows, badges, active heart icons |
| `deepCrimson` | `#90060D` | Pressed state buttons, subtle gradient stops |
| `scarletDark` | `#3D0005` | Card badge background, subtle warning fill |

### Text & Typography Colors
| Token Name | Hex Code | Purpose |
|---|---|---|
| `textPrimary` | `#FFFFFF` | Main headings, title text |
| `textSecondary` | `#A19DB1` | Subtitles, release dates, platform tags |
| `textMuted` | `#666175` | Captions, disabled text, placeholder text |
| `textRed` | `#FF4D6D` | Text accent links, highlighted stats |

### Status Badges (Library Categories)
| Status | Color Token | Hex Code | Label |
|---|---|---|---|
| `PLAYING` | `statusPlaying` | `#3B82F6` | ▶ Playing |
| `COMPLETED` | `statusCompleted` | `#10B981` | ✔ Completed |
| `BACKLOG` | `statusBacklog` | `#F59E0B` | ⏳ Backlog |
| `PAUSED` | `statusPaused` | `#8B5CF6` | ⏸ Paused |
| `DROPPED` | `statusDropped` | `#EF4444` | ❌ Dropped |
| `WISHLIST` | `statusWishlist` | `#EC4899` | 📌 Wishlist |

---

## 📐 Spacing & Layout Tokens

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 9999,
};
```

---

## 🌟 Visual Components Guidelines

### 1. Game Card (`GameCard.tsx`)
- **Cover Ratio**: 3:4 aspect ratio standard for IGDB box art.
- **Rating Overlay**: Top-right corner pill with semi-transparent `#0F0E13` (0.8 opacity) and star icon `#FFB800`.
- **Status Indicator**: Bottom-left status dot showing active status in user's library.
- **Hover/Press**: Scale transform `1.03` with a subtle `#FF2E4D` glow shadow.

### 2. Primary Button (`Button.tsx`)
- **Background**: Linear Gradient from `#E50914` to `#C10712`.
- **Text**: Bold white capitalized text (`fontFamily: 'Inter-Bold'`, `letterSpacing: 0.5`).
- **Shadow**: `shadowColor: '#E50914'`, `shadowOpacity: 0.4`, `shadowRadius: 10`.

### 3. Star Rating Component (`StarRating.tsx`)
- 5-Star system supporting half-stars (e.g. 4.5/5).
- Active star color: Crimson Gold (`#FFB800`) or Ruby Red (`#FF2E4D`).

---

## 📱 Typography System

```typescript
export const typography = {
  h1: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '700', lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  bodyLarge: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  bodyMedium: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  badge: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
};
```
