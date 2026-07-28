/**
 * Premium Action Button Component with Crimson Glow & Glass Outlines
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, borderRadius, spacing, shadows } from '@/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  pill = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      case 'glass':
        return styles.glass;
      case 'danger':
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return styles.sizeSm;
      case 'lg':
        return styles.sizeLg;
      default:
        return styles.sizeMd;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.78}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        getContainerStyle(),
        getSizeStyle(),
        pill && styles.pillRadius,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.text.primary} size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.textBase,
              variant === 'outline' || variant === 'glass' ? styles.textGlow : styles.textPrimary,
              size === 'sm' && styles.textSm,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    gap: spacing.xs + 2,
  },
  pillRadius: {
    borderRadius: borderRadius.pill,
  },
  primary: {
    backgroundColor: colors.accent.primary,
    ...shadows.buttonRed,
  },
  secondary: {
    backgroundColor: colors.background.tertiary,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.accent.glow,
  },
  glass: {
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  danger: {
    backgroundColor: colors.accent.dark,
  },
  sizeSm: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },
  sizeMd: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
  },
  sizeLg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  disabled: {
    opacity: 0.45,
  },
  textBase: {
    ...typography.h4,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  textPrimary: {
    color: colors.text.primary,
  },
  textGlow: {
    color: colors.accent.glow,
  },
  textSm: {
    fontSize: 12,
  },
});
