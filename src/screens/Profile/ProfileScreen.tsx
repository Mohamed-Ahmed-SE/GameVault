/**
 * Gamer Showcase Profile Screen (Letterboxd Top 4 Favorites, Gaming Stats, Custom Lists, & Achievements)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Trophy,
  Clock,
  Star,
  Gamepad2,
  Award,
  Heart,
  ListOrdered,
  Percent,
  Lock,
  LogOut,
  Sparkles,
} from 'lucide-react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GameCard } from '@/components/game/GameCard';
import { useAuthStore } from '@/store/useAuthStore';
import { useLibraryStore } from '@/store/useLibraryStore';
import { MOCK_GAMES } from '@/api/igdb';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@/components/ui/Header';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const library = useLibraryStore((state) => state.library);

  const completedCount = library.filter((e) => e.status === 'completed').length;
  const totalHours = library.reduce((acc, curr) => acc + (curr.hoursPlayed || 0), 0);
  const completionRate = library.length > 0 ? Math.round((completedCount / library.length) * 100) : 0;

  // Favorite 4 games
  const favoriteEntries = library.filter((e) => e.favorite).map((e) => e.gameData).filter((g): g is NonNullable<typeof g> => !!g);
  const topFavorites = favoriteEntries.length > 0 ? favoriteEntries.slice(0, 4) : MOCK_GAMES.slice(0, 4);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Gamer Profile"
        subtitle="Stats, Collections & Badges"
        rightElement={
          <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.7}>
            <LogOut size={18} color={colors.accent.glow} />
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Gamer Profile Card */}
        <Card variant="glow" style={styles.profileHeaderCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: user?.avatarUrl || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80' }}
              style={styles.avatar}
            />
            <View style={styles.platformBadge}>
              <Gamepad2 size={12} color="#FFF" />
            </View>
          </View>

          <Text style={styles.displayName}>{user?.displayName || 'Pro Gamer'}</Text>
          <Text style={styles.username}>@{user?.username || 'gamevault_user'}</Text>
          {user?.bio && <Text style={styles.bio}>{user.bio}</Text>}

          <View style={styles.favGenresRow}>
            {(user?.favoriteGenres || ['RPG', 'Action', 'Adventure']).map((g) => (
              <Badge key={g} label={g} backgroundColor={colors.accent.darkSubtle} color={colors.accent.light} />
            ))}
          </View>
        </Card>

        {/* Top 4 Favorite Games (Letterboxd Showcase) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Heart size={18} color={colors.accent.glow} fill={colors.accent.glow} />
            <Text style={styles.sectionTitle}>Top 4 Favorites</Text>
          </View>
          <View style={styles.favoritesGrid}>
            {topFavorites.map((g) => (
              <GameCard key={g.id} game={g} width={82} height={112} onPress={() => (navigation as any).navigate('Details', { game: g })} />
            ))}
          </View>
        </View>

        {/* Gaming Statistics Dashboard */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Trophy size={18} color={colors.rating.star} />
            <Text style={styles.sectionTitle}>Gaming Analytics</Text>
          </View>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Gamepad2 size={20} color={colors.accent.glow} />
              <Text style={styles.statNumber}>{library.length}</Text>
              <Text style={styles.statLabel}>Games Tracked</Text>
            </Card>

            <Card style={styles.statCard}>
              <Trophy size={20} color={colors.status.completed} />
              <Text style={styles.statNumber}>{completedCount}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </Card>

            <Card style={styles.statCard}>
              <Clock size={20} color={colors.status.backlog} />
              <Text style={styles.statNumber}>{totalHours} hrs</Text>
              <Text style={styles.statLabel}>Hours Logged</Text>
            </Card>

            <Card style={styles.statCard}>
              <Percent size={20} color={colors.status.playing} />
              <Text style={styles.statNumber}>{completionRate}%</Text>
              <Text style={styles.statLabel}>Completion %</Text>
            </Card>
          </View>
        </View>

        {/* Custom Lists Showcase */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <ListOrdered size={18} color={colors.accent.light} />
            <Text style={styles.sectionTitle}>Custom Playlists</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listsScroll}>
            <Card style={styles.listCard}>
              <Text style={styles.listTitle}>Best RPGs of All Time</Text>
              <Text style={styles.listMeta}>12 Games • Curated List</Text>
            </Card>
            <Card style={styles.listCard}>
              <Text style={styles.listTitle}>Co-op Weekend Classics</Text>
              <Text style={styles.listMeta}>8 Games • Curated List</Text>
            </Card>
          </ScrollView>
        </View>

        {/* Gamification Achievements */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Award size={18} color={colors.rating.star} />
            <Text style={styles.sectionTitle}>Gamer Achievements</Text>
          </View>

          <Card style={styles.achievementCard}>
            <View style={styles.achieveRow}>
              <Award size={24} color={colors.rating.star} />
              <View style={styles.achieveText}>
                <Text style={styles.achieveTitle}>First Step</Text>
                <Text style={styles.achieveDesc}>Added first game to library</Text>
              </View>
              <Badge label="UNLOCKED" backgroundColor={colors.status.completed} color="#FFF" />
            </View>
          </Card>

          <Card style={styles.achievementCard}>
            <View style={styles.achieveRow}>
              <Trophy size={24} color={colors.status.completed} />
              <View style={styles.achieveText}>
                <Text style={styles.achieveTitle}>Game Vault Master</Text>
                <Text style={styles.achieveDesc}>Explored 500,000+ title database</Text>
              </View>
              <Badge label="UNLOCKED" backgroundColor={colors.status.completed} color="#FFF" />
            </View>
          </Card>

          <Card style={[styles.achievementCard, { opacity: 0.6 }]}>
            <View style={styles.achieveRow}>
              <Lock size={24} color={colors.text.muted} />
              <View style={styles.achieveText}>
                <Text style={styles.achieveTitle}>100 Hours Logged</Text>
                <Text style={styles.achieveDesc}>Log 100 hours of gameplay ({totalHours}/100)</Text>
              </View>
              <Badge label="LOCKED" backgroundColor={colors.background.tertiary} color={colors.text.muted} />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  logoutBtn: {
    padding: spacing.xs + 3,
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
  },
  profileHeaderCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.xs,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: spacing.xs,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: borderRadius.pill,
    borderWidth: 2.5,
    borderColor: colors.accent.glow,
  },
  platformBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.accent.primary,
    padding: 6,
    borderRadius: borderRadius.pill,
  },
  displayName: {
    ...typography.h2,
    color: colors.text.primary,
  },
  username: {
    ...typography.caption,
    color: colors.text.muted,
  },
  bio: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  favGenresRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  sectionContainer: {
    gap: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  favoritesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.xxs,
  },
  statNumber: {
    ...typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: colors.text.primary,
  },
  statLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.text.secondary,
  },
  listsScroll: {
    gap: spacing.md,
  },
  listCard: {
    width: 190,
    padding: spacing.md,
    gap: spacing.xs,
  },
  listTitle: {
    ...typography.h4,
    fontSize: 14,
    color: colors.text.primary,
  },
  listMeta: {
    ...typography.caption,
    color: colors.text.muted,
  },
  achievementCard: {
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  achieveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  achieveText: {
    flex: 1,
  },
  achieveTitle: {
    ...typography.h4,
    fontSize: 14,
    color: colors.text.primary,
  },
  achieveDesc: {
    ...typography.caption,
    fontSize: 11,
    color: colors.text.secondary,
  },
});
