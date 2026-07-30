/**
 * Helper Formatters for Dates, Ratings, Playtimes & Numbers
 */

export const formatDate = (timestamp?: number | string): string => {
  if (!timestamp) return 'TBA';
  const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatRating = (rating?: number): string => {
  if (rating === undefined || rating === null) return 'N/A';
  // IGDB rates 0-100, normalize to 10-point or 5-star scale
  const normalized = rating > 10 ? (rating / 10).toFixed(1) : rating.toFixed(1);
  return `${normalized} / 10`;
};

export const formatStarRating = (rating?: number): string => {
  if (!rating) return '0.0';
  return (rating > 5 ? rating / 2 : rating).toFixed(1);
};

export const formatHours = (hours?: number): string => {
  if (!hours || hours === 0) return '0 hrs';
  return `${hours.toFixed(1)} hrs`;
};
