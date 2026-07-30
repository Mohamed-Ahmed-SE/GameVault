/**
 * Category Status Pill using Lucide React Native Icons (No Emojis)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Play, CheckCircle2, Clock, PauseCircle, XCircle, Bookmark } from 'lucide-react-native';
import { GameStatus } from '@/types/library';
import { colors, typography, borderRadius, spacing } from '@/theme';

interface StatusPillProps {
  status: GameStatus;
  showIcon?: boolean;
}

const STATUS_CONFIG: Record<
  GameStatus,
  { label: string; color: string; Icon: any }
> = {
  playing: { label: 'Playing', color: colors.status.playing, Icon: Play },
  completed: { label: 'Completed', color: colors.status.completed, Icon: CheckCircle2 },
  backlog: { label: 'Backlog', color: colors.status.backlog, Icon: Clock },
  paused: { label: 'Paused', color: colors.status.paused, Icon: PauseCircle },
  dropped: { label: 'Dropped', color: colors.status.dropped, Icon: XCircle },
  wishlist: { label: 'Wishlist', color: colors.status.wishlist, Icon: Bookmark },
};

export const StatusPill: React.FC<StatusPillProps> = ({ status, showIcon = true }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.backlog;
  const { Icon } = config;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `${config.color}18`, borderColor: config.color },
      ]}
    >
      {showIcon && <Icon size={10} color={config.color} />}
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs + 2,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    gap: 4,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.badge,
    fontSize: 10,
  },
});
