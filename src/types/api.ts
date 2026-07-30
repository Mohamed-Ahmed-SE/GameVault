/**
 * API Response & Search Parameter Interfaces
 */

export interface IGDBQueryParams {
  query?: string;
  limit?: number;
  offset?: number;
  genreIds?: number[];
  platformIds?: number[];
  minRating?: number;
  releaseYear?: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}
