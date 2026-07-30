/**
 * Game Interfaces matching IGDB API v4 schema & cache representation
 */

export interface IGDBImage {
  id: number;
  image_id: string;
  url?: string;
  width?: number;
  height?: number;
}

export interface IGDBCompany {
  id: number;
  name: string;
  logo?: IGDBImage;
}

export interface IGDBInvolvedCompany {
  id: number;
  company: IGDBCompany;
  developer: boolean;
  publisher: boolean;
}

export interface IGDBGenre {
  id: number;
  name: string;
  slug: string;
}

export interface IGDBPlatform {
  id: number;
  name: string;
  abbreviation?: string;
  platform_logo?: IGDBImage;
}

export interface IGDBVideo {
  id: number;
  name: string;
  video_id: string; // YouTube Video ID
}

export interface Game {
  id: number; // IGDB ID
  name: string;
  slug: string;
  cover?: IGDBImage;
  summary?: string;
  storyline?: string;
  first_release_date?: number; // Unix timestamp
  rating?: number; // IGDB rating out of 100
  aggregated_rating?: number; // Critic rating out of 100
  genres?: IGDBGenre[];
  platforms?: IGDBPlatform[];
  involved_companies?: IGDBInvolvedCompany[];
  screenshots?: IGDBImage[];
  videos?: IGDBVideo[];
  similar_games?: Game[];
}
