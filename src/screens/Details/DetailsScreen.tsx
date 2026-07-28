/**
 * Cinematic Game Details Screen with Backdrop Header, Metacritic Badges, Status Selector Bottom Sheet & Reviews
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import {
  Heart,
  Star,
  ArrowLeft,
  Bookmark,
  Play,
  CheckCircle2,
  Clock,
  PauseCircle,
  XCircle,
  MessageSquare,
  Sparkles,
  Layers,
  X,
  Share2,
} from 'lucide-react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { colors, typography, spacing, borderRadius, shadows } from '@/theme';
import { getIGDBImageUrl } from '@/utils/constants';
import { formatDate } from '@/utils/formatters';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { StatusPill } from '@/components/game/StatusPill';
import { GameCard } from '@/components/game/GameCard';
import { useLibraryStore } from '@/store/useLibraryStore';
import { GameStatus } from '@/types/library';
import { MOCK_GAMES } from '@/api/igdb';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

const ALL_STATUSES: { status: GameStatus; label: string; Icon: any; color: string }[] = [
  { status: 'playing', label: 'Playing', Icon: Play, color: colors.status.playing },
  { status: 'completed', label: 'Completed', Icon: CheckCircle2, color: colors.status.completed },
  { status: 'backlog', label: 'Backlog', Icon: Clock, color: colors.status.backlog },
  { status: 'paused', label: 'Paused', Icon: PauseCircle, color: colors.status.paused },
  { status: 'dropped', label: 'Dropped', Icon: XCircle, color: colors.status.dropped },
  { status: 'wishlist', label: 'Wishlist', Icon: Bookmark, color: colors.status.wishlist },
];

export const DetailsScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation();
  const { game } = route.params;

  const entry = useLibraryStore((state) => state.getEntryByIgdbId(game.id));
  const upsertEntry = useLibraryStore((state) => state.upsertEntry);
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<GameStatus>(entry?.status || 'playing');
  const [userRating, setUserRating] = useState<number>(entry?.userRating || 4.5);
  const [hoursInput, setHoursInput] = useState<string>(entry?.hoursPlayed?.toString() || '0');

  const coverUrl = getIGDBImageUrl(game.cover?.image_id, 'coverBig');
  const heroUrl = getIGDBImageUrl(game.screenshots?.[0]?.image_id || game.cover?.image_id, 'hd1080p');

  const handleSaveStatus = () => {
    const hours = parseFloat(hoursInput) || 0;
    upsertEntry(game, selectedStatus, userRating, hours, entry?.favorite);
    setModalVisible(false);
  };

  const metacriticScore = game.aggregated_rating ? Math.round(game.aggregated_rating) : 95;
  const metacriticColor =
    metacriticScore >= 75
      ? colors.rating.metacriticHigh
      : metacriticScore >= 50
      ? colors.rating.metacriticMedium
      : colors.accent.primary;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* Top Floating Navigation Header */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ArrowLeft size={18} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.topRightNav}>
          <TouchableOpacity style={styles.navButton} onPress={() => toggleFavorite(game.id)} activeOpacity={0.7}>
            <Heart
              size={18}
              color={entry?.favorite ? colors.accent.glow : colors.text.primary}
              fill={entry?.favorite ? colors.accent.glow : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Full Hero Header Banner */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: heroUrl }} style={styles.heroImage} />
          <View style={styles.heroGradient} />

          <View style={styles.heroHeaderContent}>
            <Image source={{ uri: coverUrl }} style={styles.miniCover} />
            <View style={styles.headerTitleCol}>
              <Text style={styles.gameTitle}>{game.name}</Text>
              <Text style={styles.releaseText}>Released: {formatDate(game.first_release_date)}</Text>
              {entry && <StatusPill status={entry.status} />}
            </View>
          </View>
        </View>

        {/* Dual Rating Score Card */}
        <View style={styles.ratingCardContainer}>
          <View style={styles.ratingBox}>
            <Star size={18} color={colors.rating.star} fill={colors.rating.star} />
            <Text style={styles.ratingScore}>{game.rating ? (game.rating / 20).toFixed(1) : '9.4'}</Text>
            <Text style={styles.ratingSubLabel}>User Rating</Text>
          </View>

          <View style={styles.ratingDivider} />

          <View style={styles.ratingBox}>
            <View style={[styles.metacriticBadge, { borderColor: metacriticColor }]}>
              <Text style={[styles.metacriticText, { color: metacriticColor }]}>{metacriticScore}</Text>
            </View>
            <Text style={styles.ratingSubLabel}>Metacritic Score</Text>
          </View>
        </View>

        {/* Action Controls Bar */}
        <View style={styles.actionsRow}>
          <Button
            title={entry ? `STATUS: ${entry.status.toUpperCase()}` : 'ADD TO LIBRARY'}
            onPress={() => setModalVisible(true)}
            icon={<Layers size={18} color="#FFF" />}
            style={styles.mainActionBtn}
          />
          <TouchableOpacity
            style={styles.iconActionBtn}
            onPress={() => toggleFavorite(game.id)}
            activeOpacity={0.7}
          >
            <Heart
              size={20}
              color={entry?.favorite ? colors.accent.glow : colors.text.primary}
              fill={entry?.favorite ? colors.accent.glow : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Genres & Platforms */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionHeaderTitle}>Genres & Platforms</Text>
          <View style={styles.badgeWrap}>
            {game.genres?.map((g) => (
              <Badge key={g.id} label={g.name} backgroundColor={colors.accent.darkSubtle} color={colors.accent.light} />
            ))}
            {game.platforms?.map((p) => (
              <Badge key={p.id} label={p.abbreviation || p.name} />
            ))}
          </View>
        </View>

        {/* Overview & Storyline */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionHeaderTitle}>Story & Overview</Text>
          <Text style={styles.summaryText}>
            {game.summary || 'No detailed summary available for this title.'}
          </Text>
          {game.storyline && (
            <Text style={[styles.summaryText, { marginTop: spacing.xs }]}>
              {game.storyline}
            </Text>
          )}
        </View>

        {/* Screenshots Gallery */}
        {game.screenshots && game.screenshots.length > 0 && (
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionHeaderTitle, { marginHorizontal: spacing.lg }]}>
              Screenshots Gallery
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shotsScroll}>
              {game.screenshots.map((s, idx) => (
                <Image
                  key={idx}
                  source={{ uri: getIGDBImageUrl(s.image_id, 'screenshotMed') }}
                  style={styles.screenshotItem}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Community Reviews Section */}
        <View style={styles.cardSection}>
          <View style={styles.reviewsHeaderRow}>
            <Text style={styles.sectionHeaderTitle}>Gamer Review</Text>
            <MessageSquare size={16} color={colors.accent.glow} />
          </View>
          <View style={styles.reviewCard}>
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>Alex Rivers</Text>
              <StarRating rating={5.0} size={11} showText={false} />
            </View>
            <Text style={styles.reviewContent}>
              An incredible gaming experience with flawless visuals, captivating storyline, and ultra-responsive gameplay loop.
            </Text>
          </View>
        </View>

        {/* Similar Games Section */}
        <View style={styles.sectionMargin}>
          <Text style={[styles.sectionHeaderTitle, { marginHorizontal: spacing.lg }]}>
            Recommended Titles
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shotsScroll}>
            {MOCK_GAMES.slice(1, 6).map((g) => (
              <GameCard key={g.id} game={g} onPress={() => (navigation as any).push('Details', { game: g })} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Status Selector & Hours Logger Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Collection Status</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.7}>
                <X size={20} color={colors.text.muted} />
              </TouchableOpacity>
            </View>

            {/* Status Grid */}
            <Text style={styles.modalSubTitle}>Select Status</Text>
            <View style={styles.statusGrid}>
              {ALL_STATUSES.map(({ status, label, Icon, color }) => {
                const isSelected = selectedStatus === status;
                return (
                  <TouchableOpacity
                    key={status}
                    style={[styles.statusOption, isSelected && { borderColor: color, backgroundColor: colors.background.tertiary }]}
                    onPress={() => setSelectedStatus(status)}
                    activeOpacity={0.75}
                  >
                    <Icon size={16} color={isSelected ? color : colors.text.secondary} />
                    <Text style={[styles.statusOptionText, isSelected && { color: colors.text.primary, fontWeight: '700' }]}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Star Rating Bar */}
            <Text style={styles.modalSubTitle}>Rating Score</Text>
            <StarRating
              rating={userRating}
              interactive
              size={24}
              onRatingChange={(r) => setUserRating(r)}
            />

            {/* Hours Played Input */}
            <Text style={styles.modalSubTitle}>Hours Logged</Text>
            <TextInput
              style={styles.hoursInput}
              keyboardType="numeric"
              value={hoursInput}
              onChangeText={setHoursInput}
              placeholder="e.g. 45"
              placeholderTextColor={colors.text.muted}
            />

            <Button
              title="SAVE ENTRY"
              onPress={handleSaveStatus}
              style={{ marginTop: spacing.sm }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  topNav: {
    position: 'absolute',
    top: 40,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  topRightNav: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  navButton: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.pill,
    backgroundColor: 'rgba(10, 9, 13, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  heroContainer: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 9, 13, 0.78)',
  },
  heroHeaderContent: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-end',
  },
  miniCover: {
    width: 92,
    height: 126,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.accent.glow,
    ...shadows.card,
  },
  headerTitleCol: {
    flex: 1,
    gap: spacing.xs,
  },
  gameTitle: {
    ...typography.h1,
    fontSize: 22,
    color: colors.text.primary,
  },
  releaseText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  ratingCardContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    alignItems: 'center',
  },
  ratingBox: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  ratingScore: {
    ...typography.h2,
    color: colors.text.primary,
  },
  metacriticBadge: {
    borderWidth: 1.5,
    borderRadius: borderRadius.xs,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  metacriticText: {
    fontSize: 16,
    fontWeight: '800',
  },
  ratingSubLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.text.muted,
  },
  ratingDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.border.subtle,
  },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  mainActionBtn: {
    flex: 1,
  },
  iconActionBtn: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  cardSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: spacing.xs + 2,
  },
  sectionHeaderTitle: {
    ...typography.h3,
    fontSize: 15,
    fontWeight: '700',
    color: colors.text.primary,
  },
  badgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  summaryText: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    lineHeight: 21,
  },
  sectionMargin: {
    marginBottom: spacing.md,
  },
  shotsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm + 2,
    marginTop: spacing.xs,
  },
  screenshotItem: {
    width: 190,
    height: 110,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  reviewsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewCard: {
    padding: spacing.sm + 2,
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  reviewerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewerName: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text.primary,
  },
  reviewContent: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: 17,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.xl,
    borderTopWidth: 1,
    borderColor: colors.border.glow,
    gap: spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    ...typography.h2,
    fontSize: 20,
    color: colors.text.primary,
  },
  modalSubTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text.secondary,
    textTransform: 'uppercase',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    padding: spacing.md,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: spacing.xs + 2,
  },
  statusOptionText: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
  },
  hoursInput: {
    backgroundColor: colors.background.tertiary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 44,
    color: colors.text.primary,
    ...typography.bodyMedium,
  },
});
