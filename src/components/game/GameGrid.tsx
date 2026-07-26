/**
 * Grid View for Game Cards
 */

import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Game } from '@/types/game';
import { GameCard } from './GameCard';
import { spacing, colors, typography } from '@/theme';

interface GameGridProps {
  games: Game[];
  onGamePress: (game: Game) => void;
  emptyText?: string;
  horizontal?: boolean;
}

export const GameGrid: React.FC<GameGridProps> = ({
  games,
  onGamePress,
  emptyText = 'No games found',
  horizontal = false,
}) => {
  if (!games || games.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
    );
  }

  if (horizontal) {
    return (
      <FlatList
        data={games}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.horizontalContent}
        renderItem={({ item }) => (
          <GameCard game={item} onPress={() => onGamePress(item)} />
        )}
      />
    );
  }

  return (
    <FlatList
      data={games}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.gridContent}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <GameCard game={item} onPress={() => onGamePress(item)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  horizontalContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.bodyMedium,
    color: colors.text.muted,
  },
});
