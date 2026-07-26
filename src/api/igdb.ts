/**
 * Live RAWG Video Game Database API Client (500,000+ Games)
 * Compatible with GameVault Game model schema
 */

import { Game } from '@/types/game';

const RAWG_BASE_URL = 'https://api.rawg.io/api';
const RAWG_KEY = process.env.EXPO_PUBLIC_RAWG_API_KEY || '8de7b8c0999f4400a36fc574b210a6f7';

/**
 * Fetch Top Trending Games from RAWG
 */
export const fetchTrendingGames = async (): Promise<Game[]> => {
  try {
    const url = `${RAWG_BASE_URL}/games?key=${RAWG_KEY}&ordering=-rating&page_size=15&metacritic=80,100`;
    const response = await fetch(url);

    if (!response.ok) {
      console.warn('[RAWG API Warning] Status:', response.status);
      return FALLBACK_GAMES.slice(0, 10);
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results.map(mapRawgGameToGame);
    }
    return FALLBACK_GAMES.slice(0, 10);
  } catch (error) {
    console.warn('[RAWG API Fetch Exception]', error);
    return FALLBACK_GAMES.slice(0, 10);
  }
};

/**
 * Fetch New Releases from RAWG
 */
export const fetchNewReleases = async (): Promise<Game[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const url = `${RAWG_BASE_URL}/games?key=${RAWG_KEY}&ordering=-released&dates=2023-01-01,${today}&page_size=15`;
    const response = await fetch(url);

    if (!response.ok) {
      return FALLBACK_GAMES.slice(2, 12);
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results.map(mapRawgGameToGame);
    }
    return FALLBACK_GAMES.slice(2, 12);
  } catch (error) {
    return FALLBACK_GAMES.slice(2, 12);
  }
};

/**
 * Live Search for Any Video Game on RAWG (500,000+ Titles)
 */
export const searchGames = async (searchQuery: string): Promise<Game[]> => {
  const query = searchQuery.trim();
  if (!query) {
    return fetchTrendingGames();
  }

  try {
    const url = `${RAWG_BASE_URL}/games?key=${RAWG_KEY}&search=${encodeURIComponent(query)}&page_size=25`;
    const response = await fetch(url);

    if (!response.ok) {
      return filterFallbackGames(query);
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results.map(mapRawgGameToGame);
    }
    return filterFallbackGames(query);
  } catch (error) {
    return filterFallbackGames(query);
  }
};

/**
 * Fetch Full Details for a Specific Game from RAWG
 */
export const fetchGameDetails = async (id: number): Promise<Game | null> => {
  try {
    const url = `${RAWG_BASE_URL}/games/${id}?key=${RAWG_KEY}`;
    const response = await fetch(url);

    if (!response.ok) return null;

    const data = await response.json();
    return mapRawgGameToGame(data);
  } catch {
    return null;
  }
};

/**
 * Maps RAWG JSON game object into application Game interface
 */

const mapRawgGameToGame = (rawg: any): Game => {
  const coverUrl = rawg.background_image || rawg.background_image_additional || '';

  const mappedGenres = (rawg.genres || []).map((g: any) => ({
    id: g.id,
    name: g.name,
    slug: g.slug,
  }));

  const mappedPlatforms = (rawg.platforms || []).map((p: any) => ({
    id: p.platform.id,
    name: p.platform.name,
    abbreviation: p.platform.name,
  }));

  const mappedScreenshots = (rawg.short_screenshots || []).map((s: any) => ({
    id: s.id,
    image_id: s.image,
  }));

  const releaseDate = rawg.released
    ? Math.floor(new Date(rawg.released).getTime() / 1000)
    : undefined;

  return {
    id: rawg.id,
    name: rawg.name || 'Untitled Game',
    slug: rawg.slug || '',
    cover: coverUrl ? { id: rawg.id, image_id: coverUrl } : undefined,
    summary: rawg.description_raw || rawg.description || rawg.slug || '',
    storyline: '',
    first_release_date: releaseDate,
    rating: rawg.rating ? Number((rawg.rating * 20).toFixed(1)) : undefined,
    aggregated_rating: rawg.metacritic ? Number(rawg.metacritic) : undefined,
    genres: mappedGenres,
    platforms: mappedPlatforms,
    screenshots: mappedScreenshots,
  };
};

// Fallback search filter helper
const filterFallbackGames = (q: string): Game[] => {
  const cleanQ = q.toLowerCase();
  return FALLBACK_GAMES.filter(
    (g) =>
      g.name.toLowerCase().includes(cleanQ) ||
      g.genres?.some((genre) => genre.name.toLowerCase().includes(cleanQ))
  );
};

