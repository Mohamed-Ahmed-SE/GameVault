/**
 * Personal Library Screen with Gaming Stats Header, Color-Coded Status Tabs & Grid View
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Layers,
  Play,
  CheckCircle2,
  Clock,
  PauseCircle,
  XCircle,
  Bookmark,
  Gamepad2,
  Trophy,
  Hourglass,
  Plus,
} from 'lucide-react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/theme';
import { Header } from '@/components/ui/Header';
import { GameGrid } from '@/components/game/GameGrid';
import { Button } from '@/components/ui/Button';
import { useLibraryStore } from '@/store/useLibraryStore';
import { GameStatus } from '@/types/library';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

const CATEGORIES: { label: string; value: GameStatus | 'all'; Icon: any; color: string }[] = [
  { label: 'All', value: 'all', Icon: Layers, color: colors.accent.glow },
  { label: 'Playing', value: 'playing', Icon: Play, color: colors.status.playing },
  { label: 'Completed', value: 'completed', Icon: CheckCircle2, color: colors.status.completed },
  { label: 'Backlog', value: 'backlog', Icon: Clock, color: colors.status.backlog },
  { label: 'Wishlist', value: 'wishlist', Icon: Bookmark, color: colors.status.wishlist },
  { label: 'Paused', value: 'paused', Icon: PauseCircle, color: colors.status.paused },
  { label: 'Dropped', value: 'dropped', Icon: XCircle, color: colors.status.dropped },
];

export const LibraryScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const library = useLibraryStore((state) => state.library);
  const activeFilter = useLibraryStore((state) => state.activeFilter);
  const setActiveFilter = useLibraryStore((state) => state.setActiveFilter);
  const totalGames = library.length;
  const completedCount = library.filter((e) => e.status === 'completed').length;
  const totalHours = library.reduce((acc, curr) => acc + (curr.hoursPlayed || 0), 0);

  const filteredEntries = library.filter((item) =>
    activeFilter === 'all' ? true : item.status === activeFilter
  );

  const filteredGames = filteredEntries
    .map((entry) => entry.gameData)
    .filter((g): g is NonNullable<typeof g> => !!g);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Personal Vault"
        subtitle="Organize & Track Your Gaming Collection"
      />

      {/* Top Quick Stats Summary Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Gamepad2 size={16} color={colors.accent.glow} />
          <View>
            <Text style={styles.statNumber}>{totalGames}</Text>
            <Text style={styles.statLabel}>Total Games</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Trophy size={16} color={colors.status.completed} />
          <View>
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Hourglass size={16} color={colors.rating.star} />
          <View>
            <Text style={styles.statNumber}>{totalHours} hrs</Text>
            <Text style={styles.statLabel}>Logged Time</Text>
          </View>
        </View>
      </View>

      {/* Category Status Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.value;
            const { Icon, color } = cat;
            const count =
              cat.value === 'all'
                ? library.length
                : library.filter((e) => e.status === cat.value).length;

            return (
              <TouchableOpacity
                key={cat.value}
                style={[
                  styles.tabPill,
                  isActive && { backgroundColor: colors.background.tertiary, borderColor: color },
                ]}
                onPress={() => setActiveFilter(cat.value)}
                activeOpacity={0.75}
              >
                <Icon size={13} color={isActive ? color : colors.text.muted} />
                <Text style={[styles.tabText, isActive && { color: colors.text.primary, fontWeight: '700' }]}>
                  {cat.label} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Library Grid or Empty State */}
      <View style={styles.content}>
        {filteredGames.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Gamepad2 size={44} color={colors.text.muted} />
            <Text style={styles.emptyTitle}>No games in {activeFilter.toUpperCase()}</Text>
            <Text style={styles.emptySubtitle}>Start adding games from the discovery home or search screen!</Text>
            <Button
              title="EXPLORE GAMES"
              onPress={() => navigation.navigate('MainTabs' as any, { screen: 'Home' })}
              icon={<Plus size={16} color="#FFF" />}
              style={styles.exploreBtn}
            />
          </View>
        ) : (
          <GameGrid
            games={filteredGames}
            onGamePress={(game) => navigation.navigate('Details', { game })}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  statNumber: {
    ...typography.h4,
    fontSize: 14,
    fontWeight: '800',
    color: colors.text.primary,
  },
  statLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.text.muted,
  },
  tabsContainer: {
    marginBottom: spacing.sm,
  },
  tabsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs + 2,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: 6,
  },
  tabText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  emptySubtitle: {
    ...typography.bodyMedium,
    color: colors.text.muted,
    textAlign: 'center',
  },
  exploreBtn: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
  },
});
