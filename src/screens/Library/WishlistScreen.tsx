/**
 * Dedicated Wishlist Screen for Saved Games & Release Tracking
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Bookmark, Sparkles, Bell, ArrowRight } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/theme';
import { Header } from '@/components/ui/Header';
import { GameGrid } from '@/components/game/GameGrid';
import { useLibraryStore } from '@/store/useLibraryStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

export const WishlistScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const library = useLibraryStore((state) => state.library);

  const wishlistEntries = library.filter((e) => e.status === 'wishlist');
  const wishlistGames = wishlistEntries
    .map((e) => e.gameData)
    .filter((g): g is NonNullable<typeof g> => !!g);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Wishlist & Saved"
        subtitle={`${wishlistEntries.length} Saved Titles`}
        rightElement={
          <View style={styles.bellBadge}>
            <Bell size={18} color={colors.accent.glow} />
          </View>
        }
      />

      {/* Sale / Price Alert Banner */}
      <View style={styles.alertBanner}>
        <Sparkles size={20} color={colors.rating.star} />
        <View style={styles.alertText}>
          <Text style={styles.alertTitle}>Wishlist Notifications Active</Text>
          <Text style={styles.alertSub}>You'll be notified when your saved games go on sale.</Text>
        </View>
      </View>

      {/* Wishlist Grid */}
      <View style={styles.content}>
        <GameGrid
          games={wishlistGames}
          emptyText="Your wishlist is empty. Tap the bookmark icon on any game to save it!"
          onGamePress={(game) => navigation.navigate('Details', { game })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  bellBadge: {
    padding: spacing.xs + 2,
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.pill,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.glow,
    gap: spacing.md,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  alertSub: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  content: {
    flex: 1,
  },
});