// Comprehensive Catalog Fallback
export const FALLBACK_GAMES: Game[] = [
  {
    id: 19560,
    name: 'God of War (2018)',
    slug: 'god-of-war-2018',
    cover: { id: 101, image_id: 'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229b56bf69be5a.jpg' },
    rating: 96.0,
    aggregated_rating: 95.0,
    summary: 'His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters.',
    first_release_date: 1524182400,
    genres: [{ id: 4, name: 'Action', slug: 'action' }],
    platforms: [{ id: 187, name: 'PlayStation 5', abbreviation: 'PS5' }],
  },
  {
    id: 112875,
    name: 'God of War Ragnarök',
    slug: 'god-of-war-ragnarok',
    cover: { id: 102, image_id: 'https://media.rawg.io/media/games/3b9/3b9e4a83709b1f7b06859d0efdf007a1.jpg' },
    rating: 94.8,
    aggregated_rating: 94.0,
    summary: 'Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle.',
    first_release_date: 1667952000,
    genres: [{ id: 4, name: 'Action', slug: 'action' }],
    platforms: [{ id: 187, name: 'PlayStation 5', abbreviation: 'PS5' }],
  },
  {
    id: 11467,
    name: 'God of War III Remastered',
    slug: 'god-of-war-iii-remastered',
    cover: { id: 103, image_id: 'https://media.rawg.io/media/games/8d6/8d69df6b270a6485303f7a78385210e7.jpg' },
    rating: 90.0,
    aggregated_rating: 88.0,
    summary: 'Set in the realm of brutal Greek mythology, God of War III Remastered brings Kratos\' epic vengeance on Mount Olympus to life.',
    first_release_date: 1436832000,
    genres: [{ id: 4, name: 'Action', slug: 'action' }],
    platforms: [{ id: 18, name: 'PlayStation 4', abbreviation: 'PS4' }],
  },
  {
    id: 7346,
    name: 'The Legend of Zelda: Breath of the Wild',
    slug: 'zelda-breath-of-the-wild',
    cover: { id: 104, image_id: 'https://media.rawg.io/media/games/cc1/cc196a5ad763955d6efe99773e713792.jpg' },
    rating: 97.5,
    aggregated_rating: 97.0,
    summary: 'Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild.',
    first_release_date: 1488508800,
    genres: [{ id: 3, name: 'Adventure', slug: 'adventure' }],
    platforms: [{ id: 7, name: 'Nintendo Switch', abbreviation: 'NSW' }],
  },
  {
    id: 119388,
    name: 'The Legend of Zelda: Tears of the Kingdom',
    slug: 'zelda-tears-of-the-kingdom',
    cover: { id: 105, image_id: 'https://media.rawg.io/media/games/603/6033bc6d01d418521946059d04f2f45f.jpg' },
    rating: 96.2,
    aggregated_rating: 96.0,
    summary: 'An epic adventure across the land and skies of Hyrule awaits in Tears of the Kingdom.',
    first_release_date: 1683859200,
    genres: [{ id: 3, name: 'Adventure', slug: 'adventure' }],
    platforms: [{ id: 7, name: 'Nintendo Switch', abbreviation: 'NSW' }],
  },
  {
    id: 112,
    name: 'Red Dead Redemption 2',
    slug: 'red-dead-redemption-2',
    cover: { id: 108, image_id: 'https://media.rawg.io/media/games/511/51182115f4170fbc99d94f378a310d36.jpg' },
    rating: 97.8,
    aggregated_rating: 97.0,
    summary: 'America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run.',
    first_release_date: 1540512000,
    genres: [{ id: 4, name: 'Action', slug: 'action' }],
    platforms: [{ id: 187, name: 'PlayStation 5', abbreviation: 'PS5' }],
  },
  {
    id: 114283,
    name: 'Elden Ring',
    slug: 'elden-ring',
    cover: { id: 109, image_id: 'https://media.rawg.io/media/games/b29/b294fdd866dcdbca031448065e156e7e.jpg' },
    rating: 96.0,
    aggregated_rating: 96.5,
    summary: 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.',
    first_release_date: 1645747200,
    genres: [{ id: 5, name: 'RPG', slug: 'rpg' }],
    platforms: [{ id: 187, name: 'PlayStation 5', abbreviation: 'PS5' }],
  },
  {
    id: 119031,
    name: 'Cyberpunk 2077',
    slug: 'cyberpunk-2077',
    cover: { id: 112, image_id: 'https://media.rawg.io/media/games/7cf/7cfc92f8b0d5c42e5596bfa8b1204079.jpg' },
    rating: 88.5,
    aggregated_rating: 89.0,
    summary: 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City.',
    first_release_date: 1607558400,
    genres: [{ id: 5, name: 'RPG', slug: 'rpg' }],
    platforms: [{ id: 187, name: 'PlayStation 5', abbreviation: 'PS5' }],
  },
];

export const MOCK_GAMES = FALLBACK_GAMES;
