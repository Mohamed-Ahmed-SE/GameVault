/**
 * Global App Constants & Cover Image Helper for RAWG & IGDB API
 */

export const IGDB_IMAGE_SIZES = {
  coverSmall: 't_cover_small',
  coverBig: 't_cover_big',
  screenshotMed: 't_screenshot_med',
  screenshotBig: 't_screenshot_big',
  screenshotHuge: 't_screenshot_huge',
  hd1080p: 't_1080p',
  micro: 't_micro',
  thumb: 't_thumb',
};

export const getIGDBImageUrl = (
  imageId?: string,
  size: keyof typeof IGDB_IMAGE_SIZES = 'coverBig'
): string => {
  if (!imageId) return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400';
  if (imageId.startsWith('http://') || imageId.startsWith('https://')) {
    return imageId;
  }
  const sizeCode = IGDB_IMAGE_SIZES[size] || IGDB_IMAGE_SIZES.coverBig;
  return `https://images.igdb.com/igdb/image/upload/${sizeCode}/${imageId}.jpg`;
};

export const POPULAR_GENRES = [
  { id: 4, name: 'Action' },
  { id: 5, name: 'RPG' },
  { id: 3, name: 'Adventure' },
  { id: 2, name: 'Shooter' },
  { id: 7, name: 'Puzzle' },
  { id: 1, name: 'Racing' },
  { id: 10, name: 'Strategy' },
  { id: 15, name: 'Sports' },
];

export const POPULAR_PLATFORMS = [
  { id: 187, name: 'PlayStation 5', abbrev: 'PS5' },
  { id: 186, name: 'Xbox Series X|S', abbrev: 'XSX' },
  { id: 7, name: 'Nintendo Switch', abbrev: 'NSW' },
  { id: 4, name: 'PC', abbrev: 'PC' },
  { id: 18, name: 'PlayStation 4', abbrev: 'PS4' },
];
