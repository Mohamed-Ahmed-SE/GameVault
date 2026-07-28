/**
 * Interactive & Read-only Star Rating Component
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors, typography, spacing } from '@/theme';

interface StarRatingProps {
  rating: number; // 0 to 5 or 0 to 10 scale
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showText?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 16,
  interactive = false,
  onRatingChange,
  showText = true,
}) => {
  const normalizedRating = rating > 5 ? rating / 2 : rating;

  return (
    <View style={styles.container}>
      <View style={styles.starsRow}>
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = normalizedRating >= starValue;
          const isHalf = normalizedRating >= starValue - 0.5 && normalizedRating < starValue;

          return (
            <TouchableOpacity
              key={index}
              disabled={!interactive}
              onPress={() => onRatingChange && onRatingChange(starValue)}
              activeOpacity={0.7}
            >
              <Star
                size={size}
                color={isFilled || isHalf ? colors.rating.star : colors.rating.unrated}
                fill={isFilled ? colors.rating.star : 'transparent'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {showText && (
        <Text style={styles.ratingText}>{normalizedRating.toFixed(1)} / 5</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '600',
  },
});
