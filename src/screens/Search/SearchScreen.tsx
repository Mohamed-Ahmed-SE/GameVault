/**
 * Premium Search & Advanced Filter Screen with Live Results Count & Platform Pills
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Search, X, Filter, Gamepad2, Sparkles } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/theme';
import { Input } from '@/components/ui/Input';
import { GameGrid } from '@/components/game/GameGrid';
import { searchGames, MOCK_GAMES } from '@/api/igdb';
import { Game } from '@/types/game';
import { POPULAR_GENRES } from '@/utils/constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

const PLATFORMS = ['All', 'PS5', 'Xbox', 'Switch', 'PC'];

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>(MOCK_GAMES);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('All');

  const handleSearch = async (text: string) => {
    setQuery(text);
    setLoading(true);
    try {
      if (!text.trim()) {
        setResults(MOCK_GAMES);
      } else {
        const res = await searchGames(text);
        setResults(res);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults(MOCK_GAMES);
  };

  // Filter results client side by genre & platform if selected
  const filteredResults = results.filter((g) => {
    if (selectedGenre !== null) {
      if (!g.genres?.some((genre) => genre.id === selectedGenre)) return false;
    }
    if (selectedPlatform !== 'All') {
      const pClean = selectedPlatform.toLowerCase();
      if (!g.platforms?.some((p) => p.name.toLowerCase().includes(pClean) || p.abbreviation?.toLowerCase().includes(pClean))) return false;
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Search Catalog</Text>
          <View style={styles.databaseBadge}>
            <Sparkles size={12} color={colors.accent.glow} />
            <Text style={styles.databaseBadgeText}>500,000+ Games</Text>
          </View>
        </View>

        <Input
          placeholder="Search games, franchises, titles..."
          value={query}
          onChangeText={handleSearch}
          leftIcon={<Search size={18} color={colors.accent.glow} />}
          rightIcon={
            query.length > 0 ? (
              <TouchableOpacity onPress={clearSearch} activeOpacity={0.7}>
                <X size={18} color={colors.text.muted} />
              </TouchableOpacity>
            ) : null
          }
        />
      </View>

      {/* Platform & Genre Quick Filters */}
      <View style={styles.filterSection}>
        {/* Platforms Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsScroll}>
          <View style={styles.filterLabelBox}>
            <Gamepad2 size={13} color={colors.text.muted} />
          </View>
          {PLATFORMS.map((p) => {
            const isActive = selectedPlatform === p;
            return (
              <TouchableOpacity
                key={p}
                style={[styles.platformPill, isActive && styles.activePlatformPill]}
                onPress={() => setSelectedPlatform(p)}
                activeOpacity={0.75}
              >
                <Text style={[styles.platformText, isActive && styles.activePlatformText]}>{p}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Genres Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsScroll}>
          <TouchableOpacity
            style={[styles.pill, selectedGenre === null && styles.activePill]}
            onPress={() => setSelectedGenre(null)}
            activeOpacity={0.75}
          >
            <Filter size={11} color={selectedGenre === null ? colors.text.primary : colors.text.muted} />
            <Text style={[styles.pillText, selectedGenre === null && styles.activePillText]}>All Genres</Text>
          </TouchableOpacity>
          {POPULAR_GENRES.map((g) => {
            const isActive = selectedGenre === g.id;
            return (
              <TouchableOpacity
                key={g.id}
                style={[styles.pill, isActive && styles.activePill]}
                onPress={() => setSelectedGenre(g.id)}
                activeOpacity={0.75}
              >
                <Text style={[styles.pillText, isActive && styles.activePillText]}>{g.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredResults.length} {filteredResults.length === 1 ? 'Game' : 'Games'} Found
        </Text>
      </View>

      {/* Results Grid */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent.glow} />
        </View>
      ) : filteredResults.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Search size={40} color={colors.text.muted} />
          <Text style={styles.emptyTitle}>No games found</Text>
          <Text style={styles.emptySubtitle}>Try searching for "God of War", "Zelda", or "Elden Ring"</Text>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <GameGrid
            games={filteredResults}
            onGamePress={(game) => navigation.navigate('Details', { game })}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
    gap: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.h1,
    fontSize: 24,
    color: colors.text.primary,
  },
  databaseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  databaseBadgeText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.text.secondary,
  },
  filterSection: {
    marginVertical: spacing.xs,
    gap: spacing.xs,
  },
  pillsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs + 2,
    alignItems: 'center',
  },
  filterLabelBox: {
    paddingRight: 4,
  },
  platformPill: {
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.xs + 2,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  activePlatformPill: {
    backgroundColor: colors.accent.glow,
    borderColor: colors.accent.glow,
  },
  platformText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.text.muted,
  },
  activePlatformText: {
    color: '#FFF',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.background.tertiary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: 5,
  },
  activePill: {
    backgroundColor: colors.accent.darkSubtle,
    borderColor: colors.accent.glow,
  },
  pillText: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  activePillText: {
    color: colors.accent.glow,
    fontWeight: '700',
  },
  resultsHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  resultsCount: {
    ...typography.caption,
    color: colors.text.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
