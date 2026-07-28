/**
 * Obsidian Surface Card Container with Optional Red Glow Border
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'flat' | 'elevated' | 'glow';
}

export const Card: React.FC<CardProps> = ({ children, style, variant = 'flat' }) => {
  return (
    <View
      style={[
        styles.card,
        variant === 'elevated' && styles.elevated,
        variant === 'glow' && styles.glow,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  elevated: {
    backgroundColor: colors.background.tertiary,
    ...shadows.card,
  },
  glow: {
    borderColor: colors.border.glow,
    ...shadows.redGlow,
  },
});
