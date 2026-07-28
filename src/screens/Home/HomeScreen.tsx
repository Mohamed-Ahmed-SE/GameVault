/**
 * Dynamic Home Discovery Screen with Featured Hero Banner, Genre Filter Bar & Curated Game Sections
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Flame,
  Sparkles,
  Trophy,
  Swords,
  Compass,
  Star,
  Plus,
  Heart,
  Info,
  CheckCircle2,
  ChevronRight,
  Filter,
} from 'lucide-react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/theme';
import { Header } from '@/components/ui/Header';
import { GameGrid } from '@/components/game/GameGrid';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { fetchTrendingGames, fetchNewReleases, MOCK_GAMES } from '@/api/igdb';
import { Game } from '@/types/game';
import { getIGDBImageUrl } from '@/utils/constants';
import { useLibraryStore } from '@/store/useLibraryStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

const GENRE_CATEGORIES = [
  'All',
  'Action',
  'RPG',
  'Adventure',
  'Shooter',
  'Indie',
  'Strategy',
  'Sports',
];

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [trending, setTrending] = useState<Game[]>([]);
  const [newReleases, setNewReleases] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const featuredGame = MOCK_GAMES[0]; // God of War (2018) / Elden Ring hero
  const entry = useLibraryStore((state) => state.getEntryByIgdbId(featuredGame.id));
  const upsertEntry = useLibraryStore((state) => state.upsertEntry);
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const [trendData, releaseData] = await Promise.all([
          fetchTrendingGames(),
          fetchNewReleases(),
        ]);
        setTrending(trendData);
        setNewReleases(releaseData);
      } catch {
        setTrending(MOCK_GAMES);
        setNewReleases(MOCK_GAMES.slice(2));
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  const handleGamePress = (game: Game) => {
    navigation.navigate('Details', { game });
  };

  const filterGamesByGenre = (games: Game[]) => {
    if (activeCategory === 'All') return games;
    const cat = activeCategory.toLowerCase();
    return games.filter((g) =>
      g.genres?.some((genre) => genre.name.toLowerCase().includes(cat))
    );
  };

  const featuredCoverUrl = getIGDBImageUrl(featuredGame.cover?.image_id, 'hd1080p');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <Header
        title="GameVault"
        subtitle="Discover, Rate & Track Video Games"
        rightElement={
          <TouchableOpacity
            style={styles.searchHeaderIcon}
            onPress={() => navigation.navigate('MainTabs' as any, { screen: 'Search' })}
            activeOpacity={0.7}
          >
            <Compass size={20} color={colors.accent.glow} />
          </TouchableOpacity>
        }
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent.glow} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Top Category Filter Bar */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryBar}
          >
            {GENRE_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <TouchableOpacity
                  key={category}
                  activeOpacity={0.75}
                  onPress={() => setActiveCategory(category)}
                  style={[
                    styles.categoryPill,
                    isActive && styles.categoryPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isActive && styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Top Featured Hero Banner */}
          <View style={styles.heroContainer}>
            <Image source={{ uri: featuredCoverUrl }} style={styles.heroImage} resizeMode="cover" />
            <View style={styles.heroGradientOverlay} />

            <View style={styles.heroContent}>
              <View style={styles.heroBadgeRow}>
                <Badge label="SPOTLIGHT" backgroundColor={colors.accent.primary} color="#FFF" />
                <View style={styles.heroRating}>
                  <Star size={13} color={colors.rating.star} fill={colors.rating.star} />
                  <Text style={styles.heroRatingText}>{featuredGame.rating?.toFixed(1)}</Text>
                </View>
              </View>

              <Text style={styles.heroTitle}>{featuredGame.name}</Text>
              <Text style={styles.heroSummary} numberOfLines={2}>
                {featuredGame.summary}
              </Text>

              <View style={styles.heroActions}>
                <Button
                  title={entry ? entry.status.toUpperCase() : 'ADD TO LIBRARY'}
                  onPress={() => upsertEntry(featuredGame, 'playing', 4.5)}
                  size="sm"
                  icon={
                    entry ? (
                      <CheckCircle2 size={15} color="#FFF" />
                    ) : (
                      <Plus size={15} color="#FFF" />
                    )
                  }
                  style={styles.heroBtn}
                />
                <Button
                  title="DETAILS"
                  variant="glass"
                  size="sm"
                  onPress={() => handleGamePress(featuredGame)}
                  icon={<Info size={15} color={colors.accent.glow} />}
                  style={styles.heroBtnOutline}
                />
                <TouchableOpacity
                  style={styles.heroFavBtn}
                  onPress={() => toggleFavorite(featuredGame.id)}
                  activeOpacity={0.7}
                >
                  <Heart
                    size={18}
                    color={entry?.favorite ? colors.accent.glow : colors.text.primary}
                    fill={entry?.favorite ? colors.accent.glow : 'transparent'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Section 1: Trending Now */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderTitleRow}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 46, 77, 0.15)' }]}>
                  <Flame size={18} color={colors.accent.glow} />
                </View>
                <Text style={styles.sectionTitle}>Trending Games</Text>
              </View>
              <TouchableOpacity
                style={styles.seeAllBtn}
                onPress={() => navigation.navigate('MainTabs' as any, { screen: 'Search' })}
              >
                <Text style={styles.seeAllText}>See All</Text>
                <ChevronRight size={14} color={colors.accent.glow} />
              </TouchableOpacity>
            </View>
            <GameGrid games={filterGamesByGenre(trending)} horizontal onGamePress={handleGamePress} />
          </View>

          {/* Section 2: New Releases */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderTitleRow}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 94, 120, 0.15)' }]}>
                  <Sparkles size={18} color={colors.accent.light} />
                </View>
                <Text style={styles.sectionTitle}>New Releases</Text>
              </View>
              <TouchableOpacity
                style={styles.seeAllBtn}
                onPress={() => navigation.navigate('MainTabs' as any, { screen: 'Search' })}
              >
                <Text style={styles.seeAllText}>See All</Text>
                <ChevronRight size={14} color={colors.accent.glow} />
              </TouchableOpacity>
            </View>
            <GameGrid games={filterGamesByGenre(newReleases)} horizontal onGamePress={handleGamePress} />
          </View>

          {/* Section 3: RPG & Action Masterpieces */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderTitleRow}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
                  <Swords size={18} color={colors.status.playing} />
                </View>
                <Text style={styles.sectionTitle}>RPG & Action Masterpieces</Text>
              </View>
            </View>
            <GameGrid games={MOCK_GAMES.slice(1, 6)} horizontal onGamePress={handleGamePress} />
          </View>

          {/* Section 4: Top Metacritic Hall of Fame */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderTitleRow}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 184, 0, 0.15)' }]}>
                  <Trophy size={18} color={colors.rating.star} />
                </View>
                <Text style={styles.sectionTitle}>Hall of Fame (90+ Rating)</Text>
              </View>
            </View>
            <GameGrid games={MOCK_GAMES.slice(3)} horizontal onGamePress={handleGamePress} />
          </View>

        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  searchHeaderIcon: {
    padding: spacing.xs + 3,
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
  },
  categoryBar: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs + 2,
  },
  categoryPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  categoryPillActive: {
    backgroundColor: colors.accent.darkSubtle,
    borderColor: colors.accent.glow,
  },
  categoryText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.text.muted,
  },
  categoryTextActive: {
    color: colors.accent.glow,
    fontWeight: '700',
  },
  heroContainer: {
    height: 310,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border.glow,
    ...shadows.redGlow,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 9, 13, 0.76)',
  },
  heroContent: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    gap: spacing.xs,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(10, 9, 13, 0.85)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  heroRatingText: {
    ...typography.caption,
    fontWeight: '800',
    color: colors.rating.star,
  },
  heroTitle: {
    ...typography.h1,
    fontSize: 22,
    color: colors.text.primary,
  },
  heroSummary: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    lineHeight: 17,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    marginTop: spacing.xs,
  },
  heroBtn: {
    flex: 1.2,
  },
  heroBtnOutline: {
    flex: 1,
  },
  heroFavBtn: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  section: {
    gap: spacing.sm + 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  sectionHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 4,
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 17,
    fontWeight: '700',
    color: colors.text.primary,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent.glow,
  },
});
