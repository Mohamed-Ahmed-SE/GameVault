/**
 * Premium Game Cover Card with Rating Glass Badge & Favorite Heart Toggle
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Star, Heart } from 'lucide-react-native';
import { Game } from '@/types/game';
import { colors, typography, borderRadius, spacing, cardDimensions, shadows } from '@/theme';
import { getIGDBImageUrl } from '@/utils/constants';
import { useLibraryStore } from '@/store/useLibraryStore';

interface GameCardProps {
  game: Game;
  onPress: () => void;
  width?: number;
  height?: number;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onPress,
  width = cardDimensions.gridCoverWidth,
  height = cardDimensions.gridCoverHeight,
}) => {
  const coverUrl = getIGDBImageUrl(game.cover?.image_id, 'coverBig');
  const entry = useLibraryStore((state) => state.getEntryByIgdbId(game.id));
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);

  const ratingDisplay = game.rating
    ? (game.rating / 20).toFixed(1)
    : entry?.userRating
    ? entry.userRating.toFixed(1)
    : null;

  const platformBadge = game.platforms && game.platforms.length > 0
    ? game.platforms[0].abbreviation || game.platforms[0].name
    : null;

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      style={[styles.container, { width }]}
    >
      <View style={[styles.coverWrapper, { width, height }]}>
        <Image
          source={{ uri: coverUrl }}
          style={styles.coverImage}
          resizeMode="cover"
        />

        {/* Bottom Dark Scrim for visual contrast */}
        <View style={styles.scrimOverlay} />

        {/* Rating Glass Badge */}
        {ratingDisplay && (
          <View style={styles.ratingBadge}>
            <Star size={11} color={colors.rating.star} fill={colors.rating.star} />
            <Text style={styles.ratingText}>{ratingDisplay}</Text>
          </View>
        )}

        {/* Platform Badge overlay at bottom left */}
        {platformBadge && (
          <View style={styles.platformBadge}>
            <Text style={styles.platformText} numberOfLines={1}>
              {platformBadge}
            </Text>
          </View>
        )}

        {/* Favorite Heart Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(game.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Heart
            size={13}
            color={entry?.favorite ? colors.accent.glow : '#FFF'}
            fill={entry?.favorite ? colors.accent.glow : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {game.name}
      </Text>

      {game.genres && game.genres.length > 0 && (
        <Text style={styles.genreText} numberOfLines={1}>
          {game.genres[0].name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  coverWrapper: {
    borderRadius: borderRadius.md + 2,
    overflow: 'hidden',
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    position: 'relative',
    ...shadows.card,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  scrimOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: 'rgba(10, 9, 13, 0.45)',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.xs + 2,
    left: spacing.xs + 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glassDark,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: borderRadius.xs + 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 3,
  },
  ratingText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.text.primary,
  },
  platformBadge: {
    position: 'absolute',
    bottom: spacing.xs + 2,
    left: spacing.xs + 2,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    maxWidth: '70%',
  },
  platformText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.xs + 2,
    right: spacing.xs + 2,
    backgroundColor: 'rgba(10, 9, 13, 0.8)',
    width: 26,
    height: 26,
    borderRadius: borderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  title: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: 2,
    fontSize: 13,
  },
  genreText: {
    ...typography.caption,
    color: colors.text.muted,
    fontSize: 11,
  },
});
